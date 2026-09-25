export type BaseContactCard = {
  id: string;
  iconPath: string;
  title: string;
};

export type PersonContactCard = BaseContactCard & {
  type: 'person';
  name: string;
  role: string;
  email: string;
  ctaText: string;
};

export type InfoContactCard = BaseContactCard & {
  type: 'info';
  description: string;
  email: string;
  ctaText: string;
};

export type LinksContactCard = BaseContactCard & {
  type: 'links';
  links: Array<{ text: string; href: string }>;
};

export type ContactCardType = PersonContactCard | InfoContactCard | LinksContactCard;
