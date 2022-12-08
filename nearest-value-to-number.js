let num1=13,num2=4
let multi=1;
let prev=0;
let next=0;

let absValue=Math.abs
let prevDifference=absValue(num1-prev)

while(true){
    next=multi*num2;
    multi++

    const nextDifference=absValue(num1-next)

    if(nextDifference<prevDifference){
        prev=next;
        prevDifference=nextDifference;
        continue;
    }
    break;
}

console.log("prev",prev);