const QuartzRouter=[

    {
        path:'/quartz',
        name:'Quartz',
        meta:{title:'Menu.Quartz.title',type:'node'},// 通过node 再面包屑中判断
        children:[
            {
                path:'/quartz/dataXIndex',
                name:'DataXIndex',
                component:() => import ( /* webpackChunkName: "quartz" */ "../views/quartz/datax/DataXIndex.vue"),
                meta:{title:'Menu.Quartz.children.DataXIndex.title'}
            },
            {
                path:'/quartz/OrdinaryJobIndex',
                name:'OrdinaryJobIndex',
                component:() => import ( /* webpackChunkName: "quartz" */ "../views/quartz/ordinary/OrdinaryJobIndex.vue"),
                meta:{title:'Menu.Quartz.children.OrdinaryJobIndex.title'}
            }
        ]
    },
]

export default QuartzRouter;