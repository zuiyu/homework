var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

//连接数据库
function conn() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'baidu'
    });
    return connection;
}

//默认进入百度新闻页
router.get('/',function(req, res, next){
	res.render("index");
});

router.get('/index*', function(req, res, next){
	res.render("index");
});

//获取新闻
router.get('/news', function(req, res, next){
	var first = req.query.first;
	var con = conn();
    con.connect();
    con.query('SELECT * from news limit '+first+',10',function(err, rows) {
    	if(err){
    		return con.rollback(function() {
          		throw err;
        	});
    	}
    	res.json(rows);
    });
    con.end();
});

//登录页
router.get('/admin/login', function(req, res, next){
	res.render('login');
});

//处理登录
router.post('/admin/account', function(req, res, next){
	var name = req.body.name;
	var password = req.body.password;
	var con = conn();
	con.query('select count(*) as count from user where name=? and password=?',[name,password],function(err,rows){
		var data = {};
		if(rows[0].count==1){
			data.status = 1;
			data.msg = "登录成功";
        	req.session.name = name;
		}else{
			data.status = 0;
			data.msg = "登录失败";
		}
		res.json(data);
	});
	con.end();
});

//后台管理主页
router.get('/admin/manage', function(req, res, next){
	if(!req.session.name){
		res.redirect('/admin/login');
	}else{
		var con = conn();
		con.query("select * from news order by id desc",function(err,rows){
			//console.trace(rows[0]);
			//请问老师在这里怎样将rows传到外部，本来想封装方法但是传参试了好几种方法都失败了，只能降低复用性，来实现效果。
			res.render('manage',{rows:rows});
		});
	}
});

//删除操作
router.post('/admin/del', function(req, res, next){
	var id = req.body.id;
	//console.log(id);
	var con = conn();
	con.query("delete from news where id ="+id,function(err,rows){
		var data = {};
		if(rows.affectedRows&&rows.affectedRows>0){
			data.status = 1;
			data.msg = "删除成功";
		}else{
			data.status = 0;
			data.msg = "删除失败";
		}
		res.json(data);
	});
	con.end();
});

//添加页面
router.get('/admin/add', function(req, res, next) {
	if(!req.session.name){
		res.redirect("/admin/login");
		return;
	}
    res.render('add');
});

//添加操作
/*router.post('/admin/addnews',function(req, res, next){
	console.log(req);
	var title = req.body.title;
	var content = req.body.content;
	var nowDate = new Date();
	var time = nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString();
	var con = conn();
	console.log(req.body);*/
	/*con.query("insert into news set title=?,content=?,time=?,img=?",[title,content,time,img],function(err, rows){
		console.log(rows);
	});*/
	/*con.end();
});*/
//添加新闻
router.post('/admin/addnews', function(req, res, next){
   //生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({uploadDir: './public/files/'});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var title = fields.title;
		var content = fields.content;
		var nowDate = new Date();
		//下面这句话在我的电脑上运行完全正常，不知道为什么在老师电脑上不行
		//var time = nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString();
		var time = nowDate.getFullYear()+"-"+nowDate.getMonth()+"-"+nowDate.getDate()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds();
		console.log(time);
		var filesTmp = JSON.stringify(files,null,2);
	  	var name = false;
		if(err){
			console.log('parse error: ' + err);
		} else {
			console.log(files);
			var inputFile = files.file[0];
			console.log(inputFile.path);
			var uploadedPath = inputFile.path;
			var name = nowDate.getTime();
			var ext = uploadedPath.split(".").pop();
			img = name = name + "." +ext;
			var dstPath = './public/images/' + name;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
			  if(err){
			    console.log('rename error: ' + err);
			  } else {
			    console.log('rename ok');
			  }
			});
		}
		var con = conn();
		con.query("insert into news set title=?,content=?,time=?,img=?",[title,content,time,img],function(err, rows){
			var data = {};
			if(rows.affectedRows>0){
				data.status = 1;
				data.msg = "添加成功";
			}else{
				data.status = 1;
				data.msg = "添加成功";
			}
			res.json(data);
		});
		con.end();
	});
  });

//编辑新闻页面
router.get('/admin/edit', function(req, res, next) {
	if(!req.session.name){
		res.redirect("/admin/login");
		return;
	}
	var id = req.query.id;
	var con = conn();
	con.query("select * from news where id ="+id,function(err, rows){
		if(err){
			console.log(err);
		}else{
			var data = rows[0];
    		res.render('edit',{data:data});
		}
	});
});

//保存更新数据
router.post('/admin/editnews', function(req, res, next){
   //生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({uploadDir: './public/files/'});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		//从表单中获取属性
		var id = fields.id;
		var title = fields.title;
		var content = fields.content;
		var nowDate = new Date();
		var time = nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString();
		var filesTmp = JSON.stringify(files,null,2);
	  	var name = false;
	  	var img = false;;
	  	//上传图片
		if(err||!files.file){
			console.log('无文件');
			//console.log('parse error: ' + err);
		} else {
			console.log(files);
			var inputFile = files.file[0];
			console.log(inputFile.path);
			var uploadedPath = inputFile.path;
			var name = nowDate.getTime();
			var ext = uploadedPath.split(".").pop();
			img = name = name + "." +ext;
			var dstPath = './public/images/' + name;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
			  if(err){
			    console.log('rename error: ' + err);
			  } else {
			    console.log('rename ok');
			  }
			});
		}
		var con = conn();
		var news = {};
		//设置属性
		news.title = title;
		news.content = content;
		if(img){
			news.img = img;
		}
		//执行sql
		con.query("update news set ? where id = ?",[news,id],function(err, rows){
			var data = {};
			if(rows&&rows.affectedRows>0){
				data.status = 1;
				data.msg = "修改成功";
			}else{
				data.status = 1;
				data.msg = "修改失败";
			}
			res.json(data);
		});
		con.end();
	});
  });

//登出
router.get('/admin/logout', function(req, res, next){
	req.session.name = null;
	res.redirect("/admin/login");
});

module.exports = router;
