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