// Curated temporary stock media references (Unsplash / Pexels) for luxury venue aesthetic.
// Replace with real, licensed photography later. Provide consistent alt text.

export const media = {
  hero: {
    // Primary: bouquet-forward image for a romantic hero
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80',
    candidates: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519741491156-29e2107f2e3b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=80',
      '/hero-placeholder.svg'
    ],
    alt: 'Bridal bouquet with soft garden florals'
  },
  weddings: {
    hero: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80',
    ceremony: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80',
    reception: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80',
    suite: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80',
    details: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  },
  events: {
    hero: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80',
    meeting: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    dining: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80',
    networking: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80',
    outdoor: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&w=1200&q=80',
  },
  estate: {
    exterior: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2cb9?auto=format&fit=crop&w=1600&q=80',
    grounds: 'https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?auto=format&fit=crop&w=1600&q=80',
    interior: 'https://images.unsplash.com/photo-1600585154205-2f0a1ad131c4?auto=format&fit=crop&w=1200&q=80',
    garden: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  },
  gallery: {
    images: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2cb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154205-2f0a1ad131c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2cb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    ]
  }
};

export type Media = typeof media;
