<template>
	<tm-app style="">
		<tm-navbar  title="藏品" :shadow="0">
		</tm-navbar>
		<view style="">
			<tm-sheet :transprent="false" :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="30" :itemWidth="300" :width="700"  default-name="1">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view :class="mineFindCollReport.length>0?'scroll-Y':''" scroll-y="true" @scrolltolower="lower">
			<view  class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view v-if="index==1" class="relative" v-for="(data,index) in mineFindCollReport"
					@click="gonav('pages/my/collections/collectionsType?id='+data.collId+'&collName='+data.collName)">
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<tm-image class="round-t-4" :width="344" :height="344" :src="data.collImg">
						</tm-image>
						<view class="" style="margin: 0rpx 10rpx; ">
							<tm-text _class="text-weight-b text-overflow" _style="width:320rpx;text-overflow: ellipsis;" :fontSize="28"
								:label="data.collName">
							</tm-text>
						</view>
						<view class="flex flex-between" style="margin: 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
							<tm-text color="#999" :font-size="18" class="mt-10" :label="data.publisher"></tm-text>
							<view class="flex">
								<tm-text color="#999" :font-size="18" _class="text-weight-n" label="数量"></tm-text>
								<tm-text color="#999" :font-size="18" _class="text-weight-b" :label="data.collCount">
								</tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
				<view v-else class="relative" v-for="(data,index) in userRecrodFindCollPageList">
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<tm-image class="round-t-4" :width="344" :height="344" :src="data.img">
						</tm-image>
						<view class="" style="margin: 0rpx 10rpx;">
							<tm-text _class="text-weight-b text-overflow" _style="width:320rpx;text-overflow: ellipsis;" :fontSize="28"
								:label="data.collName">
							</tm-text>
						</view>
						<view class="flex flex-between" style="margin: 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
							<tm-text color="#999" :font-size="18" class="mt-10" :label="data.opertionRemarks"></tm-text>
							<view class="flex">
								<tm-text color="#999" :font-size="18" _class="text-weight-n" label="¥"></tm-text>
								<tm-text color="#999" :font-size="18" _class="text-weight-b" :label="data.price">
								</tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
			
		</scroll-view>
		<view v-if="mineFindCollReport.length<=0 && index==1" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="350" :height="280" :src="wushuju"></tm-image>
		</view>
		<view v-if="userRecrodFindCollPageList.length<=0 && index!=1" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="350" :height="280" :src="wushuju"></tm-image>
		</view>
	</tm-app>
</template>


<script setup>
	const hh = ref("");
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		My
	} from "@/api/api.ts"
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const tabsTitle = ref([{
			key: "1",
			title: "我的藏品"
		},
		{
			key: "2",
			title: "藏品记录"
		}
	]);
	//类型下标
	const index = ref(1);
	//藏品类型列表
	const mineFindCollReport = ref([]);
	//页面加载完成执行
	onLoad(() => {
		tabsChange(1);
	})
	//藏品记录列表
	const userRecrodFindCollPageList = ref({});
	//配置参数
	const pageData = ref({
		page: 1,
		limit: 20
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			if (index.value == 1) {
				My.mineFindCollReport(pageData.value).then(res => {
					mineFindCollReport.value = mineFindCollReport.value.concat(res)
					if (res.length = pageData.value.limit) {
						bool.value = true;
					} else {
						bool.value = false;
					}
				})
			} else {
				My.userRecrodFindCollPageList(pageData.value).then(res => {
					userRecrodFindCollPageList.value = userRecrodFindCollPageList.value.concat(res)
					if (res.length = pageData.value.limit) {
						bool.value = true;
					} else {
						bool.value = false;
					}
				})
			}
		}
	}
	const tabsChange = (i) => {
		index.value = i;
		pageData.value.page = 1;
		mineFindCollReport.value = [];
		userRecrodFindCollPageList.value = [];
		if (i == 1) {
			My.mineFindCollReport(pageData.value).then(res => {
				mineFindCollReport.value = res;
				if (res.length == pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		} else {
			My.userRecrodFindCollPageList(pageData.value).then(res => {
				userRecrodFindCollPageList.value = res;
				if (res.length == pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
</style>
