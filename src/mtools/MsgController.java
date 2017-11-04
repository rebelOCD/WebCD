package mtools;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.jfinal.core.Controller;

import msg.LeaveMsg;
import user.rUser;

public class MsgController extends Controller {
	public void uploadmsg(){
		String title = getPara("title","无标题");
		String text = getPara("text","无内容");
		//User nowuser = getSessionAttr("user");
		rUser nowuser = getSessionAttr("user");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(text);
		
		LeaveMsg NewMsg = new LeaveMsg();
		
		NewMsg
		.set("text", text)
		.set("title", title)
		.set("uid", nowuser.getLong("id"))
		.set("logtime",df.format(new Date()));
		NewMsg.save();
		
		renderJson ("msg","ok");
	}
}
