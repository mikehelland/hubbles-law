import numpy
import cosmolopy.distance as cd
import json

zd = []
for z in range(1, 21, 1):
    print -1 * (1.0/(1+z) - 1) * 14
    zd.append(-1 * (1.0/(1+z) - 1) * 14)

full = []
#cosmo = {'omega_M_0' : 0.3, 'omega_lambda_0' : 0.7, 'h' : 0.72}
    
for l0 in numpy.arange(0.68, 0.71, 0.005):
    print l0
    error = 0

    cosmo = {'omega_M_0' : 0.3, 'omega_lambda_0' : l0, 'h' : 0.72}
    cosmo = cd.set_omega_k_0(cosmo)
    
    data = []
    header = {"params": cosmo, "data": data}

    for z in numpy.arange(0.1, 20.1, 0.1):
        Vc = cd.lookback_time(z, **cosmo)
        Vc = Vc/60/60/24/365/1000000000

        ztest = -1 * (1.0/(1+z) - 1) * 14
        eq = ztest / Vc
        
        #data.append({"z": z, "lookback": Vc, "zd": ztest, "error": eq})
        data.append({"z": z, "lookback": Vc})
    
    full.append(header)

with open("other/cosmo_data.json", "w") as fp:
    json.dump(full, fp)