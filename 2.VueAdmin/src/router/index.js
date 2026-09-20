	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import yinleleixing from '@/views/yinleleixing/list'
	import biaoqian from '@/views/biaoqian/list'
	import yonghu from '@/views/yonghu/list'
	import discussyinlexinxi from '@/views/discussyinlexinxi/list'
	import yinlexinxi from '@/views/yinlexinxi/list'
	import yinlepingfen from '@/views/yinlepingfen/list'
	import storeup from '@/views/storeup/list'
	import config from '@/views/config/list'
	import wodegedan from '@/views/wodegedan/list'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页Home',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/news',
			name: '音乐资讯',
			component: news
		}
		,{
			path: '/yinleleixing',
			name: '音乐类型',
			component: yinleleixing
		}
		,{
			path: '/biaoqian',
			name: '标签',
			component: biaoqian
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/discussyinlexinxi',
			name: '音乐信息评论评论',
			component: discussyinlexinxi
		}
		,{
			path: '/yinlexinxi',
			name: '音乐信息',
			component: yinlexinxi
		}
		,{
			path: '/yinlepingfen',
			name: '音乐评分',
			component: yinlepingfen
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		,{
			path: '/wodegedan',
			name: '我的歌单',
			component: wodegedan
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
