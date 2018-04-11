document.addEventListener("plusready", onPlusReady, false); 
function onPlusReady(){
	var footer=document.querySelector("footer");
	if(footer){
		//创建footer菜单追加到页尾
		var nav='<div class="flex just-around footer_menu">'
	    	+'<div id="index1"><img src="../../image/bt1.png"/></div>'
	        +'<div id="index2"><img src="../../image/bt2.png"/></div>'
	        +'<div id="index3"><img src="../../image/bt3.png"/></div>'
	    	+'<div id="index4"><img src="../../image/bt4.png"/></div>'
	    +'</div>';
		footer.innerHTML=nav;
		if(footer.id=="2"){
			document.getElementById("index2").innerHTML='<img src="../../image/bt2_2.png"/>';
		}else if(footer.id=="3"){
			document.getElementById("index3").innerHTML='<img src="../../image/bt3_3.png"/>';
		}else if(footer.id=="4"){
			document.getElementById("index4").innerHTML='<img src="../../image/bt4_4.png"/>';
		}else{
			document.getElementById("index1").innerHTML='<img src="../../image/bt1_1.png"/>';
		}
	}
	mui("div").on("tap",".footer_menu>div",function(e){
		e.stopPropagation();
		if(this.id=="index4"){
			open("../../page/my/zh.html",this.id)
		}else if(this.id=="index1"){
			open("../../page/home/index.html",this.id)
		}else if(this.id=="index2"){
			open("../../page/find/find.html",this.id)
		}else if(this.id=="index3"){
			open("../../page/friends/friends.html",this.id)
		}
		
	})
	mui("body,div").on("tap",".open",function(e){
		e.stopPropagation();
		var ur=this.getAttribute("data-url");
		var id=this.getAttribute("data-id");
		plus.webview.create(ur,id).show('slide-in-right', 200)
	})
	function open(myurl,id){
		mui.openWindow({
		    url:myurl,
		    id:id,
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:"none",//页面显示动画，默认为”slide-in-right“；
		    },
		})
	}
	mui("body").on("tap",".play",function(e){
		e.stopPropagation();
		if(localStorage.isOpen=="true"){
			w=plus.webview.show("play");
		}else{
			localStorage.isOpen="true";
			w=plus.webview.create("../../page/paly/paly.html","play");
			w.show('slide-in-bottom', 200);
		}
		
	})
	//初始化
	mui.init({
  		statusBarBackground: '#FF6E6E',
  		swipeBack:true 
  	});
	mui('.mui-scroll-wrapper').scroll({
		deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
	});
	document.addEventListener("splashclosed", onSplashClosed, false);
	function onSplashClosed(){
		localStorage.isOpen="false";
	}
}