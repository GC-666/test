<template>
	<tm-app>
		<tm-navbar title="积分流水">
		</tm-navbar>
		<scroll-view scroll-y="true" :style="`height: calc(100vh - 88rpx - ${statusBarHeight}rpx)`" @scrolltolower="lower">
			<tm-sheet :round="5" :shadow="0" :margin="[20,10]" :padding="[10,10]" v-for="item in list" :key="item.id">
				<view class="flex flex-between ma-10">
					<tm-text class="ml-14 text-weight-b" :fontSize="26" :label="item.typeName"></tm-text>
					<view class="flex">
						<tm-text v-if="item.type=='10'||item.type=='11'||item.type=='12'||item.type=='30' ||item.type=='51'"
							class="ml-14 text-weight-b" :fontSize="22" label="-"></tm-text>
						<tm-text v-else class="ml-14 text-weight-b" :fontSize="22" label="+"></tm-text>
						<tm-text class="mr-14" :fontSize="26" label="￥10.00"></tm-text>
					</view>
			
				</view>
				<view class="flex flex-between ma-10">
					<tm-text class="ml-14" color='#808080' :fontSize="26" :label="DateUtils.formatDate(item.payTime)"></tm-text>
					<tm-text class="mr-14" color='#808080' :fontSize="18" label="余额：12361.99"></tm-text>
				</view>
			</tm-sheet>
		</scroll-view>
		


	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { onMounted, ref } from "vue";
	const list = ref([])
	const count = ref(0)
	const params = ref({
		page: 1,
		limit: 20
	})
	const lower = () => {
		console.log("到底部");
		if (count.value > 0) {
			params.value.page += 1
			findList()
		}
	}
	onMounted(() => {
		findList()
	})

	const findList = () => {
		My.integalList(params.value).then(res => {
			count.value = res.length
			console.log(count.value);
			list.value = list.value.concat(res)
		})
	}
</script>

<style>
	.box {}

	.active {
		border: 1px solid #07EBFE;
	}

	.box1 {
		width: 164rpx;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		margin: 30rpx;
	}
</style>
