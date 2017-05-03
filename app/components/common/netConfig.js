var netConfig = {
	prodcution: {
		api_server: 'http://www.pengyunliuxue.com'
	},
	development: {
		api_server: 'http://www-dev.pengyunliuxue.com'
	}
};

function getDev() {
	return location.hostname.indexOf('-dev') ? 'development' : 'prodcution';
}

module.exports = netConfig[getDev()];