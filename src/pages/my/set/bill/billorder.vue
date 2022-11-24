<template>
	<tm-app>
		<tm-navbar title="申请开票" :height="44" :shadow="0">
		</tm-navbar>
		<tm-form @submit="confirm" :margin="[0,10]" :round="0" v-model="show">
			<tm-form-item required label="抬头类型" field="radio" :rules="[{required:true,message:'请选择抬头类型'}]">
				<tm-radio-group v-model="show.riseType">
					<tm-radio :size="26" label="企业单位" value="1"></tm-radio>
					<tm-radio :size="26" label="个人/非企业单位" value="0"></tm-radio>
				</tm-radio-group>
			</tm-form-item>
			<view class="" v-if="show.riseType==1">
				<tm-form-item required label="公司名称" field="riseName" :rules="[{required:true,message:'请输入公司名称'}]">
					<tm-input placeholder="请选择公司名称" :inputPadding="[0,0]" v-model="show.riseName" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
				<tm-form-item required label="公司税号" field="riseNo" :rules="[{required:true,message:'请输入公司税号'}]">
					<tm-input placeholder="请选择公司税号" :inputPadding="[0,0]" v-model="show.riseNo" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<view class="" v-if="show.riseType==0">
				<tm-form-item required label="抬头名称" field="name" :rules="[{required:true,message:'请输入抬头名称'}]">
					<tm-input placeholder="请选择抬头名称" :inputPadding="[0,0]" v-model="show.name" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<tm-form-item required label="发票类型" field="ticketType" :rules="[{required:true,message:'请选择发票类型'}]">
				<tm-radio-group v-model="show.ticketType">
					<tm-radio :size="26" label="普通发票" value="0"></tm-radio>
					<tm-radio :size="26" label="增值税发票" value="1"></tm-radio>
				</tm-radio-group>
			</tm-form-item>
			<tm-form-item required label="接收方式" field="type" :rules="[{required:true,message:'请选择接收方式'}]">
				<tm-radio-group v-model="show.type">
					<tm-radio :size="26" label="电子接收" value="0"></tm-radio>
					<tm-radio :size="26" label="纸质接收" value="1"></tm-radio>
				</tm-radio-group>
			</tm-form-item>
			<view class="" v-if="show.type==1">
				<tm-form-item required label="选择地区" field="cityStr" :rules="[{required:false,message:'请选择地区'}]">
					<tm-input :inputPadding="[0,0]" :model-value.sync="show.cityStr" @click="testClick"
						suffix="tmicon-angle-right" placeholder="请选择所在地区地址" disabled :transprent="true"
						:showBottomBotder="false"></tm-input>
				</tm-form-item>
				<tm-form-item :border="false" required label="详细地址" field="addr"
					:rules="[{required:true,message:'请输入详细地址'}]">
					<tm-input placeholder="请输入详细地址" :inputPadding="[0,0]" v-model="show.address" :transprent="true"
						:showBottomBotder="false">
					</tm-input>
				</tm-form-item>
			</view>
			<view class="" v-if="show.type==0">
				<tm-form-item :border="false" required label="邮箱地址" field="mail"
					:rules="[{required:true,message:'请输入邮箱'}]">
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
		<tm-modal title="温馨提示" :height="300" hideCancel splitBtn v-model:show="showWin" @ok="back">
			
			<view class="flex flex-center">
				<tm-text :fontSize="30" class="text-weight-b" label="申请开票成功"></tm-text>
			</view>
		</tm-modal>
		
		<tm-city-picker v-model="show.city" v-model:model-str="show.cityStr" v-model:show="showCity"
			:default-value="show.city"></tm-city-picker>
	</tm-app>
</template>

<script setup>
	import { My } from '@/api/api';
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	const orderMoney = ref(0)
	const orderIds = ref('')
	const radiolist = ref('')
	const showWin = ref(false)
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
	const back = ()=>{
		uni.navigateBack({delta:1})
	}
	const ids = uni.getStorageSync('data').ids
	const show = ref({
		riseType: "1", //个人。企业
		type: "0", // 接收类型
		address: '', //地址 邮箱
		ticketType: '0', //发票类型
		riseName: '', //公司名称
		riseNo: '', //公司税号
		cityStr: '',
		name: '',
		mail: ''
	})
	const showCity = ref(false)
	const confirm = (e) => {
		let data = {
			orderIds: ids,
			type: e.data.type,
			riseType: e.data.riseType,
			ticketType: e.data.ticketType,
		}
		if (e.data.riseType == "1") {
			data.riseName = e.data.riseName
			data.riseNo = e.data.riseNo
		} else {
			data.riseName = e.data.name
		}
		if (e.data.type == '0') {
			data.address = e.data.mail
		} else {
			data.address = e.data.cityStr +"/"+ e.data.address
		}

		My.openTicket(data).then(res => {
			showWin.value = true
		})
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
