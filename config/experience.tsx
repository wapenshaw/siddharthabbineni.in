import React from 'react'
import { Link } from '@chakra-ui/react'

export type Company = 'Pinion' | 'Melite' | 'DPS' | 'QSP'

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
	Pinion: {
		name: 'Pinion',
		longName: 'Pinion Services, UK',
		subDetail: 'UK, US, India',
		url: 'https://pinion.services',
		position: 'Senior Technical Analyist',
		duration: 'Dec 2020 - Present',
		logo: {
			light: '/work_images/pinion/Pinion_logo.svg',
			dark: '/work_images/pinion/Pinion_logo.svg',
		},
		roles: [
			<>
				Headed development of two major projects on the latest tech stacks
				available, React and Blazor with .Net Core API Backends.
			</>,
			<>
				A Document management center completely written from the ground up using
				.NET Core 6 and Blazor, deployed on Azure Static apps and Azure APIs.
			</>,
			<>
				A Timesheets portal where employees can enter daily timesheets with
				approvals and other flows in ReactJS and .NET core API, deployed on an
				Azure App service.
			</>,
			<>
				Upgraded existing public-facing in production .Net Core MVC Web
				Application&nbsp;
				<Link
					aria-label="Vatify - UK Tax Bridge"
					href="https://vatify.pinion.services"
					target="_blank"
					rel="noreferrer"
				>
					Vatify
				</Link>
				&nbsp;to add new client specified features.
			</>,
			<>
				Currently engineering a cloud-based solution to automate Quotations,
				Billing, Data import and export for Smartawater UK
			</>,
			<>
				Manage Pinion’s Azure applications and DevOps, authored pipelines in
				Azure DevOps to automate deployments and tests of current and new
				projects at Pinion.
			</>,
		],
	},
	Melite: {
		name: 'Melite',
		longName: 'Melite Technologies',
		subDetail: 'Solutions beyond imagination',
		url: 'http://www.melitetechnologies.com/',
		position: 'Senior Software Engineer',
		duration: 'Nov 2016 - Nov 2020',
		logo: {
			light: '/work_images/melite/melite_logo.png',
			dark: '/work_images/melite/melite_logo.png',
		},
		roles: [
			<>
				Lead a development team in developing a Educational ERP/CRM solution,
				named
				<Link
					aria-label="Studease"
					href="https://www.melitetechnologies.com/studease.html"
					target="_blank"
					rel="noreferrer"
				>
					&nbsp;Studease&nbsp;
				</Link>
				Handled Webservices and Payment gateway integration within the system.
				ERP system is based on ASP.NET 4.0 and MSSQL. XML documents, Web
				services, ADO.Net Objects and Entity Framework 4.0
			</>,
			<>
				Develop independent modules for an existing Project Digital Curriculum.
				Modules included online classroom/virtual classrooms, courses and
				management, live chat. Worked with Web API to provide services to HTTP
				requests.
			</>,
			<>
				Administered integration and deployment systems. (TFS, 3rd Party
				Hosting).
			</>,
			<>
				Created 2 Web APIs to provide access to in house mobile applications.
			</>,
			<>
				Train, assist, transfer knowledge to new/regular team members, help set
				up their access to environments, provide them code reviews/feedback and
				other developmental resources, and understand the business logic.
			</>,
		],
	},
	DPS: {
		name: 'DPS Nacharam',
		longName: 'Delhi Public School, Nacharam',
		subDetail: 'Maredpally, Secunderabad',
		url: 'https://dpssecunderabad.in',
		position: 'IT Consultant',
		duration: 'Mar 2012 - Sept 2016',
		logo: {
			light: '/work_images/dps/dps_logo.png',
			dark: '/work_images/dps/dps_logo.png',
		},
		roles: [
			<>
				Lead an in-house team of 8 developers to create various ERP / CRM
				solutions in ASP.NET / MSSQL for the organization.
			</>,
			<>
				CRM application included automatic SMS and email campaigns, social
				media, customer service portals, employee management and various other
				modules.
			</>,
			<>
				Websites design and maintenance, created and maintained 4 different
				websites with latest technologies
			</>,
			<>
				Consulted on Hardware integration possibilities, networking and various
				other technology related avenues.
			</>,
		],
	},
	QSP: {
		name: 'QSP',
		longName: 'QSP, Time Inc.',
		subDetail: "America's #1 Magazine fundraiser",
		url: 'https://www.linkedin.com/company/qsp_2/',
		position: 'Lead Developer',
		duration: 'Nov 2010 - Feb 2012',
		logo: {
			light: '/work_images/qsp/qsp_logo.png',
			dark: '/work_images/qsp/qsp_logo.png',
		},
		roles: [
			<>
				Lead developer for the Enterprise Resource management system (ERP)
				portal. Portal involved controlling various aspect of business workflow.
			</>,
			<>
				Collaborating with Financial personnel to automate the General Ledger
				system, with functionally to manually manage and edit entries when
				needed.
			</>,
			<>
				Developed SSIS packages to allow of easy data migration. SSIS packages
				for local data manipulation and packages to allow to store in the Data
				Warehouse.
			</>,
			<>
				Developed SSRS Reports and Report templates for automatic report
				generation based on SQL Jobs
			</>,
			<>
				Responsible for “Sponsor Portal” to allow for users to manage their
				accounts and also integrated the portal with various social networks
				like Facebook and Twitter
			</>,
		],
	},
}

export const ExperiencesList = [
	Experiences.Pinion,
	Experiences.Melite,
	Experiences.DPS,
	Experiences.QSP,
]
