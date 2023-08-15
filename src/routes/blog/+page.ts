export async function load({ fetch }) {
	const response = await fetch('./api/posts')
	const posts: App.Post[] = await response.json()
	return { posts }
}
