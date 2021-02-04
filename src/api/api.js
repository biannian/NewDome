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
	getLimit(){
		return http.get(`${resquest}/Login/getLimit.do`)
	},
	shopQueryById(params){
		return http.get(`${resquest}/shop/queryById.do`,params)
	},
	selectShop(params){
		return http.get(`${resquest}/shop/queryByName.do`,params)
	},
	 accountQueryAll(){
    	return http.get(`${resquest}/Login/queryAll.do`)
	},
	accountDelete(params){
		return http.get(`${resquest}/Login/accountDelete.do`,params)
	},
	queryByName(params){
		return http.get(`${resquest}/Login/queryByName.do`,params)
	},
	updatePassword(params){
		return http.get(`${resquest}/Login/updatePassword.do`,params)
	},
	queryAllCommodity(params){
		return http.get(`${resquest}/shop/queryAllCommodity.do`,params)
	},
	delectCommodity(params){
		return http.get(`${resquest}/shop/delectCommodity.do`,params)
	},
	addOrder(params){
		return http.post(`${resquest}/Order/addOrder.do`,params)
	},
	deleteOrder(params){
		return http.get(`${resquest}/Order/deleteOrder.do`,params)
	},
	updateState(params){
		return http.post(`${resquest}/Order/updateState.do`,params)
	},
	selectOrder(params){
		return http.get(`${resquest}/Order/selectOrder.do`,params)
	},
	getBuyerAddress(params){
		return http.get(`${resquest}/Buyer/getBuyerAddress.do`,params)
	},
	updateAddress(params){
		return http.post(`${resquest}/Buyer/updateAddress.do`,params)
	},
	selectMenu(params){
		return http.post(`${resquest}/shop/selectMenu.do`,params)
	},
}