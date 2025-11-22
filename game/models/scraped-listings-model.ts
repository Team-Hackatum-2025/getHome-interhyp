interface ListingModel {
  id: string;
  buyingPrice: number;
  zip: string;
  rooms: number;
  squareMeter: number;
}

export interface ScrapedListingsModel {
  total: number;
  results: ListingModel[];
}
