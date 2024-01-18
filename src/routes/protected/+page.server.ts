import { openai } from '$lib/openai.server';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const prompt = data.get('prompt');
		if (prompt) {
			console.log({ prompt: prompt.toString() });
			const reply = await openai.sendPrompt(prompt.toString());
			console.log({ reply });
			return reply;
		}
	}
} satisfies Actions;
