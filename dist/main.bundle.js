webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
    function Box(x, y) {
        _classCallCheck(this, Box);

        this.x = x; // 横坐标
        this.y = y; // 纵坐标
        this.block = null; // 在第几宫
        this.value = null; // 数值
        this.alter = []; // 可能的数值
        this.el = null; // 对应的元素节点
        this.hasChanged = false; // 如果为true，则将value/alter渲染到元素中
    }

    _createClass(Box, [{
        key: "setValue",
        value: function setValue(n) {
            this.value = n;
            this.alter = [];
            this.hasChanged = true;
        }
    }, {
        key: "setAlter",
        value: function setAlter(arr) {
            this.value = null;
            this.alter = arr;
            this.hasChanged = true;
        }
    }, {
        key: "alterRemove",
        value: function alterRemove(n) {
            if (this.alter.includes(n)) {
                this.alter = this.alter.filter(function (v) {
                    return v !== n;
                });
                this.hasChanged = true;
                return true;
            } else {
                return false;
            }
        }
    }]);

    return Box;
}();

// 筛选指定行/列/宫


var BoxFilter = function BoxFilter(boxes, filter, value) {
    return boxes.filter(function (o) {
        return o[filter] == value;
    });
};

// 移除一个备选数
var BoxRemoveAlter = function BoxRemoveAlter(boxes, value) {
    var flag = false;
    boxes.forEach(function (o) {
        if (o.alterRemove(value)) {
            flag = true;
        };
    });
    return flag;
};

exports.Box = Box;
exports.BoxFilter = BoxFilter;
exports.BoxRemoveAlter = BoxRemoveAlter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Box = __webpack_require__(0);

// 行列宫检查
var check = function check(boxes, type) {
    var flag = false;
    for (var i = 1; i <= 9; i++) {
        var arr = (0, _Box.BoxFilter)(boxes, type, i);
        arr.forEach(function (o) {
            if (o.value) {
                //存在唯一值，将本组数据的alter进行清理
                if ((0, _Box.BoxRemoveAlter)(arr, o.value)) {
                    flag = true;
                };
            }
        });
    }
    return flag;
};

// 唯一一个可选值检查
var onlyOne = function onlyOne(boxes) {
    var flag = false; // 是否有修改数据
    boxes.forEach(function (o) {
        var alter = o.alter;
        if (alter.length === 1) {
            //仅仅存在一个值，直接写入value
            o.setValue(alter[0]);
            flag = true;
        }
    });
    return flag;
};

// 计算每个单元格中数字的可能性
var Possibility = function Possibility(boxes) {
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

exports.default = Possibility;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Box = __webpack_require__(0);

var _BoxPossibility = __webpack_require__(1);

var _BoxPossibility2 = _interopRequireDefault(_BoxPossibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 行列宫检查
var check = function check(boxes, type) {
    var flag = false; // 当前是否发生过改变
    for (var i = 1; i <= 9; i++) {
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
        var arr = (0, _Box.BoxFilter)(boxes, type, i);
        arr.forEach(function (o) {
            // 当前区块内的每一个元素
            o.alter.forEach(function (a) {
                // 每一个元素的备选数
                // 缓存到cache上
                cache[a].push(o);
            });
        });
        // 检查哪一个是孤立数字，直接可以填写
        for (var j in cache) {
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
var Along = function Along(boxes) {
    var flag = false;
    // 检查行
    // 发生改变后，必须刷新待填写数据
    var f1 = check(boxes, 'x') && (0, _BoxPossibility2.default)(boxes);
    flag = flag || f1 || false;

    // 检查列
    // 发生改变后，必须刷新待填写数据
    var f2 = check(boxes, 'y') && (0, _BoxPossibility2.default)(boxes);
    flag = flag || f2 || false;

    // 检查宫
    // 发生改变后，必须刷新待填写数据
    var f3 = check(boxes, 'block') && (0, _BoxPossibility2.default)(boxes);
    flag = flag || f3 || false;

    flag && Along(boxes);
};

exports.default = Along;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 将表格填充数据
var Fill = function Fill(boxes) {
    boxes.forEach(function (v) {
        if (!v.value && v.alter.length === 0) {
            v.setAlter([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
    });
};

exports.default = Fill;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Render = exports.Tables = undefined;

var _Box = __webpack_require__(0);

// 计算坐标在第几宫
var findBlock = function findBlock(i, j) {
    // 计算坐标在第几宫的编号
    var findPos = function findPos(n) {
        var temp = 0;
        if (n <= 3) {
            temp = 1;
        } else if (n <= 6) {
            temp = 2;
        } else {
            temp = 3;
        }
        return temp;
    };
    var temp = findPos(i) + ',' + findPos(j);
    var ret = 0;
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
};

// 点击数字高亮显示
var handleClick = function handleClick(e, d, boxes) {
    var value = d.value;
    if (value) {
        // 当点击的box是存在唯一数时候才能触发
        boxes.forEach(function (o) {
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
var Tables = function Tables() {
    var table = document.createElement('div');
    var boxes = [];

    for (var i = 1; i <= 9; i++) {
        // 9行
        var line = document.createElement('div');
        line.className = 'line';

        var _loop = function _loop(j) {
            // 9列
            var box = document.createElement('div');

            var d = new _Box.Box();
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
        };

        for (var j = 1; j <= 9; j++) {
            _loop(j);
        }
        table.appendChild(line);
    }
    return {
        table: table,
        boxes: boxes
    };
};

var Render = function Render(arr) {
    arr.forEach(function (o) {
        var v = o.value || o.alter.join(',');
        if (o.hasChanged) {
            o.el.innerText = v;
            o.hasChanged = false;
        }
        if ((v + '').length === 1) {
            o.el.classList.add('result');
        }
    });
};

exports.Tables = Tables;
exports.Render = Render;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Tables = __webpack_require__(4);

var _BoxFill = __webpack_require__(3);

var _BoxFill2 = _interopRequireDefault(_BoxFill);

var _BoxPossibility = __webpack_require__(1);

var _BoxPossibility2 = _interopRequireDefault(_BoxPossibility);

var _BoxAlong = __webpack_require__(2);

var _BoxAlong2 = _interopRequireDefault(_BoxAlong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建表格
var tables = (0, _Tables.Tables)();

// 渲染表格到页面
document.querySelector('#app').appendChild(tables.table);

// 处理填写的数据
document.querySelector('#J_Start').addEventListener('click', function () {
    tables.boxes.forEach(function (o) {
        if (o.el.innerText.length === 1) {
            o.setValue(parseInt(o.el.innerText));
        }
    });
    (0, _Tables.Render)(tables.boxes);
}, false);

// 填充默认数据
document.querySelector('#J_Fill').addEventListener('click', function () {
    (0, _BoxFill2.default)(tables.boxes);
    (0, _Tables.Render)(tables.boxes);
}, false);

// 计算可能性
document.querySelector('#J_Possibility').addEventListener('click', function () {
    (0, _BoxPossibility2.default)(tables.boxes);
    (0, _Tables.Render)(tables.boxes);
}, false);

// 计算唯一性
document.querySelector('#J_Along').addEventListener('click', function () {
    (0, _BoxAlong2.default)(tables.boxes);
    (0, _Tables.Render)(tables.boxes);
}, false);

window.boxes = tables.boxes;
window.rrr = (0, _Tables.Render)(tables.boxes);

/***/ })
],[5]);