package relativepg;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;

import user.rUser;

public class RelativePagesController extends Controller {
	
	public void tocheckuser(){
		rUser nowuser = getSessionAttr("user");
		if (nowuser==null||nowuser.getInt("pow")<100){
			renderHtml("出错了！！只能管理员才能查看");
			return;
		}
		String sql = "select * from v_mc_roles";
		setAttr("userlist",Db.find(sql));
		render("/mtools/pages/adminaction/cheackuser.html");
	}
	
	public void tomsg(){
		rUser nowuser = getSessionAttr("user");
		String sql="select * FROM v_mc_leavemsg ORDER BY logtime desc";
		if (nowuser==null){
			renderHtml("出错了！！请重新登录");
			return;
		}
		setAttr("msgs",Db.find(sql));
		render("/mtools/pages/leavemsg/msg.html");
	}
	
	public void toperson(){
		rUser nowuser = getSessionAttr("user");
		String sql = "SELECT * FROM v_mc_tcs_score oderb order by score desc LIMIT 10";
		if (nowuser==null){
			renderHtml("出错了！！请重新登录");
			return;
		}
		setAttr("user",nowuser);
		setAttr("tcsgame",Db.find(sql));
		render("/mtools/pages/person/person.html");
	}
}
