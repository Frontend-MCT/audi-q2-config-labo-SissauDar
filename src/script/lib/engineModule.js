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