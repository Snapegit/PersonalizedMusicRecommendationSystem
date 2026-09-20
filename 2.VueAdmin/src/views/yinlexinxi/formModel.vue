<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="50%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="音乐类型" prop="yinleleixing">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.yinleleixing?true:false"
								v-model="form.yinleleixing" 
								placeholder="请选择音乐类型"
								>
								<el-option v-for="(item,index) in yinleleixingLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="标签" prop="biaoqian">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.biaoqian?true:false"
								v-model="form.biaoqian" 
								placeholder="请选择标签"
								>
								<el-option v-for="(item,index) in biaoqianLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="gequfengmian"
									  label="歌曲封面"
						>
							<uploads
								:disabled="!isAdd||disabledForm.gequfengmian?true:false"
								action="file/upload"

								tip="请上传歌曲封面"
								:limit="3"
								style="width: 100%;text-align: left;"
								:fileUrls="form.gequfengmian?form.gequfengmian:''" 
								@change="gequfengmianUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="语言类别" prop="yuyanleibie">
							<el-input class="list_inp" v-model="form.yuyanleibie" placeholder="语言类别"
								 type="text" 								:readonly="!isAdd||disabledForm.yuyanleibie?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="上架时间" prop="shangjiashijian">
							<el-date-picker
								class="list_date"
								v-model="form.shangjiashijian"
								format="YYYY 年 MM 月 DD 日"
								value-format="YYYY-MM-DD"
								type="datetime"
								:readonly="!isAdd||disabledForm.shangjiashijian?true:false"
								placeholder="请选择上架时间" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="歌名" prop="songname">
							<el-input class="list_inp" v-model="form.songname" placeholder="歌名"
								 type="text" 								:readonly="!isAdd||disabledForm.songname?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="音乐文件" prop="songfile">
							<uploads
								:disabled="!isAdd||disabledForm.songfile?true:false"
								type="file"
								action="file/upload" 
								tip="请上传音乐文件" 
								:limit="1" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.songfile?form.songfile:''" 
								@change="songfileUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="歌手" prop="singer">
							<el-input class="list_inp" v-model="form.singer" placeholder="歌手"
								 type="text" 								:readonly="!isAdd||disabledForm.singer?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="作词" prop="zuoci">
							<el-input class="list_inp" v-model="form.zuoci" placeholder="作词"
								 type="text" 								:readonly="!isAdd||disabledForm.zuoci?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="作曲" prop="zuoqu">
							<el-input class="list_inp" v-model="form.zuoqu" placeholder="作曲"
								 type="text" 								:readonly="!isAdd||disabledForm.zuoqu?true:false" />
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'yinlexinxi'
	const formName = '音乐信息'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		yinleleixing : false,
		biaoqian : false,
		gequfengmian : false,
		yuyanleibie : false,
		shangjiashijian : false,
		songname : false,
		songfile : false,
		singer : false,
		storeupnum : false,
		clicktime : false,
		clicknum : false,
		zuoci : false,
		zuoqu : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		yinleleixing: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		biaoqian: [
		],
		gequfengmian: [
		],
		yuyanleibie: [
		],
		shangjiashijian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		songname: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		songfile: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		singer: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		storeupnum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		clicktime: [
		],
		clicknum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		zuoci: [
		],
		zuoqu: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//音乐类型列表
	const yinleleixingLists = ref([])
	//标签列表
	const biaoqianLists = ref([])
	//歌曲封面上传回调
	const gequfengmianUploadSuccess=(e)=>{
		form.value.gequfengmian = e
	}
	//音乐文件上传回调
	const songfileUploadSuccess=(e)=>{
		form.value.songfile = e
	}
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			yinleleixing: '',
			biaoqian: '',
			gequfengmian: '',
			yuyanleibie: '',
			shangjiashijian: '',
			songname: '',
			songfile: '',
			singer: '',
			storeupnum: '0',
			clicktime: '',
			clicknum: '0',
			zuoci: '',
			zuoqu: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='yinleleixing'){
					form.value.yinleleixing = row[x];
					disabledForm.value.yinleleixing = true;
					continue;
				}
				if(x=='biaoqian'){
					form.value.biaoqian = row[x];
					disabledForm.value.biaoqian = true;
					continue;
				}
				if(x=='gequfengmian'){
					form.value.gequfengmian = row[x];
					disabledForm.value.gequfengmian = true;
					continue;
				}
				if(x=='yuyanleibie'){
					form.value.yuyanleibie = row[x];
					disabledForm.value.yuyanleibie = true;
					continue;
				}
				if(x=='shangjiashijian'){
					form.value.shangjiashijian = row[x];
					disabledForm.value.shangjiashijian = true;
					continue;
				}
				if(x=='songname'){
					form.value.songname = row[x];
					disabledForm.value.songname = true;
					continue;
				}
				if(x=='songfile'){
					form.value.songfile = row[x];
					disabledForm.value.songfile = true;
					continue;
				}
				if(x=='singer'){
					form.value.singer = row[x];
					disabledForm.value.singer = true;
					continue;
				}
				if(x=='storeupnum'){
					form.value.storeupnum = row[x];
					disabledForm.value.storeupnum = true;
					continue;
				}
				if(x=='clicktime'){
					form.value.clicktime = row[x];
					disabledForm.value.clicktime = true;
					continue;
				}
				if(x=='clicknum'){
					form.value.clicknum = row[x];
					disabledForm.value.clicknum = true;
					continue;
				}
				if(x=='zuoci'){
					form.value.zuoci = row[x];
					disabledForm.value.zuoci = true;
					continue;
				}
				if(x=='zuoqu'){
					form.value.zuoqu = row[x];
					disabledForm.value.zuoqu = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.storeupnum='0'
			form.value.clicknum='0'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
		})
		context?.$http({
			url: `option/yinleleixing/yinleleixing`,
			method: 'get'
		}).then(res=>{
			yinleleixingLists.value = res.data.data
		})
		context?.$http({
			url: `option/biaoqian/biaoqian`,
			method: 'get'
		}).then(res=>{
			biaoqianLists.value = res.data.data
		})
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		if(form.value.gequfengmian!=null) {
			form.value.gequfengmian = form.value.gequfengmian.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if(form.value.songfile!=null) {
			form.value.songfile = form.value.songfile.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								emit('formModelChange')
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						emit('formModelChange')
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border: 0px solid #cab298;
		border-radius: 0px;
		padding: 30px;
		margin: 0;
		background: #fff;
		// form item
		:deep(.el-form-item) {
			margin: 0 150px 20px 0;
			background: none;
			display: flex;
			//label
			.el-form-item__label {
			 background: none;
			 font-weight: 500;
			 display: block;
			 width: 150px;
			 min-width: 150px;
			 text-align: right;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 2px solid #cab298;
					border-radius: 0px;
					padding: 0 10px;
					background: none;
					width: auto;
					line-height: 40px;
					box-sizing: border-box;
					min-width: 250px;
					height: 40px;
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
				//日期选择器
				.list_date {
					border: 2px solid #cab298;
					border-radius: 0px;
					background: none;
					width: auto;
					line-height: 40px;
					box-sizing: border-box;
					min-width: 250px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 下拉框
				.list_sel {
					border: 2px solid #cab298;
					border-radius: 0px;
					padding: 0 10px;
					background: none;
					width: auto;
					line-height: 40px;
					box-sizing: border-box;
					min-width: 250px;
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
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
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
						margin: 7px 0 0;
						color: #666;
						display: flex;
						font-size: 14px;
						justify-content: flex-start;
						align-items: center;
					}
					//外部盒子
					.el-upload--picture-card {
						border: 2px solid #cab298;
						cursor: pointer;
						background-color: none;
						border-radius: 0px;
						width: 90px;
						line-height: 70px;
						text-align: center;
						height: 60px;
						//图标
						.el-icon{
							color: #999;
							font-size: 26px;
						}
					}
					.el-upload-list__item {
						border: 2px solid #cab298;
						cursor: pointer;
						background-color: none;
						border-radius: 0px;
						width: 90px;
						line-height: 70px;
						text-align: center;
						height: 60px;
					}
				}
				//文件上传样式
				.upload-demo {
					width: 100%;
					//外部盒子
					.el-upload-dragger {
						border: 2px solid #cab298;
						cursor: pointer;
						border-radius: 0px;
						overflow: hidden;
						background: none;
						width: 320px;
						box-sizing: border-box;
						text-align: center;
						height: auto;
					}
					//图标
					.el-icon--upload {
						margin: 0;
						color: #cab298;
						font-size: 48px;
						line-height: 48px;
					}
					//提示文字
					.el-upload__text {
						margin: 0px 0 0;
						color: #666;
						font-size: 14px;
						em {
							color: #333;
						}
					}
					//提示文字
					.el-upload__tip {
						margin: 0px 0 0;
						color: #666;
						font-size: 14px;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 0px;
			padding: 0 24px 0 24px;
			margin: 0 20px 0 0;
			color: #fff;
			background: #b3a491;
			width: auto;
			font-size: 16px;
			min-width: 120px;
			height: 40px;
		}
		.formModel_cancel:hover {
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 0px;
			padding: 0 24px 0 24px;
			margin: 0 20px 0 0;
			color: #fff;
			background: #95754e;
			width: auto;
			font-size: 16px;
			min-width: 120px;
			height: 40px;
		}
		.formModel_confirm:hover {
		}
	}
</style>