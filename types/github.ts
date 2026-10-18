export type PullRequestState = 'open' | 'merged'

export interface PullRequest {
	/** owner/name */
	repo: string
	number: number
	title: string
	url: string
	state: PullRequestState
}
