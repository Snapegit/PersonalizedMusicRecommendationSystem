const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/cl50106355/client/index.html'
        }
    },
    getProjectName(){
        return {
            projectName: "基于协同过滤算法的个性化音乐推荐系统"
        } 
    }
}
export default config
