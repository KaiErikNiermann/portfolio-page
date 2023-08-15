import { error } from '@sveltejs/kit'

export async function load({ params: params }) {
	try {
		const post : {default: any, metadata: App.Post} = await import(`../../posts/${params.slug}.md`)
		
		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}
