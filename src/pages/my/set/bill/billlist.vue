<template>
	<tm-app>
		<tm-navbar title="开票记录" :shadow="0">
		</tm-navbar>
		<!-- 可开票列表 -->
		<!-- <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			{{list}}
			

		</scroll-view> -->
		<tm-sheet :round="3" :shadow="0" :margin="[20,20]" :padding="[0,10]">
			<view class="flex ma-15 flex-between">
				<view class="flex flex-row-center-between">
					<tm-text color="#3B66F5" :font-size="22" _class="text-weight-b" label="电子发票"></tm-text>


					<tm-text color="#1A1A1A" :font-size="18" class="ml-10" _class="text-weight-s"
						:label="DateUtils.formatDateTime(1668756078)"></tm-text>

				</view>
				<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" label="藏品购买"></tm-text>
			</view>
			<view class="flex flex-between">
				<view class="flex  flex-2">
					<view class="ml-10">
						<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" label="发票代码"></tm-text>
						<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" class="mt-8" label="1231454487">
						</tm-text>
					</view>
					<view class="ml-n25">
						<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" label="发票号码"></tm-text>
						<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s" class="mt-8" label="1231454487">
						</tm-text>
					</view>
				</view>
				<view class="flex flex-1 flex-center">
					<tm-text color="#1A1A1A" :font-size="18" _class="text-weight-s"
						class="flex flex-row-bottom-end mb--10" label="￥"></tm-text>
					<tm-text :font-size="30" _class="text-weight-b" label="999"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,15]"></tm-divider>
			<view class="flex flex-between ma-10">
				<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-s" label="已开票"></tm-text>
				<view class="">
					<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-s" label="重新申请"></tm-text>
				</view>
			</view>
		</tm-sheet>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { ref } from "@vue/reactivity";
	import { onBeforeMount, onMounted } from "vue";
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
	onMounted(() => {
		findUserTicketRecord()
	})
</script>


<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
