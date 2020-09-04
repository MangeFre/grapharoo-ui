// Just an API handler file for talking to our API
export default async function getNextLink(link) {
	const response = await fetch('http://localhost:5797/url', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: link,
		}),
	});

	const data = await response.json();
	console.log(data);
	return data;
}
