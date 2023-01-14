<template>
	<tm-app>
		<tm-navbar title="设置" :height="44" :shadow="0">
		</tm-navbar>
		<tm-sheet :shadow="0" :margin="[0,15]" :padding="[0,0]">
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="个人信息"
				@click="gonav('pages/my/set/myinfo/myinfo')"> </tm-cell>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[0,15]" :padding="[0,0]">
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="关于我们"
				@click="gonav('pages/my/set/about/about')"> </tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="邀请好友"
				@click="gonav('pages/my/set/share/share')"> </tm-cell>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[0,15]" :padding="[0,0]">
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="申请开票"
				@click="gonav('pages/my/set/bill/bill')"> </tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="修改登入密码"
				@click="gonav('pages/my/set/fopwd/fopwd')">
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="修改支付密码"
				:rightText="set==='1'?'已设置':'请设置支付密码'" @click="gonav('pages/my/set/paypwd/paypwd')">
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="设置收货地址"
				@click="gonav('pages/my/set/address/address?type=0')">
			</tm-cell>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[0,15]" :padding="[0,0]">
			<!-- #ifdef APP-PLUS -->
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :rightText="`${currentSize}`" :titleFontSize="30"
				title="清理缓存" @click="clear"> </tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<!-- #endif -->
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="排行"
				@click="gonav('pages/my/set/ranking/ranking')"> </tm-cell>
			<!-- <tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell _class="text-weight-b" :margin="[0, 0]" :titleFontSize="30" title="注销账户"></tm-cell> -->
		</tm-sheet>
		<view class="flex flex-center">
			<tm-button @click="logOut" :width="520" :height="70" _class="text-weight-b" :round="4" :margin="[0,30]"
				:fontSize="30" label="退出登录"></tm-button>
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from '@/api/api';
	import { onLoad } from '@dcloudio/uni-app';
	import { onBeforeMount, ref } from 'vue';
	const currentSize = ref('')
	const logOut = () => {
		uni.removeStorageSync('token')
		uni.reLaunch({
			url: "/pages/login/login"
		})
	}
	const clear = () => {
		let os = plus.os.name;
		if (os == 'Android') {
			let main = plus.android.runtimeMainActivity();
			let sdRoot = main.getCacheDir();
			let files = plus.android.invoke(sdRoot, "listFiles");
			let len = files.length;
			for (let i = 0; i < len; i++) {
				let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					if (entry.isDirectory) {
						entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录
							files = []
							uni.showToast({
								title: '清除成功',
								duration: 2000
							});
							getStorageSize(); // 重新计算缓存
						}, function(e) {
							console.log(e.message)
						});
					} else {
						entry.remove();
					}
				}, function(e) {
					console.log('文件路径读取失败')
				});
			}
		} else { // ios  
			plus.cache.clear(function() {
				uni.showToast({
					title: '清除成功',
					duration: 2000
				});
				that.getStorageSize();
			});
		}
	}
	onLoad(() => {
		// #ifdef APP-PLUS
		getStorageSize()
		// #endif
		My.setup().then(res => {
			set.value = res
		})
	})
	const set = ref('')

	// 获取缓存大小
	const getStorageSize = () => {
		plus.cache.calculate(function(size) {
			let sizeCache = parseInt(size);
			if (sizeCache == 0) {
				currentSize.value = "0B";
			} else if (sizeCache < 1024) {
				currentSize.value = sizeCache + "B";
			} else if (sizeCache < 1048576) {
				currentSize.value = (sizeCache / 1024).toFixed(2) + "KB";
			} else if (sizeCache < 1073741824) {
				currentSize.value = (sizeCache / 1048576).toFixed(2) + "MB";
			} else {
				currentSize.value = (sizeCache / 1073741824).toFixed(2) + "GB";
			}
		});
	}
</script>

<style>
</style>
