var myApp=angular.module('myApp',[]);//定义模块,省略[]为获取模块；
myApp.controller("myCon",function($scope,$http,$interval){
	//点击箭头
	var jt=1;
	$scope.one=function($index){
		$(".product-type").eq($index).addClass("cur-type").siblings().removeClass("cur-type");
		if(jt==1){
			$('.wrapper').animate({'width':'0'},500,function(){
				$('.product-right').animate({'opacity':'1'},500);
			});
			$('#btn').addClass('jiantou-two').removeClass('jiantou').animate({'left':'169px'},500);
			jt=0;
		}else{
			$('.product-right').animate({'opacity':'0'},500,function(){
				$('.wrapper').animate({'width':'1000px'},500);
				$('#btn').addClass('jiantou').removeClass('jiantou-two').animate({'left':'966px'},500);
			});
			jt=1;
		}
	}
	//图片轮播
	var i=0,lis=$('#slider li'),len=lis.length,z=0;
	//console.log(len)
	$scope.auto=function(){
		i++;
		if(i>=len-1)i=len-1;
		lis.eq(i).animate({"opacity":"1","z-index":z+=1},300)
	}
	$scope.auto();
	setInterval($scope.auto,2000);
	//切换
	$scope.Tab=function(i){
		$(".product-type").eq(i).addClass("cur-type").siblings().removeClass("cur-type");
		$("#scroll").css({"top":0,"transition":"none"});
	}
	//方块
	$scope.marginTop=function(top){
		$("#scroll").css({"top":-top*600+'px',"transition":"1s"});
		$("#pageNo").find("span").eq(top).addClass("curp").siblings().removeClass("curp");
	}
	//渲染
	$http.get("../data.json")
   	 	.success(function(e) {
	    	$scope.data=e;
	    	$scope.tempArr = [];
	    	$scope.tempArr1 = [];
		   for(var i=0,len=Math.ceil($scope.data[0].products.length/7);i<len;i++){
		       $scope.tempArr[i] = [];
		       for(var j=0;j<7;j++){
		       		$scope.tempArr[i].push($scope.data[0].products[j+7*i]);
		       }
		    }
		    for(var i =0;i<$scope.tempArr.length;i++){
	    		for(var j = 0;j<$scope.tempArr[i].length;j++){
	    			if(!$scope.tempArr[i][j]){
	    				$scope.tempArr[i][j]={
	    					summary:"请您期待"
	    				}
	    			}
	    		}
	    	}

	    	for(var i=0,len=Math.ceil($scope.data[1].products.length/3);i<len;i++){
		       $scope.tempArr1[i] = [];
		       for(var j=0;j<3;j++){
		       		$scope.tempArr1[i].push($scope.data[1].products[j+3*i]);
		       }
		    }
		    for(var o = 0;o<$scope.tempArr1.length;o++){
	    		for(var p = 0;p<$scope.tempArr1[o].length;p++){
	    			if(!$scope.tempArr1[o][p]){
	    				$scope.tempArr1[o][p]={
	    					name:"请您期待"
	    				}
	    			}
	    		}
	    	}
  	  	}
  	);
	
	$interval(function(){
		var a=$scope.zindex++,
			lis=$("#slider").find("ul").find("li");
		if(a%2==0){
			lis.eq(0).css({"opacity":"0","transition":"1.5s"}).siblings().css({"opacity":"1","transition":"1.5s"});
		}else{
			lis.eq(1).css({"opacity":"0","transition":"1.5s"}).siblings().css({"opacity":"1","transition":"1.5s"});
		};
	},3000)
})