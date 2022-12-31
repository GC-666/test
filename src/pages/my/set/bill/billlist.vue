<template>
	<tm-app>
		<tm-navbar title="开票记录" :shadow="0">
		</tm-navbar>
		<!-- 可开票列表 -->
		<scroll-view scroll-y="true" :class="list.length>0?'scroll-Y':''" @scrolltolower="lower">
			<tm-sheet :round="3" :shadow="0" :margin="[20,20]" :padding="[0,10]" v-for="(item,i) in list" :key="i">
				<view class="flex ma-15 flex-between">
					<view class="flex flex-row-center-between">
						<tm-text v-if="item.type === '0'" color="#3B66F5" :font-size="22" _class="text-weight-b"
							label="电子发票"></tm-text>
						<tm-text v-if="item.type === '1'" color="#3B66F5" :font-size="22" _class="text-weight-b"
							label="纸质发票"></tm-text>

					</view>
					<tm-text color="#1A1A1A" :font-size="18" class="ml-10" _class="text-weight-s"
						:label="DateUtils.formatDateTime(item.createTime)"></tm-text>
				</view>
				<view class="flex flex-between">
					<view class="flex  flex-2">
						<view class="ml-10">
							<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" label="发票代码"></tm-text>
							<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" class="mt-8"
								label="1231454487">
							</tm-text>
						</view>
						<view class="ml-n25">
							<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" label="发票号码"></tm-text>
							<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" class="mt-8"
								label="1231454487">
							</tm-text>
						</view>
					</view>

					<view class="flex flex-1 flex-end mr-10">
						<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" class="flex flex-row-bottom-end"
							label="￥"></tm-text>
						<tm-text :font-size="30" _class="text-weight-b" :label="item.money"></tm-text>
					</view>
				</view>
				<tm-divider color="grey" :margin="[1,15]"></tm-divider>
				<view class="flex flex-between ma-10">
					<tm-text v-if="item.status === '0' || item.status === ''" color="#1A1A1A" :font-size="22"
						_class="text-weight-s" label="开票中"></tm-text>
					<tm-text v-if="item.status === '1'" color="#1A1A1A" :font-size="22" _class="text-weight-s"
						label="开票完成"></tm-text>
					<tm-text v-if="item.status === '2'" color="#1A1A1A" :font-size="22" _class="text-weight-s"
						label="开票失败"></tm-text>
					<view class="">
						<tm-text v-if="item.status === '2'" color="#1A1A1A" :font-size="22" _class="text-weight-s"
							:label="item.remarks"></tm-text>
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
	import { My } from "@/api/api.ts"
	import { onShow } from "@dcloudio/uni-app";
	import { ref } from "@vue/reactivity";
	import { onBeforeMount, onMounted } from "vue";
	import DateUtils from "@/utils/dateUtils"
	import wushuju from "@/static/my/wushuju.png"
	const count = ref(0)
	const params = ref({
		page: 1,
		limit: 10
	})
	const list = ref([])
	// 下拉刷新
	const lower = () => {
		console.log("到底部");
		if (count.value > 0) {
			params.value.page += 1
			findUserTicketRecord()
		}
	}
	const findUserTicketRecord = () => {
		My.findUserTicketRecord(params.value).then(res => {
			list.value = list.value.concat(res)
		})
	}
	onShow(() => {
		params.value.page = 1
		list.value=[]
		findUserTicketRecord()
	})
	onBeforeMount(() => {
		

	})
</script>


<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
