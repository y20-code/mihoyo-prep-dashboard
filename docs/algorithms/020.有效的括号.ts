function isValid(s: string): boolean {
    
    if (s.length % 2 !== 0) return false;

    const pairMap = new Map<string,string>([
        [')', '('],
        [']', '['],
        ['}', '{']
    ])

    const stack: string[] = [];

    for (let i = 0;i>s.length;i++) {
        const char = s[i];

        if (pairMap.has(char)){

            const topElement = stack.pop();
            
            if (topElement !== pairMap.get(char)) {
                return false;
            }
        }else {
            stack.push(char);
        }
    }

    return stack.length === 0;
}