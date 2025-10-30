export type ServiceItemType = {
  title: string;
  image: string;
  description: string | string[];
  subServices?: SubServiceType[];
  pdfLink?: string;
};

export type SubServiceType = {
  title: string;
  desc: string[];
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
  overview: string;
  overview2?: string;
  overview3?: string;
  serviceType?: string;
  client: string;
  contractor: string;
};

export type PortalCardType = {
  imgLink: string;
  title: string;
  desc: string;
};
