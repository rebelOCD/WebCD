package mtools;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import user.rUser;

public class ScoreController extends Controller {
	public void uploadtcsscore(){
		int score = getParaToInt("score",0);
		System.out.println(score);
		String msg = "";
		String sql = "SELECT * FROM mc_tcs_score oderb order by score desc LIMIT 10";
		List<Record> res = Db.find(sql);
		rUser nowuser = getSessionAttr("user");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		if (score==0||(res.size()>=10&&res.get(res.size()-1).getInt("score")>score)){
			msg = "no";
		}else{
			System.out.println(nowuser.get("cname"));
			sql = "INSERT INTO mc_tcs_score (ename,score,logtime) VALUES ('"+nowuser.getStr("ename")+"',"+score+",'"+df.format(new Date())+"')";
			Db.update(sql);
			msg = "ok";
		}
		renderJson("msg",msg);
			
			//Db.find(sql);
			//
		}
}
