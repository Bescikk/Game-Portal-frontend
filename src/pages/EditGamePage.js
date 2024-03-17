import { TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditGamePage() {
	const { id } = useParams();
	const [game, setGame] = useState({ title: '', description: '', author: '' });
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://gameportal-ebb6841accf5.herokuapp.com/games/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setGame(data);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, [id]);

	const handleInputChange = (event) => {
		setGame({ ...game, [event.target.name]: event.target.value });
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		formData.append('id', id);

		fetch(`https://gameportal-ebb6841accf5.herokuapp.com/games/upload-image`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Błąd podczas przesyłania obrazu');
				}
				// Dodajemy tutaj komunikat o pomyślnym przesłaniu obrazu
				alert('Obraz został pomyślnie przesłany!');
			})
			.catch((error) => console.error('Error uploading image:', error));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(`https://gameportal-ebb6841accf5.herokuapp.com/games/update-game/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(game),
		})
			.then(() => {
				navigate(`/game/${id}/${game.title}`);
			})
			.catch((error) => console.error('Error updating game:', error));
	};

	return (
		<div>
			<h1>Edytuj grę</h1>
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

				<input
					accept='image/*'
					style={{ display: 'none' }}
					id='upload-image'
					type='file'
					onChange={handleImageUpload}
				/>
				<label htmlFor='upload-image'>
					<Button variant='contained' component='span'>
						Dodaj obraz
					</Button>
				</label>

				<Button variant='contained' type='submit'>
					Zatwierdź
				</Button>
			</form>
		</div>
	);
}
