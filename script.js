'use strict';

const btn = document.querySelector('.btn-country');
const input = document.querySelector('#input');
const check = document.querySelector('#check');
const form = document.querySelector('form');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////

// create countries Element
function createCountryElement(mainCountryData, className = '') {
  let { flag, name, region, population, languages, currencies } =
    mainCountryData;
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(
          1
        )}</p>
        <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
        <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
// ///////////////////////////////////////////////////////////////////////////
const countriesData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data1] = JSON.parse(this.responseText);
    createCountryElement(data1);

    const request2 = new XMLHttpRequest();
    const neighber = data1.borders;
    console.log(neighber[0]);
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighber[0]}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      createCountryElement(data2, 'neighber');
    });
  });
};

let changed;
check.addEventListener('change', function () {
  changed ? (changed = false) : (changed = true);
});

input.focus();
form.addEventListener('submit', e => {
  e.preventDefault();
  countriesData(input.value);
  input.value = '';
});
