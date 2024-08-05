import "@std/dotenv/load"

const SUCCESS_STRING =
	"<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>"
const username = Deno.env.get("SOPHOS_USERNAME")
const password = Deno.env.get("SOPHOS_PASSWORD")

if (!username) {
	console.error("No username. Set SOPHOS_USERNAME in .env ")
	Deno.exit(1)
}

if (!password) {
	console.error("No username. Set SOPHOS_PASSWORD in .env")
	Deno.exit(1)
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

while (true) {
	console.log("checking...")
	const resp = await fetch("http://captive.apple.com", {
		signal: AbortSignal.timeout(1000),
	})
		.then(r => r.text())
		.catch(_ => "failed")

	if (resp.trim() !== SUCCESS_STRING) {
		await fetch("http://172.16.0.30:8090/login.xml", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				mode: "191",
				username,
				password,
			}),
		})
			.then(response => {
				if (response.status === 200)
					console.info("Logged in successfully")
				else
					response
						.text()
						.then(text =>
							console.error(`Error during login: ${text}`)
						)
			})
			.catch(err => console.error(err))
	}

	await sleep(5000)
}
