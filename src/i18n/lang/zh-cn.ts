const zhCn: any = {
    SYSTEM_NAME: '浙大网新软件产业集团有限公司',
    Home: {
        name: '首页',
        personalCenter: '个人中心',
        exit: '退出',
        topAndBottomLayout: '上下布局',
        leftAndRightLayout: '左右布局',
        showTags: '标签显示/隐藏',
        sizeLarge: '大',
        sizeDefault: '默认',
        sizeSmall: '小',
        Layout: {
            topAndBottom: '上-下 布局',
            TopAndLeftAndRight: '上-左-右 布局',
            LeftAndRight: '左-右 布局'
        },
        I18n: {
            zhCn: '中文',
            en: '英文'
        },
        MenuColor: {
            'default': '默认',
            '2c3e50': '黑色',
            '409eff': '蓝色'
        },
    },

    Menu: {
        Demo:{
            title:'Demo',
            children:{
                Tinymce:{
                    title:'富文本（Tinymce）'
                },
                ImageCroppingMyself:{
                    title:'图片裁剪（自己实现）'
                },
                ImageCropping:{
                    title:'图片裁剪'
                },
                QrCode:{
                    title:'二维码生成'
                },
                QrReader:{
                    title:'二维码识别'
                },
                JsonPretty:{
                    title:'JSON美化'
                } 
            }
        },
        Quartz:{
            title:'定时任务管理',
            children:{
                DataXIndex:{
                    title:'数据同步定时任务管理'
                },
                OrdinaryJobIndex:{
                    title:'普通定时任务管理'
                }
            }
        },
        Rbac: {
            title: '系统管理',
            children: {
                UserIndex: {
                    title: '用户管理'
                },
                GroupIndex: {
                    title: '用户组管理'
                },

                RoleIndex: {
                    title: '角色管理'
                },
                ResourceIndex: {
                    title: '资源管理'
                },
                PermissionIndex: {
                    title: '权限管理'
                },
                ApiIndex: {
                    title: '接口管理'
                },
                DictionaryIndex: {
                    title: '字典管理'
                },
            }
        },
 
        BriefIntroduction: {
            title: '简介'
        },
        NotFound: {
            title: '页面丢失'
        }
    },
    Rbac: {
        Resource:{
            selectResourceFirst: '请先选择左侧资源',
            confirmDeleteResource: '次操作将永久删除资源，是否继续?',
            addLv1Resource: '添加一级资源',
            addChildResource: '添加子资源',
            parentName:'父资源名称',
            parentId:'父资源ID',
            resourceName:'资源名称',
            resourceUrl:'资源地址',
            resourceType:'资源类型',
            resourceStatus:'资源状态',
            resourceIcon:'资源图标',
            resourceNum:'资源排序',
            orderNum:'资源内部排序',
            resourceDesc:'资源描述'
        }


    },
    Common: {
        ok: '确定',
        cancel: '取消',
        tip: '提示',
        save:'保存',
        delete:'删除',
        deleteCompleted: '删除完成',
        editCompleted: '编辑完成',
        addCompleted: '新增完成',
        saveCompleted: '保存完成',
        formVerificationInfo: '表单校验失败',
        deleteCanceled: '取消了删除',
        selectIcon: '选择图标',
        pleaseEnter:'请输入',
        pleaseSelect:'请选择',
        cannotBeEmpty:'不能为空'
    },





}

export default zhCn