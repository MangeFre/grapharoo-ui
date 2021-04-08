import React, { useState, useEffect } from 'react';
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

export default function LinkInput(props) {

	const { onSubmit } = props;

	function handleSubmit(e) {
		// Submitting forms causes a page-reload -> Bad. Prevent it.
		e.preventDefault();
		// Here, we could validate the input.
		// This grabs the form DOM Element
		const form = document.forms.link;
		// This is the value of the link input
		const submittedLink = form.linkInput.value.trim();
		const valid = validateInput(submittedLink);
		if (!valid) {
			// This should display an error.
			toast.error('That does not look like a link!', {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} else {
			form.linkInput.value = '';
			onSubmit(submittedLink);
		}
	}

	return (
		<form
			className="searchForm"
			name="link"
			onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				name="linkInput"
				placeholder="Switcheroo Link"></input>
			<button type="submit">
				<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
			</button>
			<style jsx>
				{`
						.searchForm {
							flex-grow: 1;
							display: flex;
							justify-content: center;
							width: 100%;
						}
						.searchForm input {
							font-size: 1.25em;
							width: 100%;
							padding: 5px;
							border: none;
							border-radius: 5px 0% 0% 5px;
							border-right: 1px solid rgb(253, 87, 87);
							background-color: white;
						}

						.searchForm button {
							font-size: 1.25em;
							padding: 5px 12px 5px 10px;
							border-radius: 0 45% 45% 0;
							background-color: white;
							border: none;
							outline: none;
							transition-duration: 0.4s;
							color: black;
						}

						.searchForm button:hover {
							color: rgb(253, 87, 87);
						}
					`}
			</style>
		</form>
	);
}