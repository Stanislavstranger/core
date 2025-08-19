export type ServiceListElement = {
  id: string;
  name: string;
  description: string;
};

export type CreateServiceListElementCommand = {
  name: string;
  description: string;
};

export type DeleteServiceListElementCommand = {
  id: string;
};
