import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import "antd/dist/antd.min.css";
import Welcome from './Components/Welcome'
import Services from './Components/Services'
import Packages from './Components/Packages'
import List from './Components/List'
import Layout from './Components/Layaout'
import Login from './Components/Login'
import NotFound from './Components/NotFound'
import { useEffect, useState } from "react";


function App() {


	const renderRoutes = () => {
		return (
			<Routes>
				<Route exact path="/SecondPage/" element={<Welcome />} />
				<Route path="/SecondPage/Services" element={

					<Services />} />
				<Route path="/SecondPage/Packages" element={

					<Packages />} />
				<Route path="/SecondPage/List" element={

					<List />} />
				<Route path="/SecondPage/Login" element={

					<Login />} />
			
			</Routes>
		)
	}

	return (
		<Router>
			<Layout>{renderRoutes()}</Layout>
		</Router>

	)
}
export default App;
