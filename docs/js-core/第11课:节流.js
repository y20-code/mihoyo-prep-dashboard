function throttle(fn, delay) {
    // 1. 【闭包变量】门锁状态
    // 一开始是 false（没锁，没人）
    let isLocked = false;
    return function (...args) {
        // 2. 【检查锁】
        // 如果门是锁着的 (isLocked === true)
        // 啥也别干，直接走人
        if (isLocked === true) {
            return; 
        }
        // 3. 【关锁】(关键的一步！)
        // 既然我进来了，第一件事就是把门锁死！
        // 这样后面的人在 delay 时间内就进不来了
        isLocked = true;

        // 4. 【执行任务】
        // 节流通常是“立马执行” (First person wins)
        fn(...args);

        // 5. 【定个闹钟开锁】
        // 技能冷却时间到了 (delay 毫秒后)
        setTimeout(() => {
            // 把锁打开，变成 false
            // 这样下一个人才能进来
            isLocked = false; 
        }, delay);
    }
}