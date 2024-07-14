# Instructions

## Footer

The footer is usually placed at the bottom of a page, and can contain legal
information, contact details, or even its own navigation menu.

### Basic

> _Screenshot_
>
> ![Footer Basic](/componentScreenshots/FooterBasic.png)
>
> _Location_
>
> [app/components/organisms/Footer/FooterBasic.tsx](/app/components/organisms/Footer/FooterBasic.tsx)
>
> _Code_
>
> ```tsx
> import FooterBasic from '~/components/organisms/Footer'
>
> function App() {
> 	return (
> 		<FooterBasic
> 			companyName="My Company Name"
> 			altText="Alt text for my logo"
> 		/>
> 	)
> }
> ```

### FooterMenuRight

> _Screenshot_
>
> ![Footer Menu Right](/componentScreenshots/FooterMenuRight.png)
>
> _Location_
>
> [app/components/organisms/Footer/FooterMenuRight.tsx](app/components/organisms/Footer/FooterMenuRight.tsx)
>
> _Code_
>
> ```tsx
> import FooterMenuRight from '~/components/organisms/Footer/FooterMenuRight.tsx'
>
> function App() {
> 	return (
> 		<FooterMenuRight
> 			companyName="My Company Name"
> 			altText="Alt text for my logo"
> 		/>
> 	)
> }
> ```

### FooterLogoCenter

> _Screenshot_
>
> ![FooterLogoCentre](/componentScreenshots/FooterLogoCentre.png)
>
> _Location_
>
> [app/components/organisms/Footer/FooterLogoCentre.tsx](/app/components/organisms/Footer/FooterLogoCentre.tsx)
>
> _Code_
>
> ```tsx
> import FooterLogoCentre from '~/components/organisms/Footer/FooterLogoCentre.tsx'
> ;<FooterLogoCentre />
> ```

## Hero

Hero sections are big and bold, designed to catch the user's attention. They
often contain a 'Call To Action' (CTA) button encouraging the user to sign up,
log in or buy a product.

### HeroCallToAction

> _Screenshot_
>
> ![Hero Call To Action](/componentScreenshots/HeroCallToAction.png) >
> _Location_
>
> [app/components/organisms/Hero/HeroCallToAction.tsx](/app/components/organisms/Hero/HeroCallToAction.tsx)
>
> _Code_
>
> ```tsx
> import { type MetaFunction } from '@remix-run/node'
> import heroImage from '#app/assets/jpg/sample-hero.jpg'
> import { Button } from '#app/components/atoms/Button'
> import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction'
>
> export const meta: MetaFunction = () => [{ title: 'Epic News' }]
>
> export default function App() {
> 	return (
> 		<HeroCallToAction image={heroImage}>
> 			<div className="bg-primary flex h-full w-full flex-col items-stretch justify-between p-16">
> 				<div>
> 					<h2 className="text-h2 text-primary-foreground">A Sample Title</h2>
> 					<p className="text-primary-foreground py-8">
> 						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
> 						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
> 						enim ad minim veniam, quis nostrud exercitation ullamco laboris
> 						nisi ut aliquip ex ea commodo consequat.
> 					</p>
> 				</div>
> 				<div>
> 					<Button size="wide" variant="outline">
> 						Sign Up
> 					</Button>
> 				</div>
> 			</div>
> 		</HeroCallToAction>
> 	)
> }
> ```

### ParallaxBackground

> _Screenshot_
>
> ![Hero Parallax Background](/componentScreenshots/HeroParallaxBackground.png)
>
> _Location_
>
> [app/components/organisms/Hero/ParallaxBackground.tsx](/app/components/organisms/Hero/ParallaxBackground.tsx)
>
> _Code_
>
> ```tsx
> import ParallaxBackground from '~/components/organisms/Hero/ParallaxBackground'
> import iconPlaceholder from '~/assets/svg/icon-placeholder.svg'
> import SignInButtons from '~/components/molecules/SignInButtons'
>
> export default function App() {
> 	return (
> 		<ParallaxBackground
> 			image={dobuHeroImage}
> 			title="DoBu Martial Arts" // Optional prop
> 			description="Stronger together" // Optional prop
> 			logo={iconPlaceholder} // Optional prop
> 			altText="DoBu Martial Arts logo" // Optional prop
> 		>
> 			{/* Children are optional */}
> 			<SignInButtons />
> 		</ParallaxBackground>
> 	)
> }
> ```

## Cards

In web design, a card is a flexible and extensible content container that
typically includes elements like images, text, and a link about a single
subject.

### FeatureHighlightCard

> _Screenshot_
>
> ![FeatureHighlightCard](/componentScreenshots/FeatureHighlightCard.png)
>
> _Location_
>
> [app/components/organisms/FeatureHighlightCard.tsx](/app/components/organisms/FeatureHighlightCard.tsx)
>
> _Code_
>
> ```tsx
> import FeatureHighlightCard from '~/components/organisms/FeatureHighlightCard.tsx'
> import dobuHeroImage from '~/assets/jpg/dobu-hero.jpg'
>
> export default function App() {
> 	return (
> 		<FeatureHighlightCard
> 			title="Test title"
> 			description="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
> 			image={dobuHeroImage}
> 		/>
> 	)
> }
> ```

## Navbar (Header)

The Navbar usually sits at the top of the screen, and, like the footer, is
consistently found on every page of the website.

> _Screenshot_
>
> ![Navbar](/componentScreenshots/Navbar.png)
>
> _Location_
>
> [app/components/pageElements/Navbar](./Navbar/index.tsx)
>
> _Code_
>
> ```tsx
> import Navbar from '~/components/organisms/Navbar'
>
> export default function App() {
> 	return <NavBar />
> }
> ```

### NavbarLink

> _Screenshot_
>
> ![NavbarLink](/componentScreenshots/NavbarLink.png)
>
> _Location_
>
> [app/components/organisms/Navbar/NavbarLink.tsx](./Navbar/NavbarLink.tsx)
>
> _Code_
>
> ```tsx
> import NavbarLink from "~/components/organisms/Navbar/NavbarLink";
>
> export default function App() {
> 	return (
>     <Navbar>
>       <NavBarLink to="/">Home</NavbarLink>;
>       <NavBarLink to="/about">About</NavbarLink>;
>     </Navbar>
> 	)
> }
> ```
