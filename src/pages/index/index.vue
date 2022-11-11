<template>
	
	<tm-app>
		
		<tm-navbar hideHome  title="" :height="44" :shadow="0">
			<template v-slot:left>
				<view class="ml-20">
					<tm-image :width="160" :height="33" :src="logoimg"></tm-image>
				</view>
			</template>
			<template v-slot:right>
				<view class="mr-20">
					<tm-icon :font-size="30" :color="color" :name="name" @click="setDark"></tm-icon>
				</view>
			</template>
		</tm-navbar>

		<!-- 首发藏品 -->
		<scroll-view scroll-y="true" style="height: calc(100vh - 90rpx - 123rpx)" @scrolltolower="lower">
			<tm-carousel autoplay :margin="[0,0]" :width="710" :height="300" rangKey="img" :list="listimg" model="rect"
				color="#ccc" @click="carouselClick">
			</tm-carousel>
			<!-- 公告区域 -->
			<tm-sheet :shadow="0" :margin="[20,10]" :padding="[0,24]" _class="px-20">
				<view class="flex flex-between" @click="gonav('pages/index/notice/notice')">
					<tm-image :width="100" :height="30" :src="noticeImg"></tm-image>
					<view class="ml-20" v-for="i in notice" :key="i.id">
						<tm-text _class="text-overflow" _style="width: 498rpx;text-overflow: ellipsis;" :fontSize="22"
							:label="i.name">
						</tm-text>
					</view>
					<tm-icon :font-size="25" name="tmicon-angle-right"></tm-icon>
				</view>
			</tm-sheet>
			<!-- 首发 盲盒tabs -->
			<view class="ml-20 mr-20"> 
				<tm-tabs @change="tabsChange" :itemFontSize="28" :activeFontSize="30" :list="tabsTitle" :width="710"
					:height="100" default-name="0"></tm-tabs>
			</view>
			<tm-sheet :round="4" :shadow="0" :margin="[20,10]" :padding="[0,0]"
				@click="gonav('pages/shopInfo/shopInfo?id='+data.id)" v-for="data in list" :key="data.id">
				<view class="relative flex flex-row-center-center">
					<tm-image style="filter: blur(5rpx);" :width="710" :height="600" :src="data.collImg">
					</tm-image>
					<!--  t-50 l-50 r-50 -->
					<view class="absolute">
						<tm-image :transprent="false" color="#07EBFE" :round="4" :width="468" :height="468"
							:src="data.collImg">
						</tm-image>
					</view>
				</view>
				<view class="absolute ml-20 mt-20">
					<view class="flex countdown">
						<view class="flex">
							<view class="flex ml-10 mr-10 mt-5 mb-5" v-if="data.diffSeconds==='0'">
								<tm-icon :fontSize="25" color="#07EBFE" name="tmicon-wind-smile"></tm-icon>
								<tm-text color="#07EBFE" fontSiz="24" :label="data.statusName"></tm-text>
								<view class="" v-if="data.diffSeconds!=='0'">
									<tm-countdown color="#07EBFE" :time="parseInt(data.diffSeconds)" format="HH:MM:SS"
										autoStart></tm-countdown>
								</view>
							</view>
							<view class="flex ml-10 mr-10  mt-5 mb-5" v-if="data.diffSeconds!=='0'">
								<tm-icon :fontSize="25" color="#07EBFE" name="tmicon-wind-smile"></tm-icon>
								<tm-text color="#07EBFE" fontSiz="24" label="即将开售: "></tm-text>
								<tm-countdown color="#07EBFE" :time="parseInt(data.diffSeconds)" format="HH:MM:SS"
									autoStart></tm-countdown>
							</view>
						</view>
					</view>
				</view>
				<tm-sheet :shadow="0" :margin="[20,20]" :padding="[0,0]">
					<view class="flex flex-row-center-between">
						<view class="flex">
							<tm-avatar :round="12" :img="data.creatorImg"></tm-avatar>
							<view class="flex flex-col ml-20" style="justify-content: space-around;">
								<tm-text :font-size="28" _class="text-weight-b" :label="data.collName"></tm-text>
								<tm-text color="#999" :font-size="18" _class="text-weight-n" :label="data.creatorName">
								</tm-text>
							</view>
						</view>
						<view class="flex flex-col">
							<view class="flex  flex-col-bottom-center ">
								<tm-text color="#FFCE92" :font-size="18" _class="text-weight-n" label="¥"></tm-text>
								<tm-text class="ml-10" color="#FFCE92" :font-size="38" _class="text-weight-b"
									:label="data.price">
								</tm-text>
							</view>
						</view>
					</view>
				</tm-sheet>
			</tm-sheet>
		</scroll-view>

		<!-- 首发藏品后6个 -->
		<!-- <tm-sheet :shadow="0" :margin="[20,15]" :padding="[0,0]">
				<view class="flex flex-row-center-between flex-wrap">
					<view class="relative" v-for="data in list">
						<tm-image :width="344" :height="344" :src="data.collImg">
						</tm-image>
						<view class="absolute t-15">
							<view class="flex countdown">
								<view class="flex ml-10 mr-10" v-if="data.diffSeconds==='0'">
									<tm-icon :fontSize="25" color="#07EBFE" name="tmicon-wind-smile"></tm-icon>
									<tm-text color="#07EBFE" fontSiz="24" :label="data.statusName"></tm-text>
									<view class="" v-if="data.diffSeconds!=='0'">
										<tm-countdown color="#07EBFE" :time="parseInt(data.diffSeconds)"
											format="HH:MM:SS" autoStart></tm-countdown>
									</view>
								</view>
								<view class="flex ml-10 mr-10" v-if="data.diffSeconds!=='0'">
									<tm-icon :fontSize="25" color="#07EBFE" name="tmicon-wind-smile"></tm-icon>
									<tm-text color="#07EBFE" fontSiz="24" label="即将开售: "></tm-text>
									<tm-countdown color="#07EBFE" :time="parseInt(data.diffSeconds)" format="HH:MM:SS"
										autoStart></tm-countdown>
								</view>
							</view>
						</view>
						<tm-sheet :shadow="0" :margin="[0,20]" :padding="[0,0]">
							<view class="flex flex-row-center-between">
								<view class="flex flex-col ml-20" style="justify-content: space-around;">
									<tm-text :font-size="28" _class="text-weight-b" :label="data.collName"></tm-text>
									<tm-text color="#999" :font-size="18" _class="text-weight-n"
										:label="data.creatorName">
									</tm-text>
								</view>
								<view class="flex flex-col">
									<view class="flex  flex-col-bottom-center">
										<tm-text color="#FFCE92" :font-size="18" _class="text-weight-n" label="¥">
										</tm-text>
										<tm-text class="ml-10" color="#FFCE92" :font-size="22" _class="text-weight-b"
											:label="data.price">
										</tm-text>
									</view>
								</view>
							</view>
						</tm-sheet>
					</view>
				</view>
			</tm-sheet> -->


		<tabbar :acc="0"></tabbar>
	</tm-app>


</template>
<script setup>
	import tabbar from '@/components/tabbar.vue'
	import { Home } from "@/api/api.ts"
	import logoimg from "@/static/logo.png"
	import noticeImg from "@/static/img/noticeImg.png"
	import { onMounted, ref } from "vue";
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	import { onShow } from '@dcloudio/uni-app';
	const store = useTmpiniaStore();
	// 下拉刷新
	const lower = () => {
		console.log("到底部");
		if (ListNum.value > 0) {
			params.value.page += 1
			findSaleCollectionList()
		}
	}
	// 首发盲盒tabs
	const tabsTitle = ref([
		{ key: "0", title: "即将开售" },
		{ key: "1", title: "盲盒" },
	])
	const tabsChange = (i) => {
		console.log("----", i);
		list.value = []
		params.value.page = 1
		if (i == 0) {
			findSaleCollectionList()
		} else {
			findSaleBoxList()
		}
	}
	// 公告请求
	const notice = ref([])
	Home.findPageList({ page: 1, limit: 1, objectType: 0 }).then(res => {
		notice.value = res
	})

	// 轮播图 相关
	const listimg = ref([])
	Home.bannerList().then(res => {
		listimg.value = res.map((item) => {
			return { type: 'img', ...item }
		})
	})
	// 轮播图点击
	const carouselClick = (i) => {
		listimg.value.forEach((item, index) => {
			if (i == index) {
				uni.navigateTo({
					url: "/pages/index/swiperDesc/swiperDesc?id=" + item.id
				})
			}
		})
	}
	// 首发藏品 盲盒
	const list = ref([])
	const ListNum = ref(0)
	const params = ref({
		page: 1,
		limit: 4
	})
	const findSaleCollectionList = () => {
		Home.findSaleCollectionList(params.value).then(res => {
			ListNum.value = res.length
			list.value = list.value.concat(res);
		})
	}
	const findSaleBoxList = () => {
		Home.findSaleBoxList(params.value).then(res => {
			ListNum.value = res.length
			list.value = list.value.concat(res);
		})
	}
	onMounted(() => {
		findSaleCollectionList()
	})
	// 切换暗黑 样式
	const name = ref('tmicon-md-moon')
	const color = ref('')
	// 暗黑模式切换
	const setDark = () => {
		if (store.tmStore.dark) {
			name.value = "tmicon-md-moon"
			store.setTmVuetifyDark(false)
			color.value = ''
		} else {
			name.value = "tmicon-ios-sunny"
			store.setTmVuetifyDark(true)
			color.value = '#FFCC00'
		}
	}
	onShow(() => {
		uni.hideTabBar({
			animation: false
		})
	})
	//获取手机状态栏高度
	console.log(uni.getSystemInfoSync().statusBarHeight);
</script>
<style>
	.countdown {
		background-color: #666666;
		border-radius: 20rpx;
	}
</style>
