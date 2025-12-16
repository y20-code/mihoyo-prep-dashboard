// 11. 盛最多水的容器 (Container With Most Water)
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 返回容器可以储存的最大水量。

// 说明：你不能倾斜容器。

// 思路：

// 左右两个指针 left, right 分别指向两端。

// 计算面积：Min(左高, 右高) * 宽度。

// 贪心决策：谁矮，谁就因为短板效应限制了高度。所以，移动较矮的那根柱子，试图找到更高的。

function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        // 1. 计算当前面积
        const currentHeight = Math.min(height[left], height[right]);
        const width = right - left;
        const area = currentHeight * width;

        // 2. 更新最大值
        max = Math.max(max, area);

        // 3. 谁矮谁移动
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max;
};