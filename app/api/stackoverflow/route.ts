import { NextResponse } from 'next/server'
import type { StackData } from 'types/stackoverflow'

const SO_USER_ID = process.env.SO_USER_ID ?? '66384'

/** Cache this route's response for 6 hours */
export const revalidate = 21600

export async function GET() {
	const res = await fetch(
		`https://api.stackexchange.com/2.3/users/${SO_USER_ID}?site=stackoverflow`,
		{
			headers: { Accept: 'application/json' },
			next: { revalidate: 21_600 },
		}
	)

	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Failed to fetch Stack Overflow data' },
			{ status: res.status }
		)
	}

	const data: StackData = await res.json()
	return NextResponse.json(data)
}
