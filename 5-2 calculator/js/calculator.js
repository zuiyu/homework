// calculator主函数
var caculator = null;
var val1 = null;
var val2 = null;
var empty = false;
var point = false;

//num函数
function num(e) {
    //console.trace(this);
    //console.trace(e.innerText);
    if (empty == true) {
        document.querySelector(".result div").innerText = 0;
    }
    if (document.querySelector(".result div").innerText == "0") {
        if (e.innerText != ".") {
            document.querySelector(".result div").innerText = null;
        }
    }
    if(e.innerText == "."){
        if(point!==true){
            document.querySelector(".result div").innerText = document.querySelector(".result div").innerText + e.innerText;
            empty = false;
            point = true;
        }
    }else{
        document.querySelector(".result div").innerText = document.querySelector(".result div").innerText + e.innerText;
        empty = false;
    }

}

//获取运算符
function cacl(e) {
    if (val1 == null) {
        val1 = Number(document.querySelector(".result div").innerText);
    }
    caculator = e.innerText;
    empty = true;
    point = false;
}

//结果函数
function result() {
    if (val1 == null && val2 == null) {
        return false;
    }
    if (val2 == null) {
        val2 = Number(document.querySelector(".result div").innerText);
    }
    re = 0;
    // alert(caculator);
    // alert(val1);
    // alert(val2);
    //实现加减乘除和Mod
    switch (caculator) {
        case '+':
            re = val1 + val2;
            break;
        case "-":
            re = val1 - val2;
            break;
        case "×":
            re = val1 * val2;
            break;
        case "÷":
            re = val1 / val2;
            break;
        case "Mod":
            re = val1 % val2;
            break;
    }
    //alert(re);
    document.querySelector(".result div").innerText = re.toString();
    empty = true;
    val1 = null;
    val2 = null;
    caculator = null;
    point = false;
}
//清除函数
function AC() {
    document.querySelector(".result div").innerText = 0;
    caculator = null;
    val1 = null;
    val2 = null;
    point = false;
}

//函数:百分号 sin cos tan
function fl(e) {
    val1 = Number(document.querySelector(".result div").innerText);

    switch (e.innerText) {
        case "%":
            result = val1 / 100;
            break;
        case "sin":
            result = Math.sin(val1);
            break;
        case "cos":
            result = Math.cos(val1);
            break;
        case "tan":
            result = Math.tan(val1);
            break;
        case "abs":
            result = Math.abs(val1);
            break;
    }
    document.querySelector(".result div").innerText = result;
    empty = true;
    point = false;
}