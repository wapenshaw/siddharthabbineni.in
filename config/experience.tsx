import React from 'react'
import { Link } from '@chakra-ui/react'

export type Company = 'Assurant' | 'Pinion' | 'Melite' | 'DPS' | 'QSP'

export type CompanyDetail = {
	name: string
	longName: string
	subDetail?: string
	url: string
	position: string
	duration: string
	logo: {
		light: string
		dark?: string
	}
	roles?: React.ReactNode[]
}

export const Experiences: {
	[key in Company]: CompanyDetail
} = {
	Assurant: {
		name: 'Assurant',
		longName: 'Assurant',
		subDetail: 'Hyderabad, India',
		url: 'https://www.assurant.com',
		position: 'Sr Technology Automation Engineer',
		duration: 'Aug 2025 – Present',
		logo: {
			light: '/work_images/assurant/assurant-logo.png',
			dark: '/work_images/assurant/assurant-logo.png',
		},
		roles: [
			<>
				Spearheading &apos;Astra&apos;, a flagship cloud automation platform
				designed to standardize infrastructure provisioning, streamline
				multi-cloud workflows, and enforce automation best practices across the
				enterprise.
			</>,
			<>
				Managing the end-to-end lifecycle of Kubernetes (AKS) clusters from
				development to production, orchestrating seamless application
				deployments, release management, and high availability.
			</>,
			<>
				Developing and deploying cloud-native microservices and enterprise
				applications utilizing .NET and Python across Azure and AWS
				environments.
			</>,
			<>
				Automating configuration management and CI/CD pipelines using Ansible
				and modern DevOps practices, significantly reducing manual
				infrastructure overhead and deployment times.
			</>,
		],
	},
	Pinion: {
		name: 'Pinion',
		longName: 'Pinion Services, UK',
		subDetail: 'UK, India',
		url: 'https://pinion.services',
		position: 'Senior Technical Specialist',
		duration: 'Dec 2020 – Aug 2025',
		logo: {
			light: '/work_images/pinion/Pinion_logo.svg',
			dark: '/work_images/pinion/Pinion_logo.svg',
		},
		roles: [
			<>
				Led the technical roadmap for Azure & AWS migrations and spearheaded a
				.NET Core/AKS Distributions & Collections Engine for Santander Consumer
				Bank, increasing debt recovery by 30%.
			</>,
			<>
				Architected 8+ mission-critical core banking microservices and
				prototyped AI-driven credit risk analysis models using Azure Cognitive
				Services & OpenAI.
			</>,
			<>
				Implemented Azure Infrastructure as Code (IaC) using Terraform and
				authored comprehensive C4 system designs.
			</>,
			<>
				Architected a Positive Credit Register API and a full-stack Document
				Management Center using React.js and Azure Cognitive Services within
				strict regulatory deadlines.
			</>,
			<>
				Spearheaded feature upgrades for&nbsp;
				<Link
					aria-label="Vatify - UK Tax Bridge"
					href="https://vatify.pinion.services"
					target="_blank"
					rel="noreferrer"
				>
					Vatify
				</Link>
				, integrating Stripe payments and scaling active users from 100+ to
				1,000+.
			</>,
			<>
				Managed Azure cloud resources and CI/CD pipelines via Azure DevOps for
				efficient, automated deployments.
			</>,
		],
	},
	Melite: {
		name: 'Melite',
		longName: 'Melite Technologies',
		subDetail: 'Hyderabad, India',
		url: 'http://www.melitetechnologies.com/',
		position: 'Senior Software Engineer',
		duration: 'Nov 2016 \u2013 Nov 2020',
		logo: {
			light: '/work_images/melite/melite_logo.png',
			dark: '/work_images/melite/melite_logo.png',
		},
		roles: [
			<>
				Led a team of 5 engineers building the Studease Educational ERP/CRM
				solution (ASP.NET, SQL Server), deployed across 5 institutions managing
				15,000+ student and staff records.
			</>,
			<>
				Developed 4 core modules for the Digital Curriculum platform \u2014 virtual
				classrooms, course management \u2014 supporting 500+ concurrent users and
				200+ digital courses.
			</>,
			<>
				Created 2 secure RESTful Web APIs enabling data access for internal
				mobile applications, handling 10,000+ daily requests.
			</>,
			<>
				Administered Team Foundation Server (TFS) for source control and managed
				build/deployment processes for 3 major application streams.
			</>,
		],
	},
	DPS: {
		name: 'DPS Nacharam',
		longName: 'Delhi Public School, Nacharam',
		subDetail: 'Secunderabad, India',
		url: 'https://dpssecunderabad.in',
		position: 'IT Consultant',
		duration: 'Jul 2012 \u2013 Sep 2016',
		logo: {
			light: '/work_images/dps/dps_logo.png',
			dark: '/work_images/dps/dps_logo.png',
		},
		roles: [
			<>
				Led an in-house team of 8 developers, delivering 3 major ERP/CRM
				solutions (ASP.NET, SQL Server) for 2,000+ users across administrative,
				academic, and finance departments.
			</>,
			<>
				Developed automated communication campaigns reducing manual SMS/email
				efforts by ~60%, with integrated portals improving parent engagement by
				25%.
			</>,
			<>
				Designed and maintained 4 school websites achieving 99.5% uptime,
				handling content updates for events and announcements.
			</>,
			<>
				Provided technical consultation for hardware procurement and network
				infrastructure supporting 500+ networked devices campus-wide.
			</>,
		],
	},
	QSP: {
		name: 'QSP',
		longName: 'QSP, Time Inc.',
		subDetail: 'Stamford, CT, USA',
		url: 'https://www.linkedin.com/company/qsp_2/',
		position: 'Application Developer',
		duration: 'Dec 2010 \u2013 Feb 2012',
		logo: {
			light: '/work_images/qsp/qsp_logo.png',
			dark: '/work_images/qsp/qsp_logo.png',
		},
		roles: [
			<>
				Lead developer for the internal ERP portal (ASP.NET, C#, SQL Server),
				enhancing 5 core business workflows used daily by 200+ employees.
			</>,
			<>
				Automated General Ledger reconciliation with the finance department,
				reducing manual data entry time by over 75%.
			</>,
			<>
				Developed 15+ SSIS packages for data migration and transformation,
				processing millions of records nightly with 99% reliability.
			</>,
			<>
				Created 20+ parameterized SSRS reports automated via SQL Agent Jobs,
				saving ~10 hours/week in manual reporting.
			</>,
			<>
				Built the customer-facing Sponsor Portal managing 50,000+ user accounts
				with social login integration, driving 15% increase in registrations.
			</>,
		],
	},
}

export const ExperiencesList = [
	Experiences.Assurant,
	Experiences.Pinion,
	Experiences.Melite,
	Experiences.DPS,
	Experiences.QSP,
]
