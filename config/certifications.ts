export interface Certification {
	name: string
	fullName: string
	level: 'Expert' | 'Associate'
	verifyUrl: string
}

export const certifications: Certification[] = [
	{
		name: 'Solutions Architect',
		fullName: 'Azure Solutions Architect Expert',
		level: 'Expert',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/630EC7F36687255E?sharingId=1731259073C0B668',
	},
	{
		name: 'DevOps Engineer',
		fullName: 'Azure DevOps Engineer Expert',
		level: 'Expert',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/5E49330F73A465E8?sharingId=1731259073C0B668',
	},
	{
		name: 'Administrator',
		fullName: 'Azure Administrator Associate',
		level: 'Associate',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/24EEE21A39365BBD?sharingId=1731259073C0B668',
	},
	{
		name: 'Developer',
		fullName: 'Azure Developer Associate',
		level: 'Associate',
		verifyUrl:
			'https://learn.microsoft.com/api/credentials/share/en-us/wapenshaw/E65DD45EE23C0CF5?sharingId=1731259073C0B668',
	},
]
