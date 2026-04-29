const lat = 35.011;
const lng = 24.811;

async function test() {
  // 1. Route
  const routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/24.7495,34.9934;${lng},${lat}?overview=false`);
  const routeData = await routeRes.json();
  const durationSec = routeData.routes[0].duration;
  const distanceMeters = routeData.routes[0].distance;
  console.log("Route:", Math.round(durationSec / 60), "min", Math.round(distanceMeters / 1000), "km");

  // 2. Overpass
  const overpassQuery = `[out:json];node["amenity"~"restaurant|cafe"](around:5000,${lat},${lng});out 1;`;
  const overpassRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
  const overpassData = await overpassRes.json();
  if (overpassData.elements && overpassData.elements.length > 0) {
     console.log("Taverna:", overpassData.elements[0].tags.name);
  } else {
     console.log("No taverna");
  }
}
test();
