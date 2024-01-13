/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const fileId = params.file;
	return { fileId: fileId, fileName: fileId };
}
