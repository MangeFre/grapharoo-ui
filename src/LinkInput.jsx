import React, { Component } from 'react';
import './LinkInput.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
toast.configure();

function validateInput(inputValue) {
	// Monstrosity from stackoverflow: https://stackoverflow.com/a/8234912
	const regex = RegExp(
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
	);

	const isValid = regex.test(inputValue);
	return isValid;
}

export default class LinkInput extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		// Submitting forms causes a page-reload -> Bad. Prevent it.
		e.preventDefault();
		// Here, we could validate the input.
		const { onSubmit } = this.props;
		// This grabs the form DOM Element
		const form = document.forms.link;
		// This is the value of the link input
		const submittedLink = form.linkInput.value;
		const valid = validateInput(submittedLink);
		if (!valid) {
			// This should display an error.
			toast.error('Incorrect Link', { position: toast.POSITION.BOTTOM_CENTER });
		} else {
			form.linkInput.value = '';
			onSubmit(submittedLink);
		}
	}

	render() {
		return (
			<form
				className="searchForm"
				name="link"
				onSubmit={(e) => this.handleSubmit(e)}>
				<input
					type="text"
					name="linkInput"
					placeholder="Switcheroo Link"></input>
				<button type="submit">
					<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
				</button>
			</form>
		);
	}
}
