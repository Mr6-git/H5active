import $ from 'jquery';

export default {
	REQUEST(url, method, body) {
		let baseUrl,
			appKey,
			sevicerId;
		if(process.env.NODE_ENV === 'development') {
			baseUrl = 'http://dev-api.awtio.com';
			appKey = '64a080de0cbad36ab607f5d6';
			sevicerId = '1134625846519140352';
		}else if(process.env.NODE_ENV === 'production'){
			baseUrl =  'https://api.awtio.com';
			appKey = '43a58de05457647be46cf5ee';
			sevicerId = '1145874434909802496';
		}
		return new Promise((resolve, reject) => {
			$.ajax({
				type: method,
				url: baseUrl+url,
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				processData: false,
				data: JSON.stringify(body),
				beforeSend: function (request) {
					request.setRequestHeader("App-Key", appKey);
					request.setRequestHeader("Servicer-ID", sevicerId);
					request.setRequestHeader("Bundle-ID", "com.awtio.h5");
					request.setRequestHeader("Version", "1.0");
					// request.setRequestHeader("Channel-ID", channelCode);
				},
				success: (result) => {
					if (result.code === 200) {
						resolve(result);
					}
				},
				error: function (error, textStatus) {
					reject({
						data: error,
						textStatus
					})
				},
			})
		});
	},
	GET(url, method, body) {
		return this.REQUEST(url, method, body);
	},
}