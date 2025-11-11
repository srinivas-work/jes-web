export type ServiceItemType = {
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
