// Client-Side Donation Service
// NOTE: This workspace currently runs without a connected backend server.
// These methods manage local browser state and illustrate the workflow contracts.
// Mandatory safety checks must be authoritatively enforced by the backend in production.

import { INITIAL_MOCK_DONATIONS, DEMO_DONORS, FOOD_CATEGORIES } from '../data/mockDonations.js';

const STORAGE_KEY = 'clusterfeed_donations_v1';

// Initialize or retrieve stored donations
const loadStoredDonations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('LocalStorage unavailable, defaulting to memory store:', err);
  }
  return [...INITIAL_MOCK_DONATIONS];
};

const saveStoredDonations = (donations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
};

/**
 * Evaluates whether a donation meets food-specific safety requirements.
 * Conservative rule: If times are ambiguous or deadline is within 25 minutes of ready time,
 * or deadline has already elapsed, the donation is flagged as excluded.
 */
export const evaluateDonationSafety = (donation) => {
  const now = new Date();
  const ready = new Date(donation.readyAt);
  const deadline = new Date(donation.safeDeadline);

  if (isNaN(ready.getTime()) || isNaN(deadline.getTime())) {
    return {
      isSafe: false,
      status: 'excluded',
      reasonCode: 'SAFETY_UNCERTAIN',
      reason: 'Incomplete or invalid pickup/deadline timestamps. Conservative safety policy excludes uncertain batches.',
    };
  }

  if (deadline.getTime() <= now.getTime()) {
    return {
      isSafe: false,
      status: 'excluded',
      reasonCode: 'DEADLINE_EXPIRED',
      reason: 'Safe consumption deadline has already elapsed. Food cannot be distributed to community partners.',
    };
  }

  if (deadline.getTime() <= ready.getTime()) {
    return {
      isSafe: false,
      status: 'excluded',
      reasonCode: 'INVALID_WINDOW',
      reason: 'Safe consumption deadline is earlier than or equal to pickup readiness time.',
    };
  }

  // Minimum distribution window required: at least 30 minutes from ready time
  const windowMinutes = (deadline.getTime() - ready.getTime()) / 60000;
  if (windowMinutes < 30) {
    return {
      isSafe: false,
      status: 'excluded',
      reasonCode: 'NARROW_SAFE_WINDOW',
      reason: `Safe transit window is only ${Math.round(windowMinutes)} minutes. Corridor pickup and delivery requires a minimum 30-minute buffer to ensure food hygiene.`,
    };
  }

  return {
    isSafe: true,
    status: 'eligible',
    reasonCode: null,
    reason: null,
  };
};

export const donationService = {
  getDonations: async (filters = {}) => {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 250));
    let donations = loadStoredDonations();

    // Re-evaluate safety on query (e.g. if deadline expired since storage)
    donations = donations.map((d) => {
      if (d.status === 'eligible' || d.status === 'pending') {
        const safety = evaluateDonationSafety(d);
        if (!safety.isSafe) {
          return {
            ...d,
            status: safety.status,
            exclusionReason: safety.reason,
          };
        }
      }
      return d;
    });
    saveStoredDonations(donations);

    // Apply filters
    if (filters.donorId) {
      donations = donations.filter((d) => d.donorId === filters.donorId);
    }
    if (filters.category && filters.category !== 'all') {
      donations = donations.filter((d) => d.foodCategory === filters.category);
    }
    if (filters.status && filters.status !== 'all') {
      donations = donations.filter((d) => d.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      donations = donations.filter(
        (d) =>
          d.foodName.toLowerCase().includes(q) ||
          d.donorName.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.location.address.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (filters.sortBy === 'deadline') {
      donations.sort((a, b) => new Date(a.safeDeadline) - new Date(b.safeDeadline));
    } else if (filters.sortBy === 'meals') {
      donations.sort((a, b) => b.quantityMeals - a.quantityMeals);
    } else {
      // Default: newest first
      donations.sort((a, b) => new Date(b.preparedAt) - new Date(a.preparedAt));
    }

    return donations;
  },

  getDonationById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const donations = loadStoredDonations();
    const item = donations.find((d) => d.id === id);
    if (!item) throw new Error(`Donation with ID ${id} not found.`);
    return item;
  },

  createDonation: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const donations = loadStoredDonations();

    // Enforce initial safety evaluation
    const safety = evaluateDonationSafety(formData);

    const newDonation = {
      ...formData,
      id: `don-${Date.now().toString().slice(-4)}`,
      status: safety.status,
      exclusionReason: safety.reason,
      sourceType: 'demo', // Explicit label
      createdAt: new Date().toISOString(),
    };

    const updated = [newDonation, ...donations];
    saveStoredDonations(updated);
    return newDonation;
  },

  cancelDonation: async (id, reason) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const donations = loadStoredDonations();
    const target = donations.find((d) => d.id === id);

    if (!target) {
      throw new Error(`Donation #${id} not found.`);
    }

    // Cancellation rule check
    if (target.status === 'clustered' || target.status === 'in_transit' || target.status === 'delivered') {
      throw new Error(`Cannot cancel donation: It is already locked in status "${target.status}".`);
    }

    const updated = donations.map((d) =>
      d.id === id
        ? {
            ...d,
            status: 'cancelled',
            exclusionReason: reason || 'Cancelled by donor organization.',
            cancelledAt: new Date().toISOString(),
          }
        : d
    );

    saveStoredDonations(updated);
    return updated.find((d) => d.id === id);
  },

  resetDemoData: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    saveStoredDonations(INITIAL_MOCK_DONATIONS);
    return [...INITIAL_MOCK_DONATIONS];
  },

  getDonors: () => DEMO_DONORS,
  getCategories: () => FOOD_CATEGORIES,
};
