import {
    BoxFilter,
    BoxRemoveAlter
} from './Box';


// 行列宫检查
var check = (boxes, type) => {
    var flag = false;
    for (let i = 1; i <= 9; i++) {
        var arr = BoxFilter(boxes, type, i);
        arr.forEach((o) => {
            if (o.value) {
                //存在唯一值，将本组数据的alter进行清理
                if (BoxRemoveAlter(arr, o.value)) {
                    flag = true;
                };
            }
        });
    }
    return flag;
};

// 唯一一个可选值检查
var onlyOne = (boxes) => {
    var flag = false; // 是否有修改数据
    boxes.forEach(o => {
        let alter = o.alter;
        if (alter.length === 1) {
            //仅仅存在一个值，直接写入value
            o.setValue(alter[0]);
            flag = true;
        }
    });
    return flag;
};


// 计算每个单元格中数字的可能性
const Possibility = (boxes) => {
    // 检查行
    var f1 = check(boxes, 'x');
    // 检查列
    var f2 = check(boxes, 'y');
    // 检查宫
    var f3 = check(boxes, 'block');
    // 处理唯一可选值情况
    var f4 = onlyOne(boxes);
    // 如果存在孤立元素（唯一值），则需要在跑一遍本函数
    f4 && Possibility(boxes);


    return f1 || f2 || f3 || f4;
};


export default Possibility;