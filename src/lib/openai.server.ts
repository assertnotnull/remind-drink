import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';

export const init = () => {
	const openai = new OpenAIApi(
		new Configuration({
			apiKey: ''
		})
	);

	return {
		sendPrompt: async (prompt: string) => {
			try {
				const outcome = await openai.createCompletion({
					model: 'gpt-3.5-turbo',
					prompt
				});
				return outcome.data.choices[0].text;
			} catch (err) {
				if (isRequestError(err)) {
					console.error(err.response.data.error.message);
					throw error(err.response.status, { message: err.response.statusText });
				}
			}
		}
	};
};

type ErrorRequest = {
	response: Response & {
		data: {
			error: {
				message: string;
				type: string;
			};
		};
	};
};

const isRequestError = (err: unknown): err is ErrorRequest => {
	return err !== null && typeof err === 'object' && 'response' in err;
};

export const openai = init();
