/**
 * Created by Shmily on 15/11/4.
 */
//将0-100分学员分已10为分界,10分为一段，然后计算出该生为数字几等生
//老师,这是101个数字,怎么都分不出10分为一段呀...%>_<%
//我的处理规则:1.输入0,提示请输入1-100的数字 2.只判断1-100的分数范围

function grade() {
    q = document.querySelector("input").value;
    if (q > 100 || q <= 0) {
        alert("请输入1-100的数字");
        return false;
    }
    alert(Math.ceil((101 - q) / 10) + " 等生");
    return false;
}