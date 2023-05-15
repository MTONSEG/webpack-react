import React, { useState, lazy, Suspense } from "react"
import { Route, Routes, } from "react-router-dom";
import './App.scss';
// import { Footer } from "./components/UI/Footer/Footer.jsx";

const Home = lazy(() => import('./components/Home/Home.jsx'));
const CalcPage = lazy(() => import('./components/CalcPage/CalcPage.jsx'))
const VehicleVideos = lazy(() => import('./components/VehicleVideos/VehicleVideos.jsx'))
const About = lazy(() => import('./components/About/About.jsx'))
const LoanRates = lazy(() => import('./components/LoanRates/LoanRates.jsx'))
const Quiz = lazy(() => import('./components/Quiz/Quiz.jsx'))

const MenuModal = lazy(() => import('./components/UI/Modals/MenuModal.jsx'))
const ContactModal = lazy(() => import('./components/UI/Modals/ContactModal.jsx'))
const Footer = lazy(() => import('./components/UI/Footer/Footer.jsx'))
const NotFoundPage = lazy(() => import('./components/Page404/Page404.jsx'))

// import { Blog } from "./components/Blog/Blog.jsx";
// import { FirstArticle } from "./components/Blog/Articles/FirstArticle.jsx";
// import { SecondArticle } from "./components/Blog/Articles/SecondArticle.jsx";
// import { Terms } from "./components/TermsPrivacy/Terms.jsx";
// import { Privacy } from "./components/TermsPrivacy/Privacy.jsx";
// import { Catalog } from "./components/Catalog/Catalog.jsx";
// import { CarPage } from "./components/Catalog/CarPage/CarPage.jsx";

export function App({ store }) {

	let [state, setState] = useState(store);
	let [showMenu, setShowMenu] = useState(false);
	let [showRequest, setShowRequest] = useState(false);

	let showModals = {
		showMenu: showMenu,
		setShowMenu: setShowMenu,
		showRequest: showRequest,
		setShowRequest: setShowRequest,
		logo: state.images.logo
	}

	return (
		<div className="wrapper">
			<Suspense fallback={
				<p style={{
					position: 'fixed',
					top: '0',
					left: '0',
					height: '100%',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '40px'
				}}>
					Loading
				</p>}>
				<Routes>
					<Route path="/" element={<Home
						state={state.homePage}
						stateModals={showModals}
					/>} />
					<Route path="/calc" element={<CalcPage
						state={state.calcPage}
						stateModals={showModals}
					/>} />
					<Route path="/videos" element={<VehicleVideos
						state={state.videosPage}
						stateModals={showModals}
					/>} />
					<Route path="/about" element={<About
						state={state.aboutPage}
						stateModals={showModals}
					/>} />
					<Route path="/rates" element={<LoanRates
						state={state.loanRates}
						stateModals={showModals}
					/>} />
					{/* <Route path="/blog" element={<Blog
						state={state.blogPage}
						stateModals={showModals}
					/>} />
					<Route path="/article/1" element={<FirstArticle
						state={state.articlesPage}
						stateModals={showModals}
					/>} />
					<Route path="/article/2" element={<SecondArticle
						state={state.articlesPage}
						stateModals={showModals}
					/>} />
					<Route path="/terms" element={<Terms
						state={state.termsPolicy.terms}
						stateModals={showModals}
					/>} />
					<Route path="/privacy" element={<Privacy
						state={state.termsPolicy.privacy}
						stateModals={showModals}
					/>} />
					<Route path="/catalog" element={<Catalog
						state={state.catalogPage}
						stateModals={showModals}
					/>} />
					<Route path="/card" element={<CarPage
						state={state.carPage}
						stateModals={showModals}
					/>} /> */}
					<Route path={'/quiz/*'} element={<Quiz
						stateModals={showModals}
					/>} />
					<Route path="*" element={
						<NotFoundPage state={state.notFoundPage} />
					} />
				</Routes>
				<Footer images={
					{
						logo: state.images.logoFooter,
						icon: state.images.logoCompany,
						instagram: state.images.iconInstagram,
						facebook: state.images.iconFacebook,
						youtube: state.images.iconYoutube,
					}
				} />
				<MenuModal
					state={state.modals}
					showMenu={showMenu}
					setShowMenu={setShowMenu}
				/>
				<ContactModal
					state={state.modals}
					showMenu={showRequest}
					setShowMenu={setShowRequest}
				/>
			</Suspense>
		</div>
	)
}