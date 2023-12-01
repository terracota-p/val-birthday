import * as repository from './repository-api';
import { browser } from '$app/environment';

export default (fetch?: typeof global.fetch) => {
	function generate(): string {
		return crypto.randomUUID();
	}

	async function save(key: string | null, knowledge: string | null) {
		if (key == null) {
			return;
		}
		await repository.set(key, knowledge, fetch ?? defaultFetch());
	}

	async function load(
		key: string | null | undefined,
		fetch?: typeof global.fetch
	): Promise<string | null> {
		if (!key) {
			return null;
		}
		return repository.get(key, fetch ?? defaultFetch());
	}

	// TODO move to repository-api
	function defaultFetch() {
		if (browser) {
			return window.fetch;
		}
		return global.fetch;
	}

	return {
		generate,
		load,
		save
	};
};
