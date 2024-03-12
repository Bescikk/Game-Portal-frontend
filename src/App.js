import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StickyHeadTable from './pages/StickyHeadTable';
import GamePage from './pages/GamePage';
import EditGamePage from './pages/EditGamePage';
import AddGamePage from './pages/AddGamePage';
import './App.css';

function App() {
	return (
		<div className='container'>
			<Router>
				<Routes>
					<Route path='/game/:id/:title' element={<GamePage />} />
					<Route path='/' element={<StickyHeadTable />} />
					<Route path='/edit-game/:id' element={<EditGamePage />} />
					<Route path='/add-game' element={<AddGamePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
