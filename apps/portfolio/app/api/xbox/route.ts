import { getXboxAchievements } from 'lib/xbox'
import { NextResponse } from 'next/server'

export async function GET() {
	const data = await getXboxAchievements()
	return NextResponse.json(data, { status: data.error ? 503 : 200 })
}
