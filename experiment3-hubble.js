console.time("a")


// distance unit = 1 million light years
// time unit = million years

// Hubble's constant is 20 km/s/Mly
let H_1 = 20

// convert to km per million years per Mly
H_1 = H_1 * 60 * 60 * 24 * 365.25;

// convert to light years
H_1 = H_1 / 9460730472580.8;

// convert to millions of light years per millions 
H_1 = H_1 / 1000000

console.log("H", H_1)

const H = H_1

const c = 1 // 1 million light years, per million years 

const g1 = {x: 0}
const g2 = {x: 50000}
const p = {x: 0, dx: c}

let t = 0;

function doPhysics() {
    g2.x += g2.x * H
    p.x += p.dx
    t++;
}


const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
document.body.appendChild(canvas);
canvas.width = canvas.clientWidth
const ctop = 5;
const cleft = 5;
const scaleX =  50;
function draw() {
    
    ctx.fillStyle = "yellow"
    ctx.fillRect(cleft + g1.x / scaleX, ctop, 8, 8);
    ctx.fillRect(cleft + g2.x / scaleX, ctop, 8, 8);

    ctx.fillStyle = "red"
    ctx.fillRect(cleft + p.x / scaleX, ctop, 4, 4);

}


let physics = setInterval(function ()  {
    doPhysics();

    if (p.x >= g2.x) {
        console.log(t)
        clearTimeout(physics)
        console.timeEnd("a")
    }
}, 0);



let animate = setInterval(function ()  {
    draw();
}, 1000/60);