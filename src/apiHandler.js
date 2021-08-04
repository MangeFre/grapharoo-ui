// Just an API handler file for talking to our API
export async function getNextLink(link) {
	const encodedLink = encodeURI(link);
	const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_ENDPOINT}/link/next`, {
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

export async function fixLink(brokenLink, fixedLink) {
	const encodedBrokenLink = encodeURI(brokenLink);
	const encodedFixedLink = encodeURI(fixedLink);
	const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_ENDPOINT}/link/fix`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			broken: encodedBrokenLink,
			fix: encodedFixedLink
		}),
	});

	try {
		const data = await response.json();
		return data;
	} catch (err) {
		return err;
	}
}

export async function getAllNodes() {
	// Implement this to get ALL the nodes in the DB.
	// Mock this for now.
	const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_ENDPOINT}/linkgraph`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		const data = await response.json();
		return data;
	} catch (err) {
		return err;
	}
}
