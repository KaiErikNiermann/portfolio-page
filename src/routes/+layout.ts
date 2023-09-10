export const prerender = true

export async function load({ url: url }) {
	return {
		url: url.pathname
	}
}