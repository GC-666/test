//封装api接口
import { request } from './request.ts';
//导出模块
/* 页面使用
 import {User} from './api.js';
 User.login()
 */
export class Home {
	// 导出方法
	// 轮播图
	static async bannerList(params: any) {
		return await request("/Home/bannerList", params, "POST")
	}
	// 轮播图详情
	static async bannerdetails(params: any) {
		return await request("/Home/bannerdetails", params, "POST")
	}
	// 公告
	static async findPageList(params: any) {
		return await request("/notice/findPageList", params, "POST")
	}
	// 首发藏品
	static async findSaleCollectionList(params: any) {
		return await request("/home/new/findSaleCollectionList", params, "POST")
	}
	// 首发盲盒
	static async findSaleBoxList(params: any) {
		return await request("/home/new/findSaleBoxList", params, "POST")
	}
	// 公告中心 综合公告
	static async findSynthesizeList(params: any) {
		return await request("/notice/findSynthesizeList", params, "POST")
	}
	// 公告中心 每一个公告
	static async noticeList(params: any) {
		return await request("/notice/findPageList", params, "POST")
	}
	// 公告 详情
	static async noticeFindItem(params: any) {
		return await request("/notice/findItem", params, "POST")
	}
	// 藏品 详情
	static async findSaleCollectionItem(params: any) {
		return await request("/home/new/findSaleCollectionItem", params, "POST")
	}
	// 盲盒 详情
	static async findSaleBoxItem(params: any) {
		return await request("/home/new/findSaleBoxItem", params, "POST")
	}
}

// 市场
export class market {
	// 轮播图
	static async bannerList(params: any) {
		return await request("/Home/bannerList", params, "POST")
	}
}

//我的
export class My {
	// 登陆
	static async login(params: any) {
		return await request("/user/login", params, "POST")
	}
	//注册
	static async reg(params: any) {
		return await request("/user/reg", params, "POST")
	}
	//修改密码
	static async resetPwd(params: any) {
		return await request("/user/reset/pwd", params, "POST")
	}
	//获取用户信息
	static async mine(params: any) {
		return await request("/mine/mine", params, "POST")
	}
	//我的藏品类型
	static async mineFindCollReport(params: any) {
		return await request("/mine/findCollReport", params, "POST")
	}
	//藏品记录
	static async userRecrodFindCollPageList(params: any) {
		return await request("/user/recrod/findCollPageList", params, "POST")
	}
	//我的藏品类型详情
	static async userCollectionFindPageList(params: any) {
		return await request("/user/collection/findPageList", params, "POST")
	}
	//我的藏品详情
	static async collectionDetails(params: any) {
		return await request("/Collection/details", params, "POST")
	}
	//我的藏品寄售服务费和云钱包
	static async orderFindMySellServiceCharge(params: any) {
		return await request("/order/findMySellServiceCharge", params, "POST")
	}
	//盲盒
	static async userBoxFindCollPageList(params: any) {
		return await request("/user/box/findReportPageList", params, "POST")
	}
	//验证码
	static async sendCode(params: any) {
		return await request("/system/get/verification/code", params, "POST")
	}
	 //邀请排行
	static async ranking(params: any) {
		return await request("/activity/ranking", params, "POST")
	} 
	//邀请排行
	static async MyInvitation(params: any) {
		return await request("/activity/MyInvitation", params, "POST")
	}
	//可开票订单
	static async findOpenTicketForOrder(params: any) {
		return await request("/ticket/findOpenTicketForOrder", params, "POST")
	}
	
	
}
// 活动
export class activity {
	// 轮播图
	static async bannerList(params: any) {
		return await request("/Home/bannerList", params, "POST")
	}
}