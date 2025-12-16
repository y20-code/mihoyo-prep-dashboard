// 21. 合并两个有序链表 (Merge Two Sorted Lists)
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

// 示例 1：


// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// 示例 2：

// 输入：l1 = [], l2 = []
// 输出：[]
// 示例 3：

// 输入：l1 = [], l2 = [0]
// 输出：[0]

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

    if (!list1) return list2;

    if (!list2) return list1;


    if (list1.val < list2.val) {
        // 这种情况：list1 的排头兵比较矮，他赢了，他当这一轮的头。
        
        // 关键句来了：list1.next = ...
        // 意思就是：list1（排头兵）的后面（next），要接上“剩下那堆人合并后的结果”。
        // 我们把 list1.next (list1 剩下的人) 和 list2 (list2 所有人) 扔给下一层递归去处理。
        list1.next = mergeTwoLists(list1.next, list2);
        
        // 这一层任务完成，返回这个排好的排头兵。
        return list1;
    } else {
        // 这种情况：list2 的排头兵比较矮（或一样高），list2 当头。
        
        // list2 的后面，接上“list1 所有人”和“list2 剩下的人”合并后的结果。
        list2.next = mergeTwoLists(list1, list2.next);
        
        return list2;
    }
}