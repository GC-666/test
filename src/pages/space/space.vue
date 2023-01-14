<template>
	<tm-app>
		<view class="" style="background-color:#1E1F28;min-height: 100vh;">
			<tm-navbar color="#1E1F28" :shadow="0">
				<template v-slot:default>
					<view class="flex flex-center">
						<tm-image :width="50" :height="50" :src="space"></tm-image>
						<tm-text class="text-weight-b ml-10" :fontSize="32" label="空间"></tm-text>
					</view>
				</template>
				<template v-slot:right>
					<view class="mr-20">
						<tm-image :width="32" :height="32" :src="r" @click="gonav('pages/space/rule')"></tm-image>
					</view>
				</template>
			</tm-navbar>
			<tm-carousel autoplay :margin="[0,0]" :round="0" rangKey="img" model='dot' :width="750" :height="300"
				:list="listimg">
			</tm-carousel>
			<view class="" style="background-color: #1E1F28;">
				<view class="mt-20 flex mb-20 flex-between">
					<view class="flex flex-row-center-start	 ml-20" style="width:180rpx">
						<tm-text v-if="isOpen.isShip==1" class="mr-8 ml-20" :fontSize="22" color="#fff" label="寄售中">
						</tm-text>
						<tm-text v-else class="mr-8 ml-20" :fontSize="22" color="#fff" label="关闭中"></tm-text>
						<tm-sheet :round="3" :color="isOpen.isShip==1?'red':'green'" :shadow="0" :margin="[0,0]"
							:height="12" :width="12" :padding="[0,0]">
						</tm-sheet>
					</view>
					<view class="flex flex-center">
						<tm-tabs @change="tabschange" :list="tabsTitle" align="center" :itemHeight="50" :width="198"
							:default-name="tabsIndex" :round="2" :itemRound="2" color="#FDE2BC" itemModel="card"
							activeColor="#000" activeFontColor="#fff">
						</tm-tabs>
					</view>
					<view class="flex flex-center mr-20" style="width:180rpx">
						<tm-button v-if="xsigninfo.isSign && xsigninfo.isOpenSign" @click="ok" icon="tmicon-md-checkbox" size="small" label="签到"></tm-button>
						<tm-button v-if="!xsigninfo.isSign && xsigninfo.isOpenSign" :padding="[10]" :margin="[10]" :shadow="0" text size="small" :width="170" outlined :label="`已签到:1${xsigninfo.signCount}天`"></tm-button>
					</view>
				</view>
			</view>
			<view class="" v-show="tabsIndex==0">
				<view class="" v-if="classificationList.length>0">
					<view class="" style="background-color: #1E1F28;">
						<tm-tabs transprent class="mr-20" @change="tabschange1" :list="classificationList"
							showTabsLineAni :itemWidth="200" :width="750" :height="500" :default-name="_index">
						</tm-tabs>
					</view>
					<view class="" style="background-color: #1E1F28;padding: 20rpx 40rpx;">
						<view class="flex flex-between">
							<tm-text color="#FDE2BC" :font-size="26" label="藏品"></tm-text>
							<view class="flex flex-center  mr-20" @click="newFindSort">
								<tm-text color="#FDE2BC" :font-size="26" label="热度"></tm-text>
								<view class="flex flex-col">
									<tm-icon :fontSize="14" :color="newFind?'#f5f5f5':bgColor" name="tmicon-sort-up">
									</tm-icon>
									<tm-icon :fontSize="14" :color="newFind?bgColor:'#f5f5f5'" name="tmicon-sort-down">
									</tm-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" :class="followList.length>0?'scroll-Y':''" @scrolltolower="lower1">
					<view class="list" v-for="(item,index) in followList" :key="index">
						<tm-sheet transprent :margin="[0,0]" :padding="[20,20]" :shadow="0" :round="2"
							@click="gonav('pages/space/spaceDetails?id='+item.id)">
							<view class="flex flex-row-center-between">
								<view class="flex">
									<tm-image :round="2" :width="148" :height="148" :src="item.img">
									</tm-image>
									<view class="flex flex-col flex-between ml-20">
										<tm-text :font-size="30" _class="text-weight-b text-overflow" color="white"
											_style="width:200rpx;text-overflow: ellipsis;" :label="item.name">
										</tm-text>
										<tm-text :font-size="22" color="#808080" :label="item.publisher"></tm-text>
										<view class="flex">
											<tm-sheet :margin="[0,0]" :padding="[4,4]" :shadow="0" :round="2"
												color="#FFE6C8">
												<tm-text color="#000" class="text-weight-b" :font-size="22"
													:label="`流通 ${item.circulation}`">
												</tm-text>
											</tm-sheet>
										</view>
									</view>
								</view>
								<view class="flex flex-end">
									<tm-text color="white" :font-size="24" label="￥"></tm-text>
									<tm-text color="white" class="ml-4" :font-size="38" :label="item.minPrice">
									</tm-text>
									<tm-text color="white" class="ml-8" :font-size="20" label="起"></tm-text>
								</view>
								<tm-text v-if="item.historyDeal.jrpj>item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
									class="flex-center" color="#F90808" :fontSize="30"
									:label="`+${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
								</tm-text>
								<tm-text v-if="item.historyDeal.jrpj<item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
									class="flex-center" color="green" :fontSize="30"
									:label="`${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
								</tm-text>
								<tm-text v-if="item.historyDeal.jrpj==item.historyDeal.zrpj || item.historyDeal.zrpj==0 || item.historyDeal.jrpj==0"
									class="flex-center" color="#F90808" :fontSize="30" label="+0%"></tm-text>
							</view>
						</tm-sheet>
					</view>
				</scroll-view>
				<view v-if="followList.length<=0" class="flex flex-wrap flex-row-center-center"
					style="margin-top:150rpx">
					<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
				</view>
			</view>
			<view class="" v-show="tabsIndex==1">
				<tm-text v-if="list2.length>0" class="ml-20 mt-40" color="white" :font-size="26" label="热门藏品"></tm-text>
				<view  v-if="list2.length>0" class="hot flex flex-around">
					<view class="flex flex-col flex-center" v-for="(item,index) in list2"
						@click="gonav('pages/space/spaceDetails?id='+item.id)">
						<tm-image :round="2" :width="114" :height="114" :src="item.img">
						</tm-image>
						<tm-text :font-size="28" _class="text-weight-b text-overflow flex flex-center" color="white"
							_style="width:180rpx;text-overflow: ellipsis;" :label="item.name"></tm-text>
						<tm-text class="text-weight-b mt-10" color="red" :font-size="26" :label="item.price"></tm-text>
						<tm-text v-if="item.historyDeal.jrpj>item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
							class="flex-center" color="#F90808" :fontSize="30"
							:label="`+${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
						</tm-text>
						<tm-text v-if="item.historyDeal.jrpj<item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
							class="flex-center" color="green" :fontSize="30"
							:label="`${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
						</tm-text>
						<tm-text v-if="item.historyDeal.jrpj==item.historyDeal.zrpj || item.historyDeal.zrpj==0 || item.historyDeal.jrpj==0"
							class="flex-center" color="#F90808" :fontSize="30" label="+0%"></tm-text>
					</view>
				</view>
				<view class="" v-if="list.length>0" style="background-color: #1E1F28;padding: 20rpx 40rpx;">
					<view class="flex flex-between">
						<view class="flex  mr-40">
							<tm-text color="#FDE2BC" :font-size="26" label="热度排行"></tm-text>
						</view>
						<view class="flex flex-center  mr-20" @click="newHotSort">
							<tm-text color="#FDE2BC" :font-size="26" label="热度"></tm-text>
							<view class="flex flex-col">
								<tm-icon :fontSize="14" :color="newHot?'#f5f5f5':bgColor" name="tmicon-sort-up">
								</tm-icon>
								<tm-icon :fontSize="14" :color="newHot?bgColor:'#f5f5f5'" name="tmicon-sort-down">
								</tm-icon>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" :style="list.length>0?'max-height:900rpx':'max-height:0rpx'"
					@scrolltolower="lower">
					<view class="list" v-for="(item,index) in list" :key="index">
						<tm-sheet transprent :margin="[0,0]" :padding="[20,20]" :shadow="0" :round="2"
							@click="gonav('pages/space/spaceDetails?id='+item.id)">
							<view class="flex flex-row-center-between">
								<view class="flex">
									<tm-image :round="2" :width="148" :height="148" :src="item.img">
									</tm-image>
									<view class="flex flex-col flex-between ml-20">
										<tm-text :font-size="30" _class="text-weight-b text-overflow" color="white"
											_style="width:200rpx;text-overflow: ellipsis;" :label="item.name">
										</tm-text>
										<tm-text :font-size="22" color="#808080" :label="item.publisher"></tm-text>
										<view class="flex">
											<tm-sheet :margin="[0,0]" :padding="[4,4]" :shadow="0" :round="2"
												color="#FFE6C8">
												<tm-text color="#000" class="text-weight-b" :font-size="22"
													:label="`流通 ${item.circulation}`">
												</tm-text>
											</tm-sheet>
										</view>
									</view>
								</view>
								<view class="flex flex-end">
									<tm-text color="white" :font-size="24" label="￥"></tm-text>
									<tm-text color="white" class="ml-4" :font-size="38" :label="item.minPrice">
									</tm-text>
									<tm-text color="white" class="ml-8" :font-size="20" label="起"></tm-text>
								</view>
								<tm-text v-if="item.historyDeal.jrpj>item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
									class="flex-center" color="#F90808" :fontSize="30"
									:label="`+${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
								</tm-text>
								<tm-text v-if="item.historyDeal.jrpj<item.historyDeal.zrpj && item.historyDeal.jrpj!=0 && item.historyDeal.zrpj!=0"
									class="flex-center" color="green" :fontSize="30"
									:label="`${Math.round(((item.historyDeal.jrpj - item.historyDeal.zrpj) / item.historyDeal.zrpj) * 100) / 100}%`">
								</tm-text>
								<tm-text v-if="item.historyDeal.jrpj==item.historyDeal.zrpj || item.historyDeal.zrpj==0 || item.historyDeal.jrpj==0"
									class="flex-center" color="#F90808" :fontSize="30" label="+0%"></tm-text>
							</view>
						</tm-sheet>
					</view>
				</scroll-view>
				<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:50rpx">
					<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
				</view>
			</view>
			<!-- <view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view> -->
		</view>

	</tm-app>
</template>
<script setup>
	import { Space, Home } from "@/api/api.ts"
	import space from "@/static/space/xlogo.png"
	import r from "@/static/space/right.png"
	import { ref } from 'vue'
	import wushuju from "@/static/my/wushuju.png"
	import { onLoad, onShow } from "@dcloudio/uni-app";
	const listimg = ref()
	Home.bannerList({ type: 1 }).then(res => {
		listimg.value = res
	})
	const tabsIndex = ref(0)
	const tabsTitle = ref([
		{ key: "0", title: "关注" },
		{ key: "1", title: "行情" }
	])
	// 关注
	const followParams = ref({
		page: 1,
		limit: 20,
		classId: 0,
		orderType: 0
	})
	const tabschange1 = (i) => {
		followList.value = []
		followParams.value.classId = i
		_index.value = i
		findMarketListByFollow()
	}
	const followListCount = ref(0)
	const classificationList = ref([])
	const _index = ref(0)
	const classificationByFollow = () => {
		Space.classificationByFollow().then(res => {
			classificationList.value = res.map((item, index) => {
				return { key: item.id, title: item.name }
			})
			if (_index.value <= 0) {
				_index.value = res[0].id
			}
			if (followParams.value.classId <= 0) {
				followParams.value.classId = res[0].id
			}
			findMarketListByFollow()
		})
	}
	const followList = ref([])
	const findMarketListByFollow = () => {
		Space.findMarketListByFollow(followParams.value).then(res => {
			if (res.length == followParams.value.limit) {
				followListCount.value = res.length
			} else {
				followListCount.value = 0
			}
			followList.value = followList.value.concat(res)
		})
	}
	const lower1 = () => {
		if (followListCount.value > 0) {
			followParams.value.page += 1;
			findMarketListByFollow();
		}
	}
	const newFind = ref(true)
	const newFindSort = () => {
		newFind.value = !newFind.value;
		if (followParams.value.orderType == 0) {
			followParams.value.orderType = 1;
		} else {
			followParams.value.orderType = 0;
		}
		followParams.value.page = 1;
		followList.value = [];
		findMarketListByFollow();
	}
	onLoad(() => {
		_index.value = 0
		followParams.value.classId = 0
		tabschange(tabsIndex.value);
		xsigninfo2()
	})

	//行情
	//热门
	const list2 = ref([])
	Space.findMarketListX({ page: 1, limit: 3, orderType: 0 }).then(res => {
		list2.value = res;
	})
	const isOpen = ref({})
	Space.isOpen().then(res => {
		isOpen.value = res;
	})
	const list = ref([])
	const listBool = ref(true);
	const pageData = ref({
		page: 1,
		limit: 20,
		orderType: 0
	});
	const tabschange = (i) => {
		tabsIndex.value = i
		if (i == 1) {
			pageData.value.page = 1;
			list.value = [];
			findMarketListX();
		} else if (i == 0) {
			followParams.value.page = 1;
			followList.value = [];
			followParams.value.classId = _index.value
			classificationByFollow();
		}
	}
	const lower = () => {
		if (listBool.value) {
			pageData.value.page += 1;
			findMarketListX();
		}
	}
	// 是否排序
	const newHot = ref(true)
	const newHotSort = () => {
		newHot.value = !newHot.value;
		if (pageData.value.orderType == 0) {
			pageData.value.orderType = 1;
		} else {
			pageData.value.orderType = 0;
		}
		pageData.value.page = 1;
		list.value = [];
		findMarketListX();
	}
	const findMarketListX = () => {
		Space.findMarketListX(pageData.value).then(res => {
			list.value = list.value.concat(res)
			if (res.length == pageData.value.limit) {
				listBool.value = true;
			} else {
				listBool.value = false;
			}
		})
	}
	//签到状态
	const xsigninfo = ref({})
	const xsigninfo2 = (i) => {
		Space.xsigninfo().then(res => {
			xsigninfo.value=res;
		})
	}
	//签到
	const ok = (i) => {
		Space.xsign().then(res => {
			xsigninfo2();
		})
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx - 394rpx);
	}

	.list {
		width: 710rpx;
		height: 184rpx;
		background-image: url('../../static/space/list.png');
		background-size: 100% 100%;
		margin: 10rpx auto;
	}

	.hot {
		width: 710rpx;
		height: 275rpx;
		background-image: url('../../static/space/main.png');
		background-size: 100% 100%;
		margin: 20rpx auto;
	}
</style>
