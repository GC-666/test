<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<view class="main">
			<tm-navbar title="夺宝">
			</tm-navbar>
			<view class="flex flex-center flex-col mt-10">
				<view class="baoxiang">
					<tm-image style="margin-top: 40rpx;margin-left: 82rpx;" :round="4" :width="285" :height="68" :src="wodejilu">
					</tm-image>
					<tm-image style="margin-top: 29rpx;margin-left: 132rpx;" :round="4" :width="210" :height="51" :src="duobaojilu">
					</tm-image>
					<tm-image style="margin-top: 23rpx;margin-left: 176rpx;" :round="4" :width="210" :height="51" :src="duihuanjilu">
					</tm-image>
				</view>
			</view>
			<view class="bj ma-20 pt-20 pb-20">
				<view class="lists flex flex-col flex-between pl-20">
					<view class="absolute" style="background-color: #120b40;z-index:100;padding-left: 10rpx;"> 
						<view class="flex" @click="tabsClick()">
							<view class="" style="color:#fff">
								{{tietle[typeIndex]}}
							</view>
							<tm-icon class="ml-5" v-if="!typeShow" :color="bgColor" :fontSize="25"
								name="tmicon-angle-down"></tm-icon>
							<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
							</tm-icon>
						</view>
						<view v-if="typeShow" class="flex">
							<view class="typeface" @click="tagChange(0)">
								夺宝记录
							</view>
							<view class="typeface" @click="tagChange(1)">
								兑换记录
							</view>
						</view>
					</view>
					<scroll-view style="height:805rpx;margin-top: 45rpx;" scroll-y="true" @scrolltolower="lower">
						<view v-if="typeIndex==0" class=" flex flex-row-center-between contentbj" style="margin: 10rpx 0rpx ;" v-for="(data,index) in lootFindUserItemRecordList">
							<view class="flex ma-10">
								<tm-image v-if="data.goodsType==0" style="" :round="4" :width="127" :height="127" :src="hongbao"></tm-image>
								<tm-image v-else-if="data.goodsType==1" style="" :round="4" :width="127" :height="127" :src="jifen"></tm-image>
								<tm-image v-else style="" :round="4" :width="127" :height="127" :src="data.goodsImg"></tm-image>
								<view class="flex flex-between" style="width:460rpx;color:#fff">
									<view class="ml-20 flex flex-col flex-around">
										<view class="" style="font-size: 26rpx;">
											<view v-if="data.goodsType==0 || data.goodsType==1" class="">
												{{data.goodsName}} + {{data.goodsValue}}
											</view>
											<view v-else class="">
												{{data.goodsName}}
											</view>
										</view>
										<view class="" style="font-size: 22rpx;">
											<view v-if="data.goodsType==0" class="">
												余额
											</view>
											<view v-else-if="data.goodsType==1" class="">
												积分
											</view>
											<view v-else-if="data.goodsType==2" class="">
												藏品
											</view>
											<view v-else-if="data.goodsType==3" class="">
												盲盒
											</view>
											<view v-else-if="data.goodsType==4" class="">
												实物
											</view>
										</view>
										<view class="" style="font-size: 24rpx;">
											<view v-if="data.goodsType==0" class="">
												待发行
											</view>
											<view v-else class="">
												已发行
											</view>
										</view>
									</view>
									<view class="">
										<view class="" style="font-size: 22rpx;">
											{{DateUtils.formatDate(data.lootTime,'yyyy.MM.dd')}}
										</view>
										<view class="mt-20 flex flex-row-center-end" style="font-size: 24rpx;">
											<view v-if="data.type==0" class="">
												夺宝
											</view>
											<view v-else class="">
												福利
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-if="typeIndex==1" class=" flex flex-row-center-between contentbj" style="margin: 10rpx 0rpx ;" v-for="(data,index) in lootFindExchangeRecordPageList">
							<view class="flex ma-10">
								<tm-image style="" :round="4" :width="127" :height="127" :src="data.collImg"></tm-image>
								<view class="flex flex-between" style="width:460rpx;color:#fff">
									<view class="ml-20 flex flex-col flex-around">
										<view class="" style="font-size: 26rpx;">
											{{data.collName}}
										</view>
										<view class="" style="font-size: 22rpx;">
											{{data.collTruenumber}}
										</view>
										<view class="" style="font-size: 24rpx;">
											<view v-if="data.status==0" class="">
												未兑换
											</view>
											<view v-else-if="data.status==1" class="">
												已兑换
											</view>
											<view v-else-if="data.status==2" class="">
												审核不通过
											</view>
										</view>
									</view>
									<view class="">
										<view class="flex flex-row-center-end" style="font-size: 22rpx;">
											{{DateUtils.formatDate(data.createTime,'yyyy.MM.dd')}}
										</view>
										<view class="mt-20 flex flex-row-center-end" style="font-size: 24rpx;">
											<tm-image style="" :round="4" :width="38" :height="52" :src="jifen2"></tm-image>
											<tm-text _class="text-weight-b " color="#f5f5f5" :font-size="26" :label="` + ${data.integral}`"></tm-text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
	</tm-app>
</template>

<script setup>
	import wodejilu from "@/static/activity/loot/exchange/wodejilu.png"
	import duobaojilu from "@/static/activity/loot/exchange/duobaojilu.png"
	import duihuanjilu from "@/static/activity/loot/exchange/duihuanjilu.png"
	import jifen from "@/static/activity/loot/jifen.png"
	import hongbao from "@/static/activity/loot/hongbao.png"
	import jifen2 from "@/static/activity/loot/exchange/jifen.png"
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { Activity } from "@/api/api.ts";
	import { onMounted, reactive, ref } from 'vue';
	const typeShow = ref(false)
	const cover = ref(false)
	const tietle = ref(["夺宝记录","兑换记录"])
	
	const tabsClick = () => {
		if (typeShow.value) {
			typeShow.value = false
			cover.value = false
		} else {
			typeShow.value = true
			cover.value = true
		}
	}
	//每次加载页面执行
	onShow(() => {
		getlootFindUserItemRecordList(0);
	})
	//现在的类型
	const typeIndex = ref(0);
	// 类型点击
	const tagChange = (type) => {
		if(typeIndex.value!=type){
			typeIndex.value=type
			if(type==0){
				getlootFindUserItemRecordList(0);
			}else if(type==1){
				getlootFindExchangeRecordPageList(0)
			}
		}
		cover.value=false;
		typeShow.value = false;
	}
	//夺宝记录
	const lootFindUserItemRecordList = ref([]);
	//夺宝记录参数
	const lootFindUserItemRecordListPage = ref({
		page:1,
		limit:20,
	})
	//夺宝记录是否还有数据
	const lootFindUserItemRecordListBool = ref(false);
	const getlootFindUserItemRecordList = (type) => {
		if(type==0){
			lootFindUserItemRecordListPage.value.page=1;
			lootFindUserItemRecordList.value=[];
		}else{
			lootFindUserItemRecordListPage.value.page++;
		}
		Activity.lootFindUserItemRecordList(lootFindUserItemRecordListPage.value).then(res => {
			if (res.length == lootFindUserItemRecordListPage.value.limit) {
					lootFindUserItemRecordListBool.value = true;
			} else {
				lootFindUserItemRecordListBool.value = false;
			}
			lootFindUserItemRecordList.value = lootFindUserItemRecordList.value.concat(res);
		})
	}
	
	//兑换记录
	const lootFindExchangeRecordPageList = ref([]);
	//兑换记录参数
	const lootFindExchangeRecordPageListPage = ref({
		page:1,
		limit:20,
	})
	//兑换记录是否还有数据
	const lootFindExchangeRecordPageListBool = ref(false);
	const getlootFindExchangeRecordPageList = (type) => {
		if(type==0){
			lootFindExchangeRecordPageListPage.value.page=1;
			lootFindExchangeRecordPageList.value=[];
		}else{
			lootFindExchangeRecordPageListPage.value.page++;
		}
		Activity.lootFindExchangeRecordPageList(lootFindExchangeRecordPageListPage.value).then(res => {
			if (res.length == lootFindExchangeRecordPageListPage.value.limit) {
					lootFindExchangeRecordPageListBool.value = true;
			} else {
				lootFindExchangeRecordPageListBool.value = false;
			}
			lootFindExchangeRecordPageList.value = lootFindExchangeRecordPageList.value.concat(res);
		})
	}
	
	// 下拉刷新
	const lower = () => {
		if(typeIndex.value==0){
			if(lootFindUserItemRecordListBool.value){
				getlootFindUserItemRecordList(1);
			}
		}
	}
</script>
<style scoped>
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
		height: 850rpx;
		/* padding-bottom: 100rpx; */
	}
	.lists{
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
	.typeface{
		margin: 15rpx 10rpx;
		padding: 5rpx 10rpx;
		border-radius: 20rpx;
		color:#fff;
		border: 1px solid #fff;
		font-size: 22rpx;
		family: PingFang SC;
		font-weight: 500;
	}
	.contentbj{
		background-image: url("@/static/activity/loot/exchange/databj.png");
		background-size: 100% 100%;
		width: 633rpx;
		height: 146rpx;
	}
</style>
