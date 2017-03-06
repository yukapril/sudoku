import {
    BoxFilter,
    BoxRemoveAlter
} from './Box';
import Possibility from './BoxPossibility';


// 行列宫检查
var check = (boxes, type) => {
    var flag = false; // 当前是否发生过改变
    for (let i = 1; i <= 9; i++) {
        var cache = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };

        // 获取当前行/列/宫 数组数据
        var arr = BoxFilter(boxes, type, i);
        arr.forEach((o) => {
            // 当前区块内的每一个元素
            o.alter.forEach(a => {
                // 每一个元素的备选数
                // 缓存到cache上
                cache[a].push(o);
            });
        });
        // 检查哪一个是孤立数字，直接可以填写
        for (let j in cache) {
            // j 为字符串
            if (cache[j].length === 1) {
                cache[j][0].setValue(+j);
                flag = true;
            }
        }
    }
    return flag;
};

// 计算每个区域孤立（唯一）数
const Along = (boxes) => {
    var flag = false;
    // 检查行
    // 发生改变后，必须刷新待填写数据
    var f1 = check(boxes, 'x') && Possibility(boxes);
    flag = flag || f1 || false;

    // 检查列
    // 发生改变后，必须刷新待填写数据
    var f2 = check(boxes, 'y') && Possibility(boxes);
    flag = flag || f2 || false;

    // 检查宫
    // 发生改变后，必须刷新待填写数据
    var f3 = check(boxes, 'block') && Possibility(boxes);
    flag = flag || f3 || false;

    flag && Along(boxes);

};


export default Along;