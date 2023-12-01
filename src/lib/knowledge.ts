import repositoryMod from './repository-api';

export default (fetch?: typeof global.fetch) => {
	const repository = repositoryMod(fetch);

	function generate(): string {
		return crypto.randomUUID();
	}

	async function save(key: string | null, knowledge: string | null) {
		if (key == null) {
			return;
		}
		await repository.set(key, knowledge);
	}

	async function load(key: string | null | undefined): Promise<string | null> {
		if (!key) {
			return null;
		}
		return repository.get(key);
	}

	return {
		generate,
		load,
		save
	};
};
