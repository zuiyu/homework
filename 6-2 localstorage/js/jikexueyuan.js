//js控制样式转换 localStorage
//get id
if("theme2"==localStorage.theme){
    document.getElementsByTagName("header").item(0).className = "header2";
}else{
    document.getElementsByTagName("header").item(0).className = "header1";
}

//change_theme
function change_theme(){
    if("header1" == document.getElementsByTagName("header").item(0).className){
        document.getElementsByTagName("header").item(0).className = "header2";
        localStorage.theme = "theme2";
    }else{
        document.getElementsByTagName("header").item(0).className = "header1";
        localStorage.theme = "theme1";
    }
}

//onclick事件
document.getElementsByClassName("theme")[0].onclick = function(){
    change_theme();
};
