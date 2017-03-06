 class Box {
     constructor(x, y) {
         this.x = x; // 横坐标
         this.y = y; // 纵坐标
         this.block = null; // 在第几宫
         this.value = null; // 数值
         this.alter = []; // 可能的数值
         this.el = null; // 对应的元素节点
         this.hasChanged = false; // 如果为true，则将value/alter渲染到元素中
     }
     setValue(n) {
         this.value = n;
         this.alter = [];
         this.hasChanged = true;
     }
     setAlter(arr) {
         this.value = null;
         this.alter = arr;
         this.hasChanged = true;
     }
     alterRemove(n) {
         if (this.alter.includes(n)) {
             this.alter = this.alter.filter(v => v !== n);
             this.hasChanged = true;
             return true;
         } else {
             return false;
         }
     }
 }

 // 筛选指定行/列/宫
 const BoxFilter = (boxes, filter, value) => {
     return boxes.filter((o) => o[filter] == value);
 };

 // 移除一个备选数
 const BoxRemoveAlter = (boxes, value) => {
     var flag = false;
     boxes.forEach((o) => {
         if (o.alterRemove(value)) {
             flag = true;
         };
     });
     return flag;
 };

 export {
     Box,
     BoxFilter,
     BoxRemoveAlter
 };