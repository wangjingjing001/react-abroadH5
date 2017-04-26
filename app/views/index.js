module.exports = {
	get App() { return require('./App.js')},
	get IndexView() { return require('./IndexView.js');},
	get LoginView() { return require('./LoginView.js');},
	get SettingView() { return require('./SettingView.js');},
	get NotFound404() { return require('./404.js');}
};