import { getSteamAchievements } from 'lib/steam'
import { NextResponse } from 'next/server'

export async function GET() {
	const data = await getSteamAchievements()
	return NextResponse.json(data, { status: data.error ? 503 : 200 })
}
