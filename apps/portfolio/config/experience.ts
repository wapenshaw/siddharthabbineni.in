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
	/** Five lines from the resume, shortened to fit one row each */
	report: string[]
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
		report: [
			'Lead developer on the internal ERP portal, improving 5 workflows used daily by 200+ staff.',
			'Automated General Ledger reconciliation with finance, cutting manual data entry by 75%.',
			'Wrote 15+ SSIS packages that moved millions of records into the data warehouse every night.',
			'Built 20+ SSRS reports run by SQL Agent, saving about 10 hours of reporting a week.',
			'Ran the Sponsor Portal for 50,000+ users; adding social login lifted sign-ups by 15%.',
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
		report: [
			'Led 8 developers building 3 ERP and CRM systems for 2,000+ staff and students.',
			'Automated the school’s SMS and email campaigns, cutting that manual work by about 60%.',
			'Built the parent portals, which raised parent engagement by 25%.',
			'Built and ran 4 school websites at 99.5% uptime.',
			'Advised on hardware and network design for 500+ devices across the campus.',
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
		report: [
			'Led 5 engineers building Studease, an education ERP/CRM used by 15,000+ students and staff.',
			'Built 4 core modules of the Digital Curriculum platform: 500+ concurrent users, 200+ courses.',
			'Wrote 2 REST APIs for our mobile apps, handling 10,000+ requests a day.',
			'Looked after source control, builds and deployments for 3 application streams.',
			'Rolled Studease out across 5 educational institutions.',
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
		report: [
			'Led the Azure and AWS migration roadmap as Santander Consumer Bank’s solutions architect.',
			'Built Santander’s collections engine, which raised debt recovery by 30%.',
			'Designed 8+ core banking microservices and prototyped AI credit-risk models.',
			'Built a Positive Credit Register API and a document centre to tight regulatory deadlines.',
			'Added Stripe payments to Vatify and grew it from 100 to 1,000+ active users.',
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
			'I lead Astra, the cloud automation platform behind our infrastructure.',
		report: [
			'Use Astra to standardise provisioning and multi-cloud workflows across the enterprise.',
			'Run our Kubernetes clusters from development to production: deployments, releases and uptime.',
			'Build the cloud-native microservices and enterprise apps that run on both clouds.',
			'Automate configuration and CI/CD, so infrastructure takes far less hands-on work.',
			'Work with cloud architects and infrastructure teams on secure, resilient automation.',
		],
		stack: ['AKS', 'Ansible', 'Terraform', '.NET', 'Python', 'Azure', 'AWS'],
	},
]
