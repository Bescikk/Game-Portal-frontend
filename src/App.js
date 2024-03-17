import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StickyHeadTable from './pages/StickyHeadTable';
import GamePage from './pages/GamePage';
import EditGamePage from './pages/EditGamePage';
import AddGamePage from './pages/AddGamePage';
import './App.css';

function App() {
	return (
		<div className='container'>
			<BrowserRouter>
				<Routes>
					<Route path='/game/:id/:title' element={<GamePage />} />
					<Route path='/' element={<StickyHeadTable />} />
					<Route path='/edit-game/:id' element={<EditGamePage />} />
					<Route path='/add-game' element={<AddGamePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
