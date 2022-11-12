<template>
	<tm-app style="">
		<tm-navbar hideHome :title="config.collName">
		</tm-navbar>
		<view style="">
			<tm-sheet :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="30" :itemWidth="130" :width="700" :height="30" default-name="1">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view scroll-y="true" :style="`height: ${hh}px;`" @scrolltolower="lower">
			<view style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="" v-for="(data,index) in userCollectionFindPageList" @click="gonav('pages/my/collections/collectionsDetails?id='+data.id)">
					<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
						<view class="flex flex-between" style="margin: 0rpx 10rpx;">
							<tm-text :font-size="32" _class="text-weight-b" :label="data.collName"></tm-text>
							<view class="flex">
								<!-- <tm-text v-if="data.type=='0'" color="#07EBFE" :font-size="26" _class="text-weight-b" label="已开启">
								</tm-text>
								<tm-text v-if="data.type=='1'" color="#07EBFE" :font-size="26" _class="text-weight-b" label="出售中">
								</tm-text>
								<tm-text v-if="data.type=='2'" color="#07EBFE" :font-size="26" _class="text-weight-b" label="交易中">
								</tm-text> -->
								
								<tm-text color="#07EBFE" :font-size="22" _class="text-weight-n" label="买入价:"></tm-text>
								<tm-text color="#07EBFE" :font-size="26" _class="text-weight-b" :label="data.buyPrice">
								</tm-text>
							</view>
						</view>
						<view class="flex flex-between" style="margin:10rpx 10rpx 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
							<view class="flex">
								<tm-text color="#999" :font-size="18" _class="text-weight-b" :label="data.collTruenumber">
								</tm-text>
							</view>
							<view class="flex mr-2" v-if="data.type=='1' || data.type=='2' ">
								<tm-text color="#999" :font-size="22" _class="text-weight-n" label="出售价:"></tm-text>
								<tm-text color="#999" :font-size="26" _class="text-weight-b" :label="data.sellPrice">
								</tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
	</tm-app>
</template>


<script setup>
	const { screenHeight, windowHeight, windowTop } =uni.getWindowInfo()
	const { height, width, top } = uni.$tm.u.getWindow()
	
	const hh=ref("");
	onLoad((e)=>{
		// #ifdef APP-PLUS
		hh.value = height - 44 - 80 + 6
		// #endif
		// #ifdef H5
		if(windowTop>0){//0		44
			hh.value = height  - windowTop
		}else{
			hh.value = height   - 80 -6
		}
		// #endif
	})
	import { onLoad } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	
	const tabsTitle = ref([{
			key: "1",
			title: "综合"
		},
		{
			key: "2",
			title: "最新"
		},
		{
			key: "3",
			title: "编号排序"
		},
		{
			key: "4",
			title: "价格排序"
		}
	]);
	//类型下标
	const index = ref(1);
	//配置参数
	const config=ref({});
	//藏品类型详情
	const userCollectionFindPageList = ref({});
	onLoad((e)=>{
		config.value=e;
		pageData.value.collId=config.value.id
	})
	//页面加载完成执行
	onMounted(() => {
		tabsChange(1);
	})
	//配置参数
	const pageData = ref({
		collId: 0,
		page:1,
		limit:10,
		orderByType:1
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			My.userCollectionFindPageList(pageData.value).then(res => {
				userCollectionFindPageList.value = userCollectionFindPageList.value.concat(res)
				if (res.length = pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}
	
	const tabsChange = (i) => {
		index.value = i;
		pageData.value.orderByType=i;
		pageData.value.page = 1;
		userCollectionFindPageList.value = [];
		My.userCollectionFindPageList(pageData.value).then(res => {
			userCollectionFindPageList.value = res;
			if (res.length == pageData.value.limit) {
				bool.value = true;
			} else {
				bool.value = false;
			}
		})
	}
	
</script>

<style>

</style>
