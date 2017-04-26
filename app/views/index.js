module.exports = {
	get App() { return require('./App.js')},
	get IndexView() { return require('./IndexView.js');},
	get LoginView() { return require('./LoginView.js');},
	get RegisterView() { return require('./RegisterView.js');},
	get CourseView() { return require('./CourseView.js');},
	get VideoView() { return require('./VideoView.js');},
	get SettingView() { return require('./SettingView.js');},
	get NotFound404() { return require('./404.js');},

};