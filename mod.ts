import { slugify } from "https://deno.land/x/slugify/mod.ts";

const { writeTextFile } = Deno

const res = await fetch('http://localhost/intransition/api/v1/spokes')

const body = await res.text()

const request = JSON.parse(body)

request.response.docs.forEach(async (document) => {
  const res = await fetch(document.path)
  if (res.status == 200) {
    const body = await res.json()
    const label = slugify(document.title, { separator: '-', lower: true, remove: /[/*+~.()'"!:@]/g })
    await writeTextFile(`./entities/${label}.json`, JSON.stringify(body, null, 2))
  }
})
