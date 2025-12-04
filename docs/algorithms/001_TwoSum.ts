// 题目：1.两数之和 (Two Sum)
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

// 你可以按任意顺序返回答案。

 

// 示例 1：

// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
// 示例 2：

// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]
// 示例 3：

// 输入：nums = [3,3], target = 6
// 输出：[0,1]
function twoSum(nums: number[], target: number): number[] {
    
    // 1. 创建一个小本本 (Map)
    // TypeScript 特有写法：<number, number> 
    // 意思是你告诉 TS：这个本子，Key 只能记数字(数值)，Value 也只能记数字(下标)
    const map = new Map<number, number>();

    // 2. 开始只遍历一次
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        
        // 3. 算出：为了凑齐 target，我需要的“另一半”是谁？
        const partner = target - currentNum;

        // 4. 查本子：我的另一半在之前出现过吗？
        if (map.has(partner)) {
            // 5. 找到了！返回 [另一半的下标, 当前我的下标]
            // 注意这里加了个感叹号 (!) 
            // 意思是：TS你别怕，我刚才用 has 查过了，这里面绝对有值，不会是 undefined！
            return [map.get(partner)!, i];
        }

        // 6. 没找到，把自己记在本子上，等待后面的人来找我
        // 格式：map.set(数值, 下标)
        map.set(currentNum, i);
    }
    
    return []; // 如果没找到
}