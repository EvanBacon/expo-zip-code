const getGeoForZipAsync = async zipcode => {
  const url = `https://raw.githubusercontent.com/EvanBacon/zipcodes/master/${zipcode}.geojson`;
  return new Promise((res, rej) =>
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(res)
  );
};

export default getGeoForZipAsync