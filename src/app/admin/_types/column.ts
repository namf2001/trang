// Define types that match the actual database structure
export type CountryUrlEntity = {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  url: string;
  countryId: string;
  isExpired: boolean;
  country: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type CategoryUrlEntity = {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  url: string;
  categoryId: string;
  isExpired: boolean;
  category: {
    id: string;
    name: string;
  };
};

export type XtreamUrlEntity = {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  url: string;
  countryId: string;
  isExpired: boolean;
  country: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

// Union type for handling edits across all entity types
export type UrlEntity = CountryUrlEntity | CategoryUrlEntity | XtreamUrlEntity;