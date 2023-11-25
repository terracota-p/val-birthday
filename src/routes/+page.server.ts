import { createClient } from '@vercel/kv';
import 'dotenv/config';

const { KV_REST_API_URL = '', KV_REST_API_TOKEN = '' } = process.env;

const kv = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

// TODO temp
console.log('NODE_ENV =', process.env.NODE_ENV);
console.log('KV_REST_API_URL =', KV_REST_API_URL);

/** @type {import('./$types').PageLoad} */
export async function load() {
	const user = await kv.hgetall('user:me');
	return { user: JSON.stringify(user) };
}
