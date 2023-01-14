<template>
	<tm-app>
		<view class="" style="background-color:#1E1F28;min-height: 100vh;">
			<tm-navbar color="#1E1F28" :shadow="0">
				<template v-slot:default>
					<view class="flex flex-center">
						<tm-image :width="50" :height="50" :src="space"></tm-image>
						<tm-text class="text-weight-b ml-10" :fontSize="32" label="空间"></tm-text>
					</view>
				</template>
				<template v-slot:right>
					<view class="mr-20">
						<tm-text v-if="follow1" class="" :fontSize="28" label="添加关注" @click="follow"></tm-text>
						<tm-text v-else class="" :fontSize="28" label="取消关注" @click="unfollow"></tm-text>
					</view>
				</template>
			</tm-navbar>
			<view class="" style="background-color: #1E1F28;">
				<view class="mt-20 flex ">
					<view class="flex flex-row-center-start flex-1 ">
						<tm-text v-if="StatisticDdetails.isShip==1" class="mr-8 ml-20" :fontSize="22" color="#fff" label="寄售中"></tm-text>
						<tm-text v-else class="mr-8 ml-20" :fontSize="22" color="#fff" label="关闭中"></tm-text>
						<tm-sheet :round="3" :color="StatisticDdetails.isShip==1?'red':'green'" :shadow="0" :margin="[0,0]"
							:height="12" :width="12" :padding="[0,0]">
						</tm-sheet>
					</view>
					<view class="flex  flex-2">
						<tm-text class="" color="#fff" :fontSize="32" :label="StatisticDdetails.name"></tm-text>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="pl-15 pr-21 pt-15 flex">
					<tm-image :width="146" :height="146" :src="StatisticDdetails.img"></tm-image>
					<view class="ml-n10 flex flex-col flex-between">
						<view class="">
							<tm-text class="" color="#FDC675" :fontSize="20" label="当前平均价"></tm-text>
							<view class="flex flex-between mt-5" style="width:480rpx">
								<tm-text class="text-weight-b ml-20" color="#fff" :fontSize="38" :label="`￥${StatisticDdetails.jrpj}`"></tm-text>
								<view class="flex flex-center mr-25">
									<tm-text v-if="StatisticDdetails.jrpj>StatisticDdetails.zrpj && StatisticDdetails.jrpj!=0 && StatisticDdetails.zrpj!=0" class="flex-center ml-20" 
									color="#F90808" :fontSize="24" :label="`+${pj}%`"></tm-text>
									<tm-text v-if="StatisticDdetails.jrpj<StatisticDdetails.zrpj && StatisticDdetails.jrpj!=0 && StatisticDdetails.zrpj!=0" class="flex-center ml-20" 
									color="green" :fontSize="24" :label="`${pj}%`"></tm-text>
									<tm-text v-if="StatisticDdetails.jrpj==StatisticDdetails.zrpj || StatisticDdetails.zrpj==0" class="flex-center ml-20" 
									color="#F90808" :fontSize="24" label="+0%"></tm-text>
									<tm-text v-if="StatisticDdetails.jrpj>StatisticDdetails.zrpj && StatisticDdetails.jrpj!=0 && StatisticDdetails.rpj!=0" class="flex-center ml-20" 
									color="#F90808" :fontSize="24" :label="`+${Math.round((StatisticDdetails.jrpj - StatisticDdetails.zrpj)*100)/100}`"></tm-text>
									<tm-text v-if="StatisticDdetails.jrpj<StatisticDdetails.zrpj && StatisticDdetails.jrpj!=0 && StatisticDdetails.zrpj!=0" class="flex-center ml-20" 
									color="green" :fontSize="24" :label="`${Math.round((StatisticDdetails.jrpj - StatisticDdetails.zrpj)*100)/100}`"></tm-text>
									<tm-text v-if="StatisticDdetails.jrpj==StatisticDdetails.zrpj || StatisticDdetails.zrpj==0" class="flex-center ml-20" 
									color="#F90808" :fontSize="24" label="+0"></tm-text>
								</view>
								<!-- <view class="flex flex-center">
									<tm-text class="" color="#dadada" :fontSize="24" label="换手率"></tm-text>
									<tm-text class="ml-5" color="#fff" :fontSize="24" label="2%"></tm-text>
								</view> -->
							</view>
						</view>
						<view class="">
							<tm-text class="" color="#fff" :fontSize="26" :label="StatisticDdetails.publisher"></tm-text>
						</view>
					</view>
				</view>
				<view class="pl-15 pr-21 pt-25 flex flex-wrap flex-between">
					<view class="flex flex-center mt-20" style="width:50%">
						<tm-text class="" color="#dadada" :fontSize="24" label="今日首次售价"></tm-text>
						<tm-text class="ml-25" color="red" :fontSize="24" :label="StatisticDdetails.jrsc"></tm-text>
					</view>
					<view class="flex flex-center" style="width:50%">
						<tm-text class="" color="#dadada" :fontSize="24" label="今日最高售价"></tm-text>
						<tm-text class="ml-25" color="#fff" :fontSize="24" :label="StatisticDdetails.jrzg"></tm-text>
					</view>
					<view class="flex flex-center mt-20" style="width:50%">
						<tm-text class="" color="#dadada" :fontSize="24" label="昨日最终售价"></tm-text>
						<tm-text class="ml-25" color="#fff" :fontSize="24" :label="StatisticDdetails.zrzh"></tm-text>
					</view>
					<view class="flex flex-center mt-20" style="width:50%">
						<tm-text class="" color="#dadada" :fontSize="24" label="今日最低售价"></tm-text>
						<tm-text class="ml-25" color="#fff" :fontSize="24" :label="StatisticDdetails.jrzd"></tm-text>
					</view>
				</view>
			</view>
			<view class="" style="background-color: #1E1F28;padding: 20rpx 40rpx;">
				<view class="flex flex-between">
					<view class="flex  mr-40">
						<tm-text color="#FDE2BC" :font-size="26" label="编号"></tm-text>
					</view>
					<view class="flex  mr-40" @click="newPriceSort">
						<tm-text color="#FDE2BC" :font-size="26" label="价格"></tm-text>
						<view class="flex flex-col">
							<tm-icon :fontSize="14" :color="newPrice?'#f5f5f5':'#00A8FF'" name="tmicon-sort-up">
							</tm-icon>
							<tm-icon :fontSize="14" :color="newPrice?'#00A8FF':'#f5f5f5'" name="tmicon-sort-down">
							</tm-icon>
						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" :class="list.length>0?'scroll-Y':''" @scrolltolower="lower">
				<view class="list flex flex-row-center-between relative"
					@click="gonav('pages/space/goodpage?id='+item.id)" v-for="(item,index) in list" :key="index">
					<view class="flex flex-center">
						<tm-text class="" :font-size="22" color="#FDE2BC" :label="item.no"></tm-text>
						<view class="absolute b-20" v-if="item.type==2">
							<tm-text class="" :font-size="24" color="#00a8ff" label="交易中"></tm-text>
						</view>
					</view>
					<view class="flex flex-end">
						<tm-text color="white" :font-size="24" label="￥"></tm-text>
						<tm-text color="white" :font-size="38" :label="item.price"></tm-text>
					</view>
					<view class="flex">
						<tm-text v-if="item.jrpj>item.zrpj && item.jrpj!=0 && item.zrpj!=0"
							class="flex-center" color="#F90808" :fontSize="30"
							:label="`+${Math.round(((item.jrpj - item.zrpj) / item.zrpj) * 100) / 100}%`">
						</tm-text>
						<tm-text v-if="item.jrpj<item.zrpj && item.jrpj!=0 && item.zrpj!=0"
							class="flex-center" color="green" :fontSize="30"
							:label="`${Math.round(((item.jrpj - item.zrpj) / item.zrpj) * 100) / 100}%`">
						</tm-text>
						<tm-text v-if="item.jrpj==item.zrpj || item.zrpj==0 || item.jrpj==0"
							class="flex-center" color="#F90808" :fontSize="30" label="+0%"></tm-text>
					</view>
				</view>
			</scroll-view>
			<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
			</view>
		</view>
	</tm-app>
</template>
<script setup>
	import space from "@/static/space/xlogo.png"
	import r from "@/static/space/right.png"
	import { ref,computed } from 'vue'
	import { Market, Space } from "@/api/api.ts"
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import wushuju from "@/static/my/wushuju.png"
	// 是否排序
	const newPrice = ref(false)
	const up = ref(true)
	const number = ref(true)
	const newPriceSort = () => {
		params.value.pageNo=1
		list.value = []
		newPrice.value = !newPrice.value;
		if (newPrice.value) {
			params.value.type = 3
		} else {
			params.value.type = 4
		}
		show()
	}
	const params = ref({
		type: 4,
		screanTxt: '',
		classIds: '',
		pageNo: 1,
		pageSize: 20,
		collid: 0,
		platform: 1
	})
	const list = ref([])
	const count = ref(0)
	const show = () => {
		Market.show(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
	const lower = () => {
		if (count.value > 0) {
			params.value.pageNo += 1
			show()
		}
	}
	const id = ref(0)
	const StatisticDdetails = ref({})

	onLoad((e) => {
		id.value = e.id
		params.value.collid = e.id
		show()
		Space.StatisticDdetails({id:id.value}).then(res => {
			StatisticDdetails.value = res;
			if(res.isFollow==0){
				follow1.value=true;
			}else{
				follow1.value=false;
			}
		})
	})
	let pj=computed(()=>{
		return Math.round(((StatisticDdetails.value.jrpj - StatisticDdetails.value.zrpj) / StatisticDdetails.value.zrpj)*100)/100;
	})
	const follow1 = ref(true)
	// 添加关注
	const follow = () => {
		Space.follow({ collid: id.value }).then(res => {
			uni.showToast({
				title: res,
				icon: 'none'
			})
			follow1.value = false
		})
	}
	const unfollow = () => {
		Space.unfollow({ collid: id.value }).then(res => {
			uni.showToast({
				title: res,
				icon: 'none'
			})
			follow1.value = true
		})
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx - 488rpx);
	}

	.list {
		width: 670rpx;
		height: 137rpx;
		background-image: url('../../static/space/list.png');
		background-size: 100% 100%;
		margin: 10rpx auto;
		padding: 0rpx 20rpx
	}

	.content {
		background-image: url('../../static/space/content.png');
		background-size: 100% 100%;
		width: 710rpx;
		height: 326rpx;
		margin: 10rpx auto;
	}
</style>
