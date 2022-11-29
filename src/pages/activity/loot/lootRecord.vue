<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-navbar title="夺宝">
		</tm-navbar>
		<view class="main">
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
			<view class="bj ma-20 pt-20">
				<view class="lists">
					<view class="list" v-for="(data,index) in 15">
						<view class="flex flex-row-center-between ma-10">
							<tm-image style="" :round="4" :width="67" :height="92" :src="jifen"></tm-image>
							<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="积分 X 50"></tm-text>
							<view class="flex">
								<tm-text _class="text-weight-b ml-50" color="#f5f5f5" :font-size="26" label="消耗"></tm-text>
								<tm-text _class="text-weight-b ml-10" color="red" :font-size="30" label="￥10"></tm-text>
							</view>
							<tm-image style="margin-left: 50rpx;" :round="4" :width="120" :height="63" :src="duihuan"></tm-image>
						</view>
					</view>
				</view>
				
				<view class="bottom mt-20">
					<view class="flex flex-center">
						<view class="mt--12 flex">
							<view class="left flex flex-row-center-end">
								<view class="flex flex-col flex-center mt-36 mr-20">
									<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="藏品换积分"></tm-text>
								</view>
							</view>
							<view class="right flex flex-row-center-start">
								<view class="flex flex-col flex-center mt-36 ml-20">
									<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="余额换积分"></tm-text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
	})
</script>
<style>
	.main {
		background-image: url("@/static/activity/loot/bj.png");
		background-size: 100% 100%;
		min-height: calc(100vh - 88rpx - var(--status-bar-height));
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
		//padding-bottom: 300rpx;
	}
	.lists{
		max-height: calc(100vh - 500rpx);
		overflow: scroll;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}

	.bottom {
		margin-left: -20rpx;
		margin-bottom: -20rpx;
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
