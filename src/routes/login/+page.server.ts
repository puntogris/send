import { dev } from '$app/environment';
import { AUTH_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		const domain = dev ? 'localhost' : 'send.puntogris.com';

		if (password === AUTH_PASSWORD) {
			const expireDate = new Date();
			expireDate.setFullYear(expireDate.getFullYear() + 1);

			cookies.set('auth', AUTH_PASSWORD, {
				sameSite: true,
				secure: true,
				httpOnly: true,
				path: '/',
				expires: expireDate,
				domain
			});

			redirect(303, '/');
		} else {
			return {
				error: "Password didn't matched, who are you?"
			};
		}
	}
};
