function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        // 1. 如果之前有定时器，说明用户又操作了，赶紧清除，重新计时
        if (timer) clearTimeout(timer);
        
        // 2. 开启新的倒计时
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}