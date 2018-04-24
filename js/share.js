var shares=null;
	// H5 plus事件处理
function plusReady(){
	updateSerivces();
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready', plusReady, false);
}
/**
 * 更新分享服务
 */
function updateSerivces(){
	plus.share.getServices(function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		mui.toast('获取分享服务列表失败：'+e.message);
	});
}
function shareAction(sb,bh) {
	if(!sb||!sb.s){
		mui.toast('无效的分享服务！');
		return;
	}
	var msg={content:sharecontent.value,extra:{scene:sb.x}};
	if(bh){
		msg.href=sharehref.value;
		if(sharehrefTitle&&sharehrefTitle.value!=''){
			msg.title=sharehrefTitle.value;
		}
		if(sharehrefDes&&sharehrefDes.value!=''){
			msg.content=sharehrefDes.value;
		}
		msg.thumbs=['_www/logo.png'];
		msg.pictures=['_www/logo.png'];
	}else{
		if(pic&&pic.realUrl){
			msg.pictures=[pic.realUrl];
		}
	}
	// 发送分享
	if(sb.s.authenticated){
		shareMessage(msg, sb.s);
	}else{
		mui.toast('---未授权---');
		sb.s.authorize(function(){
			shareMessage(msg,sb.s);
		}, function(e){
			mui.toast('认证授权失败：'+e.code+' - '+e.message);
		});
	}
}
function shareMessage(msg, s){
	s.send(msg, function(){
		mui.toast('分享到"'+s.description+'"成功！');
	}, function(e){
		mui.toast('分享到"'+s.description+'"失败: ');
	});
}
function shareSystemNativeJS() {
	if(plus.os.name!=='Android'){
		plus.nativeUI.alert('此平台暂不支持系统分享功能!');
		return;
	}
	var intent=new Intent(Intent.ACTION_SEND);
	if(pic&&pic.realUrl){
		var p = '';
		p = pic.realUrl;
		if(p.substr(0,7)==='file://'){
			p=p.substr(7);
		}else if(p.sub(0)!=='/'){
			p=plus.io.convertLocalFileSystemURL(p);
		}
	}
	var f = new File(p);
	var uri = Uri.fromFile(f);
	if(f.exists()&&f.isFile()){
		console.log('image/*');
		intent.setType('image/*');
		intent.putExtra(Intent.EXTRA_STREAM,uri);
	}else{
		console.log('text/plain');
		intent.setType('text/plain');
	}
	intent.putExtra(Intent.EXTRA_SUBJECT,'HelloH5');
	intent.putExtra(Intent.EXTRA_TEXT,sharecontent.value);
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent,'系统分享HelloH5'));
}
	// 打开分享
function shareShow(){
	var shareBts=[];
	// 更新分享列表
	var ss=shares['weixin'];
	if(navigator.userAgent.indexOf('qihoo')<0){  //在360流应用中微信不支持分享图片
		ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
		shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
	}
	ss=shares['sinaweibo'];
	ss&&shareBts.push({title:'新浪微博',s:ss});
	ss=shares['qq'];
	ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
	// 弹出分享列表
	shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts}, function(e){
		(e.index>0)&&shareAction(shareBts[e.index-1],false);
	}):plus.nativeUI.alert('当前环境无法支持分享操作!');
}
// 分析链接
function shareHref(){
	var shareBts=[];
	// 更新分享列表
	var ss=shares['weixin'];
	ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
	shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
	ss=shares['qq'];
	ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
	// 弹出分享列表
	shareBts.length>0?plus.nativeUI.actionSheet({title:'分享链接',cancel:'取消',buttons:shareBts},function(e){
		(e.index>0)&&shareAction(shareBts[e.index-1],true);
	}):plus.nativeUI.alert('当前环境无法支持分享链接操作!');
}