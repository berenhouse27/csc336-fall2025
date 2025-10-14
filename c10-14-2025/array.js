var arr = [1,2,3,4,5,6,7,8,9,10]

// // Splicing
// let spliced = arr.splice(1,4)
// console.log(spliced);

// arr = [1,2,3,4,5,6,7,8,9,10]
// let singleSplice = arr.splice(0,1)
// console.log(singleSplice)

// // Loop 1
// arr.forEach(val => {
//     console.log(val);
// });
// // Loop 2
// for (let val of arr) {
//     console.log(val)
// }
// // Loop 3
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// // Filter 1
// var lessThan3 = arr.filter(el => {
//     if (el < 3)
//         return true;
//     else
//         return false;
// });
// console.log(lessThan3);
// // Filter 2
// var lessThan3 = arr.filter(el => el < 3);
// console.log(lessThan3);

// // Mapping 1
// var addTen = arr.map(el => {
//     return el + 10
// });
// console.log(addTen);
// // Mapping 2
// var addTen = arr.map(el => el + 10);
// console.log(addTen);

// // Sorting
// let randNums = []
// for (let i = 0; i < 100; i++) {
//     randNums.push(Math.round(Math.random()*100))
// }
// console.log(randNums)
// randNums.sort( (a, b) => a - b)
// console.log(randNums)