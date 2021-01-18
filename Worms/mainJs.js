const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint, Body, Render } = Matter;
let map1;
let wormove = [];
let map = [];
let water = 0;
let waterGo = false;
let destructionOn = true;
let devloper = true;
let alertDone = 0;
let isGameOver = false;
let waterClass = new Water();

let mouseDis = false;
let mouseUse = false;


let cas;
let time1 = new Date();
let time2 = new Date();

var audio = new Audio('/sounds/granade.mp3');
audio.volume = 0.1;

let canvas;
let canvasWidth = 1520;
let canvasHeigh = 720;

let imgGr;
let bodyGround;
let imgWorm;
let imgWorm2;
let imgRpg;
let waterImg;
let imgExplosion;
let imgJumpLeft;
let imgJumpRight;


let timeGranatStart = new Date();
let render;

let swapTime = 30;
let wind = 0.03;

let animaceWorma = true;



function preload() {
    waterImg = loadImage("textury/wat.png");
    imgWormLeft = loadImage("textury/1.png");
    imgWormLeft2 = loadImage("textury/2.png");
    imgWormRight = loadImage("textury/1Right.png");
    imgWormRight2 = loadImage("textury/2Right.png");
    imgExplosion = loadImage("textury/explosion.png");
    imgGr = loadImage('textury/granade.png');
    bg = loadImage('textury/sky.png');
    imgRedGr = loadImage('textury/imgRedGr.png');
    imgJumpLeft = loadImage("textury/JumpRightInAir.png")
    imgJumpRight = loadImage("textury/JumpLeftInAir.png")

}

function setup() {


    setTimeout(() => {
        waterGo = true;
        waterClass.waterGo();
    }, 3000);


    canvas = createCanvas(canvasWidth, canvasHeigh);
    engine = Engine.create();
    world = engine.world;

    wormove[0] = new Worm(1200, 290, 1);
    wormove[1] = new Worm(350, 280, 2);
    wormove[2] = new Worm(1400, 420, 1);
    wormove[3] = new Worm(350, 500, 2);
    wormove[4] = new Worm(100, 400, 1);
    wormove[5] = new Worm(800, 600, 2);


    wormove[5].playing = true;
    if (destructionOn) {
        random = new Destroy();
    }


    map[0] = new Map("313,226,312,208,312,188,324,171,337,159,349,152,369,148,389,148,403,154,413,162,423,166,435,168,448,168,459,177,464,190,475,199,486,200,500,202,512,204,520,204,540,203,554,203,571,223,575,228,590,231,603,232,613,232,628,233,645,234,661,235,683,235,698,247,707,260,718,264,734,264,747,267,750,286,750,301,731,311,669,312,643,312,572,314,537,317,480,320,443,321,398,314,361,302,336,289,327,271,", 780, 400)
    map[1] = new Map("588,475,601,458,608,450,618,430,618,422,620,396,620,388,621,372,621,356,621,332,621,317,615,303,608,293,599,284,590,272,576,269,559,264,548,254,535,234,541,208,552,195,563,192,588,192,608,192,627,190,659,187,676,185,695,185,714,185,730,185,746,184,768,184,784,184,804,184,821,188,842,196,856,208,863,213,856,224,852,239,847,248,824,258,811,271,797,288,795,312,796,328,796,352,796,372,803,388,816,416,825,426,836,445,842,458,840,473,797,476,769,476,736,478,703,482,680,483,660,483,640,481,614,477", 1450, 600)
    map[2] = new Map("556,356,511,344,489,309,507,258,544,223,627,219,676,212,713,210,753,209,776,210,807,216,830,238,843,288,841,323,804,363,750,381,632,364", 850, 700);
    map[3] = new Map("4,433,12,416,20,406,34,400,54,393,73,388,104,388,124,389,152,384,172,378,191,368,216,367,243,367,267,372,282,381,297,389,313,393,343,399,377,402,400,404,435,405,465,406,494,406,529,406,553,404,580,388,600,373,625,372,640,388,642,398,642,416,642,439,639,464,615,475,583,476,549,479,500,479,477,479,436,480,412,480,384,480,352,480,324,486,284,486,248,486,211,486,168,486,110,492,79,492,36,492,3,469", 300, 700)
    map[4] = new Map("454,316,436,304,435,288,436,276,455,264,470,270,486,272,501,268,525,256,540,249,563,240,584,227,608,226,625,230,636,245,643,249,666,242,688,220,710,204,728,204,744,224,741,245,733,271,709,277,675,277,636,283,590,298,556,303,532,304,516,304,", 1100, 550)
    map[5] = new Map("505,432,548,416,602,416,669,404,712,404,778,397,869,386,912,387,961,400,949,454,883,457,816,429,741,433,671,439,572,459,496,465,505,438,501,428,", 1300, 320)
    map[6] = new Map("557,419,588,400,596,375,591,356,528,346,440,378,365,358,304,354,259,359,217,357,180,321,133,300,107,318,103,393,132,435,256,446,323,438,555,420", 300, 300)
    map[7] = new Map("46,166,75,199,120,216,165,217,205,208,228,178,182,152,102,146,40,140,", 100, 500)
    map[8] = new Map("121,272,112,234,116,200,120,175,176,128,213,105,262,101,293,121,291,153,279,199,243,220,212,229,191,240,170,249,140,268,", 100, 100)
    map[9] = new Map("242,130,309,136,365,168,442,252,464,316,453,395,425,422,350,424,325,370,344,336,374,316,353,292,292,260,232,228,205,194,", 1400, 100)


}

function draw() {

    Matter.Engine.update(engine, [delta=16], [correction=1])
    background(bg);

   
    for (let i = 0; i < wormove.length; i++) {
        if (wormove[i].weapon.exploded == true) {
            wormove[i].weapon.showExplosion();
        }
        else {
            wormove[i].weapon.show();
        }
    }
    for (let i = 0; i < map.length; i++) {
        if (map[i] != null) {
            map[i].show();
        }
    }
    wormove.forEach(worm => worm.show())

    waterClass.show();


}
