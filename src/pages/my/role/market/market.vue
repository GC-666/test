<template>
	<view class="aaaa">
		<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
			<view class="flex flex-around " style="align-items: center;height: 100rpx;">
				<view class="flex" @click="tabsClick(0)">
					<tm-text :color="acvite ===0? `${bgColor}` :''"
						:class="acvite === 0? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 0? 30: 28"
						label="全部英雄"></tm-text>
					<!-- <tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 0? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon> -->
				</view>
				<view class="flex" @click="tabsClick(1)">
					<tm-text :color="acvite ===1? `${bgColor}` :''"
						:class="acvite === 1? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 1? 30: 28"
						label="战士"></tm-text>
					<!-- <tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 1? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon> -->
				</view>
				<view class="flex" @click="tabsClick(2)">
					<tm-text :color="acvite ===2? `${bgColor}` :''"
						:class="acvite === 2? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 2? 30: 28"
						label="法师"></tm-text>
					<!-- <tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 2? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon> -->
				</view>
				<view class="flex" @click="tabsClick(3)">
					<tm-text :color="acvite ===3? `${bgColor}` :''"
						:class="acvite === 3? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 3? 30: 28"
						label="刺客"></tm-text>
					<!-- <tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 3? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon> -->
				</view>
			</view>
			<tm-sheet v-if="typeShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
					:padding="[0,0]">
					<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
						<tm-tag checkable :checked="acc === 1? true :false" size="m" label="普通" @click="tagChange(1,1)">
						</tm-tag>
						<tm-tag checkable :checked="acc === 2? true :false" size="m" label="高级" @click="tagChange(1,2)">
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
				<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]"
					@click="gonav('pages/my/role/market/details?id='+1)">
					<tm-image  class="round-t-4" :width="348" :height="344" model="aspectFill" :src="data.img">
					</tm-image>
					<tm-text :font-size="30" _class="text-overflow text-weight-b ml-20"
						_style="width: 330rpx;text-overflow: ellipsis;" class=" mt-15" label="英雄名字">
					</tm-text>
					<view class="flex flex-col">
						<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" label="职业：高级法师">
						</tm-text>
						<view class="flex">
							<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" label="等级：80">
							</tm-text>
							<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" label="智力：90">
							</tm-text>
						</view>
					</view>
					<view class="flex mb-15">
						<tm-text :font-size="26" class="text-weight-n ml-20 mt-8 flex-row-bottom-center" label="¥">
						</tm-text>
						<tm-text :font-size="38" class="text-weight-b ml-4 mt-8 flex-row-bottom-center" label="000">
						</tm-text>
						<tm-text :font-size="20" class="text-weight-n ml-4 mt-8 flex-row-bottom-center" label="起">
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
	const count = ref(0)
	const list = ref([])
	const statusBarHeight = ref('')
	const tabbarHeight = ref('')
	const acvite = ref(0)
	const acc = ref(0)

	const typeShow = ref(false)
	const cover = ref(false)
	const tabsClick = (i) => {
		acvite.value = i
		if (i != 0) {
			typeShow.value = true
			cover.value = true
		} else {
			typeShow.value = false
			cover.value = false
		}
	}
	const tagChange = (val, index) => {
		acc.value = index
		typeShow.value = false
		cover.value = false
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
</style>
