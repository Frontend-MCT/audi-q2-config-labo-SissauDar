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