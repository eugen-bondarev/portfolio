export async function GET({ request }) {
	try {
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

		if (!json.response?.id) {
			throw new Error('an error occurred, ' + JSON.stringify(json))
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

