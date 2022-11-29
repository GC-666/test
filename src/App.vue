<script setup>
	import { onLaunch, onShow } from "@dcloudio/uni-app"
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新

	onShow(() => {
		//#ifdef APP-PLUS 

		// 获取本地应用资源版本号
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			//获取服务器的版本号
			uni.request({
				url: 'http://192.168.0.106:8089/edition_manage/get_edition', //更新接口
				data: {
					edition_type: plus.runtime.appid,
					version_type: uni.getSystemInfoSync().platform, //android或者ios
					edition_number: inf.versionCode // 打包时manifest设置的版本号 
				},
				success: (res) => {
					if (Number(res.data.data.edition_number) > Number(inf.versionCode) && res
						.data.data.edition_issue == 1) {
						if (res.data.data.package_type == 1 && res.data.data.edition_silence ==
							1) {
							silenceUpdate(res.data.data.edition_url)
						} else {
							uni.navigateTo({
								url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
									JSON.stringify(res.data.data)
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
				}

			})

		});

		//#endif    
	})
</script>
<style>
	/* #ifdef APP-NVUE */
	@import './xhui/scss/nvue.css';

	/* #endif */

	/* #ifndef APP-NVUE */

	@import './xhui/scss/noNvue.css';

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
			url('iconfont.ttf?t=1669271503799') format('truetype');
	}

	.xh {
		font-family: "xh" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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

	.xh-xiaoxi:before {
		content: "\e603";
	}

	.xh-zhanghuqianbao:before {
		content: "\e604";
	}

	.xh-yunqianbao:before {
		content: "\e605";
	}

	.xh-dingdan:before {
		content: "\e606";
	}

	.xh-tuichu:before {
		content: "\e607";
	}

	.xh-kefu:before {
		content: "\e608";
	}

	.xh-zichan:before {
		content: "\e609";
	}

	.xh-shezhi:before {
		content: "\e60a";
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
