import { dev } from "$app/environment";

export let title: string = 'SvelteKit Blog';
export let description: string = 'A statically generated blog built with SvelteKit';
export let url: string = dev ? 'http://localhost:5173' : 'https://apelsauce.me/';