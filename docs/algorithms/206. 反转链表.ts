function reverseList(head:ListNode | null):ListNode |null{
    let prev = null;
    let curr = head;

    while (curr !==null){
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    return prev;
}