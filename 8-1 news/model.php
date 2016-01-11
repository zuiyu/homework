<?php
/*
	2015-11-29 15:29:35 Sunday
*/
class news{
		public $con;
		public function __construct(){
			$this->con = mysql_connect("localhost","root","123456");
			mysql_select_db("baidu");
			mysql_set_charset("utf8");
		}

		public function select($name,$first){
			$query = mysql_query("select * from news limit $first,10",$this->con);
			$res = [];
			for($n=1;$n<=10;$n++){
				$result=mysql_fetch_object($query);
			  	array_push($res, $result);
			}
			return json_encode($res);
		}

		public function selectAll(){
			$query = mysql_query("select * from news order by id desc",$this->con);
			$res = [];
			while($result=mysql_fetch_object($query)){
			  	array_push($res, $result);
			}
			return $res;
		}

		public function find(){
			$query = mysql_query("select * from news limit 0,2",$this->con);
			return mysql_fetch_object($query);
		}

		public function add($title,$content,$img){
			if(mysql_query("insert into news(title,content,img) values ('$title','$content','$img')")){
				return true;
			}
			return false;
		}

		public function delete($id){
			if(mysql_query("delete from news where id = $id"))
			{
				return true;
			}
			return false;
		}

	}

