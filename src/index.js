import './sass/main.scss';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import { onCountriesSearchInput } from './services/countries';

const DEBOUNCE_DELAY = 500;

refs.countriesSearch.addEventListener('input', debounce(onCountriesSearchInput, DEBOUNCE_DELAY));
