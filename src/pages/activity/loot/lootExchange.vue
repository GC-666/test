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
					<tm-image style="margin-top: 29rpx;margin-left: 132rpx;" :round="4" :width="210" :height="51" :src="yueduihuan">
					</tm-image>
					<tm-image style="margin-top: 23rpx;margin-left: 176rpx;" :round="4" :width="210" :height="51" :src="cangpinduihuan">
					</tm-image>
				</view>
			</view>
			<view class="bj ma-20 pa-20">
				<view v-if="true" class="lists flex flex-col flex-between">
					<view class="list" v-for="(data,index) in 5">
						<view class="flex flex-row-center-between">
							<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="积分 X 50"></tm-text>
							<view class="flex">
								<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
								<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥10"></tm-text>
							</view>
							<tm-image @click="show1=true" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
						</view>
					</view>
				</view>
				<view v-else class="lists flex flex-col flex-between">
					<view class="list" v-for="(data,index) in 5">
						<view class="flex flex-row-center-between">
							<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
							<view class="flex flex-center">
								<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
								<tm-image style="margin-left: 10rpx;" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
							</view>
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="积分 X 50"></tm-text>
							<tm-image @click="show2=true" style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom mt-20">
				<view class="flex flex-center">
					<view class="mt--12 flex">
						<view class="left flex flex-row-center-end">
							<view class="flex flex-col flex-center mt-36 mr-20">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="余额换积分"></tm-text>
							</view>
						</view>
						<view class="right flex flex-row-center-start">
							<view class="flex flex-col flex-center mt-36 ml-20">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="藏品换积分"></tm-text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tm-modal :height="380" title="提示" splitBtn okText="确认" v-model:show="show1" :beforeClose="beforeClose"
			@ok="submit" >
			<view class="flex flex-row-center-center">
				<tm-text class="mt-30" :font-size="26" :label="content"></tm-text>
			</view>
		</tm-modal>
		<tm-modal :height="350" title="提示" splitBtn okText="确认" v-model:show="show2" :beforeClose="beforeClose"
			@ok="submit" >
				<view class="flex flex-center">
					<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
					<tm-text _class="text-weight-b ml-50" color="#000" :font-size="26" label="消耗1张"></tm-text>
					<tm-text _class="text-weight-b ml-50" color="#000" :font-size="26" label="兑换积分 X 50"></tm-text>
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
		lootBalanceToIntegral();
	})
	//余额兑换积分
	const lootBalanceToIntegral = () => {
		Activity.lootBalanceToIntegral({
			"value": v
		}).then(res => {
			
		})
	}
	//余额兑换提示
	const show1 = ref(false);
	//寄售提交
	const submit = () => {
		
	}
	//藏品兑换提示
	const show2 = ref(false);
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
		width: 670rpx;
		//padding-bottom: 100rpx;
	}
	.lists{
		height: 650rpx;
		overflow: scroll;
		margin-left: 40rpx;
		margin-right: 40rpx;
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

</style>
