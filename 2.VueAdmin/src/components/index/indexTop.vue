<template>
	<div class="top_view">
		<div class="top_left_view">
			<div class="fold_view" @click="toggleClick">
				<el-icon class="icons">
					<Fold v-if="!collapse" />
					<Expand v-else />
				</el-icon>
			</div>
		</div>

		<div class="projectTitle">基于协同过滤算法的个性化音乐推荐系统</div>
		<div class="top_right_view">
			<el-dropdown class="avatar-container right-menu-item" trigger="hover">
				<div class="avatar-wrapper">
					<div class="nickname">欢迎 {{$toolUtil.storageGet('adminName')}}</div>
					<img class="user-avatar" src="@/assets/img/avatar.png">
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click="centerClick" v-if="roleName!='管理员'">
							个人中心
						</el-dropdown-item>
						<el-dropdown-item @click="updatepasswordClick">
							修改密码
						</el-dropdown-item>
						<el-dropdown-item v-if="roleName!='管理员'">
							<span style="display:block;" @click="frontClick">系统前台</span>
						</el-dropdown-item>
						<el-dropdown-item>
							<span style="display:block;" @click="onLogout">退出登录</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import {
		ElMessageBox
	} from 'element-plus'
	import {
		toRefs,
		defineEmits,
		getCurrentInstance,
		ref,
		onBeforeUnmount
	} from 'vue';
	import { useStore } from 'vuex'
	const store = useStore()
	import {
		useRouter
	} from 'vue-router';
	const props = defineProps({
		collapse: Boolean
	})
	const {
		collapse,
		
	} = toRefs(props)
	
	const router = useRouter()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const emit = defineEmits(['collapseChange'])
	const role = context?.$toolUtil.storageGet('sessionTable')
	const roleName = context?.$toolUtil.storageGet('role')
	const toggleClick = () => {
		emit('collapseChange')
	}
	const getSession = () => {
		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res=>{
			context?.$toolUtil.storageSet('userid',res.data.data.id)
			if(context?.$toolUtil.storageGet('sessionTable') == 'yonghu'){
				context?.$toolUtil.storageSet('adminHeadportrait',res.data.data.touxiang)
			}
		})
	}
	// 退出登录
	const onLogout = () => {
		let toolUtil = context?.$toolUtil
		store.dispatch('delAllCachedViews')
		store.dispatch('delAllVisitedViews')
		toolUtil.storageClear()
		router.replace({
			name: "login"
		});
	}
	// 跳转前台
	const frontClick = () => {
		window.location.href = `${context?.$config.indexUrl}`
	}
	// 个人中心
	const centerClick = () => {
		router.push(`/${role}Center`)
	}
	// 修改密码
	const updatepasswordClick = () => {
		router.push(`/updatepassword`)
	}
	getSession()
</script>

<style lang="scss" scoped>
	// 总盒子
	.top_view {
		padding: 0;
		z-index: 9;
		display: flex;
		font-size: 18px;
		border-color: #990033;
		top: 0;
		left: 0;
		background: url(http://clfile.zggen.cn/20240420/b316215aea254f99990e212dcefc00ea.jpg) repeat-x left top;
		width: 100%;
		justify-content: flex-start;
		border-width: 0 0 0px;
		align-items: center;
		position: relative;
		border-style: solid;
		height: 100px;
		// 左边盒子
		.top_left_view {
			display: flex;
			width: auto;
			align-items: center;
			height: 100%;
			// 折叠按钮盒子
			.fold_view {
				padding: 0 15px;
				display: none;
				// 图标
				.icons {
				}
			}
		}
		// 标题
		.projectTitle{
			padding: 0 20px;
			margin: 20px auto 0;
			color: #333;
			font-weight: 500;
			width: 1200px;
			font-size: 20px;
			line-height: 1;
			text-align: center;
		}
		// 右部盒子
		.top_right_view{
			top: 40px;
			display: flex;
			width: auto;
			justify-content: flex-end;
			position: absolute;
			right: 180px;
			height: 100%;
			order: 3;
			// 头像盒子
			.avatar-container {
				cursor: pointer;
				margin: 0 30px 0 0;
				color: #fff;
				display: flex;
				align-items: center;
				height: 40px;
				.avatar-wrapper {
					margin: 5px 0 0;
					display: flex;
					position: relative;
					align-items: center;
					// 昵称
					.nickname {
						cursor: pointer;
						margin: 0 10px 0 0;
						color: #333;
						font-size: 16px;
						line-height: 44px;
						order: 2;
					}
					// 头像
					.user-avatar {
						cursor: pointer;
						border-radius: 100%;
						margin: 0 4px 0 0;
						width: 34px;
						height: 34px;
					}
					// 图标
					.el-icon--right {
						margin: 0 10px 0 0;
						color: #666;
					}
				}
			}
		}
	}
	// 下拉盒子
	.el-dropdown-menu{
		border: 0px solid #ddd;
		box-shadow: 0px 6px 6px -3px #999;
		background: #fff;
		min-width: 150px;
		// 下拉盒子itme
		:deep(.el-dropdown-menu__item){
			color: #555;
			background: none;
		}
		// item悬浮
		:deep(.el-dropdown-menu__item:hover){
			color: #fff;
			background: #b3a491;
		}
	}
	
</style>
