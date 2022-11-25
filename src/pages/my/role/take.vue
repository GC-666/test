<template>
	<view class="">
		<scroll-view scroll-y="true" :style="`height: calc(100vh - ${statusBarHeight}px - 88rpx - ${bottom}px );`"
			@scrolltolower="lower">
			<tm-sheet :round="4" color="grey" :margin="[20,20]" :padding="[0,0]" v-for="i in 10">
				<tm-sheet :round="4" color="grey-3" :margin="[0,0]" :padding="[10,10]">
					<view class="flex flex-between">
						<view class="flex flex-col flex-around">
							<tm-text :font-size="28" _class="text-weight-b" label="打工角色名"></tm-text>
							<view class="flex">
								<tm-icon class="pt-2" :fontSize="28" name="tmicon-clock"></tm-icon>
								<tm-countdown class="text-size-n ml-10" :time="parseInt(999999)" format="HH:MM:SS"
									autoStart>
								</tm-countdown>
							</view>
						</view>
						<tm-image :round="4" :width="100" :height="100" src="https://picsum.photos/200/300"></tm-image>
					</view>
					<tm-sheet :margin="[20,20]" :round="4" :padding="[10,10]">
						<view class="flex flex-between">
							<tm-text :font-size="24" label="职业：战士"></tm-text>
							<tm-text :font-size="24" label="每次时常：1s/次"></tm-text>
							<tm-text :font-size="24" label="要求：Lv2/>50智力"></tm-text>
						</view>
						<view class="mt-20 flex">
							<tm-text :font-size="24" label="报酬："></tm-text>
							<view class="flex flex-col ">
								<tm-text :font-size="24" label="积分*20"></tm-text>
								<tm-text :font-size="24" label="积分*20"></tm-text>
								<tm-text :font-size="24" label="积分*20"></tm-text>
							</view>
						</view>
					</tm-sheet>
					<view class="ml-20 flex flex-between ">
						<view class="">
							<tm-text :font-size="24" label="总次数 (20/30)"></tm-text>
							<tm-progress :width="300" :height="10" v-model:percent="percent"></tm-progress>
						</view>
						<view class="">
							<tm-button :margin="[10, 10]" :width="140" :height="40" size="mini" :shadow="0"
								label="开始冒险">
							</tm-button>
						</view>
					</view>
				</tm-sheet>
				<view class="flex">
					<tm-text class="ma-20" :font-size="24" label="参与角色"></tm-text>
					<view class="flex-center aa mb-10">
						<image class="bb" v-for="i in 5" src="https://picsum.photos/200/300" mode=""></image>
					</view>
				</view>
			</tm-sheet>
		</scroll-view>
	</view>
</template>
<script setup>
	import { My } from "@/api/api.ts"
	import { onBeforeMount, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const percent = ref(50)
	const bottom = ref('')
	const height = ref('')
	const statusBarHeight = uni.getWindowInfo().statusBarHeight
	onBeforeMount(() => {
		if (uni.getSystemInfoSync().platform == "ios") {
			bottom.value = '70'
		}
		if (uni.getSystemInfoSync().platform == "android") {
			bottom.value = '50'
		}
	})
</script>

<style>
	.aa {
		margin-left: -5%;
	}

	.bb {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-left: -5%;
	}
</style>
