<template>
	<div class="home_view">
		<div class="projectTitle">欢迎使用 {{projectName}}</div>
		<div class="count_list">
			<el-collapse-transition v-if="btnAuth('yinlexinxi','首页总数')">
				<el-card v-show="countTypeList.closeyinlexinxiCountType" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								音乐信息
							</div>
							<div class="card_head_right">
								<el-icon @click="countTypeClick('hiddenyinlexinxiCountType')" class="showIcons"
									:class="countTypeList.hiddenyinlexinxiCountType?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="countTypeClick('closeyinlexinxiCountType')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
							
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenyinlexinxiCountType">
							<div class="count_title">音乐信息总数</div>
							<div class="count_num">{{yinlexinxiCount}}</div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
		<div class="card_list">
			<el-collapse-transition v-if="btnAuth('yinlexinxi','首页统计')">
				<el-card v-show="cardTypeList.closeyinlexinxiChartType1" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								音乐信息
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyinlexinxiChartType1')" class="showIcons"
									:class="cardTypeList.hiddenyinlexinxiChartType1?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyinlexinxiChartType1')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyinlexinxiChartType1">
							<div id="yinlexinxiyinleleixingEchart1" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('yinlexinxi','首页统计')">
				<el-card v-show="cardTypeList.closeyinlexinxiChartType2" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								音乐信息
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyinlexinxiChartType2')" class="showIcons"
									:class="cardTypeList.hiddenyinlexinxiChartType2?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyinlexinxiChartType2')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyinlexinxiChartType2">
							<div id="yinlexinxibiaoqianEchart2" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('yinlexinxi','首页统计')">
				<el-card v-show="cardTypeList.closeyinlexinxiChartType3" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								音乐信息
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyinlexinxiChartType3')" class="showIcons"
									:class="cardTypeList.hiddenyinlexinxiChartType3?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyinlexinxiChartType3')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyinlexinxiChartType3">
							<div id="yinlexinxistoreupnumEchart3" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('yinlexinxi','首页统计')">
				<el-card v-show="cardTypeList.closeyinlexinxiChartType4" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								音乐信息
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyinlexinxiChartType4')" class="showIcons"
									:class="cardTypeList.hiddenyinlexinxiChartType4?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyinlexinxiChartType4')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyinlexinxiChartType4">
							<div id="yinlexinxiclicknumEchart4" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closeyinlexinxiCountType = true
		countTypeList.value.hiddenyinlexinxiCountType = true
		if(btnAuth('yinlexinxi','首页总数')){
			getyinlexinxiCount()
		}
	}
	const yinlexinxiCount = ref(0)
	const getyinlexinxiCount = () => {
		context?.$http({
			url:'yinlexinxi/count',
			method: 'get'
		}).then(res=>{
			yinlexinxiCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	const init=()=>{
		getCountList()
		getCardList()
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	let echarts = inject("echarts")
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getCardList()
		},1000)
	}
	const cardTypeList = ref({
		closeyinlexinxiChartType1: true,
		hiddenyinlexinxiChartType1: true,
		closeyinlexinxiChartType2: true,
		hiddenyinlexinxiChartType2: true,
		closeyinlexinxiChartType3: true,
		hiddenyinlexinxiChartType3: true,
		closeyinlexinxiChartType4: true,
		hiddenyinlexinxiChartType4: true,
	})
	const getCardList = () => {
		if(btnAuth('yinlexinxi','首页统计')){
			getyinlexinxiChart1()
		}
		if(btnAuth('yinlexinxi','首页统计')){
			getyinlexinxiChart2()
		}
		if(btnAuth('yinlexinxi','首页统计')){
			getyinlexinxiChart3()
		}
		if(btnAuth('yinlexinxi','首页统计')){
			getyinlexinxiChart4()
		}
	}
	const getyinlexinxiChart1 = () => {
		nextTick(()=>{
			var yinleleixingEchart1 = echarts.init(document.getElementById("yinlexinxiyinleleixingEchart1"),'macarons');
			context?.$http({
				url: "yinlexinxi/group/yinleleixing",
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].yinleleixing);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].yinleleixing
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '音乐类型',
                        left: 'center'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    tooltip: {
						trigger: 'item',
						formatter: '{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: pArray,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
				yinleleixingEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				yinleleixingEchart1.setOption(option);
				//根据窗口的大小变动图表
				yinleleixingEchart1.resize();
			})
		})
	}
	const getyinlexinxiChart2 = () => {
		nextTick(()=>{
			var biaoqianEchart2 = echarts.init(document.getElementById("yinlexinxibiaoqianEchart2"),'macarons');
			context?.$http({
				url: "yinlexinxi/group/biaoqian",
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].biaoqian);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].biaoqian
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '标签',
                        left: 'center'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    tooltip: {
						trigger: 'item',
						formatter: '{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['25%', '55%'],
                            center: ['50%', '60%'],
                            data: pArray,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
				// 使用刚指定的配置项和数据显示图表。
				biaoqianEchart2.clear()
				biaoqianEchart2.setOption(option);
				//根据窗口的大小变动图表
				biaoqianEchart2.resize();
			})
		})
	}
	const getyinlexinxiChart3 = () => {
		nextTick(()=>{
        //  storeupnum
			var storeupnumEchart3 = echarts.init(document.getElementById("yinlexinxistoreupnumEchart3"),'macarons');
			context?.$http({
				url: `yinlexinxi/value/songname/storeupnum`,
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].songname);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].songname
				    })
				}
				var option = {};
				option = {
				    title: {
				        text: '收藏量分析',
				        left: 'center'
				    },
				    tooltip: {
				      trigger: 'item',
				      formatter: '{b} : {c}'
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: xAxis
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: yAxis,
				        type: 'line',
                    }]
                };
				// 使用刚指定的配置项和数据显示图表。
				storeupnumEchart3.clear()
				storeupnumEchart3.setOption(option);
				//根据窗口的大小变动图表
				storeupnumEchart3.resize();
			})
		})
	}
	const getyinlexinxiChart4 = () => {
		nextTick(()=>{
        //  clicknum
			var clicknumEchart4 = echarts.init(document.getElementById("yinlexinxiclicknumEchart4"),'macarons');
			context?.$http({
				url: `yinlexinxi/value/songname/clicknum`,
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].songname);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].songname
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '点击量分析',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            rotate: 40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
				// 使用刚指定的配置项和数据显示图表。
				clicknumEchart4.clear()
				clicknumEchart4.setOption(option);
				//根据窗口的大小变动图表
				clicknumEchart4.resize();
			})
		})
	}
	init()
</script>
<style lang="scss">
	.projectTitle{
		padding: 20px 0;
		margin: 20px 0 20px;
		color: #333;
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 30px;
		justify-content: center;
		align-items: center;
		height: auto;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
	
	// 总数盒子
	.count_list{
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 总数card
		.card_view {
			border: 0px solid #fccb8250;
			border-radius: 0;
			box-shadow: 0px 0px 0px rgba(0,0,0,.12);
			margin: 0 1% 20px;
			width: 23%;
			box-sizing: border-box;
			height: auto;
			// card头部
			.el-card__header {
				border: 0px solid #eee;
				background: rgba(202,178,152,.8);
				width: 100%;
				border-width: 0 0 0px;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					height: 10px;
					// 标题
					.card_head_title {
						color: #333;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon {
							cursor: pointer;
							color: #333;
							font-size: 20px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px;
				border-style: solid;
				// body盒子
				.count_item{
					padding: 30px;
					flex-direction: column;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					// 总数标题
					.count_title{
						margin: 0 0px 0 0;
						color: #333;
						font-weight: 500;
						display: inline-block;
						font-size: 16px;
						line-height: 1.5;
					}
					// 总数数字
					.count_num{
						color: #c00;
						font-weight: 600;
						display: inline-block;
						font-size: 26px;
						line-height: 1.5;
					}
				}
			}
		}
	}
	// 首页盒子
	.home_view {
		padding: 0px 20px;
		margin: 0;
		background: url(http://clfile.zggen.cn/20240420/cb8682e85aa14fc1901a6f5295c15cde.png) no-repeat center top / 100% 100% !important;
		width: 100%;
		min-height: 100vh;
		height: auto;
	}
	// 统计图盒子
	.card_list {
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		// 统计图card
		.card_view {
			border: 0px solid #fccb8250;
			border-radius: 0;
			box-shadow: 0px 0px 0px rgba(0,0,0,.12);
			margin: 10px;
			width: calc(33.33% - 20px);
			box-sizing: border-box;
			height: auto;
			// 头部
			.el-card__header {
				border: 0px solid #eee;
				background: rgba(202,178,152,.8);
				width: 100%;
				border-width: 0 0 0px;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					height: 10px;
					// 标题
					.card_head_title {
						color: #333;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon{
							cursor: pointer;
							color: #333;
							font-size: 20px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px;
				border-style: solid;
				// body盒子
				.card_item{
					padding: 10px;
					text-align: center;
				}
			}
		}
	}
</style>
