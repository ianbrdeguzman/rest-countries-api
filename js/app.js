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
            modal: document.querySelector('.modal-container'),
        };
    }
    setup() {
        this.fetchCountries();
        this.filterByRegion();
        this.searchCountry();
        this.changeTheme();
    }
    async fetchCountries() {
        if (localStorage.getItem('countries')) {
            const countries = Storage.getCountries();
            countries.forEach((country) => {
                ui.createCountry(country, this.DOMElements.container);
            });
            this.showCountryDetail();
        } else {
            const countries = await api.fetchCountries();
            this.DOMElements.container.innerHTML = '';
            countries.forEach((country) => {
                console.log(country.alpha3Code);
                ui.createCountry(country, this.DOMElements.container);
            });
            Storage.storeCountries(countries);
            this.showCountryDetail();
        }
    }
    filterByRegion() {
        this.DOMElements.select.addEventListener('change', async (e) => {
            this.DOMElements.container.innerHTML = '';
            if (e.target.value == 'All') {
                this.fetchCountries();
            }
            const countries = Storage.getCountriesByRegion(e.target.value);
            countries.forEach((country) => {
                ui.createCountry(country, this.DOMElements.container);
            });
            this.showCountryDetail();
        });
    }
    searchCountry() {
        this.DOMElements.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!this.DOMElements.input.value) {
                alert('Enter a country');
            } else {
                const country = await api.searchCountry(
                    this.DOMElements.input.value
                );
                if (country) {
                    this.DOMElements.container.innerHTML = '';
                    ui.createCountry(country, this.DOMElements.container);
                    this.DOMElements.form.reset();
                    this.showCountryDetail();
                }
            }
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
    showCountryDetail() {
        const countries = document.querySelectorAll('.country');
        countries.forEach((country) => {
            country.addEventListener('click', () => {
                ui.hideMainSection(
                    this.DOMElements.modal,
                    this.DOMElements.container
                );
                const countryDetails = Storage.findCountryDetail(country);
                const borders = ui.createCountryModal(
                    countryDetails,
                    this.DOMElements.modal
                );
                const bordersName = Storage.findBorders(borders);
                ui.createCountryBorders(bordersName);
                this.hideCountryDetail();
            });
        });
    }
    hideCountryDetail() {
        const backBtn = document.querySelector('.modal-container div button');
        backBtn.addEventListener('click', () => {
            ui.showMainSection(
                this.DOMElements.modal,
                this.DOMElements.container
            );
        });
    }
}

const app = new App();
const api = new API();
const ui = new UI();

app.setup();
