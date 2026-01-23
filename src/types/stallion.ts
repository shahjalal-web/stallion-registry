export type StallionBreed = "Quarter Horse" | "Paint" | "Appaloosa";
export type RecordStatus = "Pending" | "Verified" | "Archived";

export type SemenAvailability = "Fresh" | "Chilled" | "Frozen" | "Combination";
export type BreedingGuarantee = "LFG" | "Colour" | "None";

export type Link = { label: string; href: string };

export type Owner = {
  id: string;
  name: string;
  country: string;
  farmName?: string;
  addressCityState?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
};

export type PerformanceEntry = {
  year: number;
  event: string;
  discipline: string;
  result: string;
  reference?: Link;
};

export type ProgenyEntry = {
  name: string;
  year?: number;
  association?: string;
  discipline?: string;
  result: string;
  reference?: Link;
};

export type GalleryImage = {
  url: string;
  caption?: string;
};

export type VideoReference = {
  url: string;
  type?: string;
};

export type Stallion = {
  id: string;
  slug: string;

  registeredName: string;
  breed: StallionBreed;
  countryOfStanding: string;
  yearOfBirth: number;

  registryAssociation: string;
  officialRegistryLink?: string;
  registrationNumber: string;
  recordStatus: RecordStatus;

  colour?: string;
  height?: { value: number; unit: "HH" | "cm" };
  disciplineFocus?: string[];

  owners: Owner[];

  overview?: string;

  breedingAvailability: SemenAvailability;
  countryAvailability?: string[];
  studFee?: { value: number; currency: string };
  breedingManagerName?: string;
  breedingServiceProvider?: string;
  breedingServiceProviderUrl?: string;
  additionalBreedingNotes?: string;
  breedingGuarantees?: BreedingGuarantee;

  diseaseTestingResults?: string;
  colourTestingResults?: string;

  pedigree: {
    sireName: string;
    damName: string;
    grandsireSireLine?: string;
    granddamSireLine?: string;
    grandsireDamLine?: string;
    granddamDamLine?: string;
  };

  performanceRecords?: PerformanceEntry[];
  breedingStatistics?: {
    foalCropsRecorded?: number;
    totalRegisteredProgeny?: number;
    progenyStartedInCompetition?: number;
    performanceEarners?: number;
    totalReportedEarnings?: { value: number; currency: string };
    averageEarningsPerStarter?: { value: number; currency: string };
  };

  notableProgeny?: ProgenyEntry[];
  disciplineCoverageDescription?: string;

  media?: {
    primaryImageUrl?: string;
    gallery?: GalleryImage[];
    videos?: VideoReference[];
  };

  isFoundingMember?: boolean;
  hasActiveSubscription?: boolean;
};
