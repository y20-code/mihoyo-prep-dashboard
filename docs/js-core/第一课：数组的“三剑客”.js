const rawData = [
  { id: 1, text: 'Apple', price: 10, learned: true },
  { id: 2, text: 'Banana', price: 5, learned: false },
  { id: 3, text: null, price: 0, learned: false },    // 脏数据：没有 text
  { id: 4, text: 'Orange', price: 8, learned: true },
  { id: 1, text: 'Apple', price: 10, learned: true }  // 脏数据：重复了 (ID 1)
];

// 任务 1：请用 filter 去掉 text 为空的数据
const validData = rawData.filter(item => item.text !==null);

// 任务 2：请用 map 把 validData 里的 price 都变成 2 倍 (通货膨胀了)
const expensiveData = validData.map(item => ({
  ...item, 
  price: item.price * 2 
}));

// 任务 3：(进阶) 请用 reduce 算出 expensiveData 里所有单词的总价 (Sum)
// 提示：初始值是 0
const totalPrice = expensiveData.reduce((total, item) => total + item.price, 0);

console.log(totalPrice);