import API from './API.js';
import UI from './UI.js';
import Storage from './Storage.js';

class App {
    constructor() {
        this.DOMElements = {
            container: document.querySelector('.countries-container'),
            select: document.querySelector('select'),
            form: document.querySelector('form'),
            input: document.querySelector('input'),
            themeBtn: document.querySelector('header button'),
        };
    }
    setup() {
        this.fetchCountries();
        this.filterByRegion();
        this.searchCountry();
        this.changeTheme();
    }
    async fetchCountries() {
        const countries = await api.fetchCountries();
        this.DOMElements.container.innerHTML = '';
        countries.forEach((countries) => {
            ui.createCountry(countries, this.DOMElements.container);
        });
        Storage.storeCountries(countries);
    }
    filterByRegion() {
        this.DOMElements.select.addEventListener('change', async (e) => {
            this.DOMElements.container.innerHTML = '';
            const countries = JSON.parse(
                localStorage.getItem('countries')
            ).filter((country) => {
                return country.region == e.target.value;
            });
            countries.forEach((country) => {
                ui.createCountry(country, this.DOMElements.container);
            });
        });
    }
    searchCountry() {
        this.DOMElements.form.addEventListener('submit', async (e) => {
            this.DOMElements.container.innerHTML = '';
            e.preventDefault();
            const country = await api.searchCountry(
                this.DOMElements.input.value
            );
            ui.createCountry(country, this.DOMElements.container);
            this.DOMElements.form.reset();
        });
    }
    changeTheme() {
        this.DOMElements.themeBtn.addEventListener('click', () => {
            ui.changeTheme(
                document.querySelector('body'),
                this.DOMElements.themeBtn
            );
        });
    }
}

const app = new App();
const api = new API();
const ui = new UI();

app.setup();
