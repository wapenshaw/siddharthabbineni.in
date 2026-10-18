export type PullRequestState = 'open' | 'merged'

export interface PullRequest {
	/** owner/name */
	repo: string
	number: number
	title: string
	url: string
	state: PullRequestState
	/** ISO date it was merged, or opened if still open */
	date: string
}
