<template>
	<tm-app>
		<tm-navbar hideHome title="公告中心" :height="44" :shadow="0"></tm-navbar>
		<tm-tabs swiper :itemWidth="115" :list="tabsTitle" :width="750" :default-name="defaultName"
			@change="tabsChange"></tm-tabs>
			
		<view class="" v-if="noticeList.length>0" >
			<scroll-view scroll-y="true" class="scroll-Y" >
				<tm-sheet :shadow="0" :margin="[20,10]" :round="5" v-for="(item,index) in noticeList" :key="item.id">
					<tm-cell :margin="[0, 0]" :padding="[0,10]" :titleFontSize="28">
						<template v-slot:title>
							<tm-text _class="text-weight-b" :fontSize="30" :label="item.name"></tm-text>
						</template>
						<template v-slot:right>
							<view class="flex">
							</view>
						</template>
					</tm-cell>
					<tm-divider color="grey" :margin="[0,0]"></tm-divider>
					<view class="" v-for="data in item.noticeList">
						<view class="flex ma-10 flex-row-center-between"
							@click="gonav('pages/index/notice/noticeDesc/noticeDesc?id='+data.id)">
							<view class="flex  flex-col">
								<tm-text :font-size="28" :label="data.name"></tm-text>
								<view class="mt-20">
									<tm-text color="#808080" :fontSize="22" :label="DateUtils.formatDateTime(data.upTime)">
									</tm-text>
								</view>
							</view>
							<tm-image :round="6" :width="200" :height="100" :src="data.img"></tm-image>

						</view>
						<tm-divider color="grey" :margin="[0,0]"></tm-divider>
					</view>
				</tm-sheet>
			</scroll-view>
		</view>

		<view class="" v-if="noticeList1.length>0" >
			<scroll-view scroll-y="true" class="scroll-Y"  @scrolltolower="lower">
				<tm-sheet :shadow="0" :margin="[20,10]" :round="5">
					<view class="" v-for="item in noticeList1">
						<view class="flex ma-10 flex-row-center-between"
							@click="gonav('pages/index/notice/noticeDesc/noticeDesc?id='+item.id)">
							<view class="flex  flex-col">
								<tm-text :font-size="28" :label="item.name"></tm-text>
								<view class="mt-20">
									<tm-text color="#808080" :fontSize="22"
										:label="DateUtils.formatDateTime(item.upTime)">
									</tm-text>
								</view>
							</view>
							<tm-image :round="6" :width="200" :height="100" :src="item.img"></tm-image>
						</view>
						<tm-divider color="grey" :margin="[0,0]"></tm-divider>
					</view>

				</tm-sheet>
			</scroll-view>
		</view>
	</tm-app>
</template>

<script setup>
	
	
	import { Home } from "@/api/api.ts"
	import { onMounted, ref } from "vue";
	const id = ref('')
	const tabsTitle = ref([])
	// 综合公告列表
	const noticeList = ref([])
	// 每一个公告列表
	const noticeList1 = ref([])
	// tabs 默认选项
	const defaultName = ref(0)
	// 公告类别数量  用于控制下拉刷新
	const noticeListNum = ref(0)
	const noticeParams = ref({
		type: null,
		page: 1,
		limit: 20,
	})

	// 下拉刷新
	const lower = () => {
		console.log("到底部");
		if (noticeListNum.value > 0) {
			noticeParams.value.page += 1
			getNoticeList()
		}
	}
	// tabs 切换
	const tabsChange = (i) => {
		console.log(i);
		noticeList1.value = [];
		noticeList.value = [];
		noticeParams.value.page = 1
		if (i > 0) {
			noticeParams.value.type = i;
			getNoticeList()
		} else {

			Home.findSynthesizeList().then(res => {
				noticeList.value = res
			})
		}
	}
	// 每一个公告
	const getNoticeList = () => {
		Home.noticeList(noticeParams.value).then(res => {
			noticeListNum.value = res.length
			noticeList1.value = noticeList1.value.concat(res)
		})
	}
	onMounted(() => {
		Home.findSynthesizeList().then(res => {
			tabsTitle.value.unshift({
				title: '综合公告',
				key: 0
			});
			let arr = res.map((item, index) => {
				return { title: item.name, key: item.id }
			})
			tabsTitle.value.push(...arr)
			noticeList.value = res
		})
	})
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
	
	
</style>
