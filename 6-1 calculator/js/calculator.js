// calculator主函数
var caculator = null;
var val1 = null;
var val2 = null;
var empty = false;
var point = false;

//num函数
function num(e) {
    //console.trace(this);
    //console.trace(e.innerHTML);
    if (empty == true) {
        document.querySelector(".result div").innerHTML = 0;
    }
    if (document.querySelector(".result div").innerHTML == "0") {
        if (e.innerHTML != ".") {
            document.querySelector(".result div").innerHTML = null;
        }
    }
    if(e.innerHTML == "."){
        if(point!==true){
            document.querySelector(".result div").innerHTML = document.querySelector(".result div").innerHTML + e.innerHTML;
            empty = false;
            point = true;
        }
    }else{
        document.querySelector(".result div").innerHTML = document.querySelector(".result div").innerHTML + e.innerHTML;
        empty = false;
    }

}

//获取运算符
function cacl(e) {
    if (val1 == null) {
        val1 = Number(document.querySelector(".result div").innerHTML);
    }
    caculator = e.innerHTML;
    empty = true;
    point = false;
}

//结果函数
function result() {
    if (val1 == null && val2 == null) {
        return false;
    }
    if (val2 == null) {
        val2 = Number(document.querySelector(".result div").innerHTML);
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
    document.querySelector(".result div").innerHTML = re.toString();
    empty = true;
    val1 = null;
    val2 = null;
    caculator = null;
    point = false;
}
//清除函数
function AC() {
    document.querySelector(".result div").innerHTML = 0;
    caculator = null;
    val1 = null;
    val2 = null;
    point = false;
}

//函数:百分号 sin cos tan
function fl(e) {
    val1 = Number(document.querySelector(".result div").innerHTML);
    switch (e.innerHTML) {
        case "%":
            res = val1 / 100;
            break;
        case "sin":
            res = Math.sin(val1);
            break;
        case "cos":
            res = Math.cos(val1);
            break;
        case "tan":
            res = Math.tan(val1);
            break;
        case "abs":
            res = Math.abs(val1);
            break;
    }
    document.querySelector(".result div").innerHTML = res;
    empty = true;
    point = false;
    val1 = res;
}

// 给按钮绑定事件
var tds = document.getElementsByTagName("td");
for(var i = 0; i < tds.length;i++){
    if(i==0){
        tds[i].onclick = function(){
            AC(this);
        }
    }else if(i==8||i==9||i==10||i==12||i==13||i==14||i==16||i==17||i==18||i==20||i==21){
       tds[i].onclick = function(){
            num(this);
        }
    }else if(i>=2&&i<=6){
        tds[i].onclick = function(){
            fl(this);
        }
    }else if(i==7||i==11||i==15||i==19){
        tds[i].onclick = function(){
            cacl(this);
        }
    }else if(i==22){
        tds[i].onclick = function(){
            result(this);
        }
    }
}