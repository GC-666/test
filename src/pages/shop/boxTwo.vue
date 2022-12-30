<template>
	<tm-app>
		<tm-navbar title="购买选择" :shadow="0">
		</tm-navbar>
		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<view class="flex ml-15">
				<tm-image preview :round="4" :width="160" :height="160" :src="orderConfirmOrder.image">
				</tm-image>
				<view class="flex flex-col flex-around">
					<tm-text class="ml-15" :font-size="30" _class="text-weight-b" :label="orderConfirmOrder.name">
					</tm-text>
					<tm-text class="ml-15" color="#A6A6A6" :font-size="18" _class="text-weight-s"
						:label="`创作者：${orderConfirmOrder.creator}`"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<tm-text class="ml-15" :font-size="30" _class="text-weight-b" label="订单详情"></tm-text>
			<tm-divider color="grey" :margin="[1,10]"></tm-divider>
			<view class="flex ma-15 flex-between">
				<tm-text :font-size="25" _class="text-weight-n" label="单价金额"></tm-text>
				<view class="flex flex-center mr-18">
					<tm-text :font-size="6" class="mb--10" _class="text-weight-n" label="￥"></tm-text>
					<tm-text :font-size="32" _class="text-weight-b" :label="orderConfirmOrder.orderAmount"></tm-text>
				</view>
			</view>
			<view class="flex ma-15 flex-between">
				<tm-text :font-size="25" _class="text-weight-n" label="购买数量"></tm-text>
				<view class="flex flex-center">
					<tm-stepper :disabledInput="true" v-model="val" :min="1" :width="210" :max="orderConfirmOrder.maxBuyNumber" :defaultValue="1"></tm-stepper>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex ma-15 flex-between">
				<tm-text :font-size="25" _class="text-weight-n" label="订单总金额"></tm-text>
				<view class="flex flex-center mr-18">
					<tm-text :font-size="6" class="mb--10" _class="text-weight-n" label="￥"></tm-text>
					<tm-text :font-size="32" _class="text-weight-b" :label="orderConfirmOrder.orderAmount*val"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view class="fixed b-0 r-0 l-0" :style="{'background-color': store.tmStore.dark?'#fff': '#25262E' }">
			<view class="" style="">
				<tm-sheet _class=" " :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
					<view class="flex flex-row-center-between aa">
						<view class="flex flex-col ml-40">
							<view class="flex  flex-col-bottom-center ">
								<tm-text :font-size="18" _class="text-weight-n flex-row-bottom-end mb--8" label="¥">
								</tm-text>
								<tm-text class="ml-10" :font-size="38" _class="text-weight-b" :label="val*orderConfirmOrder.orderAmount">
								</tm-text>
							</view>
						</view>
						<view class="mr-50">
							<tm-button :round="13" :margin="[0, 10]" :padding="[0,0]" :shadow="0" :height="60"
								:width="200" label="立即购买" @click="placeOrder"></tm-button>
						</view>
					</view>
				</tm-sheet>
			</view>
		</view>
		<tm-modal :height="350" splitBtn title="温馨提示" okText="确定" v-model:show="orderShow"
			@ok="pay(order.operationData.id)">
			<view class="flex flex-center">
				<tm-text :font-size="30" _class="text-weight-n" :label="order.operationMsg">
				</tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>

<script setup>
	import { Home,My } from "@/api/api.ts"
	import { onLoad,onShow } from "@dcloudio/uni-app";
	import { onBeforeMount, onMounted, ref, reactive } from "vue";
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const id = ref(0)
	const val = ref(1)
	const orderShow = ref(false)
	onLoad((o) => {
		id.value =o.id;
	})
	const orderConfirmOrder = ref({})
	onShow(() => {
		Home.orderConfirmOrder({ type: '03', id: id.value }).then(res => {
			orderConfirmOrder.value=res;
		})
	})
	const placeOrder = () => {
		My.placeOrder({ type: '03', id: id.value, buyNumber:val.value}).then(res => {
			if (res.operationCode == '01') {
				orderShow.value = true
				order.value = res
				return
			}
			uni.navigateTo({
				url: '/pages/my/order/orderpay?id=' + res.operationData.id
			})
		})
	}
</script>


<style>
</style>
