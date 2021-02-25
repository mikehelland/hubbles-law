var count = 0 
var x = 0
var d = 4
var max = 14000

while (x < max) {

    x += d
    var area = 4 * Math.PI * x*x
    count += area / (d*d)
    


}

console.log(count)

//3,418,427,724
//179,671,356,380