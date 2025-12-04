// 题目：349. 两个数组的交集 (Intersection of Two Arrays)

// 给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]
// 解释：[4,9] 也是可通过的

// 思路：

// 把 nums1 扔进一个 Set 里（自动去掉了重复数字）。

// 遍历 nums2，看每个数字是否在 Set 里出现过。

// 如果在，就是交集的一部分。记得结果也要去重。

function intersection(nums1: number[], nums2: number[]): number[] {
    // 1. 把 nums1 变成 Set (去重 + 查找快)
    const set1 = new Set(nums1);
    const result = new Set<number>(); // 用 Set 存结果，防止重复添加

    // 2. 遍历 nums2
    for (const num of nums2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }

    // 3. 把 Set 变回数组返回
    return Array.from(result);
};