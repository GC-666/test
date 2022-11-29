<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-navbar title="夺宝">
		</tm-navbar>
		<view class="main">
			<view class="head flex flex-center flex-col mt-10">
				<tm-text color="#fff" :font-size="26" _class="text-weight-b"
					:label="`积分剩余:${lootFindItem.userIntegal}`"></tm-text>
				<view class="baoxiang flex flex-between">
					<tm-image @click="gonav('pages/activity/loot/lootExchange')" style="margin-top: 170rpx;" :round="4" :width="256" :height="61" :src="jifenduihuan">
					</tm-image>
					<tm-image style="margin-top: 90rpx;" :round="4" :width="256" :height="61" :src="wodejilu">
					</tm-image>
				</view>
				<view class="choujiangdabeijing flex flex-center">
					<view class="flex flex-wrap flex-around mt-40 mb-25" style="width:533rpx;">
						<view :class="color[index]==1?'choujiangyes mt-10':'choujiangno mt-10'" style="width:171rpx;"
							v-for="(data,index) in lootFindItem.jackpotList">
							<tm-image v-if="data.goodsType==0" preview class="ml-8 mt-8" :round="4" :width="154"
								:height="154" :src="hongbao">
							</tm-image>
							<tm-image v-else-if="data.goodsType==1" preview class="ml-8 mt-8" :round="4" :width="154"
								:height="154" :src="jifen">
							</tm-image>
							<tm-image v-else preview class="ml-8 mt-8" :round="4" :width="154" :height="154"
								:src="data.goodsImg">
							</tm-image>
							<view class="flex flex-center">
								<tm-text _class="text-overflow text-weight-b"
									_style="max-width: 140rpx;text-overflow: ellipsis;"
									v-if="data.goodsType==0 || data.goodsType==1" color="#fff" :font-size="22"
									:label="`${data.goodsValue}${data.goodsName}`"></tm-text>
								<tm-text _class="text-overflow text-weight-b"
									_style="max-width: 140rpx;text-overflow: ellipsis;" v-else color="#fff"
									:font-size="22" :label="data.goodsName"></tm-text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom mt-20">
				<view class="flex flex-center">
					<view class="mt--12 flex">
						<view v-if="lootFindItem.isLoot==1" class="left flex flex-row-center-end" @click="luckDraw(1)">
							<view class="flex flex-col flex-center mt-36 mr-40">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="单次抽"></tm-text>
								<tm-text _class="text-weight-b" color="#922503" :font-size="26"
									:label="`${lootFindItem.singleValue}积分`"></tm-text>
							</view>
						</view>
						<view v-else class="leftno flex flex-row-center-end">
							<view class="flex flex-col flex-center mt-36 mr-40">
								<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26" label="单次抽"></tm-text>
								<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26"
									:label="`${lootFindItem.singleValue}积分`"></tm-text>
							</view>
						</view>
						<view v-if="lootFindItem.isLoot==1" class="right flex flex-row-center-start"
							@click="luckDraw(5)">
							<view class="flex flex-col flex-center mt-36 ml-40">
								<tm-text _class="text-weight-b" color="#922503" :font-size="26" label="五连抽"></tm-text>
								<tm-text _class="text-weight-b" color="#922503" :font-size="26"
									:label="`${lootFindItem.fiveValue}积分`"></tm-text>
							</view>
						</view>
						<view v-else class="rightno flex flex-row-center-start">
							<view class="flex flex-col flex-center mt-36 ml-40">
								<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26" label="五连抽"></tm-text>
								<tm-text _class="text-weight-b" color="#f5f5f5" :font-size="26"
									:label="`${lootFindItem.fiveValue}积分`"></tm-text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tm-modal :height="480" title="恭喜您获得" splitBtn okText="立即收下" :overlayClick="false" v-model:show="oneShow"
			hideCancel>

			<view class="flex flex-col flex-col-center-center">
				<tm-image v-if="oneData.goodsType==0" preview class="ml-8 mt-8" :round="4" :width="154" :height="154"
					:src="hongbao">
				</tm-image>
				<tm-image v-else-if="oneData.goodsType==1" preview class="ml-8 mt-8" :round="4" :width="154"
					:height="154" :src="jifen">
				</tm-image>
				<tm-text class="mt-30" :font-size="26" :label="`${oneData.goodsName}  ${oneData.goodsValue}`"></tm-text>
			</view>
		</tm-modal>
		<!-- 5连抽遮罩层 -->

		<tm-overlay v-model:show="showWin" contentAnimation :overlayClick="false">
			<tm-spin :load="load" tip="抽奖中" @click="load=false">
				<view class="" style="width: 200rpx;"></view>
			</tm-spin>
		</tm-overlay>

		<tm-modal :height="620" title="恭喜您获得" splitBtn okText="立即收下" :overlayClick="false" v-model:show="fiveShow"
			hideCancel>
			<view class="flex flex-wrap flex-around">
				<view class="flex ml-20 mr-20 mb-10 mt-10" v-for="item in fiveList">
					<view class="flex flex-col flex-center">
						<tm-image v-if="item.goodsType==0" preview class="mt-8" :round="4" :width="120" :height="120"
							:src="hongbao">
						</tm-image>
						<tm-image v-else-if="item.goodsType==1" preview class="mt-8" :round="4" :width="120"
							:height="120" :src="jifen">
						</tm-image>
						<tm-image v-else preview class="mt-8" :round="4" :width="120" :height="120"
							:src="item.goodsImg">
						</tm-image>
						<tm-text class="mt-10" _class="text-overflow"
							_style="max-width: 120rpx;text-overflow: ellipsis;" :font-size="18"
							:label="`${item.goodsName} ${item.goodsValue}`">
						</tm-text>
					</view>
				</view>
			</view>
		</tm-modal>
	</tm-app>
</template>

<script setup>
	import jifenduihuan from "@/static/activity/loot/jifenduihuan.png"
	import wodejilu from "@/static/activity/loot/wodejilu.png"
	import jifen from "@/static/activity/loot/jifen.png"
	import hongbao from "@/static/activity/loot/hongbao.png"

	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { Activity } from "@/api/api.ts";
	import { onMounted, reactive, ref } from 'vue';
	//返回数据
	const lootFindItem = ref({});
	//奖品信息
	const jackpotList = ref([]);
	// 单抽是否显示
	const oneShow = ref(false)
	// 5连抽遮罩层
	const showWin = ref(false)
	const load = ref(false)
	const fiveShow = ref(false)
	// 单抽获得的东西
	const oneData = ref({})
	// 5抽获得的东西
	const fiveList = ref([])
	//转盘转到的位置
	const color = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
	//每次加载页面执行
	onShow(() => {
		getLootFindItem();
	})
	const getLootFindItem = (e) => {
		Activity.lootFindItem({}).then(res => {
			//积分数量
			res.userIntegal = parseInt(res.userIntegal);
			//单抽消耗积分
			res.singleValue = parseInt(res.singleValue);
			//5连抽消耗积分
			res.fiveValue = parseInt(res.fiveValue);
			jackpotList.value = res.jackpotList;
			lootFindItem.value = res;
		})
	}
	//抽奖
	//计数器
	let interval = ref(null);
	//Luck	防止过度点击
	const Luck = ref(false);
	//开始抽奖
	const luckDraw = (count) => {
		//页面全部数据
		let data = lootFindItem.value;
		//转盘奖励数据
		let arr = jackpotList.value;
		//intime 值越大旋转时间越长  即旋转速度
		let intime = 100;
		//判断是否开启夺宝
		if (data.isLoot != "1") {
			uni.showToast({
				title: "夺宝未开启",
				icon: 'none'
			})
			return;
		}
		if (Luck.value) { //防止过度点击
			return;
		}
		Luck.value = true
		if (count == 1) {
			//判断是否能抽奖		根据剩余积分和抽奖所需积分
			if (parseInt(data.userIntegal) <= parseInt(data.freeConsume)) {
				Luck.value = false;
				uni.showToast({
					title: "积分不足,无法夺宝",
					icon: 'none'
				})
				return;
			}
			Activity.lootLuckDraw({ type: 0 }).then(res => {
				oneData.value = res.itemList[0]
				//清空计时器
				clearInterval(interval.value);
				let index = 0;
				//循环设置每一项的背景图
				interval.value = setInterval(function() {
					let c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					if (index > 8) {
						index = 0;
					}
					c[index] = 1;
					color.value = c;
					index++;
				}, intime);
				lootFindItem.value.userIntegal = lootFindItem.value.userIntegal - data.singleValue; //减去抽奖积分
				for (let i = 0; i < res.itemList.length; i++) {
					if (res.itemList[i].goodsType == '1') {
						lootFindItem.value.userIntegal = lootFindItem.value.userIntegal + parseInt(res
							.itemList[i].goodsValue); //加上抽奖积分									
					}
				}
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].id == res.itemList[0].typeId) {
						stop(i, intime);
					}
				}
			})
		} else if (count == 5) {

			//判断是否能抽奖		根据剩余积分和抽奖所需积分
			if (parseInt(data.fiveValue) <= parseInt(data.freeConsume)) {
				Luck.value = true;
				return;
			}
			showWin.value = true
			load.value = true
			Activity.lootLuckDraw({ type: 1 }).then(res => {
				fiveList.value = res.itemList
				lootFindItem.value.userIntegal = lootFindItem.value.userIntegal - data.fiveValue; //减去抽奖积分
				for (let i = 0; i < res.itemList.length; i++) {
					if (res.itemList[i].goodsType == '1') {
						lootFindItem.value.userIntegal = lootFindItem.value.userIntegal + parseInt(res
							.itemList[i].goodsValue); //加上抽奖积分									
					}
				}
			})
			setTimeout(() => {
				showWin.value = false
				load.value = false
				fiveShow.value = true
				Luck.value = false;
			}, 1500)
		}
	}
	const stop = (which, intime) => {

		//清空计数器
		clearInterval(interval.value);
		//初始化当前位置
		let current = -1;
		for (let i = 0; i < color.value.length; i++) {
			if (color.value[i] == 1) {
				current = i;
			}
		}
		//下标从1开始
		let index = current + 1;
		stopLuck(which, index, intime, 10);
	}
	const stopLuck = (which, index, time, splittime) => {
		setTimeout(function() {
			//重置前一个位置
			let c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			if (index > 8) {
				index = 0;
			}
			//当前位置为选中状态
			c[index] = 1;
			color.value = c;
			//如果旋转时间过短或者当前位置不等于中奖位置则递归执行
			//直到旋转至中奖位置
			if (time < 400 || index != which) {
				//越来越慢
				splittime++;
				time += splittime;
				//当前位置+1
				index++;
				//console.log(1, which, index, time, splittime);
				stopLuck(which, index, time, splittime);
			} else {
				Luck.value = false;
				oneShow.value = true
			}
		}, time);
	}
</script>
<style>
	.main {
		background-image: url("@/static/activity/loot/bj.png");
		background-size: 100% 100%;
		min-height: calc(100vh - 88rpx - var(--status-bar-height));
	}

	.baoxiang {
		background-image: url("@/static/activity/loot/baoxiang.png");
		background-size: 100% 100%;
		width: 646rpx;
		height: 408rpx;
		margin-right: $0;
	}

	.choujiangdabeijing {
		background-image: url("@/static/activity/loot/choujiangdabeijing.png");
		background-size: 100% 100%;
		width: 589rpx;
	}

	.choujiangno {
		background-image: url("@/static/activity/loot/choujiangno.png");
		background-size: 100% 100%;
		width: 171rpx;
		height: 211rpx;
	}

	.choujiangyes {
		background-image: url("@/static/activity/loot/choujiangyes.png");
		background-size: 100% 100%;
		width: 171rpx;
		height: 211rpx;
	}

	.bottom {
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

	.leftno {
		background-image: url("@/static/activity/loot/leftno.png");
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
