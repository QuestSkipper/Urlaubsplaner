const fs = require('fs');

const coords = {
  'Matala Beach': [34.9934, 24.7495],
  'Kommos Beach': [35.0130, 24.7598],
  'Agiofarago Beach': [34.9272, 24.7780],
  'Preveli Beach': [35.1525, 24.4735],
  'Red Beach (Kokkini Ammos)': [34.9912, 24.7490],
  'Triopetra Beach': [35.1189, 24.5484],
  'Rethymno Altstadt': [35.3688, 24.4736],
  'Kalamaki Beach': [35.0270, 24.7590],
  'Agia Galini': [35.0967, 24.6888],
  'Palast von Knossos & Heraklion': [35.2981, 25.1631],
  'Elafonisi Beach': [35.2711, 23.5413],
  'Chania': [35.5138, 24.0180],
  'Frangokastello': [35.1820, 24.2343],
  'Kloster Arkadi': [35.3101, 24.6293],
  'Kissamos / Balos': [35.5802, 23.5932],
  'Omalos Hochebene': [35.3015, 23.9592],
  'Plaka / Elounda': [35.2978, 25.7380],
  'Halbinsel Akrotiri': [35.5519, 24.1934],
  'Kourtaliotiko': [35.1950, 24.4633],
  'Kournas': [35.3312, 24.2796],
  'Vai / Itanos': [35.2543, 26.2654],
  'Psychro': [35.1651, 25.4452],
  'Xerokampos': [35.0440, 26.2163],
  'Chora Sfakion / Loutro': [35.2003, 24.0784],
  'Kalypso Fjord': [35.1704, 24.3986],
  'Voulismeni See': [35.1908, 25.7178]
};

let data = fs.readFileSync('./src/data/itinerary.ts', 'utf8');

data = data.replace(/export interface ItineraryItem \{/, "export interface ItineraryItem {\n  lat: number;\n  lng: number;");

for (const [location, [lat, lng]] of Object.entries(coords)) {
  const regex = new RegExp(`(location:\\s*'${location}',)`);
  data = data.replace(regex, `$1\n    lat: ${lat},\n    lng: ${lng},`);
}

fs.writeFileSync('./src/data/itinerary.ts', data);
console.log('Updated itinerary.ts');
