function roadDemo(road) {

    var ctx = road.getContext("2d")

    var car = document.getElementById("carImg")

    var x = 0
    var finishLine 

    var i
    var drawRoad = () => {

        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, road.width, road.height)
    
        ctx.fillStyle = "black"
        ctx.fillRect(0, 200, road.width, 400)
    
        if (finishLine) {

            ctx.fillStyle = "white"
            for (i = 0; i < 3; i++) { 
                ctx.fillRect(road.width - 80, 200 + i * 80, 40, 40)
            }
            for (i = 0; i < 3; i++) { 
                ctx.fillRect(road.width - 40, 240 + i * 80, 40, 40)
            }

            
    
        }
    
    }
    
    var drawCar = () => {

        ctx.drawImage(car, x, road.height / 1.6)
    
    }

    var move = () => {

        var start = Date.now()
        var h = setInterval(() => {

            x = (Date.now() - start) / 500 * (road.width - car.width) 

            drawRoad()
            drawCar()

            if (Date.now() - start >= 1000) {
                clearInterval(h)
                console.log("finish")
            }

        }, 1000/60)
    }

    var showFinish = () => {
        finishLine = true
        drawRoad()
        drawCar()
    }

    return {drawRoad, drawCar, move, showFinish}
    
}
