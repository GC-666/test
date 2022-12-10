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
					<tm-text :font-size="22" color="#0B425B" label="Lv: 1">
					</tm-text>
					<tm-image :round="0" :margin="[0,0]" :width="162" :height="36" :src="yjsj">
					</tm-image>
				</view>
				<view class="mr-20 ml-20">
					<tm-text :font-size="22" color="#0B425B" label="经验: 100/1000">
					</tm-text>
				</view>
				<view class="flex flex-between ml-20">
					<tm-progress :width="636" v-model:percent="percent" :height="10"></tm-progress>
				</view>
			</tm-sheet>
			<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[10,20]">
				<view class="flex flex-around">
					<view class="flex flex-col" v-for="i in 4">
						<view class="flex flex-row">
							<tm-badge count="5" color="#99C2E1">
								<tm-avatar color="green" :font-size="42" :margin="[10,0]" icon="tmicon-QQ"></tm-avatar>
							</tm-badge>
						</view>
						<tm-text :font-size="22" color="#0B425B" label="经验: 1000">
						</tm-text>
					</view>
				</view>
			</tm-sheet>
		</view>
	</tm-app>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import yjsj from "@/static/role/yjsj.png"
	const percent = ref(20)
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
