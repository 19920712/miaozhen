var gulp=require("gulp");//引入gulp
var webserver=require("gulp-webserver");//引入webserver服务
var uglify=require("gulp-uglify");
//启动服务
gulp.task("webserver",function(){
	gulp.src("./")
	.pipe(webserver({
		host:"localhost",
		port:80,
		livereload:true,//自动刷新
		directoryListing:{
			enable:true,
			path:"./"
		}
	}))
})
//复制文件
gulp.task('copy-index',function(){
	gulp.src('./index.html')
	.pipe(gulp.dest('./app'));
	gulp.src("./css/**/*.css")
	.pipe(gulp.dest('./app/css'));
	gulp.src('./js/**/*.js')
	.pipe(gulp.dest('./app/js'));
	gulp.src('./data.json')
	.pipe(gulp.dest('./app'))
})

//监测文件
gulp.task("watch",function(){
	gulp.watch('./index.html',['copy-index'])
})
gulp.task('default',["copy-index",'watch','webserver'])