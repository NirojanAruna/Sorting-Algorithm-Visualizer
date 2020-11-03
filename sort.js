var arrSize = document.getElementById("slider");
var val = document.getElementById("arrSize")
val.innerHTML = arrSize.value;
var arr = new Array();
var rect = [];  
arrSize.oninput = function () {
    val.innerHTML = this.value;
}

document.getElementById('b').onclick = function() {start(arrSize.value, 1850/arrSize.value)};


function start(val, wid){
    arr = Array.from({length:val}, () => Math.floor(Math.random()*100)+5);

    for (i = 0; i < arr.length; i++) {      
        rect.push(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
        rect[i].setAttribute("id", ((i+1).toString()));
        rect[i].style.setProperty('--hei', (arr[i]*5)+ 'px');
        rect[i].style.setProperty('x', ((i)*wid+20 )+ 'px');
        rect[i].style.setProperty('--wid', wid+ 'px');
        rect[i].style.setProperty('--col', 'blanchedalmond');
        document.getElementById("bars").appendChild(rect[i]);
    };
    bubbleSort(arr,rect);

}

// Creates the delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Performs the color change
async function swap(pos, pos2, col){
    await sleep(2);
    document.getElementById(pos).style.setProperty('--col', col);
    document.getElementById(pos2).style.setProperty('--col', col);

}

// Performs the physical swap of the bars
async function move(pos, pos2 , sep, sep2){
    document.getElementById(pos).style.setProperty('x', sep2*(1850/arrSize.value)+20+ 'px');
    document.getElementById(pos2).style.setProperty('x', sep*(1850/arrSize.value)+20 +'px');

    var c1 = document.getElementById(pos);
    var fromVal = c1.id;
    var c2 = document.getElementById(pos2);
    var toVal = c2.id;
    c1.id = toVal;
    c2.id = fromVal;

}

// Performs bubble sort given the size of a randomly generated array
async function bubbleSort(arr,rect){
    var size = arr.length;
    await sleep(10);
    for (i = 0; i < size; i++ ){
        for (j = 0; j < size-1-i; j++ ){
            var temp = arr[j];  
            var temp1= rect[j];
            var pos = (rect[j].id);
            var pos2 = (rect[j+1].id);
            await sleep (20);
            swap(pos, pos2,"red");
            await sleep (20);
            swap(pos, pos2,"blanchedalmond");
            if (temp > arr[j+1]){
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                rect[j] = rect[j+1];
                rect[j+1] = temp1;
                var sep = parseInt(pos)-1;
                var sep2 = parseInt(pos2)-1;
                move(pos, pos2, sep, sep2);                
            }
        }
    }
    return arr;
}
