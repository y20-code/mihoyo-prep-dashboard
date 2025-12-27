// Definition for a binary tree node.
// class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { ... }
// }

function maxDepth(root: TreeNode | null): number {
    // 1. 递归终止条件
    if (root === null) return 0;

    // 2. 递归计算左右子树
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    // 3. 取最大值 + 1
    return Math.max(leftDepth, rightDepth) + 1;
};