<template>
	<tm-app>
		<tm-navbar title="角色升级"></tm-navbar>
		<view class="bg">
			<view class="main">
				<tm-image :round="4" :margin="[0,50]" :width="492" :height="752" src="https://picsum.photos/200/300">
				</tm-image>
			</view>
			<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]">
				<view class="flex flex-around">
					<tm-text :font-size="28" _class="text-weight-b" class=" ma-20" label="米利恩·夏亚">
					</tm-text>
				</view>
			</tm-sheet>
			<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]">
				<view class="flex flex-between ma-20">
					<tm-text :font-size="22" label="Lv: 1">
					</tm-text>
					<tm-image :round="0" :margin="[0,0]" :width="162" :height="36" :src="yjsj">
					</tm-image>
				</view>
				<view class="mr-20 ml-20">
					<tm-text :font-size="22" label="经验: 100/1000">
					</tm-text>
				</view>
				<view class="flex flex-between ml-20">
					<tm-progress :width="636" v-model:percent="percent" :height="10"></tm-progress>
				</view>
			</tm-sheet>
			<tm-sheet :shadow="0" :round="4" :width="700" :margin="[10,15]" :padding="[10,20]">

				<scroll-view scroll-x="true" style="width: 700rpx;" @scrolltolower="lower">
					<view class="flex flex-row">
						<tm-badge class="ma-6" :count="item.collCount" color="#99C2E1" v-for="item in heroList">
							<tm-avatar :size="120" :img="item.collImg"></tm-avatar>
						</tm-badge>
					</view>
				</scroll-view>

			</tm-sheet>
		</view>
	</tm-app>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import yjsj from "@/static/role/yjsj.png"
	import { onLoad } from "@dcloudio/uni-app";
	const percent = ref(20)
	const heroList = ref([])
	const heroCount = ref(0)
	const lower = () => {
		if (heroCount.value > 0) {
			params.value.page += 1
			findUpgradeHeroMaterial()
		}
	}
	const params = ref({
		page: 1,
		limit: 10,
	})
	onLoad((obj) => {
		Role.findUserHeroItem({ id: obj.id }).then(res => {

		})
	})
	onBeforeMount(() => {
		findUpgradeHeroMaterial()

	})
	const findUpgradeHeroMaterial = () => {
		Role.findUpgradeHeroMaterial(params.value).then(res => {
			heroCount.value = res.materialList.length
			heroList.value = heroList.value.concat(res.materialList)
		})
	}
</script>

<style scoped>
	.bg {
		width: 100%;
		background-image: url('@/static/role/detailsBg.png');
		background-size: 100% 100%;
	}

	.main {
		display: flex;
		justify-content: center;
	}
</style>
