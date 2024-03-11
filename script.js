'use strict';

const btn = document.querySelector('.btn-country');
const input = document.querySelector('#input');
const check = document.querySelector('#check');
const form = document.querySelector('form');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////

// create countries Element
function createCountryElement(mainCountryData, className = '') {
  let { flags, name, region, population, languages, currencies } =
    mainCountryData;
  let languageName, currencieName;
  for (const i in languages) languageName = languages[i];
  for (const i in currencies) currencieName = currencies[i].name;
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${name.common}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(
          1
        )}</p>
        <p class="country__row"><span>🗣️</span>${languageName}</p>
        <p class="country__row"><span>💰</span>${currencieName}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
// ///////////////////////////////////////////////////////////////////////////
// const countriesData = function (country) {
//   const request = new XMLHttpRequest();
//   const routeURL = country === 'all' ? 'all' : `name/${country}`;
//   request.open('GET', `https://restcountries.com/v3.1/${routeURL}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data1] = JSON.parse(this.responseText);
//     createCountryElement(data1);

//     const neighbour = data1.borders?.[0];
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       createCountryElement(data2, 'neighbour');
//     });
//   });
// };

let changed;
check.addEventListener('change', function () {
  changed = this.checked;
});

input.focus();
form.addEventListener('submit', e => {
  e.preventDefault();
  countriesContainer.innerHTML = '';
  // countriesData(input.value);
  getcountryData(input.value);
  input.value = '';
});

function getcountryData(routeURL) {
  fetch(`https://restcountries.com/v3.1/name/${routeURL}`)
    .then(res => res.json())
    .then(data => {
      createCountryElement(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then(res => res.json())
        .then(data => createCountryElement(data[0], 'neighbour'));
    });
}
