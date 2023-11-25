import { createClient } from '@vercel/kv';
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';

const kv = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

console.log('KV_REST_API_URL =', KV_REST_API_URL);

/** @type {import('./$types').PageLoad} */
export async function load() {
	const user = await kv.hgetall('user:me');
	return { user: JSON.stringify(user) };
}
