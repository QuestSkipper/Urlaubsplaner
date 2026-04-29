async function getPlaceName(lat, lng) {
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=de,en`, {
    headers: { 'User-Agent': 'KretaApp/1.0' }
  });
  const geoData = await geoRes.json();
  
  let rawPlaceName = geoData.address?.village || geoData.address?.town || geoData.address?.city_district || geoData.address?.hamlet || geoData.address?.suburb || geoData.address?.locality || geoData.address?.city || geoData.name || '';
  
  if (!rawPlaceName && geoData.address?.municipality) {
      rawPlaceName = geoData.address.municipality;
  }
  let placeName = '';
  if (rawPlaceName) {
      placeName = rawPlaceName.replace(/Municipal Unit|Municipality|Gemeinde|Provinz|Regionalbezirk|Region/ig, '').trim();
  }
  return placeName;
}

async function test() {
  console.log("Myrtos:", await getPlaceName(35.004, 25.584));
  console.log("Gerokampos:", await getPlaceName(34.93, 24.91));
}
test();
