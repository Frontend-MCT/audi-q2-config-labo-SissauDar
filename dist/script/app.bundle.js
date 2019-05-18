const colorPicker = (function() {

  let linkHolder = null,
    svgHolder = null,
    imageHolder = null,
    currentColor = '#FCB800';

  const hexMapper = {
    '#FCB800': 'yellow',
    '#C03D08': 'red',
    '#004E91': 'blue',
    '#252325': 'black',
    '#DFE5E9': 'grey',
    '#ffffff': 'white'
  }

  const setup = function({
    link,
    svg,
    image
  }) {
    linkHolder = document.querySelectorAll(`.${link}`);
    svgHolder = document.querySelectorAll(`.${svg}`);
    imageHolder = document.querySelector(`.${image}`);
    setClickEvents();
  };

  const setClickEvents = function() {

    linkHolder.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });

    svgHolder.forEach((svg) => {
      console.log(svg);
      svg.addEventListener('click', function() {
        currentColor = this.getAttribute("fill");
        changeColors()
      });
    });

  };

  const changeColors = function() {
    document.documentElement.style.setProperty('--main-color', currentColor);
    imageHolder.src = `./assets/q2-${hexMapper[`${currentColor}`]}.png`
  };

  return {
    setup: setup
  };

})();
const configurator = (function() {

  let pageHolder = null,
    linksHolder;

  const navigation = (function() {

    const setup = function({
      pageSelect,
      links
    }) {
      pageHolder = document.querySelector(`.${pageSelect}`);
      linksHolder = document.querySelectorAll(`.${links}`);
      linksHolder.forEach((link) => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const linkActive = document.querySelector('.c-links__link--active');
          if (linkActive != null) {
            linkActive.classList.remove("c-links__link--active");
          }
          link.classList.add("c-links__link--active");
          switch (this.getAttribute('data-page')) {
            case 'interior':
              showInterior();
              break;
            case 'engine':
              showEngine();
              break;
            default:
              showExterior();
          }
        });
      });
    };

    const showExterior = function() {
      console.log('showExterior');
      pageHolder.style.transform = 'translateX(0%)'
    };

    const showInterior = function() {
      console.log('showInterior called');
      pageHolder.style.transform = 'translateX(-33.3333%)'
    };

    const showEngine = function() {
      console.log('showEngine called');
      pageHolder.style.transform = 'translateX(-66.6666%)'
    };

    return {
      setup: setup,
      showExterior: showExterior,
      showInterior: showInterior,
      showEngine: showEngine
    };

  })();

  const options = (function() {

    const setup = function() {
      console.log('setup');
    };

    const listentocolorchange = function() {
      console.log('listentocolorchange ');
    };

    const fetchengines = function() {
      console.log('fetchengines ');
    };

    const updatecurency = function() {
      console.log('updatecurency  ');
    };

    return {
      setup: setup,
      listentocolorchange: listentocolorchange,
      fetchengines: fetchengines,
      updatecurency: updatecurency
    };

  })();

  return {
    navigation: navigation,
    options: options
  };

})();
const dataAccess = (function() {
  const engineAPI = ({
    url,
    method = "GET",
    body = null,
    handleError = "Error: "
  }) => {
    return fetch(url, {
        method: method,
        body: body,
      })
      .then(response => response.json())
      .then(data => data)
      .catch(err => handleError(err));

  };
  return {
    engineAPI: engineAPI
  };
})();
class Engine {
  constructor({
    name,
    price,
    acceleration,
    emission,
    milage,
    displacement,
    power,
    speed
  }) {
    Object.assign(this, {
      name,
      price,
      acceleration,
      emission,
      milage,
      displacement,
      power,
      speed
    });
  }


  generateDOMNode(callback) {
    let engine = document.createElement('div');
    engine.setAttribute('class', 'c-engine');

    engine.innerHTML += `
      <section class="c-engine__top o-layout o-layout--justify-space-around">
        <p class="c-engine__title">${this.name}</p>
        <p class="c-engine__price">${this.price}</p>
      </section>
      <section class="c-engine__bottom o-layout o-layout--justify-start">

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.acceleration}</p>
        </div>

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.emission}</p>
        </div>

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.milage}</p>
        </div>

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.displacement}</p>
        </div>

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.power}</p>
        </div>

        <div class="c-detail o-layout o-layout--justify-space-evenly o-layout--align-center">
          <div class="c-detail__icon">
            <img src="assets/timer.png" alt="" class="c-detail__icon-image">
          </div>
          <p class="c-detail__value">${this.speed}</p>
        </div>

      </section>

    `;
    engine.addEventListener('click', callback);

    return engine;
  }
}
const engineModule = (function() {

  let AllEngines = [];
  let engineHolder = null;


  const setup = function({
    engineClass
  }) {
    engineHolder = document.querySelector(`.${engineClass}`);
  };

  const getEngines = function() {
    console.log('getEngines called');
    return dataAccess.engineAPI({
      url: 'data/engines.json',
      handleError: (error) => console.log('Something went wrong: ', error)
    });
  };

  const makeEngines = async function() {
    const engines = await getEngines();
    engines.engines.forEach(function(item) {
      const newEngine = new Engine({
        name: item.name,
        price: item.price,
        acceleration: item.acceleration,
        emission: item.emission,
        milage: item.milage,
        displacement: item.displacement,
        power: item.power,
        speed: item.speed
      });
      AllEngines.push(newEngine);
    })
    addToPage(AllEngines);
    return AllEngines
  };

  const addToPage = function(engines) {

    engines.forEach(function(item) {

      engineHolder.appendChild(item.generateDOMNode(function(e) {
        console.log(e);
        console.log('hey');
      }));

    });

  };


  return {
    makeEngines: makeEngines,
    setup: setup
  };

})();
(function() {

  document.addEventListener('DOMContentLoaded', async () => {
    console.log('Script loaded ✔');

    configurator.navigation.setup({
      pageSelect: 'js-pageSelect',
      links: 'js-link'
    });

    colorPicker.setup({
      link: 'js-colorlink',
      svg: 'js-colorsvg',
      image: 'js-image'
    });

    engineModule.setup({
      engineClass: 'js-fillengines'
    });

    await engineModule.makeEngines();

  });

})();