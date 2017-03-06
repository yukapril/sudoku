// 将表格填充数据
const Fill = (boxes) => {
    boxes.forEach((v) => {
        if (!v.value && v.alter.length === 0) {
            v.setAlter([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
    });
};

export default Fill;