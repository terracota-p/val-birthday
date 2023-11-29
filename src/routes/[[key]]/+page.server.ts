import { redirect } from '@sveltejs/kit';
import 'dotenv/config';
import * as knowledge from '../../lib/knowledge';
import type { Actions } from './$types';

export async function load({ url, params, fetch }) {
	// TODO temp
	console.log('load');
	const celebrated = url.searchParams.get('celebrated');
	const generated = !!url.searchParams.get('generated');
	const key = params.key;

	return { celebrated, key, generated, knowledge: key && (await knowledge.load(key, fetch)) };
}

export const actions = {
	key: async ({ request }) => {
		const key = (await request.formData()).get('key');
		throw redirect(303, `/${key}`);
	},

	generate: async ({ fetch }) => {
		const key = await knowledge.generate(fetch);
		throw redirect(303, `/${key}?generated`);
	},

	save: async ({ request, fetch }) => {
		const form = await request.formData();
		const k = form.get('key');
		const v = form.get('knowledge');
		await knowledge.save(k ? '' + k : null, v ? v + '' : null, fetch);
	}
} satisfies Actions;
