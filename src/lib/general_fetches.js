export async function fetchPOST(endpoint, data) {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.text();
}

export function pmanPOST(url, argslist) {
	return fetchPOST(url, { args: argslist });
}
