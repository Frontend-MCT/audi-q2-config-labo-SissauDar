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