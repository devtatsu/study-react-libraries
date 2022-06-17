const BASE_URL = 'http://localhost:9090/';

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
