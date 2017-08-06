var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({url: wsuri, realm: "realm1"});
console.log('test is running')

function setupListener(emmiter) {
		function tickerEvent(args, kwargs) {
				console.log(args)
				if (args[0] === 'BTC_GNO') {
						emmiter
								.sockets
								.emit('newData', args);
				}
		}
		connection.onopen = function (session, details) {
				console.log('session: ', session)
				// function marketEvent (args,kwargs) { 	// emit this to client with a socket
				// 	console.log('marketEvent: ',args); } function trollboxEvent (args,kwargs) {
				// 	console.log("trollbox: ",args); } session.subscribe('BTC_XMR',
				// marketEvent);
				session.subscribe('ticker', tickerEvent);
				// session.subscribe('trollbox', trollboxEvent);
		}

		connection.onclose = function (reason, details) {
				console.log("Websocket connection closed", details);
		}

		connection.open();
}

module.exports = setupListener;
