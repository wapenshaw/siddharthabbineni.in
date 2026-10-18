export type Job = {
	company: string
	/** Short name shown on the timeline and as #tag */
	short: string
	url: string
	location: string
	role: string
	/** YYYY-MM */
	start: string
	/** YYYY-MM, omitted for the current job */
	end?: string
	logo: {
		light: string
		dark?: string
	}
	bullets: string[]
	stack: string[]
}

/** Oldest first: the timeline reads left to right */
export const jobs: Job[] = [
	{
		company: 'QSP, Time Inc.',
		short: 'QSP',
		url: 'https://www.linkedin.com/company/qsp_2/',
		location: 'Stamford, CT, USA',
		role: 'Application Developer',
		start: '2010-12',
		end: '2012-02',
		logo: { light: '/work_images/qsp/qsp_logo.png' },
		bullets: [
			'Lead developer on the internal ERP portal, used daily by 200+ employees.',
			'Automated General Ledger reconciliation with finance, cutting manual data entry by 75%.',
			'Wrote 15+ SSIS packages moving millions of records into the warehouse every night.',
			'Automated 20+ SSRS reports through SQL Agent, saving about 10 hours a week.',
		],
		stack: ['C#', 'ASP.NET', 'SSIS', 'SSRS', 'SQL Server'],
	},
	{
		company: 'Delhi Public School, Nacharam',
		short: 'DPS Nacharam',
		url: 'https://dpssecunderabad.in',
		location: 'Secunderabad, India',
		role: 'IT Consultant',
		start: '2012-07',
		end: '2016-09',
		logo: { light: '/work_images/dps/dps_logo.png' },
		bullets: [
			'Led eight developers delivering 3 custom ERP/CRM systems for 2,000+ staff and students.',
			'Automated communication campaigns, cutting manual SMS and email work by about 60%.',
			'Built and ran 4 school websites at 99.5% uptime.',
			'Advised on hardware and network design for 500+ campus devices.',
		],
		stack: ['ASP.NET', 'SQL Server', 'HTML / CSS / JS'],
	},
	{
		company: 'Melite Technologies',
		short: 'Melite',
		url: 'http://www.melitetechnologies.com/',
		location: 'Hyderabad, India',
		role: 'Senior Software Engineer',
		start: '2016-11',
		end: '2020-11',
		logo: { light: '/work_images/melite/melite_logo.png' },
		bullets: [
			'Led five engineers building Studease, an education ERP/CRM running at 5 institutions with 15,000+ students and staff.',
			'Built 4 core modules of the Digital Curriculum platform, serving 500+ concurrent users and 200+ courses.',
			'Shipped 2 secure REST APIs for internal mobile apps, averaging 10,000+ requests a day.',
			'Ran TFS source control and build/deploy for 3 application streams.',
		],
		stack: ['ASP.NET', 'EF 6', 'LINQ', 'SQL Server', 'TFS'],
	},
	{
		company: 'Pinion Services',
		short: 'Pinion',
		url: 'https://pinion.services',
		location: 'Hyderabad, India',
		role: 'Senior Technical Specialist',
		start: '2020-12',
		end: '2025-08',
		logo: { light: '/work_images/pinion/Pinion_logo.svg' },
		bullets: [
			'Solutions Architect Lead for Santander Consumer Bank: set the roadmap for the Azure and AWS migrations.',
			'Built a .NET Core/AKS distributions and collections engine that raised debt recovery by 30%.',
			'Architected 8+ core banking microservices and prototyped AI credit-risk models with Azure OpenAI.',
			'Architected a Positive Credit Register API and grew Vatify from 100+ to 1,000+ active users.',
		],
		stack: ['.NET Core', 'AKS', 'Terraform', 'Azure OpenAI', 'React', 'C4'],
	},
	{
		company: 'Assurant',
		short: 'Assurant',
		url: 'https://www.assurant.com',
		location: 'Hyderabad, India',
		role: 'Sr Technology Automation Engineer',
		start: '2025-08',
		logo: { light: '/work_images/assurant/assurant-logo.png' },
		bullets: [
			'Leading Astra, a flagship cloud automation platform that standardises infrastructure provisioning and multi-cloud workflows across the enterprise.',
			'Own the full lifecycle of AKS clusters from dev to production: deployments, release management and high availability.',
			'Build cloud-native microservices and enterprise apps in .NET and Python across Azure and AWS.',
			'Automate configuration management and CI/CD with Ansible, cutting manual infrastructure work and deployment times.',
		],
		stack: ['AKS', 'Ansible', 'Terraform', '.NET', 'Python', 'Azure', 'AWS'],
	},
]
