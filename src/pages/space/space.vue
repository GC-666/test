<template>
	<tm-app>
		<view class="" style="background-color:#1E1F28;height: 100vh;">
			<tm-navbar color="#1E1F28" :shadow="0">
				<template v-slot:default>
					<view class="flex flex-center">
						<tm-image :width="50" :height="50" :src="space"></tm-image>
						<tm-text class="text-weight-b ml-10" :fontSize="32" label="空间"></tm-text>
					</view>
				</template>
				<template v-slot:right>
					<view class="mr-20">
						<tm-image :width="32" :height="32" :src="r"></tm-image>
					</view>
				</template>
			</tm-navbar>
			<tm-carousel autoplay :margin="[0,0]" :round="0" model='dot' :width="750" :height="300" :list="listimg">
			</tm-carousel>
			<tm-sheet :margin="[0,0]" color="#1E1F28" :padding="[0,0]">
				<view class="mt-20 flex ">
					<view class="flex flex-row-center-start flex-1 ">
						<tm-text class="mr-8 ml-20" :fontSize="22" label="开市中"></tm-text>
						<tm-sheet :round="3" color="red" :shadow="0" :margin="[0,0]" :height="12" :width="12"
							:padding="[0,0]">
						</tm-sheet>
					</view>
					<view class="flex  flex-2">
						<tm-tabs @change="tabschange" :list="tabsTitle" align="center" :itemHeight="50" :width="198"
							:default-name="tabsIndex" :round="2" :itemRound="2" color="#FDE2BC" itemModel="card"
							activeColor="#000" activeFontColor="#fff">
						</tm-tabs>
					</view>
				</view>
			</tm-sheet>
			<view class="" v-show="tabsIndex==0">
				<tm-sheet :margin="[0,0]" color="#1E1F28" :padding="[0,0]">
					<tm-tabs color="#1E1F28" class="mr-20" @change="tabschange1" :list="tabsTitle1" showTabsLineAni
						:itemWidth="100" :width="750" :height="500" default-name="1">
					</tm-tabs>
				</tm-sheet>
				<tm-sheet color="#1E1F28" :margin="[0,0]" :padding="[40,20]" :shadow="0" :round="0">
					<view class="flex flex-between">
						<tm-text color="#FDE2BC" :font-size="26" label="藏品"></tm-text>
						<view class="flex">
							<view class="flex  mr-40" @click="newPriceSort">
								<tm-text color="#FDE2BC" :font-size="26" label="热度"></tm-text>
								<view class="flex flex-col">
									<tm-icon :fontSize="14" :color="newPrice?'':bgColor" name="tmicon-sort-up">
									</tm-icon>
									<tm-icon :fontSize="14" :color="newPrice?bgColor:''" name="tmicon-sort-down">
									</tm-icon>
								</view>
							</view>
							<view class="flex" @click="upSort">
								<tm-text color="#FDE2BC" :font-size="26" label="涨跌幅"></tm-text>
								<view class="flex flex-col">
									<tm-icon :fontSize="14" :color="up?'':bgColor" name="tmicon-sort-up"></tm-icon>
									<tm-icon :fontSize="14" :color="up?bgColor:''" name="tmicon-sort-down"></tm-icon>
								</view>
							</view>
						</view>
					</view>
				</tm-sheet>
				<view class="list">
					<tm-sheet transprent :margin="[0,0]" :padding="[20,20]" :shadow="0" :round="2"
						@click="gonav('pages/space/spaceDetails')">
						<view class="flex flex-row-center-between">
							<view class="flex">
								<tm-image :round="2" :width="148" :height="148" src="https://picsum.photos/200/300">
								</tm-image>
								<view class="flex flex-col flex-between ml-20">
									<tm-text :font-size="32" color="white" class="text-weight-b" label="《吉祥纹》">
									</tm-text>
									<tm-text :font-size="22" color="#808080" label="浔画艺术平台"></tm-text>
									<view class="flex">
										<tm-sheet :margin="[0,0]" :padding="[4,4]" :shadow="0" :round="2"
											color="#FFE6C8">
											<tm-text  color="#000" class="text-weight-b" :font-size="22" label="流通 3888"></tm-text>
										</tm-sheet>
									</view>
								</view>
							</view>
							<tm-text color="white" :font-size="38" label="99.35"></tm-text>
							<view class="flex">
								<tm-text class="flex-end mb-4" color="red" :font-size="26" label="+"></tm-text>
								<tm-text color="red" :font-size="38" label="10.02%"></tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
			<view class="" v-show="tabsIndex==1">
				<view class="flex flex-between mt-40">
					<view class="flex flex-col  ml-20">
						<view class="flex mb-20">
							<tm-text color="red" :font-size="26" label="涨"></tm-text>
							<tm-text color="red" :font-size="26" label="1046"></tm-text>
						</view>
						<tm-image :width="356" :height="18" :src="l1"></tm-image>
					</view>
					<view class="flex flex-col mr-20">
						<view class="flex flex-end mb-20">
							<tm-text color="green" :font-size="26" label="跌"></tm-text>
							<tm-text color="green" :font-size="26" label="1046"></tm-text>
						</view>
						<tm-image :width="356" :height="18" :src="r1"></tm-image>
					</view>
				</view>
				<tm-text class="ml-20 mt-40" color="white" :font-size="26" label="热门藏品"></tm-text>

				<view class="hot flex flex-around">
					<view class="flex flex-col flex-center" v-for="item in 3">
						<tm-image :round="2" :width="114" :height="114" src="https://picsum.photos/200/300">
						</tm-image>
						<tm-text class="text-weight-b mt-10" color="white" :font-size="30" label="吉祥纹"></tm-text>
						<tm-text class="text-weight-b mt-10" color="red" :font-size="26" label="99.38"></tm-text>
						<view class="flex mt-10">
							<tm-text class="text-weight-b" color="red" :font-size="24" label="+"></tm-text>
							<tm-text class="text-weight-b" color="red" :font-size="26" label="20%"></tm-text>
						</view>
					</view>
				</view>
				<tm-sheet color="#1E1F28" :margin="[0,0]" :padding="[40,20]" :shadow="0" :round="0">
					<view class="flex flex-between">
						<view class="flex  mr-40" @click="newPriceSort">
							<tm-text color="#FDE2BC" :font-size="26" label="热度排行"></tm-text>
							
						</view>
						<view class="flex">
							<view class="flex  mr-40" @click="newPriceSort">
								<tm-text color="#FDE2BC" :font-size="26" label="热度"></tm-text>
								<view class="flex flex-col">
									<tm-icon :fontSize="14" :color="newPrice?'':bgColor" name="tmicon-sort-up">
									</tm-icon>
									<tm-icon :fontSize="14" :color="newPrice?bgColor:''" name="tmicon-sort-down">
									</tm-icon>
								</view>
							</view>
							<view class="flex" @click="upSort">
								<tm-text color="#FDE2BC" :font-size="26" label="涨跌幅"></tm-text>
								<view class="flex flex-col">
									<tm-icon :fontSize="14" :color="up?'':bgColor" name="tmicon-sort-up"></tm-icon>
									<tm-icon :fontSize="14" :color="up?bgColor:''" name="tmicon-sort-down"></tm-icon>
								</view>
							</view>
						</view>
					</view>
				</tm-sheet>
				<view class="list">
					<tm-sheet transprent :margin="[0,0]" :padding="[20,20]" :shadow="0" :round="2"
						@click="gonav('pages/space/spaceDetails')">
						<view class="flex flex-row-center-between">
							<view class="flex">
								<tm-image :round="2" :width="148" :height="148" src="https://picsum.photos/200/300">
								</tm-image>
								<view class="flex flex-col flex-between ml-20">
									<tm-text :font-size="32" color="white" class="text-weight-b" label="《吉祥纹》">
									</tm-text>
									<tm-text :font-size="22" color="#808080" label="浔画艺术平台"></tm-text>
									<view class="flex">
										<tm-sheet :margin="[0,0]" :padding="[4,4]" :shadow="0" :round="2"
											color="#FFE6C8">
											<tm-text color="#000" class="text-weight-b" :font-size="22" label="流通 3888"></tm-text>
										</tm-sheet>
									</view>
								</view>
							</view>
							<tm-text color="white" :font-size="38" label="99.35"></tm-text>
							<view class="flex">
								<tm-text class="flex-end mb-4" color="red" :font-size="26" label="+"></tm-text>
								<tm-text color="red" :font-size="38" label="10.02%"></tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
			<!-- <view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view> -->
		</view>
	</tm-app>
</template>
<script setup>
	import space from "@/static/space/xlogo.png"
	import r from "@/static/space/right.png"
	import r1 from "@/static/space/r.png"
	import l1 from "@/static/space/l.png"
	import { ref } from 'vue'
	const listimg = [
		"https://picsum.photos/200/300?id=43335",
		"https://picsum.photos/200/300?id=433",
		"https://picsum.photos/200/300?id=439",
		"https://picsum.photos/200/300?id=459",
	]
	const tabsIndex = ref(0)
	const tabsTitle = ref([
		{ key: "0", title: "关注" },
		{ key: "1", title: "行情" }
	])

	const tabschange = (i) => {
		tabsIndex.value = i
	}
	const tabschange1 = (i) => {}
	const tabsTitle1 = ref([
		{ key: "1", title: "全部" },
		{ key: "2", title: "全部" },
		{ key: "3", title: "全部" },
		{ key: "4", title: "全部" },
		{ key: "5", title: "全部" },
		{ key: "6", title: "全部" },
		{ key: "7", title: "全部" },
		{ key: "8", title: "全部" },
	])
	// 是否排序
	const newPrice = ref(true)
	const up = ref(true)
	const newPriceSort = () => {
		newPrice.value = !newPrice.value;
	}
	const upSort = () => {
		up.value = !up.value
	}
	const add = () => {
		tabsTitle1.value.push({ key: "2", title: "哈哈哈" })
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}

	/* .aaaa {
		position: relative;
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
	} */

	.list {
		width: 710rpx;
		height: 184rpx;
		background-image: url('../../static/space/list.png');
		background-size: 100% 100%;
		margin: 0 auto;
	}

	.hot {
		width: 710rpx;
		height: 275rpx;
		background-image: url('../../static/space/main.png');
		background-size: 100% 100%;
		margin: 20rpx auto;
	}
</style>
