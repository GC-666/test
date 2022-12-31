<template>

	<tm-app>
		<tm-navbar :title="name" :shadow="0">
		</tm-navbar>
		<tm-tabs :transprent="false" :itemWidth="120" align="center" :list="tabsTitle" :width="750" :height="300"
			default-name="4" @change="tabsChange">
		</tm-tabs>
		<scroll-view scroll-y="true" :class="list.length>0?'scroll-Y':''" @scrolltolower="lower">
			<tm-sheet :shadow="0" :round="4" :margin="[20,10]" :padding="[0,0]" v-for="(item,index) in list"
				@click="gonav('pages/market/shop/goodpage?id='+item.id)">
				<view class="flex flex-between mt-20 ml-20 mr-20">
					<view class="flex flex-row-center-start ">
						<tm-icon v-if="item.type == '2'" :fontSize="40" name="xh-jiaoyizhong-copy">
						</tm-icon>
						<tm-text class="text-weight-b ml-10" :fontSize="36" :label="item.name"></tm-text>
						<tm-text v-if="item.type=='2'" color="#d29850" _class="text-weight-b ml-10" :fontSize="24" label="交易中">
						</tm-text>
					</view>
					<tm-text :fontSize="32" class="text-weight-b" :label="`￥${item.price}`"></tm-text>
				</view>
				<view class="flex flex-between mt-20 ml-20 mr-10 mb-20">
					<tm-text _class="text-overflow " color="#A6A6A6" _style="" :fontSize="24" :label="`编号：${item.no}`">
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
	const tabsTitle = ref([
		{ key: "4", title: "综合" },
		{ key: "1", title: "最新" },
		{ key: "2", title: "价格升序" },
		{ key: "3", title: "价格降序" },
	])

	const params = ref({
		type: 4,
		screanTxt: '',
		classIds: '',
		pageNo: 1,
		pageSize: 20,
		collid: 0
	})
	const lower = () => {
		if (count.value > 0) {
			params.value.pageNo += 1
			show()
		}
	}
	const tabsChange = (i) => {
		list.value = []
		params.value.pageNo = 1
		if (i == 2) {
			params.value.type = 4
		} else {
			params.value.type = i
		}
		show()
	}
	const count = ref(0)
	const list = ref([])
	const name = ref('')
	const show = () => {
		Market.show(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
	onLoad((e) => {
		params.value.collid = e.id
		name.value = e.name

	})
	onShow(() => {
		params.value.pageNo = 1
		list.value = []
		show()
	})
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
</style>
