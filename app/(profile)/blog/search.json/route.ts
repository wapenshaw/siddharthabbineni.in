import { getSearchIndex } from 'lib/posts'

/** The text of every post, built with the site; the list fetches it the first time someone searches */
export async function GET() {
	return Response.json(await getSearchIndex())
}
