<html>
<meta charset="utf8">
<title>超级大学</title>
<link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <div class="header">
        <div class="head">
            <div class="usrbar">
                <div class="usrstatus">
                    <div class="info">
                        <span class="nm" style="line-height:38px">管理员</span>
                        <span class="logout"><a href="signout" style="line-height:38px" class="fuc">退出</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="body">
        <div class="table">
            <div class="nav">
                <label  class="active">新闻列表</label>
                <a href="add.html"><label>添加新闻</label></a>
            </div>
            <div class="form">
                <table cellspacing="0px" class="admins">
                    <tr>
                        <th width="100">新闻编号</th>
                        <th width="200">标题</th>
                        <th width="300">内容</th>
                        <th width="200">操作</th>
                    </tr>
                    <?php
                    require("model.php");
                    $news = new news();
                    $result = $news->selectAll();
                    foreach($result as $item){
                    ?>
                    <tr>
                        <td class="id"><?=$item->id;?></td>
                        <td><?=$item->title;?></td>
                        <td><?=$item->content;?></td>
                        <td><label class="button">删除</label></td>
                    </tr>
                    <?php } ?>
                </table>
            </div>
        </div>
    </div>
    <div class="warn">
    </div>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript">
        $(".button").on("click",function(){
            var id = $(this).closest("tr").find(".id").text();
            $e = $(this);
            $.post("delete.php",{id:id},function(data){
                if(data.status==1){
                    $e.closest("tr").remove();
                }
                $(".warn").text(data.msg).show().delay(3000).hide(0);
            },"json");
        })
    </script>
</body>

</html>
