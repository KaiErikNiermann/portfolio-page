<script lang="ts">
	import { formatDate } from '$lib/utils'
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		margin-inline: auto;
		max-width: 800px;
	}

	hgroup {
		margin-inline: var(--size-3);
	}

	div.prose {
		margin-inline: var(--size-3);
		min-width: 50%;
	}

	h1 {
		text-transform: capitalize;
	}

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
	}

</style>