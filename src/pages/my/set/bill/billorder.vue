<template>
	<tm-app>
		<tm-navbar title="申请开票" :height="44" :shadow="0">
		</tm-navbar>
		<tm-form @submit="confirm" :margin="[0,10]" :round="0" v-model="show">
			<tm-form-item required label="抬头类型" field="radio" :rules="[{required:true,message:'请选择抬头类型'}]">
				<tm-radio-group v-model="show.typeRadio">
					<tm-radio :size="26" label="企业单位" value="0"></tm-radio>
					<tm-radio :size="26" label="个人/非企业单位" value="1"></tm-radio>
				</tm-radio-group>
			</tm-form-item>
			<view class="" v-if="show.typeRadio==0">
				<tm-form-item required label="公司名称" field="name" :rules="[{required:true,message:'请输入公司名称'}]">
					<tm-input placeholder="请选择公司名称" :inputPadding="[0,0]" v-model="show.name" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
				<tm-form-item required label="公司税号" field="duty" :rules="[{required:true,message:'请输入公司税号'}]">
					<tm-input placeholder="请选择公司税号" :inputPadding="[0,0]" v-model="show.duty" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<view class="" v-if="show.typeRadio==1">
				<tm-form-item required label="抬头名称" field="name" :rules="[{required:true,message:'请输入抬头名称'}]">
					<tm-input placeholder="请选择抬头名称" :inputPadding="[0,0]" v-model="show.pName" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<tm-form-item required label="接收方式" field="modeRadio" :rules="[{required:true,message:'请选择接收方式'}]">
				<tm-radio-group v-model="show.modeRadio">
					<tm-radio :size="26" label="电子接收" value="0"></tm-radio>
					<tm-radio :size="26" label="纸质接收" value="1"></tm-radio>
				</tm-radio-group>
			</tm-form-item>
			<view class="" v-if="show.modeRadio==1">
				<tm-form-item required label="选择地区" field="cityStr" :rules="[{required:false,message:'请选择地区'}]">
					<tm-input :inputPadding="[0,0]" :model-value.sync="show.cityStr" @click="testClick"
						suffix="tmicon-angle-right" placeholder="请选择所在地区地址" disabled :transprent="true"
						:showBottomBotder="false"></tm-input>
				</tm-form-item>
				<tm-form-item :border="false" required label="详细地址" field="addr" :rules="[{required:true,message:'请输入详细地址'}]">
					<tm-input placeholder="请输入详细地址" :inputPadding="[0,0]" v-model="show.addr" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<view class="" v-if="show.modeRadio==0">
				<tm-form-item :border="false" required label="邮箱地址" field="mail" :rules="[{required:true,message:'请输入邮箱'}]">
					<tm-input placeholder="请输入邮箱" :inputPadding="[0,0]" v-model="show.mail" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>

			<view class="fixed flex flex-center"
				style="bottom:0rpx;left: 0;right: 0; background-color: #fff;width: 100%;height: 100rpx;">
				<tm-button form-type="submit" :height="60" :width="710" label="提交开票"></tm-button>
			</view>
		</tm-form>
		<tm-cell :margin="[0, 0]" :titleFontSize="30" title="总金额">
			<template v-slot:right>
				<view class="flex">
					<tm-text class="ml-44 text-weight-b" color="red" :fontSize="32" :label="orderMoney">
					</tm-text>
					<tm-text class="text-weight-b" color="#000" :fontSize="32" label="元">
					</tm-text>
				</view>
			</template>
		</tm-cell>
		
		<tm-city-picker v-model="show.city" v-model:model-str="show.cityStr" v-model:show="showCity"
			:default-value="show.city"></tm-city-picker>
	</tm-app>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	const orderMoney = ref(0)
	const orderIds = ref('')
	const radiolist = ref('')
	onLoad(() => {
		let data = uni.getStorageSync('data')
		orderMoney.value = data.money
		data.ids.forEach((item, index) => {
			index += 1
			if (data.ids.length === index) {
				orderIds.value = orderIds.value + item
			} else {
				orderIds.value = orderIds.value + item + ","
			}
		})
	})
	const show = ref({
		typeRadio: "0", //bonaer
		modeRadio: "0", //bonaer
		addr: '', //地址
		mail: '', //邮箱
		cityStr: "",
		pName:'',//个人抬头
		name: '', //公司名称
		duty: '' //公司税号
	})
	const showCity = ref(false)
	const confirm = (e) => {
		console.log(e)
	}

	const testClick = () => {
		showCity.value = !showCity.value
	}
</script>


<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 188rpx - var(--window-bottom));
	}
</style>
