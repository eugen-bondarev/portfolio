export async function POST({ request }) {
	try {
		const flowluApiKey = import.meta.env.FLOWLU_API_KEY
		const requestBody = await request.json();
		const details = {
			name: requestBody.name,
			description: requestBody.message,
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

		if (!json.response?.id) {
			throw new Error('an error occurred')
		}
	} catch (e) {
		return new Response(JSON.stringify({ msg: e.toString() }), {
			status: 500, headers: {
				'Content-Type': 'application/json'
			}
		})

	}
	return new Response(null, {
		status: 200, headers: {
			'Content-Type': 'application/json'
		}
	})
}

