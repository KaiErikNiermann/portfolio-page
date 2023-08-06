import { error } from '@sveltejs/kit'
import katex from 'katex';


export async function load({ params }) {
	try {
		const post : {default: any, metadata: App.Post} = await import(`../../posts/${params.slug}.md`)
		console.log(post)
		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}
