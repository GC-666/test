<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar  title="登陆浔画">
		</tm-navbar>
		<view class="flex flex-row-center-center mt-50">
			<tm-image :width="121" :height="118" :src="store.tmStore.dark? `${logo1}`: `${logo2}`"></tm-image>
		</view>
		<view class="flex flex-row-center-center mt-47">
			<tm-text :fontSize="36" label="欢迎来到浔画艺术"></tm-text>
		</view>
		<tm-form @submit="confirm" v-model="show" transprent>
			<view style="margin: 100rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="36" label="账号"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入手机号',validator:(val)=> val === '' ? false : true}]">
				<tm-input  placeholder="请输入手机号" :inputPadding="[0,0]" v-model="show.userAccount" :transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<view style="margin: 20rpx 0rpx  20rpx 12rpx;">
				<tm-text :fontSize="36" label="密码"></tm-text>
			</view>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入您的密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input  placeholder="请输入您的密码" :password="true"  :inputPadding="[0,0]" v-model="show.userPassword" :transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="登录"></tm-button>
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
		
		<view class="flex-row-center-between" style="margin: 20rpx 150rpx;">
			<tm-text :font-size="24" label="忘记密码" @click="gonav('pages/login/fopassword')"></tm-text>
			<tm-text :font-size="24" label="立即注册" @click="gonav('pages/login/register')"></tm-text>
		</view>
	</tm-app>
</template>

<script setup>
	import logo1 from "@/static/img/logo1.png"
	import logo2 from "@/static/img/logo2.png"
	import { My } from "@/api/api.ts"
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	import {
		reactive,
		ref
	} from 'vue';
	const show = reactive({
		userAccount: '',
		userPassword: '',
	})
	const loot=ref(false);
	const confirm = (e) => {
		console.log(e);
		if(show.userAccount!="" && show.userPassword!=""){
			if(loot.value){
				My.login(e.data).then(res=>{
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
			}else{
				uni.showToast({
					title:"未阅读用户服务协议",
					icon:"none",
				})
			}
		}
	}
	
</script>

<style>

</style>
