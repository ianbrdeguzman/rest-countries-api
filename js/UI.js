class UI {
    createCountry({ name, flag, population, region, capital }, container) {
        const html = `
            <div class="country">
                <div>
                    <img
                        src="${flag}"
                        alt="${name}"
                        />
                </div>
                <div>
                    <h2>${name}</h2>
                    <p>Population: <span>${population.toLocaleString()}</span></p>
                    <p>Region: <span>${region}</span></p>
                    <p>Capital: <span>${capital}</span></p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    }
    changeTheme(element, button) {
        element.classList.toggle('light-theme');
        if (element.classList.contains('light-theme')) {
            button.innerHTML = '<i class="fas fa-moon"></i>Dark Mode';
        } else {
            button.innerHTML = '<i class="fas fa-sun"></i>Light Mode';
        }
    }
}

export default UI;
