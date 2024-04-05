// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {}
		interface Env {
			POSTGRES_URL: string;
		}
		// interface Platform {}
		interface Project {
			name: string;
			description: string;
			startDate: string;
			endDate: string;
		}

		type Categories = 
			'sveltekit' | 
			'svelte' | 
			'typescript' |
			'C' |
			'python' |
			'docker' | 
			'mongodb' |
			'HTML' |
			'CSS' |
			'SCSS' | 
			'JavaScript' |
			'Node.js' |
			'Express' |
			'PostgreSQL' |
			'Git' |
			'GitHub' |
			'Linux' |
			'Windows' |
			'Ubuntu' |
			'Python' |
			'C++' |
			'Java' |
			'Bash' |
			''

		type Post = { 
			title: string; 
			slug: string;
			description: string;
			date: string;
			categories: Categories[];
			published: boolean;
			github: string | null;
			post_type: number;
		}
	}
}

export {};
