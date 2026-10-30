export type Job = {
	company: string
	/** The name on its stop along the Seasons route */
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
	/** One or two first-person sentences: the stint's headline */
	summary: string
	/** Up to three numbers from the stint, each with what it counts */
	stats?: { value: string; label: string }[]
	/** What the summary and stats don’t already say */
	bullets: string[]
	stack: string[]
}

/** Oldest first: the route climbs from the first job to the current one */
export const jobs: Job[] = [
	{
		company: 'QSP, Time Inc.',
		short: 'QSP, Time Inc.',
		url: 'https://www.linkedin.com/company/qsp_2/',
		location: 'Stamford, CT, USA',
		role: 'Application Developer',
		start: '2010-12',
		end: '2012-02',
		logo: { light: '/work_images/qsp/qsp_logo.png' },
		summary:
			'I was the lead developer on the internal ERP portal, and I automated the finance team’s reconciliation and reporting.',
		stats: [
			{ value: '200+', label: 'employees used the ERP portal every day' },
			{
				value: '75%',
				label: 'less manual data entry in General Ledger reconciliation',
			},
			{ value: '10 hrs', label: 'a week saved by automated SSRS reports' },
		],
		bullets: [
			'Wrote 15+ SSIS packages moving millions of records into the warehouse every night.',
			'Automated 20+ SSRS reports through SQL Agent.',
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
		summary:
			'I led eight developers building the school’s ERP and CRM systems, and looked after its websites and campus network.',
		stats: [
			{
				value: '2,000+',
				label: 'staff and students on 3 custom ERP/CRM systems',
			},
			{
				value: '60%',
				label: 'less manual SMS and email work after automating campaigns',
			},
			{ value: '99.5%', label: 'uptime across 4 school websites' },
		],
		bullets: [
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
		summary:
			'I led five engineers building Studease, an education ERP/CRM, and built core modules of the Digital Curriculum platform.',
		stats: [
			{
				value: '15,000+',
				label: 'students and staff on Studease at 5 institutions',
			},
			{
				value: '500+',
				label: 'concurrent users on the Digital Curriculum platform',
			},
			{
				value: '10,000+',
				label: 'requests a day to 2 REST APIs for internal mobile apps',
			},
		],
		bullets: [
			'Built 4 core modules of the Digital Curriculum platform, serving 200+ courses.',
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
		summary:
			'I led the architecture for Santander Consumer Bank’s move to Azure and AWS, and built the collections engine that raised debt recovery by 30%.',
		stats: [
			{ value: '+30%', label: 'debt recovery from the collections engine' },
			{ value: '8+', label: 'core banking microservices architected' },
			{ value: '1,000+', label: 'active Vatify users, up from 100+' },
		],
		bullets: [
			'Solutions architect lead for Santander Consumer Bank: set the roadmap for the Azure and AWS migrations.',
			'Prototyped AI credit-risk models with Azure OpenAI, and architected the Positive Credit Register API.',
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
		summary:
			'I lead Astra, a cloud automation platform that standardises infrastructure provisioning and multi-cloud workflows across the enterprise.',
		bullets: [
			'Own the full lifecycle of AKS clusters from dev to production: deployments, release management and high availability.',
			'Build cloud-native microservices and enterprise apps in .NET and Python across Azure and AWS.',
			'Automate configuration management and CI/CD with Ansible, cutting manual infrastructure work and deployment times.',
		],
		stack: ['AKS', 'Ansible', 'Terraform', '.NET', 'Python', 'Azure', 'AWS'],
	},
]
