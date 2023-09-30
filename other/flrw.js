function lcdm(H0, maxZ) {
    return flrw(H0, 0.7, 0.3, maxZ)
}



function flrw2(H0, OmegaL, maxZ) {

    maxZ = maxZ || 10
    var OmegaM = 1 - OmegaL

    // convert km/s/Mpc  to  Mly/My/Mly
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
    var H = H0 
    var c = 1

    var t = 0
    var z = 0

    // these are our photons, one has a head start
    var x1 = 0.1
    var x2 = 0

    var data = []

    while (z < maxZ) {

        // move the photons with the hubble flow (in reverse)
        x1 += c - H * x1
        x2 += c - H * x2

        // the redshift is how far apart the photons have drifted
        z = 0.1 / (x1 - x2) - 1

        t--

        data.push({
            z,
            d_A: x2,
            d_C: x2 * (1+z),
            d_T: -t
        })
        
        
        // update the Hubble parameter
        H = H0 * Math.sqrt(OmegaM * Math.pow(1 + z, 3) + OmegaL)

    }

    return data
}






// Imagine an observer at the source with incoming photons
// run the expansion of the universe backwards
// when the photons reach a distant galaxy in the model
// that would be the state of the universe when the photons 
// were emitted

// returns distances in million light years
//   d_C = comoving distance 
//   d_A = angular diameter distance 
//   d_T = light travel time distance

function flrw(H0, OmegaL, OmegaM, maxZ) {
    maxZ = maxZ || 10

    // convert km/s/Mpc  to  Mly/My/Mly
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
    var H = H0 
    var c = 1

    var t = 0
    var z = 0

    // these are our photons, one has a head start
    var x1 = 0.1
    var x2 = 0

    // add a bunch of galaxies to our model
    var data = []
    for (let i = 1000; i < 40000; i+= 1000) {
        data.push({x: i, x0: i})
    }

    while (z < maxZ) {

        // move the photons with the hubble flow (in reverse)
        x1 += c - H * x1
        x2 += c - H * x2

        // the redshift is how far apart the photons have drifted
        z = 0.1 / (x1 - x2) - 1

        t++
        
        for (var ig = 0; ig < data.length; ig++) {
            if (!data[ig].t) {

                // move the galaxies with the hubble flow (in reverse)
                data[ig].x -= H * data[ig].x

                // record when the photons have reached (left) the galaxy
                if (data[ig].x <= x2) {
                    data[ig].t = t
                    data[ig].z = z

                }
            }
        }
        
        // update the Hubble parameter
        H = H0 * Math.sqrt(OmegaM * (1 + z)**3 + OmegaL)

    }

    return data
}



// Alberto Cappi's code from
//http://www.bo.astro.it/~cappi/cosmotools

var FLRW = (function() {
    var H0, Omega_L, Omega_M, Omega_k

    function fun(v1, Omega_M, Omega_L, Omega_k) {
        v2 = v1 * v1
        v3 = v1 * v1 * v1
        f = Math.sqrt(Omega_M * v3 + Omega_k * v2 + Omega_L)
        return 1. / f
    };
    
    function simpson(x0, x2) {
        h = (x2 - x0) / 2.
        x1 = x0 + h
        igr = h * (fun(x0, Omega_M, Omega_L, Omega_k) + 4. * fun(x1, Omega_M, Omega_L, Omega_k) + fun(x2, Omega_M, Omega_L, Omega_k)) / 3.
        return igr
    };
    
    function sumint(z1) {
        integrale = 0, zone = 1, deltaz = 0.001
        while (zone <= (z1 - deltaz)) {
            zini = zone
            zfin = zone + deltaz
            integrale += simpson(zini, zfin);
            zone += deltaz
        }
        return integrale
    };
    
    // -------------------------------------------- 
    
    
    function lookfun(v1, Omega_M, Omega_L, Omega_k) {
        v2 = v1 * v1
        v3 = v1 * v1 * v1
        f = v1 * Math.sqrt(Omega_M * v3 + Omega_k * v2 + Omega_L)
        return 1. / f
    };
    
    function timeint(z1start, z1end) {
        s = 0, a = z1start, b = z1end
        s = 0.5 * (b - a) * (lookfun(a, Omega_M, Omega_L, Omega_k) + lookfun(b, Omega_M, Omega_L, Omega_k))
        n = 2
        while (n <= 11) {
            n2 = n - 2
            it = Math.pow(2, n2)
            tnm = it
            del = (b - a) / tnm
            x = a + 0.5 * del
            sum = 0.
            j = 1
            while (j <= it) {
                sum = sum + lookfun(x, Omega_M, Omega_L, Omega_k)
                x = x + del
                j += 1
            }
            s = 0.5 * (s + (b - a) * sum / tnm)
            n += 1
        }
        return s
    };
    
    // --------------------------------------------
    
    function sinh(x) {
        s = (Math.exp(x) - Math.exp(-x)) / 2.
        return s
    };
    
    function zToD(z) {
        // From redshift to distance
    
    
        z1 = 1. + z;
        h = H0 / 100.;
        Tnorm = 9.77810945 / h;
        cvel = 299792.458
        ch0 = cvel / H0;
        pig = 3.1415926536;
        rad = pig / 180.;
        q0 = Omega_M / 2. - Omega_L;
        Omega_k = 1. - Omega_M - Omega_L;
    
        age = (timeint(1., 50.)) * Tnorm;
    
        if (Omega_L > 0. && Omega_k == 0.) {
            DC = ch0 * sumint(z1);
            DL = DC * z1
        }
        if (Omega_L > 0. && Omega_k < 0.) {
            curv = Math.sqrt(-Omega_k)
            r = sumint(z1);
            DC = ch0 * Math.sin(r * curv) / curv
            DL = DC * z1
        }
        if (Omega_L > 0. && Omega_k > 0.) {
            curv = Math.sqrt(Omega_k)
            r = sumint(z1);
            DC = ch0 * sinh(r * curv) / curv
            DL = DC * z1
        }
        if (Omega_L == 0. && q0 > 0) {
            q0sq = q0 * q0
            a = 1. - q0 + q0 * z + (q0 - 1.) * (Math.sqrt(2. * q0 * z + 1.))
            DL = ch0 * a / q0sq
            DC = DL / z1
        }
        if (Omega_L == 0. && q0 == 0) {
            DL = ch0 * z * (1. + z / 2.)
            DC = DL / z1
        }
        // Lookback time
        lookback = timeint(1., z1) * Tnorm
        // Angular distance
        DA = DL / (z1 * z1)
        // Lunghezza in primi corrispondente a 1 Mpc.
        angle = (60. / rad) * z1 * z1 / DL;
        // Length in Mpc corresponding to 1 degree on the sky
        R = rad * DL / (z1 * z1);
    
        return {z, Omega_k, q0, DL, DC, DA, R, angle, lookback, age}
    }
    

    return function(H_0, OmegaL, OmegaM, z) {

        H0 = H_0
        Omega_L = OmegaL
        Omega_M = OmegaM
        return zToD(z)
    }
})()


