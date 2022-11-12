
 const BASE_URL = import.meta.env.VITE_APP_BASE_API
// const BASE_URL = "https://xunmeta.rocknft.top/api"

// 封装 GET POST 请求并导出
export function request(url: string = '', params = {}, type: string = 'POST') {
	//设置 url params type 的默认值
	let headerReSet = {
		'Content-Type': 'application/x-www-form-urlencoded',
		token: uni.getStorageSync("token")
	};
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: type,
			data: params,
			header: headerReSet,
			success: (res) => {
				const {
					data
				} = res
				if (data.code === "404") { //根据后台返回的状态码判断
					uni.showToast({
						title: "请求不存在",
						icon: 'none',
					});
					// uni.reLaunch({
					// 	url: '/pages/error/404'
					// })
					return
				} else if (data.code === "500") {
					uni.showToast({
						title: "服务器异常",
						icon: 'none',
					});
					// uni.reLaunch({
					// 	url: '/pages/error/500'
					// })
					return
				}else if(data.code === "401"){
					uni.redirectTo({
						url: '/pages/login/login'
					})
					return
				}else if(data.code === "403"){
					uni.showToast({
						title: data.info,
						icon: 'none',
					});
					uni.redirectTo({
						url: '/pages/login/login'
					})
					return
				}else if(data.code === "10000"){
					resolve(data.data)
				}else{
					uni.showToast({
						title: data.info,
						icon: 'none',
					});
				}
				
			},
			fail: (err) => {
				if (err.errMsg) {
					uni.showToast({
						title: "网络异常",
						icon: 'none',
					});
				}
			},
			
		})

	})
}