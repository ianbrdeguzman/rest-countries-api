class API {
    async fetchCountries() {
        const url = `https://restcountries.eu/rest/v2/all`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const data = await response.json();
                const error = new Error(data.message);
                throw error;
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    async searchCountry(country) {
        const url = `https://restcountries.eu/rest/v2/name/${country}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const data = await response.json();
                const error = new Error(data.message);
                throw error;
            } else {
                const data = await response.json();
                return data[0];
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
}

export default API;
