/**
 * ============================================================================
 * CLUSTERFEED — LAPTOP 1 & LAPTOP 2 INTEGRATION CONTRACT
 * Sakthi Hackfest '26 | Technical Boundary & Interface Specification
 *
 * Source-Verified against Laptop 2 Remote Commit: 96410bf
 * Verified Files:
 *   - src/data/mockDonations.js
 *   - src/services/donationService.js
 *   - src/components/donation/DonationForm.jsx
 *   - src/components/donation/DonationCard.jsx
 *   - src/components/donation/DonationDetailModal.jsx
 *   - src/components/donation/DonationList.jsx
 *   - src/pages/DonorPortalPage.jsx
 *
 * NOTE: This file represents an architectural interface specification and
 * contract utility. Backend dispatch gates, database atomicity, and production
 * OTP handovers are contract designs to be implemented in subsequent phases.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. STATUS ENUMS & BIDIRECTIONAL MAPPINGS
// ----------------------------------------------------------------------------

/**
 * Laptop 2 Status Values (Directly verified from mockDonations.js & DonationCard.jsx)
 */
export const LAPTOP2_DONATION_STATUS = {
  ELIGIBLE: 'eligible',       // Ready for corridor matching
  EXCLUDED: 'excluded',       // Excluded by safety engine or feasibility checks
  CLUSTERED: 'clustered',     // Assigned to an active cluster route
  IN_TRANSIT: 'in_transit',   // Commuter volunteer currently transporting
  DELIVERED: 'delivered',     // Completed drop-off at shelter / receiver
  CANCELLED: 'cancelled',     // Withdrawn by donor
  PENDING: 'pending',         // Awaiting initial verification or review
};

/**
 * Canonical ClusterFeed System Statuses (Used by Dispatch & Routing Engine)
 */
export const CANONICAL_DONATION_STATUS = {
  AVAILABLE: 'AVAILABLE',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  ALLOCATED: 'ALLOCATED',
  DISPATCHED: 'DISPATCHED',
  COMPLETED: 'COMPLETED',
  EXCLUDED: 'EXCLUDED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
};

/**
 * Bidirectional Status Mappings between Laptop 2 UI and Canonical Engine
 */
export const MAP_LAPTOP2_TO_CANONICAL_STATUS = {
  [LAPTOP2_DONATION_STATUS.ELIGIBLE]: CANONICAL_DONATION_STATUS.AVAILABLE,
  [LAPTOP2_DONATION_STATUS.EXCLUDED]: CANONICAL_DONATION_STATUS.EXCLUDED,
  [LAPTOP2_DONATION_STATUS.CLUSTERED]: CANONICAL_DONATION_STATUS.ALLOCATED,
  [LAPTOP2_DONATION_STATUS.IN_TRANSIT]: CANONICAL_DONATION_STATUS.DISPATCHED,
  [LAPTOP2_DONATION_STATUS.DELIVERED]: CANONICAL_DONATION_STATUS.COMPLETED,
  [LAPTOP2_DONATION_STATUS.CANCELLED]: CANONICAL_DONATION_STATUS.CANCELLED,
  [LAPTOP2_DONATION_STATUS.PENDING]: CANONICAL_DONATION_STATUS.PENDING_VERIFICATION,
};

export const MAP_CANONICAL_TO_LAPTOP2_STATUS = {
  [CANONICAL_DONATION_STATUS.AVAILABLE]: LAPTOP2_DONATION_STATUS.ELIGIBLE,
  [CANONICAL_DONATION_STATUS.PENDING_VERIFICATION]: LAPTOP2_DONATION_STATUS.PENDING,
  [CANONICAL_DONATION_STATUS.ALLOCATED]: LAPTOP2_DONATION_STATUS.CLUSTERED,
  [CANONICAL_DONATION_STATUS.DISPATCHED]: LAPTOP2_DONATION_STATUS.IN_TRANSIT,
  [CANONICAL_DONATION_STATUS.COMPLETED]: LAPTOP2_DONATION_STATUS.DELIVERED,
  [CANONICAL_DONATION_STATUS.EXCLUDED]: LAPTOP2_DONATION_STATUS.EXCLUDED,
  [CANONICAL_DONATION_STATUS.EXPIRED]: LAPTOP2_DONATION_STATUS.EXCLUDED,
  [CANONICAL_DONATION_STATUS.CANCELLED]: LAPTOP2_DONATION_STATUS.CANCELLED,
};

/**
 * Cluster Lifecycle Statuses (Governing commuter trip viability)
 */
export const CLUSTER_STATUS = {
  DRAFT: 'DRAFT',               // Assembling candidate pickups along commuter corridor
  FEASIBLE: 'FEASIBLE',         // Passes >= 20 meals, deadlines, vehicle/receiver capacity
  UNDERSIZED: 'UNDERSIZED',     // Eligible meals < 20 (DISPATCH STRICTLY FORBIDDEN)
  INFEASIBLE: 'INFEASIBLE',     // Safety deadline, vehicle payload, or receiver capacity violated
  DISPATCHED: 'DISPATCHED',     // Confirmed by backend dispatch gate
  IN_TRANSIT: 'IN_TRANSIT',     // Commuter actively executing waypoints
  DELIVERED: 'DELIVERED',       // All stops and drop-offs verified
  ABORTED: 'ABORTED',           // Cancelled due to route failure or breakdown
};

/**
 * Verified Exclusion Reasons (Combining Laptop 2 reasonCodes and Dispatch checks)
 */
export const EXCLUSION_REASONS = {
  DEADLINE_EXPIRED: 'DEADLINE_EXPIRED',                   // Laptop 2: Deadline already passed
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',                 // Route ETA arrives after verified safeDeadline
  BELOW_MINIMUM_MEALS: 'BELOW_MINIMUM_MEALS',             // Total eligible cluster meals < configured minimum
  VEHICLE_CAPACITY_EXCEEDED: 'VEHICLE_CAPACITY_EXCEEDED', // Exceeds volunteer vehicle weight (kg) or volume
  RECEIVER_CAPACITY_EXCEEDED: 'RECEIVER_CAPACITY_EXCEEDED',// Exceeds intake receiver kitchen capacity
  DONOR_NOT_READY: 'DONOR_NOT_READY',                     // Planned pickup time is earlier than readyAt
  STORAGE_MISMATCH: 'STORAGE_MISMATCH',                   // Vehicle equipment incompatible with storage requirement
  CONCURRENTLY_ALLOCATED: 'CONCURRENTLY_ALLOCATED',       // Already locked in another dispatch request
  SAFETY_UNCERTAIN: 'SAFETY_UNCERTAIN',                   // Laptop 2: Missing or invalid pickup/deadline timestamps
  INVALID_WINDOW: 'INVALID_WINDOW',                       // Laptop 2: safeDeadline <= readyAt
  NARROW_SAFE_WINDOW: 'NARROW_SAFE_WINDOW',               // Laptop 2: Transit window < 30 min buffer
};

// ----------------------------------------------------------------------------
// 2. CONFIGURABLE OPERATIONAL PARAMETERS (NOT Universal Safety Rules)
// ----------------------------------------------------------------------------

/**
 * Baseline parameters configured per deployment, regional transit speed,
 * and site accessibility. These are operational inputs, NOT universal physical constants.
 */
export const CONFIGURABLE_DISPATCH_DEFAULTS = {
  // Default threshold: minimum 20 eligible meals per dispatched cluster
  MINIMUM_VIABLE_CLUSTER_MEALS: 20,

  // Site-specific baseline duration estimates (minutes)
  DEFAULT_PICKUP_SERVICE_MINUTES: 6,
  DEFAULT_DROPOFF_SERVICE_MINUTES: 8,

  // Conservative safety buffer before deadline (minutes)
  DEFAULT_SAFETY_MARGIN_BUFFER_MINUTES: 10,

  // Client UI warning threshold (Heuristic ONLY, not an authoritative safety rule)
  CLIENT_UI_WARNING_THRESHOLD_MINUTES: 30,
};

// ----------------------------------------------------------------------------
// 3. SOURCE-VERIFIED DATA SCHEMA SPECIFICATIONS
// ----------------------------------------------------------------------------

/**
 * Verified Donation Object Schema (Source: Laptop 2 `src/data/mockDonations.js`)
 *
 * @typedef {Object} VerifiedDonation
 * @property {string} id - Unique donation ID (e.g., 'don-101')
 * @property {string} donorId - Donor entity ID (e.g., 'donor-01')
 * @property {string} donorName - Organization name (e.g., 'Savoury Crust Artisan Bakery')
 * @property {string} donorType - Donor classification ('bakery', 'hostel_mess', 'caterer', 'restaurant')
 * @property {string} foodCategory - Category identifier ('cooked_meals', 'bakery_pastry', 'hostel_mess', 'catered_buffet', 'packaged_dairy')
 * @property {string} foodName - Item title (e.g., 'Artisan Sourdough Loaves & Sweet Buns')
 * @property {string} description - Detailed description of food surplus
 * @property {number} quantityMeals - Number of eligible meal portions (integer > 0)
 * @property {number} weightKg - Estimated weight in kilograms (> 0)
 * @property {string} storageCondition - Required holding environment (e.g., 'Ambient / Bakery Box', 'Hot Holding (>60°C)')
 * @property {string} preparedAt - ISO timestamp when food preparation finished
 * @property {string} readyAt - ISO timestamp when food is ready for curbside pickup
 * @property {string} safeDeadline - ISO timestamp of verified safe consumption cutoff
 * @property {Object} location - Pickup coordinates and access details
 * @property {string} location.address - Physical street address
 * @property {number} location.lat - Latitude coordinate
 * @property {number} location.lng - Longitude coordinate
 * @property {string} location.accessNotes - Curbside bay, buzzer, or gate access notes
 * @property {number} [serviceDurationMinutes] - Estimated pickup service duration (site specific)
 * @property {string} status - Keyof LAPTOP2_DONATION_STATUS ('eligible', 'excluded', etc.)
 * @property {string|null} exclusionReason - Detailed exclusion explanation or null
 * @property {string} [sourceType] - 'demo' | 'live'
 * @property {string} [specialNotes] - Handling or packaging instructions
 */

/**
 * Cluster Routing Object Schema (Evaluated by Feasibility Engine)
 *
 * @typedef {Object} ClusterEvaluation
 * @property {string} clusterId - Unique cluster ID (e.g., 'clust-2026-001')
 * @property {string} volunteerId - Assigned commuter volunteer ID
 * @property {string} receiverId - Destination shelter or community kitchen ID
 * @property {Array<VerifiedDonation>} eligibleDonations - Donations passing all feasibility checks
 * @property {Array<{ donationId: string, reason: string, timestamp: string }>} exclusions - Audited exclusion log
 * @property {number} totalEligibleMeals - Sum of quantityMeals for eligible donations (Must be >= 20)
 * @property {number} totalWeightKg - Sum of weightKg for eligible donations
 * @property {Array<Object>} routeWaypoints - Ordered route stops:
 *   [{ stopIndex, stopType: 'PICKUP'|'DROPOFF', donationId, lat, lng, plannedArrival, plannedDeparture, serviceMinutes }]
 * @property {number} estimatedDetourMinutes - Total extra minutes added to commuter corridor
 * @property {string} status - Keyof CLUSTER_STATUS
 * @property {boolean} isDispatchable - True only if status === 'FEASIBLE' && totalEligibleMeals >= configuredMinimum
 * @property {string} evaluatedAt - ISO timestamp of latest evaluation
 */

// ----------------------------------------------------------------------------
// 4. MULTI-FACTOR FEASIBILITY & DISPATCH VALIDATION RULES
// ----------------------------------------------------------------------------

/**
 * Mandatory Server-Side Evaluation Pipeline:
 *
 * 1. Safe Readiness & Deadlines:
 *    - For each candidate donation d:
 *        plannedPickupArrival >= d.readyAt (Cannot collect before food is ready)
 *        plannedReceiverArrival <= (d.safeDeadline - safetyBuffer)
 *    - If safety data is missing, uncertain, or invalid:
 *        Exclude d immediately with EXCLUSION_REASONS.SAFETY_UNCERTAIN.
 *
 * 2. Route Order & Dynamic Timing:
 *    - Service durations (pickup & dropoff) and safety buffers must be evaluated based
 *      on the specific route and site constraints (e.g., d.location.accessNotes).
 *    - Waypoint departure = plannedArrival + siteSpecificServiceDuration.
 *    - Travel duration calculated between ordered stops using verified transit models.
 *
 * 3. Vehicle, Storage & Receiver Constraints:
 *    - totalWeightKg <= volunteer.vehicle.maxPayloadKg.
 *    - Volunteer vehicle equipment must satisfy d.storageCondition.
 *    - (receiver.currentAcceptedMealsToday + totalEligibleMeals) <= receiver.dailyCapacityLimit.
 *
 * 4. Exclusion Recalculation & Minimum Viable Threshold:
 *    - After every exclusion:
 *        totalEligibleMeals = sum(eligibleDonations.map(d => d.quantityMeals))
 *    - Excluded donations NEVER count toward the threshold.
 *    - If totalEligibleMeals < configuredMinimum (default: 20):
 *        cluster.status = CLUSTER_STATUS.UNDERSIZED.
 *        DISPATCH MUST BE REJECTED (HTTP 422 Unprocessable Entity).
 *
 * 5. Safe Reassignment:
 *    - An excluded donation can return to 'eligible' only if:
 *        (currentTime + estimatedTransitBuffer) < donation.safeDeadline
 *        AND all safety data remains valid.
 *    - Otherwise, donation transitions to 'excluded' / EXPIRED.
 *
 * 6. Concurrency & Atomicity:
 *    - Backend validates and locks candidate donations atomically (e.g., database transaction).
 *    - Reject concurrent dispatch requests attempting to claim an already-allocated donation.
 */

// ----------------------------------------------------------------------------
// 5. SECURE HANDOVER VERIFICATION SPECIFICATION
// ----------------------------------------------------------------------------

/**
 * Handover Architecture Specification:
 * - Plaintext handover tokens or OTPs are NEVER exposed in donation creation or listing APIs.
 * - Server manages a hashed token challenge with an authorized expiration window.
 * - Authorized donor retrieves the challenge via an authenticated session at physical handover.
 * - Volunteer submits the challenge to the server for verification.
 * - Receiver verifies intake dropoff similarly.
 * - NOTE: This workflow will be implemented and verified server-side in Phase 5 before
 *   being declared active in production.
 */

// ----------------------------------------------------------------------------
// 6. CONTRACT HELPER UTILITIES (Client-Side Safe Operations)
// ----------------------------------------------------------------------------

/**
 * Calculates total eligible meals from an array of donations, counting only eligible items.
 *
 * @param {Array<VerifiedDonation>} donations
 * @returns {number}
 */
export const calculateEligibleMeals = (donations = []) => {
  if (!Array.isArray(donations)) return 0;
  return donations
    .filter((d) => d && (d.status === LAPTOP2_DONATION_STATUS.ELIGIBLE || d.status === CANONICAL_DONATION_STATUS.AVAILABLE))
    .reduce((sum, d) => sum + (Number(d.quantityMeals) || 0), 0);
};

/**
 * Checks whether a cluster candidate meets the configurable minimum meal threshold.
 *
 * @param {Array<VerifiedDonation>} eligibleDonations
 * @param {number} [minimumThreshold=20]
 * @returns {boolean}
 */
export const meetsMinimumViableClusterThreshold = (
  eligibleDonations = [],
  minimumThreshold = CONFIGURABLE_DISPATCH_DEFAULTS.MINIMUM_VIABLE_CLUSTER_MEALS
) => {
  const total = calculateEligibleMeals(eligibleDonations);
  return total >= minimumThreshold;
};

/**
 * Maps a Laptop 2 donation record into the canonical engine representation.
 *
 * @param {VerifiedDonation} donation
 * @returns {Object}
 */
export const mapLaptop2DonationToCanonical = (donation) => {
  if (!donation) return null;
  return {
    id: donation.id,
    donorId: donation.donorId,
    donorName: donation.donorName,
    donorType: donation.donorType,
    foodCategory: donation.foodCategory,
    foodItemName: donation.foodName,
    description: donation.description,
    mealCount: Number(donation.quantityMeals) || 0,
    weightKg: Number(donation.weightKg) || 0,
    storageCondition: donation.storageCondition,
    preparedAt: donation.preparedAt,
    readyAt: donation.readyAt,
    safeConsumptionDeadline: donation.safeDeadline,
    location: {
      address: donation.location?.address || '',
      lat: Number(donation.location?.lat) || 0,
      lng: Number(donation.location?.lng) || 0,
      accessNotes: donation.location?.accessNotes || '',
    },
    serviceDurationMinutes: Number(donation.serviceDurationMinutes) || CONFIGURABLE_DISPATCH_DEFAULTS.DEFAULT_PICKUP_SERVICE_MINUTES,
    status: MAP_LAPTOP2_TO_CANONICAL_STATUS[donation.status] || CANONICAL_DONATION_STATUS.AVAILABLE,
    exclusionReason: donation.exclusionReason || null,
    sourceType: donation.sourceType || 'demo',
    specialNotes: donation.specialNotes || '',
  };
};
