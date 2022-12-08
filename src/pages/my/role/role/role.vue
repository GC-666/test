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
	<scroll-view scroll-y="true" @scrolltolower="lower" v-if="list.length>0"
		:style="`height: calc(100vh - ${statusBarHeight}px - ${tabbarHeight}px - 100rpx);`">

		<tm-sheet :margin="[20,10]" :round="4" :border="2" :padding="[10,10]" v-for="item in list">
			<view class="flex flex-1 flex-between">
				<tm-image :round="4" :width="134" :height="180" src="https://picsum.photos/200/300">
				</tm-image>
				<view class="flex-2">
					<view class="flex flex-around">
						<tm-text :font-size="22" label="职业: 高级法师"></tm-text>
						<tm-text :font-size="22" label="状态: 冒险中"></tm-text>
						<tm-text :font-size="22" label="剩余冒险: 1次"></tm-text>
					</view>
					<view class="flex flex-around" style="background-color: #f5f5f5;margin: 20rpx 20rpx;">
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="生命"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="力量"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="敏捷"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="智力"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="攻击力"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="防御力"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="魔法抗性"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
						<view class="flex flex-col flex-center">
							<tm-text :fontSize="20" label="命中"></tm-text>
							<tm-text class="mt-10" :fontSize="20" label="20"></tm-text>
						</view>
					</view>
					<view class="flex flex-end">
						<tm-image :round="0" :width="160" :height="50" :src="cs" @click="gonav('pages/my/role/role/sell/sell?id='+22)"></tm-image>
						<tm-image :round="0" class="ml-10 mr-10" :width="160" :height="50" :src="csz"></tm-image>
						<tm-image :round="0" :width="160" :height="50" :src="sj" @click="gonav('pages/my/role/role/up/up')"></tm-image>
						<!-- <tm-image :round="0" :width="160" :height="50" :src="qxcs"></tm-image> -->
					</view>
				</view>




			</view>
		</tm-sheet>
	</scroll-view>
	<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
		<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
	</view>
	<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	import cs from "@/static/role/cs.png"
	import csz from "@/static/role/csz.png"
	import sj from "@/static/role/sj.png"
	import qxcs from "@/static/role/qxcs.png"
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

		findUserHeroList()
	})
	const params = ref({
		page: 1,
		limit: 10
	})
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findUserHeroList()
		}
	}
	const findUserHeroList = () => {
		Role.findUserHeroList(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
		})
	}
</script>
<style scoped>
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
