import { Article } from 'types/article'
import { StackData } from 'types/stackoverflow'
import Portfolio from 'components/Portfolio'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'
const SO_USER_ID = process.env.SO_USER_ID ?? '66384'

async function getArticles(): Promise<Article[]> {
	const res = await fetch(
		`https://dev.to/api/articles?username=${DEVTO_USERNAME}`,
		{ next: { revalidate: 3600 } }
	)
	return res.json()
}

async function getStackOverflowData(): Promise<StackData> {
	const res = await fetch(
		`https://api.stackexchange.com/2.3/users/${SO_USER_ID}?site=stackoverflow`,
		{
			headers: { Accept: 'application/json' },
			next: { revalidate: 3600 },
		}
	)
	return res.json()
}

export default async function Page() {
	const [articles, soData] = await Promise.all([
		getArticles(),
		getStackOverflowData(),
	])

	return <Portfolio articles={articles} soData={soData} />
}
