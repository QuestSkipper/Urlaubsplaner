import { baseItinerary, optionalItinerary, extraSights, type ItineraryItem } from './itinerary';
import { mallorcaBase, mallorcaOptional, mallorcaSights } from './mallorca';

export interface Destination {
  id: string;
  name: string;
  country: string;
  center: [number, number]; // map center
  baseLocation: { name: string; lat: number; lng: number }; // default base for route calculation
  wikiSearchSuffix: string;
  baseItinerary: ItineraryItem[];
  optionalItinerary: ItineraryItem[];
  extraSights: ItineraryItem[];
  defaultImage: string;
}

export const destinations: Destination[] = [
  {
    id: 'kreta',
    name: 'Kreta',
    country: 'Griechenland',
    center: [35.20, 24.80],
    baseLocation: { name: 'Matala', lat: 34.9934, lng: 24.7495 },
    wikiSearchSuffix: 'Kreta',
    baseItinerary: baseItinerary,
    optionalItinerary: optionalItinerary,
    extraSights: extraSights,
    defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Crete_-_Chania_-_Venetian_Harbour.jpg/800px-Crete_-_Chania_-_Venetian_Harbour.jpg',
  },
  {
    id: 'mallorca',
    name: 'Mallorca',
    country: 'Spanien',
    center: [39.69, 2.99],
    baseLocation: { name: 'Cala d\'Or', lat: 39.373, lng: 3.228 },
    wikiSearchSuffix: 'Mallorca',
    baseItinerary: mallorcaBase,
    optionalItinerary: mallorcaOptional,
    extraSights: mallorcaSights,
    defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Palma_de_Mallorca_-_Catedral_01.jpg/800px-Palma_de_Mallorca_-_Catedral_01.jpg',
  }
];
