// ClusterFeed Brand Design System Constants & Color Tokens
// Designed in Google Stitch AI

export const PALETTE = {
  mint: '#B8DCCB',
  forest: '#245747',
  pink: '#F2B7C6',
  cream: '#FFF8ED',
  peach: '#F5B49D',
  charcoal: '#26332E',
};

export const ROLES = {
  DONOR: {
    id: 'donor',
    label: 'Donor',
    description: 'Post surplus food with location, quantity & safety deadline',
    badgeColor: 'bg-peach text-charcoal',
  },
  VOLUNTEER: {
    id: 'volunteer',
    label: 'Volunteer',
    description: 'Register existing commutes & rescue food along the way',
    badgeColor: 'bg-mint text-charcoal',
  },
  NGO: {
    id: 'ngo',
    label: 'NGO / Shelter',
    description: 'Verify organization credentials & receive rescues',
    badgeColor: 'bg-pink-pastel text-charcoal',
  },
  BUYER: {
    id: 'buyer',
    label: 'Buyer',
    description: 'Reserve or purchase discounted quality surplus food',
    badgeColor: 'bg-cream text-forest border border-forest/30',
  },
};

export const FEASIBILITY_STATUS = {
  OPTIMAL: {
    label: 'Optimal Corridor',
    bg: '#D8F3DC',
    text: '#2D6A4F',
    desc: 'Under 10 min detour & within food safety window',
  },
  AT_RISK: {
    label: 'At-Risk Window',
    bg: '#FDE8CD',
    text: '#9A5800',
    desc: 'Tight temperature or delivery deadline',
  },
  CRITICAL: {
    label: 'Critical / Expiring',
    bg: '#FEE2E2',
    text: '#991B1B',
    desc: 'Immediate pickup required (< 45 mins)',
  },
};
