function buildList(list) {
    var result = [];
    
    // 注意：这里用了 var (老式变量，没有块级作用域)
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        
        // 我们往数组里存了 3 个函数
        // 每个函数都在打印 i
        result.push( function() { console.log(item + ' ' + i) } );
    }

    //老式写法
    // for (var i = 0; i < 3; i++) {
    // (function(lockedIndex) {
    //     result.push(function() { console.log(lockedIndex) });
    // })(i);
    // }
    
    return result;
}



function testList() {
    var fnList = buildList([1, 2, 3]);
    
    // 问题：这里会打印什么？
    // A. item0 0, item1 1, item2 2
    // B. item2 3, item2 3, item2 3
    fnList[0]();
    fnList[1]();
    fnList[2]();
}

testList(); // 运行