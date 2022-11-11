<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar title="重设密码">
		</tm-navbar>
		<tm-form @submit="confirm" v-model="show" transprent>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入手机号',validator:(val)=> val === '' ? false : true}]">
				<tm-input placeholder="请输入手机号" :inputPadding="[0,0]" v-model="show.phone" :transprent="true" :showBottomBotder="false">
					<template v-slot:right>
						<tm-button @click="aa" :disabled="num!=10" :margin="[0, 0]" :padding="[10, 2]" size="small" :shadow="0" :label="name"></tm-button>
					</template>
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'请输入验证码',validator:(val)=> val === '' ? false : true}]">
				<tm-input  placeholder="请输入验证码" :inputPadding="[0,0]" v-model="show.code" :transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'设置密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input  placeholder="请输入您的设置密码" :password="true" :inputPadding="[0,0]" v-model="show.password" :transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item label=""
				:rules="[{required:true,message:'确认密码',validator:(val)=> val === '' ? false : true}]">
				<tm-input  placeholder="请输入您的确认密码" :password="true"  :inputPadding="[0,0]" v-model="show.password2" :transprent="true" :showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="确认修改"></tm-button>
			
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
			<tm-text :font-size="24" label="已有账号,返回登陆"  @click="loginOnt"></tm-text>
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import {
		reactive,
		ref
	} from 'vue';
	const show = reactive({
		code: '',
		phone: '',
		password: '',
		password2: '',
	})
	const loot=ref(false);
	
	const loginOnt=()=>{
		uni.reLaunch({
			url:"/pages/login/login"
		})
	}
	
	const num=ref(10)
	const name=ref("发送验证码")
	const aa=()=>{
		if(num.value==10){
			const timer=setInterval(function() {
				if(num.value>0){
					name.value=num.value+"秒";
					num.value=num.value-1;
				}else{
					clearInterval(timer);
					num.value=10;
					name.value="发送验证码";
				}
			}, 1000); 
		}
	};
	const confirm = (e) => {
		if(show.phone!="" && show.code!="" && show.password!="" && show.password2!=""){
			if(loot.value){
				My.resetPwd(e.data).then(res=>{
					My.login({
						userAccount: e.data.phone,
						userPassword: e.data.password
					}).then(res=>{
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
