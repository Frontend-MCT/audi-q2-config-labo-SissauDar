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