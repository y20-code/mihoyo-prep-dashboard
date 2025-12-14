function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Start sleeping...');
    await sleep(2000);
    console.log('2秒过去了');
}

demo();


// 1. 普通函数：一口气跑完
function normal() {
    console.log('--- 普通函数开始 ---');
    console.log('1');
    console.log('2');
    console.log('--- 普通函数结束 ---');
}
normal(); 

// 2. Generator 函数：关键在于那个星号 *
function* gen() {
    console.log('🌟 电影开始播放');
    
    // 第一次暂停
    yield '第一幕：主角登场'; 
    
    console.log('...经过漫长的等待...');
    
    // 第二次暂停
    yield '第二幕：反派出现';
    
    console.log('🎬 电影结束');
    return '散场';
}

// 3. 怎么用？(这就是面试常考的“迭代器模式”)
console.log('\n--- Generator 开始 ---');

// 第一步：初始化。注意！调用 gen() 不会执行任何代码！
// 它只是发给你一个“遥控器” (iterator)
const remoteControl = gen(); 

console.log('我要按第一次播放键了...');
// next() 就是按下播放键。代码跑到第一个 yield 就会停下来。
const result1 = remoteControl.next(); 
console.log('屏幕显示:', result1); 
// 输出: { value: '第一幕：主角登场', done: false }
// done: false 表示电影还没演完

console.log('\n--- 中场休息 (我可以去上个厕所，代码状态被冻结了) ---');

console.log('我要按第二次播放键了...');
const result2 = remoteControl.next();
console.log('屏幕显示:', result2);
// 输出: { value: '第二幕：反派出现', done: false }

console.log('\n--- 又是中场休息 ---');

console.log('按最后一次...');
const result3 = remoteControl.next();
console.log('屏幕显示:', result3);
// 输出: { value: '散场', done: true } 
// done: true 表示彻底结束了