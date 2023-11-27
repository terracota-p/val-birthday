import { json } from '@sveltejs/kit';
import * as repository from '$lib/server/repository';

export async function PUT({ params, request }) {
	const { key } = params;
	const { knowledge } = await request.json();

	await repository.set(key, knowledge);

	return json({ status: 200 });
}

export async function GET({ params }) {
	const { key } = params;

	const knowledge = await repository.get(key);

	return json({ knowledge });
}
