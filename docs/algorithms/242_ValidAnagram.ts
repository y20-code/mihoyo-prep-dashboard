/**
 * 242. 有效的字母异位词 (数组优化版)
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。

 

示例 1:

输入: s = "anagram", t = "nagaram"
输出: true
示例 2:

输入: s = "rat", t = "car"
输出: false
 */
function isAnagram(s: string, t: string): boolean {
    // 1. 长度不一样，直接返回 false
    if (s.length !== t.length) return false;

    // 2. 申请一个长度为 26 的数组，代表 'a' 到 'z'
    // 初始值全是 0
    const table = new Array(26).fill(0);
    
    // 'a' 的 ASCII 码是 97
    const base = 97;

    for (let i = 0; i < s.length; i++) {
        // 3. 核心技巧：字符 -> 数组下标
        // s.charCodeAt(i) 拿到字符的 ASCII 码
        // 减去 97，就把 'a' 变成了下标 0，'b' 变成了下标 1...
        table[s.charCodeAt(i) - base]++; // s 里的负责加
        table[t.charCodeAt(i) - base]--; // t 里的负责减
    }

    // 4. 验收：如果全是 0，说明刚好抵消
    // every 是数组的一个方法：是不是每一个元素都满足条件？
    return table.every(count => count === 0);
};