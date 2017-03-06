import {
    Tables,
    Render
} from './Tables';
import Fill from './BoxFill';
import Possibility from './BoxPossibility';
import Along from './BoxAlong';

// 创建表格
var tables = Tables();

// 渲染表格到页面
document.querySelector('#app').appendChild(tables.table);


// 处理填写的数据
document.querySelector('#J_Start').addEventListener('click', () => {
    tables.boxes.forEach((o) => {
        if (o.el.innerText.length === 1) {
            o.setValue(parseInt(o.el.innerText));
        }
    });
    Render(tables.boxes);
}, false);

// 填充默认数据
document.querySelector('#J_Fill').addEventListener('click', () => {
    Fill(tables.boxes);
    Render(tables.boxes);
}, false);

// 计算可能性
document.querySelector('#J_Possibility').addEventListener('click', () => {
    Possibility(tables.boxes);
    Render(tables.boxes);
}, false);

// 计算唯一性
document.querySelector('#J_Along').addEventListener('click', () => {
    Along(tables.boxes);
    Render(tables.boxes);
}, false);

window.boxes = tables.boxes;
window.rrr = Render(tables.boxes);