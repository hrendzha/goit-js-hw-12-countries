export default function fetchCountries(searchQuery) {
    return fetch(
        `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;flag;languages`,
    ).then(response => {
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return response.json();
    });
}
