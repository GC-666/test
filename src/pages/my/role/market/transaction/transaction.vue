<template>
	<tm-app>
		<tm-navbar title="交易记录"></tm-navbar>
		<tm-tabs :list="tabsTitle" :width="750" :height="300" default-name="0" @change="tabsChange">
		</tm-tabs>
		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll-Y">

			<tm-sheet :margin="[20,10]" :round="4" :border="2" :padding="[10,10]" v-for="item in 20">
				<view class="flex flex-between">
					<view class="flex flex-center">
						<tm-text :font-size="22" _class="text-weight-s" :label="`订单编号:121312132123113132123`">
						</tm-text>
					</view>
					<tm-text color="red" :font-size="22" _class="text-weight-b" label="待发货"></tm-text>
					<!-- <view class="flex flex-center" v-if="data.orderStatus==0">
						<tm-text :font-size="28" color="red" _class="text-weight-b" label="剩余时间:"></tm-text>
						<tm-countdown class="text-size-n ml-10" color="red"
							:time="parseInt(data.endTime)-new Date().getTime()" format="HH:MM:SS" autoStart>
						</tm-countdown>
					</view>
					<tm-text color="red" v-else-if="data.orderStatus==1" :font-size="22" _class="text-weight-b"
						label="待发货"></tm-text>
					<tm-text color="green" v-else-if="data.orderStatus==2" :font-size="22"
						_class="text-weight-b" label="已完成"></tm-text>
					<tm-text v-else-if="data.orderStatus==9" :font-size="22" _class="text-weight-b" label="已失效">
					</tm-text> -->
				</view>
				<view class="flex flex-between mt-20">
					<view class="flex flex-1">
						<tm-image :round="3" :width="120" :height="120" src="https://picsum.photos/200/300">
						</tm-image>
						<view class="flex flex-col  ml-20 flex-1 flex-around">
							<view class="flex ">
								<tm-text :font-size="28" _class="text-overflow text-weight-b"
									_style="width:200rpx;text-overflow: ellipsis;" label="米利恩·夏亚">
								</tm-text>
								<tm-text :font-size="22" _class="text-weight-s" :label="`职业：高级法师`">
								</tm-text>
							</view>
							<view class="flex flex-between">
								<tm-text :font-size="22" _class="text-weight-s" label="智力：90">
								</tm-text>
								<tm-text :font-size="22" _class="text-weight-s" :label="`订单时间: 2022-11-01 15:00:00`">
								</tm-text>
							</view>
							<view class="flex flex-between">
								<tm-text :font-size="22" _class="text-weight-s" label="等级：80">
								</tm-text>
								<view class="flex flex-end">
									<tm-text :font-size="20" _class="text-weight-b" label="¥"></tm-text>
									<tm-text :font-size="32" _class="text-weight-b" label="999"></tm-text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-row-bottom-end mt-20">
					<tm-button @click="kefu" :margin="[0, 0]" :padding="[0,4]" :height="40" :width="160" outlined
						:round="20" size="normal" fontColor="#FBB900" color="#FBB900" :shadow="0" label="联系客服">
					</tm-button>
					<tm-button :margin="[10, 0]" :padding="[0,4]" @click="gonav('pages/my/order/orderpay?id='+data.id)"
						:height="40" :width="160" outlined :round="20" size="normal" :shadow="0" fontColor="#EB3938"
						color="#EB3938" label="立即支付"></tm-button>
					<!-- <tm-button v-if="data.orderStatus==0 || data.orderStatus==1" @click="kefu" :margin="[0, 0]"
						:padding="[0,4]" :height="40" :width="160" outlined :round="20" size="normal"
						fontColor="#FBB900" color="#FBB900" :shadow="0" label="联系客服"></tm-button>
					<tm-button :margin="[10, 0]" :padding="[0,4]"
						@click="gonav('pages/my/order/orderDetails?id='+data.id)" :height="40" :width="160" outlined
						:round="20" size="normal" :shadow="0" label="查看详情"></tm-button>
					<tm-button v-if="data.orderStatus==0" :margin="[10, 0]" :padding="[0,4]"
						@click="orderCancel(data.id)" :height="40" :width="160" outlined :round="20" size="normal"
						:shadow="0" fontColor="#808080" color="#808080" label="取消订单"></tm-button>
					<tm-button v-if="data.orderStatus==0" :margin="[10, 0]" :padding="[0,4]"
						@click="gonav('pages/my/order/orderpay?id='+data.id)" :height="40" :width="160" outlined
						:round="20" size="normal" :shadow="0" fontColor="#EB3938" color="#EB3938" label="立即支付">
					</tm-button> -->
				</view>

			</tm-sheet>
		</scroll-view>
		<!-- <view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view> -->
	</tm-app>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	import cs from "@/static/role/cs.png"
	import csz from "@/static/role/csz.png"
	import sj from "@/static/role/sj.png"
	import qxcs from "@/static/role/qxcs.png"
	const count = ref(0)
	const list = ref([])
	const tabsTitle = ref([
		{ key: "0", title: "全部" },
		{ key: "1", title: "已购买" },
		{ key: "2", title: "已出售" },
	])
	const tabsChange = (i) => {
		console.log("tabs下标", i);
	}
	onBeforeMount(() => {

		findUserHeroList()
	})
	const params = ref({
		page: 1,
		limit: 10
	})
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findUserHeroList()
		}
	}
	const findUserHeroList = () => {

	}
	const kefu = () => {
		// #ifdef APP-PLUS
		plus.runtime.openURL('https://xunmeta.rocknft.top/chat.html')
		// #endif
		// #ifdef H5
		window.location.href = 'https://xunmeta.rocknft.top/chat.html'
		// #endif
	}
</script>
<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
</style>
