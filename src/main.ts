
import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
import DateUtils from "./utils/dateUtils";
export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.DateUtils = DateUtils
	app.config.globalProperties.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	// 自定义的颜色  和主题色 保持一致
	app.config.globalProperties.bgColor = "#07EBFE"
	// #ifdef H5
	let Captcha = new TencentCaptcha('190971740', (res: any) => {
		uni.$emit('getTicket', res);
	});
	app.config.globalProperties.$Captcha = Captcha
	// #endif
	app.config.globalProperties.gonav = function(data: string) { // 页面跳转的事件\
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		uni.navigateTo({
			url: '/' + data,
			success: function() {
				uni.hideLoading();
			},
			fail: function() {
				uni.hideLoading();
				uni.showToast({
					mask: true,
					icon: 'none',
					title: '暂无此功能',
					duration: 1000
				});
			}
		})
	}
	app.use(Pinia.createPinia());
	app.use(tmui)
	return {
		app,
		Pinia
	};
}

if (import.meta.env.MODE !== 'production') {
	//开发环境去除看一下效果
} else {
	//正式环境去除
	console.log = () => { }
}