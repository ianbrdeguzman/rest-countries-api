class UI {
    createCountry(
        { name, flag, population, region, capital, alpha3Code },
        container
    ) {
        const html = `
            <div class="country" data-id="${alpha3Code}">
                <div>
                    <img
                        src="${flag}"
                        alt="${name}"
                        />
                </div>
                <div>
                    <h2>${name}</h2>
                    <p>Population: ${population.toLocaleString()}</p>
                    <p>Region: ${region}</p>
                    <p>Capital: ${capital}</p>
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
    hideMainSection(modal, container) {
        modal.classList.add('active');
        container.style.display = 'none';
    }
    showMainSection(modal, container) {
        container.style.display = 'flex';
        modal.classList.remove('active');
    }
    createCountryModal(
        {
            name,
            nativeName,
            flag,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
        },
        container
    ) {
        container.innerHTML = '';
        const newLanguages = languages
            .map((language) => {
                return language.name;
            })
            .join(' ')
            .replace(/\s/g, ', ');
        const html = `
            <div>
                <button><i class="fas fa-long-arrow-alt-left"></i>Back</button>
                <div class="country-detail">
                    <div>
                        <img src="${flag}" alt="${name}" />
                    </div>
                    <div class="country-info">
                        <div class="info-one">
                            <div>
                                <h2>${name}</h2>
                                <p>Native Name: ${nativeName}</p>
                                <p>Population: ${population.toLocaleString()}</p>
                                <p>Region: ${region}</p>
                                <p>Sub Region: ${subregion}</p>
                                <p>Capital: ${capital}</p>
                            </div>
                            <div>
                                <p>Top Level Domain: ${topLevelDomain[0]}</p>
                                <p>Currencies: ${currencies[0].name}</p>
                                <p>Languages: ${newLanguages}</p>
                            </div>
                        </div>
                        <div class="info-two">
                            <h3>Border Countries:</h3>
                            <p class="border-container">
                            <span>N/A</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
        return borders;
    }
    createCountryBorders(borders) {
        const borderContainer = document.querySelector('.border-container');
        if (borders.length == 0) {
            return;
        } else {
            borderContainer.innerHTML = '';
            borders.forEach((border) => {
                const span = `<span>${border}</span>`;
                borderContainer.insertAdjacentHTML('beforeend', span);
            });
        }
    }
}

export default UI;
