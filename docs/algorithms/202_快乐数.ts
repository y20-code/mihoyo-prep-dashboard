// 题目：202. 快乐数 (Happy Number)
// 编写一个算法来判断一个数 n 是不是快乐数。

// 「快乐数」 定义为：

// 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果这个过程 结果为 1，那么这个数就是快乐数。
// 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

 

// 示例 1：

// 输入：n = 19
// 输出：true
// 解释：
// 1*1 + 9*9 = 82
// 8*8 + 2*2 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1
// 示例 2：

// 输入：n = 2
// 输出：false


// 1. 辅助函数：计算各位数字的平方和
// 输入 19 -> 返回 82 (1^2 + 9^2)
function getNext(n: number): number {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10; // 取出最后一位
        sum += digit * digit; // 累加平方
        n = Math.floor(n / 10); // 去掉最后一位
    }
    return sum;
}

// 2. 主函数：判断是否快乐数 (快慢指针)
function isHappy(n: number): boolean {
    let slow = n;
    // 快指针先走一步，防止一开始就相等导致循环不执行
    let fast = getNext(n);

    // 只要快指针没跑到终点 1，且没追上慢指针，就继续跑
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);           // 慢指针走一步
        fast = getNext(getNext(fast));  // 快指针走两步
    }

    // 循环结束只有两种可能：
    // 1. fast === 1 (是快乐数)
    // 2. slow === fast (撞车了，是死循环，不是快乐数)
    return fast === 1;
}

function isHappyTwo(n:number):boolean{
    const record = new Set()

    while (n!==1){
        n = getNext(n)

        if (record.has(n)){
            return false;
        }

        record.add(n);

    }

    return true;
}

