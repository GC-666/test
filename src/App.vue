<script setup>
	import { onLaunch, onShow } from "@dcloudio/uni-app"
	import { Ver } from "@/api/api.ts";
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新
	onLaunch(() => {
		// Ver.find().then(res => {
		// 	if (res === '1') {
		// 		uni.hideTabBar()
		// 	}
		// })
	})
	onShow(() => {
		//#ifdef APP-PLUS 
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			Ver.getEdition({
				edition_type: plus.runtime.appid,
				version_type: uni.getSystemInfoSync().platform, //android或者ios
				edition_number: inf.versionCode // 打包时manifest设置的版本号 
			}).then(res => {
				if (Number(res.edition_number) > Number(inf.versionCode) &&
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
	  font-family: "xh"; /* Project id 3786410 */
	  /* Color fonts */
	  src: 
	       url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	       url('iconfont.ttf?t=1670650756482') format('truetype');
	}
	
	.xh {
	  font-family: "xh" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
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
	
	.xh-jiaoyizhong:before {
	  content: "\e610";
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
