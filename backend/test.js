let tName = 'ar5un_4899704ma+@na[f7895';

let newStr = tName.replace(/[^0-9]/gi, '_').split('_').filter(x=>x!=="").map(x=>Number(x))
let greatestValue=Math.max(...newStr)


let string=""
let greaterNumber=0
for(var i=0;i<=tName.length;i++){
    if(!isNaN(tName[i])){
        string=string.concat(tName[i])
    }else{
        if(string!==""){
            let temp=
            if(Number(string)<greaterNumber){
                console.log("str",Number(string));
                console.log("inside");
                greaterNumber=Number(string)
            }else{
                greaterNumber=Number(string)
            }
        }
        string=""
    }
}
console.log("arr",greaterNumber);
