package user;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

public class rUser extends Model<rUser> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5762063329930841408L;
	public static rUser dao =new rUser();
	public List<rUser> findbynamepwd(String name,String pwd){
		return this.find("select * from v_mc_roles where ename='"+name+"' AND password='"+pwd+"'") ;
	}
	public List<rUser> findbyname(String name){
		return this.find("select * from v_mc_roles where ename='"+name+"'");
	}
}
