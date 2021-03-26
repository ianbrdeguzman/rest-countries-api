class Storage {
    static storeCountries(countries) {
        localStorage.setItem('countries', JSON.stringify(countries));
    }
    static getCountriesByRegion(region) {
        const countries = JSON.parse(localStorage.getItem('countries')).filter(
            (country) => {
                return country.region == region;
            }
        );
        return countries;
    }
    static getCountries() {
        const countries = JSON.parse(localStorage.getItem('countries'));
        return countries;
    }
    static findCountryDetail(country) {
        return JSON.parse(localStorage.getItem('countries')).find(
            (countryDetail) => {
                return countryDetail.alpha3Code == country.dataset.id;
            }
        );
    }
    static findBorders(borders) {
        const bordersName = [];
        const countries = JSON.parse(localStorage.getItem('countries'));
        countries.forEach((country) => {
            borders.forEach((border) => {
                if (country.alpha3Code == border) {
                    bordersName.push(country.name);
                }
            });
        });
        return bordersName;
    }
}

export default Storage;
