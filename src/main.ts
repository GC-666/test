
import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./xhui"
import App from "./App.vue";


export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.gonav = function(data:string) { // 页面跳转的事件\
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
