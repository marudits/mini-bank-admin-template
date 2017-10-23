export function getInitial(text: string): string{
	let arrayText = text.split(' '),
		initial = '';

	arrayText.forEach(x => initial += x.charAt(0));

	return initial;
}