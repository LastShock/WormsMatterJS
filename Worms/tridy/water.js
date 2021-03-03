class Water {
    constructor() {
    }

    waterGo() {

        for (let i = 0; i < 20; i++) {

            water += 0.5;

        }
        setTimeout(() => {
            if (water < canvasHeight / 2.8) {


                this.waterGo();
            }
            else {

            }
        }, 30000);
    }

    show() {
        fill('blue');
        image(waterImg, 0, 420 - water, 1600, 720);
    }
}
