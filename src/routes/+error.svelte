<script>
	import { page } from '$app/stores'
</script>

<div class="error">
	<h1>{$page.status} - {$page.error?.message}</h1>
	<!-- link back home -->
	<a href="/">-> Go back home</a>
</div>

<style>
	.error {
		height: 100%;
		display: grid;
		place-content: center;
	}
</style>
