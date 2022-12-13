<template>
	<view class="aaaa">
		<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
			<view class="flex flex-around " style="align-items: center;height: 100rpx;">
				<view class="flex" @click="tabsClick(0)">
					<tm-text :color="acvite ===0? `${bgColor}` :''"
						:class="acvite === 0? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 0? 30: 28"
						label="全部英雄"></tm-text>
					<tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 0? bgColor:''" :fontSize="25"
						name="tmicon-angle-down"></tm-icon>
					<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
					</tm-icon>
				</view>
				<view class="flex" @click="tabsClick(1)">
					<tm-text :color="acvite ===1? `${bgColor}` :''"
						:class="acvite === 1? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 1? 30: 28"
						label="等级"></tm-text>

					<tm-icon class="ml-5" v-if="!gradeShow" :color="acvite === 1? bgColor:''" :fontSize="25"
						name="tmicon-angle-down"></tm-icon>
					<tm-icon class="ml-5" v-if="gradeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
					</tm-icon>
				</view>
				<view class="flex" @click="tabsClick(2)">
					<tm-text :color="acvite ===2? `${bgColor}` :''"
						:class="acvite === 2? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 2? 30: 28"
						label="品级"></tm-text>
					<tm-icon class="ml-5" v-if="!qualityShow" :color="acvite === 2? bgColor:''" :fontSize="25"
						name="tmicon-angle-down"></tm-icon>
					<tm-icon class="ml-5" v-if="qualityShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
					</tm-icon>
				</view>
				<view class="flex" @click="tabsClick(3)">
					<tm-text :color="acvite ===3? `${bgColor}` :''"
						:class="acvite === 3? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 3? 30: 28"
						label="价格"></tm-text>
					<tm-icon class="ml-5" v-if="!priceShow" :color="acvite === 3? bgColor:''" :fontSize="25"
						name="tmicon-angle-down"></tm-icon>
					<tm-icon class="ml-5" v-if="priceShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
					</tm-icon>
				</view>
			</view>
			<tm-sheet v-if="typeShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
					:padding="[0,0]">
					<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
						<tm-tag checkable transprent :border="1" :checked="typeAcc === 1? true :false" size="m"
							label="普通" @click="tagChange(0,1)">
						</tm-tag>
						<tm-tag checkable transprent :border="1" :checked="typeAcc === 2? true :false" size="m"
							label="高级" @click="tagChange(0,2)">
						</tm-tag>
					</view>
				</tm-sheet>
			</tm-sheet>
			<tm-sheet v-if="gradeShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
					:padding="[0,0]">
					<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
						<tm-tag checkable transprent :border="1" :checked="gradeAcc === 1? true :false" size="m"
							label="等级高" @click="tagChange(1,1)">
						</tm-tag>
						<tm-tag checkable transprent :border="1" :checked="gradeAcc === 2? true :false" size="m"
							label="等级低" @click="tagChange(1,2)">
						</tm-tag>
					</view>
				</tm-sheet>
			</tm-sheet>
			<tm-sheet v-if="qualityShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
					:padding="[0,0]">
					<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
						<tm-tag checkable transprent :border="1" :checked="qualityAcc === 1? true :false" size="m"
							label="品质高" @click="tagChange(2,1)">
						</tm-tag>
						<tm-tag checkable transprent :border="1" :checked="qualityAcc === 2? true :false" size="m"
							label="品质低" @click="tagChange(2,2)">
						</tm-tag>
					</view>
				</tm-sheet>
			</tm-sheet>
			<tm-sheet v-if="priceShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
					:padding="[0,0]">
					<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
						<tm-tag checkable transprent :border="1" :checked="priceAcc === 1? true :false" size="m"
							label="由低到高" @click="tagChange(3,1)">
						</tm-tag>
						<tm-tag checkable transprent :border="1" :checked="priceAcc === 2? true :false" size="m"
							label="由高到低" @click="tagChange(3,2)">
						</tm-tag>
					</view>
				</tm-sheet>
			</tm-sheet>
		</tm-sheet>
	</view>
	<scroll-view scroll-y="true" :style="`height: calc(100vh - ${statusBarHeight}px - ${tabbarHeight}px - 100rpx);`"
		@scrolltolower="lower">
		<view class="flex flex-between flex-wrap ml-5 mr-5">
			<view v-for="(data,index) in 10">
				<tm-sheet :shadow="0" :round="4" :width="344" :margin="[10,15]" :padding="[0,0]"
					@click="gonav('pages/my/role/market/details?id='+1)">
					<view class="main">
						<!-- data.img -->
						<tm-image :round="4" :width="206" :height="310" model="aspectFill"
							src="https://picsum.photos/200/300">
						</tm-image>
					</view>

					<view class="flex">
						<tm-text :font-size="30" _class="text-overflow text-weight-b ml-20"
							_style="width: 130rpx;text-overflow: ellipsis;" class="mt-15" label="英雄名字">
						</tm-text>
						<tm-image :width="80" :height="28" class="flex-row-bottom-center ml-10 mb-4" model="aspectFill"
							:src="jyz">
						</tm-image>
					</view>
					<view class="flex flex-col">
						<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" label="职业：高级法师">
						</tm-text>
						<view class="flex flex-between">
							<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" label="等级：80">
							</tm-text>
							<tm-text :font-size="20" _class="text-weight-s mr-n16" class=" mt-15" label="智力：90">
							</tm-text>
						</view>
					</view>
					<view class="flex mb-15">
						<tm-text :font-size="26" class="text-weight-n ml-20 mt-8 flex-row-bottom-center" label="¥">
						</tm-text>
						<tm-text :font-size="38" class="text-weight-b ml-4 mt-8 flex-row-bottom-center" label="000">
						</tm-text>
					</view>
				</tm-sheet>
			</view>
		</view>
	</scroll-view>
	<!-- <view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
		<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
	</view> -->
	<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
</template>


<script setup>
	import { My } from "@/api/api.ts"
	import { onBeforeMount, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	import jyz from "@/static/role/jyz.png"
	const count = ref(0)
	const list = ref([])
	const statusBarHeight = ref('')
	const tabbarHeight = ref('')
	const acvite = ref(0)

	// 全部英雄
	const typeShow = ref(false)
	const typeAcc = ref(0)
	// 等级
	const gradeShow = ref(false)
	const gradeAcc = ref(0)
	// 品质
	const qualityShow = ref(false)
	const qualityAcc = ref(0)
	// 价格
	const priceShow = ref(false)
	const priceAcc = ref(0)
	const cover = ref(false)
	const tabsClick = (i) => {

		acvite.value = i
		if (i == 0) {
			gradeShow.value = false
			qualityShow.value = false
			priceShow.value = false
			if (typeShow.value) {
				typeShow.value = false
				cover.value = false
			} else {
				typeShow.value = true
				cover.value = true
			}
		} else if (i == 1) {
			qualityShow.value = false
			priceShow.value = false
			typeShow.value = false
			if (gradeShow.value) {
				gradeShow.value = false
				cover.value = false
			} else {

				gradeShow.value = true
				cover.value = true
			}
		} else if (i == 2) {
			gradeShow.value = false
			priceShow.value = false
			typeShow.value = false
			if (qualityShow.value) {
				qualityShow.value = false
				cover.value = false
			} else {

				qualityShow.value = true
				cover.value = true
			}
		} else if (i == 3) {
			gradeShow.value = false
			qualityShow.value = false
			typeShow.value = false
			if (priceShow.value) {
				priceShow.value = false
				cover.value = false
			} else {

				priceShow.value = true
				cover.value = true
			}
		}

	}
	const tagChange = (tabsIndex, index) => {

		gradeShow.value = false
		qualityShow.value = false
		priceShow.value = false
		typeShow.value = false
		cover.value = false
		if (tabsIndex == 0) {
			typeAcc.value = index
		} else if (tabsIndex == 1) {
			gradeAcc.value = index
		} else if (tabsIndex == 2) {
			qualityAcc.value = index
		} else if (tabsIndex == 3) {
			priceAcc.value = index
		}

	}
	const bottom = ref('')
	const lower = () => {
		if (count.value > 0) {}
	}
	onBeforeMount(() => {
		statusBarHeight.value = uni.getWindowInfo().statusBarHeight
		// #ifdef APP-PLUS
		if (uni.getSystemInfoSync().platform == "android") {
			tabbarHeight.value = '105'
		} else if (uni.getSystemInfoSync().platform == "ios") {
			tabbarHeight.value = '120'
		}
		// #endif
		// #ifdef H5
		tabbarHeight.value = '105'
		// #endif

	})
</script>
<style>
	.aaaa {
		position: relative;
		background-color: #fff;
		z-index: 11;
	}

	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.main {
		height: 400rpx;
		background-image: url("@/static/role/detailsBg.png");
		background-size: 100% 100%;
		border-radius: 10rpx 10rpx 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
