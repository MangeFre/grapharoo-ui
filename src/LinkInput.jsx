import React, { Component } from 'react';

export default class LinkInput extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		// Submitting forms causes a page-reload -> Bad. Prevent it.
		e.preventDefault();
		// Here, we could validate the input.
		// Then, we would have to get the next link.
		// Right now, I'm just going to put it in the "history."
		const { onSubmit } = this.props;
		// This grabs the form DOM Element
		const form = document.forms.link;
		// This is the value of the link input
        const submittedLink = form.linkInput.value;
        form.linkInput.value = '';
		onSubmit(submittedLink);
	}

	render() {
		return (
			<form name="link" onSubmit={(e) => this.handleSubmit(e)}>
				<input type="text" name="linkInput"></input>
				<button type="submit">Submit</button>
			</form>
		);
	}
}
