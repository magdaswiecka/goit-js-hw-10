export function fetchCountries(name) {
  return new Promise((resolve, reject) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
      if(response.status === 404) {
        resolve([]);
      } else {
        response.json().then(data => {
          resolve(data)
        })
      }
    });
  });
}