// returns distances in million light years
//   d_C = comoving distance 
//   d_A = angular diameter distance 
//   d_T = light travel time distance

function flrwz(H0, OmegaL, maxZ) {

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

    while (z < maxZ) {

        // move the photons with the hubble flow (in reverse)
        x1 += c - H * x1
        x2 += c - H * x2

        // the redshift is how far apart the photons have drifted
        z = 0.1 / (x1 - x2) - 1

        t--
        
        // update the Hubble parameter
        H = H0 * Math.sqrt(OmegaM * Math.pow(1 + z, 3) + OmegaL)

    }

    return {
        z,
        d_A: x2,
        d_C: x2 * (1+z),
        d_T: -t, 
    }
}


//this version returns an array for all data points up to maxZ

function flrw2(H0, OmegaL, OmegaM, maxZ) {

    maxZ = maxZ || 10
    //var OmegaM = 1 - OmegaL
    var OmegaK = 1 - OmegaL - OmegaM + 1 - 1
    var curv = Math.sqrt(Math.abs(OmegaK))

    // convert km/s/Mpc  to  Mly/My/Mly
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
    var H = H0 
    var c = 1

    var t = 0
    var z = 0

    // these are our photons, one has a head start
    var x1 = 0.1
    var x2 = 0

    var xx = 0

    var data = []

    while (z < maxZ) {

        // move the photons with the hubble flow (in reverse)
        x1 += c - H * x1
        x2 += c - H * x2

        // the redshift is how far apart the photons have drifted
        z = 0.1 / (x1 - x2) - 1

        t--

        xx = curv * x2 * (1+z)
        
        if (1+OmegaK === 1) xx = x2
        else if (OmegaK < 0) xx = 1/H0 * Math.sin(xx * H0) / xx   * x2 
        else xx = 1/H0 * Math.sinh(xx * H0) / xx   * x2 

        data.push({
            z,
            d_A: xx ,
            d_C: x2 * (1+z),
            d_T: -t, 
        })
        
        
        // update the Hubble parameter
        H = H0 * Math.sqrt(OmegaM * Math.pow(1 + z, 3) + OmegaL + OmegaK * Math.pow(1 + z, 2))

    }

    return data
}






// this version keeps tracks of galaxies so you can plot their worldlines


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
        t--

        // move the photons with the hubble flow (in reverse)
        x1 += c - H * x1
        x2 += c - H * x2

        // the redshift is how far apart the photons have drifted
        z = 0.1 / (x1 - x2) - 1
        
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
    var H0, Omega_L, Omega_M, Omega_k, h

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


function nwFLRW(tH0, tWV, tWM, tz) {
    // by Ned Wright
    // 25 Jul 1999
    // Copyright Edward L. Wright, all rights reserved.
    // define global variables and functions
    var i=0;	// index
    var n=1000;	// number of points in integrals
    var nda = 1;	// number of digits in angular size distance
    var H0 = 69.6;	// Hubble constant
    var WM = 0.286;	// Omega(matter)
    var WV = 0.714;	// Omega(vacuum) or lambda
    var WR = 0;	// Omega(radiation)
    var WK = 0;	// Omega curvaturve = 1-Omega(total)
    var z = 3.0;	// redshift of the object
    var h = 0.696	// H0/100
    var c = 299792.458; // velocity of light in km/sec
    var Tyr = 977.8; // coefficent for converting 1/H into Gyr
    var DTT = 0.5;	// time from z to now in units of 1/H0
        var DTT_Gyr = 0.0;	// value of DTT in Gyr
    var age = 0.5;	// age of Universe in units of 1/H0
        var age_Gyr = 0.0;	// value of age in Gyr
    var zage = 0.1;	// age of Universe at redshift z in units of 1/H0
        var zage_Gyr = 0.0;	// value of zage in Gyr
    var DCMR = 0.0;	// comoving radial distance in units of c/H0
        var DCMR_Mpc = 0.0;
        var DCMR_Gyr = 0.0;
    var DA = 0.0;	// angular size distance
        var DA_Mpc = 0.0;
        var DA_Gyr = 0.0;
        var kpc_DA = 0.0;
    var DL = 0.0;	// luminosity distance
        var DL_Mpc = 0.0;
        var DL_Gyr = 0.0;	// DL in units of billions of light years
    var V_Gpc = 0.0;
    var a = 1.0;	// 1/(1+z), the scale factor of the Universe
    var az = 0.5;	// 1/(1+z(object))

    setValues(tH0, tWM, tWV, tz)

    return {z: tz, DA: DA_Mpc, DC: DCMR_Mpc, DL, lookback: DTT_Gyr, age: age_Gyr}

    // entry point for the input form to pass values back to this script
    function setValues(tH0,tWM,tWV,tz) {
        H0 = tH0;
        h = H0/100;
        WM = tWM;
        WV = tWV;
        z = tz;
        WR = 4.165E-5/(h*h);	// includes 3 massless neutrino species, T0 = 2.72528
        WK = 1-WM-WR-WV;
        compute();
        //parent.CCout.location="./CCout.html";
    }

    function stround(x,m) {
        // rounds to m digits and makes a string
        var tenn = 1;
        var i = 0;
        for (i=0; i != m; i++) {
            tenn = tenn*10;
        }
        var y = Math.round(Math.abs(x)*tenn);
        var str = " "+y;
        while (m > str.length-2) {
            str = " 0" + str.substring(1,str.length);
        }
        str = str.substring(0,str.length-m)+"."+
                str.substring(str.length-m,str.length);
        if (x < 0) str = " -"+str.substring(1,str.length);
        return str;
    }

    // tangential comoving distance
    function DCMT() {
        var ratio = 1.00;
        var x;
        var y;
        x = Math.sqrt(Math.abs(WK))*DCMR;
        // document.writeln("DCMR = " + DCMR + "<BR>");
        // document.writeln("x = " + x + "<BR>");
        if (x > 0.1) {
            ratio =  (WK > 0) ? 0.5*(Math.exp(x)-Math.exp(-x))/x : Math.sin(x)/x;
            // document.writeln("ratio = " + ratio + "<BR>");
            y = ratio*DCMR;
            return y;
        };
        y = x*x;
        // statement below fixed 13-Aug-03 to correct sign error in expansion
        if (WK < 0) y = -y;
        ratio = 1 + y/6 + y*y/120;
        // document.writeln("ratio = " + ratio + "<BR>");
        y= ratio*DCMR;
        return y;
    }

    // comoving volume computation
    function VCM() {
        var ratio = 1.00;
        var x;
        var y;
        x = Math.sqrt(Math.abs(WK))*DCMR;
        if (x > 0.1) {
            ratio =  (WK > 0) ? (0.125*(Math.exp(2*x)-Math.exp(-2*x))-x/2)/(x*x*x/3) :
            (x/2 - Math.sin(2*x)/4)/(x*x*x/3) ;
            y = ratio*DCMR*DCMR*DCMR/3;
            return y;
        };
        y = x*x;
        // statement below fixed 13-Aug-03 to correct sign error in expansion
        if (WK < 0) y = -y;
        ratio = 1 + y/5 + (2/105)*y*y;
        y= ratio*DCMR*DCMR*DCMR/3;
        return y;
    }

    // calculate the actual results
    function compute() {
        h = H0/100;
        WR = 4.165E-5/(h*h);	// includes 3 massless neutrino species, T0 = 2.72528
        WK = 1-WM-WR-WV;
        az = 1.0/(1+1.0*z);
        age = 0;
        for (i = 0; i != n; i++) {
            a = az*(i+0.5)/n;
            adot = Math.sqrt(WK+(WM/a)+(WR/(a*a))+(WV*a*a));
            age = age + 1/adot;
        };
        zage = az*age/n;
        // correction for annihilations of particles not present now like e+/e-
        // added 13-Aug-03 based on T_vs_t.f
        var lpz = Math.log((1+1.0*z))/Math.log(10.0);
        var dzage = 0;
        if (lpz >  7.500) dzage = 0.002 * (lpz -  7.500);
        if (lpz >  8.000) dzage = 0.014 * (lpz -  8.000) +  0.001;
        if (lpz >  8.500) dzage = 0.040 * (lpz -  8.500) +  0.008;
        if (lpz >  9.000) dzage = 0.020 * (lpz -  9.000) +  0.028;
        if (lpz >  9.500) dzage = 0.019 * (lpz -  9.500) +  0.039;
        if (lpz > 10.000) dzage = 0.048;
        if (lpz > 10.775) dzage = 0.035 * (lpz - 10.775) +  0.048;
        if (lpz > 11.851) dzage = 0.069 * (lpz - 11.851) +  0.086;
        if (lpz > 12.258) dzage = 0.461 * (lpz - 12.258) +  0.114;
        if (lpz > 12.382) dzage = 0.024 * (lpz - 12.382) +  0.171;
        if (lpz > 13.055) dzage = 0.013 * (lpz - 13.055) +  0.188;
        if (lpz > 14.081) dzage = 0.013 * (lpz - 14.081) +  0.201;
        if (lpz > 15.107) dzage = 0.214;
        zage = zage*Math.pow(10.0,dzage);
        //
        zage_Gyr = (Tyr/H0)*zage;
        DTT = 0.0;
        DCMR = 0.0;
        // do integral over a=1/(1+z) from az to 1 in n steps, midpoint rule
        for (i = 0; i != n; i++) {
            a = az+(1-az)*(i+0.5)/n;
            adot = Math.sqrt(WK+(WM/a)+(WR/(a*a))+(WV*a*a));
            DTT = DTT + 1/adot;
            DCMR = DCMR + 1/(a*adot);
        };
        DTT = (1-az)*DTT/n;
        DCMR = (1-az)*DCMR/n;
        age = DTT+zage;
        age_Gyr = age*(Tyr/H0);
        DTT_Gyr = (Tyr/H0)*DTT;
        DCMR_Gyr = (Tyr/H0)*DCMR;
        DCMR_Mpc = (c/H0)*DCMR;
        DA = az*DCMT();
        DA_Mpc = (c/H0)*DA;
        kpc_DA = DA_Mpc/206.264806;
        DA_Gyr = (Tyr/H0)*DA;
        DL = DA/(az*az);
        DL_Mpc = (c/H0)*DL;
        DL_Gyr = (Tyr/H0)*DL;
        V_Gpc = 4*Math.PI*Math.pow(0.001*c/H0,3)*VCM();
    }
}