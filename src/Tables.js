import {
    Box
} from './Box';

// 计算坐标在第几宫
const findBlock = (i, j) => {
    // 计算坐标在第几宫的编号
    let findPos = (n) => {
        let temp = 0;
        if (n <= 3) {
            temp = 1;
        } else if (n <= 6) {
            temp = 2;
        } else {
            temp = 3;
        }
        return temp;
    }
    let temp = findPos(i) + ',' + findPos(j);
    let ret = 0;
    switch (temp) {
        case '1,1':
            ret = 1;
            break;
        case '1,2':
            ret = 2;
            break;
        case '1,3':
            ret = 3;
            break;
        case '2,1':
            ret = 4;
            break;
        case '2,2':
            ret = 5;
            break;
        case '2,3':
            ret = 6;
            break;
        case '3,1':
            ret = 7;
            break;
        case '3,2':
            ret = 8;
            break;
        case '3,3':
            ret = 9;
            break;
    }
    return ret;
}

// 点击数字高亮显示
const handleClick = function (e, d, boxes) {
    var value = d.value;
    if (value) {
        // 当点击的box是存在唯一数时候才能触发
        boxes.forEach(o => {
            if (o.value) {
                // 处理确定的单一值
                if (o.value === value) {
                    o.el.classList.add('highlight');
                } else {
                    o.el.classList.remove('highlight');
                }
            } else {
                // 处理猜测值
                if (o.alter.includes(value)) {
                    o.el.classList.add('highlight');
                } else {
                    o.el.classList.remove('highlight');
                }
            }
        });
    }
};

/**
 * 创建格子并进行元素绑定
 */
const Tables = () => {
    var table = document.createElement('div');
    var boxes = [];

    for (let i = 1; i <= 9; i++) {
        // 9行
        let line = document.createElement('div');
        line.className = 'line';
        for (let j = 1; j <= 9; j++) {
            // 9列
            let box = document.createElement('div');

            let d = new Box();
            d.x = i;
            d.y = j;

            d.block = findBlock(i, j);
            d.el = box;
            boxes.push(d);

            if (d.block & 1) {
                // 奇数宫格
                box.className = 'box single';
            } else {
                // 偶数宫格
                box.className = 'box double';
            }
            box.setAttribute('contenteditable', true);
            box.addEventListener('click', function (e) {
                handleClick.call(this, e, d, boxes);
            }, false);
            line.appendChild(box);
        }
        table.appendChild(line);
    }
    return {
        table,
        boxes
    };
};

const Render = (arr) => {
    arr.forEach((o) => {
        let v = o.value || o.alter.join(',');
        if (o.hasChanged) {
            o.el.innerText = v;
            o.hasChanged = false;
        }
        if ((v + '').length === 1) {
            o.el.classList.add('result');
        }
    });
};

export {
    Tables,
    Render
};