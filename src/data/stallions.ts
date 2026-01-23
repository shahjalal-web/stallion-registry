import type { Stallion } from "@/types/stallion";

export const stallions: Stallion[] = [
  {
    id: "ST-0001",
    slug: "obsidian-knight",
    registeredName: "Obsidian Knight",
    breed: "Quarter Horse",
    countryOfStanding: "United States",
    yearOfBirth: 2016,
    registryAssociation: "AQHA",
    officialRegistryLink: "https://example-registry.org/aqha/1234567",
    registrationNumber: "AQHA 1234567",
    recordStatus: "Verified",

    colour: "Black",
    height: { value: 15.2, unit: "HH" },
    disciplineFocus: ["Western Pleasure", "Ranch Riding", "Trail"],

    owners: [
      {
        id: "OWN-1",
        name: "Blackstone Performance Ranch",
        country: "United States",
        addressCityState: "Ocala, Florida (USA)",
        phone: "+1 352-000-0000",
        website: "https://blackstoneperformance.example",
        facebook: "https://facebook.com/blackstoneperformance",
        instagram: "https://instagram.com/blackstoneperformance",
      },
    ],

    overview:
      "Obsidian Knight is presented as a verified registry record with emphasis on structured reference information. The stallion is listed with a focus on Western performance disciplines and includes pedigree, breeding availability, testing summaries and published records where available.",

    breedingAvailability: "Frozen",
    breedingManagerName: "Breeding Office — Blackstone Performance",
    breedingServiceProvider: "North Florida Equine Repro",
    breedingServiceProviderUrl: "https://equine-repro.example/provider/nfl",
    studFee: { value: 1750, currency: "USD" },
    additionalBreedingNotes:
      "Frozen semen stored and distributed via breeding service provider. Transport/courier fees and veterinary costs vary by region and are not included in the listed stud fee.",
    countryAvailability: ["United States", "Canada"],
    breedingGuarantees: "LFG",

    diseaseTestingResults:
      "Panel testing reported: 6-panel (N/N) — documentation on request (sample entry).",
    colourTestingResults:
      "Colour testing reported: E/E, a/a — consistent black phenotype (sample entry).",

    pedigree: {
      sireName: "Midnight Resolve",
      damName: "Velvet Horizon",
      grandsireSireLine: "Invitation Only",
      granddamSireLine: "Zippos Mr Good Bar",
      grandsireDamLine: "A Good Machine",
      granddamDamLine: "Blazing Hot",
    },

    performanceRecords: [
      {
        year: 2023,
        event: "AQHA Level 1 Championship",
        discipline: "Senior Western Pleasure",
        result: "Top 10",
        reference: { label: "Published results", href: "https://show-results.example/a2023" },
      },
      {
        year: 2022,
        event: "NSBA World Championship Show",
        discipline: "Western Pleasure",
        result: "Finalist",
        reference: { label: "Published results", href: "https://show-results.example/n2022" },
      },
      {
        year: 2021,
        event: "The Championship Show",
        discipline: "Trail",
        result: "Reserve Champion",
        reference: { label: "Published results", href: "https://show-results.example/t2021" },
      },
    ],

    breedingStatistics: {
      foalCropsRecorded: 7,
      totalRegisteredProgeny: 98,
      progenyStartedInCompetition: 61,
      performanceEarners: 44,
      totalReportedEarnings: { value: 362000, currency: "USD" },
      averageEarningsPerStarter: { value: 5934, currency: "USD" },
    },

    notableProgeny: [
      {
        name: "Obsidian Affair",
        year: 2022,
        association: "AQHA",
        discipline: "Western Pleasure",
        result: "Level 1 Champion (2YO)",
        reference: { label: "Reference", href: "https://progeny.example/obsidian-affair" },
      },
      {
        name: "Knight Moves",
        year: 2021,
        association: "NSBA",
        discipline: "Trail",
        result: "Top 5 — NSBA Futurity",
        reference: { label: "Reference", href: "https://progeny.example/knight-moves" },
      },
      {
        name: "Midnight Sonata",
        association: "AQHA",
        discipline: "Ranch Riding",
        result: "Multiple circuit awards (sample)",
        reference: { label: "Reference", href: "https://progeny.example/midnight-sonata" },
      },
    ],

    disciplineCoverageDescription:
      "Recorded disciplines reflect published association participation and owner-submitted documentation. Listings are intended for reference and comparison; they do not constitute endorsement or ranking.",

    media: {
      primaryImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzupBhCJ8nxdV3WuZ6rLuKackdrUsbyvcnw&s",
      gallery: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sukNRQKIHLwJjiJ4HIclO2A-EVCx_Py1Gw&s",
          caption: "Conformation reference",
        },
        {
          url: "https://lh7-us.googleusercontent.com/f-zhn1fVem_NoW9ELOGQ21EZeHbdNLfKw3tfFblttScX3olF8qtHU-Xmc9JfAqueBmd-8c7DBXjwXJ4sRM8VJ1ZEBqXT7dQ-UztmVkWrDaOIfWSFzkua19JGC443paSjvYud9-tmv4_V-72GRA88TIY",
          caption: "Movement reference",
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwh-akp4FTBCr52OuTycxK9gw8e6nFa0DqXw&s",
          caption: "Performance reference",
        },
      ],
      videos: [
        {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "movement reference",
        },
      ],
    },

    isFoundingMember: true,
    hasActiveSubscription: true,
  },

  {
    id: "ST-0002",
    slug: "southern-gunmetal",
    registeredName: "Southern Gunmetal",
    breed: "Paint",
    countryOfStanding: "Australia",
    yearOfBirth: 2015,
    registryAssociation: "APHA",
    officialRegistryLink: "https://example-registry.org/apha/9000123",
    registrationNumber: "APHA 9000123",
    recordStatus: "Verified",

    colour: "Blue Roan Tobiano",
    height: { value: 15.1, unit: "HH" },
    disciplineFocus: ["Ranch Activities", "Hunter Under Saddle", "Trail"],

    owners: [
      {
        id: "OWN-2",
        name: "Rivergum Performance Stud",
        country: "Australia",
        addressCityState: "Toowoomba, QLD (Australia)",
        phone: "+61 7 0000 0000",
        website: "https://rivergumperformance.example",
        facebook: "https://facebook.com/rivergumperformance",
        instagram: "https://instagram.com/rivergumperformance",
      },
    ],

    overview:
      "Southern Gunmetal is listed as a multi-discipline Paint stallion with emphasis on Ranch and HUS coverage. Registry entry is presented for factual comparison across regions; competition outcomes may vary by season and association.",

    breedingAvailability: "Chilled",
    breedingManagerName: "Stud Office — Rivergum",
    breedingServiceProvider: "Queensland Equine Reproduction",
    breedingServiceProviderUrl: "https://equine-repro.example/provider/qld",
    studFee: { value: 1650, currency: "USD" },
    additionalBreedingNotes:
      "Chilled semen availability within Australia. New Zealand export subject to seasonal approval and courier scheduling.",
    countryAvailability: ["Australia", "New Zealand"],
    breedingGuarantees: "None",

    diseaseTestingResults:
      "Testing summary: reported panel tests clear (sample entry).",
    colourTestingResults:
      "Colour testing reported: Roan + Tobiano (sample entry).",

    pedigree: {
      sireName: "Metallic Traveller",
      damName: "Southern Lullaby",
      grandsireSireLine: "Gunner",
      granddamSireLine: "Smart Little Lena",
      grandsireDamLine: "Zippos Sensation",
      granddamDamLine: "Zips Chocolate Chip",
    },

    performanceRecords: [
      {
        year: 2022,
        event: "Australian Paint Horse Nationals",
        discipline: "Hunter Under Saddle",
        result: "Champion",
        reference: { label: "Published results", href: "https://show-results.example/apha2022" },
      },
      {
        year: 2021,
        event: "State Championships",
        discipline: "Ranch Rail",
        result: "Reserve Champion",
        reference: { label: "Published results", href: "https://show-results.example/state2021" },
      },
    ],

    breedingStatistics: {
      foalCropsRecorded: 5,
      totalRegisteredProgeny: 63,
      progenyStartedInCompetition: 31,
      performanceEarners: 19,
      totalReportedEarnings: { value: 128000, currency: "USD" },
      averageEarningsPerStarter: { value: 4129, currency: "USD" },
    },

    notableProgeny: [
      {
        name: "Gunmetal Rose",
        year: 2022,
        association: "APHA",
        discipline: "Hunter Under Saddle",
        result: "National finalist (sample)",
        reference: { label: "Reference", href: "https://progeny.example/gunmetal-rose" },
      },
      {
        name: "Southern Rail",
        association: "APHA",
        discipline: "Ranch Rail",
        result: "Circuit champion (sample)",
        reference: { label: "Reference", href: "https://progeny.example/southern-rail" },
      },
    ],

    disciplineCoverageDescription:
      "Disciplines reflect documented participation. Registry listings aim to support breeders in comparing sire profiles, pedigree patterns and discipline coverage in a consistent format.",

    media: {
      primaryImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sukNRQKIHLwJjiJ4HIclO2A-EVCx_Py1Gw&s",
      gallery: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzupBhCJ8nxdV3WuZ6rLuKackdrUsbyvcnw&s",
          caption: "Conformation reference",
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sukNRQKIHLwJjiJ4HIclO2A-EVCx_Py1Gw&s",
          caption: "Movement reference",
        },
      ],
      videos: [
        {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "performance reference",
        },
      ],
    },

    isFoundingMember: false,
    hasActiveSubscription: false,
  },

  {
    id: "ST-0003",
    slug: "iron-creek-legacy",
    registeredName: "Iron Creek Legacy",
    breed: "Appaloosa",
    countryOfStanding: "United Kingdom",
    yearOfBirth: 2013,
    registryAssociation: "ApHC",
    officialRegistryLink: "https://example-registry.org/aphc/771208",
    registrationNumber: "ApHC 771208",
    recordStatus: "Pending",

    colour: "Leopard",
    height: { value: 15.0, unit: "HH" },
    disciplineFocus: ["All-round", "Trail", "Ranch Riding"],

    owners: [
      {
        id: "OWN-3",
        name: "Iron Creek Sport Horses",
        country: "United Kingdom",
        addressCityState: "Cheshire (UK)",
        website: "https://ironcreeksporthorses.example",
      },
    ],

    overview:
      "Iron Creek Legacy is presented as a pending record with core identity and pedigree information supplied. Verification may be updated following submission of association documents.",

    breedingAvailability: "Frozen",
    breedingManagerName: "Stud Coordinator — Iron Creek",
    breedingServiceProvider: "European Equine Transport & Storage",
    breedingServiceProviderUrl: "https://equine-repro.example/provider/eu",
    studFee: { value: 1400, currency: "USD" },
    additionalBreedingNotes:
      "Frozen semen storage in EU facility. Shipping timelines depend on export documentation and courier schedules.",
    countryAvailability: ["United Kingdom", "EU"],
    breedingGuarantees: "None",

    diseaseTestingResults: "Not listed.",
    colourTestingResults: "Not listed.",

    pedigree: {
      sireName: "Legacy In Motion",
      damName: "Creekside Jewel",
      grandsireSireLine: "Zippos Mr Good Bar",
      granddamSireLine: "Invitation Only",
      grandsireDamLine: "Smart Chic Olena",
      granddamDamLine: "Gunner",
    },

    performanceRecords: [
      {
        year: 2020,
        event: "Regional Championships",
        discipline: "Trail",
        result: "Champion (sample)",
        reference: { label: "Reference", href: "https://show-results.example/uk2020" },
      },
    ],

    breedingStatistics: {
      foalCropsRecorded: 4,
      totalRegisteredProgeny: 41,
      progenyStartedInCompetition: 17,
      performanceEarners: 9,
      totalReportedEarnings: { value: 54000, currency: "USD" },
      averageEarningsPerStarter: { value: 3176, currency: "USD" },
    },

    notableProgeny: [],
    disciplineCoverageDescription:
      "Listed as an all-round sire candidate. Discipline references may expand following record verification and additional owner submissions.",

    media: {
      primaryImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwh-akp4FTBCr52OuTycxK9gw8e6nFa0DqXw&s",
      gallery: [],
      videos: [],
    },

    isFoundingMember: false,
    hasActiveSubscription: true,
  },
];
