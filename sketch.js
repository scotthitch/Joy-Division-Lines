let xi;
let xf;
let yi;
let yf;
let xStep;
let yStep;
let mu = 250;
let preMu = mu;
let sd = 40;
let sdMin;
let sdMax;
let preSd = sd;
let magn = 600;
let preMagn = magn;
let oneOverRoot2PI;
let isLooping = 1;

function setup() {
    // createCanvas(displayWidth, displayHeight);
    createCanvas(650, 650);
    // positions canvas 50px to the right and 100px
    // below upper left corner of the window
    oneOverRoot2PI = 1 / sqrt(Math.PI);
    xi = width / 20;
    xf = width - xi;
    yi = xi;
    yf = height - yi;

    xStep = (xf - xi) / 100;
    // xStep = 50;
    yStep = (yf - yi) / 60;
    // yStep = 100;

    sdMin = height / 45;
    sdMax = height / 6;

    strokeWeight(height / 350);
    renderAll();
}

function renderAll() {
    background(0, 32, 63);
    for (j = yi; j <= yf; j += yStep) {
        y1 = j;
        x1 = xi;



        beginShape();

        curveVertex(x1, y1)

        for (i = xi; i <= xf; i += xStep) {

            yVal = deltaY(i) + j
            xVal = i;
            noFill();

            curveVertex(xVal, yVal);
            if (random() < 0.7) {
                stroke(173, 232, 244);
            } else {
                stroke(72, 202, 228)
            }

        }

        curveVertex(xVal, yVal)
        endShape();


    }
}

function draw() {

    mu = mouseX;
    if (mu != preMu) {
        muChanged();
    }

    sd = map(mouseY, 0, height, sdMin, sdMax, true);
    if (sd != preSd) {
        sdChanged()
    }
}

function muChanged() {
    preMu = mu;
    renderAll();
}

function sdChanged() {
    preSd = sd;
    renderAll();
}



function deltaY(x) {
    sign = 1;
    if (Math.random() > 0.5) {
        sign *= -1;
    }
    power = Math.exp(-((x - mu) * (x - mu)) / (2 * sd * sd))
    y = ((power * oneOverRoot2PI) / sd) * sign
    y *= magn;
    y *= random(0.4, 1.4)
    return y;

}

function mouseClicked() {
    if (isLooping) {
        noLoop();
        isLooping = 0;
    } else {
        loop();
        isLooping = 1;
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (magn === 1000) {

        } else {
            magn = min(1000, magn + 50);
            renderAll();
        }
    } else if (keyCode === DOWN_ARROW) {
        if (magn === 0) {

        } else {
            magn = max(0, magn - 50);
            renderAll();
        }
    }
}