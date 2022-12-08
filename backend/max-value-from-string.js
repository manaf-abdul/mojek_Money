let data = 'ar5un_4899704ma+@na[f7895';

//Not Using JS inbuilt Functions

let string="";
let maxValue=0;
let tempValue=0;

//To check if value is a number or not
function isNumber(value){
    return !isNaN(value)
}

//To loop over throught characters in the string
for(var i=0;i<=data.length;i++){
    let char=data[i]
    if(isNumber(char)){
        string=string+char
    }else{
        if(string!==""){
            tempValue=Number(string)
            if(tempValue>maxValue){
                maxValue=tempValue
            }
        }
        string=""
    }
}
console.log("Max Value : ",maxValue)


//Using JS inbuilt Functions
let newStr = data.replace(/[^0-9]/gi, '_').split('_').filter(x=>x!=="").map(x=>Number(x))
let greatestValue=Math.max(...newStr)
console.log("greatestValue : ",greatestValue)