const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
			menuList:[
				{
					name: '歌曲信息管理',
					icon: '${frontMenu.fontClass}',
					child:[
						{
							name:'音乐信息',
							url:'/index/yinlexinxiList'
						},
					]
				},
				{
					name: '新闻资讯管理',
					icon: '${frontMenu.fontClass}',
					child:[
						{
							name:'音乐资讯',
							url:'/index/newsList'
						},
					]
				},
			]
        }
    },
    getProjectName(){
        return {
            projectName: "基于协同过滤算法的个性化音乐推荐系统"
        } 
    }
}
export default config
