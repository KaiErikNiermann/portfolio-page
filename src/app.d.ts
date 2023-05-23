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
	}
}

export {};
