export function isValidUrl(inputValue) {
	// Monstrosity from stackoverflow: https://stackoverflow.com/a/8234912
	const regex = RegExp(
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
	);
	const isValid = regex.test(inputValue);
	return isValid;
}