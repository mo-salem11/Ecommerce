export interface Addresses {
  _id: string
  name: string
  details: string
  city: string
  phone: string
}

export interface specificAddress {
  data: {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  };
}
