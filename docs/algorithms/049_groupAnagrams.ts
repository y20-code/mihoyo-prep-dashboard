// 49. 字母异位词分组 (Group Anagrams)

// 输入：["eat", "tea", "tan", "ate", "nat", "bat"]

// 输出：[["bat"], ["nat","tan"], ["ate","eat","tea"]]

// 思路 (Map 的键)：

// 遍历每个单词。

// 关键点：怎么生成一个“身份证”？比如 eat 和 tea，如果把它们按照字母排序，都变成 aet。

// 把 aet 作为 Map 的 Key，把原始单词存进 Value (数组) 里。

function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (const str of strs) {
        // 1. 生成 Key: 'tea' -> ['t','e','a'] -> 排序 -> 'aet'
        const key = str.split('').sort().join('');

        // 2. 存入 Map
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(str);
    }

    // 3. 返回所有分组
    return Array.from(map.values());
};