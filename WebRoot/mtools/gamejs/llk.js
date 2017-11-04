/**
 * 
 */
function makezb() {
	var obj = new Object();
	obj.x = 0;
	obj.y = 0;
	return obj;
}
var dyzb=makezb();
var dezb=makezb();
var path1=makezb();
var path2=makezb();
var slct = 0;
var qp = Array();
var pdsz = [0,0,0,0,0,0,0,0];
var hb=document.getElementById('hb');
var cxt=hb.getContext('2d');
function csh(){
	var a,l,sjs;
	slct = 0;
	for(a=0;a<10;a++){
		qp[a]=Array();
		for (l=0;l<10;l++)
			qp[a][l]=0;
	}
	for (a=1;a<9;a++){
		for (l=1;l<9;l++){
			do{
			sjs=Math.ceil(Math.random()*8);
			}while(pdsz[sjs-1]>=8);
			pdsz[sjs-1]++;
			qp[a][l]=sjs;
		}
	}
	hua();
}
function pdno(p,k){
	var i;
	if(p.y==k.y){
		if (p.x==k.x)
			return 0;
		var xiao=p.x<k.x?p.x:k.x;
		var da=p.x>k.x?p.x:k.x;
		for (i=xiao+1;i<da;i++)
			if (qp[i][p.y]!=0)
				return 0;
		return 1;
	}
	else if(p.x==k.x){
			var xiao=p.y<k.y?p.y:k.y;
			var da=p.y>k.y?p.y:k.y;
			for (i=xiao+1;i<da;i++)
				if (qp[p.x][i]!=0)
					return 0;
			return 1;
	}
	return 0;
}
function pdone(p,k){
	var c = makezb();
	c.x=p.x;c.y=k.y;
	if(qp[c.x][c.y]==0&&pdno(p,c)==1&&pdno(c,k)==1){
		path1.x=c.x;path1.y=c.y;
		return 1;
	}
	c.x=k.x;c.y=p.y;
	if(qp[c.x][c.y]==0&&pdno(p,c)==1&&pdno(c,k)==1){
		path1.x=c.x;path1.y=c.y;
		return 1;
	}
	return 0;
}
function pdtwo(p,k){
	var c=makezb();
	var i = 0;
	c.x = p.x;
 	for (i=p.y+1;i<10;i++){
		c.y = i;
		if (qp[c.x][c.y]==0&&pdone(c,k)==1){
		path2.x=c.x;
		path2.y=c.y;
		return 1;
		}
		else if(qp[c.x][c.y]!=0)
		break;	
	}
	for (i=p.y-1;i>=0;i--){
		c.y=i;
		if (qp[c.x][c.y]==0&&pdone(c,k)==1){
		path2.x=c.x;
		path2.y=c.y;
		return 1;
		}
		else if(qp[c.x][c.y]!=0)
		break;
	}
	c.y = p.y;
	for (i=p.x+1;i<10;i++){
		c.x=i;
		if (qp[c.x][c.y]==0&&pdone(c,k)==1){
		path2.x=c.x;
		path2.y=c.y;
		return 1;
		}
		else if(qp[c.x][c.y]!=0)
		break;	
	}
	for (i=p.x-1;i>=0;i--){
		c.x=i;
		if (qp[c.x][c.y]==0&&pdone(c,k)==1){
		path2.x=c.x;
		path2.y=c.y;
		return 1;
		}
		else if(qp[c.x][c.y]!=0)
		break;	
	}
	return 0;
}

	hb.onclick=function (e){
		cxt.clearRect(0,0,500,500);
		e=e||event;//获取事件对象
		var x1=e.clientX-hb.offsetLeft;
    	var y1=e.clientY-hb.offsetTop;
    	console.log(e.clientX+"-"+hb.offsetLeft+"=="+e.clientY+"-"+hb.offsetTop);
		if (qp[parseInt(x1/50)][parseInt(y1/50)]==0){
			slct=0;
			hua();
			return;
		}
		else if (slct==0){
				dyzb.x=parseInt(x1/50);
				dyzb.y=parseInt(y1/50);
				slct=1;
				hua();
		}
		else{
			slct = 0;
			dezb.x=parseInt(x1/50);
			dezb.y=parseInt(y1/50);
			if(pdno(dyzb,dezb)==1&&qp[dyzb.x][dyzb.y]==qp[dezb.x][dezb.y]){
				hua();
				hx(dyzb,dezb);
				setTimeout("hua()",200);
				ifwin();
				return;
			}
			else if(pdone(dyzb,dezb)==1&&qp[dyzb.x][dyzb.y]==qp[dezb.x][dezb.y]){
				hua();
				hx(dyzb,path1);
				hx(dezb,path1);
				setTimeout("hua()",200);
				ifwin();
				return;
			}
			else if(pdtwo(dyzb,dezb)==1&&qp[dyzb.x][dyzb.y]==qp[dezb.x][dezb.y]){
				hua();
				hx(dyzb,path2);
				hx(path2,path1);
				hx(path1,dezb);
				setTimeout("hua()",200);
				ifwin();
				return;
			}
			hua();
		}
		
	}
	function ifwin(){
		var i,j,sum;
		sum=0;
		for (i=1;i<9;i++)
			for (j=1;j<9;j++)
				sum+=qp[i][j];
		if (sum==0)
		{
			alert("你胜利了");	
		}
	}
	function hx(p,k){
		cxt.lineWidth=4;
		cxt.strokeStyle ="#FF6347";
		cxt.beginPath();  
		cxt.moveTo(50*(p.x+1)-25,50*(p.y+1)-25);
		cxt.lineTo(50*(k.x+1)-25,50*(k.y+1)-25);
		cxt.stroke();
		qp[dyzb.x][dyzb.y]=0;
		qp[dezb.x][dezb.y]=0;
	}
	function hua(){
		cxt.lineWidth=0.1; 
		cxt.strokeStyle = "white";
		var i,j;
		for (i=0;i<11;i++){
				 cxt.moveTo(0,i*50);
				 cxt.lineTo(500,i*50);
			 }
		for (i=0;i<11;i++){
				 cxt.moveTo(i*50,0);
				 cxt.lineTo(i*50,500);
			 }
		for (i=0;i<10;i++){
			for (j=0;j<10;j++){
				if (qp[i][j]!=0){
					switch(qp[i][j]){
						case 1:
						cxt.fillStyle = "red";
						break;
						case 2:
						cxt.fillStyle = "#ffbbba";
						break;
						case 3:
						cxt.fillStyle = "yellow";
						break;
						case 4:
						cxt.fillStyle = "blue";
						break;
						case 5:
						cxt.fillStyle = "gray";
						break;
						case 6:
						cxt.fillStyle = "#bafcba";
						break;
						case 7:
						cxt.fillStyle = "black";
						break;
						case 8:
						cxt.fillStyle = "#bbbccc";
						break;		
					}		
				}
				else
				cxt.fillStyle = "white";
				cxt.fillRect(i*50,j*50, 50, 50);
			}
		}
		cxt.stroke();
		cxt.lineWidth=6;   
		cxt.strokeStyle="lime";
		if (slct==0)
		return;
		cxt.strokeRect(dyzb.x*50,dyzb.y*50, 50, 50);	
	}