import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Auth, CreateRecipe, SavedRecipes } from './pages/'
import { Navbar } from './components/navbar/'
import './scss/main.scss'

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/saved-recipes' element={<SavedRecipes />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
