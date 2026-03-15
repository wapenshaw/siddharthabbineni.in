export interface Article {
	id: string
	type_of: string
	title: string
	description: string
	readable_publish_date: string
	published_at: string
	slug: string
	url: string
	tag_list: string[]
	cover_image: string | null
	social_image: string
	reading_time_minutes: number
	comments_count: number
	public_reactions_count: number
}
