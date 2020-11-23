// time units: 1 million years
// distance units: 1 million light years

// the speed of light is 1 million light years / million years
const c = 1


var exampleSimple = {

    // the model has a photon, that starts at distance (d) zero
    photon: {d: 0},

    // every step of the model, move the photon by the speed of light 
    next: function () {
        this.photon.d = this.photon.d + c
    }

}

function run(model) {

    // time steps forward 1 million years at a time
    var t = 0

    // create targets at distance (d) 200 million light years apart
    model.targets = []
    for (var i = 200; i <= 30000; i+=200) {
        model.targets.push({
            d: i
        })
    }
    var nextTarget = 0

    // start the loop
    while (true) {

        //advance the model 1 million years
        t = t + 1
        model.next()

        // see if we hit a target
        if (model.targets[nextTarget] && model.photon.d >= model.targets[nextTarget].d) {
            console.log("Target reached", t)
            model.targets[nextTarget].hit = t

            nextTarget = nextTarget + 1
        }
    }
}

run(exampleSimple)