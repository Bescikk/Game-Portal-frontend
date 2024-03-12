import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddGamePage() {
	const [game, setGame] = useState({ title: '', description: '', author: '' });
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		setGame({ ...game, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(`http://localhost:8080/games/add-game`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([game]), // Zmieniamy tutaj game na [game] aby stworzyć listę zawierającą jedną grę
		})
			.then((response) => response.json())
			.then((data) => {
				navigate(`/`); // Zakładamy, że serwer zwraca listę dodanych gier
			})
			.catch((error) => console.error('Error adding game:', error));
	};

	return (
		<div>
			<h1>Dodaj grę</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id='outlined-basic'
					label='Tytuł'
					variant='outlined'
					type='text'
					name='title'
					value={game.title}
					onChange={handleInputChange}
				/>

				<TextField
					id='outlined-basic'
					label='Autor'
					variant='outlined'
					type='text'
					name='author'
					value={game.author}
					onChange={handleInputChange}
				/>

				<TextField
					id='outlined-basic'
					label='Opis'
					variant='outlined'
					type='text'
					name='description'
					value={game.description}
					onChange={handleInputChange}
				/>

				<Button variant='contained' type='submit'>
					Dodaj grę
				</Button>
			</form>
		</div>
	);
}
