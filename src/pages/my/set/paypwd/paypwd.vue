<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar title="重设密码">
		</tm-navbar>
		<tm-form @submit="confirm" v-model="show" transprent>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入手机号',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入手机号" :inputPadding="[0,0]" v-model="show.phone" :transprent="true"
					:showBottomBotder="false">
					<template v-slot:right>
						<tm-button @click="btn" :disabled="smsShow" :width="140" :height="40" :margin="[0, 0]"
							:padding="[10, 2]" size="small" :shadow="0" :label="codeText"></tm-button>
					</template>
				</tm-input>

			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入验证码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入验证码" :inputPadding="[0,0]" v-model="show.code" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'输入支付密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入您的支付密码" :password="true" :inputPadding="[0,0]" v-model="show.newTradePassWord"
					:transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'确认支付密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入您的支付密码" :password="true" :inputPadding="[0,0]" v-model="show.newTradePassWord2"
					:transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="确认修改"></tm-button>

		</tm-form>

	</tm-app>
</template>
<script setup>
	import { My } from "@/api/api.ts"
	import {
		reactive,
		ref,
		getCurrentInstance
	} from 'vue';
	const show = reactive({
		code: '',
		phone: '',
		newTradePassWord: '',
		newTradePassWord2: '',
	})

	const smsShow = ref(false)
	const codeText = ref("获取验证码")
	let { proxy } = getCurrentInstance()
	// 创建webView
	const btn = () => {
		
		if (uni.$tm.u.isPhone(show.phone) == false) {
			uni.showToast({
				title: '无效手机号',
				icon: 'none'
			})
			return
		}
		
		// #ifdef H5
		proxy.$Captcha.show()
		uni.$on('getTicket', res => {
			if (res.ret == 0) {
				sendCode(res)
				
			} else {
				console.log(res);
				uni.showToast({
					title: '请完成验证',
					icon: 'none'
				})
			}
			uni.$off('getTicket')
		})
		// #endif
		// #ifdef APP-PLUS

		let wv = plus.webview.create('', 'custom-webview', {
			'uni-app': 'none',
			background: 'transparent',
			webviewBGTransparent: true
		})
		//wv.show();
		wv.loadURL('/static/hybrid/html/index.html')
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		let currentWebview = page.$getAppWebview();
		// 此处监听uni.postMessage传递参数  
		wv.overrideUrlLoading({ mode: 'reject' }, e => {
			let params = JSON.parse(decodeURIComponent(e.url.split('push?params=')[1]))
			if (params.ret == 0) {
				sendCode(params)
				
			} else {
				uni.showToast({
					title: '请完成验证',
					icon: 'none'
				})
			}

			console.log(e, params);
		})
		currentWebview.append(wv)
		// #endif

	}
	let second = ref(60)
	const sendCode = (data) => {
		console.log("发送验证码", data.randstr, data.ticket);
		My.sendCode({ phone: show.phone, type: 'update_trade_pwd_', randstr: data.randstr, ticket: data.ticket }).then(
			res => {
				uni.showToast({
					title: '发送成功',
					icon: 'none'
				})
				const timer = setInterval(() => {
					second.value--
					codeText.value = second.value + "秒后获取"
					smsShow.value = true
					if (second.value <= 0) {
						smsShow.value = false
						codeText.value = "重新获取"
						clearInterval(timer)
					}

				}, 1000)
			})
	}
	const confirm = (e) => {
		if (show.phone != "" && show.code != "" && show.newTradePassWord != "" && show.newTradePassWord2 != "") {
			
			My.updatetradepassword(e.data).then(res => {
				uni.removeStorageSync('token')
				uni.showToast({
					title:'修改成功',
					icon:'none'
				})
				uni.navigateBack({delta:1})
			})
		}
	}
</script>

<style>

</style>
