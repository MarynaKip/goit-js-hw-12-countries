import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import countriesTemplate from './templates/countriesList.hbs';
import countryTemplate from './templates/country.hbs';
import RestCountriesApi from './js/rest-countries.js';

var debounce = require('debounce');

const refs = {
  searchForm: document.querySelector('.search-form'),
  countriesContainer: document.querySelector('.js-countries-container'),
};

const restCountriesApi = new RestCountriesApi();

refs.searchForm.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  restCountriesApi.query = event.target.value;

  fetchCountries();
}

function fetchCountries() {
  restCountriesApi.fetchCountries().then(countries => {
    appendCountries(countries);
  });
}

function appendCountries(countries) {
  let template = '';
  if (countries.length === 1) {
    template = countryTemplate(countries);
  } else if (countries.length > 1 && countries.length < 11) {
    template = countriesTemplate(countries);
  } else {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
  refs.countriesContainer.insertAdjacentHTML('beforeend', template);
}
