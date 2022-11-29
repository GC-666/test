<template>
	<scroll-view scroll-y="true" @scrolltolower="lower" v-if="list.length>0" class="scroll-Y">
		<tm-sheet :margin="[20,10]" :round="4" :border="2" :padding="[10,10]" v-for="item in list">
			<view class="flex flex-between">
				<view class="flex flex-center">
					<tm-image model="" :round="4" :width="100" :height="100" :src="item.heroImg">
					</tm-image>
					<view class="flex flex-col flex-around flex-center" style="width: 100rpx;">
						<tm-text :fontSize="22" :label="item.heroName"></tm-text>
						<tm-text :fontSize="22" :label="`Lv${item.heroGrade}`"></tm-text>
						<tm-text :fontSize="22" :label="`次数:${item.workCount}`"></tm-text>
					</view>
				</view>
				<view class="flex ml-10 mr-10 flex-row-center-between ">
					<view class="flex flex-around  flex-wrap">
						<tm-text class="mt-10" :fontSize="18" :label="`力量 ${item.heroPower}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`敏捷 ${item.heroAgile}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`智力 ${item.heroIntelligence}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`命中 ${item.heroMagic}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`生命值 ${item.heroLife}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`攻击力 ${item.heroAttack}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`防御力 ${item.heroDefense}`"></tm-text>
						<tm-text class="mt-10" :fontSize="18" :label="`魔法抗性 ${item.heroMagic}`"></tm-text>
					</view>
				</view>
				<view class="felx flex-center">
					<tm-button :margin="[10, 0]" size="mini" :width="70" :height="70" :round="20" :shadow="0" label="升级"
						@click=""></tm-button>
				</view>
			</view>

		</tm-sheet>
	</scroll-view>
	<view v-if="list.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
		<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
	</view>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const count = ref(0)
	const list = ref([])
	onBeforeMount(() => {
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

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx - 90rpx);
	}
</style>
