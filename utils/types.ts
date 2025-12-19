export type ServiceItemType = {
  id: string;
  title: string;
  image: string;
  img1?: string;
  img2?: string;
  toolsUsed?: string[];
  description: string | string[];
  subServices?: GenericType[];
  pdfLink?: string;
  extraDetails?: SolutionType[];
};

export type ServiceItemTypeObj = {
  title: string;
  image: string;
  img1?: string;
  img2?: string;
  toolsUsed?: string[];
  description: string | string[];
  subServices?: GenericType[];
  pdfLink?: string;
  extraDetails?: SolutionType[];
};

export enum ServiceId {
  QUANTITY_TAKE_OFF = "quantity-take-off",
  EQUIPMENT_PRODUCT = "equipment-product",
  SPEC_REVIEW = "spec-review",
  BIM_MODELLING = "bim-modelling",
  REVIT_MODELS = "revit-models",
  AR_VR = "ar-vr",
  MEP_DRAFTING = "mep-drafting",
  ENERGY_MODELLING = "energy-modelling",
}

export type ServiceSectionsType = Record<ServiceId, ServiceItemTypeObj>;

export type TestimonialCardProps = {
  rating?: number;
  desc: string;
  name: string;
  title: string;
  image: string;
};

export type ProjectItemType = {
  name: string;
  imgLink: string;
  thumbnailLink?: string;
  location: string;
  overview: string[];
  serviceType?: string;
  client: string;
  contractor: string;
};

export type PortalCardType = {
  imgLink: string;
  title: string;
  desc: string;
};

export type SecurityItemType = {
  imgLink: string;
  title: string;
  desc: string;
};

export type SolutionType = {
  caseStudy?: boolean;
  title: string;
  description?: string;
  services: string[] | GenericType[];
  image: string;
};

export type GenericType = {
  title: string;
  desc: string | string[];
};

export type HeaderMenuItemType = {
  name: string;
  path: string;
};

export type Region = {
  name: string;
  hasDetails: boolean;
  details: string[];
  mapPosition: { top: string; left: string };
};

export type PdfCardItemType = {
  name: string;
  pdfUrl: string;
  thumbnail: string;
};

export type InsightItemType = {
  id: number;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  pdfUrl?: string;
};
