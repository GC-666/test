<template>
	<tm-app style="position: relative;">
		<tm-navbar hideHome title="藏品">
		</tm-navbar>
		<view style="position: fixed;top: 88rpx;z-index: 100;">
			<tm-sheet :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="20" :itemWidth="300" :width="700" :height="30" default-name="1">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 88rpx);" @scrolltolower="lower">
			<view class="flex flex-row-center-between flex-wrap"
				style="margin: 72rpx 20rpx 0rpx 20rpx;">
				<view v-if="index==1" class="relative" v-for="(data,index) in mineFindCollReport" @click="gonav('pages/my/collections/collectionsDetails?id='+data.collId+'&collName='+data.collName)">
					<tm-sheet :shadow="0" :margin="[0,20]" :padding="[0,0]">
						<tm-image :width="344" :height="344" :src="data.collImg">
						</tm-image>
						<view class="" style="margin: 0rpx 10rpx;">
							<tm-text :font-size="28" _class="text-weight-b" :label="data.collName"></tm-text>
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
					<tm-sheet :shadow="0" :margin="[0,20]" :padding="[0,0]">
						<tm-image :width="344" :height="344" :src="data.img">
						</tm-image>
						<view class="" style="margin: 0rpx 10rpx;">
							<tm-text :font-size="28" _class="text-weight-b" :label="data.collName"></tm-text>
						</view>
						<view class="flex flex-between" style="margin: 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
							<tm-text color="#999" :font-size="18" class="mt-10" :label="data.opertionRemarks"></tm-text>
							<view class="flex">
								<tm-text color="#999" :font-size="18" _class="text-weight-n" label="¥"></tm-text>
								<tm-text color="#999" :font-size="18" _class="text-weight-b" :label="data.price"></tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
	</tm-app>
</template>


<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		My
	} from "@/api/api.ts"
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';

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
	const mineFindCollReport = ref({});
	onMounted(() => {
		tabsChange(1);
	})
	//藏品记录列表
	const userRecrodFindCollPageList = ref({});
	//配置参数
	const pageData = ref({
		page: 1,
		limit: 10
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

</style>
