
<template>
	<div>
		<div class="app-contain">
			<div class="list_search_view">
				<el-form :model="searchQuery" class="search_form" >
					<div class="search_view">
						<div class="search_label">
							用户名：
						</div>
						<div class="search_box">
							<el-input class="search_inp" v-model="searchQuery.username" placeholder="用户名"
								clearable>
							</el-input>
						</div>
					</div>
					<div class="search_btn_view">
						<el-button class="search_btn" type="primary" @click="searchClick()" size="small">搜索</el-button>
					</div>
				</el-form>
				<br>
				<div class="btn_view">
					<el-button type="success" @click="addClick" v-if="btnAuth('users','新增')">新增</el-button>
					<el-button type="primary" :disabled="selRows.length==1?false:true" @click="editClick" v-if=" btnAuth('users','修改')">修改</el-button>
					<el-button type="danger" :disabled="selRows.length?false:true" @click="delClick(null)"  v-if="btnAuth('users','删除')">删除</el-button>
				</div>
			</div>
			<br>
			<el-table
				v-loading="listLoading"
				border 
				:stripe='false'
				@selection-change="handleSelectionChange" 
				ref="table"
				v-if="btnAuth('users','查看')"
				:data="list"
				@row-click="listChange">
				<el-table-column :resizable='true' align="left" header-align="left" type="selection" width="55" />
				<el-table-column label="序号" width="70" :resizable='true' :sortable='true' align="left" header-align="left">
					<template #default="scope">{{ scope.$index + 1}}</template>
				</el-table-column>
				<el-table-column
					 :resizable='true' 
					 :sortable='true' 
					 align="left" 
					 header-align="left"
					 prop="username"
					label="用户名">
					<template #default="scope">
						{{scope.row.username}}
					</template>
				</el-table-column>
				<el-table-column
					 :resizable='true' 
					 :sortable='true' 
					 align="left" 
					 header-align="left"
					 prop="role"
					label="角色">
					<template #default="scope">
						{{scope.row.role}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300" :resizable='true' :sortable='true' align="left" header-align="left">
					<template #default="scope">
					</template>
				</el-table-column>
			</el-table>
			<el-pagination 
				background
				:layout="layouts.join(',')"
				:total="total" 
				:page-size="listQuery.limit"
				prev-text="上一页"
				next-text="下一页"
				:hide-on-single-page="false"
				:style='{"border":"0px solid #e1e1e1","padding":"10px 0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"center","background":"none","width":"100%","fontWeight":"500"}'
				@size-change="sizeChange"
				@current-change="currentChange" 
				@prev-click="prevClick"
				@next-click="nextClick"  />
		</div>
		<formModel ref="formRef" @formModelChange="formModelChange"></formModel>
	</div>
</template>
<script setup>
	import axios from 'axios'
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
		watch,
	} from 'vue'
	import {
		useRoute,
		useRouter
	} from 'vue-router'
	import {
		ElMessageBox
	} from 'element-plus'
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	import formModel from './formModel.vue'
	
	//基础信息
	const tableName = 'users'
	const formName = '管理员'
	const route = useRoute()
	//基础信息
	onMounted(()=>{
	})
	//列表数据
	const list = ref(null)
	const table = ref(null)
	const listQuery = ref({
		page: 1,
		limit: 20,
		sort: 'id',
		order: 'desc'
	})
	const searchQuery = ref({})
	const selRows = ref([])
	const listLoading = ref(false)
	const listChange = (row) =>{
		nextTick(()=>{
			table.value.clearSelection()
			table.value.toggleRowSelection(row)
		})
	}
	//列表
	const getList = () => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
		params['sort'] = 'id'
		params['order'] = 'desc'
		if(searchQuery.value.username&&searchQuery.value.username!=''){
			params['username'] = '%' + searchQuery.value.username + '%'
		}
		context?.$http({
			url: `${tableName}/page`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = Number(res.data.data.total)
		})
	}
	//删
	const delClick = (id) => {
		let ids = ref([])
		if (id) {
			ids.value = [id]
		} else {
			if (selRows.value.length) {
				for (let x in selRows.value) {
					ids.value.push(selRows.value[x].id)
				}
			} else {
				return false
			}
		}
		ElMessageBox.confirm(`是否删除选中${formName}`, '提示', {
			confirmButtonText: '是',
			cancelButtonText: '否',
			type: 'warning',
		}).then(() => {
			context?.$http({
				url: `${tableName}/delete`,
				method: 'post',
				data: ids.value
			}).then(res => {
				context?.$toolUtil.message('删除成功', 'success',()=>{
					getList()
				})
			})
		})
	}
	//多选
	const handleSelectionChange = (e) => {
		selRows.value = e
	}
	//列表数据
	//分页
	const total = ref(0)
	const layouts = ref(["total","prev","pager","next","sizes","jumper"])
	const sizeChange = (size) => {
		listQuery.value.limit = size
		getList()
	}
	const currentChange = (page) => {
		listQuery.value.page = page
		getList()
	}
	const prevClick = () => {
		listQuery.value.page = listQuery.value.page - 1
		getList()
	}
	const nextClick = () => {
		listQuery.value.page = listQuery.value.page + 1
		getList()
	}
	//分页
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	//搜索
	const searchClick = () => {
		listQuery.value.page = 1
		getList()
	}
	//表单
	const formRef = ref(null)
	const formModelChange=()=>{
		searchClick()
	}
	const addClick = ()=>{
		formRef.value.init()
	}
	const editClick = ()=>{
		if(selRows.value.length){
			formRef.value.init(selRows.value[0].id,'edit')
		}
	}
	
	const infoClick = (id=null)=>{
		if(id){
			formRef.value.init(id,'info')
		}
		else if(selRows.value.length){
			formRef.value.init(selRows.value[0].id,'info')
		}
	}
	// 表单
	// 预览文件
	const preClick = (file) =>{
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		window.open(context?.$config.url + file)
		// const a = document.createElement('a');
		// a.style.display = 'none';
		// a.setAttribute('target', '_blank');
		// file && a.setAttribute('download', file);
		// a.href = context?.$config.url + file;
		// document.body.appendChild(a);
		// a.click();
		// document.body.removeChild(a);
	}
	// 下载文件
	const download = (file) => {
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		let arr = file.replace(new RegExp('file/', "g"), "")
		axios.get((location.href.split(context?.$config.name).length>1 ? location.href.split(context?.$config.name)[0] :'') + context?.$config.name + '/file/download?fileName=' + arr, {
			headers: {
				token: context?.$toolUtil.storageGet('Token')
			},
			responseType: "blob"
		}).then(({
			data
		}) => {
			const binaryData = [];
			binaryData.push(data);
			const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
				type: 'application/pdf;chartset=UTF-8'
			}))
			const a = document.createElement('a')
			a.href = objectUrl
			a.download = arr
			// a.click()
			// 下面这个写法兼容火狐
			a.dispatchEvent(new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			}))
			window.URL.revokeObjectURL(data)
		})
	}


	//初始化
	const init = () => {
		getList()
	}
	init()
</script>
<style lang="scss" scoped>
	
	// 操作盒子
	.list_search_view {
		padding: 0 50px;
		margin: 0 0 20px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		// 搜索盒子
		.search_form {
			border: 0px solid #654B3C;
			padding: 0;
			margin: 0 0 0 20px;
			display: flex;
			align-items: center;
			order: 2;
			// 子盒子
			.search_view {
				padding: 0;
				margin: 0;
				display: flex;
				align-items: center;
				// 搜索label
				.search_label {
					margin: 0 5px 0;
					color: #7b624c;
					background: none;
					font-weight: 500;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 36px;
					text-align: right;
					height: 36px;
				}
				// 搜索item
				.search_box {
					padding: 0;
					margin: 0;
					display: inline-block;
					width: auto;
					// 输入框
					:deep(.search_inp) {
						border-radius: 0px;
						padding: 0 10px;
						background: #fff;
						width: 150px;
						border-color: #c0ab9a;
						border-width: 0 0 4px;
						line-height: 43px;
						box-sizing: border-box;
						border-style: solid;
						height: 43px;
						//去掉默认样式
						.el-input__wrapper{
							border: none;
							box-shadow: none;
							background: none;
							border-radius: 0;
							height: 100%;
							padding: 0;
						}
						.is-focus {
							box-shadow: none !important;
						}
					}
				}
			}
			// 搜索按钮盒子
			.search_btn_view {
				// 搜索按钮
				.search_btn {
					cursor: pointer;
					padding: 0 20px;
					margin: 0 0 0 10px;
					color: #fff;
					font-size: 16px;
					border-color: #c0ab9a;
					border-radius: 0;
					background: #a97d49;
					width: auto;
					border-width: 0 0 4px;
					border-style: solid;
					min-width: 80px;
					height: 43px;
				}
				// 搜索按钮-悬浮
				.search_btn:hover {
				}
			}
		}
		//头部按钮盒子
		.btn_view {
			padding: 0;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			order: 1;
			// 其他
			:deep(.el-button--default){
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: #333;
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(51,51,51,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 其他-悬浮
			:deep(.el-button--default:hover){
				border-color: rgba(51,51,51,.8);
			}
			// 新增
			:deep(.el-button--success){
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: #22d6c3;
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(34,214,195,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 新增-悬浮
			:deep(.el-button--success:hover){
				border-color: rgba(34,214,195,.8);
			}
			// 修改
			:deep(.el-button--primary){
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: #7ca065;
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(124,160,101,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 修改-悬浮
			:deep(.el-button--primary:hover){
				border-color: rgba(124,160,101,.8);
			}
			// 详情
			:deep(.el-button--info){
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: rgba(234,133,1,.8);
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(234,133,1,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 详情-悬浮
			:deep(.el-button--info:hover){
				border-color: rgba(234,133,1,.8);
			}
			// 删除
			:deep(.el-button--danger){
				border: 0px solid #b9c8d2;
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: rgba(220,51,59,1);
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(220,51,59,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 删除-悬浮
			:deep(.el-button--danger:hover){
				border-color: rgba(220,51,59,.8);
			}
			// 统计
			:deep(.el-button--warning){
				border: 0px solid #b9c8d2;
				cursor: pointer;
				padding: 0 5px;
				margin: 0 20px 0px 0;
				color: rgba(78,155,226,1);
				font-weight: 600;
				font-size: 16px;
				border-color: rgba(78,155,226,.2);
				border-radius: 0px;
				background: none;
				width: auto;
				border-width: 0 0 4px;
				border-style: solid;
				height: 43px;
			}
			// 统计-悬浮
			:deep(.el-button--warning:hover){
				border-color: rgba(78,155,226,.8);
			}
		}
	}
	// 表格样式
	.el-table {
		border-radius: 0px;
		padding: 36px 40px 40px;
		background: url(http://clfile.zggen.cn/20240420/5515c5b3ba0f403ea546f78d7ba991d3.png) no-repeat center top / 100% auto,url(http://clfile.zggen.cn/20240420/420aacde92434c36a34e7a70744daf0e.png) no-repeat center bottom / 100% auto,url(http://clfile.zggen.cn/20240420/366c464b7dc64d3c885145b17912bcf7.png) repeat-y center top / 100% auto;
		width: 100%;
		font-size: 13px;
		border-color: #bb9363;
		border-width: 0px;
		border-style: solid;
		:deep(.el-table__header-wrapper) {
			thead {
				color: inherit;
				font-weight: 500;
				width: 100%;
				tr {
					background: none;
					th {
						padding: 5px 0;
						background: none;
						border-color: #bb936330;
						border-width: 0 1px 1px 0;
						border-style: solid;
						text-align: left;
						.cell {
							padding: 0 5px;
							word-wrap: normal;
							color: #333;
							white-space: normal;
							font-weight: bold;
							display: inline-block;
							vertical-align: middle;
							font-size: inherit;
							line-height: 24px;
							text-overflow: ellipsis;
							word-break: break-all;
							width: 100%;
							position: relative;
						}
					}
				}
			}
		}
		:deep(.el-table__body-wrapper) {
			tbody {
				width: 100%;
				tr {
					background: none;
					td {
						padding: 5px 0;
						color: #555;
						background: none;
						border-color: #bb936330;
						border-width: 0 1px 1px 0;
						border-style: solid;
						text-align: left;
						.cell {
							padding: 0 10px;
							overflow: hidden;
							word-break: break-all;
							white-space: normal;
							line-height: 24px;
							text-overflow: ellipsis;
							// 编辑
							.el-button--primary {
								border: 0px solid #eee;
								cursor: pointer;
								border-radius: 0px;
								padding: 4px 6px;
								box-shadow: 0px 4px 0px rgba(78,155,226,.2);
								margin: 0 6px 6px 0;
								color: #4d9be3;
								background: none;
								width: auto;
								font-size: 14px;
								height: auto;
							}
							// 编辑-悬浮
							.el-button--primary:hover {
								box-shadow: 0px 4px 0px rgba(78,155,226,.8);
							}
							// 详情
							.el-button--info {
								border: 0px solid #eee;
								cursor: pointer;
								border-radius: 0px;
								padding: 4px 6px;
								box-shadow: 0px 4px 0px rgba(234,133,1,.2);
								margin: 0 6px 6px 0;
								color: #ea8501;
								background: none;
								width: auto;
								font-size: 14px;
								height: auto;
							}
							// 详情-悬浮
							.el-button--info:hover {
								box-shadow: 0px 4px 0px rgba(234,133,1,.8);
							}
							// 删除
							.el-button--danger {
								border: 0px solid #eee;
								cursor: pointer;
								border-radius: 0px;
								padding: 4px 6px;
								box-shadow: 0px 4px 0px rgba(220,51,59,.2);
								margin: 0 6px 6px 0;
								color: #dc333b;
								background: none;
								width: auto;
								font-size: 14px;
								height: auto;
							}
							// 删除-悬浮
							.el-button--danger:hover {
								box-shadow: 0px 4px 0px rgba(220,51,59,.8);
							}
							// 跨表
							.el-button--success {
								border: 0px solid #eee;
								cursor: pointer;
								border-radius: 0px;
								padding: 4px 6px;
								box-shadow: 0px 4px 0px rgba(20,20,20,.1);
								margin: 0 6px 6px 0;
								color: #333;
								background: none;
								width: auto;
								font-size: 14px;
								height: auto;
							}
							// 跨表-悬浮
							.el-button--success:hover {
								box-shadow: 0px 4px 0px rgba(20,20,20,.8);
							}
							// 操作
							.el-button--warning {
								border: 0px solid #eee;
								cursor: pointer;
								border-radius: 0px;
								padding: 4px 6px;
								box-shadow: 0px 4px 0px rgba(20,20,20,.1);
								margin: 0 6px 6px 0;
								color: #333;
								background: none;
								width: auto;
								font-size: 14px;
								height: auto;
							}
							// 操作-悬浮
							.el-button--warning:hover {
								box-shadow: 0px 4px 0px rgba(20,20,20,.8);
							}
						}
					}
				}
				tr:hover {
					td {
						padding: 5px 0;
						color: #000;
						background: none;
						border-color: #bb936330;
						border-width: 0 1px 1px 0;
						border-style: solid;
						text-align: left;
					}
				}
			}
		}
	}
	// 分页器
	.el-pagination {
		// 总页码
		:deep(.el-pagination__total) {
			margin: 0 10px 0 0;
			color: #666;
			font-weight: 400;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 28px;
			height: 28px;
		}
		// 上一页
		:deep(.btn-prev) {
			border: 1px solid #eee;
			border-radius: 0px;
			padding: 0 5px;
			margin: 0 5px;
			color: #666;
			background: #fff;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 26px;
			min-width: 35px;
			height: 26px;
		}
		// 下一页
		:deep(.btn-next) {
			border: 1px solid #eee;
			border-radius: 0px;
			padding: 0 5px;
			margin: 0 5px;
			color: #666;
			background: #fff;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 26px;
			min-width: 35px;
			height: 26px;
		}
		// 上一页禁用
		:deep(.btn-prev:disabled) {
			border: 1px solid #eee;
			cursor: not-allowed;
			border-radius: 0px;
			padding: 0 5px;
			margin: 0 5px;
			color: #666;
			background: #fff;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 26px;
			height: 26px;
		}
		// 下一页禁用
		:deep(.btn-next:disabled) {
			border: 1px solid #eee;
			cursor: not-allowed;
			border-radius: 0px;
			padding: 0 5px;
			margin: 0 5px;
			color: #666;
			background: #fff;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 26px;
			height: 26px;
		}
		// 页码
		:deep(.el-pager) {
			padding: 0;
			margin: 0;
			display: inline-block;
			vertical-align: top;
			// 数字
			.number {
				cursor: pointer;
				border: 1px solid #eff3f9;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 26px;
				border-radius: 0px;
				background: #fff;
				text-align: center;
				min-width: 30px;
				height: 26px;
			}
			// 数字悬浮
			.number:hover {
				cursor: pointer;
				border: 1px solid #e6e6e6;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 26px;
				border-radius: 0px;
				background: #a97d4b;
				text-align: center;
				min-width: 30px;
				height: 26px;
			}
			// 选中
			.number.is-active {
				cursor: default;
				border: 1px solid #e6e6e6;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 26px;
				border-radius: 0px;
				background: #a97d4b;
				text-align: center;
				min-width: 30px;
				height: 26px;
			}
		}
		// sizes
		:deep(.el-pagination__sizes) {
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 28px;
			height: 28px;
			.el-select {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
		}
		// 跳页
		:deep(.el-pagination__jump) {
			margin: 0 0 0 24px;
			color: #606266;
			display: inline-block;
			vertical-align: top;
			font-size: 13px;
			line-height: 28px;
			height: 28px;
			// 输入框
			.el-input {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 26px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: auto;
				text-align: center;
				height: 26px;
				//去掉默认样式
				.el-input__wrapper{
					border: none;
					box-shadow: none;
					background: none;
					border-radius: 0;
					height: 100%;
					padding: 0;
				}
				.is-focus {
					box-shadow: none !important;
				}
			}
		}
	}
</style>
