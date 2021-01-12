class Water {
    constructor() {
    }

    waterGo() {
        for (let i = 0; i < 10; i++) {

            water += 1;
        }
        setTimeout(() => {
            if (water < canvasHeigh / 2.8) {


                this.waterGo();
            }
            else {

            }
        }, 3000);
    }
    show() {
        fill('blue');
        image(waterImg, 0, 420 - water, 1600, 720);
    }
}
