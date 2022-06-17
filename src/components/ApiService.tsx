const BASE_URL = 'http://localhost:9090/';

// 参考
// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
// https://qiita.com/legokichi/items/801e88462eb5c84af97d

export const ApiService = {

	get: async <T extends Object>(url: string, arrayName: string): Promise<T> => {

		return await fetch(BASE_URL + url, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.catch((e) => {
				console.error('ERROR: ' + e);
				throw Error(e);
			})
			.then((e) => handleErrors(e))
			.then(res => res.json()
				.then((json: any) => {
					console.log(json[arrayName])
					return json[arrayName];
				})
			);
	},

	post: async <T extends Object>(url: string, data: T) => {

		console.log('JSON BODY: ' + JSON.stringify(data))

		fetch(BASE_URL + url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data)
		})
			.catch((e) => {
				console.error('ERROR: ' + e);
				throw Error(e);
			})
			.then((e) => handleErrors(e));

	},

	put: async <T extends Object>(url: string, data: T) => {

		console.log('JSON BODY: ' + JSON.stringify(data))

		return fetch(BASE_URL + url, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data)
		})
			.catch((e) => {
				console.error('ERROR: ' + e);
				throw Error(e);
			})
			.then((e) => handleErrors(e));
	}

}

const handleErrors = async (res: Response) => {

	console.info('Result Http Status: ' + res.status);

	if (res.ok) {
		return res;
	}

	// response の取り方
	// https://serip39.hatenablog.com/entry/2020/09/10/070000#%E3%83%8F%E3%83%9E%E3%81%A3%E3%81%9F%E7%BD%A0
	const err = await res.json()

	console.error('Error Code: ' + err.code);
	console.error('Error Message: ' + err.msg);

	switch (res.status) {
		case 400: throw Error('Bad Request');
		case 401: throw Error('Unauthorized');
		case 404: throw Error('Not Found');
		case 500: throw Error('Internal Server Error');
		case 502: throw Error('Bad Gateway');
		default: throw Error('Unknown Error');
	}
};
