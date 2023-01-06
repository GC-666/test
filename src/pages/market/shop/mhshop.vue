<template>
	<tm-app>
		<tm-navbar :title="name" :shadow="0" transprent :isPlace="false">
		</tm-navbar>
		<tm-image extra model="aspectFill" :width="750" :height="420" :src="img">
			<template v-slot:extra>
				<view class="" style="margin: 5rpx auto;">
					<tm-avatar :round="12" :img="logo"></tm-avatar>
				</view>
				<view class="" style="margin: 5rpx auto;">
					<tm-text color="#fff" _class="text-weight-b" :fontSize="32"
						:label="publisher">
					</tm-text>
				</view>
				<view class="flex" style="margin: 5rpx auto;padding-bottom: 50rpx;">
					<view class="flex ">
						<view class="flex flex-center pl-10 pr-10"
							style="height: 40rpx;background-color: #FFD7A7;border-radius: 10rpx 0  0 10rpx;">
							<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-b" label="限量"></tm-text>
						</view>
						<view class="flex flex-center pl-10 pr-10"
							style="height: 40rpx;background-color: #FFE6C8;border-radius:  0 10rpx 10rpx 0 ;">
							<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-n" :label="limits">
							</tm-text>
						</view>
					</view>
					<view class="flex ml-20">
						<view class="flex flex-center pl-10 pr-10"
							style="height: 40rpx;background-color: #FFD7A7;border-radius: 10rpx 0  0 10rpx;">
							<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-b" label="流通"></tm-text>
						</view>
						<view class="flex flex-center pl-10 pr-10"
							style="height: 40rpx;background-color: #FFE6C8;border-radius:  0 10rpx 10rpx 0 ;">
							<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-n" :label="circulation">
							</tm-text>
						</view>
					</view>
				</view>
			</template>
		</tm-image>
		<tm-tabs :itemWidth="120" align="center" :list="tabsTitle" :width="750" :height="300" default-name="4"
			@change="tabsChange">
		</tm-tabs>
		<scroll-view scroll-y="true" :class="list.length>0?'scroll-Y':''" @scrolltolower="lower">
			<tm-sheet :shadow="0" :round="4" :margin="[20,10]" :padding="[0,0]" v-for="(item,index) in list"
				@click="gonav('pages/market/shop/mhgoodpage?id='+item.id)">
				<view class="flex flex-between mt-20 ml-20 mr-20">
					<view class="flex flex-row-center-start">
						<tm-icon v-if="item.type == '4'" :fontSize="40" name="xh-jiaoyizhong-copy">
						</tm-icon>
						<tm-text class="text-weight-b ml-10" :fontSize="32" :label="item.name"></tm-text>
						<tm-text v-if="item.type=='4'" _class="text-weight-s ml-10" :fontSize="22" label="交易中">
						</tm-text>
					</view>
					<tm-text :fontSize="32" class="text-weight-b" :label="`￥${item.price}`"></tm-text>
				</view>
				<view class="flex flex-between mt-20 ml-20 mr-10 mb-20">
					<tm-text _class="text-overflow " color="#A6A6A6" _style="" :fontSize="22" :label="`编号：${item.no}`">
					</tm-text>
					<view class="flex flex-end">
						<view class="" v-for="i in item.payTypeList">
							<tm-icon v-if="i.type=='00'  " _class=" mr-10" :fontSize="35" name="xh-zhanghuqianbao">
							</tm-icon>
							<tm-icon v-if="i.type=='05' " _class=" mr-10" :fontSize="35" name="xh-yunqianbao">
							</tm-icon>
						</view>
					</view>
				</view>
			</tm-sheet>
		</scroll-view>
		<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
	</tm-app>
</template>
<script setup>
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import { Market } from "@/api/api.ts"
	import { onMounted, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	import logo from "@/static/img/logo3.png"
	const tabsTitle = ref([
		{ key: "4", title: "综合" },
		{ key: "1", title: "最新" },
		{ key: "2", title: "价格升序" },
		{ key: "3", title: "价格降序" },
	])

	const params = ref({
		orderType: 4,
		collid: '',
		classIds: '',
		page: 1,
		limit: 10,
		id: 0
	})
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findMarketBoxList()
		}
	}
	const tabsChange = (i) => {
		list.value = []
		params.value.page = 1
		if (i == 2) {
			params.value.orderType = 4
		} else {
			params.value.orderType = i
		}
		findMarketBoxList()
	}
	const count = ref(0)
	const list = ref([])
	const name = ref('')
	onShow(() => {})
	const findMarketBoxList = () => {
		Market.findMarketBoxList(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
	const img = ref('')
	const limits = ref('')
	const circulation = ref('')
	const publisher = ref('')
	onLoad((e) => {
		params.value.id = e.id
		name.value = e.name
		img.value = e.img
		limits.value = e.limits
		circulation.value = e.circulation
		publisher.value = e.publisher
	})
	onShow(() => {
		params.value.page = 1
		list.value = []
		findMarketBoxList()
	})
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx - 360rpx );
	}
</style>
