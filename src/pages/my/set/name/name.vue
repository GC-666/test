<template>
	<tm-app>
		<tm-navbar title="实名认证" :height="44" :shadow="0">
		</tm-navbar>
		<view v-if="type==1" class="">
			<view class="bgc">
				<image src="@/static/img/cg.png" mode="" style="width: 180rpx;height: 180rpx;"></image>
			</view>
			<view class="namecard">
				<view class="tip">
					<image src="@/static/img/aq.png" mode="" style="background-size: 100% 100%;"></image>
					<view class="text">
						信息安全保障中
					</view>
				</view>
				<view class="cont" style="margin-bottom: 50rpx;">
					<view class="name">
						姓名
					</view>
					<view class="card">
						{{data.name}}
					</view>
				</view>
				<view class="cont">
					<view class="name">
						身份证号
					</view>
					<view class="card">
						{{data.no}}
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="type === 0">
			<view class=" ml-20 mt-30">
				<tm-text :font-size="58" _class="text-weight-b" label="实名认证"></tm-text>
			</view>
			<view class=" ml-20 mt-30">
				<tm-text :font-size="22" color="#999999" _class="text-weight-b"
					label="为有效保障您的资金安全,请填写与您身份证一致的信息,否则不会通过审核">
				</tm-text>
			</view>
			<tm-form :margin="[0,0]" @submit="confirm" v-model="user" transprent>
				<view class="mt-n10 ml-20">
					<tm-text :fontSize="33" _class="text-weight-b mt-n10" label="真实姓名"></tm-text>
				</view>
				<tm-form-item label="" :margin="[20,0]" :padding="[0,40]"
					:rules="[{required:true,message:'请输入姓名',validator:(val)=> val === '' ? false : true}]">
					<tm-input placeholder="请输入姓名" placeholderStyle="font-size:62rpx" :inputPadding="[0,0]"
						v-model="user.name" :transprent="true" :showBottomBotder="false">
					</tm-input>
				</tm-form-item>
				<view class="mt-20 ml-20">
					<tm-text :fontSize="33" _class="text-weight-b" label="身份证号"></tm-text>
				</view>
				<tm-form-item label="" :margin="[20,0]" :padding="[0,40]"
					:rules="[{required:true,message:'请输入身份证号',validator:(val)=> val === '' ? false : true}]">
					<tm-input placeholder="请输入身份证号" placeholderStyle=” :inputPadding="[0,0]" v-model="user.idCardCode"
						:transprent="true" :showBottomBotder="false">
					</tm-input>
				</tm-form-item>
				<view class="mt-20 ml-20">
					<tm-text :fontSize="33" _class="text-weight-b" label="手机号"></tm-text>
				</view>
				<tm-form-item label="" :margin="[20,0]" :padding="[0,40]"
					:rules="[{required:true,message:'请输入手机号',validator:(val)=> val === '' ? false : true}]">
					<tm-input placeholder="请输入该身份证办理的身份证号" placeholderStyle=” :inputPadding="[0,0]" v-model="user.phone"
						:transprent="true" :showBottomBotder="false">
					</tm-input>
				</tm-form-item>
				<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="确认"></tm-button>
			</tm-form>
		</view>
	</tm-app>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { onBeforeMount, ref, reactive } from 'vue';
	import { My } from "@/api/api.ts"
	const user = reactive({
		name: '',
		idCardCode: '',
		phone: '',
		accountNo: ''
	})
	const type = ref(0)
	const data = ref({})
	const realname = () => {
		My.realname().then(res => {
			data.value = res
			type.value = res.isRealName
		})
	}
	onLoad((o) => {
		if (o.isRealName == '1') {
			realname()
		}

	})
	const confirm = (val) => {
		console.log(val);
		if (uni.$tm.u.isPhone(val.data.phone) == false) {
			uni.showToast({
				title: '手机号格式错误',
				icon: 'none'
			})
			return
		}
		My.addrealname(val.data).then(res => {
			realname()
		})
	}
</script>

<style>
	.bgc {
		background-size: 100% 100%;
		width: 180rpx;
		height: 180rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		margin-bottom: 40rpx;
	}

	.name {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 10rpx;
	}

	.card {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.cont {
		padding-left: 56rpx;


	}

	.namecard {
		margin: 0 auto;
		margin-top: 53rpx;
		width: 630rpx;
		height: 300rpx;
		background-image: url('@/static/img/sfz.png');
		background-size: 100% 100%;
		border-radius: 25rpx;
	}

	image {
		width: 20rpx;
		height: 24rpx;
	}

	.tip {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 39rpx;
		padding-top: 30rpx;

	}

	.text {
		margin-left: 7rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7E7E7E;
	}
</style>
