const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint, Body, Render } = Matter;

let wormove = [];
let map = [];
let water = 0;
let waterStart = false;
let destructionOn = true;
let developer = true;
let alertDone = 0;
let isGameOver = false;
let waterClass = new Water();

let buggyclick = false;
let mouseDis = false;
let mouseUse = false;


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
let speak = false;

let canvas;
let canvasWidth = 1520;
let canvasHeight = 705;


let StartingMap;
let startingPositionDefined;


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

let swapTime = 30;
let wind;
generateWind();




let animaceWorma = true;




document
    .getElementById("inputfile")
    .addEventListener("change", function () {
        var fr = new FileReader();
        let returnValMap;
        let foundMap = false;
        let returnWorm;
        let foundWorms = false;

        fr.onload = function () {
            var logMap = fr.result.split("%%")
            logMap.forEach(element => {
                if (element.length > 3) {
                    if (foundMap == false) {
                        returnValMap = element.split("::")
                        foundMap = true;
                    }
                    else if (foundWorms == false) {

                        returnWorm = element.split("::")
                        foundWorms = true;
                    }




                }
            });


            if (returnValMap != null && returnValMap.length != 0 && returnWorm != null && returnWorm.length != 0) {
                StartingMap = returnValMap;
                startingPositionDefined = returnWorm;

                startGame(StartingMap, startingPositionDefined)



            }
            else {
                startGame()

            }
        };

        fr.readAsText(this.files[0]);
    });



function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function dmgOn() {
    deleteAllCookies();
    document.cookie = "on";
    startGame(StartingMap, startingPositionDefined)

}
function dmgOff() {
    deleteAllCookies();
    document.cookie = "off";
    startGame(StartingMap, startingPositionDefined)


}
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

if (detectMob() != false) {
    window.stop()
    alert("Je nám líto hra je dostupná pouze pro PC");
}

function RestartAll() {

    wormove = [];
    map = [];
    water = 0;
    waterStart = false;
    destructionOn = true;
    developer = true;
    alertDone = 0;
    isGameOver = false;
    waterClass = new Water();

    buggyclick = false;
    mouseDis = false;
    mouseUse = false;


    time1 = new Date();
    time2 = new Date();

    pause1 = false;


    speak = false;


    timeGranatStart = new Date();

    swapTime = 30;
    wind;
    generateWind();


}


function startGame(mapLoad, wormsLoad) {
    RestartAll();
    if (document.cookie != "off") {
        document.getElementById("DestrukceInfo").innerHTML = "Destrukce: Zapnuta"
    }
    else {
        document.getElementById("DestrukceInfo").innerHTML = "Destrukce: Vypnuta";
    }

    setTimeout(() => {
        waterStart = true;
        waterClass.waterGo();
    }, 180000);


    canvas = createCanvas(canvasWidth, canvasHeight);
    engine = Engine.create();
    engine.positionIterations = 12;

    world = engine.world;


    let startingPosition;
    if (wormsLoad != null) {
        startingPosition = []
        wormsLoad.forEach(wormPos => {
            let positionOfthis = wormPos.split(',');
            if (startingPosition.length == 0) {
                startingPosition.push({ x: Number(positionOfthis[0].substring(1)), y: Number(positionOfthis[1]), taken: false })
            }
            else if (startingPosition.length == wormsLoad.length - 1) {
                startingPosition.push({ x: Number(positionOfthis[0]), y: Number(positionOfthis[1].slice(0, -1)), taken: false })

            }
            else {
                startingPosition.push({ x: Number(positionOfthis[0]), y: Number(positionOfthis[1]), taken: false })

            }
        });


    }
    else {
        startingPosition = [
            { x: 1200, y: 250, taken: false },
            { x: 350, y: 265, taken: false },
            { x: 1400, y: 440, take: false },
            { x: 350, y: 650, taken: false },
            { x: 100, y: 450, taken: false },
            { x: 800, y: 620, taken: false },
            { x: 800, y: 290, taken: false },
            { x: 1000, y: 500, taken: false },
            { x: 200, y: 250, taken: false },
            { x: 1100, y: 450, taken: false },
            { x: 1450, y: 280, taken: false },
            { x: 200, y: 650, taken: false },
        ]

    }

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
    let howManyWorms;
    if (startingPosition.length >= 8) {
        howManyWorms = 8;
    }
    else if (startingPosition.length >= 6) {
        howManyWorms = 6;
    }
    else if (startingPosition.length >= 4) {
        howManyWorms = 4;
    }
    else if (startingPosition.length < 2) {
        alert("Neplatný soubor");
        location.reload();


    }
    for (let i = 0; i < howManyWorms; i++) {
        let indexPosition = Math.floor(Math.random() * startingPosition.length);

        let positionStart = startingPosition[indexPosition];

        if (positionStart.taken == false) {

            let indexName = Math.floor(Math.random() * nameArray.length)

            while (nameArray[indexName].taken == true) {
                indexName = Math.floor(Math.random() * nameArray.length);
            }
            nameArray[indexName].taken = true;

            wormove[i] = new Worm(positionStart.x, positionStart.y, chooseTeam ? 1 : 2, nameArray[indexName].name);
            startingPosition[indexPosition].taken = true;
            chooseTeam = !chooseTeam;
        }
        else i--;

    }

    let indexStarting = Math.floor(Math.random() * wormove.length);
    wormove[indexStarting].playing = true;
    wormove[indexStarting].staticWorm = false;
    wormove[indexStarting].attack = false;
    wormove[indexStarting].keyboardDis = true;
    wormove[indexStarting].SwapWorm(indexStarting);
    setTimeout(() => { wormove[0].keyboardDis = false; }, 1000)

    time1 = new Date();
    time1.setSeconds(time1.getSeconds() + swapTime);

    if (document.cookie != "off") {
        destruction = new Destroy();
    }


    if (mapLoad != null) {

        for (let i = 0; i < mapLoad.length; i++) {
            if (i == 0) {
                map[i] = new Map(mapLoad[i].substring(1), 0, 0);

            }
            else if (i + 1 == mapLoad.length) {


                map[i] = new Map(mapLoad[i].slice(0, -1), 0, 0);
            }
            else map[i] = new Map(mapLoad[i], 0, 0);

        }
        if (map.length != mapLoad.length) {
            alert("Nastala chyba zkuste mapu nakreslit znovu");
            location.reload();
        }
        console.log(map)
    }
    else {
        map[0] = new Map("313,226,312,208,312,188,324,171,337,159,349,152,369,148,389,148,403,154,413,162,423,166,435,168,448,168,459,177,464,190,475,199,486,200,500,202,512,204,520,204,540,203,554,203,571,223,575,228,590,231,603,232,613,232,628,233,645,234,661,235,683,235,698,247,707,260,718,264,734,264,747,267,750,286,750,301,731,311,669,312,643,312,572,314,537,317,480,320,443,321,398,314,361,302,336,289,327,271,", 780, 380)
        map[1] = new Map("588,475,601,458,608,450,618,430,618,422,620,396,620,388,621,372,621,356,621,332,621,317,615,303,608,293,599,284,590,272,576,269,559,264,548,254,535,234,541,208,552,195,563,192,588,192,608,192,627,190,659,187,676,185,695,185,714,185,730,185,746,184,768,184,784,184,804,184,821,188,842,196,856,208,863,213,856,224,852,239,847,248,824,258,811,271,797,288,795,312,796,328,796,352,796,372,803,388,816,416,825,426,836,445,842,458,840,473,797,476,769,476,736,478,703,482,680,483,660,483,640,481,614,477", 1420, 580)
        map[2] = new Map("441,456,432,438,428,417,428,396,440,381,464,362,502,356,527,358,553,359,587,359,614,359,622,357,641,348,669,338,698,338,722,349,730,372,741,406,746,448,740,474,656,485,584,484,523,480,427,481,435,456", 850, 680)
        map[3] = new Map('135,495,136,503,136,509,136,513,137,516,137,517,140,519,145,523,153,526,157,529,158,533,166,545,167,547,171,549,173,550,182,553,191,556,197,561,200,565,205,576,212,582,217,583,224,585,236,588,246,593,263,597,273,601,285,606,297,607,302,607,309,607,309,607,317,609,320,609,326,610,335,613,345,614,349,615,357,617,372,619,382,620,396,621,411,622,423,623,433,624,449,624,463,621,472,621,483,621,503,620,517,617,534,610,543,608,564,602,578,601,580,594,591,583,597,577,602,577,613,571,623,567,635,563,642,559,658,546,672,536,678,528,685,517,691,509,712,501,718,497,718,492,708,488,689,488,681,488,672,490,662,491,648,495,637,498,625,500,615,501,605,501,589,501,577,504,565,507,545,509,526,509,509,505,502,504,484,498,474,497,468,495,433,489,398,489,385,491,369,492,358,493,346,495,332,495,324,495,316,495,309,489,305,489,297,489,289,486,269,477,259,474,247,470,232,467,223,467,210,467,193,467,177,472,161,476,149,481,145,484,140,487,140,487', 300, 700)
        map[4] = new Map('501, 388, 482, 388, 475, 377, 474, 368, 485, 358, 500, 364, 516, 364, 535, 355, 555, 344, 566, 339, 574, 333, 591, 323, 619, 316, 636, 324, 662, 330, 695, 322, 718, 309, 733, 311, 742, 321, 743, 348, 723, 372, 609, 387, 556, 384, ', 1100, 510);
        //map[5] = new Map("667,254,654,248,647,225,655,208,684,208,721,213,755,199,814,177,886,160,892,160,933,161,969,169,1014,179,1048,187,1092,187,1154,187,1186,234,1167,265,1067,286,971,276,875,268,788,267,712,265,682,257,", 1300, 320)
        map[5] = new Map('426,376,429,373,437,368,444,367,457,365,468,365,481,365,494,365,505,365,521,365,536,364,550,360,570,350,584,341,597,337,626,325,645,317,667,308,690,305,719,305,744,315,765,328,784,337,817,361,841,364,871,366,913,367,949,367,973,364,1001,353,1013,356,1020,377,1023,403,1019,414,988,421,930,423,855,429,834,429,813,434,769,437,744,440,717,440,691,440,654,428,627,411,607,405,576,401,536,401,503,396,457,382,436,377', 1300, 320)
        map[6] = new Map('146,285,145,281,145,281,141,278,141,278,137,270,137,262,137,253,137,245,137,233,144,217,153,209,167,207,178,207,188,206,200,206,205,207,209,216,210,224,210,230,210,233,214,237,227,239,234,239,242,239,250,240,254,240,262,240,273,240,281,240,293,240,301,240,310,238,323,237,336,237,341,237,353,235,368,235,377,235,386,235,397,235,405,236,412,237,421,240,429,242,436,247,441,251,445,253,455,258,466,262,473,262,482,259,494,257,504,250,510,245,518,242,526,242,533,238,548,235,558,235,566,235,582,235,592,235,598,235,602,235,611,238,618,250,618,257,618,263,616,284,610,294,605,294,597,296,580,299,564,302,552,302,527,309,508,310,501,310,487,312,460,314,446,314,425,314,415,314,397,313,390,313,385,313,376,308,357,304,345,302,325,302,311,301,301,301,287,301,274,302,258,302,245,302,219,299,193,297,184,296,174,295,157,291,153,291,149,287', 300, 280)
        map[7] = new Map('274,320,274,320,274,320,284,320,287,320,289,320,293,321,296,321,305,322,316,324,327,325,337,325,348,325,359,325,364,325,375,324,388,323,394,323,398,337,398,344,398,349,395,357,386,365,378,366,373,370,365,374,353,374,340,375,326,376,307,376,293,373,281,356,273,345,273,333,273,329', 100, 480)
        map[8] = new Map("121,272,112,234,116,200,120,175,176,128,213,105,262,101,293,121,291,153,279,199,243,220,212,229,191,240,170,249,140,268,", 100, 80)
        map[9] = new Map("242,130,309,136,365,168,442,252,464,316,453,395,425,422,350,424,325,370,344,336,374,316,353,292,292,260,232,228,205,194,", 1400, 80)
    }


}

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
    startGame();
}


function draw() {

    if (pause1 == false) {
        frameRate(50);
        Matter.Engine.update(engine)
        engine.velocityIterations = 6;
        background(bg);
        if (speak == false) {
            setTimeout(() => {
                speaking[Math.floor(Math.random() * 5)].play();
                speak = false;
            }, 20000)
            speak = true;
        }


        for (let i = 0; i < map.length; i++) {
            if (map[i] != null) {
                map[i].show();
            }
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
        wormove.forEach(worm => {
            worm.show()

        })
        waterClass.show();
        showWind();

    }



}
function showWind() {

    push();
    fill(255, 0, 0);
    textSize(40);
    if (wind > 0) {
        text("Vítr: ==>" + wind, 0, 32);

    }
    else if (wind < 0) {
        text("Vítr: <==" + Math.abs(wind), 0, 32);
    }
    else {
        text("Vítr: " + Math.abs(wind), 0, 32);

    }
    pop();
}
function generateWind() {
    let windValue = Math.floor(Math.random() * Math.floor(6));
    var randomWind = Math.random() < 0.5;
    if (randomWind == true) {
        wind = windValue / 10
    }
    else wind = -windValue / 10;
    setTimeout(() => {
        generateWind()
    }, 40000)
}
