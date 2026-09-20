import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views'
import home from '../views/pages/home.vue'
import login from '../views/pages/login.vue'
import yonghuList from '@/views/pages/yonghu/list'
import yonghuDetail from '@/views/pages/yonghu/formModel'
import yonghuAdd from '@/views/pages/yonghu/formAdd'
import yonghuRegister from '@/views/pages/yonghu/register'
import yonghuCenter from '@/views/pages/yonghu/center'
import storeupList from '@/views/pages/storeup/list'
import yinleleixingList from '@/views/pages/yinleleixing/list'
import yinleleixingDetail from '@/views/pages/yinleleixing/formModel'
import yinleleixingAdd from '@/views/pages/yinleleixing/formAdd'
import biaoqianList from '@/views/pages/biaoqian/list'
import biaoqianDetail from '@/views/pages/biaoqian/formModel'
import biaoqianAdd from '@/views/pages/biaoqian/formAdd'
import yinlexinxiList from '@/views/pages/yinlexinxi/list'
import yinlexinxiDetail from '@/views/pages/yinlexinxi/formModel'
import yinlexinxiAdd from '@/views/pages/yinlexinxi/formAdd'
import wodegedanList from '@/views/pages/wodegedan/list'
import wodegedanDetail from '@/views/pages/wodegedan/formModel'
import wodegedanAdd from '@/views/pages/wodegedan/formAdd'
import yinlepingfenList from '@/views/pages/yinlepingfen/list'
import yinlepingfenDetail from '@/views/pages/yinlepingfen/formModel'
import yinlepingfenAdd from '@/views/pages/yinlepingfen/formAdd'
import newsList from '@/views/pages/news/list'

const routes = [{
		path: '/',
		redirect: '/index/home'
	},
	{
		path: '/index',
		component: index,
		children: [{
			path: 'home',
			component: home
		}
		, {
			path: 'yonghuList',
			component: yonghuList
		}, {
			path: 'yonghuDetail',
			component: yonghuDetail
		}, {
			path: 'yonghuAdd',
			component: yonghuAdd
		}
		, {
			path: 'yonghuCenter',
			component: yonghuCenter
		}
		, {
			path: 'storeupList',
			component: storeupList
		}
		, {
			path: 'yinleleixingList',
			component: yinleleixingList
		}, {
			path: 'yinleleixingDetail',
			component: yinleleixingDetail
		}, {
			path: 'yinleleixingAdd',
			component: yinleleixingAdd
		}
		, {
			path: 'biaoqianList',
			component: biaoqianList
		}, {
			path: 'biaoqianDetail',
			component: biaoqianDetail
		}, {
			path: 'biaoqianAdd',
			component: biaoqianAdd
		}
		, {
			path: 'yinlexinxiList',
			component: yinlexinxiList
		}, {
			path: 'yinlexinxiDetail',
			component: yinlexinxiDetail
		}, {
			path: 'yinlexinxiAdd',
			component: yinlexinxiAdd
		}
		, {
			path: 'wodegedanList',
			component: wodegedanList
		}, {
			path: 'wodegedanDetail',
			component: wodegedanDetail
		}, {
			path: 'wodegedanAdd',
			component: wodegedanAdd
		}
		, {
			path: 'yinlepingfenList',
			component: yinlepingfenList
		}, {
			path: 'yinlepingfenDetail',
			component: yinlepingfenDetail
		}, {
			path: 'yinlepingfenAdd',
			component: yinlepingfenAdd
		}
		, {
			path: 'newsList',
			component: newsList
		}
		]
	},
	{
		path: '/login',
		component: login
	}
	,{
		path: '/yonghuRegister',
		component: yonghuRegister
	}
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
