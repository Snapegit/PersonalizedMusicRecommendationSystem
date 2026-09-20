<template>
	<div>
		<div class="home_box">
			<!-- 音乐信息推荐 -->
			<div class="recomList_view">
				<div class="recomList_title">音乐信息推荐</div>
				<div class="recommend_list_two">
					<mySwiper :data="yinlexinxiRecomList" :type="3"
						:loop="false"
						:navigation="true"
						:pagination="false"
						:paginationType="2"
						:scrollbar="false"
						:slidesPerView="5"
						:spaceBetween="20"
						:autoHeight="false"
						:centeredSlides="false"
						:freeMode="true"
						:effectType="0"
						:direction="horizontal"
						:autoplay="true"
						:slidesPerColumn="1">
						<template #default="scope">
							<div class="recommend_item animation_box" @click="detailClick('yinlexinxi',scope.row.id)">
								<div class="recommend_img_box">
									<img class="recommend_img" v-if="isHttp(scope.row.gequfengmian)" :src="scope.row.gequfengmian.split(',')[0]" alt="">
									<img class="recommend_img" v-else :src="scope.row.gequfengmian?$config.url + scope.row.gequfengmian.split(',')[0]:''" alt="">
								</div>
								<div class="recommend_content">
									<div class='recommend_title'>
										{{scope.row.songname}}
									</div>
									<div class='recommend_title'>
										歌手：{{scope.row.singer}}
									</div>
								</div>
							</div>
						</template>
					</mySwiper>
				</div>
				<div class="recommend_more_view" @click="moreClick('yinlexinxi')">
					<span class="recommend_more_text">查看更多</span>
					<el-icon><DArrowRight /></el-icon>
				</div>
			</div>
			<!-- 音乐资讯 -->
			<div class="newsList_view">
				<div class="newsList_title">音乐资讯</div>
				<div class="news_list_four">
					<div class="news_left">
						<template v-for="(item,index) in newsList" :key="index">
							<div class="four_left_item animation_box" v-if="index<4" @click="newsDetailClick(item.id)">
								<div class="time_box">
									<div class="date">{{item.addtime.split(' ')[0].split('-')[1]}}/{{item.addtime.split(' ')[0].split('-')[2]}}</div>
									<div class="year">{{item.addtime.split(' ')[0].split('-')[0]}}</div>
								</div>
								<div class="content">
									<div class="news_title">{{item.title}}</div>
									<div class="news_text">{{item.introduction}}</div>
								</div>
							</div>
						</template>
					</div>
					<div class="news_right">
						<template v-for="(item,index) in newsList" :key="index" @click="newsDetailClick(item.id)">
							<div class="four_right_item animation_box" v-if="index>3">
								<div class="img_box">
									<img class="news_img" v-if="isHttp(item.picture)" :src="item.picture.split(',')[0]" alt="">
									<img class="news_img" v-else :src="item.picture?$config.url + item.picture.split(',')[0]:''" alt="">
								</div>
								<div class="content">
									<div class="news_title">{{item.title}}</div>
								</div>
							</div>
						</template>
					</div>
				</div>
				<div class="news_more_view" @click="moreClick('news')">
					<span class="news_more_text">更多</span>
					<el-icon><DArrowRight /></el-icon>
				</div>
			</div>
		</div>
		<formModel ref="newsFormModelRef"></formModel>
	</div>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue';
	import {
		useRouter
	} from 'vue-router';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
	//音乐信息推荐
	const yinlexinxiRecomList = ref([])
	const getyinlexinxiRecomList = () => {
		let autoSortUrl = 'yinlexinxi/autoSort'
		if(context?.$toolUtil.storageGet('frontToken')){
			autoSortUrl = "yinlexinxi/autoSort2"
		}
		context?.$http({
			url: autoSortUrl,
			method: 'get',
			params: {
				page: 1,
				limit: 4
			}
		}).then(res => {
			yinlexinxiRecomList.value = res.data.data.list
		})
	}
	//音乐资讯弹窗
	import formModel from './news/formModel'
	const newsFormModelRef = ref(null)
	//音乐资讯
	const newsList = ref([])
	const getNewsList = () => {
		context?.$http({
			url: 'news/list',
			method: 'get',
			params:{
				page:1,
				limit: 5
			}
		}).then(res=>{
			newsList.value = res.data.data.list
		})
	}
	const newsDetailClick = (id=null) => {
		if (id){
			newsFormModelRef.value.init(id)
		}
	}
	//判断图片链接是否带http
	const isHttp = (str) => {
        return str && str.substr(0,4)=='http';
    }
	//跳转详情
	const detailClick = (table,id) => {
		router.push(`/index/${table}Detail?id=${id}`)
	}
	const moreClick = (table) => {
		router.push(`/index/${table}List`)
	}
	const init = () => {
		//音乐信息推荐
		getyinlexinxiRecomList()
		//音乐资讯
		getNewsList()
	}
	init()
</script>

<style lang="scss">
	.home_box {
		border-radius: 4px;
		padding: 0px;
		margin: 0 auto;
		background: none;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	
	// 推荐
	.recomList_view {
		padding: 40px calc((100% - 1200px)/2) 60px;
		margin: 0px auto 0;
		background: #fff;
		width: 100%;
		position: relative;
		order: 0;
		.recomList_title {
			padding: 0 0 0 16px;
			margin: 0;
			color: #7f00ff;
			background: url(http://clfile.zggen.cn/20240314/5ca03d8a66a44982bb2f0f5852380ebd.png) repeat-x center bottom;
			font-weight: 600;
			width: 100%;
			font-size: 20px;
			border-color: #666;
			border-width: 0 0 0px;
			line-height: 60px;
			border-style: solid;
			text-align: left;
		}
		// list
		.recommend_list_two {
			padding: 0 20px;
			margin: 30px 0 0;
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			.recommend_item {
				cursor: pointer;
				margin: 0;
				background: none;
				width: 100%;
				.recommend_img_box {
					margin: 0 0 6px;
					width: 100%;
					height: 200px;
					.recommend_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.recommend_content {
					.recommend_title {
						overflow: hidden;
						color: #333;
						white-space: nowrap;
						background: none;
						font-weight: 500;
						width: 100%;
						font-size: 14px;
						line-height: 24px;
						text-overflow: ellipsis;
						text-align: left;
					}
					.recommend_price {
						color: #c00;
						font-weight: 500;
						width: 100%;
						font-size: 14px;
						line-height: 1;
						text-align: right;
					}
				}
			}
		}
		// list
		// animation
		.animation_box {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		.animation_box img {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box img:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		// animation
		// 更多
		.recommend_more_view {
			cursor: pointer;
			border: 0px solid #ddd;
			padding: 0;
			margin: 0;
			color: #333;
			line-height: 38px;
			right: calc((100% - 1200px)/2 + 20px);
			border-radius: 0px;
			top: 50px;
			background: none;
			width: 89px;
			position: absolute;
			text-align: right;
			height: 38px;
			.recommend_more_text {
				color: #e100ff;
			}
			.el-icon {
				color: #e100ff;
			}
		}
	}
	// 推荐
	// 新闻资讯
	.newsList_view {
		padding: 40px calc((100% - 1200px)/2)  60px;
		margin: 0 auto;
		background: url(http://clfile.zggen.cn/20240313/4f653787cb5d42f9b3bc30c0fcd53fee.gif),#f3f8f4;
		width: calc(100% - 0px);
		border-color: #ddd;
		border-width: 1px 0;
		position: relative;
		border-style: solid;
		order: 3;
		height: auto;

		.newsList_title {
			padding: 0 0 0 16px;
			margin: 0 auto 20px;
			color: #7f00ff;
			background: url(http://clfile.zggen.cn/20240314/5ca03d8a66a44982bb2f0f5852380ebd.png) repeat-x center bottom;
			font-weight: 600;
			width: 100%;
			font-size: 20px;
			border-color: #666;
			border-width:  0 0 0px;
			line-height: 60px;
			border-style: solid;
			text-align: left;
		}
		// list
		.news_list_four {
			padding: 0;
			margin: 40px 0 0;
			display: flex;
			width: 100%;
			justify-content: space-between;
			.news_left {
				flex-direction: column;
				display: flex;
				width: 50%;
				justify-content: space-between;
				align-items: flex-start;
				order: 2;
				.four_left_item{
					border: 0px dotted rgba(136, 179, 1,.5);
					cursor: pointer;
					border-radius: 8px;
					padding: 10px 20px 10px;
					margin: 0 0 20px;
					background: rgba(255,255,255,.3);
					display: flex;
					width: 100%;
					align-items: center;
					.time_box {
						border-radius: 4px;
						padding: 10px;
						background: linear-gradient(to right, #7f00ff, #e100ff);
						display: flex;
						width: 120px;
						align-items: flex-start;
						flex-wrap: wrap;
						.year{
							padding: 6px 0 0;
							color: #fff;
							width: 100%;
							line-height: 1;
							text-align: center;
						}
						.date{
							color: #fff;
							font-weight: bold;
							width: 100%;
							font-size: 24px;
							line-height: 1;
							text-align: center;
						}
					}
				}
				.content{
					margin: 0 0 0 10px;
					width: calc(100% - 130px);
					.news_title{
						overflow: hidden;
						white-space: nowrap;
						font-weight: bold;
						width: 100%;
						text-overflow: ellipsis;
					}
					.news_text{
						padding: 0;
						overflow: hidden;
						display: -webkit-box;
						line-height: 24px;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						height: 48px;
					}
				}
				
			}
			.news_right {
				margin: 0 20px 0 0;
				width: calc(50% - 20px);
				.four_right_item {
					cursor: pointer;
					margin: 0 0 0px;
					.img_box {
					width: 100%;
					font-size: 0;
					height: 480px;
						.news_img {
					border-radius: 8px;
					object-fit: cover;
					width: 100%;
					height: 100%;
						}
					}
					.content {
						width: 100%;
						text-align: center;
						.news_title {
							overflow: hidden;
							white-space: nowrap;
							width: 100%;
							font-size: 14px;
							line-height: 30px;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
		// list
		// animation
		.animation_box {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(10px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		.animation_box img {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box img:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		// animation
		// 更多
		.news_more_view {
			cursor: pointer;
			border: 0px solid #ddd;
			padding: 0px 0;
			margin: 0;
			color: #5d8e00;
			line-height: 38px;
			right: calc((100% - 1200px)/2 + 20px);
			border-radius: 0px;
			top: 50px;
			background: none;
			width: 89px;
			position: absolute;
			text-align: right;
			height: 38px;
			.news_more_text {
				color: #e100ff;
			}
			.el-icon {
				color: #e100ff;
			}
		}
	}
	// 新闻资讯
	// 首页展示
	.homeList_view {
		padding: 40px calc((100% - 1200px)/2) 0px;
		margin: 0;
		background: #fff;
		width: 100%;
		position: relative;
		order: 2;

		.homeList_title {
			padding: 0 0 0 16px;
			margin: 0 0 30px;
			color: #7f00ff;
			background: url(http://clfile.zggen.cn/20240314/5ca03d8a66a44982bb2f0f5852380ebd.png) repeat-x center bottom;
			font-weight: 600;
			width: 100%;
			font-size: 24px;
			border-color: #666;
			border-width: 0 0 0px;
			line-height: 60px;
			border-style: solid;
			text-align: left;
		}
		// list
		.home_list_five {
			display: flex;
			width: 100%;
			align-items: flex-start;
			flex-wrap: wrap;
			.home_list_five_item1 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(25% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item1:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item2 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(50% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item2:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item3 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(25% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item3:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item4 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(25% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item4:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item5 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(50% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item5:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item6 {
				padding: 10px;
				margin: 0 10px 10px;
				background: #fff;
				width: calc(25% - 20px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item6:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item7 {
				padding: 0px;
				margin: 0 5px 10px;
				background: #fff;
				display: none;
				width: calc(25% - 10px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						box-shadow: 0px 16px 16px -16px #000;
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item7:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
			.home_list_five_item8 {
				padding: 0px;
				margin: 0 5px 10px;
				background: none;
				display: none;
				width: calc(25% - 10px);
				.img_box {
					object-fit: cover;
					width: 100%;
					height: 360px;
					.home_img {
						box-shadow: 0px 16px 16px -16px #000;
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.homeList_content {
					padding: 10px;
					background: none;
					display: flex;
					flex-wrap: wrap;
					.homeList_title1 {
						width: 100%;
						text-align: center;
					}
					.homeList_title2 {
						width: 100%;
						text-align: center;
					}
					.homeList_title3 {
						width: 100%;
						text-align: center;
					}
					.homeList_title4 {
						width: 100%;
						text-align: center;
					}
					.homeList_title5 {
						width: 100%;
						text-align: center;
					}
				}
			}
			.home_list_five_item8:hover {
				cursor: pointer;
				padding: 10px;
				background: linear-gradient(to right, #7f00ff, #e100ff);
				transition: all 0s;
				.img_box {
					.home_img {
					}
				}
				.homeList_content {
					color: #fff;
					width: 100%;
					height: 100%;
					.homeList_title1 {
						color: inherit;
					}
					.homeList_title2 {
						color: inherit;
					}
					.homeList_title3 {
						color: inherit;
					}
					.homeList_title4 {
						color: inherit;
					}
					.homeList_title5 {
						color: inherit;
					}
				}
			}
		}
		// list
		// animation
		.animation_box {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		.animation_box img {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			z-index: initial;
		}
		.animation_box img:hover {
			transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			-webkit-perspective: 1000px;
			perspective: 1000px;
			transition: 0.3s;
		}
		// animation
		// 更多
		.homeList_more_view {
			cursor: pointer;
			border: 0px solid #ddd;
			padding: 0;
			margin: 0;
			z-index: 9;
			color: #fff;
			line-height: 38px;
			right: calc((100% - 1200px)/2 + 20px);
			border-radius: 0px;
			top: 50px;
			background: none;
			width: 89px;
			position: absolute;
			text-align: right;
			height: 38px;
			.homeList_more_text {
				color: #e100ff;
			}
		}
	}
	// 首页展示
</style>