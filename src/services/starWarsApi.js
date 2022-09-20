async function fetchStarWarsApi() {
  const url = 'https://swapi.dev/api/planets';
  try {
    const fetchStarWars = await fetch(url);
    const resultJson = await fetchStarWars.json();
    return resultJson.results;
  } catch (error) {
    console.log(error);
  }
}

export default fetchStarWarsApi;
