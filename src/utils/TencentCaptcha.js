const Captcha = new TencentCaptcha('190971740', res => {
	uni.$emit('getTicket', res);
});

export default Captcha
