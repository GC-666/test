<template>
</template>
<script setup>
	import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app"
	import { Ver } from "@/api/api.ts";
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新
	
	onShow(() => {
		//#ifdef APP-PLUS 
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			Ver.getEdition({
				
				edition_type: plus.runtime.appid,
				version_type: uni.getSystemInfoSync().platform, //android或者ios
				edition_number: inf.versionCode // 打包时manifest设置的版本号 
			}).then(res => {
				console.log(res.edition_number, inf.versionCode);
				if (Number(res.edition_number) > inf.versionCode &&
					Number(res.edition_issue) == 1) {
					if (Number(res.package_type) == 1 && Number(res.edition_silence) == 1) {
						silenceUpdate(res.edition_url)
					} else {
						uni.navigateTo({
							url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
								JSON.stringify(res)
						});
					}
				} else {
					// 如果是手动检查新版本 需开启以下注释
					/* uni.showModal({
					    title: '提示',
					    content: '已是最新版本',
					    showCancel: false
					}) */
				}
			})
		});
		//#endif    
	})
</script>
<style>
	@import './static/css/icon.css';
	/* #ifdef APP-NVUE */
	@import './tmui/scss/nvue.css';

	/* #endif */

	/* #ifndef APP-NVUE */
	@import './tmui/scss/noNvue.css';
	/* #endif */
	/* #ifdef H5 */
	body::-webkit-scrollbar,
	div::-webkit-scrollbar,
	*::-webkit-scrollbar {
		display: none;
	}

	body.pages-index-index uni-page-body,
	body {
		padding-bottom: 0 !important;

	}

	text {
		font-family: "sans-serif";
	}
	/* #endif */
	
</style>
