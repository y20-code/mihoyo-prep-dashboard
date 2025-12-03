/**
 * 手写深拷贝 (乞丐版 - 面试够用)
 * @param {any} obj 需要拷贝的对象
 * @returns {any} 拷贝后的新对象
 */
function deepClone(obj) {
    // 1. 【出口】如果不是对象(是数字、字符串等)，或者是 null，直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 2. 【容器】初始化返回结果，看是数组还是对象
    let result = Array.isArray(obj) ? [] : {};

    // 3. 【循环】遍历属性
    for (let key in obj) {
        // 保证只拷贝对象自己的属性，不拷贝原型链上的
        if (obj.hasOwnProperty(key)) {
            // 4. 【递归】关键！递归调用 deepClone
            // 意思说：无论这一项是什么，都把它当成一个新的对象，再走一遍这套流程
            result[key] = deepClone(obj[key]);
        }
    }

    return result;
}

// --- 测试代码 ---
const original = { 
    name: '米哈游', 
    jobs: { title: '前端', skills: ['React', 'TS'] } 
};

const copy = deepClone(original);

copy.jobs.title = '原神启动';     // 修改深层属性
copy.jobs.skills[0] = 'Vue';      // 修改数组内容

console.log('原对象 title:', original.jobs.title); // 应该是 '前端'
console.log('原对象 skills:', original.jobs.skills[0]); // 应该是 'React'