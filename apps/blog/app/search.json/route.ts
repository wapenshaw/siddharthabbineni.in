import { getSearchIndex } from 'lib/posts'

export const dynamic = 'force-static'

/** Every post's text for the search page, which searches in the browser */
export async function GET() {
	return Response.json(await getSearchIndex())
}
