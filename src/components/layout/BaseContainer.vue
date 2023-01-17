<template>
    <!--     <div v-if="layoutStore.layoutMode==='header-main'" class="wxm-container header-main">
        <BaseHeader />
        <div class="wxm-main">
            <NavMenu v-if="layoutStore.isVertical" class="wxm-aside" />
            <div class="wxm-content">
                <BaseTags v-if="layoutStore.showTags" />
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>

    <div v-if="layoutStore.layoutMode==='aside-main'" class="wxm-container aside-main">
        <div class="wxm-main">
            <NavMenu v-if="layoutStore.isVertical" class="wxm-aside" />
            <div class="wxm-content">
                <BaseHeader />
                <BaseTags v-if="layoutStore.showTags" />
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div> -->
    <!-- 合并成一个 -->
    <div class="wxm-container" :class="'wxm-'+layoutStore.layoutMode">
        <BaseHeader  v-if="layoutStore.layoutMode==='header-main'" />
        <div class="wxm-main">
            <NavMenu v-if="layoutStore.isVertical" class="wxm-aside" />
            <div class="wxm-content">
                <BaseHeader v-if="layoutStore.layoutMode==='aside-main'" />
                <BaseTags v-if="layoutStore.showTags" />
                <div class="wxm-content__main ">
                    <router-view v-slot="{ Component }">
                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                    <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import NavMenu from './NavMenu.vue'
import BaseHeader from './BaseHeader.vue'
import BaseTags from './BaseTags.vue'
import { useLayoutStore } from '../../store/layout'
const layoutStore = useLayoutStore()
</script>

 