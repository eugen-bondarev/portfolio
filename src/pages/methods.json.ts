import type { APIRoute } from "astro";

const foo = async ({ params, request }: any) => {
	const flowluApiKey = import.meta.env.FLOWLU_API_KEY

	const url = new URL(request.url);

	const details = {
		name: url.searchParams.get('name'),
		description: url.searchParams.get('message'),
	}

	const formBody: string[] = [];
	for (var property in details) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	const body = formBody.join("&");

	const r = await fetch(`https://eugen-bondarev.flowlu.com/api/v1/module/crm/lead/create?api_key=${flowluApiKey}`, {
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	const json = await r.json()
}

export const GET: APIRoute = ({ params, request }) => {
	foo({ params, request })
	return new Response(null, {
		status: 200, headers: {
			'Content-Type': 'application/json'
		}
	})
};
