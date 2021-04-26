
var runner1div = document.getElementById("runner1")
var runner2div = document.getElementById("runner2")
var runner3div = document.getElementById("runner3")
var runner11div = document.getElementById("runner11")
var runner21div = document.getElementById("runner21")
var runner31div = document.getElementById("runner31")


var H = 0.0000756
var c = 1

var zoomX = 0.12
var zoomY = 400
var offsetX = 80
var offsetY = 20

var phase2t = 0


// the runners 1, 2, and 3 are defined here

var runner1 = setup({color: "green", div: runner1div, next: race => {
    race.dx = c - H * race.x
}})
var runner2 = setup({color: "blue", div: runner2div, flipByTime: true, next: race => {
    for (race.target of race.targets) {
        if (!race.target.hit) {
            race.target.x += H * race.target.x
        }
    }
    race.dx = c + H * race.x
}
})
var runner3 = setup({color: "red", div: runner3div, next: race => {
    race.t-- //undo the default time increment 
    race.t += 1 / ( 1 - H * race.x)
}})


// here's the variation

var runner11 = setup({color: "blue", div: runner11div, flipByTime: true, next: race => {
    for (race.target of race.targets) {
        if (!race.target.hit) {
            race.target.x += 1-1/(1 + H * race.target.x)
        }
    }
    race.dx = (1 + H * race.x)
}
})
var runner31 = setup({color: "orange", div: runner31div, next: race => {
    race.dx = c / (1 + H * race.x)
}})
var runner21 = setup({color: "magenta", div: runner21div, next: race => {
    race.t-- //undo the default time increment 
    race.t += 1 + H * race.x
}})



function setup(params) {
    var canvas = document.createElement("canvas")
    var timer = document.createElement("canvas")
    params.div.appendChild(timer)
    params.div.appendChild(canvas)
    
    canvas.width = 840
    timer.width = 60
    canvas.height = 80
    timer.height = 80
    var ctx = canvas.getContext("2d")
    var tctx = timer.getContext("2d")
    var race = {
        t: 0,
        dx: c,
        x: 0,
        leftFoot: true,
        steps: [{leftFoot: true, t: 0, z: 0, x: 0}],
        targets: [],
        nextTarget: 0,
        ctx, canvas,
        color: params.color
    }

    for (var i = 0; i < (params.targets || 4600); i+=100) {
        race.targets.push({start: i, x: i})
    }

    var step
    var target

    var wavelength = 50
    var nextFlip = wavelength
    var lastLeft = 0
    var lastZ = 0

    race.draw = () => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        tctx.fillStyle = "black"
        tctx.fillRect(0, 0, timer.width, timer.height)

        ctx.globalAlpha = 0.5 - (phase2t * 0.5)
        ctx.fillStyle = "white"
        for (target of race.targets) {
            ctx.fillRect(target.x * zoomX, 0, 1, canvas.height)
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = params.color
        ctx.beginPath()
        for (step of race.steps) {
            ctx.fillRect((step.x + (phase2t * (step.t - step.x))) * zoomX, step.leftFoot ? 20 : 50, 8, 8)
        }

        if (race.done) {
            tctx.lineWidth = 2
        }
        tctx.strokeStyle = "white"
        tctx.beginPath()
        tctx.moveTo(timer.width / 2, timer.height / 2)
        tctx.lineTo(timer.width / 2 + Math.sin(race.t/100) * 20, timer.height / 2 + Math.cos(race.t/100) * -20)
        tctx.stroke()

        tctx.beginPath()
        tctx.arc(timer.width / 2, timer.height / 2, 22, 0, 2*Math.PI)
        tctx.stroke()
    }

    race.next = function () {
        if (this.done) return 

        race.t++

        this.x += this.dx
        params.next(race)

        if (params.flipByTime ? this.t >= nextFlip : this.x >= nextFlip) {
            this.leftFoot = !this.leftFoot
            let step = {leftFoot: this.leftFoot, t: this.t, x: this.x}
            
            if (params.flipByTime) {
                let lastStep = this.steps[this.steps.length - 1]
                step.z = ((this.x - lastStep.x) - wavelength) / wavelength 
            }
            else {
                let lastStep = this.steps[this.steps.length - 1]
                var f = 1 / (this.t - lastStep.t)
                step.f = f
                step.z = (1/wavelength - f) / f 
            
            }
            lastZ = step.z
            nextFlip += wavelength
            
            this.steps.push(step)
        }
        
        
        if (race.targets[race.nextTarget].x < race.x) {
            race.targets[race.nextTarget].hit = race.t
            race.targets[race.nextTarget].z = lastZ
            race.nextTarget++

            if (!race.targets[race.nextTarget]) {
                this.done = true
            }
        }
    }

    return race
}


runner1.draw()
runner2.draw()
runner3.draw()

runner11.draw()
runner21.draw()
runner31.draw()


document.getElementById("start-race-button").onclick = e => {
    var animateHandle = setInterval(() => {
    
        runner1.draw()
        runner2.draw()
        runner3.draw()

        if (runner1.done && runner2.done && runner3.done) {
            clearInterval(handle)
            clearInterval(animateHandle)
            return
        }

    }, 1000/60)    
    
    var ii
    var handle = setInterval(() => {
        for (ii = 0; ii < 5; ii++) {

            runner1.next()
            runner2.next()
            runner3.next()            
        }
    }, 1)
}


document.getElementById("start-race-2-button").onclick = e => {

    var animateHandle = setInterval(() => {
    
        runner21.draw(true)
        runner31.draw(true)
    
        if (runner21.done && runner31.done) {
            clearInterval(handle)
            clearInterval(animateHandle)
            return
        }

    }, 1000/60)


    var ii
    var handle = setInterval(() => {
        for (ii = 0; ii < 5; ii++) {
            
            runner21.next()
            runner31.next()
            
        }
    }, 1)
    
}


