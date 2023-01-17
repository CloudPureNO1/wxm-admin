const en: any = {
    SYSTEM_NAME: 'Zhejiang University New Software Industry Group Co., Ltd',
    Login: {
        title: '登录',
    },
    Home: {
        name: 'HomePage',
        personalCenter: 'Personal Center',
        exit: 'Exit',
        horizontal: 'Horizontal',
        vertical: 'Vertical',
        topAndBottomLayout: 'Top and bottom layout',
        leftAndRightLayout: 'Left and right layout',
        showTags: 'Label Display/Hide',
        sizeLarge: 'Large',
        sizeDefault: 'default',
        sizeSmall: 'small',
        Layout: {
            topAndBottom: 'Top-Bottom layout',
            TopAndLeftAndRight: 'Top-Left-Right layout',
            LeftAndRight: 'Left-Right layout'
        },
        I18n: {
            zhCn: 'Chinese',
            en: 'English'
        },
        MenuColor: {
            'default': 'Default',
            '2c3e50': 'Black',
            '409eff': 'Blue'
        },
    },
    Menu: {
        Demo:{
            title:'Demo',
            children:{
                Tinymce:{
                    title:'Tinymce'
                },
                ImageCroppingMyself:{
                    title:'Image cropping (do it yourself)'
                },
                ImageCropping:{
                    title:'Image cropping'
                },
                QrCode:{
                    title:'QrCode'
                },
                QrReader:{
                    title:'QrReader'
                },
                JsonPretty:{
                    title:'JsonPretty'
                } 
            }
        },
        Quartz:{
            title:'Scheduled Task Management',
            children:{
                DataXIndex:{
                    title:'DataX Scheduled Task Management'
                },
                OrdinaryJobIndex:{
                    title:'Common scheduled task management'
                }
            }
        },
        Rbac: {
            title: 'system manage',
            children: {
                UserIndex: {
                    title: 'user manage'
                },
                GroupIndex: {
                    title: 'group manage'
                },

                RoleIndex: {
                    title: 'Role manage'
                },
                ResourceIndex: {
                    title: 'Resource manage'
                },
                PermissionIndex: {
                    title: 'permission manage'
                },
                ApiIndex: {
                    title: 'Api manage'
                },
                DictionaryIndex: {
                    title: 'Dictionary manage'
                },
            }
        },
        BriefIntroduction: {
            title: 'Brief Introduction'
        },
        NotFound: {
            title: 'Not Found'
        }
    },
    Rbac: {
        Resource:{
            selectResourceFirst: 'Please select the left resource first',
            confirmDeleteResource: 'This operation will permanently delete the resource. Do you want to continue?',
            addLv1Resource: 'Add level 1 resource',
            addChildResource: 'Add child resource',
            parentName:'Parent name',
            resourceName:'Resource name',
            resourceUrl:'Resource URL',
            resourceType:'Resource type',
            resourceStatus:'Resource status',
            resourceIcon:'Resource icon',
            resourceNum:'Resource Number',
            orderNum:'Inner Order Number ',
            resourceDesc:'Resource Description'
        }
    },
    Common: {
        ok: 'OK',
        cancel: 'Cancel',
        tip: 'Tip',
        save:'Save',
        delete:'Delete',
        deleteCompleted: 'Delete completed',
        editCompleted: 'Edit completed',
        addCompleted: 'Add completed',
        saveCompleted: 'Save completed',
        formVerificationInfo: 'The form information verification fails',
        deleteCanceled: 'Delete canceled',
        selectIcon: 'Select icon',
        pleaseEnter:'Please enter a ',
        pleaseSelect:'Please select ',
        cannotBeEmpty:'cannot be empty!'
    }


}

export default en