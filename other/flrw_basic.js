var findZ = 10
var H0 = 70
var OmegaL = 0.7
var OmegaM = 1 - OmegaL

// convert km/s/Mpc  to  Mly/My/Mly
H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
var H = H0 
var c = 1

// the photons, x1 has a head start
var x1 = 0.1
var x2 = 0

var t = 0, z = 0, data = []

while (z < findZ) {
    t--

    // move the photons 
    x1 += c - H * x1
    x2 += c - H * x2

    // compare their separation
    z = 0.1 / (x1 - x2) - 1
    
    // update the Hubble parameter
    H = H0 * Math.sqrt(OmegaM * 
        Math.pow(1 + z, 3) + OmegaL)

    data.push({
        z,
        d_A: x2,
        d_C: x2 * (1+z),
        d_T: -c * t
    })
}

