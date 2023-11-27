export async function set(key: string, knowledge: string | null): Promise<void> {
	await fetch(`/knowledge/${key}`, {
		method: 'PUT',
		body: JSON.stringify({ knowledge }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function get(key: string): Promise<string | null> {
	const res = await fetch(`/knowledge/${key}`);
	if (!res.ok) {
		return null;
	}
	const resBody = await res.json();
	console.log('resBody =', resBody);
	if ('knowledge' in resBody && typeof resBody.knowledge === 'string') {
		return resBody.knowledge;
	}
	return null;
}
