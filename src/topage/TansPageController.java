package topage;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import user.rUser;

public class TansPageController extends Controller {
	
	
	  public void checkexist() {
		  if (rUser.dao.findbyname(getPara("loginName")).size()>0){
			  renderJson("valid",false);
		  }else{
			  renderJson("valid",true);
		  }
	  }
	
	//开始注册
	public void tryregister(){
		String cname = getPara("name","");
		String ename = getPara("loginName","");
		String password = getPara("password","");
		String sql="";
		
		
		if (cname==""||ename==""||password==""){
			render("/mtools/register.html");
		}else if(rUser.dao.findbyname(ename).size()>=1){
			renderHtml("<h3 class=\"text-center\">注册失败!!</h3>2秒后返回登录界面...<script>setTimeout(\"window.location.href='/Mtools/torigister'\",2000);</script>");
		}else{
			sql = "INSERT INTO mc_tools_user (ename,cname,password,sex) VALUES ('"+ename+"','"+cname+"','"+password+"','男')";
			Db.update(sql);
			renderHtml("<h3 class=\"text-center\">注册成功!!</h3>3秒后返回登录界面...<script>setTimeout(\"window.location.href='/Mtools/tomain'\",3000);</script>");
		}
	}
	
	//切换到注册界面
	public void torigister(){
		render("/mtools/register.html");
	}
	
	//登录判断
	public void trylogin() {
		String name = getPara("username");
		String pwd = getPara("password");
		List<rUser> users = JudgeTools.findUser(name, pwd);
		
		String msg = users.size()>0?"ok":"error";
		if (msg=="ok"){
			System.out.println(users.get(0));
			setSessionAttr("user",users.get(0));
		}else{
			render("/mtools/login.html");
			return;
		}
		renderHtml("<script>window.location.href='/Mtools/tomain';</script>");
	}
	
	
	//切换到主界面
	public void tomain() {
		rUser nowuser = getSessionAttr("user");
		if (null == nowuser){
			render("/mtools/login.html");
			return;
		}
		
		
		String sql = "SELECT * from mc_tools_menu WHERE pow<="+nowuser.getInt("pow");
		
		//setAttr("tcsgame",Db.find(sql));
		//setAttr("msgs",Db.find(sql));
		setAttr("user",getSessionAttr("user"));
		setAttr("menu",Db.find(sql));
		System.out.println(Db.find(sql));
		render("/mtools/mainpage.html");
	}
	
	//切换到登录界面
	public void index() {
		removeSessionAttr("user"); 
		render("/mtools/login.html");
	}
}
