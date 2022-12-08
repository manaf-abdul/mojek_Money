let absValue=Math.abs


let M=16,N=5
let multi=1;
let prev=0;
let next=0;

while(true){
    next=multi*N;
    multi++

    const nextDifference=absValue(M-next)
    const prevDifference=absValue(M-prev)

    if(nextDifference<prevDifference){
        prev=next;
        continue;
    }
    break;
}

console.log("prev",prev);