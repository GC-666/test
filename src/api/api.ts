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
export class Market {
	// 市场
	static async findMarketList(params: any) {
		return await request("/market/new/findMarketList", params, "POST")
	}
	// 藏品市场
	static async show(params: any) {
		return await request("/Market/show", params, "POST")
	}
	// 寄售藏品详情
	static async details(params: any) {
		return await request("/Market/details", params, "POST")
	}
	// 获取市场分类
	static async classification(params: any) {
		return await request("/Market/classification", params, "POST")
	}
	// 盲盒二级市场
	static async findMarketBoxList(params: any) {
		return await request("/market/new/findMarketBoxList", params, "POST")
	}
	// 盲盒二级市场
	static async findMarketBoxItem(params: any) {
		return await request("/market/new/findMarketBoxItem", params, "POST")
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
	//我的藏品寄售提交
	static async collectionSell(params: any) {
		return await request("/Collection/sell", params, "POST")
	}
	//我的藏品取消寄售
	static async collectionWithdraw(params: any) {
		return await request("/Collection/withdraw", params, "POST")
	}
	//我的藏品查询转增人信息
	static async userNewMiniFindUserName(params: any) {
		return await request("/user/new/mini/findUserName", params, "POST")
	}
	//我的藏品查询转增	
	static async userNewMiniGive(params: any) {
		return await request("/user/new/mini/give", params, "POST")
	}
	//我的盲盒类型
	static async userBoxFindReportPageList(params: any) {
		return await request("/user/box/findReportPageList", params, "POST")
	}
	//我的盲盒类型详情
	static async userBoxFindPageList(params: any) {
		return await request("/user/box/findPageList", params, "POST")
	}
	//我的盲盒详情
	static async userBoxFindItem(params: any) {
		return await request("/user/box/findItem", params, "POST")
	}
	//我的盲盒寄售
	static async userBoxUpBox(params: any) {
		return await request("/user/box/upBox", params, "POST")
	}
	//我的盲盒取消寄售
	static async userBoxLowerShelfBox(params: any) {
		return await request("/user/box/LowerShelfBox", params, "POST")
	}
	//我的盲盒开启盲盒
	static async userBoxOpenBox(params: any) {
		return await request("/user/box/openBox", params, "POST")
	}
	//我的订单	
	static async orderFindPageList(params: any) {
		return await request("/order/findPageList", params, "POST")
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
	//获取个人信息
	static async personal(params: any) {
		return await request("/mine/personal", params, "POST")
	}
	//获取头像
	static async updateUserInfo(params: any) {
		return await request("/mine/updateUserInfo", params, "POST")
	}
	///实名认证
	static async addrealname(params: any) {
		return await request("/mine/addrealname", params, "POST")
	}
	//获取实名认证
	static async realname(params: any) {
		return await request("/mine/realname", params, "POST")
	}
	//资产
	static async Myassets(params: any) {
		return await request("/mine/Myassets", params, "POST")
	}
	//进入云钱包链接
	static async openSdCloudWallet(params: any) {
		return await request("/user/new/mini/openSdCloudWallet", params, "POST")
	}
	//开通云钱包
	static async openSdCloudWallet1(params: any) {
		return await request("/user/new/mini/openSdCloudWallet", params, "POST")
	}
	//修改支付密码
	static async updatetradepassword(params: any) {
		return await request("/mine/updatetradepassword", params, "POST")
	}
	//获取是否设置支付密码
	static async setup(params: any) {
		return await request("/mine/setup", params, "POST")
	}
	//获取银行卡信息
	static async Acsecurity(params: any) {
		return await request("/mine/Acsecurity", params, "POST")
	}
	//绑定银行卡
	static async aplPhone(params: any) {
		return await request("/mine/aplPhone", params, "POST")
	}
	//订单
	static async placeOrder(params: any) {
		return await request("/order/placeOrder", params, "POST")
	}
	//充值
	static async orderPay(params: any) {
		return await request("/order/orderPay", params, "POST")
	}
	//资金流水
	static async walletList(params: any) {
		return await request("/users/wallet/details/findList", params, "POST")
	}
	//积分
	static async integalList(params: any) {
		return await request("/users/integal/details/findList", params, "POST")
	}
	//开票记录
	static async findUserTicketRecord(params: any) {
		return await request("/ticket/findUserTicketRecord", params, "POST")
	}
	//订单查询
	static async find(params: any) {
		return await request("/order/find", params, "POST")
	}
	//订单取消
	static async orderCancel(params: any) {
		return await request("/order/cancel", params, "POST")
	}
	
	
}
// 活动
export class Activity {
	//合成列表
	static async composeFindList(params: any) {
		return await request("/compose/findList", params, "POST")
	}
	//合成详情
	static async composeFind(params: any) {
		return await request("/compose/find", params, "POST")
	}
	//合成
	static async composeCompose(params: any) {
		return await request("/compose/compose", params, "POST")
	}
	//夺宝
	static async lootFindItem(params: any) {
		return await request("/loot/findItem", params, "POST")
	}
	//夺宝抽奖
	static async lootLuckDraw(params: any) {
		return await request("/loot/luckDraw", params, "POST")
	}
	
}