<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<view class="main">
			<tm-navbar title="夺宝">
			</tm-navbar>
			<view class="flex flex-center flex-col mt-10">
				<view class="baoxiang">
					<tm-image style="margin-top: 40rpx;margin-left: 82rpx;" :round="4" :width="285" :height="68" :src="jifenduihuan">
					</tm-image>
					<tm-image style="margin-top: 29rpx;margin-left: 132rpx;" :round="4" :width="210" :height="51" :src="cangpinduihuan">
					</tm-image>
					<tm-image style="margin-top: 23rpx;margin-left: 176rpx;" :round="4" :width="210" :height="51" :src="yueduihuan">
					</tm-image>
				</view>
			</view>
			<view class="bj ma-20 pt-20 pb-20">
				<view v-if="exchangeMethod==0" class="lists flex flex-col flex-between">
					<scroll-view style="height:650rpx" scroll-y="true" @scrolltolower="lower">
						<view class="flex flex-row-center-between" style="margin: 10rpx 0rpx ;" v-for="(data,index) in lootFindUserGrantExchange">
							<tm-image style="" :round="4" :width="180" :height="180" :src="data.collImg"></tm-image>
							<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26" label="可转换"></tm-text>
							<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26" :label="`积分 X ${data.collIntegral}`"></tm-text>
							<tm-image @click="CollectionExchange(data)" style="margin-right: 20rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
						</view>
					</scroll-view>
				</view>
				<view v-else-if="exchangeMethod==1 && !openBalanceIntegral==0" class="lists flex flex-col flex-between pl-30 pr-30">
					<view class="flex flex-row-center-between">
						<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
						<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" :label="`积分 X ${balanceIntegralValue*10}`"></tm-text>
						<view class="flex">
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
							<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥10"></tm-text>
						</view>
						<tm-image @click="balanceExchange(10)" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
					</view>
					<view class="flex flex-row-center-between">
						<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
						<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" :label="`积分 X ${balanceIntegralValue*20}`"></tm-text>
						<view class="flex">
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
							<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥20"></tm-text>
						</view>
						<tm-image @click="balanceExchange(20)" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
					</view>
					<view class="flex flex-row-center-between">
						<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
						<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" :label="`积分 X ${balanceIntegralValue*50}`"></tm-text>
						<view class="flex">
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
							<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥50"></tm-text>
						</view>
						<tm-image @click="balanceExchange(50)" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
					</view>
					<view class="flex flex-row-center-between">
						<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
						<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" :label="`积分 X ${balanceIntegralValue*100}`"></tm-text>
						<view class="flex">
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
							<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥100"></tm-text>
						</view>
						<tm-image @click="balanceExchange(100)" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
					</view>
					<view class="flex flex-row-center-between">
						<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
						<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" :label="`积分 X ${balanceIntegralValue*200}`"></tm-text>
						<view class="flex">
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
							<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥200"></tm-text>
						</view>
						<tm-image @click="balanceExchange(200)" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
					</view>
				</view>
				<view v-if="exchangeMethod==2" class="lists">
					<tm-text _class="text-weight-b mt-20 flex flex-center" color="#ffffff" :font-size="36" label="兑换规则"></tm-text>
					<view class="" style="color:#fff;font-size: 26rpx;font-weight: bold;margin: 0rpx 50rpx;">
						<view class="" style="letter-spacing:2rpx;line-height: 50rpx;">
							1 . 规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则
						</view>
						<view class="" style="letter-spacing:2rpx;line-height: 50rpx;">
							2 . 规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则
						</view>
						<view class="" style="letter-spacing:2rpx;line-height: 50rpx;">
							3 . 规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则
						</view>
					</view>
				</view>
			</view>
			<view class="bottom mt-20">
				<view class="flex flex-center">
					<view class="mt--12 flex">
						<view class="left flex flex-row-center-end" @click="mode(0)">
							<view class="flex flex-col flex-center mt-36 mr-20">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="藏品换积分"></tm-text>
							</view>
						</view>
						<view v-if="!openBalanceIntegral==0" class="right flex flex-row-center-start" @click="mode(1)">
							<view class="flex flex-col flex-center mt-36 ml-20">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="余额换积分"></tm-text>
							</view>
						</view>
						<view v-else class="rightno flex flex-row-center-start">
							<view class="flex flex-col flex-center mt-36 ml-20">
								<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26" label="余额换积分"></tm-text>
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-row-bottom-end mt-n10 mr-n10">
					<tm-text @click="mode(2)" _class="text-weight-s" color="#ffffff" :font-size="26" label="兑换规则"></tm-text>
				</view>
			</view>
		</view>
		<tm-modal :height="350" title="提示" splitBtn okText="确认" v-model:show="show1"
			@ok="submit1" >
				<view class="flex flex-center">
					<tm-image style="" :round="4" :width="67" :height="92" :src="contentD.collImg"></tm-image>
					<tm-text _class="text-weight-b ml-50" color="#000" :font-size="26" label="消耗1张"></tm-text>
					<tm-text _class="text-weight-b ml-50" color="#000" :font-size="26" :label="`兑换积分 X ${contentD.collIntegral}`"></tm-text>
				</view>
		</tm-modal>
		<tm-modal :height="380" title="提示" splitBtn okText="确认" v-model:show="show2" 
			@ok="submit2" >
			<view class="flex flex-row-center-center">
				<tm-text class="mt-30" :font-size="26" :label="content"></tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>

<script setup>
	import yueduihuan from "@/static/activity/loot/exchange/yueduihuan.png"
	import cangpinduihuan from "@/static/activity/loot/exchange/cangpinduihuan.png"
	import jifenduihuan from "@/static/activity/loot/exchange/jifenduihuan.png"
	import jifen from "@/static/activity/loot/exchange/jifen.png"
	import duihuan from "@/static/activity/loot/exchange/duihuan.png"
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { Activity } from "@/api/api.ts";
	import { onMounted, reactive, ref } from 'vue';
	//每次加载页面执行
	onShow(() => {
		lootFindItem();
		mode(0);
	})
	//余额兑换积分是否开启
	const openBalanceIntegral = ref(0);
	//余额兑换积分比例
	const balanceIntegralValue = ref(0);
	//获取全局内容
	const lootFindItem = () => {
		Activity.lootFindItem().then(res => {
			balanceIntegralValue.value=res.balanceIntegralValue;
			console.log(balanceIntegralValue.value);
		})
	}
	//兑换方式
	const exchangeMethod = ref(-1);
	//藏品兑换积分或者余额兑换积分
	const mode = (i) => {
		if(i==0 && exchangeMethod.value!=i){
			//藏品兑换积分
			getlootFindUserGrantExchange(0);
		}else if(i==1){
			//余额兑换积分
			
		}else if(i==2){
			//兑换规则
			
		}
		exchangeMethod.value=i;
	}
	//余额兑换积分提示内容
	const content = ref("");
	const contentV = ref("");
	//余额兑换提示
	const show2 = ref(false);
	//余额兑换积分提示
	const balanceExchange = (v) => {
		show2.value=true;
		contentV.value=v;
		let aa= v * balanceIntegralValue.value;
		content.value="确认消耗 "+ v +" 余额兑换："+ aa +"积分吗？";
	}
	//余额兑换提交
	const submit2 = () => {
		Activity.lootBalanceToIntegral({
			"value": contentV.value
		}).then(res => {
		})
	}
	//可兑换藏品列表
	const lootFindUserGrantExchange = ref([]);
	const lootFindUserGrantExchangePage = ref({
		page:1,
		limit:20
	});
	//是否还有数据
	const lootFindUserGrantExchangeBool = ref(false);
	//获取可兑换藏品列表
	const getlootFindUserGrantExchange = (type) => {
		if(type==0){
			lootFindUserGrantExchangePage.value.page=1;
			lootFindUserGrantExchange.value=[];
		}else{
			lootFindUserGrantExchangePage.value.page++;
		}
		Activity.lootFindUserGrantExchange(
			lootFindUserGrantExchangePage.value
		).then(res => {
			if (res.length == lootFindUserGrantExchangePage.value.limit) {
				lootFindUserGrantExchangeBool.value = true;
			} else {
				lootFindUserGrantExchangeBool.value = false;
			}
			lootFindUserGrantExchange.value = lootFindUserGrantExchange.value.concat(res);
		})
	}
	//藏品兑换提示
	const show1 = ref(false);
	//藏品兑换提示
	const contentD = ref({});
	const CollectionExchange = (data) => {
		contentD.value=data;
		show1.value=true;
	}
	//藏品兑换提交
	const submit1 = () => {
		Activity.lootIntegralExchange({
			"id": contentD.value.id
		}).then(res => {
			mode(0);
			uni.showToast({
				title: "兑换成功",
				icon: 'none'
			})
		})
	}
	// 下拉刷新
	const lower = () => {
		console.log("滚动到底部")
		if(lootFindUserGrantExchangeBool.value){
			getlootFindUserGrantExchange(1);
		}
	}
</script>
<style>
	.main {
		background-image: url("@/static/activity/loot/bj.png");
		background-size: 100% 100%;
		position: relative;
		min-height: 100vh;
	}

	.baoxiang {
		background-image: url("@/static/activity/loot/exchange/baoxiangright.png");
		background-size: 100% 100%;
		width: 616rpx;
		height: 408rpx;
		margin-right: $0;
	}
	.bj{
		background-image: url("@/static/activity/loot/exchange/bj.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 650rpx;
		//padding-bottom: 100rpx;
	}
	.lists{
		height: 650rpx;
		overflow: scroll;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.list{
		display: flex;
		flex-direction: column;
		justify-content:center;
	}

	.bottom {
		position: absolute;
		/* margin-left: -20rpx;
		margin-bottom: -20rpx; */
		background-image: url("@/static/activity/loot/bottom.png");
		background-size: 100% 100%;
		width: 750rpx;
		height: 214rpx;
	}

	.left {
		background-image: url("@/static/activity/loot/left.png");
		background-size: 100% 100%;
		width: 240rpx;
		height: 118rpx;
	}

	.right {
		background-image: url("@/static/activity/loot/right.png");
		background-size: 100% 100%;
		width: 240rpx;
		height: 118rpx;
	}
	.rightno {
		background-image: url("@/static/activity/loot/rightno.png");
		background-size: 100% 100%;
		width: 240rpx;
		height: 118rpx;
	}

</style>
