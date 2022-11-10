import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const countryListElem = document.querySelector("ul.country-list")
const countryInfoElem = document.querySelector("div.country-info")
const searchBoxElem = document.querySelector("input#search-box");


const DEBOUNCE_DELAY = 300;

function addCountryInfo(country) {
  const flagUrl = country.flags.svg;
  const capital = country.capital;
  const countryName = country.name.official;
  const population = country.population;
  const languages = Object.values(country.languages).join(', ');

  
  countryInfoElem.innerHTML = `
    <div class="country-info-name">
      <img src="${flagUrl}">
      <h2>${countryName}</h2>
    </div>
    <ul class="country-info-list">
      <li>
        <span class="bold">Capital:</span> ${capital}
      </li>
      <li>
        <span class="bold">Population:</span> ${population}
      </li>
      <li>
        <span class="bold">Languages:</span> ${languages}
      </li>
    </ul>
  `
}

function addCountryToList(country) {
  const flagUrl = country.flags.svg;
  const countryName = country.name.official;

  countryListElem.insertAdjacentHTML('beforeend', `
    <li class="country-list-elem">
      <img src="${flagUrl}">
      ${countryName}
    </li>
  `)
}

function addCountriesToHtml(countries) {
  if(countries.length > 1) {
    for(const country of countries) {
      addCountryToList(country);
    }
  } else if(countries.length === 1) {
    addCountryInfo(countries[0])
  }
}

function inputSearch(event) {
  const searchText = event.target.value.trim();

  fetchCountries(searchText).then(countries => {
    countryInfoElem.textContent = ''
    countryListElem.textContent = ''
    
    if(countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if(countries.length === 0) {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    } else {
      addCountriesToHtml(countries);
    }
  })
}


searchBoxElem.addEventListener("input", debounce(inputSearch, DEBOUNCE_DELAY));




// fetchCountries("pol").then(countries => {
//   console.log(countries);
// });

