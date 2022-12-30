<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar title="绑定银行卡">
		</tm-navbar>

		<tm-form @submit="confirm" v-model="show" transprent>
			<view style="margin: 30rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="30" class="text-weight-b" label="银行卡账号"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入银行卡账号',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入银行卡账号" :inputPadding="[0,0]" v-model="show.phone" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<view style="margin: 20rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="30" class="text-weight-b" label="姓名"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入姓名',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入姓名" :inputPadding="[0,0]" v-model="show.name" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<view style="margin: 20rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="30" class="text-weight-b" label="手机号"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入银行预留手机号',validator:(val)=> val === '' ? false : true}]">
				<tm-input disabled placeholder="请输入银行预留手机号" :inputPadding="[0,0]" v-model="show.phone1" :transprent="true"
					:showBottomBotder="false">
					<template v-slot:right>
						<tm-button @click="btn" :disabled="smsShow" :width="140" :height="40" :margin="[0, 0]"
							:padding="[10, 2]" size="small" :shadow="0" :label="codeText"></tm-button>
					</template>
				</tm-input>
			</tm-form-item>
			<view style="margin: 20rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="30" class="text-weight-b" label="验证码"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入验证码',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入验证码" :inputPadding="[0,0]" v-model="show.code" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="立即绑定"></tm-button>
			<view class="flex-row-center-center mt-10">
				<tm-text :fontSize="22" color="#808080" class="text-weight-s" label="温馨提示：银行卡账号一年只能更换一次"></tm-text>
			</view>
		</tm-form>
	</tm-app>
</template>

<script setup>
	import logo1 from "@/static/img/logo1.png"
	import logo2 from "@/static/img/logo2.png"
	import { My } from "@/api/api.ts"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	import { onLoad } from "@dcloudio/uni-app";
	const store = useTmpiniaStore();
	import {
		reactive,
		ref,
		getCurrentInstance
	} from 'vue';
	let { proxy } = getCurrentInstance();
	const smsShow = ref(false)
	const codeText = ref("获取验证码")
	const show = reactive({
		code: '',
		phone: '',
		name: '',
		phone1: ''
	})
	onLoad(() => {
		My.personal().then(res => {
			show.phone1 = res.phone1
			console.log(res);
		})
	})
	const confirm = (e) => {
		if (show.code != "" && show.phone != "" && show.name != "" && show.phone1 != "") {
			My.aplPhone({ code: e.data.code, phone: e.data.phone, name: e.data.name }).then(res => {
				uni.showToast({
					title: "绑定成功",
					icon: "none",
				})
				uni.navigateBack({ delta: 1 })
			})

		}
	}
	// 创建webView
	const btn = () => {
		if (uni.$tm.u.isPhone(show.phone1) == false) {
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
				uni.showToast({
					title: '发送成功',
					icon: 'none'
				})
			} else {
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

		})
		currentWebview.append(wv)
		// #endif

	}
	let second = ref(60)
	const sendCode = (data) => {
		My.sendCode({ phone: show.phone1, type: 'alipay_code_', randstr: data.randstr, ticket: data.ticket }).then(
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
</script>

<style>

</style>
