import refs from '../js/refs';
import fetchCountries from '../js/fetchCountries';
import listCountryNameTemplate from '../templates/listCountryNames.hbs';
import countryTemplate from '../templates/country.hbs';
import { notification } from '../js/pnotify';
import clearView from '../js/clearView';

const INFO_MESSAGE_NOTIFY = 'Too many matches found. Please enter a more specific query!';
const ERROR_MESSAGE_NOTIFY = 'Oops, there is no country with that name';

function onCountriesSearchInput({ target: { value } }) {
    const searchQuery = value.trim();
    const isSearchQueryEmpty = searchQuery.length === 0;

    if (isSearchQueryEmpty) {
        clearView(refs.countryList);
        return;
    }

    fetchCountries(searchQuery).then(updateView).catch(errorHandler);
}

function updateView(countries) {
    if (countries.length === 1) {
        refs.countryList.innerHTML = countryTemplate(countries);
        removeEventListenerOnCountryItemClick();
        return;
    }

    if (countries.length >= 2 && countries.length <= 10) {
        refs.countryList.innerHTML = listCountryNameTemplate(countries);

        refs.countryList.addEventListener('click', onCountryItemClick);
        return;
    }

    notification('info', INFO_MESSAGE_NOTIFY);
}

function errorHandler(error) {
    console.log(error);
    notification('error', ERROR_MESSAGE_NOTIFY);
}

function onCountryItemClick({ target }) {
    const { nodeName } = target;
    let searchQuery = null;

    if (nodeName === 'LI') {
        searchQuery = target.querySelector('span').textContent;
        fetchCountries(searchQuery).then(updateView).catch(errorHandler);
        removeEventListenerOnCountryItemClick();
        return;
    }

    if (nodeName === 'IMG') {
        searchQuery = target.nextElementSibling.textContent;
        fetchCountries(searchQuery).then(updateView).catch(errorHandler);
        removeEventListenerOnCountryItemClick();
        return;
    }

    if (nodeName === 'SPAN') {
        searchQuery = target.textContent;
        fetchCountries(searchQuery).then(updateView).catch(errorHandler);
        removeEventListenerOnCountryItemClick();
        return;
    }
}

function removeEventListenerOnCountryItemClick() {
    refs.countryList.removeEventListener('click', onCountryItemClick);
}

export { onCountriesSearchInput };
