import { type MetaFunction } from '@remix-run/node'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'

import slideImage1 from '~/assets/jpg/disney-warner.jpeg'

import newsImage4 from '~/assets/jpg/ftx.jpg'
import newsImage2 from '~/assets/jpg/google-image.jpg'

import homeImage from '~/assets/jpg/home-image.jpg'
import iphoneimage from '~/assets/jpg/iphone-usbc.jpg'
import newsImage3 from '~/assets/jpg/nintendo-switch.jpg'
import newsImage1 from '~/assets/jpg/oneplus12.jpg'
import employee1 from '~/assets/jpg/portrait-01.jpg'
import employee2 from '~/assets/jpg/portrait-02.jpg'
import employee3 from '~/assets/jpg/portrait-03.jpg'
import slideImage3 from '~/assets/jpg/sam-ftx.jpg'
import slideImage4 from '~/assets/jpg/self-drive.jpg'
import slideImage5 from '~/assets/jpg/tesla.jpg'
import slideImage2 from '~/assets/jpg/toxic-content.jpg'

import HeroCallToAction from '~/components/organisms/Hero/HeroCallToAction.tsx'

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
);

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

const data = {
	labels: ['iPhone', 'Android'],
	datasets: [
		{
			label: '% of Users Worldwide',
			data: [30, 70.69],
			backgroundColor: [
				'rgba(0, 200, 255, 0.5)', // iPhone color
				'rgba(120, 194, 87, 0.5)'  // Android color
			],
			borderColor: [
				'rgba(0, 123, 255, 1)', // iPhone border color
				'rgba(120, 194, 87, 1)'  // Android border color
			],
			borderWidth: 2,
		},
	],
}

const pcData = {
	labels: ['Windows', 'MacBooks', 'Linux', 'Chromebooks'],
	datasets: [
		{
			label: '% of Users Worldwide',
			data: [73.99, 14.91, 3.77, 2.55],
			backgroundColor: [
				'rgba(0, 114, 198, 1)', // Windows color
				'rgba(90, 34, 139, 1)', // MacBooks color
				'rgba(255, 36, 0, 1)', // Linux color
				'rgba(255, 255, 127, 1)' // Chromebooks color
			],
			borderColor: [
				'rgba(0, 114, 198, 1)', // Windows border color
				'rgba(159, 90, 253, 1)', // MacBooks border color
				'rgba(255, 76, 48, 0.5)', // Linux border color
				'rgba(255, 240, 0, 0.25)' // Chromebooks border color
			],
			borderWidth: 2,
		},
	],
}


function PhoneChart() {
	return (
		<div style={{ width: '300px', height: '300px' }}>
			<Pie data={data} />
		</div>
	)
}

function PCChart() {
	return (
		<div style={{ width: '300px', height: '300px' }}>
			<Pie data={pcData} />
		</div>
	)
}
const slidesData = [
	{
		image: slideImage1,
		title: 'Disney and Warner to bundle streaming services',
		description:
			'Walt Disney and Warner Bros Discovery say they will start to offer a bundle of the Disney+, Hulu and Max streaming services to customers in the US this summer. The new package will be available to customers on all three streaming platforms. The media giants said they will offer plans with and without adverts but did not reveal how much they will charge customers. The move comes as Disney and Warner Bros face competition from rivals, including Netflix and Amazon Prime Video. “This new offering... will help drive incremental subscribers and much stronger retention,” Warner Bros Discovery executive JB Perrette said in a statement.',
	},
	{
		image: slideImage2,
		title: 'Tech firms told to hide "toxic" content from children',
		description:
			'Ofcom has warned social media sites they could be named and shamed - and banned for under-18s - if they fail to comply with new online safety rules. The media regulator has published draft codes of practice which require tech firms to have more robust age-checking measures, and to reformulate their algorithms to steer children away from what it called "toxic" material. But parents of children who died after exposure to harmful online content have described the proposed new rules as "insufficient" - one told the BBC change was happening "at a snails pace." In statements, Meta and Snapchat said they had extra protections for under-18s, and offered parental tools to control what children can see on their platforms.',
	},
	{
		image: slideImage3,
		title: 'FTX says it has billions more than owed to victims',
		description:
			'Collapsed cryptocurrency exchange FTX says it has billions of dollars more than it needs to repay customers. The firm says that once it has sold off its remaining assets it will have as much as $16.3bn (£13bn) to cover the debts, which stand at around $11bn.',
	},
	{
		image: slideImage4,
		title: 'UK startup gets $1bn funding for self-driving car tech',
		description:
			'A UK firm developing artificial intelligence (AI) tech to power self-driving cars has raised $1.05bn (£840m) in funding. Microsoft and leading chip-maker, Nvidia, are among the companies investing in Wayves latest funding round, led by investment firm SoftBank.It is the largest known investment in an AI company in Europe to date.',
	},
	{
		image: slideImage5,
		title: 'Have the wheels come off for Tesla?',
		description:
			'There was a time when it seemed Tesla could do no wrong. In little more than a decade, it went from technology upstart to mass-market carmaker, invested billions in its clean energy business, and saw its value rocket. But now the company is struggling with falling car sales and intense competition from Chinese brands, as well as problems with its much-hyped Cybertruck.',
	},
]

function ImageSlider() {
	return (
		<Fade duration={5000} transitionDuration={1000}>
			{slidesData.map((fade, index) => (
				<div className="each-slide" key={index}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={fade.image}
							alt={`Fade ${index + 1}`}
							style={{ width: 'auto', height: '250px', objectFit: 'cover' }}
						/>
						<div style={{ width: '75%' }}>
							<h2 className="px-8 text-center text-xl font-bold ">
								{fade.title}
							</h2>
							<p className="text-md px-4 py-8 text-center	font-normal">
								{fade.description}
							</p>
						</div>
					</div>
				</div>
			))}
		</Fade>
	)
}

// employee card component
interface EmployeeCardProps {
	image: string
	name: string
	role: string
}
export function EmployeeCard(props: EmployeeCardProps) {
	return (
		<div className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-black dark:bg-slate-900 dark:text-white">
			<img
				src={props.image}
				alt={props.name}
				className="h-36 w-36 rounded-full transition-opacity duration-200 hover:opacity-75"
			/>
			<p className="text-xl font-bold">{props.name}</p>
			<p className="font-thin ">{props.role}</p>
			<div className="flex items-center gap-4 py-6">
				<FaTwitter />
				<FaLinkedin />
			</div>
		</div>
	)
}

export default function Index() {
	return (
		<main className="h-full">
			<div className="container py-12">
				<h1 className="text-center text-mega">
					<span className="bg-gradient-to-b from-white to-sky-600 bg-clip-text text-transparent">
						TechNerd
					</span>{' '}
					news
				</h1>
				<div className="w-full py-24">
					<HeroCallToAction image={homeImage} imageRight={true}>
						<div className="flex flex-col px-6">
							<div className="text-center">
								<h2 className="text-h2">Welcome to</h2>
								<h2 className="mb-6 text-h2">
									<span className="text-sky-500">TechNerd news</span>
								</h2>
							</div>
							<p className="mb-6 text-center text-xl font-bold">
								Tech news for tech nerds.
							</p>
							<p className="font-medium">
								Welcome to the digital heartbeat of innovation, where the pulse
								of technology is captured in real-time. We bring you the latest
								news in the tech world, from groundbreaking discoveries to the
								most peculiar gadgets. Our mission is to inform, inspire, and
								sometimes even amuse you with a comprehensive blend of articles
								that cover the good, the bad, and the downright weird. Stay
								ahead of the curve with our in-depth analysis, expert opinions,
								and exclusive stories that navigate the complex tapestry of
								technology’s impact on society. Whether you’re a tech
								enthusiast, a seasoned professional, or just curious about the
								future, you’ve found your premier source for all things tech.
							</p>
						</div>
					</HeroCallToAction>
				</div>

				<div className="container flex flex-col justify-start bg-sky-500 p-12 dark:bg-sky-950 sm:flex-row">
					<div className="mr-6 w-full rounded-3xl bg-white p-12 dark:bg-slate-900">
						<h2 className="pb-8 text-center text-4xl font-bold">Latest news</h2>
						<img
							src={iphoneimage}
							alt="iPhone with USB-C"
							className="mx-auto mb-4"
						/>
						<p className="p-4 text-center text-2xl font-bold">
							Apple just invented a new revolutionary charging port and called
							it "USB-C"
						</p>
					</div>
					<div className="w-full rounded-3xl bg-white p-12 dark:bg-slate-900">
						<h2 className="pb-8 text-start text-2xl font-bold">More news</h2>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<img
									src={newsImage1}
									alt="News 1"
									className="mx-auto"
									style={{
										objectFit: 'cover',
										width: '250px',
										height: '150px',
									}}
								/>
								<p className="pt-2 text-center font-medium">
									The new OnePlus 12 was just unveiled.{' '}
								</p>
							</div>
							<div>
								<img
									src={newsImage2}
									alt="News 2"
									className="mx-auto"
									style={{
										objectFit: 'cover',
										width: '250px',
										height: '150px',
									}}
								/>
								<p className="px-2 text-center text-lg font-medium">
									Google is trying to revolutionize 2FA.
								</p>
							</div>
							<div>
								<img
									src={newsImage3}
									alt="News 3"
									className="mx-auto"
									style={{
										objectFit: 'cover',
										width: '250px',
										height: '150px',
									}}
								/>
								<p className="px-2 text-center text-lg font-medium">
									New leaks about the upcoming Nintendo Switch 2
								</p>
							</div>
							<div>
								<img
									src={newsImage4}
									alt="News 4"
									className="mx-auto"
									style={{
										objectFit: 'cover',
										width: '250px',
										height: '150px',
									}}
								/>
								<p className="px-2 text-center text-lg font-medium">
									FTX says that all affected customers will get their funds back
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="container flex flex-col justify-start bg-sky-500 px-12 dark:bg-sky-950 sm:flex-row">
					<div className="mr-4 w-full rounded-3xl bg-white p-4 dark:bg-slate-900">
						<h1 className="py-4 text-start text-4xl font-bold">
							Exciting news
						</h1>
						<ImageSlider />
					</div>
				</div>
				<div className="container flex flex-col justify-start bg-sky-500 p-12 dark:bg-sky-950 sm:flex-row">
					<div className="mr-4 w-full rounded-3xl bg-white p-4 dark:bg-slate-900">
						<h1 className="py-4 text-start text-2xl font-bold">
							WorldWide most used operating systems
						</h1>
						<div className="flex justify-around items-center flex-wrap">
							<PhoneChart />
							<PCChart />
						</div>
					</div>
				</div>
				<div className=" dark:bg-sky-95 container bg-sky-500 text-center text-4xl font-bold dark:bg-sky-950">
					<p>Meet the team</p>
				</div>

				<div className="block items-center justify-center gap-12 bg-sky-500 py-4 dark:bg-sky-950 lg:flex ">
					<div className="max-w-80">
						<EmployeeCard
							image={employee1}
							name="Billy Bob"
							role="Chief Technician"
						/>
					</div>
					<div className="max-w-80">
						<EmployeeCard image={employee2} name="Axel Woods" role="Designer" />
					</div>
					<div className="max-w-80">
						<EmployeeCard image={employee3} name="April Fools" role="Writer" />
					</div>
				</div>
			</div>
		</main>
	)
}
