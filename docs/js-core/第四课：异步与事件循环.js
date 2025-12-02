console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

async function async1() {
  console.log('3'); // 这里的同步代码
  await async2();   // 遇到 await 了！
  console.log('4'); // 这行代码去哪儿排队了？
}

async function async2() {
  console.log('5');
}

async1(); // 执行函数

new Promise((resolve) => {
  console.log('6'); // Promise 构造函数是同步的
  resolve();
}).then(() => {
  console.log('7'); // 微任务
});

console.log('8'); // 同步