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

export async function set(key: string, knowledge: string | null): Promise<void> {
	await kv.set(key, knowledge);
}

export async function get(key: string): Promise<string | null> {
	return kv.get(key);
}
