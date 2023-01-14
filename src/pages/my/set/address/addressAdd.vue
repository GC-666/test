<template>
	<tm-app>
		<tm-navbar :title="title" :height="44" :shadow="0">
		</tm-navbar>
		<tm-form @submit="confirm" :margin="[0,10]" :round="0" v-model="show">
			<tm-form-item required label="收件人" field="consignee" :rules="[{required:true,message:'请输入收件人名称'}]">
				<tm-input placeholder="请选择收件人名称" :inputPadding="[0,0]" v-model="show.consignee" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item required label="联系电话" field="phoneNum" :rules="[{required:true,message:'请输入联系电话'}]">
				<tm-input placeholder="请输入联系电话" :inputPadding="[0,0]" v-model="show.phoneNum" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<tm-form-item required label="选择地区" field="cityStr" :rules="[{required:true,message:'请选择地区'}]">
				<tm-input :inputPadding="[0,0]" :model-value.sync="show.cityStr" @click="testClick"
					suffix="tmicon-angle-right" placeholder="请选择所在地区地址" disabled :transprent="true"
					:showBottomBotder="false"></tm-input>
			</tm-form-item>
			<tm-form-item required label="详细地址" field="detailAddress" :rules="[{required:true,message:'请输入详细地址'}]">
				<tm-input placeholder="请输入详细地址" :inputPadding="[0,0]" v-model="show.detailAddress" :transprent="true"
					:showBottomBotder="false">
				</tm-input>
			</tm-form-item>
			<view class="fixed" style="bottom:20rpx;left: 0;right: 0;">
				<tm-button :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="确认保存"></tm-button>
			</view>
		</tm-form>
		<tm-city-picker :height="700" :round="4" v-model="show.city" v-model:model-str="show.cityStr" v-model:show="showCity"
			:default-value="show.city"></tm-city-picker>
	</tm-app>
</template>

<script setup>
	import { My } from '@/api/api';
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	
	const title = ref("")
	const type = ref(0)
	const id = ref(0)
	//接收参数
	onLoad((option) => {
		type.value=option.type;
		id.value=option.id;
		if(option.type==0){
			title.value="添加地址";
		}else if(option.type==1){
			title.value="修改地址";
		}
	})
	onShow(() => {
		if(type.value==1){
			My.getUserAddressById({
				id:id.value
			}).then(res => {
				show.value.consignee=res.consignee
				show.value.phoneNum=res.phoneNum
				show.value.cityStr=res.area
				show.value.detailAddress=res.detailAddress
			})
		}
	})
	
	const show = ref({
		consignee: '',
		phoneNum: '',
		cityStr:'',
		detailAddress: '',
	})
	const showCity = ref(false)
	const testClick = () => {
		showCity.value = !showCity.value
	}
	
	const confirm = (e) => {
		if(show.value.consignee=='' || show.value.consignee==null){
			uni.showToast({
				title: '请选择收件人名称',
				icon: 'none'
			})
		}else if(show.value.phoneNum=='' || show.value.phoneNum==null){
			uni.showToast({
				title: '请输入联系电话',
				icon: 'none'
			})
		}else if(show.value.cityStr=='' || show.value.cityStr==null){
			uni.showToast({
				title: '请选择所在地区地址',
				icon: 'none'
			})
		}else if(show.value.detailAddress=='' || show.value.detailAddress==null){
			uni.showToast({
				title: '请输入详细地址',
				icon: 'none'
			})
		}else{
			show.value.area=show.value.cityStr;
			if(type.value==0){
				My.addUserAddress(show.value).then(res => {
					uni.showToast({
						title: '保存添加成功',
						icon: 'none'
					})
					uni.navigateBack({
						data:1
					})
				})
			}else if(type.value==1){
				show.value.id=id.value;
				My.updateUserAddress(show.value).then(res => {
					uni.showToast({
						title: '保存修改成功',
						icon: 'none'
					})
					uni.navigateBack({
						data:1
					})
				})
			}
		}
	}
</script>


<style>
</style>
