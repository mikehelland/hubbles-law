console.time("a")
// experiment 1
// a galaxy at distance d (in light years)
// receding at Hd
// emits a photon at velocity c


const H = 3.33335783e-12 // light years per year per million lightyear

const c = 1 // light year per year

const g1 = {x: 0}
const g2 = {x: 10000000000, dx: H * 10000000000}
const p = {x: 0, dx: c}

let t = 0;

function doPhysics() {
    //debugger
    g2.x += g2.dx
    g2.dx = H * g2.x
    p.x += p.dx
    t++;
}


const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
document.body.appendChild(canvas);
canvas.width = canvas.clientWidth
const ctop = 5;
const cleft = 5;
const scaleX =  10000000;
function draw() {
    
    ctx.fillStyle = "yellow"
    ctx.fillRect(cleft + g1.x / scaleX, ctop, 8, 8);
    ctx.fillRect(cleft + g2.x / scaleX, ctop, 8, 8);

    ctx.fillStyle = "red"
    ctx.fillRect(cleft + p.x / scaleX, ctop, 4, 4);

}

let handle = setInterval(function ()  {
    let i = 0;
    while (i < 1000) {
        doPhysics();
        i++;
    }

    if (p.x >= g2.x) {
        console.log(t)
        clearTimeout(handle)
        console.timeEnd("a")
    }

    draw();
}, 0);


