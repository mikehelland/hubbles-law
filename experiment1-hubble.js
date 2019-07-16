if (typeof experiments == "undefined") {
    var experiments = [];
}

// experiment 1
// a galaxy at distance d (in light years)
// receding at Hd
// emits a photon at velocity c


experiments.push(new Experiment({
    name: "Hubble's Law v = H * D",
    initialConditions: (function () {
        var H = 73.5 //kilometers per second per megaparsec
        var c = 299792 //km per s
        var distance = 0.3 // megaparsecs, or 1 million light years
        var megaparsec2km = 3.085e16
        return {
            H, c, megaparsec2km,
            g1: {x: 0, dx: 0},
            g2: {x: distance * megaparsec2km, dx: H * distance, distance},
            photon: {x: 0, dx: c}    
        }
    })(),
    rules: (data) => {
        data.g2.x += data.g2.dx
        data.g2.dx = data.g2.x / data.megaparsec2km * data.H
        data.photon.x += data.photon.dx    
    },
    scaleX:  10000000000000
}))