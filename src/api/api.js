import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "http://localhost:8087"

// get请求
export default{
	queryAll(params){
    	return http.get(`${resquest}/shop/queryAll.do`,params)
	},
	 postFormAPI(params){
    	return http.post(`${resquest}/Login/login.do`,params)
	}
}