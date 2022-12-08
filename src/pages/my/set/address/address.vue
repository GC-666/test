<template>
	<tm-app>
		<tm-navbar  title="收货地址">
		</tm-navbar>
		<view class="scroll-Y2">
			<tm-sheet :shadow="0" :margin="[20,10]" :padding="[20,20]" v-for="(data,index) in userAddressList">
				<view class="" @click="choice(data.id)">
					<tm-text class="ml-20 mt-15" :font-size="24" :label="`收货人:${data.consignee}`"></tm-text>
					<tm-text class="ml-20 mt-10" :font-size="24" :label="`联系电话:${data.phoneNum}`"></tm-text>
					<tm-text class="ml-20 mt-10" :font-size="24" :label="`地区:${data.area}`"></tm-text>
					<tm-text class="ml-20 mt-10" :font-size="24" :label="`详细地址:${data.detailAddress}`"></tm-text>
				</view>
				<view class="mt-10 flex flex-between">
					<tm-radio-group v-model="radiolist" @change="aa">
						<tm-radio :size="30" :value="data.id" label="默认地址"></tm-radio>
					</tm-radio-group>
					<view class="flex flex-center">
						<tm-text class="mr-20" @click="gonav('pages/my/set/address/addressAdd?type=1&id='+data.id)"  :font-size="28" label="修改"></tm-text>
						<tm-text class="ml-20" @click="del(data.id)" :font-size="28" label="删除"></tm-text>
					</view>
				</view>
			</tm-sheet>
		</view>
		<view class="fixed" style="bottom:20rpx;left: 0;right: 0;">
			<tm-button @click="gonav('pages/my/set/address/addressAdd?type=0')" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="新增新地址"></tm-button>
		</view>
		<tm-modal :height="380" title="提示" splitBtn okText="确认" v-model:show="show" @ok="submit">
				<tm-text class="mt-30" :font-size="26" label="确认删除地址"></tm-text>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { My } from '@/api/api';
	import { onMounted , reactive , ref } from 'vue';
	const radiolist = ref(1);
	//0设置地址	1选择地址
	const type = ref(0)
	//全部地址
	const userAddressList = ref([])
	//接收参数
	onLoad((option) => {
		//0设置地址	1选择地址
		type.value=option.type;
		console.log(option.type);
	})
	onShow(() => {
		getUserAddressList();
	})
	//选择地址
	const getUserAddressList = () => {
		My.getUserAddressList().then(res => {
			userAddressList.value = res
			for(let i=0;i<res.length;i++){
				if(res[i].isDefault=="1"){
					radiolist.value=res[i].id;
				}
			}
		})
	}
	//选择地址
	const choice = (id) => {
		if(type.value==1){
			uni.$emit('id',id)
			uni.navigateBack({
				data:1
			})
		}
	}
	//选择默认地址
	const aa = (id) => {
		console.log(id);
		My.updateDefaultAddress({
			id:id
		}).then(res => {
			radiolist.value=id
			uni.showToast({
				title: '设置成功',
				icon: 'none'
			})
		})
	}
	
	//删除提示
	const show = ref(false);
	//确认删除
	const submit = () => {
		My.deleteAddress({
			id:delId.value
		}).then(res => {
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			})
			getUserAddressList();
		})
	}
	const delId = ref(0);
	const del = (id) => {
		delId.value=id;
		show.value=true;
	}
</script>

<style>
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}
	.head {
		margin-top: 320rpx;
	}
	.scroll-Y2 {
		overflow-y: auto;
		height: calc(100vh - var(--status-bar-height) - var(--window-bottom) - 200rpx);
	}
</style>
