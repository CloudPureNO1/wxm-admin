 
<template>
	
	<div class="base-tags">
		<!-- <el-scrollbar> -->
		<el-tag v-for="tag in tags" :key="tag.name" effect="plain" class="base-tags_tag"
			:closable="isClosable(tag.path)" :class="{ 'tag__is-active': isActive(tag.path) }"
			@click="handleClick(tag.path)" @close="handleClose(tag.path)" :id="tag.path">
			{{ $t(tag.title) }}
		</el-tag>
		<!-- </el-scrollbar> -->


	</div>
	<div id="menu" style="display:none;">
		<div class="menu-content">
			<ul>
				<li @click="handleMenuClick(1)"><span>关闭</span> </li>
				<li @click="handleMenuClick(2)"><span>关闭其他</span> </li>
				<li @click="handleMenuClick(3)"><span>关闭所有</span> </li>
			</ul>
		</div>
	</div>
</template>
  
<script lang="ts" setup>
/**
 * 采用全局状态关联，刷新的时候数据丢失，
 * 所以：tag 采用sessionStorage存储
 */
import _ from 'lodash'
import { nextTick, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useLayoutStore } from '../../store/layout'
import { useRightMenu } from '../../composable/rightMenu'
import { wxmAlert } from '@/util/commFn';
interface TagItem {
	name: string;
	path: string;
	title: string;
	keepAlive: boolean
}

const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore()


const isActive = (path: string) => {
	return path === route.fullPath;
};
const isClosable = (path: string) => {
	return path !== '/home' && path !== '/'
}


const tagsStr = sessionStorage.getItem('tags') || ''
let tagsAry = []
if (!_.isEmpty(tagsStr)) {
	tagsAry = JSON.parse(tagsStr)
}
let tags  = ref<TagItem[]>(tagsAry)

// 关闭单个标签
const handleClose = (path: string) => {
	delTagsItem(path);
};
const delTagsItem = (path: string) => {
	// splice  改变原来的数组  splice(index,num)   
	// filter 不改变原来的数组
	tags.value.splice(tags.value.findIndex(item => item.path === path), 1)
	sessionStorage.setItem('tags', JSON.stringify(tags.value))
	if (tags.value.length === 0) {
		router.push("/")
	} else {
		router.push(tags.value[tags.value.length - 1].path)
	}
}

const handleClick = (path: string) => {
	router.push(path)
}

// 设置标签
const setTags = (route: any) => {
	const isExist = tags.value.some(item => {
		return item.path === route.path;
	});
	if (!isExist) {
		tags.value.push({
			name: route.name,
			title: route.meta.title,
			path: route.fullPath,
			keepAlive: route.meta.keepAlive
		})
		sessionStorage.setItem('tags', JSON.stringify(tags.value))
	}
	layoutStore.addKeepAliveList(route.name)
};

setTags(route);
onBeforeRouteUpdate(to => {
	setTags(to);

	nextTick(() => {
		useRightMenu('menu', 'base-tags', 'base-tags_tag')
	})
});


const handleMenuClick = (type: number) => {
	const tagPath: string = sessionStorage.getItem('currentTag') as string
	switch (type) {
		case 1:
			if(tagPath==='/home'){
				wxmAlert('首页不能关闭','error')
				break
			}
			// tags.value.splice(tags.value.findIndex(tag=>tag.name===tagName),1)
			delTagsItem(tagPath)
			break
		case 2:
			tags.value=tags.value.filter(tag=>tag.path===tagPath||tag.path==='/home')
			router.push(tagPath)
			sessionStorage.setItem('tags',JSON.stringify(tags.value))
			break;
		case 3:
			tags.value=tags.value.filter(tag=>tag.path==='/home')
			router.push('/home')
			sessionStorage.setItem('tags',JSON.stringify(tags.value))
			break
		default:

			break;
	}

}
nextTick(() => {
	useRightMenu('menu', 'base-tags', 'base-tags_tag')
})


// 关闭当前页面的标签页
// tags.value.closeCurrentTag({
//     $router: router,
//     $route: route
// });
</script>
<style scoped lang="scss">
.base-tags {
	// background-color: var(--base-tag-background);
	// background-color: var(--el-fill-color-light); // element plus 已经实现了暗夜模式的，直接使用它的样式变量
	border-bottom: 1px solid var(--el-border-color-light);
	padding: 0.1rem 0;

	.base-tags_tag {
		min-width: 4rem;
		// color:var(--el-menu-text-color) !important;
		color: var(--el-text-color-secondary);

		padding: 15px 11px 15px 13px;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		cursor: pointer;
		--el-tag-border-color: var(--el-color-info-light-8);
		--el-tag-text-color: var(--el-color-info);

		&:hover {
			//background-color: var(--el-color-primary-light-9);
			background-color: var(--el-color-primary);
			// color: var(--el-color-primary) !important;
			color: var(--el-color-white);
			// --el-tag-text-color: var(--el-color-primary);
			--el-tag-text-color: var(--el-color-white);
		}
	}

	.tag__is-active {
		background-color: var(--tag__is-active-bg-color);
		// color: var(--el-color-primary) !important;
		color: var(--el-color-white);
		// --el-tag-text-color: var(--el-color-primary);
		--el-tag-text-color: var(--el-color-white);
	}



}

#menu {
	position: absolute; // 设置菜单为绝对位置
	border: 1px solid var(--el-border-color-light);
	background: var(--wxm-bg-color);
	display: none;
	box-shadow: var(--wxm-shadow-color) 1px 1px;
	z-index: 90000;
	font-size: 0.1rem;


	.menu-content {
		ul {
			margin: 0;
			padding: 0;

			li {
				list-style-type: none;
				text-align: left;
				margin: 10px 0;
				padding: 2px 1rem;
				font-size: 0.75rem;

				&:hover {
					background-color: var(--el-fill-color-darker);
					cursor: pointer;
					color: var(--el-color-primary)
				}
			}
		}
	}
}
</style>