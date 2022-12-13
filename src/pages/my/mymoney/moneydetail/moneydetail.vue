<template>
	<tm-app>
		<tm-navbar title="资金流水">
		</tm-navbar>
		<view class="zhye ">
			<view class="flex  mt-30 mb-30 ml-40">
				<tm-text color="#fff" :fontSize="28" label="账户余额"></tm-text>
			</view>
			<view class="flex flex-row-center-start ml-40">
				<tm-text color="#fff" :fontSize="22" label="￥"></tm-text>
				<tm-text color="#fff" :fontSize="40" :label="money"></tm-text>
			</view>
		</view>
		<tm-sheet :margin="[0,10]">
			<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center" :list="tabsTitle"
				:itemHeight="30" :itemWidth="100" :width="700" :height="30" default-name="-1">
			</tm-tabs>
		</tm-sheet>
		<view class="aaaa" style="padding: 0rpx 20rpx;">
			<tm-sheet class="flex mt-20" :width="670" :round="3" :shadow="0" :margin="[0,0]" :padding="[20,10]">
				<view class="flex" @click="tabsClick()">
					<tm-text class="text-weight-b " :font-size="30" label="时间范围"></tm-text>
					<tm-icon class="ml-5" v-if="!typeShow" :color="''" :fontSize="25" name="tmicon-angle-down">
					</tm-icon>
					<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
					</tm-icon>
				</view>
				<view v-if="typeShow" class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
					<tm-tag checkable :checked="acc ===1? true :false" size="s" label="最近7天" @click="tagChange(1)">
					</tm-tag>
					<tm-tag checkable :checked="acc ===2? true :false" size="s" label="最近15天" @click="tagChange(2)">
					</tm-tag>
					<tm-tag checkable :checked="acc ===3? true :false" class="" size="s" label="最近30天"
						@click="tagChange(3)"></tm-tag>
				</view>
			</tm-sheet>
		</view>
		<scroll-view scroll-y="true" :class="list.length>0?'scroll-Y':''" @scrolltolower="lower" >
			<tm-sheet :round="5" :shadow="0" :margin="[20,10]" :padding="[10,10]" v-for="item in list" :key="item.id">
				<view class="flex flex-between ma-10">

					<tm-text class="ml-14 text-weight-b" :fontSize="26" :label="item.typeName"></tm-text>
					<view class="flex">
						<tm-text
							v-if="item.type=='10'||item.type=='11'||item.type=='12'||item.type=='30' ||item.type=='51'"
							class="ml-14 text-weight-b" :fontSize="22" label="-"></tm-text>
						<tm-text v-else class="ml-14 text-weight-b" :fontSize="22" label="+"></tm-text>
						<tm-text class="mr-14" :fontSize="26" :label="`￥${item.money}`"></tm-text>
					</view>

				</view>
				<view class="flex flex-between ma-10">
					<tm-text class="ml-14" color='#808080' :fontSize="26"
						:label="DateUtils.formatDateTime(item.payTime)"></tm-text>
					<tm-text class="mr-14" color='#808080' :fontSize="18" :label="`余额：${item.afterMoney}`"></tm-text>
				</view>
			</tm-sheet>
		</scroll-view>

		<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>

		<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
	</tm-app>
</template>

<script setup>
	import DateUtils from "@/utils/dateUtils";
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { My } from "@/api/api.ts"
	import { onMounted, ref } from "vue";
	import wushuju from "@/static/my/wushuju.png"
	const tabsTitle = ref([{
			key: "-1",
			title: "全部"
		},
		{
			key: "0",
			title: "充值"
		},
		{
			key: "1",
			title: "提现"
		},
		{
			key: "2",
			title: "支出"
		},
		{
			key: "3",
			title: "收入"
		}
	]);
	//类型下标
	const index = ref(-1);
	const money = ref(1);
	onLoad((e) => {
		money.value = e.money;
	})
	const list = ref([])
	const count = ref(0)
	const params = ref({
		type: "",
		page: 1,
		limit: 20,
		payStartDate: "",
		payEndDate: "",
	})
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findList()
		}
	}
	onMounted(() => {
		findList()
	})
	const typeShow = ref(false)
	const cover = ref(false)
	const acc = ref(0)

	const tabsClick = (i) => {
		if (typeShow.value) {
			typeShow.value = false
			cover.value = false
		} else {
			typeShow.value = true
			cover.value = true
		}
	}
	const tabsChange = (i) => {
		if (i > -1) {
			params.value.type = i
		} else {
			params.value.type = ""
		}
		index.value = i
		list.value = []
		findList()
	}
	const tagChange = (i) => {
		if (i == 1 && acc.value != i) { //最近7天
			params.value.payStartDate = DateUtils.getLastNDays(7);
			params.value.payEndDate = DateUtils.getLastNDays(0);
		} else if (i == 2 && acc.value != i) { //最近15天
			params.value.payStartDate = DateUtils.getLastNDays(15);
			params.value.payEndDate = DateUtils.getLastNDays(0);
		} else if (i == 3 && acc.value != i) { //最近30天
			params.value.payStartDate = DateUtils.getLastNDays(30);
			params.value.payEndDate = DateUtils.getLastNDays(0);
		} else {
			params.value.payStartDate = "";
			params.value.payEndDate = "";
		}
		acc.value = i
		list.value = [];
		findList()
	}
	const findList = () => {
		My.walletList(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
</script>

<style>
	.zhye {
		width: 750rpx;
		height: 190rpx;
		background-image: url('@/static/img/zhqb.png');
		background-size: 100% 100%;
	}

	.active {
		border: 1px solid #07EBFE;
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

	.aaaa {
		position: relative;
		z-index: 11;
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

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx - 190rpx);
	}
</style>
