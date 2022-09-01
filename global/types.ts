import { type } from "os";

type Address = {
  streetOne: string;
  streetTwo: string;
  city: string;
  state: string;
  zip: number;
};

type Position = {
  lat: number;
  long: number;
};

type Restaurant = {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
    viewport: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  name: string;
  place_id: string;
  rating: number;
  reference: string;
  user_ratings_total: 166;
};

type Action =
  | { type: "SET_ADDRESS"; payload: Address }
  | { type: "DEL_ADDRESS"; payload: Address };

type State = {
  data: Address;
  isLoading: boolean;
  error?: string;
};

export type { Address, Position, Restaurant, Action, State };
