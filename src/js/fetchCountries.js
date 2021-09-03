const ENDPOINT = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountries(searchQuery) {
    const searchParams = 'fields=name;capital;population;flag;languages';
    const requestUrl = `${ENDPOINT}/${searchQuery}?${searchParams}`;

    return fetch(requestUrl).then(response => {
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return response.json();
    });
}
