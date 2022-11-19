<template>

	<tm-app>

		<view class="aaaa">
			<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight]">
			</tm-sheet>
			<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-input :margin="[20,10]" outlined prefix="tmicon-search" v-model="inp" placeholder="请输入名称"
					placeholderStyle="text-align: center" @confirm="confirm">
				</tm-input>
			</tm-sheet>
			<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-around " style="align-items: center;height: 100rpx;">
					<tm-text :color="acvite === 0? `${bgColor}` :''"
						:class="acvite === 0? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 0? 30: 28"
						label="推荐" @click="tabsClick(0)"></tm-text>
					<tm-text :color="acvite === 1? `${bgColor}` :''"
						:class="acvite === 1? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 1? 30: 28"
						label="全部" @click="tabsClick(1)"></tm-text>
					<tm-text :color="acvite === 2? `${bgColor}` :''"
						:class="acvite === 2? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 2? 30: 28"
						label="盲盒" @click="tabsClick(2)"></tm-text>
					<view class="flex" @click="tabsClick(3)">
						<tm-text :color="acvite ===3? `${bgColor}` :''"
							:class="acvite === 3? `text-weight-b active` :'text-weight-n'"
							:font-size="acvite === 3? 30: 28" label="分类"></tm-text>
						<tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 3? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon>
					</view>
				</view>
				<tm-sheet v-if="typeShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
					<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
						:padding="[0,0]">
						<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
							<view class="" v-for=" (item,index) in classification">
								<tm-tag checkable :checked="acc ===index? true :false" size="m" :label="item.label"
									@click="tagChange(item,index)"></tm-tag>
							</view>
						</view>
					</tm-sheet>
				</tm-sheet>

			</tm-sheet>
		</view>
		<!-- :style="`height: calc(100vh  - 190rpx - 50px - ${statusBarHeight}px  - ${windowBottom}px)`" -->
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			<view class="flex flex-between flex-wrap">
				<view v-for="(data,index) in list" @click="toShop(data)">
					<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]">
						<view class="">
							<tm-image extra :width="344" :height="344" :src="data.img">
								<template v-slot:extra>
									<view class="flex flex-center ml-20 mr-20"
										:style="`background-image: url(${bg});background-size: 100% 100%;width:300rpx;height:40rpx`">
										<tm-text :font-size="28" _class="text-weight-n" label="流通量:300"></tm-text>
									</view>
								</template>
							</tm-image>
						</view>
						<tm-text :font-size="30" _class="text-weight-b ml-20" class=" mt-15" :label="data.name">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s ml-20" class=" mt-15" :label="data.publisher">
						</tm-text>
						<view class="mt-15  ml-20 flex">
							<view class="flex flex-center"
								style="width: 108rpx;height: 40rpx;background-color: #FFD7A7;border-radius: 10rpx 0  0 10rpx;">
								<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-b" label="限量"></tm-text>
							</view>
							<view class="flex flex-center"
								style="width: 108rpx;height: 40rpx;background-color: #FFE6C8;border-radius:  0 10rpx 10rpx 0 ;">
								<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-n" label="999"></tm-text>
							</view>
						</view>
						<view class="flex mb-15">
							<tm-text :font-size="22" class="text-weight-n ml-20 mt-8 flex-row-bottom-center mb--10"
								label="¥"></tm-text>
							<tm-text :font-size="38" class="text-weight-b ml-4 mt-8 flex-row-bottom-center"
								label="9999.00"></tm-text>
							<tm-text :font-size="22" class="text-weight-n ml-4 mt-8 flex-row-bottom-center mb--10"
								label="起"></tm-text>
						</view>
					</tm-sheet>
				</view>
			</view>

		</scroll-view>

		<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
	</tm-app>
</template>
<script setup>
	import { onShow } from '@dcloudio/uni-app';
	import { Market } from "@/api/api.ts"
	import { onMounted, ref } from 'vue';
	import bg from "@/static/img/scbg.png"
	const list = ref([])
	const typeShow = ref(false)
	const cover = ref(false)
	const count = ref(0)
	const inp = ref('')
	const windowBottom = uni.getSystemInfoSync().windowBottom;
	const classification = ref([])
	const lower = () => {
		if (count.value > 0) {
			params.value.page += 1
			findMarketList()
		}
	}
	const toShop = (item) => {
		if (acvite.value == 2) {
			uni.navigateTo({
				url: '/pages/market/shop/mhshop?id=' + item.id + '&name=' + item.name
			})
		} else {
			uni.navigateTo({
				url: '/pages/market/shop/shop?id=' + item.id + '&name=' + item.name
			})
		}
	}
	onMounted(() => {
		params.value.isRecommend = 1
		findMarketList()
		getClassification()
	})
	const confirm = () => {
		list.value = []
		if (acvite.value == 0 || acvite.value == 1 || acvite.value == 3) {
			params.value.type = 1
		}
		params.value.isRecommend = ''
		params.value.page = 1
		params.value.classId = ''
		params.value.name = inp.value

		findMarketList()
	}
	const findMarketList = () => {
		Market.findMarketList(params.value).then(res => {
			count.value = res.length
			list.value = list.value.concat(res)
			cover.value = false
			typeShow.value = false
		})
	}
	const acc = ref('')
	const tagChange = (val, index) => {
		acc.value = index
		params.value.classId = val.value
		params.value.page = 1
		params.value.type = 1
		params.value.name = ''
		params.value.isRecommend = ''
		list.value = []
		findMarketList()
	}
	const getClassification = () => {
		Market.classification().then(res => {
			classification.value = res.map((item, index) => {
				return { label: item.name, value: item.id, }
			})

		})
	}
	const params = ref({
		page: 1,
		limit: 8,
		type: 1,
		name: '',
		classId: '',
		isRecommend: ''
	})
	const acvite = ref(0)
	const tabsClick = (i) => {
		if (i != 3) {
			if (acvite.value == i) return
		}
		acvite.value = i
		params.value.page = 1
		list.value = []
		params.value.name = ''
		params.value.classId = ''
		if (i == 3) {
			if (typeShow.value) {
				typeShow.value = false
				cover.value = false
			} else {
				typeShow.value = true
				cover.value = true
			}
		} else if (i == 0) {
			typeShow.value = false
			cover.value = false
			params.value.isRecommend = 1
			params.value.type = 1
			findMarketList()
		} else if (i == 1) {
			typeShow.value = false
			cover.value = false
			params.value.type = 1
			params.value.isRecommend = ''
			findMarketList()
		} else if (i == 2) {
			typeShow.value = false
			cover.value = false
			params.value.isRecommend = ''

			params.value.type = 2
			findMarketList()
		}
	}
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

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 188rpx - var(--window-bottom));
	}
</style>
