import { getNames, registerLocale } from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

registerLocale(en);

// Get English names for all countries
const countryNames = getNames('en');

// Convert to the format expected by SelectInput: { label: string, value: string }
export const countries = Object.entries(countryNames)
  .map(([code, name]) => ({
    label: name,
    value: code,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
