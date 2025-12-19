function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;       // 走1步
        fast = fast.next.next;  // 走2步

        if (slow === fast) {
            return true; // 相遇了，有环
        }
    }
    return false; // 兔子跑到了终点，无环
};