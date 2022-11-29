<template>
	<tm-app>
		<tm-navbar title="冒险记录"></tm-navbar>
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower" v-if="list.length>0">
			<view class="" v-for="item in list">
				<tm-sheet :round="4" color="grey-3" :margin="[20,20]" :padding="[10,10]">
					<view class="flex flex-between ml-20 mr-10">
						<view class="flex flex-col flex-around">
							<tm-text :font-size="32" _class="text-weight-b" :label="item.heroTaskName"></tm-text>
							<view class="flex" v-if="item.surplusTime!==0">
								<tm-icon class="pt-2" :fontSize="28" name="tmicon-clock"></tm-icon>
								<tm-countdown class="text-size-n ml-10" :time="parseInt(item.surplusTime)"
									format="HH:MM:SS" autoStart>
								</tm-countdown>
							</view>
						</view>
						<tm-image :round="4" :width="100" :height="100" :src="item.heroTaskImg"></tm-image>
					</view>
					<tm-sheet :margin="[20,20]" :round="4" :padding="[10,10]">
						<view class="flex flex-between">
							<tm-text :font-size="24" :label="`职业：${item.heroName}`"></tm-text>
							<tm-text :font-size="24" :label="`冒险次数：${item.completedCount + item.surplusCount}次`">
							</tm-text>
							<tm-text :font-size="24" :label="`已领取：${item.receiveCount}次`"></tm-text>
						</view>
						<view class="mt-20">
							<view class="flex flex-between">
								<tm-text v-if="item.status=='0'" :font-size="24"
									:label="`开始时间：${DateUtils.formatDateTime(item.createTime)}`"></tm-text>
								<tm-text v-if="item.status=='3' || item.status=='2'" :font-size="24"
									:label="`结束时间：${DateUtils.formatDateTime(item.endTime)}`"></tm-text>
							</view>
						</view>
					</tm-sheet>
					<tm-sheet :margin="[20,10]" :round="4" :padding="[10,10]"  v-if="item.rewardData !==''">
						<view class="flex">
							<view class="flex flex-around">
								<tm-text :font-size="24" label="可获得一下报酬："></tm-text>
							</view>
							<view class="flex flex-around" v-for="i in JSON.parse(item.rewardData)">
								<tm-text :font-size="24" class="ml-5 mr-5" :label="`${i.objectName}*${i.objectCount}`">
								</tm-text>
							</view>
						</view>
					</tm-sheet>
					<view class="flex flex-between ml-20 mr-10">
						<view class="flex-center">
							<tm-text :font-size="30" label="状态"></tm-text>
						</view>

						<view class="flex">
							<tm-button v-if="item.status=='0'" :margin="[10, 10]" :width="140" :height="40" size="mini"
								:shadow="0" label="进行中">
							</tm-button>
							<tm-button v-if="item.status=='2'" :margin="[10, 10]" :width="140" :height="40" size="mini"
								:shadow="0" label="中途退出">
							</tm-button>
							<tm-button v-if="item.status=='3'" disabled :margin="[10, 10]" :width="140" :height="40"
								size="mini" :shadow="0" label="已结束">
							</tm-button>
						</view>
					</view>
				</tm-sheet>
			</view>

		</scroll-view>
		<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
	</tm-app>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findTaskRecrodList()
		}
	}
	const list = ref([])
	const count = ref(0)
	const params = ref({
		page: 1,
		limit: 4
	})
	onBeforeMount(() => {
		findTaskRecrodList()
	})
	const findTaskRecrodList = () => {
		Role.findTaskRecrodList(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
