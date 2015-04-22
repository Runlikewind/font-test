/*
*基于jquery的城市选择插件
*author：youziclub
*2015-4-22
*/
;(function($){
	$.fn.city=function(options){
		// 城市信息
		var nav=['热门','A-G','H-L','M-T','W-Z','其他'];
		var cityName=["上海,北京,广州,昆明,西安,成都,深圳,厦门,乌鲁木齐,南京,重庆,杭州,大连,长沙,海口,哈尔滨,青岛,沈阳,三亚,济南,武汉,郑州,贵阳,南宁,福州,天津,长春,石家庄,太原,兰州",
		"安庆,阿勒泰,安康,鞍山,安顺,安阳,阿克苏,包头,蚌埠,北海,北京,百色,保山,博乐,长治,长春,长海,常州,昌都,朝阳,潮州,常德,长白山,成都,重庆,长沙,赤峰,大同,大连,达县,大足,东营,大庆,丹东,大理,敦煌,鄂尔多斯,恩施,二连浩特,佛山,福州,阜阳,富蕴,贵阳,桂林,广州,广元,赣州,格尔木,广汉,固原",
		"呼和浩特,哈密,黑河,海拉尔,哈尔滨,海口,衡阳,黄山,杭州,邯郸,合肥,黄龙,汉中,和田,惠州,吉安,吉林,酒泉,鸡西,晋江,锦州,景德镇,嘉峪关,井冈山,济宁,九江,佳木斯,济南,喀什,昆明,康定,克拉玛依,库尔勒,喀纳斯,库车,兰州,洛阳,丽江,梁平,荔波,庐山,林芝,柳州,泸州,连云港,黎平,连城,拉萨,临沧,临沂",
		"牡丹江,芒市,满洲里,绵阳,梅县,漠河,南京,南充,南宁,南阳,南通,那拉提,南昌,宁波,攀枝花,衢州,秦皇岛,庆阳,且末,齐齐哈尔,青岛,汕头,深圳,石家庄,三亚,沈阳,上海,思茅,鄯善,韶关,沙市,苏州,唐山,铜仁,通化,塔城,腾冲,台州,天水,天津,通辽,太原,吐鲁番",
		"威海,武汉,梧州,文山,无锡,潍坊,武夷山,乌兰浩特,温州,乌鲁木齐,芜湖,万州,乌海,兴义,西昌,厦门,香格里拉,西安,襄阳,西宁,锡林浩特,西双版纳,徐州,兴城,兴宁,邢台,义乌,永州,榆林,延安,运城,烟台,银川,宜昌,宜宾,盐城,延吉,玉树,伊宁,伊春,珠海,昭通,张家界,舟山,郑州,中卫,芷江,湛江,中甸,遵义",
		"香港,澳门,台湾"];	

		var getCityName = function(arr,index){
			var cityList = arr[index].split(',');
			for(var i=0,len=cityList.length; i<len; i++){
				$($(".city-catogory")[index]).append($('<a></a>',{"href" : "javascript: void(0);", "class" : "city-name", "title" : cityList[i], "text" : cityList[i]}));
			}
		};
		
		// 是否支持input输入
		if(options.inputDisabled){
			$(options.inputText).attr("readonly" , "readonly");
		}
		// dom节点操作
		this.append($("<div></div>",{"class" : "city-choose","style" : "display: none;"}));
		$(".city-choose").append($("<ul></ul>",{"class" : "nav-ul clearfix"}));
		$(".city-choose").append($("<ul></ul>",{"class" : "cato-ul"}));	
		for(var i=0,len=nav.length; i<len; i++){
			$(".nav-ul").append($("<li></li>",{"class" : "city-nav", "text" : nav[i]}));
			$(".cato-ul").append($("<li></li>",{"class" : "city-catogory"}));
			$(".city-catogory").css('display','none');
		}
		
		$($(".city-catogory")[0]).css("display" , "block");//当点击文本框时显示热门城市名称列表
		var cityChoose = $($(".city-choose")[0]);//定义变量cityChoose和cityNav
		var cityNav=$(".city-nav");
		// 点击文本输入框显示选择器
		options.inputText.bind("focus",function(){ cityChoose.css("display","block");});
		// 为选定标签设定样式
		$(cityNav[0]).addClass("current");
		
		for(var i=0,len=cityNav.length; i<len; i++){
			cityNav[i].index = i;//或采用闭包的方式
			getCityName(cityName,i);//调用getCityName方法插入城市名称

			$(cityNav[i]).bind("click",function(){
				cityNav.removeClass("current");
				$(cityNav[this.index]).addClass("current");
				$(".city-catogory").css("display", "none")
				$($(".city-catogory")[this.index]).css("display", "block");
			});
		}
		// 获取具体城市的a元素并绑定相应方法
		var cityList = $(".city-name");
		for(var i=0,len=cityList.length; i<len; i++){
			cityList[i].index = i;
			$(cityList[i]).bind("click",function(){
				$(options.inputText).val($(cityList[this.index]).text());
				cityChoose.css("display","none");
			});
		}
		// 点击除选择器外的其他地方选择器隐藏（该处写的很糟糕，期待后面能想到更好的方式实现）
		$(document.body).bind("click",function(e){
			var events = e||window.event;
			var targets = events.srcElement || events.target;
			var targetClass = targets.className;
			if(!((targets.id == "city-input")||(targetClass == "nav-ul clearfix"||targetClass == "city-nav current"||targetClass == "city-choose"||targetClass == "cato-ul"||targetClass == "city-catogory"))){
				cityChoose.css("display","none");
			}
		});

	};

})(jQuery);