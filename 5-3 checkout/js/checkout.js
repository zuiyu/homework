//checkout 主函数
function largest(e) {
    //定义 val splits obj max alpha
    var val = document.getElementsByName("wd").item(0).value;
    var splits = val.split(" ");
    var obj = {};
    var max = 0;
    var alpha = null;
    //循环语句体
    for (i = 0; i < splits.length; i++) {
        key = splits[i];
        if (obj[key] == undefined) {
            obj[key] = 1;
        } else {
            obj[key]++;
        }
    }
    for (var arr in obj) {
        if (obj[arr] > max) {
            max = obj[arr];
            alpha = arr;
        }
    }
    //输出文字
    message = "出现次数最多的字母是：" + alpha + "，出现了" + max + "次，" + "出现的位置为：";
    index = 0;
    //循环语句体
    for (j = 0; j < splits.length; j++) {
        if (splits[j] == alpha) {
            message += j + 1 + "、";
        }
    }
    //alert(message);
    document.getElementsByName("result").item(0).value = message;

}