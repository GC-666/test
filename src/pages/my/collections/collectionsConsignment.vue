<template>
	<tm-app class="overflow-y">
		<tm-navbar hideHome title="藏品详情" :height="44" :shadow="0">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="collectionDetails.img">
					</tm-image>
				</view>
			</view>
		</view>
		
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="flex flex-row-center-center">
					<tm-text :font-size="26" _class="text-weight-b" label="寄售价格"></tm-text>
				</view>
				<view class="flex" >
					<tm-icon :fontSize="30" color="#07EBFE" name="tmicon-renminbi3"></tm-icon>
					<tm-input @blur="aa" style="width: 200rpx;" placeholder="请输入售价" v-model="price">
					</tm-input>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-icon  name="tmicon-alipay"></tm-icon>
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="平台钱包"></tm-text>
				</view>
				<tm-checkbox-group @change="boxlistchange" v-model="checkboxlist">
					<tm-checkbox :size="30" :round="10" value="apple"></tm-checkbox>
				</tm-checkbox-group>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-icon name="tmicon-alipay"></tm-icon>
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="云钱包"></tm-text>
				</view>
				<tm-checkbox-group @change="boxlistchange" v-model="checkboxlist">
					<tm-checkbox :size="30" :round="10" value="apple2"></tm-checkbox>
				</tm-checkbox-group>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="购买价格"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-icon :fontSize="30" color="#07EBFE" name="tmicon-renminbi3"></tm-icon>
					<tm-text color="#07EBFE" :font-size="26" _class="text-weight-b" :label="collectionDetails.buyprice"></tm-text>
				</view>
			</view>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="服务费"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" :label="`(手续费${orderFindMySellServiceCharge.serviceCharge}版税${orderFindMySellServiceCharge.royalties})`"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="预计收入"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-icon :fontSize="30" color="#07EBFE" name="tmicon-renminbi3"></tm-icon>
					<tm-text color="#07EBFE" :font-size="22" _class="text-weight-b" :label="getprice"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view style="margin-top: 50rpx;">
			<tm-button @click="aa" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="寄售"></tm-button>
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, ref,reactive } from "vue";
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	
	const price = ref("")
	const checkboxlist = reactive();
	
	//配置参数
	const config=ref({});
	//藏品详情
	const collectionDetails = ref({});
	//我的藏品寄售服务费和云钱包
	const orderFindMySellServiceCharge = ref({});
	
	onLoad((e) => {
		config.value=e;
		My.collectionDetails({
			id:e.id
		}).then(res => {
			collectionDetails.value = res;
		})
		My.orderFindMySellServiceCharge({
			id:e.id
		}).then(res => {
			
			orderFindMySellServiceCharge.value = res;
		})
	})
	
	const boxlistchange=(e)=>{
		console.log(e);
	}
	
	const getprice = ref("")
	
	const aa=()=>{
		let x = Number(orderFindMySellServiceCharge.value.serviceCharge) + Number(orderFindMySellServiceCharge.value.royalties);
		let reprice = (x / 100) * parseInt(price.value);
		console.log(x);
		console.log(reprice);
		if (orderFindMySellServiceCharge.value.RightsValue > 0) {
			getprice.value = price.value - reprice * (orderFindMySellServiceCharge.value.RightsValue / 100);
		} else {
			getprice.value = price.value - reprice
		}
		
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
		margin-top: 350rpx;
	}
</style>
