package topage;

import java.util.List;

import user.rUser;

public class JudgeTools {

	public static List<rUser> findUser(String username,String password){
		return rUser.dao.findbynamepwd(username, password);
	}
}
