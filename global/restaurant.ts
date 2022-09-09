export interface Restaurant {
  id: number;
  name: string;
  geometry: GeoLocation;
  // business_status: string;
  // formatted_address: string;
  // geometry: Geometry;
  // icon: string;
  // icon_background_color: string;
  // icon_mask_base_uri: string;
  // name: string;
  // opening_hours: OpeningHours;
  // photos: Photo[];
  // place_id: string;
  // plus_code: PlusCode;
  // price_level: number;
  // rating: number;
  // reference: string;
  // types: string[];
  // user_ratings_total: number;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export type GeoLocation = {
  lat: number;
  lng: number;
};

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}
