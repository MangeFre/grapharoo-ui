// Just an API handler file for talking to our API
export default async function getNextLink(link) {
	const encodedLink = encodeURI(link);
	const response = await fetch('http://localhost:3000/link/next', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: encodedLink,
		}),
	});

	try {
		const data = await response.json();
		return data;
	} catch (err) {
		return err;
	}
}
