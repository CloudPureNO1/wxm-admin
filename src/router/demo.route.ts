const DemoRouter=[

    {
        path:'/demo',
        name:'Demo',
        meta:{title:'Menu.Demo.title',type:'node'},// 通过node 再面包屑中判断
        children:[
            {
                path:'/demo/tinymce',
                name:'Tinymce',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/richEditor/Tinymce.vue"),
                meta:{title:'Menu.Demo.children.Tinymce.title'}
            },
            {
                path:'/demo/imageCroppingMyself',
                name:'ImageCroppingMyself',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/img/ImageCroppingMyself.vue"),
                meta:{title:'Menu.Demo.children.ImageCroppingMyself.title'}
            },
            {
                path:'/demo/imageCropping',
                name:'ImageCropping',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/img/ImageCropping.vue"),
                meta:{title:'Menu.Demo.children.ImageCropping.title'}
            },
            {
                path:'/demo/qrcode',
                name:'QrCode',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/qrcode/QrCode.vue"),
                meta:{title:'Menu.Demo.children.QrCode.title'}
            },
            {
                path:'/demo/qrReader',
                name:'QrReader',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/qrcode/QrReader.vue"),
                meta:{title:'Menu.Demo.children.QrReader.title'}
            },
            {
                path:'/demo/jsonPretty',
                name:'JsonPretty',
                component:() => import ( /* webpackChunkName: "demo" */ "../views/demo/json/JsonPretty.vue"),
                meta:{title:'Menu.Demo.children.JsonPretty.title'}
            } 
        ]
    },
    
]

export default DemoRouter;