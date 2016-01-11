<?php
	require_once("model.php");
	$news = new news();
	$id = $_POST['id'];
	if($news->delete($id)){
		$data['status'] = 1;
		$data['msg'] =  "删除成功";
	}else{
		$data['status'] = 0;
		$data['msg'] = "删除失败";
	}
	echo json_encode($data);