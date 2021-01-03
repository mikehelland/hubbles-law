
var details = document.getElementById("freqtest")
var fmodels = []
var c = 1
var H = 0.0756
var fzoom = 0.056
var targetDistance = 4000 // 4 billion light years

function setupFreqModel(model) {

    model.target = {x: targetDistance}

    var header = document.createElement("div")
    header.className = "model-header"


    label = document.createElement("span")
    label.innerHTML = " - " + model.name
    label.className = "model-label"
    
    details.appendChild(header)
    model.hitCountDiv = document.createElement("input")
    model.hitCountDiv.style.width = "40px"
    header.appendChild(model.hitCountDiv)
    model.freqDiv = document.createElement("input")
    header.appendChild(model.freqDiv)
    header.appendChild(label)    
    
    model.canvas = document.createElement("canvas")
    model.canvas.onclick = () => {
        if (model.running || model.ran) {
            resetModel(model)
        }
        else {
            runModel(model)
        }
    }
    details.appendChild(model.canvas)

    details.appendChild(document.createElement("br"))

    model.ctx = model.canvas.getContext("2d")
    model.nextTarget = 0

    model.canvas.width = 700
    model.canvas.height = 30
    
    // make a target every 200 million light years until 20 billion
    model.targets = []
    for (var i = 200; i <= 20000; i+=200) {
        model.targets.push({label: i/1000, start: i, x: i})
    }

    model.ctx.lineWidth = 3
    drawFreq(model.ctx, model)

    fmodels.push(model)
}

function stopFreqModel(model) {
    clearInterval(model.handle)
    clearInterval(model.fireHandle)

    model.running = false
    model.ran = true
}

function resetFreqModel(model) {
    
    stopFreqModel(model)

    model.ran = false
    model.photons = []
    model.nextTarget = 0
    model.target.x = targetDistance
    model.hitCount = 0
    model.hitCountDiv.value = ""
    model.t = 0
    model.first = 0

    drawFreq(model.ctx, model)
}

function drawFreq(ctx, exp) {

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = "yellow"
    for (var i = 0; i < exp.photons.length; i++) {
        ctx.fillRect(exp.photons[i].x * fzoom, ctx.canvas.height / 2, 5, 5)
    }

    ctx.strokeStyle = exp.color
    ctx.beginPath()
    ctx.moveTo(exp.target.x * fzoom, 0)
    ctx.lineTo(exp.target.x * fzoom, ctx.canvas.height)
    ctx.stroke()
    
}

function runFreqModel(model) {
    
    resetFreqModel(model)
    
    model.running = true
    
    var x
    var i
    var batch = 10
    model.handle = setInterval(function () {
        for (i = 0; i < batch; i++) {

            if (model.t % 1000 === 0) {
                model.photons.push({x: 0})
            }

            model.t++
            model.next()

        }
    }, 0)
    //model.photons.push({x: 0})
}


function checkPhoton(model, i) {
    if (model.photons[i].x >= model.target.x) {
        model.hitCount++
        model.hitCountDiv.value = model.hitCount
        model.photons.splice(i, 1)
        
        if (model.first) {
            model.freqDiv.value = (model.hitCount - 1) / (model.t - model.first)
        }
        else {
            model.first = model.t
        }
        
    }
}

setupFreqModel({
    name: "Static",
    color: "darkblue", 
    photons: [],
    next: function () {
        for (var i = this.photons.length - 1; i >= 0 ; i--) {
            this.photons[i].x += c

            checkPhoton(this, i)
        }
    }
})

setupFreqModel({
    name: "Decelerating",
    color: "green", 
    photons: [],
    next: function () {
        for (var i = this.photons.length - 1; i >= 0 ; i--) {
            this.photons[i].x += c - H / 1000 * this.photons[i].x

            checkPhoton(this, i)
        }
    }
})

setupFreqModel({
    name: "Expanding",
    color: "gray", 
    photons: [],
    next: function () {
        this.target.x += this.target.x * (H/1000)
        for (var i = this.photons.length - 1; i >= 0 ; i--) {
            this.photons[i].x += c + (H/1000) * this.photons[i].x

            checkPhoton(this, i)
        }
    }
})


var freqHandle
document.getElementById("startButton").onclick = e => {
    fmodels.forEach(model => runFreqModel(model))
    freqHandle = setInterval(() => {
        for (var m = 0; m < fmodels.length; m++) {
            if (fmodels[m].running) {
                drawFreq(fmodels[m].ctx, fmodels[m]) 
            }
        }
    }, 1000 / 60)
    
}
document.getElementById("stopButton").onclick = e => {
    fmodels.forEach(model => stopFreqModel(model))
    clearInterval(freqHandle)
}