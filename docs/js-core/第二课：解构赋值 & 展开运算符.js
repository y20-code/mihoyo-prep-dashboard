const state = {
  loading: false,
  user: {
    id: 101,
    name: 'Mihoyo Player',
    tags: ['原神', '崩坏']
  },
  theme: 'dark'
};

// 任务 1：请用解构赋值，一行代码从 state 里拿出 loading 和 user
const { loading,user } = state;

// 任务 2：(难点) 请生成一个 newState。
// 要求：
// 1. 保留 state 里原本所有的属性 (...state)
// 2. 把 loading 改成 true
// 3. 把 user 里的 name 改成 'Tech Otaku' (注意：user 是嵌套对象，也要用展开运算符展开 user，否则 tags 会丢！)

const newState = {
  ...state,  // 1. 展开旧 state
  loading: true,         // 2. 修改 loading
  user: {
    ...user, // 3. 展开旧 user (防止丢数据)
    name: 'Tech Otaku'    // 4. 修改 name
  }
};

console.log(newState);