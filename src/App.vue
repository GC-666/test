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
	@font-face {
		font-family: "xh";
		/* Project id 3786410 */
		/* Color fonts */
		src:
			url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
			url('iconfont.ttf?t=1670920425303') format('truetype');
	}

	.xh {
		font-family: "xh" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.xh-jiaoyizhong-copy:before {
		content: "\e61a";
	}

	.xh-dingdan:before {
		content: "\e615";
	}


	.xh-zichan:before {
		content: "\e616";
	}

	.xh-kefu:before {
		content: "\e617";
	}

	.xh-shezhi:before {
		content: "\e618";
	}

	.xh-xiaoxi:before {
		content: "\e619";
	}

	.xh-daishenhe:before {
		content: "\e613";
	}

	.xh-weishiming:before {
		content: "\e611";
	}

	.xh-yishiming:before {
		content: "\e612";
	}

	.xh-gantanhaozhong:before {
		content: "\e8e5";
	}

	.xh-remen:before {
		content: "\e7fd";
	}

	.xh-bonus-line:before {
		content: "\e649";
	}

	.xh-yinlian:before {
		content: "\e68b";
	}

	.xh-zhanghuqianbao:before {
		content: "\e604";
	}

	.xh-yunqianbao:before {
		content: "\e605";
	}

	.xh-bianhao:before {
		content: "\e60b";
	}

	.xh-bukecuangai:before {
		content: "\e60c";
	}

	.xh-cunzheng:before {
		content: "\e60d";
	}

	.xh-kexin:before {
		content: "\e60e";
	}
</style>
