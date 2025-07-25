var express =require("express");
var cors =require("cors");
var bodyParser =require("body-parser");
var mysql =require("mysql");

var app = new express();
app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended:true
	})
);

const db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'mydb',
	port:'3306'
});

db.connect(function(err){
	if(err)
		console.log(err);
	else
		console.log("连接成功");
})

	//app.get()  这是输出数据 不需要也不能输入数据

	//member 表输出
	app.get('/member',function(request,response){
		var sql="select * from member WHERE type='0'";
		db.query(sql,function(err,results){
			console.log(results);
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})



	//inventory 表输出
	app.post('/inventory',function(request,response){
		var name=request.body.inventory_name;
		var sql="select * from inventory WHERE name='"+name+"'";
		db.query(sql,function(err,results){
			console.log(results);
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})
	
	//note 表输出
	app.post('/note',function(request,response){
		var name=request.body.note_name;
		var sql="select * from note WHERE name='"+name+"'";
		db.query(sql,function(err,results){
			console.log(results);
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})


	//登录输出管理员或普通用户（都不是则都不输出）
    app.post('/signin',function(request,response){
		var name=request.body.signin_yhm;
		var sql="select * from member where name ='"+name+"'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})
	
//新建清单 inventory
app.post('/add',function(request,response){
	var add_yhm=request.body.add_yhm;//获取用户名
	var add_input=request.body.add_input;//获取内容
	function timestampToTime(times) {//获取时间
		let time = times[1];let mdy = times[0];mdy = mdy.split('/');
		let month = parseInt(mdy[0]);let day = parseInt(mdy[1]);let year = parseInt(mdy[2]);
		return year + '-' + month + '-' + day + ' ' + time
	}
	let time = new Date();
	let nowTime = timestampToTime(time.toLocaleString('en-US',{hour12: false}).split(" "));
	//例打印结果为：2022-8-31 11:08:34
	var sql="INSERT INTO inventory VALUES ('"+add_yhm+"','"+add_input+"',0,'"+nowTime+"')";
	db.query(sql,function(err,results){
		if(err){
			response.send("{result:failed}");
		}else{
			response.send("{result:ok}");
		}
	})
})

//新建笔记 note
app.post('/add_note',function(request,response){
	var add_yhm=request.body.add_note_name;
	var add_input=request.body.add_note_input;
	var add__title=request.body.add_note_title;
	//获取时间
	function timestampToTime(times) {
		let time = times[1]
		let mdy = times[0]
		mdy = mdy.split('/')
		let month = parseInt(mdy[0]);
		let day = parseInt(mdy[1]);
		let year = parseInt(mdy[2])
		return year + '-' + month + '-' + day + ' ' + time;}
	let time = new Date()
	let nowTime = timestampToTime(time.toLocaleString('en-US',{hour12: false}).split(" "))
	//打印结果为：2022-8-31 11:08:34
	var sql="INSERT INTO note VALUES ('"+add_yhm+"','"+add__title+"','"+add_input+"','"+nowTime+"','')";
	db.query(sql,function(err,results){
		if(err){
			response.send("{result:failed}");
		}else{
			response.send("{result:ok}");
		}
	})
})

//删除笔记( 内容和名字  note)
app.post('/del_note',function(request,response){
	var name=request.body.del_note_name;//获取用户名
	var content=request.body.del_note_content;//获取内容
	var sql="DELETE FROM note WHERE name='"+name+"'and content='"+content+"';";
	db.query(sql,function(err,results){
		if(err){
			response.send("{result:failed}");
		}else{
			response.send("{result:ok}");
		}
	})
})


	
//新建用户 
app.post('/register',function(request,response){
		var register_yhm=request.body.register_yhm;
        var register_mm=request.body.register_mm;
		var sql="SELECT name FROM member;";
		db.query(sql,function(err,results){
			if(err){
				response.send("{result:failed}");
			}else{
				var data=JSON.parse(JSON.stringify(results)); 
				for (let n = 0; n < data.length ; n++) {
					//有一样的退出循环
					if (JSON.stringify(data[n].name)==JSON.stringify(register_yhm)) {
						var t=10;break;
				};};
				if (t!=10) {
					//没有一样，插入数据
					function timestampToTime(times) {
						let time = times[1]
						let mdy = times[0]
						mdy = mdy.split('/')
						let month = parseInt(mdy[0]);
						let day = parseInt(mdy[1]);
						let year = parseInt(mdy[2])
						return year + '-' + month + '-' + day + ' ' + time
					};
					let time = new Date();
					let nowTime = timestampToTime(time.toLocaleString('en-US',{hour12: false}).split(" "));
					//例打印结果为：2022-8-31 11:08:34
					sql="INSERT INTO member VALUES ('"+register_yhm+"','"+register_mm+"','0','"+nowTime+"','')";
					db.query(sql,function(err,results){
						if(err){
							response.send("{result:failed}");
						}else{
							response.send("{result:ok}");
						}
					})
				}else{
					response.send("000");// 000 表述有一样的名称
				}
            }
		})
})
	
//删除清单(用户和管理员统一端口 内容和名字  inventory)
app.post('/logout',function(request,response){
	var name=request.body.logout_name;//获取用户名
	var logout_content=request.body.logout_content;//获取内容
	var sql="DELETE FROM inventory WHERE name='"+name+"'and content='"+logout_content+"';";
	db.query(sql,function(err,results){
		if(err){
			response.send("{result:failed}");
		}else{
			response.send("{result:ok}");
		}
	})
})

//删除用户(用户和管理员统一端口  inventory，note，member中的用户)
app.post('/delmember',function(request,response){
	//获取名称
	var name=request.body.delmember_name;
	//删除用户表的名称
	var sql="DELETE FROM member WHERE name='"+name+"';";
	db.query(sql,function(err,results){
		if(err){
			response.send("{result:failed}");
		}else{
			//删除清单表的名称
			var sql="DELETE FROM inventory WHERE name='"+name+"';";
			db.query(sql,function(err,results){
			if(err){
				response.send("{result:failed}");
			}else{
				//删除笔记表的名称
				var sql="DELETE FROM note WHERE name='"+name+"';";
				db.query(sql,function(err,results){
				if(err){
					response.send("{result:failed}");
				}else{
					response.send("{result:ok}");
					}
				})
			}
			})
		}
	})
})



	// 模糊搜索获取inventory信息
	app.post('/search_inventory',function(request,response){
		var content=request.body.search_inventory_content;
		var name=request.body.search_inventory_name;
		console.log(content,name);
		var sql="select * from inventory where name='"+name+"' and content like '%"+content+"%'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})

	// 模糊搜索获取note信息
	app.post('/search_note',function(request,response){
		var name=request.body.search_note_name;
		var title=request.body.search_note_title;
		console.log(name,title);
		var sql="select * from note where name='"+name+"' and title like '%"+title+"%'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})

	// 模糊搜索获取member信息
	app.post('/search_member',function(request,response){
		var name=request.body.search_member_name;
		console.log(name);
		var sql="select * from member where name like '%"+name+"%'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				response.send(results);
			}
		})
	})



	//修改member,inventory,note表 名称
app.post('/changename',function(request,response){
		//获取旧名称和新名称
		var oldname=request.body.changename_oldname;
		var newname=request.body.changename_newname;
		//新名称是否已经存在
		var sql="select * from member where name ='"+newname+"'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				if (results=="") {
					//更改用户表名称
					sql="UPDATE member set name = '"+newname+"' where name = '"+oldname+"'";
					db.query(sql,function(err,results){
						if(err){
							console.log(err);
						}else{
							//更改笔记表中的名称
							sql="UPDATE note set name = '"+newname+"' where name = '"+oldname+"'";
							db.query(sql,function(err,results){
								if(err){
									console.log(err);
								}else{
									//更改清单表名称
									sql="UPDATE inventory set name = '"+newname+"' where name = '"+oldname+"'";
									db.query(sql,function(err,results){
										if(err){
											console.log(err);
										}else{
											console.log("清单已更改");
											response.send("{result:ok}");
										}
									})
								}
							})
						}
					})
				}else{
					console.log("被占用了");
					response.send("{result:failed}");
				}
			}
		})
})

	//修改member表 密码
	app.post('/changepass',function(request,response){
		//获取名称和新密码
		var name=request.body.changepass_name;
		var pass=request.body.changepass_newpass;
		//更改密码
		var sql="UPDATE member set password = '"+pass+"' where name = '"+name+"'";
		db.query(sql,function(err,results){
			if(err){
				console.log(err);
			}else{
				response.send("{result:ok}");
			}
		})
})


app.listen(3000,function(){
	console.log("服务器正常运行")
});