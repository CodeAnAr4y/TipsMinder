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

export const cardStatusesArray = ['error', 'active', 'expired', 'suspended'];

export type CardStatus = (typeof cardStatusesArray)[number];

export type Card = BankCard & { id: number; status: CardStatus };

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
  bloodGroup: string;
  company: Company;
  crypto: Crypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  gender: 'female' | 'male' | 'other';
  hair: { color: string; type: string };
  height: number;
  weight: number;
  image: string;
  ip: string;
  macAddress: string;
  phone: string;
  role: 'admin' | 'moderator' | 'user';
  ssn: string;
  university: string;
  userAgent: string;
}
