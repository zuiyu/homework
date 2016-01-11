$(document).ready(function() {
        $(".search input").focus(function() {
            $(".search button").css({
                "background-color": "#35b558",
                "background-image": "url(images/topsearch-icon2_8c8d8b0.png)"
            });
        }).blur(function() {
            $(".search button").css({
                "background-color": "#fff",
                "background-image": "url(images/topsearch-icon_e1f5df2.png)"
            });
        });
        $(".search button").hover(function() {
            $(".search button").css({
                "background-color": "#35b558",
                "background-image": "url(images/topsearch-icon2_8c8d8b0.png)"
            });
        }, function() {
            $(".search button").css({
                "background-color": "#fff",
                "background-image": "url(images/topsearch-icon_e1f5df2.png)"
            });
        });
        $(".center-left-nav ul li").hover(function() {
            $(".hidemenu").show();
            $(".submenu").hide().eq($(this).index()).show();
        }, function() {
            $(".hidemenu").hide();
            $(".submenu").hide();
        });
        $(".submenu").hover(function() {
            $(this).show();
        }, function() {
            $(this).hide();
        });
        $(".left-page,.right-page").hover(function() {
            $(this).find("img").css({
                "top": "-60px"
            });
        }, function() {
            $(this).find("img").css({
                "top": "0"
            });
        });
        $(".banners").on("click", ".left-page", function() {
            lf = parseInt($(".banner").css("margin-left"));
            if (lf >= -570) {
                $(".banner").css("margin-left", "-3420px");
                $(".banner").animate({
                    "margin-left": "-2850px"
                }, 500);
            } else {
                $(".banner").animate({
                    "margin-left": lf + 570 + "px"
                }, 500);
            }
        }).on("click", ".right-page", function() {
            lf = parseInt($(".banner").css("margin-left"));
            if (lf == -570 * 5) {
                $(".banner").css("margin-left", "0");
                $(".banner").animate({
                    "margin-left": "0"
                }, 500);
            } else {
                $(".banner").animate({
                    "margin-left": lf - 570 + "px"
                }, 500);
            }
        });
        $(".imenu").hover(function() {
            $(".hover").removeClass("hover");
            $(this).addClass("hover");
            $(".wrapper").hide().eq($(this).index()).show();
        });
        $(".course").hover(function() {
            $(this).animate({
                "z-index": 100,
                "height": "240px"
            }, 400).find(".hidden1").slideDown(500);
        }, function() {
            $(this).animate({
                "z-index": 1,
                "height": "200px"
            }, 400).find(".hidden1").slideUp(500);
        });
        $(".web div").hover(function(){
            $(this).css("border","1px solid #35b558").find("a").css({"border":"none","background":"#35b558","color":"#fff"});
        },function(){
            $(this).css("border","1px solid #e7e7e7").find("a").css({"border":"1px solid #35b558","background":"#fff","color":"#35b558"});
        });
        $(".schools").on("click",".left-page",function(){
            $left = parseInt($(".school").css("margin-left"));
            if($left<-270){
                $left=135;
            }
            $(".school").animate({"margin-left":$left-135+"px"},500);
        });
        $(".schools").on("click",".right-page",function(){
            $left = parseInt($(".school").css("margin-left"));
            if($left>=0){
                $left=-390;
            }
            $(".school").animate({"margin-left":$left+135+"px"},500);
        });
    });