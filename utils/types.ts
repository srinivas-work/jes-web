export type ServiceSectionType = {
  title: string;
  image: string;
  description: string;
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
  overviewOpt?: string;
  serviceType?: string;
  client: string;
  contractor: string;
};
