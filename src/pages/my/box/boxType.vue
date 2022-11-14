<template>
	<tm-app style="">
		<tm-navbar  :title="config.boxName">
		</tm-navbar>
		<view style="">
			<tm-sheet :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="30" :itemWidth="130" :width="700" :height="30" default-name="0">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view scroll-y="true" :style="`max-height: ${hh}px;`" @scrolltolower="lower">
			<view style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="" v-for="(data,index) in userBoxFindPageList"
					@click="gonav('pages/my/box/boxDetails?id='+data.id)">
					<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
						<view class="flex flex-between" style="margin: 0rpx 10rpx;">
							<tm-text :font-size="32" _class="text-weight-b" :label="config.boxName"></tm-text>
							<view class="flex flex-center">
								<tm-text v-if="data.type=='0'" color="#FFCE92" :font-size="22" _class="text-weight-b"
									label="未开启"></tm-text>
								<tm-text v-else-if="data.type=='1'" color="#FFCE92" :font-size="22"
									_class="text-weight-b" label="已开启"></tm-text>
								<tm-text v-else-if="data.type=='2'" color="#FFCE92" :font-size="22"
									_class="text-weight-b" label="待发行"></tm-text>
								<tm-text v-else-if="data.type=='3'" color="#FFCE92" :font-size="22"
									_class="text-weight-b" label="已上架"></tm-text>
								<tm-text v-else-if="data.type=='5'" color="#FFCE92FFCE92" :font-size="22"
									_class="text-weight-b" label="交易中"></tm-text>
								<tm-text v-else-if="data.type=='5'" color="#FFCE92" :font-size="22"
									_class="text-weight-b" label="交易完成"></tm-text>
							</view>
						</view>
						<view class="flex flex-between"
							style="margin:20rpx 10rpx 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
							<view class="flex">
								<tm-text color="#07EBFE" :font-size="18" _class="text-weight-n" :label="data.no">
								</tm-text>
							</view>
							<view class="flex">
								<view class="flex" v-if="data.type=='0'">
									<!-- <tm-text color="#999" :font-size="18" _class="text-weight-b" label="获取时间"></tm-text> -->
									<tm-text class="ml-4" color="#999" :font-size="18" _class="text-weight-b"
										:label="DateUtils.formatDateTime(data.time)"></tm-text>
								</view>
								<view class="flex" v-else-if="data.type=='1' || data.type=='2'">
									<!-- <tm-text color="#999" :font-size="20" _class="text-weight-b" label="开启时间"></tm-text> -->
									<tm-text class="ml-4" color="#999" :font-size="18" _class="text-weight-b"
										:label="DateUtils.formatDateTime(data.time)"></tm-text>
								</view>
								<view class="flex" v-else-if="data.type=='3' || data.type=='4' || data.type=='5'">
									<!-- <tm-text color="#999" :font-size="20" _class="text-weight-b" label="上架时间"></tm-text> -->
									<tm-text class="ml-4" color="#999" :font-size="20" _class="text-weight-b"
										:label="DateUtils.formatDateTime(data.time)"></tm-text>
								</view>
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
			key: "0",
			title: "未开启"
		},
		{
			key: "1",
			title: "已开启"
		},
	]);
	//类型下标
	const index = ref(0);
	//配置参数
	const config=ref({});
	//盲盒类型详情
	const userBoxFindPageList = ref({});
	onLoad((e)=>{
		config.value=e;
		pageData.value.boxId = config.value.id
	})
	//页面加载完成执行
	onMounted(() => {
		tabsChange(0);
	})
	//配置参数
	const pageData = ref({
		boxId: 0,
		page: 1,
		limit: 20,
		boxType: 0
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			My.userBoxFindPageList(pageData.value).then(res => {
				userBoxFindPageList.value = userBoxFindPageList.value.concat(res)
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
		pageData.value.boxType=i;
		pageData.value.page = 1;
		userBoxFindPageList.value = [];
		My.userBoxFindPageList(pageData.value).then(res => {
			userBoxFindPageList.value = res;
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
