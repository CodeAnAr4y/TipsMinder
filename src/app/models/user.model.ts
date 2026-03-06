export interface Address {
  address: string;
  city: string;
  country: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: { lat: number; lng: number };
}

export interface BankCard {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

export interface Crypto {
  coin: string;
  network: string;
  wallet: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  address: Address;
  age: number;
  bank: BankCard;
  birthDate: string;
  bloomGroup: string;
  company: Company;
  crypto: Crypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  gender: 'female' | 'male';
  hair: { color: string; type: string };
  height: number;
  weight: number;
  image: string;
  ip: string;
  macAddress: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
}
