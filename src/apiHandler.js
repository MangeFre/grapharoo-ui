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

	try {
		const data = await response.json();
		return data;
	} catch (err) {
		return err;
	}
}
