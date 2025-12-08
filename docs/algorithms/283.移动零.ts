// 题目：283. 移动零 (Move Zeroes)
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

 

// 示例 1:

// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 示例 2:

// 输入: nums = [0]
// 输出: [0]

// 思路 (快慢指针)：

// 定义两个指针：slow (慢) 和 fast (快)。

// fast 在前面探路。

// 只要 fast 遇到非 0 的数，就跟 slow 位置交换，然后 slow 向前走一步。

// 如果 fast 遇到 0，fast 自己走，slow 不动（等着下一个非 0 数来覆盖这个位置）。

function moveZeroes(nums:number[]):void {
    let slow = 0;
    for (let fast = 0;fast <nums.length;fast++){
        if(nums[fast] !==0) {
            [nums[slow],nums[fast]] = [nums[fast],nums[slow]];
            slow++;
        }
    }
    
}