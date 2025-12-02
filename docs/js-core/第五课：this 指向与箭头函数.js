const name = 'Window Global'; // 全局变量

const player = {
  name: 'Mihoyo Player',
  
  // 普通函数
  run: function() {
    console.log(this.name);
  },
  
  // 箭头函数
  jump: () => {
    console.log(this.name);
  }
};

const runAction = player.run;

// 1. 正常调用
player.run();  // [A] 打印什么？

// 2. 裸奔调用
runAction();   // [B] 打印什么？(提示：在非严格模式下指向全局)

// 3. 箭头函数调用
player.jump(); // [C] 打印什么？