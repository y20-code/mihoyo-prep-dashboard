function lengthOfLongestSubstring(s: string): number {
    // Set 用来记录窗口里有哪些字符，方便快速查找重复
    const set = new Set<string>();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // 1. 进窗口前检查：如果 set 里已经有了 s[right]，说明重复了
        // left 要一直往右缩，一边缩一边删，直到把重复的那个删掉
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }

        // 2. 进窗口：现在安全了，把 s[right] 加进来
        set.add(s[right]);

        // 3. 记账：更新最大长度
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};