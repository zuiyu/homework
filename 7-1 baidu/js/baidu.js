//js特效
$(document).ready(function () {
    $("nav ul li:last-of-type a").mouseover(function () {
        $(".right-more").show();
    });
    $(".right-more").mouseover(function () {
        $(this).show();
    });
    $(".right-more").mouseout(function () {
        $(this).hide();
    });
    $(".left").on("click", function () {
        $(".daohang").eq(0).toggle();
        if ($(".fa-caret-down").length > 0) {
            $(".fa").addClass("fa-caret-right").removeClass("fa-caret-down");
        } else {
            $(".fa").addClass("fa-caret-down").removeClass("fa-caret-right");
        }
    });
    $(".men").on("click", function () {
        $(".on").removeClass("on");
        $(this).addClass("on");
        index = $(this).index();
        $(".top-body").hide();
        $(".top-body").eq(index).show();
    });
    $(".top-body").eq(0).hover(function () {
        $(".right").show();
    }, function () {
        $(".right").hide();
    })
});
