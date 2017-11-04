/**
 * 
 */
function trylogin(){
	var username = $("#username").val();
	var password = $("#password").val();
	var msg = "";
	if (username.length<3||password.length<6){
		msg = "帐号或密码错误!!!";
		return;
	}else{
	    $.ajax({  
	        type : "POST",  
	        url : "trylogin",//路径  
	        data : {  
	            "username" : username,
	            "userpwd" : password
	        },
	        success : function(data) {
	        	var st = data.msg;
	        	if (st!="ok"){
	        		alert("帐号或密码错误!!!");
	        	}else{
	        		window.location.href='/Mtools/tomain';
	        	}
	        }  
	    });  
	}
}