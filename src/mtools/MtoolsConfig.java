package mtools;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.template.Engine;

import msg.LeaveMsg;
import relativepg.RelativePagesController;
import siglepg.SinglePagesController;
import topage.TansPageController;
import user.rUser;

public class MtoolsConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		// TODO Auto-generated method stub
		me.setDevMode(true);
	}

	@Override
	public void configEngine(Engine arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void configHandler(Handlers arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void configInterceptor(Interceptors arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void configPlugin(Plugins me) {
       C3p0Plugin c3p0Plugin = new C3p0Plugin("jdbc:mysql://39.108.78.21:3306/mc_pro",
        									   "MaoMao",
        									   "9069309848");
        
      ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
      arp.setShowSql(true);
      arp.addMapping("v_mc_roles", rUser.class);
      arp.addMapping("mc_leavemsg", LeaveMsg.class);
     
      me.add(c3p0Plugin);
      me.add(arp);

	}

	@Override
	public void configRoute(Routes me) {
		me.add("/", TansPageController.class);
		me.add("/submitscore", ScoreController.class);
		me.add("/submitmsg",MsgController.class);
		me.add("/siglepg",SinglePagesController.class);
		me.add("/relative",RelativePagesController.class);
		
	}
	
	public static void main(String[] args) {
		JFinal.start("WebRoot",81,"/");
	}

}
