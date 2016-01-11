<?php
	require_once("model.php");
	$type = $_GET['type'];
	$first = $_GET['first']?$_GET['first']:0;
	$news = new news();
	echo $news->select("news",$first);