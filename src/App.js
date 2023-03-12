import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.min.css";
import Welcome from './Components/Welcome'
import Services from './Components/Services'
import Packages from './Components/Packages'
import List from './Components/List'
import Layout from './Components/Layaout'


function App() {
	const renderRoutes = () => {
		return (
			<Routes>
				<Route exact path="/SecondPage/" element={<Welcome />} />
				<Route path="/SecondPage/Services" element={<Services />} />
				<Route path="/SecondPage/Packages" element={<Packages />} />
				<Route path="/SecondPage/List" element={<List />} />
		
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
