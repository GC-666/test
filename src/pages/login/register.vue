<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar title="注册浔画">
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
				:rules="[{required:true,message:'设置密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入您的设置密码" :password="true" :inputPadding="[0,0]" v-model="show.password"
					:transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'确认密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入您的确认密码" :password="true" :inputPadding="[0,0]" v-model="show.password2"
					:transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="立即注册"></tm-button>

			<view class="flex-row-center-center mt-10">
				<tm-checkbox class="flex-row-center-center" v-model="loot" :size="28" :round="10">
					<template v-slot:default="{checked}">
						<view class="flex flex-row">
							<tm-text :fontSize="20" label="我已经阅读并同意"></tm-text>
							<tm-text :fontSize="20" color="red" label="《用户服务协议》"></tm-text>
							<tm-text :fontSize="20" color="red" label="《隐私权政策》"></tm-text>
						</view>
					</template>
				</tm-checkbox>
			</view>
		</tm-form>
		<view class="flex-row-center-center mt-10">
			<tm-text :font-size="24" label="已有账号,返回登陆" @click="login"></tm-text>
		</view>

	</tm-app>

</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import {
		reactive,
		ref
	} from 'vue';
	const show = reactive({
		privateKey: '',
		address: '',
		nickname: '',
		code: '',
		phone: '',
		password: '',
		password2: '',
		uid: '',
	})
	const loot = ref(false);

	const smsShow = ref(false)
	const codeText = ref("获取验证码")
	let wv; //计划创建的webview
	
	// 创建webView
	const btn = () => {
		// #ifdef APP-PLUS
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		let currentWebview = page.$getAppWebview();
		// if (wv) {
		// 	console.log("已经存在webview");
		// 	return wv.show();

		// }
		// transparent
		console.log("不存在webview");
		wv = plus.webview.create('/static/hybrid/html/index.html', 'custom-webview', {
			'uni-app': 'none',
			background: '#f5f5f5',
			webviewBGTransparent: true
		})
		 wv.show()
		// wv.loadURL('/static/hybrid/html/index.html')
		
		// 此处监听uni.postMessage传递参数  
		plus.globalEvent.addEventListener('plusMessage', msg => {
			const result = msg.data.args.data

			if (result.name == 'postMessage') {
				if (result.arg.result.ret == 0) {
					sendCode(result.arg.result)
				}

			}
		})
		currentWebview.append(wv)
		// #endif

	}
	let second = ref(60)
	const sendCode = (data) => {
		console.log("发送验证码");
		My.sendCode({ phone: show.phone, type: 'reg_code_', randstr: data.randstr, ticket: data.ticket }).then(res => {
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
	const login = () => {
		uni.reLaunch({
			url: "/pages/login/login"
		})
	}

	onLoad((e) => {
		// #ifdef H5
		if (e['uid']) {
			show.uid = e.uid
			console.log(show.uid)
		}
		// #endif
	})

	const confirm = (e) => {
		if (show.phone != "" && show.code != "" && show.password != "" && show.password2 != "") {
			if (loot.value) {
				My.reg(e.data).then(res => {
					uni.setStorage({
						key: 'token',
						data: res.token,
						success: function() {
							// console.log('success');
						},
					});
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1000)
				})
			} else {
				uni.showToast({
					title: "未阅读用户服务协议",
					icon: "none",
				})
			}
		}
	}
</script>
<style>

</style>
