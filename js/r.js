var router=new VueRouter({
    linkActiveClass:"active",
    routes:[
        {path:"/",component:Home},
        {path:"/info",component:Info,
            children:[
                {path:"",component:list},
                {path:"list/:id",component:con}
            ]

        },
        {path:"/doc",component:Doc,
             children:[
                 {path:"",components:{left:left,right:right}},
             ]
        },
        {path:"/login",component:Login}
    ]
})