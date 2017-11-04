
			var c=document.getElementById("tcsmap");
			var ctx=c.getContext("2d");
			var gamestat = 0;
			var timer=null;
			
			//存放所有地图实体的数组
			var itmes = new Array();	
			//玩家数据
			var player=null;	
			//startgame();
			//player.reborn();
						//开始游戏
			function startgame (){
				if(gamestat==1){
					return;
				}
				itmes.splice(0,itmes.length)
				if (typeof(timer)){
					clearInterval(timer);
				}			
				ctx.clearRect(0,0,500,500);
				player = new snake();
				player.reborn();
				document.onkeydown= doKeyDown;
				gamestat = 1;
				createitmes(10,1);
				createitmes(2,2);
				player.reborn();
				drawmap();
					timer = setInterval(function(){    //开启定时器
					//clearlmap();		
					if (gamestat==0){
						return;
					}	
					$("#tcsscore").html(player.score);
					player.makemove(ctx);
					var st = ifcarshed();
					switch (st){
						case 0:
						case 1:
							clearInterval(timer); 
							endgame();
							return;
							break;
						case 2:
							delitme(player.bodys[0].x,player.bodys[0].y);
							player.growup();
							createitmes(1,2);
							break;
					}	
					canturn = true;
			    },200); 
//				/clearInterval(timer);    //清除定时器
			}
			
			
			//实体构造器
			function itme(x,y,type){
				this.x = x;
				this.y = y;
				this.type = type;
			}
			
			//蛇构造器
			function snake(){
				this.score = 0;
				this.bodys = new Array();
				this.dir = 2;
				this.canturn = false;
				this.reborn = function (){
					this.bodys = new Array();
					this.dir = 2;
					this.bodys.push(new itme(2,3,0));
					this.bodys.push(new itme(2,2,0));
					this.bodys.push(new itme(2,1,0));
				};
				this.growup = function (){
					this.score ++;
					this.bodys.push(new itme(this.bodys[this.bodys.length-1].x,this.bodys[this.bodys.length-1].y,0));
				}
				this.makemove = function(context){
					var add_x=0,add_y=0,i;
					switch (this.dir){
						case 1:
							add_y = -1;
							break;
						case 2:
							add_x = 1;
							break;
						case 3:
							add_y = 1;
							break;
						case 4:
							add_x = -1;
							break;
					}
					context.clearRect((this.bodys[this.bodys.length-1].x-1)*20,(this.bodys[this.bodys.length-1].y-1)*20,20,20);	
					ctx.moveTo((this.bodys[this.bodys.length-1].x-1)*20,(this.bodys[this.bodys.length-1].y-1)*20);
					ctx.lineTo((this.bodys[this.bodys.length-1].x-1)*20+20,(this.bodys[this.bodys.length-1].y-1)*20);
					ctx.stroke();

					for (i=this.bodys.length-1;i>0;i--){
						this.bodys[i].x = this.bodys[i-1].x;
						this.bodys[i].y = this.bodys[i-1].y;
					}		
					this.bodys[0].x += add_x;
					this.bodys[0].y += add_y;
					context.fillStyle = "green";			
					context.fillRect((this.bodys[0].x-1)*20,(this.bodys[0].y-1)*20,20,20);
					context.fillStyle = "#fff";			
					context.fillRect((this.bodys[1].x-1)*20,(this.bodys[1].y-1)*20,20,20);

				};
			}
								
			//随机生成实体
			function createitmes(num,type){
				var i,j,x,y,pass;
				if (itmes.length+player.bodys.length>623){
					return false;
				}	
				for (i=0;i<num;i++){				
					//防止生成的实体和原来的实体重叠	
					do{
						pass = true;
						x = Math.ceil(Math.random()*24+0.1);
						y = Math.ceil(Math.random()*24+0.1);
						for (j=0;j<itmes.length;j++){
							if (itmes[j].x==x&&itmes[j].y==y){
								pass = false;
								break;
							}
						}		
					}while(pass==false)
									
					switch (type){
						case 1:
							ctx.fillStyle = "#000";
							break;
						case 2:
							ctx.fillStyle = "blue";
							break;
						
					}
					itmes.push(new itme(x,y,type));
					ctx.fillRect((x-1)*20,(y-1)*20,20,20);
				}
				return true;	
			}

			//画出地图
			function drawmap(){			
				//画地图线
				var i,j;
				ctx.strokeStyle="#bbbbbb";
				for (i=1;i<=25;i++){
					ctx.moveTo(i*20,0);
					ctx.lineTo(i*20,500);
					ctx.stroke();
					
					ctx.moveTo(0,i*20);
					ctx.lineTo(500,i*20);
					ctx.stroke();
				}
							
				//画蛇
				ctx.fillStyle = "#bbbbbb";
				for (i=0;i<player.bodys.length;i++){
					ctx.fillRect((player.bodys[i].x-1)*20,(player.bodys[i].y-1)*20,20,20);
				}			
			}
					

			
			function endgame(){
				gamestat = 0;
				$("#tcsscore").html("0");
				//alert("啪，你死了别说话!!!");
				$("#myModalLabel").html("贪吃蛇");
				$("#modalmsg").html("啪,你死了别说话,最终得分：<span class='text-danger'>"+player.score+"</span>");
				$('#myModal').modal();
				uploadtcs(player.score);
				ctx.clearRect(0,0,500,500);
			}
			
			//删除一个实体
			function delitme(x,y){
				var i;
				for (i=0;i<itmes.length;i++){
					if (itmes[i].x==x&&itmes[i].y==y){
						itmes.splice(i, 1);
						return true;
					}
				}
				return false;
			}
				
			//判断碰撞
			function ifcarshed (){
				var i;
				for (i=0;i<itmes.length;i++){
					if (player.bodys[0].x==itmes[i].x&&player.bodys[0].y==itmes[i].y){
						return itmes[i].type;
					}
				}
				for (i=1;i<player.bodys.length;i++){
					if (player.bodys[0].x==player.bodys[i].x&&player.bodys[0].y==player.bodys[i].y){
						return player.bodys[i].type;
					}
				}
				if (player.bodys[0].x<1){
					player.bodys[0].x = 25;
				}else if (player.bodys[0].y<1){
					player.bodys[0].y = 25;
				}else if (player.bodys[0].x>25){
					player.bodys[0].x = 1;
				}else if (player.bodys[0].y>25){
					player.bodys[0].y = 1;
				}
				return -1;
			}	
			
			function doKeyDown(e){
				var tempdir = player.dir;
				if (!canturn){
					return;
				}
				switch (e.keyCode){
					case 38:
						player.dir = 1;	
						break;
					case 39:
						player.dir = 2;	
						break;
					case 40:
						player.dir = 3;	
						break;
					case 37:
						player.dir = 4;	
						break;
				}
				if (tempdir+player.dir==4||tempdir+player.dir==6){
					player.dir = tempdir;
				}
				canturn = false;
			}
			
			function sendfood(num){
				var i,j,x,y,pass;
				if (itmes.length+player.bodys.length>623){
					return false;
				}	
				for (i=0;i<num;i++){				
					//防止生成的墙壁和原来的实体重叠	
					do{
						pass = true;
						x = Math.ceil(Math.random()*24+0.1);
						y = Math.ceil(Math.random()*24+0.1);
						for (j=0;j<itmes.length;j++){
							if (itmes[j].x==x&&itmes[j].y==y){
								pass = false;
								break;
							}
						}		
					}while(pass==false)
					itmes.push(new itme(x,y,2));
				}
				return true;
			}
			
			function uploadtcs(score){
				
	              $.ajax({  
	                    type : "POST",
	                    url : "/Mtools/submitscore/uploadtcsscore",
	                    data : {  
	                        "score" : score
	                    },
	                    success : function(msg) {
	                    	//alert(msg);
	                    }  
	                });  
			}
			
			