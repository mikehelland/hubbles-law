if (typeof experiments == "undefined") {
    var experiments = [];
}

experiments.push(new Experiment({
    name: "Control",
    initialConditions: {
        g1: {x: 0},
        g2: {x: 88},
        photon: {x: 0, dx: 1}
    }, 
    rules: (data) => {
        data.photon.x += data.photon.dx;

        if (data.photon.x >=  data.g2.x) {
            return "DONE"
        }
    },
    scaleX: 1
}));

