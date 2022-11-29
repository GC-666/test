<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower" v-if="list.length>0">
			<view class="" v-for="item in list">
				<tm-sheet :round="4" color="grey" :margin="[20,20]" :padding="[0,0]">
					<tm-sheet :round="4" color="grey-3" :margin="[0,0]" :padding="[10,10]">
						<view class="flex flex-between">
							<view class="flex flex-col flex-around">
								<tm-text :fontSize="32" _class="text-weight-b" :label="item.name"></tm-text>

								<view class="flex" v-if="item.type=='1'">
									<tm-icon class="pt-2" :fontSize="28" name="tmicon-clock"></tm-icon>
									<tm-countdown class="text-size-n ml-10" :time="parseInt(item.surplusTime)"
										format="HH:MM:SS" autoStart>
									</tm-countdown>
								</view>
							</view>
							<tm-image :round="4" :width="100" :height="100" :src="item.img"></tm-image>
						</view>
						<tm-sheet :margin="[20,20]" :round="4" :padding="[10,10]">
							<view class="flex flex-between">
								<view class="">
									<tm-text v-if="item.jobAskName!==''" :fontSize="24"
										:label="`职业：${item.jobAskName}`"></tm-text>
									<tm-text v-else :fontSize="24" :label="`职业：无限制`"></tm-text>
								</view>

								<tm-text :fontSize="24" :label="`每次时长：${item.everyTime}分钟`"></tm-text>
								<view class="flex">
									<tm-text :fontSize="24" v-if="item.attributeType==='0'"
										:label="`要求：Lv${item.gradeAsk}/>${item.attributeTypeValue}智力`"></tm-text>
									<text v-else-if="item.attributeType==='1'">力量</text>
									<text v-else-if="item.attributeType==='2'">敏捷</text>
									<text v-else-if="item.attributeType==='3'">智力</text>
									<text v-else-if="item.attributeType==='4'">生命值</text>
									<text v-else-if="item.attributeType==='5'">攻击力</text>
									<text v-else-if="item.attributeType==='6'">防御力</text>
									<text v-else-if="item.attributeType==='7'">魔法抗性</text>
									<text v-else-if="item.attributeType==='8'">命中</text>
								</view>

							</view>
							<view class="mt-20 flex">
								<tm-text :fontSize="24" label="报酬："></tm-text>
								<view class="flex flex-col ">
									<tm-text v-for=" i in item.rewardList" :fontSize="24"
										:label="`${i.objectName}*${i.objectCount}`"></tm-text>
								</view>
							</view>
						</tm-sheet>
						<view class="ml-20 flex flex-between ">
							<view class="">
								<view class="" v-if="item.totalCount !=='0'">
									<tm-text :fontSize="24" :label="`总次数 (${item.useCount}/${item.totalCount})`">
									</tm-text>
									<tm-progress :width="300" :height="10"
										:percent="item.useCount===item.totalCount?100:0">
									</tm-progress>
								</view>
								<view class="" v-else>
									<tm-text :fontSize="24" :label="`已完成：${item.useCount}次`"></tm-text>
								</view>
							</view>
							<view class="">
								<tm-button :margin="[10, 10]" :width="140" :height="40" size="mini" :shadow="0"
									label="开始冒险">
								</tm-button>
							</view>
						</view>
					</tm-sheet>
					<view class="flex flex-row-center-between" style="" v-if="item.userReceiveCount>0">
						<view class="flex flex-row-center-between">
							<tm-text class="ml-20" :fontSize="24" label="参与角色"></tm-text>
							<view class="flex-center  ma-10">
								<image class="bb" v-for="i in item.userList" :src="i.heroImg" mode="aspectFill"></image>
							</view>
						</view>
						<view class="" v-if="item.userReceiveCount>0">
							<tm-text class="mr-20" :fontSize="24" label="可领取" @click="heroOnekeyReceive(item.id)">
							</tm-text>
						</view>
					</view>
				</tm-sheet>
			</view>
		</scroll-view>
		<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
		<view v-show="show" class="cover" @click.stop="show=false">
		</view>
		<view class="">
			<view class="relative">
				<tm-float-button :offset="[60,40]" :btn="{ icon: show? 'tmicon-ios-remove' : 'tmicon-plus'}"
					class="mb-n25" @click="show = !show">
				</tm-float-button>
			</view>
			<view class="absolute flex flex-col" style="bottom: 60rpx;right: 150rpx;z-index: 10;" v-if="show">
				<tm-button style="position: absolute;right: -30rpx;bottom: -100rpx;" :margin="[20, 20]" size="mini"
					:width="70" :height="70" :round="20" :shadow="0" label="冒险列表">
				</tm-button>
				<tm-button style="position: absolute;right: 22rpx;bottom: -8rpx;" :margin="[20, 20]" size="mini"
					:width="70" :height="70" :round="20" :shadow="0" label="一键冒险" @click="heroOnekeyWork">
				</tm-button>
				<tm-button style="position: absolute;right: -32rpx;bottom: 88rpx;" :margin="[20, 20]" size="mini"
					:width="70" :height="70" :round="20" :shadow="0" label="一键领取">
				</tm-button>
				<tm-button style="position: absolute;right: -136rpx;bottom: 92rpx;" :margin="[20, 20]" size="mini"
					:width="70" :height="70" :round="20" :shadow="0" label="冒险记录"
					@click="show=false;gonav('pages/my/role/takelist/takelist')"></tm-button>
			</view>
		</view>

		<tm-modal :height="550" :border="0" title="" splitBtn hideCancel okText="立即收下" v-model:show="showWin2" @ok="ok">
			<view class="flex flex-center flex-col">
				<tm-text :fontSize="30" label="冒险完成"></tm-text>
				<tm-text class="mt-20" :fontSize="30" label="恭喜获得以下收益"></tm-text>
				<view class="">
					<tm-text v-for="item in receiveList" class="mt-20" :fontSize="30"
						:label="`${item.objectName}*${item.objectCount}`"></tm-text>
				</view>
			</view>
		</tm-modal>
	</view>
</template>
<script setup>
	import { Role } from "@/api/api.ts"
	import { computed, onBeforeMount, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const percent = computed((val, val2) => {
		return val === val2 ? 100 : val
	})

	const height = ref('')
	const show = ref(false)
	const showWin2 = ref(false)

	const typeShow = ref(false)
	const list = ref([])
	const receiveList = ref([])
	const count = ref(0)
	const params = ref({
		page: 1,
		limit: 10
	})
	onBeforeMount(() => {
		findTaskList()
	})
	const findTaskList = () => {
		Role.findTaskList(params.value).then(res => {
			count.value = res.heroTaskList.length
			list.value = list.value.concat(res.heroTaskList)
		})
	}
	const ok = () => {

		params.value.page = 1
		list.value = []
		findTaskList()
	}
	const heroOnekeyWork = () => {
		Role.heroOnekeyWork().then(res => {
			uni.showToast({
				title: '冒险成功',
				icon: 'none'
			})
			params.value.page = 1
			list.value = []
			findTaskList()
			show.value = false
		})
	}
	const heroOnekeyReceive = (id) => {
		Role.heroOnekeyReceive({ taskId: id }).then(res => {
			receiveList.value = res
			showWin2.value = true
		})
	}
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findTaskList()
		}
	}
</script>

<style>
	.aa {
		margin-left: -5%;
	}

	.bb {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-left: -5%;
	}

	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx - 90rpx);
	}
</style>
