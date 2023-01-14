<template>
	<tm-app>
		<tm-navbar title="藏品" :shadow="0">
		</tm-navbar>
		<view style="">
			<tm-sheet :transprent="false" :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="30" :itemWidth="135" :width="700" default-name="1">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view :class="mineFindCollReport.length>0 || userRecrodFindCollPageList.length>0?'scroll-Y':''"
			scroll-y="true" @scrolltolower="lower">
			<view class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view v-if="index==1 || index==3 || index==4" class="relative"
					v-for="(data,index) in mineFindCollReport"
					@click="collectionsType(data.collId,data.collName,data.collImg,data.collCount)">
					<!-- @click="gonav('pages/my/collections/collectionsType?id='+data.collId+'&collName='+data.collName)" -->
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<tm-image class="round-t-4" :width="344" :height="344" :src="data.collImg">
						</tm-image>
						<view class="" style="margin: 0rpx 10rpx; ">
							<tm-text _class="text-weight-b text-overflow" _style="width:320rpx;text-overflow: ellipsis;"
								:fontSize="28" :label="data.collName">
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
							<tm-text _class="text-weight-b text-overflow" _style="width:320rpx;text-overflow: ellipsis;"
								:fontSize="28" :label="data.collName">
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
		<tm-drawer :inContent="false" v-model:show="showWin" :round="5" :hideHeader="true">
			<view class="ml-20 mr-20 flex flex-row-center-start">
				<tm-image class="ml-20 mt-10" :width="160" :height="160" :round="5" :src="collImg">
				</tm-image>
				<view class="ml-20">
					<view class="flex flex-row-bottom-start mb-10">
						<tm-text :font-size="32" _class="text-weight-b" :label="collName">
						</tm-text>
						<tm-text color="#808080" :font-size="28" _class="text-weight-b" :label="`/共${collCount1}个`">
						</tm-text>
					</view>
					<tm-text color="#808080" :font-size="18" _class="text-weight-b" label="默认按编号排序">
					</tm-text>
				</view>
			</view>
			<scroll-view scroll-y="true" style="height:360rpx" @scrolltolower="lower2">
				<view class="flex flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
					<view class="mt-10" style="width:236.6rpx" v-for="(data,index) in userCollectionFindPageList">
						<tm-image extra model="aspectFill" :width="230" :height="136" :src="data.type==1?jishou:mairu"
							@click="gonav('pages/my/collections/collectionsDetails?id='+data.id)">
							<template v-slot:extra>
								<view class="" style="margin: auto auto;">
									<tm-text _class="flex flex-center mt-20 text-overflow "
										_style="width:210rpx;text-overflow: ellipsis;" :fontSize="24"
										:label="data.collTruenumber"></tm-text>
									<tm-text class="flex flex-center mt-5" style="" :font-size="24"
										:label="`买入价：${data.buyPrice}`">
									</tm-text>
									<tm-text class="flex flex-center mt-5" v-if="data.type==1" :font-size="24"
										:label="`出售价：${data.sellPrice}`">
									</tm-text>
								</view>
							</template>
						</tm-image>
					</view>
				</view>
			</scroll-view>
		</tm-drawer>
		<view v-if="mineFindCollReport.length<=0 && (index==1 || index==3 || index==4)"
			class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
		</view>
		<view v-if="userRecrodFindCollPageList.length<=0 && index==2" class="flex flex-wrap flex-row-center-center"
			style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
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
	import jishou from "@/static/img/jishou.png"
	import mairu from "@/static/img/mairu.png"
	const tabsTitle = ref([{
			key: "1",
			title: "我的藏品"
		},
		{
			key: "3",
			title: "浔画寄售"
		},
		{
			key: "4",
			title: "浔画X空间"
		},
		{
			key: "2",
			title: "藏品记录"
		}
	]);
	const showWin = ref(false);
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
		limit: 10,
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		console.log("到底部");
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
			} else if (index.value == 2) {
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
		bool.value = true;
		index.value = i;
		pageData.value.page = 1;
		mineFindCollReport.value = [];
		userRecrodFindCollPageList.value = [];
		if (i == 1 || i == 3 || i == 4) {
			if (i == 1) {
				//pageData.value.platform='';
				pageData.value = {
					page: 1,
					limit: 10,
				};
			} else if (i == 3) {
				pageData.value.platform = 0;
			} else if (i == 4) {
				pageData.value.platform = 1;
			}
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
	const collName = ref("");
	const collImg = ref("");
	const collCount1 = ref("");
	const collectionsType = (id, name, img, collCount) => {
		collCount1.value = collCount
		collName.value = name;
		collImg.value = img;
		showWin.value = true;
		pageData2.value.collId = id
		tabsChange2(1);
	}
	//藏品类型详情
	const userCollectionFindPageList = ref([]);
	//配置参数
	const pageData2 = ref({
		collId: 0,
		page: 1,
		limit: 20,
		orderByType: 1
	});
	const bool2 = ref(true);
	// 下拉刷新
	const lower2 = () => {
		pageData2.value.page = pageData2.value.page + 1;
		if (bool2.value) {
			My.userCollectionFindPageList(pageData2.value).then(res => {
				userCollectionFindPageList.value = userCollectionFindPageList.value.concat(res)
				if (res.length == pageData2.value.limit) {
					bool2.value = true;
				} else {
					bool2.value = false;
				}
			})
		}
	}
	const tabsChange2 = () => {
		pageData2.value.page = 1;
		userCollectionFindPageList.value = [];
		My.userCollectionFindPageList(pageData2.value).then(res => {
			userCollectionFindPageList.value = res;
			if (res.length == pageData2.value.limit) {
				bool2.value = true;
			} else {
				bool2.value = false;
			}
		})
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
</style>
