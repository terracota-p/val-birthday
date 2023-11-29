import { redirect } from '@sveltejs/kit';
import * as knowledge from '../lib/knowledge';
import type { Actions } from './$types';

import 'dotenv/config';

export async function load({ url }) {
	// TODO temp
	console.log('load');
	const celebrated = url.searchParams.get('celebrated');

	// TODO get knowledge by key
	// const user = await kv.hgetall('user:me');
	// return { user: JSON.stringify(user) };

	knowledge.load();

	return { celebrated };
}

export const actions = {
	key: async ({ request }) => {
		// TODO query param?
		// generated = false;
		// TODO pass key to load()?
		const key = (await request.formData()).get('key');
		throw redirect(303, '/key/' + key);
	}
} satisfies Actions;
