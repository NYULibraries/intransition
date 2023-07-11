import { slugify } from "https://deno.land/x/slugify/mod.ts";

const { writeTextFile } = Deno

const res = await fetch('http://localhost/intransition/api/v1/spokes')

const body = await res.text()

const request = JSON.parse(body)

// Bad

// http://localhost/intransition/api/v1/node/192
// http://localhost/intransition/api/v1/node/176
// http://localhost/intransition/api/v1/node/82
// http://localhost/intransition/api/v1/node/186
// http://localhost/intransition/api/v1/node/180
// http://localhost/intransition/api/v1/node/188
// http://localhost/intransition/api/v1/node/56
// http://localhost/intransition/api/v1/node/72
// http://localhost/intransition/api/v1/node/182
// http://localhost/intransition/api/v1/node/978

request.response.docs.forEach(async (document) => {
  const res = await fetch(document.path)
  if (res.status == 200) {
    const body = await res.json()
    const label = slugify(document.title, { separator: '-', lower: true, remove: /[/*+~.()'"!:@]/g })
    await writeTextFile(`./entities/${label}.json`, JSON.stringify(body, null, 2))
  }
})
