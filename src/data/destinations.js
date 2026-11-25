export const DESTINATIONS = {
  Manali: {
    name: 'Manali',
    region: 'Himachal Pradesh',
    category: 'mountains',
    subtitle: 'Pine Forests & Himalayan Passes',
    duration: '5 Days / 4 Nights',
    defaultDays: 5,
    season: 'Mar – Jun, Oct – Feb',
    basePrice: 18500,
    rating: 4.9,
    highlights: ['Solang Valley', 'Old Manali', 'Rohtang & Sissu'],
    dailyBenchmarks: {
      stay: 2400,
      food: 900,
      transport: 1100,
      activities: 1000
    },
    itinerary: [
      'Arrive in Manali, riverside check-in at your cedarwood cottage, and evening walk along Old Manali cafes.',
      'Guided sunrise excursion to Solang Valley, alpine meadow trails, and adventure paragliding or cable-car views.',
      'Cross the Atal Tunnel to Sissu Waterfall in Lahaul Valley with a curated picnic lunch by the Chandra River.',
      'Visit Hadimba Devi Temple in ancient deodar woods, Naggar Castle heritage gallery, and riverside bonfire dinner.',
      'Leisure breakfast overlooking the Beas valley followed by private transfer for your onward journey.'
    ]
  },
  Goa: {
    name: 'Goa',
    region: 'West Coast',
    category: 'coastal',
    subtitle: 'Quiet Coves & Latin Quarters',
    duration: '4 Days / 3 Nights',
    defaultDays: 4,
    season: 'Nov – Mar',
    basePrice: 16200,
    rating: 4.8,
    highlights: ['Palolem & Agonda', 'Fontainhas Walk', 'Sunset Catamaran'],
    dailyBenchmarks: {
      stay: 2600,
      food: 1100,
      transport: 800,
      activities: 950
    },
    itinerary: [
      'Arrival in South Goa, check-in to a palm-fringed boutique eco-villa, and sunset unwind at Agonda Cove.',
      'Morning kayak through tranquil backwaters followed by a heritage walking tour of Panjim’s Fontainhas Latin Quarter.',
      'Organic spice plantation tasting lunch and private sunset catamaran sail along the Arabian Sea.',
      'Slow coastal breakfast by Palolem beach and private airport or station transfer.'
    ]
  },
  Kashmir: {
    name: 'Kashmir',
    region: 'Jammu & Kashmir',
    category: 'mountains',
    subtitle: 'Alpine Meadows & Dal Lake',
    duration: '6 Days / 5 Nights',
    defaultDays: 6,
    season: 'Apr – Oct, Dec – Feb',
    basePrice: 24900,
    rating: 5.0,
    highlights: ['Srinagar Houseboat', 'Gulmarg Gondola', 'Pahalgam Valley'],
    dailyBenchmarks: {
      stay: 2900,
      food: 950,
      transport: 1200,
      activities: 1250
    },
    itinerary: [
      'Arrive in Srinagar, step aboard a traditional cedarwood houseboat on Dal Lake, and enjoy sunset kahwa tea.',
      'Dawn shikara glide past floating vegetable gardens, followed by Mughal terrace gardens and old-city craft ateliers.',
      'Scenic drive to Gulmarg meadows, Gondola Phase II ascent to snowy Apharwat ridges, and alpine lodge stay.',
      'Journey through saffron fields of Pampore to Pahalgam along the Lidder River valley.',
      'Guided pony or foot trail through Betaab Valley and Aru pine meadows with a riverside farewell dinner.',
      'Morning Kashmiri bakery breakfast and private transfer to Srinagar Airport.'
    ]
  },
  Jaipur: {
    name: 'Jaipur',
    region: 'Rajasthan',
    category: 'heritage',
    subtitle: 'Sandstone Palaces & Craft Bazaars',
    duration: '4 Days / 3 Nights',
    defaultDays: 4,
    season: 'Oct – Mar',
    basePrice: 17400,
    rating: 4.9,
    highlights: ['Amber & Nahargarh', 'Hawa Mahal Walk', 'Heritage Haveli Stay'],
    dailyBenchmarks: {
      stay: 2500,
      food: 950,
      transport: 850,
      activities: 1050
    },
    itinerary: [
      'Check-in at a restored heritage haveli, high tea on the veranda, and golden-hour views from Nahargarh Fort.',
      'Early-morning tour of Amber Fort & Sheesh Mahal, Panna Meena Stepwell, and block-printing workshop in Sanganer.',
      'Walk past Hawa Mahal’s latticed facade, explore City Palace courtyards, Jantar Mantar, and Johari craft bazaars.',
      'Courtyard breakfast with traditional music before private departure transfer.'
    ]
  }
};

export const TIER_CONFIG = {
  classic: { label: 'Classic Comfort', multiplier: 1 },
  boutique: { label: 'Boutique Luxury', multiplier: 1.35 },
  adventure: { label: 'Private Curated Expedition', multiplier: 1.55 }
};
