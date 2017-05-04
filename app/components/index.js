module.exports = {
	get Header() { return require('./common/header.js');},
	get Back() { return require('./common/back.js');},
	get Nav() { return require('./common/nav.js');},
	get VerifyButton() { return require('./pages/login/verifyButton.js');},
	get NetConfig() { return require('./common/netConfig.js');},
	get CustomFetch() { return require('./common/customFetch.js');},
	get PopUp() { return require('./common/popUp.js');},
	get Toast() { return require('./common/toast.js');},
	get TipsDialog() { return require('./common/tipsDialog.js');},
	get ItemList() { return require('./common/itemList.js');},
	get Test() { return require('./common/test.js');},
};