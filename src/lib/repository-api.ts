import { browser } from '$app/environment';

export default (fetch = defaultFetch()) => {
	async function set(key: string, knowledge: string | null): Promise<void> {
		await fetch(`/knowledge/${key}`, {
			method: 'PUT',
			body: JSON.stringify({ knowledge }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	async function get(key: string): Promise<string | null> {
		const res = await fetch(`/knowledge/${key}`);
		if (!res.ok) {
			return null;
		}
		const resBody = await res.json();
		if ('knowledge' in resBody && typeof resBody.knowledge === 'string') {
			return resBody.knowledge;
		}
		return null;
	}

	return { set, get };
};

function defaultFetch() {
	if (browser) {
		return window.fetch;
	}
	return global.fetch;
}
