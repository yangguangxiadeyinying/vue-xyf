var Home=Vue.component("home",{
    template:`
    <div class="home">
        <Nav ></Nav>
        <div style="padding-top: 44px;">这是首页</div>
    </div>
    `
})
var Nav=Vue.component("Nav",{
    template:`
      <ul class="nav">
         <router-link  v-for="(item,key) in navData" :to="item.url" :key="key" tag="li" exact>{{item.title}}</router-link>
         <router-link to="/login" v-if="!islogin">登陆</router-link>
          <span v-if="islogin" class="info" @click="show">
                 {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
      </ul>
    `,
    data(){
        return {
            navData:[
                {title:"首页",url:"/"},
                {title:"公司简介",url:"/info"},
                {title:"文档说明",url:"/doc"},
                ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})


var Info=Vue.component("info",{
    template:`
        <div>
           <Nav></Nav>
           <transition>
                <router-view >
                 
                 </router-view>
          </transition>
        </div>
    `
})

var list=Vue.component("list",{
    template:`
          <ul class="mui-table-view" style="margin-top: 44px;">
	    <li class="mui-table-view-cell mui-media">
            <router-link to="/info/list/1" tag="a">
                    <img class="mui-media-object mui-pull-right" src="">
                    <div class="mui-media-body">
                        幸福
                        <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                    </div>
             </router-link>
	    </li>
	    <li class="mui-table-view-cell mui-media">
	        <router-link to="/info/list/2" tag="a">
	            <img class="mui-media-object mui-pull-right" src="">
	            <div class="mui-media-body">
	                木屋
	                <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
	            </div>
	        </router-link>
	    </li>
	    <li class="mui-table-view-cell mui-media">
	        <router-link to="/info/list/3" tag="a">
	            <img class="mui-media-object mui-pull-right" src="">
	            <div class="mui-media-body">
	                CBD
	                <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
	            </div>
	        </router-link>
	    </li>
	</ul>
             `
})


var con=Vue.component("con",{
    template:`
    <div style="padding-top: 44px;position: absolute;left: 0;top: 0;">
        {{$route.params.id}}
        <p>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
        <p>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
        <p>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
    </div>
    `
})




var Doc=Vue.component("doc",{
    template:`
       <div class="home">
           <Nav></Nav>
           <div style="width: 100vw;height: 100vh;padding-top: 44px;">
               <router-view class="left"  name="left"> </router-view>
               <router-view class="right" name="right"> </router-view>
           </div>
       </div>
    `,
    beforeRouteEnter(to,from,next){
        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
})
var left=Vue.component("left",{
    template:`
      <ul>
          <router-link to="#one" tag="li" class="aaa">one</router-link>
          <router-link to="#two" tag="li" class="aaa">two</router-link>
          <router-link to="#three" tag="li" class="aaa">three</router-link>
      </ul>    
      `,
    watch:{
        $route() {
            var hash = this.$route.hash.slice(1);
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate);
                }
            }
            new TWEEN.Tween({num: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({num: (document.querySelector("#"+ hash).offsetTop)-44}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.num.toFixed(0);
                })
                .start()
            animate()
        }
    }
})
var right=Vue.component("right",{
    template:`
    <div style="padding-top: 44px">
          <h1 id="one" style="height: 400px">one</h1>
          <h1 id="two" style="height: 400px">two</h1>
          <h1 id="three" style="height: 400px">three</h1>
    </div>
      
      `
})


var Login=Vue.component("Login",{
    template:`
    <div>
      <header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div> 
    </div>
    `,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc");
        }
    }
})