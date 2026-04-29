async function test() {
  const placeName = "Mirtos";
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=taverna+in+${placeName}+Kreta&limit=3&accept-language=de,en`;
  
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'KretaApp/1.0' } });
    const data = await res.json();
    console.log("Tavernas for Mirtos:", data.map(d => d.name));
  } catch(e) {
    console.error(e);
  }
}
test();
