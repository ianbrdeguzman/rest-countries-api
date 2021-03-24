class Storage {
    static storeCountries(countries) {
        localStorage.setItem('countries', JSON.stringify(countries));
    }
}

export default Storage;
