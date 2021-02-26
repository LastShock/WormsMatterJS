function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
} function dmgOn() {
    deleteAllCookies();
    document.cookie = "on";
    location.reload();
}
function dmgOff() {
    deleteAllCookies();
    document.cookie = "off";
    location.reload();
}

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint, Body, Render } = Matter;
let map1;
let wormove = [];
let map = [];
let water = 0;
let waterGo = false;
let destructionOn = true;
let developer = true;
let alertDone = 0;
let isGameOver = false;
let waterClass = new Water();

let mouseDis = false;
let mouseUse = false;

console.log(document.cookie);

let time1 = new Date();
let time2 = new Date();

let pause1 = false;

var audioExplode = new Audio('sounds/granade.WAV');
const speaking = [];
speaking[0] = new Audio('sounds/speaking1.wav');
speaking[1] = new Audio('sounds/speaking2.wav');
speaking[2] = new Audio('sounds/speaking3.wav');
speaking[3] = new Audio('sounds/speaking4.wav');
speaking[4] = new Audio('sounds/speaking5.wav');

const audioDying = new Audio('sounds/dead.WAV');

const jumping = [];
jumping[0] = new Audio('sounds/jump1.wav');
jumping[1] = new Audio('sounds/jump2.wav');

const audioFalling = new Audio('sounds/falling.wav');
const audioOuch = new Audio('sounds/ouch.wav');


audioExplode.volume = 0.1;
let soundRdy = false;

let canvas;
let canvasWidth = 1520;
let canvasHeigh = 705;

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
let wind = 0.3;

let windOn = false;

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
    }, 300000);


    canvas = createCanvas(canvasWidth, canvasHeigh);
    engine = Engine.create();

    world = engine.world;

    let startingPosition = [
        { x: 1200, y: 290, taken: false },
        { x: 350, y: 265, taken: false },
        { x: 1400, y: 440, take: false },
        { x: 350, y: 650, taken: false },
        { x: 100, y: 450, taken: false },
        { x: 800, y: 620, taken: false },
        { x: 800, y: 290, taken: false },
        { x: 1000, y: 500, taken: false },
        { x: 200, y: 250, taken: false },
        { x: 1100, y: 500, taken: false },
        { x: 1450, y: 280, taken: false },
        { x: 200, y: 650, taken: false },
    ]
    let nameArray = [
        { name: "Pavel", taken: false },
        { name: "Jan", taken: false },
        { name: "Zdeněk", taken: false },
        { name: "David", taken: false },
        { name: "Karel", taken: false },
        { name: "Ondra", taken: false },
        { name: "Marek", taken: false },
        { name: "Václav", taken: false }
    ];
    let chooseTeam = false;
    for (let i = 0; i < 6; i++) {
        let indexPosition = Math.floor(Math.random() * startingPosition.length);

        let positionStart = startingPosition[indexPosition];

        if (positionStart.taken == false) {

            let indexName = Math.floor(Math.random() * nameArray.length)

            while (nameArray[indexName].taken == true) {
                indexName = Math.floor(Math.random() * nameArray.length);
            }
            nameArray[indexName].taken = true;

            console.log(positionStart);
            let nameOfWorm = nameArray[indexName].taken == true
            wormove[i] = new Worm(positionStart.x, positionStart.y, chooseTeam ? 1 : 2, nameArray[indexName].name);
            startingPosition[indexPosition].taken = true;
            chooseTeam = !chooseTeam;
        }
        else i--;

    }

    wormove[0].playing = true;
    wormove[0].staticWorm = false;
    wormove[0].attack = false;
    wormove[0].keyboardDis = true;
    setTimeout(() => { wormove[0].keyboardDis = false; }, 1000)

    time1 = new Date();
    time1.setSeconds(time1.getSeconds() + swapTime);

    if (document.cookie != "off") {
        random = new Destroy();
    }



    map[0] = new Map("313,226,312,208,312,188,324,171,337,159,349,152,369,148,389,148,403,154,413,162,423,166,435,168,448,168,459,177,464,190,475,199,486,200,500,202,512,204,520,204,540,203,554,203,571,223,575,228,590,231,603,232,613,232,628,233,645,234,661,235,683,235,698,247,707,260,718,264,734,264,747,267,750,286,750,301,731,311,669,312,643,312,572,314,537,317,480,320,443,321,398,314,361,302,336,289,327,271,", 780, 380)
    map[1] = new Map("588,475,601,458,608,450,618,430,618,422,620,396,620,388,621,372,621,356,621,332,621,317,615,303,608,293,599,284,590,272,576,269,559,264,548,254,535,234,541,208,552,195,563,192,588,192,608,192,627,190,659,187,676,185,695,185,714,185,730,185,746,184,768,184,784,184,804,184,821,188,842,196,856,208,863,213,856,224,852,239,847,248,824,258,811,271,797,288,795,312,796,328,796,352,796,372,803,388,816,416,825,426,836,445,842,458,840,473,797,476,769,476,736,478,703,482,680,483,660,483,640,481,614,477", 1450, 580)
    map[2] = new Map("441,456,432,438,428,417,428,396,440,381,464,362,502,356,527,358,553,359,587,359,614,359,622,357,641,348,669,338,698,338,722,349,730,372,741,406,746,448,740,474,656,485,584,484,523,480,427,481,435,456", 850, 680)
    map[3] = new Map('103,220,103,202,108,172,125,136,159,126,189,131,211,156,219,167,230,184,249,187,286,186,310,186,340,184,362,179,388,176,418,177,431,183,448,185,479,167,522,153,552,163,576,178,590,182,614,180,627,172,647,161,678,155,699,168,705,196,703,220,626,266,525,262,430,258,319,262,246,258,185,257,146,257,114,255,', 300, 680)
    map[4] = new Map("454,316,436,304,435,288,436,276,455,264,470,270,486,272,501,268,525,256,540,249,563,240,584,227,608,226,625,230,636,245,643,249,666,242,688,220,710,204,728,204,744,224,741,245,733,271,709,277,675,277,636,283,590,298,556,303,532,304,516,304,", 1100, 510)
    map[5] = new Map("667,254,654,248,647,225,655,208,684,208,721,213,755,199,814,177,886,160,892,160,933,161,969,169,1014,179,1048,187,1092,187,1154,187,1186,234,1167,265,1067,286,971,276,875,268,788,267,712,265,682,257,", 1300, 320)
    map[6] = new Map("557,419,588,400,596,375,591,356,528,346,440,378,365,358,304,354,259,359,217,357,180,321,133,300,107,318,103,393,132,435,256,446,323,438,555,420", 300, 280)
    map[7] = new Map("46,166,75,199,120,216,165,217,205,208,228,178,182,152,102,146,40,140,", 100, 480)
    map[8] = new Map("121,272,112,234,116,200,120,175,176,128,213,105,262,101,293,121,291,153,279,199,243,220,212,229,191,240,170,249,140,268,", 100, 80)
    map[9] = new Map("242,130,309,136,365,168,442,252,464,316,453,395,425,422,350,424,325,370,344,336,374,316,353,292,292,260,232,228,205,194,", 1400, 80)


}

function draw() {

    if (pause1 == false) {
        frameRate(50);
        Matter.Engine.update(engine)
        engine.velocityIterations = 3;
        background(bg);
        if (soundRdy == false) {
            setTimeout(() => {
                speaking[Math.floor(Math.random() * 5)].play();
                soundRdy = false;
            }, 20000)
            soundRdy = true;
        }

        for (let i = 0; i < wormove.length; i++) {
            if (wormove[i] != null && wormove[i].alive != false) {
                if (wormove[i].weapon.exploded == true) {
                    wormove[i].weapon.showExplosion();
                }
                else {

                    wormove[i].weapon.show();
                }
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




}
