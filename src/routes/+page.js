export function load({ url }) {
	const hex = url.searchParams.get('c');
	const satStep = url.searchParams.get('s');
	const valStep = url.searchParams.get('v');
	return { hex, satStep, valStep };
}
