/**
* 创建日期: 2021-09-15
* 文件名称：00-reduce.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：
*/

const array1 = [];
console.log(array1.reduce((preValue,currentValue)=>{
    return preValue + currentValue;
},10));

//output: 10

const array2 = [1,2,3]
console.log(array2.reduce((preValue,currentValue)=>{
    return preValue + currentValue;
}, 5));

//output: 11 (5 + 1 + 2 + 3)