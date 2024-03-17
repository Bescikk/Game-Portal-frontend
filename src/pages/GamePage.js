import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GamePage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [game, setGame] = useState(null);

	useEffect(() => {
		// Pobierz dane gry na podstawie id
		fetch(`https://gameportal-ebb6841accf5.herokuapp.com/games/${id}`)
			.then((response) => response.json())
			.then((data) => {
				// Dodaj pełny adres URL do obrazu
				data.image = `https://gameportal-ebb6841accf5.herokuapp.com/images/${data.title.replace(/ /g, '_')}.jpg`;
				setGame(data);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, [id]);

	// Definiuj styl tła dynamicznie
	const backgroundStyle = {
		backgroundImage: `url(${game?.image})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh',
	};

	const handleEdit = () => {
		navigate(`/edit-game/${id}`);
	};

	const handleDelete = () => {
		if (window.confirm('Czy na pewno chcesz usunąć tę grę?')) {
			fetch(`https://gameportal-ebb6841accf5.herokuapp.com/games/delete-game/${id}`, {
				method: 'DELETE',
			})
				.then((response) => {
					if (!response.ok) {
						// Logujemy status odpowiedzi i jej tekst
						console.log('Status odpowiedzi:', response.status);
						return response.text().then((text) => {
							// Rzucamy błąd z tekstem odpowiedzi
							throw new Error('Błąd podczas usuwania gry: ' + text);
						});
					}
					navigate('/');
				})
				.catch((error) => {
					// Logujemy cały obiekt błędu
					console.error('Error:', error);
				});
		}
	};

	return (
		<div>
			{game ? (
				<div>
					<div className='layout-wrapper'>
						<nav className='cover-wrapper' style={backgroundStyle}>
							<header className='page-header'>
								<h1 className='headline'>{game.title}</h1>
							</header>
							<div className='page-sub'>
								<div className='subhead-container'>
									<h2 className='subhead'>{game.author}</h2>
								</div>
							</div>
						</nav>
						<div className='section-1'>
							<p className='article-tags'>
								<span className='tag'>culture</span>
								<span className='tag'>games</span>
								<span className='tag'>featured</span>
							</p>
							<p className='first-paragraph'>{game.description}</p>
							<p>
								Animi aut, atque quibusdam similique distinctio enim iure, blanditiis rerum autem illum eum in. Dolorem
								quasi aspernatur nemo deserunt quo, libero dolore atque magni, ullam nihil corrupti et illo earum?
							</p>
							<p>
								Quos, ad? Et, iure. Officia fuga unde quibusdam nemo modi perspiciatis quisquam consectetur voluptates,
								dolore ab eaque voluptatem corporis placeat consequatur itaque qui asperiores. Consequuntur quas vitae
								animi est ea!
							</p>
							<p>
								Accusantium nemo labore corrupti laudantium! Quo reprehenderit ea perspiciatis temporibus! Illo sapiente
								harum fuga molestias temporibus iste animi. Velit, tenetur mollitia sit magni nulla quos veniam
								molestias consectetur aliquam eaque.
							</p>
							<p>
								Voluptatem, omnis, placeat recusandae iste explicabo accusantium velit laboriosam voluptatum similique,
								fugit culpa enim! Suscipit labore odit porro assumenda, molestiae aperiam laboriosam explicabo nemo
								soluta facere sed libero magnam. Odio.
							</p>
						</div>
					</div>
					<Button variant='contained' onClick={handleEdit}>
						Edytuj
					</Button>
					<Button variant='contained' onClick={handleDelete}>
						Usuń gre
					</Button>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}
