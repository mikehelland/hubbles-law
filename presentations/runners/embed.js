var c = 1
var H = 0.0000756 // 74 (km/s)/Mpc converted to (ly/y)/Mly

var zoomX = 0.12
var phase2t = 0

// the runners 1, 2, and 3 are defined here

var runner1 = setup({color: "blue", div: "runner2", flipByTime: true, next: race => {
    for (race.target of race.targets) {
        if (!race.target.hit) {
            race.target.x += H * race.target.x
        }
    }
    race.dx = c + H * race.x
}})

var runner2 = setup({color: "red", div: "runner3", next: race => {
    race.t-- //undo the default time increment 
    race.t += 1 / ( 1 - H * race.x)
}})

var runner3 = setup({color: "green", div: "runner1", next: race => {
    race.dx = c - H * race.x
}})


// here's the variations

var runner21 = setup({color: "magenta", div: "runner21", next: race => {
    race.t-- //undo the default time increment 
    race.t += 1 + H * race.x
}})

var runner31 = setup({color: "orange", div: "runner31", next: race => {
    race.dx = c / (1 + H * race.x)
}})



function setup(params) {
    var canvas = document.createElement("canvas")
    document.getElementById(params.div).appendChild(canvas)
    
    canvas.width = 900
    canvas.height = 80
    var timerWidth = 60
    var timerHeight = 80
    var ctx = canvas.getContext("2d")
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

    for (var i = 0; i < 4600; i+=100) {
        race.targets.push({start: i, x: i})
    }

    var step
    var target

    var wavelength = 50
    var frequency = 50
    var nextFlip = wavelength
    var lastZ = 0

    // here's the main thing

    race.next = function () {
        if (this.done) return 

        race.t++

        this.x += this.dx
        params.next(race)

        // ready to step down? then calculate a z
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
                step.z = (1/frequency - f) / f 
            
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



    race.draw = () => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.globalAlpha = 0.5 
        ctx.fillStyle = "white"
        for (target of race.targets) {
            ctx.fillRect(timerWidth + target.x * zoomX, 0, 1, canvas.height)
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = params.color
        ctx.beginPath()
        for (step of race.steps) {
            ctx.fillRect(timerWidth + step.x * zoomX, step.leftFoot ? 20 : 50, 8, 8)
        }

        if (race.done) {
            ctx.lineWidth = 2
        }
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(timerWidth / 2, timerHeight / 2)
        ctx.lineTo(timerWidth / 2 + Math.sin(race.t/100) * 20, timerHeight / 2 + Math.cos(race.t/100) * -20)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(timerWidth / 2, timerHeight / 2, 22, 0, 2*Math.PI)
        ctx.stroke()
    }

    return race
}


runner1.draw()
runner2.draw()
runner3.draw()

//runner11.draw()
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
    
        //runner11.draw(true)
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
            
            //runner11.next()
            runner21.next()
            runner31.next()
            
        }
    }, 1)
    
}


