// Just an API handler file for talking to our API
export async function getNextLink(link) {
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

export async function getAllNodes() {
	// Implement this to get ALL the nodes in the DB.
	// Mock this for now.
	const theResponse = JSON.stringify([
		{
			link: {
				url: 'https://reddit.com/r/hmmm/comments/idstfc/comment/g2blkt6',
			},
			next: {
				url:
					'https://reddit.com/r/AskReddit/comments/idurep/what_will_you_do_to_better_yourself_today/g2bg50h',
			},
		},
		{
			link: {
				url:
					'https://reddit.com/r/AskReddit/comments/idurep/what_will_you_do_to_better_yourself_today/g2bg50h',
			},
			next: {
				url:
					'https://reddit.com/r/IRLEasterEggs/comments/idhruu/found_on_the_bottom_of_a_can_of_paws_and_claws_ipa/g2awjtr',
			},
		},
	]);
	return theResponse;
}
