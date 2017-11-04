package siglepg;

import com.jfinal.core.Controller;

public class SinglePagesController extends Controller {
	
	public void tonqueen(){
		render("/mtools/pages/tools/nqueen.html");
	}
	
	public void totcs (){
		render("/mtools/pages/games/tcs.html");
	}
	
	public void tollk (){
		render("/mtools/pages/games/llk.html");
	}
	
	public void tocalac (){
		render("/mtools/pages/tools/calac.html");
	}
	
	public void topow (){
		render("/mtools/pages/tools/pow.html");
	}
	
	public void toourworld (){
		render("/mtools/pages/ourworld/ourworld.html");
	}
	
	public void toabout (){
		render("/mtools/pages/about/about.html");
	}
}
