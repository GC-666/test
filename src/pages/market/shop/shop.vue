<template>

	<tm-app>
		<tm-navbar :title="name">
		</tm-navbar>
		<tm-tabs :itemWidth="120" align="center" :list="tabsTitle" :width="750" :height="300" default-name="4"
			@change="tabsChange">
		</tm-tabs>
		<scroll-view scroll-y="true" :style="`max-height: ${hh}px;`" @scrolltolower="lower">
			<tm-sheet :shadow="0" :round="4" :margin="[20,10]" :padding="[0,0]" v-for="(item,index) in list"
				@click="gonav('pages/market/shop/goodpage?id='+item.id)">
				<view class="flex flex-between mt-20 ml-20 mr-20">
					<tm-text _class="text-overflow  " class="text-weight-b"
						_style="width:280rpx;text-overflow: ellipsis;" :fontSize="32" :label="item.name"></tm-text>
					<tm-text :fontSize="32" class="text-weight-b" :label="`￥${item.price}`"></tm-text>
				</view>
				<view class="flex flex-between mt-20 ml-20 mr-20 mb-20">
					<tm-text _class="text-overflow " color="#A6A6A6" _style="width:380rpx;text-overflow: ellipsis;"
						:fontSize="22" :label="`编号：${item.no}`"></tm-text>
					<view class="flex flex-end">
						<view class="" v-for="i in item.payTypeList">
							<tm-icon v-if="i.type=='00'  " _class=" mr-20" :fontSize="25" name="tmicon-wind-smile">
							</tm-icon>
							<tm-icon v-if="i.type=='05' " _class=" mr-20" :fontSize="25" name="tmicon-wind-smile">
							</tm-icon>
						</view>
					</view>
				</view>
			</tm-sheet>
		</scroll-view>
	</tm-app>
</template>
<script setup>
	const { windowHeight, windowTop } = uni
		.getWindowInfo()
	import tabbar from '@/components/tabbar.vue'
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import { Market } from "@/api/api.ts"
	import { onMounted, ref } from 'vue';
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
	onMounted(() => {
		show()
	})
	const show = () => {
		Market.show(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
	const hh = ref("");
	onLoad((e) => {
		params.value.collid = e.id
		name.value = e.name
		// #ifdef APP-PLUS
		hh.value = windowHeight - 44 - 80 + 6
		// #endif
		// #ifdef H5
		if (windowTop > 0) { //0		44
			hh.value = windowHeight - windowTop
		} else {
			hh.value = windowHeight - 80 - 6
		}
		// #endif
	})
</script>

<style>
	.active1 {
		font-size: 38rpx;
		color: red;
	}
</style>
