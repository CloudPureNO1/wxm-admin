

<template>
  <div class="header" @dblclick="layoutStore.toggleFullScreen">
    <div v-if="layoutStore.isVertical"
      :class="{ 'header-btn': layoutStore.isVertical, 'header-btn__padding': layoutStore.isVertical && layoutStore.isHeaderMain }">
      <!-- 菜单折叠 -->
      <div v-if="layoutStore.collapse" class="fold-expand" @click="collapseChange">
        <svg-icon name="expand" class="icon-svg" />
      </div>
      <div v-else class="fold-expand" @click="collapseChange">
        <svg-icon name="fold" class="icon-svg" />
      </div>
      <!-- 系统标题 水平-->
      <div v-if="layoutStore.isHeaderMain" class="title"> {{ $t('SYSTEM_NAME') }}</div>
      <!-- 面包屑 -->
      <BreadCrumb v-if="!layoutStore.isHeaderMain" class="bread-crumb" />
      <div else class="title">&nbsp;</div>
    </div>
    <!-- 系统标题 水平-->
    <div v-if="!layoutStore.isVertical" class="header-title">{{ $t('SYSTEM_NAME') }}</div>
    <!-- 菜单 水平 -->
    <NavMenu v-if="!layoutStore.isVertical" key="header-menu" class="header-menu" />
    <div class="header-right">
      <!-- 全屏 -->
      <div class="dark item" @click="layoutStore.toggleFullScreen">
        <template v-if="!layoutStore.fullScreen">
          <svg-icon name="full-screen" class="icon-svg" />
        </template>
        <template v-else>
          <svg-icon name="full-screen-exit" class="icon-svg" />
        </template>
      </div>
      <!-- 国际化 -->
      <el-dropdown class="item" :size="layoutStore.size">
        <svg-icon name="i18n" class="icon-svg" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="change('zh-cn')">
              <svg-icon name="zh-cn" class="icon-svg" /><span style="margin-left:10px;">{{ $t('Home.I18n.zhCn') }}</span>
            </el-dropdown-item>
            <el-dropdown-item @click="change('en')">
              <svg-icon name="en" class="icon-svg" /><span style="margin-left:10px;">{{ $t('Home.I18n.en') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown class="item" :size="layoutStore.size">
        <svg-icon name="font-size" class="icon-svg" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeSize('large')">
              &nbsp;<svg-icon name="font-size-large" class="icon-svg" /><span
                style="margin-left:10px;">{{ $t('Home.sizeLarge') }}</span>
            </el-dropdown-item>
            <el-dropdown-item @click="changeSize('default')">
              <svg-icon name="font-size-default" class="icon-svg" /><span
                style="margin-left:10px;">{{ $t('Home.sizeDefault') }}</span>
            </el-dropdown-item>
            <el-dropdown-item @click="changeSize('small')">
              &nbsp;<svg-icon name="font-size-small" class="icon-svg" /><span
                style="margin-left:10px;">{{ $t('Home.sizeSmall') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>



      <!-- 暗夜模式 -->
      <div class="dark item" @click="toggleDark()">
        <Moon v-if="isDark" class="icon item" />
        <Sunny v-else class="icon item" />
      </div>
      <el-dropdown :size="layoutStore.size">
        <el-badge :value="12" class="badge-item" @click="showMsg">
          <Bell class="bell-icon" />
        </el-badge>
      </el-dropdown>



      <!-- 头像 -->
      <div class="avatar-box" @click.prevent="handleUserCenter">
        <el-avatar :shape="shape" :size="layoutStore.size" :fit="fit" :src="src" class="item avatar" />
      </div>

      <!-- 设置 -->
      <div class="drop-menu item">
        <el-dropdown :size="layoutStore.size">
          <el-icon class="item">
            <Setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="User">{{ $t('Home.personalCenter') }}</el-dropdown-item>
              <el-dropdown-item icon="SwitchButton" @click="loginOut">{{ $t('Home.exit') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown :size="layoutStore.size">
          <el-icon class="item">
            <CaretBottom />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeMode('horizontal')">
                <svg-icon name="layout-01" /><span style="margin-left:10px;">{{ $t('Home.Layout.topAndBottom') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.changeLayout('header-main')">
                <svg-icon name="layout-02" /><span
                  style="margin-left:10px;">{{ $t('Home.Layout.TopAndLeftAndRight') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.changeLayout('aside-main')">
                <svg-icon name="layout-02" /><span style="margin-left:10px;">{{ $t('Home.Layout.LeftAndRight') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.toggleShowTags">
                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{ $t('Home.showTags') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.changeMenuBgColor('')">
                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{ $t('Home.MenuColor.default') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.changeMenuBgColor('#2c3e50')">
                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{ $t('Home.MenuColor.2c3e50') }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click="layoutStore.changeMenuBgColor('#409eff')">
                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{ $t('Home.MenuColor.409eff') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

  </div>
  <el-dialog v-model="dialogVisible" title="" top="5vh" width="80%" :fullscreen="dialogFullscreen"
    :close-on-press-escape="false" :close-on-click-modal="false" class="datax-info-dialog">
    <template #title>
      <span v-if="dialogVisible">用户中心</span>
      <i style="float:right;margin-right:30px;" @click="dialogFullscreen = !dialogFullscreen">
        <el-icon>
          <FullScreen />
        </el-icon>
      </i>
    </template>
    <el-card shadow="never">
      <UserCenter v-if="dialogVisible" />
    </el-card>
  </el-dialog>


</template>

<script lang="ts" setup>
import UserCenter from './UserCenter.vue'
import { ref, inject, provide } from 'vue'
import type { Ref } from 'vue'
import { toggleDark, isDark } from '../../composable/dark';
import { useLayoutStore } from '../../store/layout'
import { useAppStore } from '../../store/app'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


const router = useRouter()
let layoutStore = useLayoutStore()
const appStore = useAppStore()
const collapseChange = () => {
  layoutStore.toggleCollapse()
}
const changeMode = (mode: string) => {
  layoutStore.changeMode(mode)
}



const change = (locale: string) => {
  appStore.changeLocale(locale)
}

const changeSize = (size: string) => {
  layoutStore.changeSize(size)
}


const shape = ref('circle')
const fit = ref('cover')
const src: Ref<string> = ref('')  // 或者  const srt=ref<string>('')
/**
 * 加载图片资源方法
 */
const useLoadImg = (path: string) => {
  return new URL(path, import.meta.url).href
}
src.value = useLoadImg('../../assets/img/9.gif')




const $wxmAlert: any = inject("$wxmAlert");
const $Http: any = inject("$Http");

const loginOut = () => {
  // 调用logout接口，退出登录
  // this.$router.push('/login')
  $Http.post('/logout').then((resp: any) => {
    if (resp.data.code !== '0') {
      $wxmAlert('退出登录失败：' + resp.data.message, 'error')
      return false
    }
    ElMessage({ type: 'success', message: resp.data.message })
    let keys = Object.keys(sessionStorage)
    if (keys.length > 0) {
      keys.forEach(key => sessionStorage.removeItem(key))
    }
    router.push('/login')
  }).catch((err: any) => {
    $wxmAlert('退出登录失败：' + err.message || err, 'error')
  })
}

const showMsg = () => {
  alert('message')
}

// 用户中心 对话框
const handleUserCenter = () => {
  dialogVisible.value = true
}
const dialogVisible = ref<boolean>(false)
const dialogFullscreen = ref<boolean>(false)
const resetAvatarSrc = (url: string) => {
  src.value = url
}
const closeUserCenter=()=>{
  dialogVisible.value=false
}
provide('resetAvatarSrc', resetAvatarSrc)
provide('closeUserCenter', closeUserCenter)

</script>

<style scoped lang="scss">
/**菜单居右 */
.flex-grow {
  flex-grow: 1;
}

@mixin base {
  line-height: var(--el-menu-item-height);
  border-bottom: 1px solid var(--el-menu-border-color);
}

@mixin center {
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  flex-direction: row;

  .fold-expand {
    display: flex;
    // width: 1em;
    // height: 1em;
    // color: var(--el-text-color-regular);
    // font-size: 1.5rem;

    &:hover {
      color: var(--el-color-primary)
    }
  }

  .title {
    align-items: center;
    justify-content: start;
    padding-left: 10px;
    font-size: 20px;
  }


  .header-btn {
    flex: 1;
    display: flex;
    align-items: center;

    @include base;
    font-size: 25px;
    cursor: pointer;

    padding-left: 10px;
  }

  .header-btn__padding {
    padding-left: var(--el-menu-base-level-padding);
  }





  .drop-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 98%;
    padding: 0 10px 0 0;
  }



  .header-menu {
    //flex:1;
    overflow: hidden;
  }

  .header-right {
    // flex:1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 10px;
    @include base;

    .avatar-box {
      display: flex;

      &:hover {

        // background: var(--el-color-primary);
        // box-shadow: 5px 5px 10px var(--el-text-color-regular);
        .avatar {
          // &:hover{
          //   zoom: 1.25;
          // }

          // &:hover,
          // &:focus,
          // &:active {
          //   -webkit-transform: translateY(-5px);
          //   transform: translateY(-5px);

          //   &::before {
          //     opacity: 1;
          //     -webkit-transform: translateY(5px);
          //     transform: translateY(5px);
          //   }
          // }
          &:hover{
            border-radius: 0;
          }
        }
      }
    }

    .icon {
      width: 1em;
      height: 1em;
      // margin-right: 8px;
      color: var(--el-text-color-regular);
      font-size: 1.2rem;
    }

    .bell-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--el-text-color-regular);
      font-size: 1.2rem;

      &:hover {
        color: var(--el-color-primary)
      }
    }

    .dark {
      display: flex;
      @include center;
      color: var(--el-text-color-regular)
    }

    .item {
      padding: 0 10px;

      &:hover {
        color: var(--el-color-primary) !important;
      }
    }
  }

  .header-title {
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: start; */
    padding-left: 10px;
    line-height: var(--el-menu-item-height);
    border-bottom: 1px solid var(--el-menu-border-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
  }

  .badge-item {
    margin-right: 40px;
    cursor: pointer;
  }

  .bread-crumb {
    margin-left: 10px;
  }

  .icon-svg {
    width: 1.5rem;
    height: 1.5rem;
  }

}
</style>