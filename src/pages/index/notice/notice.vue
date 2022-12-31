<template>
	<tm-app>
		<tm-navbar title="公告中心" :height="44" :shadow="0"></tm-navbar>
		<tm-sheet v-if="active!=0" :margin="[0,0]" :padding="[0,0]">
			<tm-input :round="12" prefix="tmicon-search" :fontSize="22" v-model="noticeParams.name" @confirm="confirm"
				:margin="[10,10]" placeholder="请输入搜索内容"></tm-input>
		</tm-sheet>
		<tm-tabs swiper :itemWidth="115" :list="tabsTitle" :width="750" :default-name="defaultName"
			@change="tabsChange"></tm-tabs>

		<view v-if="active==0">
			<view class="" v-if="noticeList.length>0">
				<scroll-view scroll-y="true" class="scroll-Y1">
					<tm-sheet :shadow="0" :padding="[10,0]" :margin="[20,20]" :round="4"
						v-for="(item,index) in noticeList" :key="item.id">
						<tm-cell :margin="[0,0]" :padding="[0,10]" :titleFontSize="28">
							<template v-slot:title>
								<tm-text _class="text-weight-n" :fontSize="36" :label="item.name"></tm-text>
							</template>
							<template v-slot:right>
								<view class="flex">
								</view>
							</template>
						</tm-cell>
						<tm-divider color="grey" :margin="[0,0]"></tm-divider>
						<view class="" v-for="(data,i) in item.noticeList">
							<view class="flex ma-10 flex-between"
								@click="gonav('pages/index/notice/noticeDesc/noticeDesc?id='+data.id)">
								<view class="flex  flex-col flex-between">
									<tm-sheet :margin="[0,0]" :padding="[0,0]" :width="450">
										<tm-text _class="text-overflow-2" :label="data.name">
										</tm-text>
									</tm-sheet>
									<view class="mt-10">
										<tm-text color="#808080" :fontSize="22"
											:label="DateUtils.formatDateTime(data.upTime)">
										</tm-text>
									</view>
								</view>
								<tm-image v-if="data.img!='' && data.img!=null " :round="4" :width="200" :height="150" model="scaleToFill" :src="data.img">
								</tm-image>
								<tm-image v-else-if="data.type=='1'" :round="4" :width="200" :height="150" model="scaleToFill" :src="shangxin">
								</tm-image>
								<tm-image v-else-if="data.type=='2'" :round="4" :width="200" :height="150" model="scaleToFill" :src="jishou">
								</tm-image>
								<tm-image v-else-if="data.type=='3'" :round="4" :width="200" :height="150" model="scaleToFill" :src="funeng">
								</tm-image>
								<tm-image v-else-if="data.type=='4'" :round="4" :width="200" :height="150" model="scaleToFill" :src="huodong">
								</tm-image>
								<tm-image v-else-if="data.type=='5'" :round="4" :width="200" :height="150" model="scaleToFill" :src="xitong">
								</tm-image>
								<tm-image v-else-if="data.type=='6'" :round="4" :width="200" :height="150" model="scaleToFill" :src="hecheng">
								</tm-image>
							</view>
							<tm-divider v-if="item.noticeList.length !== i+1" color="grey" :margin="[0,10]">
							</tm-divider>
						</view>
					</tm-sheet>
				</scroll-view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="350" :height="280" :src="wushuju"></tm-image>
			</view>
		</view>
		<view v-else>
			<view v-if="noticeList1.length>0">
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
					<tm-sheet :shadow="0" :margin="[20,10]" :round="5" :padding="[10,0]">
						<view class="" v-for="(item,i) in noticeList1">
							<!-- <view class="flex mt-10 mb-10 ml-5 mr-5"
								@click="gonav('pages/index/notice/noticeDesc/noticeDesc?id='+item.id)">
								<view class="flex  flex-col  flex-between" style="width: 430rpx;word-wrap:break-word;">
									<tm-text :font-size="28" :label="item.name"></tm-text>
									<view class="mt-10">
										<tm-text color="#808080" :fontSize="22"
											:label="DateUtils.formatDateTime(item.upTime)">
										</tm-text>
									</view>
								</view>
								<tm-image :round="3" :width="200" :height="150" src="https://picsum.photos/200/300"></tm-image>
							</view> -->
							<view class="flex ma-10 flex-between"
								@click="gonav('pages/index/notice/noticeDesc/noticeDesc?id='+item.id)">
								<view class="flex  flex-col flex-between">
									<tm-sheet :margin="[0,0]" :padding="[0,0]" :width="450">
										<tm-text _class="text-overflow-2" :label="item.name">
										</tm-text>
									</tm-sheet>
									<view class="mt-10">
										<tm-text color="#808080" :fontSize="22"
											:label="DateUtils.formatDateTime(item.upTime)">
										</tm-text>
									</view>
								</view>
								<tm-image v-if="item.img!='' && item.img!=null " :round="4" :width="200" :height="150" model="scaleToFill" :src="item.img">
								</tm-image>
								<tm-image v-else-if="item.type=='1'" :round="4" :width="200" :height="150" model="scaleToFill" :src="shangxin">
								</tm-image>
								<tm-image v-else-if="item.type=='2'" :round="4" :width="200" :height="150" model="scaleToFill" :src="jishou">
								</tm-image>
								<tm-image v-else-if="item.type=='3'" :round="4" :width="200" :height="150" model="scaleToFill" :src="funeng">
								</tm-image>
								<tm-image v-else-if="item.type=='4'" :round="4" :width="200" :height="150" model="scaleToFill" :src="huodong">
								</tm-image>
								<tm-image v-else-if="item.type=='5'" :round="4" :width="200" :height="150" model="scaleToFill" :src="xitong">
								</tm-image>
								<tm-image v-else-if="item.type=='6'" :round="4" :width="200" :height="150" model="scaleToFill" :src="hecheng">
								</tm-image>
							</view>
							<tm-divider v-if="noticeList1.length !== i+1" color="grey" :margin="[0,0]"></tm-divider>
						</view>
					</tm-sheet>
				</scroll-view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="350" :height="350" :src="wushuju"></tm-image>
			</view>
		</view>
	</tm-app>
</template>

<script setup>
	import { Home } from "@/api/api.ts";
	import { onMounted, ref } from "vue";
	import wushuju from "@/static/my/wushuju.png";
	import shangxin from "@/static/notice/shangxin.png";
	import jishou from "@/static/notice/jishou.png";
	import funeng from "@/static/notice/funeng.png";
	import huodong from "@/static/notice/huodong.png";
	import xitong from "@/static/notice/xitong.png";
	import hecheng from "@/static/notice/hecheng.png";
	
	import kongtou from "@/static/notice/kongtou.png";
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
		name: "",
	})
	const confirm = () => {
		noticeList1.value = [];
		noticeParams.value.page = 1
		getNoticeList()
	}
	// 下拉刷新
	const lower = () => {
		if (noticeListNum.value > 0) {
			noticeParams.value.page += 1
			getNoticeList()
		}
	}
	const active = ref(0)
	// tabs 切换
	const tabsChange = (i) => {
		noticeParams.value.name = ''
		active.value = i
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

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 256rpx);
	}

	.scroll-Y1 {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
</style>
