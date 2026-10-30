export type CertLevel = 'Expert' | 'Specialty' | 'Associate' | 'Fundamentals'

export interface Certification {
	name: string
	fullName: string
	level: CertLevel
	verifyUrl: string
	badge: string
	earned: string
	expires?: string
	expired?: boolean
	featured?: boolean
}

export const certifications: Certification[] = [
	// Featured certs — shown on first load (4 cards: Expert + Associate)
	{
		name: 'Solutions Architect',
		fullName: 'Azure Solutions Architect Expert',
		level: 'Expert',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/630EC7F36687255E?sharingId=1731259073C0B668',
		badge: '/certifications/expert-badge.svg',
		earned: 'March 2023',
		expires: 'March 2027',
		featured: true,
	},
	{
		name: 'DevOps Engineer',
		fullName: 'Azure DevOps Engineer Expert',
		level: 'Expert',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/5E49330F73A465E8?sharingId=1731259073C0B668',
		badge: '/certifications/expert-badge.svg',
		earned: 'April 2023',
		expires: 'April 2027',
		featured: true,
	},
	{
		name: 'Administrator',
		fullName: 'Azure Administrator Associate',
		level: 'Associate',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/24EEE21A39365BBD?sharingId=1731259073C0B668',
		badge: '/certifications/associate-badge.svg',
		earned: 'March 2023',
		expires: 'March 2027',
		featured: true,
	},
	{
		name: 'Developer',
		fullName: 'Azure Developer Associate',
		level: 'Associate',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/E65DD45EE23C0CF5?sharingId=1731259073C0B668',
		badge: '/certifications/associate-badge.svg',
		earned: 'April 2023',
		expires: 'April 2027',
		featured: true,
	},
	// Fundamentals certs (active)
	{
		name: 'AI Fundamentals',
		fullName: 'Azure AI Fundamentals',
		level: 'Fundamentals',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/40CDAAA8D85A2292?sharingId=1731259073C0B668',
		badge: '/certifications/fundamentals-badge.svg',
		earned: 'February 2023',
	},
	{
		name: 'Security & Identity',
		fullName: 'Security, Compliance, and Identity Fundamentals',
		level: 'Fundamentals',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/60846A50D85498D8?sharingId=1731259073C0B668',
		badge: '/certifications/fundamentals-badge.svg',
		earned: 'February 2023',
	},
	{
		name: 'Data Fundamentals',
		fullName: 'Azure Data Fundamentals',
		level: 'Fundamentals',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/239125430F50ADE?sharingId=1731259073C0B668',
		badge: '/certifications/fundamentals-badge.svg',
		earned: 'January 2023',
	},
	{
		name: 'Azure Fundamentals',
		fullName: 'Azure Fundamentals',
		level: 'Fundamentals',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/2A5E20286A4D6F19?sharingId=1731259073C0B668',
		badge: '/certifications/fundamentals-badge.svg',
		earned: 'December 2022',
	},
	// Expired cert — always last
	{
		name: 'Cosmos DB Developer',
		fullName: 'Azure Cosmos DB Developer Specialty',
		level: 'Specialty',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/F831A97B38148BF8?sharingId=1731259073C0B668',
		badge: '/certifications/certified-specialty-badge.svg',
		earned: 'September 2023',
		expired: true,
	},
]
