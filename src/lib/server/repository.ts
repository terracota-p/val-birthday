import { createClient } from '@vercel/kv';
import 'dotenv/config';

const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
	throw new Error(
		"Missing env vars KV_REST_API_URL, KV_REST_API_TOKEN, make sure .env file is set up locally or they're configured in prod"
	);
}
const kv = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

export async function set(key: string, knowledge: string | null): Promise<void> {
	await kv.set(key, knowledge);
}

export async function get(key: string): Promise<string | null> {
	return kv.get(key);
}
