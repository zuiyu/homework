<?php
	error_reporting(E_ERROR);
	upload();
	$title = $_POST['title'];
	$content = $_POST['content'];
	$img = upload();
	require_once("model.php");
	$news = new news();
	if($news->add($title,$content,$img))
	{
		$data['status'] = 1;
		$data['msg'] = "添加成功";
	}else{
		$data['status'] = 0;
		$data['msg'] = "添加失败";
	}
	echo json_encode($data);

	function upload(){
		if ((($_FILES["file"]["type"] == "image/gif")|| ($_FILES["file"]["type"] == "image/jpeg")|| ($_FILES["file"]["type"] == "image/png"))
		&& ($_FILES["file"]["size"] < 2000000))
		{
			if ($_FILES["file"]["error"] > 0)
			{
			echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
			}
			else
			{
				if (file_exists("upload/" . $_FILES["file"]["name"]))
				{
					echo $_FILES["file"]["name"] . " already exists. ";
				}
				else
				{
					$name = $_FILES["file"]["name"];
					$ext = array_pop(explode(".",$name));
					$name = time(). rand(0,10000) . "." . $ext;
					move_uploaded_file($_FILES["file"]["tmp_name"],"img/" . $name);
					return $name;
				}
			}
		}
		else
		{
			echo "Invalid file";
		}
	}
?>