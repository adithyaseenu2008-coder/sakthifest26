// Seed data structure for ClusterFeed Hackathon Demo

export const SEED_DONORS = [
  {
    id: 'don-01',
    name: 'GreenLeaf Artisan Bakery',
    type: 'Bakery & Cafe',
    location: '142 Market Street, Downtown',
    lat: 37.7749,
    lng: -122.4194,
    items: 'Fresh sourdough loaves & assorted pastries (35 packs)',
    weightKg: 18.5,
    expiresAt: 'Today, 20:30',
    storageCondition: 'Ambient / Bakery Box',
    verified: true,
  },
  {
    id: 'don-02',
    name: 'Harvest Table Catering',
    type: 'Commercial Kitchen',
    location: '880 Industrial Way, Suite B',
    lat: 37.7833,
    lng: -122.4167,
    items: 'Prepared Mediterranean grain bowls & roast vegetables (60 trays)',
    weightKg: 42.0,
    expiresAt: 'Today, 19:15',
    storageCondition: 'Insulated Chilled Carrier (4°C)',
    verified: true,
  },
];

export const SEED_VOLUNTEERS = [
  {
    id: 'vol-01',
    name: 'Elena Rostova',
    vehicle: 'Hybrid Compact (Capacity: 80 kg)',
    commuteRoute: 'Financial District -> Mission Valley',
    maxDetourMinutes: 15,
    activeStatus: 'On Corridor Commute',
    rescuesCompleted: 47,
  },
];

export const SEED_SHELTERS = [
  {
    id: 'ngo-01',
    name: 'St. Jude Community Kitchen',
    status: 'Verified NGO',
    capacityNeeds: 'Up to 150 hot meal portions daily',
    contactPerson: 'Marcus Chen, Operations Director',
    address: '520 6th Ave, Mission District',
  },
];

export const SEED_METRICS = {
  totalRescuedKg: 14820,
  mealsProvided: 32930,
  co2EmissionsSavedKg: 37050,
  volunteerCommuteKilometersShared: 6840,
  standaloneTripKilometersAvoided: 18200,
};
