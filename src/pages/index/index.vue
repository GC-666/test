<template>
	<!-- <web-view v-if="find=='1'" src="http://appxunmeta.rocknft.top"></web-view>   v-if="find=='0'" -->
	<tm-app>
		<tm-navbar hideHome hideBack title="" :shadow="0">
			<template v-slot:left>
				<view class="ml-20">
					<tm-image :width="160" :height="33" :src="logoimg"></tm-image>
				</view>
			</template>
			<template v-slot:right>
				<view class="mr-20">
					<tm-icon :fontSize="44" name="xh-xiaoxi" @click="kefu"></tm-icon>
				</view>
			</template>
		</tm-navbar>
		<!-- 首发藏品 -->
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			<tm-carousel autoplay :round="4" :margin="[0,5]" :width="710" :height="300" rangKey="img" :list="listimg"
				model="rect" color="#ccc" @click="carouselClick">
			</tm-carousel>
			<!-- 公告区域 -->
			<tm-sheet :shadow="0" :round="4" :margin="[20,10]" :padding="[10,20]" v-if="notice.length>0">
				<view class="flex" @click="gonav('pages/index/notice/notice')">
					<tm-image :width="100" :height="30" class="flex-center" :src="noticeImg"></tm-image>
					<view class="flex-center ml-20" v-for="i in notice" :key="i.id">
						<tm-text _class="text-overflow" _style="width: 530rpx;text-overflow: ellipsis;" :fontSize="24"
							:label="i.name">
						</tm-text>
					</view>
					<tm-icon :font-size="25" name="tmicon-angle-right"></tm-icon>
				</view>
			</tm-sheet>
			<!-- 首发 盲盒tabs -->
			<view class="ml-20 mr-20 flex">

				<tm-text :fontSize="30" :color="index==0?'#07EBFE' :'' " class="text-weight-b" label="即将开售"
					@click="tabsChange(0)"></tm-text>
				<tm-text :fontSize="30" :color="index==1? '#07EBFE' :'' " class="ml-n20 text-weight-b" label="盲盒"
					@click="tabsChange(1)">
				</tm-text>
				<!-- <tm-tabs :round="4" @change="tabsChange" :itemFontSize="28" :activeFontSize="30" :list="tabsTitle"
					:width="710" :height="60" default-name="0"></tm-tabs> -->
			</view>
			<view v-if="list.length>0" class="mt-10">
				<tm-sheet :round="4" :shadow="0" :margin="[20,20]" :padding="[0,0]" @click="Go(data.id)"
					v-for="data in list" :key="data.id">
					<view class="relative flex flex-row-center-center"
						style="overflow:hidden;border-radius: 20rpx 20rpx 0rpx 0rpx;">
						<tm-image style="filter: blur(5px);" :width="710" :height="834" :src="data.collImg">
						</tm-image>
						<!--  t-50 l-50 r-50 -->
						<view class="absolute bb">
							<tm-image model="aspectFill" :round="4" :width="448" :height="448" :src="data.collImg">
							</tm-image>
						</view>
					</view>
					<view class="absolute ml-25 mt-25">
						<view class="flex countdown">
							<view class="flex">
								<view class="flex ml-10 mr-10 mt-5 mb-5">
									<view class="flex flex-center" style="align-items: center;"
										v-if="data.status=='2' || data.status=='3'">
										<tm-icon class="flex-center" :fontSize="30" color="#999999"
											name="tmicon-info-circle">
										</tm-icon>
										<tm-text class="ml-5 flex-center" color="#999999" fontSiz="24"
											:label="data.statusName">
										</tm-text>
									</view>
									<view class="flex flex-center" style="align-items: center;"
										v-if="data.status=='1' ">
										<tm-icon class="mt-2" :fontSize="40" color="#07EBFE" name="xh-remen"></tm-icon>
										<tm-text class="ml-5" color="#07EBFE" fontSiz="24" :label="data.statusName">
										</tm-text>
									</view>
									<view class="flex flex-center" style="align-items: center;"
										v-if="data.status=='0' && data.diffSeconds<0">
										<tm-icon class="mt-2" :fontSize="40" color="#07EBFE" name="xh-remen"></tm-icon>
										<tm-text class="ml-5" color="#07EBFE" fontSiz="24" label="进行中">
										</tm-text>
									</view>
									<view class="flex flex-center" style="align-items: center;"
										v-if="data.status=='0' && data.diffSeconds==0">
										<tm-icon class="mt-2" :fontSize="40" color="#07EBFE" name="xh-remen"></tm-icon>
										<tm-text class="ml-5" color="#07EBFE" fontSiz="24" :label="data.statusName">
										</tm-text>
									</view>
								</view>
								<view class="flex ml-10 mr-10  mt-5 mb-5" v-if="data.diffSeconds>0 && data.status=='0'">
									<tm-icon class="pt-2" :fontSize="30" color="#07EBFE" name="xh-remen"></tm-icon>
									<tm-text class="ml-5" color="#07EBFE" fontSiz="24" label="即将开售："></tm-text>
									<tm-countdown class="text-size-n" color="#07EBFE" :time="parseInt(data.diffSeconds)"
										format="HH:MM:SS" autoStart></tm-countdown>
								</view>
							</view>
						</view>
					</view>
					<tm-sheet :shadow="0" :margin="[20,20]" :padding="[0,0]">
						<view class="flex flex-row-center-between">
							<view class="flex">
								<!-- <tm-avatar :round="12" :img="data.creatorImg"></tm-avatar> -->
								<view class="">
									<tm-avatar v-if="data.creatorImg" :round="12" :img="data.creatorImg"></tm-avatar>
									<tm-avatar v-else :round="12" :img="logo"></tm-avatar>
								</view>
								<!-- <tm-image v-if="data.creatorImg=='' || data.creatorImg==null" :round="25" :width="80"
									:height="80" :src="userHead">
								</tm-image>
								<tm-image v-else :round="25" :width="80" :height="80" :src="data.creatorImg">
									<template v-slot:error>
										<tm-image :width="80" :height="80" :src="userHead">
										</tm-image>
									</template>
								</tm-image> -->
								<view class="flex flex-col ml-20" style="justify-content: space-around;">
									<tm-text :font-size="28" _class="text-overflow text-weight-b"
										_style="width: 330rpx;text-overflow: ellipsis;" :label="data.collName">
									</tm-text>
									<view class="">
										<tm-text v-if="data.creatorName" color="#999" :font-size="18"
											_class="text-weight-n" :label="data.creatorName">
										</tm-text>
										<tm-text v-else color="#999" :font-size="18" _class="text-weight-n"
											label="浔画艺术">
										</tm-text>
									</view>
								</view>
							</view>
							<view class="flex flex-col">
								<view class="flex  flex-col-bottom-center ">
									<tm-text color="#FFCE92" :font-size="18"
										_class="text-weight-n flex-row-bottom-end mb--10" label="¥"></tm-text>
									<tm-text class="ml-10" color="#FFCE92" :font-size="38" _class="text-weight-b"
										:label="data.price">
									</tm-text>
								</view>
							</view>
						</view>
					</tm-sheet>
				</tm-sheet>
			</view>
			<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="350" :height="280" :src="wushuju"></tm-image>
			</view>
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
		<view class="aa" v-show="is">
			<!-- <tm-text class="ml-10" color="#fff" :font-size="30" _class="text-weight-b" label="请登录体验更多功能"></tm-text>
			<tm-button :margin="[10, 10]" :shadow="0" :width="200" :height="60" fontColor="#fff" outlined size="normal" label="立即登录"></tm-button> -->
			<view class="felx" style="align-items: center;">
				<tm-alert :margin="[5,0]" :padding="[20,30]" text :border="1" :content="content" :height="100">
					<template v-slot:right>
						<view class="felx ">
							<view class="flex-end 5 mt--20">
								<tm-icon name="tmicon-times-circle" @click="is = false"></tm-icon>
							</view>
							<view class="mr-n20 mt--20">
								<tm-button :margin="[10, 0]" :shadow="0" :width="160" :height="50" black label="立即登录"
									@click="login">
								</tm-button>
							</view>
						</view>
					</template>
				</tm-alert>
			</view>
		</view>
	</tm-app>
</template>
<script setup>
	import { Home, Ver } from "@/api/api.ts"
	import logoimg from "@/static/logo.png"
	import noticeImg from "@/static/img/noticeImg.png"
	import { onMounted, ref } from "vue";
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import wushuju from "@/static/my/wushuju.png"
	import userHead from "@/static/my/userHead.png"
	import logo from "@/static/img/logo3.png"
	const is = ref(true);
	const test = () => {
		const token = uni.getStorageSync('token')
		if (token) {
			is.value = false
		} else {
			is.value = true
		}
	}

	// 下拉刷新
	const content = ref([{
		icon: '',
		title: "请登录体验更多功能",
	}])
	const login = () => {
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
	const lower = () => {
		if (index.value == 0) {
			if (ListNum.value > 0) {
				params.value.page += 1
				findSaleCollectionList()
			}
		} else {
			if (ListNum.value > 0) {
				params.value.page += 1
				findSaleBoxList()
			}
		}

	}
	// 首发盲盒tabs
	const tabsTitle = ref([
		{ key: "0", title: "即将开售" },
		{ key: "1", title: "盲盒" },
	])
	const index = ref(0)
	const tabsChange = (i) => {
		if (index.value == i) return
		index.value = i
		list.value = []
		params.value.page = 1
		if (i == 0) {
			findSaleCollectionList()
		} else {
			findSaleBoxList()
		}
	}
	const Go = (id) => {
		if (index.value == 0) {
			uni.navigateTo({
				url: '/pages/shop/collection?id=' + id
			})
		} else {
			uni.navigateTo({
				url: '/pages/shop/box?id=' + id
			})
		}


	}
	// 公告请求
	const notice = ref([])


	// 轮播图 相关
	const listimg = ref([])

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
	onShow(() => {
		test()
		Home.bannerList().then(res => {
			listimg.value = res.map((item) => {
				return { type: 'img', ...item }
			})
		})
		Home.findPageList({ page: 1, limit: 1, objectType: 0 }).then(res => {
			notice.value = res
		})
		findSaleCollectionList()
	})
	// 暗黑模式切换
	const kefu = () => {
		// #ifdef APP-PLUS
		plus.runtime.openURL('https://xunmeta.rocknft.top/chat.html')
		// #endif
		// #ifdef H5
		window.location.href = 'https://xunmeta.rocknft.top/chat.html'
		// #endif
	}
</script>
<style>
	.countdown {
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 20rpx;
	}

	.aa {
		width: 750rpx;
		position: fixed;
		bottom: calc(var(--window-bottom) + 10rpx);

	}

	.bb {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 464rpx;
		height: 464rpx;
		background-image: url('@/static/img/indexbg.png');
		background-size: 100% 100%;
	}

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 44px - var(--window-bottom));
	}
</style>
