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
					<tm-text :color="acvite === 4? `${bgColor}` :''"
						:class="acvite === 4? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 2? 30: 28"
						label="求购" @click="tabsClick(4)"></tm-text>
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
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower" v-if="list.length>0">
			<view class="flex flex-between flex-wrap ml-5 mr-5">
				<view v-for="(data,index) in list">
					<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]" @click="toShop(data)">
						<tm-image extra class="round-t-4" :width="348" :height="344" model="aspectFill" :src="data.img">
							<template v-slot:extra>
								<view class="flex flex-center ml-20 mr-20"
									:style="`background-image: url(${bg});background-size: 100% 100%;width:300rpx;height:40rpx`">
									<tm-text :font-size="28" _class="text-weight-n" :label="`流通量:${data.circulation}`">
									</tm-text>
								</view>
							</template>
						</tm-image>
						<tm-text :font-size="30" _class="text-overflow text-weight-b ml-20"
							_style="width: 330rpx;text-overflow: ellipsis;" class=" mt-15" :label="data.name">
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
								<tm-text color="#1A1A1A" :font-size="22" _class="text-weight-n" :label="data.limits">
								</tm-text>
							</view>
						</view>
						<view class="flex mb-15">
							<tm-text :font-size="26" class="text-weight-n ml-20 mt-8 flex-row-bottom-center" label="¥">
							</tm-text>
							<tm-text :font-size="38" class="text-weight-b ml-4 mt-8 flex-row-bottom-center"
								:label="data.minPrice"></tm-text>
							<tm-text :font-size="20" class="text-weight-n ml-4 mt-8 flex-row-bottom-center" label="起">
							</tm-text>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
		<view v-if="acvite==4" class="ml-20 mr-20 scroll-Y2" style="overflow-y: auto;">
			<view class="buybeijing flex flex-center">
				<view class="flex flex-around" style="width:710rpx">
					<view class="flex flex-col flex-center">
						<tm-image :round="4" :width="68" :height="68" :src="buy"></tm-image>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="买"></tm-text>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="1899"></tm-text>
					</view>
					<view class="flex flex-col flex-center">
						<tm-image :round="4" :width="68" :height="68" :src="sell"></tm-image>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="卖"></tm-text>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="1974"></tm-text>
					</view>
					<view class="flex flex-col flex-center">
						<tm-image :round="4" :width="68" :height="68" :src="transaction"></tm-image>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="交易数"></tm-text>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="1974"></tm-text>
					</view>
					<view class="flex flex-col flex-center">
						<tm-image :round="4" :width="68" :height="68" :src="money"></tm-image>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="总金额"></tm-text>
						<tm-text class="mt-15" color="#fff" :font-size="26" label="9999+"></tm-text>
					</view>
				</view>
			</view>
			<view class="flex flex-row-center-start" style="width:710rpx">
				<tm-image class="mt-15 mb-15" :width="35" :height="35" :src="sell2"></tm-image>
				<tm-text _class="text-weight-b ml-15" :font-size="36" label="卖出"></tm-text>
			</view>
			<tm-sheet :shadow="0" :round="4" :margin="[0,0]" :padding="[0,20]">
				<view class="flex flex-around">
					<tm-text _class="text-weight-b " :font-size="30" label="藏家"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="ID"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="藏品"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="卖"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="数量"></tm-text>
				</view>
				<view v-for="(data,index) in 4">
					<view class="flex flex-around">
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="Xaadfwe"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="159***922"></tm-text>
						</view>
						<view class="flex flex-col flex-center" style="width:20%">
							<tm-image class="mb-10" :width="90" :height="90" :src="a1"></tm-image>
							<tm-text _class="text-weight-b" :font-size="18" label="萌萌星球"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="￥922"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="159922"></tm-text>
						</view>
					</view>
					<tm-divider v-if="index!=3" color="#f5f5f5"></tm-divider>
				</view>
			</tm-sheet>
			<view class="flex flex-row-center-start" style="width:710rpx">
				<tm-image class="mt-15 mb-15" :width="35" :height="35" :src="buy2"></tm-image>
				<tm-text _class="text-weight-b ml-15" :font-size="36" label="买入"></tm-text>
			</view>
			<tm-sheet :shadow="0" :round="4" :margin="[0,0]" :padding="[0,20]">
				<view class="flex flex-around">
					<tm-text _class="text-weight-b " :font-size="30" label="藏家"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="ID"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="藏品"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="卖"></tm-text>
					<tm-text _class="text-weight-b " :font-size="30" label="数量"></tm-text>
				</view>
				<view v-for="(data,index) in 4">
					<view class="flex flex-around">
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="Xaadfwe"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="159***922"></tm-text>
						</view>
						<view class="flex flex-col flex-center" style="width:20%">
							<tm-image class="mb-10" :width="90" :height="90" :src="a1"></tm-image>
							<tm-text _class="text-weight-b" :font-size="18" label="萌萌星球"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="￥922"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b " :font-size="22" label="159922"></tm-text>
						</view>
					</view>
					<tm-divider v-if="index!=3" color="#f5f5f5"></tm-divider>
				</view>
			</tm-sheet>
		</view>
		<view class="buysellbeijing flex flex-center" v-if="acvite==4">
			<view class="flex flex-around " style="width:600rpx">
				<tm-image @click="gonav('pages/market/buy/buy')" :width="202" :height="65" :src="likebuy"></tm-image>
				<tm-image @click="gonav('pages/market/buy/sell')" :width="202" :height="65" :src="likesell"></tm-image>
			</view>
		</view>
		<view v-if="list.length<=0 && acvite!=4" class="flex flex-wrap flex-row-center-center"
			style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
		<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
	</tm-app>
</template>
<script setup>
	import { onShow } from '@dcloudio/uni-app';
	import { Market } from "@/api/api.ts"
	import { onMounted, ref } from 'vue';
	import bg from "@/static/img/scbg.png"
	import wushuju from "@/static/my/wushuju.png"
	import buy from "@/static/market/buy.png"
	import sell from "@/static/market/sell.png"
	import transaction from "@/static/market/transaction.png"
	import money from "@/static/market/money.png"
	import sell2 from "@/static/market/sell2.png"
	import buy2 from "@/static/market/buy2.png"
	import a1 from "@/static/market/1.png"
	import likebuy from "@/static/market/likebuy.png"
	import likesell from "@/static/market/likesell.png"
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
		//findMarketList()
		//getClassification()

		tabsClick(4);
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
		console.log(val);
		acc.value = index
		list.value = []
		params.value.classId = val.value
		params.value.page = 1
		params.value.type = 1
		params.value.name = ''
		params.value.isRecommend = ''
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
		inp.value = ''
		if (i != 3) {
			if (acvite.value == i) return
		}
		acvite.value = i
		params.value.page = 1
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
			list.value = []
			typeShow.value = false
			cover.value = false
			params.value.isRecommend = 1
			params.value.type = 1
			findMarketList()
		} else if (i == 1) {
			list.value = []
			typeShow.value = false
			cover.value = false
			params.value.type = 1
			params.value.isRecommend = ''
			findMarketList()
		} else if (i == 2) {
			list.value = []
			typeShow.value = false
			cover.value = false
			params.value.isRecommend = ''

			params.value.type = 2
			findMarketList()
		} else if (i == 4) {
			//求购
			console.log(1);
			list.value = []
			typeShow.value = false
			cover.value = false

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

	.buybeijing {
		background-image: url("@/static/market/buybj.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 277rpx;
	}

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 188rpx - var(--window-bottom));
	}

	.scroll-Y2 {
		height: calc(100vh - var(--status-bar-height) - 188rpx - var(--window-bottom) - 136rpx);
	}

	.buysellbeijing {
		position: fixed;
		bottom: var(--window-bottom);
		background-image: url("@/static/market/buysell.png");
		background-size: 100% 100%;
		width: 750rpx;
		height: 136rpx;
	}
</style>
