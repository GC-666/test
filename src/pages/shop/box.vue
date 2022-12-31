<template>
	<tm-app class="overflow-y">
		<tm-navbar hideHome title="盲盒详情" :height="44" :shadow="0">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="data.collImg">
					</tm-image>
				</view>
			</view>
		</view>
		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,0]">
			<view class="flex flex-row-center-between">
				<view class="flex ma-15">
					<view class="">
						<tm-avatar v-if="data.creatorImg" :round="12" :img="data.creatorImg"></tm-avatar>
						<tm-avatar v-else :round="12" :img="logo"></tm-avatar>
					</view>
					<view class="flex flex-col ml-20" style="justify-content: space-around;">
						<tm-text :font-size="28" _class="text-weight-b" :label="data.collName"></tm-text>
						<view class="flex">
							<view class="flex">
								<view class="round-tl-5 round-bl-5 flex flex-center"
									style="width: 100rpx; background-color: #FFCE92; ">
									<tm-text class="ma-5" color="#25262E" :font-size="22" _class="text-weight-n"
										label="限量"></tm-text>
								</view>
								<view class="round-tr-5 round-br-5 flex flex-center"
									style="width: 85rpx;background-color: #FFE6C8;">
									<tm-text class="ma-5" color="#25262E" :font-size="22" _class="text-weight-n"
										:label="data.presale">
									</tm-text>
								</view>
							</view>
							<view class="flex ml-20">
								<view class="round-tl-5 round-bl-5 flex flex-center"
									style="width: 100rpx; background-color: #FFCE92;">
									<tm-text class="ma-5" color="#25262E" :font-size="22" _class="text-weight-n"
										label="剩余"></tm-text>
								</view>
								<view class="round-tr-5 round-br-5 flex flex-center"
									style="width: 85rpx;background-color: #FFE6C8;">
									<tm-text class="ma-5" color="#25262E" :font-size="22" _class="text-weight-n"
										:label="data.sold">
									</tm-text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-col ma-15">
					<view class="flex  flex-col-bottom-center ">
						<tm-text :font-size="18" _class="text-weight-n" class="flex-row-bottom-end mb--10" label="¥">
						</tm-text>
						<tm-text class="ml-10" :font-size="38" _class="text-weight-b" :label="data.price">
						</tm-text>
					</view>
				</view>
			</view>
		</tm-sheet>

		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,0]">
			<view class="flex">
				<tm-text class="ml-25 mt-20" :font-size="35" _class="text-weight-b" label="数字收藏小贴士"></tm-text>
				<tm-text class="ml-15 mt-32 " _class="text-size-xxs" label="购买即可体验内容"></tm-text>
			</view>
			<view class="mt-20 flex flex-around">
				<view class="">

					<tm-icon name="xh-bianhao" :font-size="40"></tm-icon>


					<tm-text class="mt-20 mb-20" :font-size="28" _class="text-weight-s" label="唯一编号"></tm-text>


				</view>
				<view class="">
					<tm-icon name="xh-kexin" :font-size="40"></tm-icon>

					<tm-text class="mt-20 mb-20" :font-size="28" _class="text-weight-s" label="可信记录"></tm-text>

				</view>
				<view class="">
					<tm-icon name="xh-cunzheng" :font-size="40"></tm-icon>

					<tm-text class="mt-20 mb-20" :font-size="28" _class="text-weight-s" label="永久存证"></tm-text>

				</view>
				<view class="">
					<tm-icon name="xh-bukecuangai" :font-size="40"></tm-icon>
					<tm-text class="mt-20 mb-20" :font-size="28" _class="text-weight-s" label="不可篡改"></tm-text>

				</view>
			</view>
		</tm-sheet>

		<tm-sheet :style="{'color': store.tmStore.dark?'#fff': '#25262E','font-size': '22rpx'}" :round="3" :shadow="0"
			:margin="[20,10]" :padding="[20,10]" v-if="data.probablyList">
			<view class="flex">
				<tm-text class="ml-20" :font-size="35" _class="text-weight-b" label="可能获得"></tm-text>
			</view>
			<tm-sheet :round="3" :shadow="4" :margin="[20,10]" :padding="[20,10]" v-for="(item,i) in data.probablyList"
				:key="i">
				<view class="flex  flex-between">
					<view class="flex">
						<tm-image preview :round="4" :width="135" :height="125" :src="item.img">
						</tm-image>
						<view class="flex flex-col flex-around">
							<tm-text class="ml-20" :font-size="30" _class="text-weight-b" :label="item.name"></tm-text>
							<tm-text class="ml-20" :font-size="18" _class="text-weight-n" :label="`概率：${item.chance}%`">
							</tm-text>
						</view>
					</view>
					<tm-text class="flex-center" :font-size="25" _class="text-weight-b" :label="item.name"></tm-text>
				</view>
			</tm-sheet>
		</tm-sheet>

		<tm-sheet style="margin-bottom: 100rpx;" :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<view class="">

				<tm-text class="ml-25 mt-20" :font-size="35" _class="text-weight-b" label="购买须知"></tm-text>
				<view class="ml-25"
					:style="{'color': store.tmStore.dark?'#fff': '#25262E','font-size': '22rpx','text-indent': '0.5cm' }">
					数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，不得将数字藏品用于任何商业用途，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用
				</view>

			</view>
		</tm-sheet>



		<view class="fixed b-0 r-0 l-0" :style="{'background-color': store.tmStore.dark?'#fff': '#25262E' }">
			<view class="" style="">
				<tm-sheet _class=" " :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
					<view class="flex flex-row-center-between">
						<view class="flex flex-col ml-40">
							<view class="flex  flex-col-bottom-center ">
								<tm-text :font-size="18" _class="text-weight-n" class="flex-row-bottom-end mb--10"
									label="¥"></tm-text>
								<tm-text class="ml-10" :font-size="38" _class="text-weight-b" :label="data.price">
								</tm-text>
							</view>
						</view>
						<view class="mr-50">
							<tm-button :round="13" :margin="[0, 10]" :padding="[0,0]" :shadow="0" :height="60"
								:width="200" label="立即购买" @click="placeOrder"></tm-button>
						</view>
					</view>
				</tm-sheet>
			</view>
		</view>
		<tm-modal :height="350" splitBtn title="温馨提示" okText="确定" v-model:show="orderShow"
			@ok="pay(order.operationData.id)">
			<view class="flex flex-center">
				<tm-text :font-size="30" _class="text-weight-n" :label="order.operationMsg">
				</tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>

<script setup>
	import { Home, My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, ref } from "vue";
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	import logo from "@/static/img/logo3.png"
	const store = useTmpiniaStore();
	const id = ref('')
	const data = ref({})
	const order = ref({})
	const orderShow = ref(false)
	onLoad((o) => {
		id.value = o.id
	})
	const pay = (id) => {
		console.log(id);
		uni.navigateTo({
			url: '/pages/my/order/orderpay?id=' + id
		})
	}
	onBeforeMount(() => {
		Home.findSaleBoxItem({ id: id.value }).then(res => {
			data.value = res
		})
	})
	const placeOrder = () => {
		My.placeOrder({ type: '03', id: id.value }).then(res => {
			if (res.operationCode == '01') {
				orderShow.value = true
				order.value = res
				return
			}
			uni.navigateTo({
				url: '/pages/my/order/orderpay?id=' + res.operationData.id
			})
		})
	}
</script>

<style scoped>
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}

	.head {
		margin-top: 350rpx;
	}
</style>
