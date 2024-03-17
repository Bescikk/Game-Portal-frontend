import React, { useState, useEffect } from 'react';
import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Define custom styles for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		padding: '8px 16px',
	},
}));

// Define custom styles for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}));

export default function StickyHeadTable() {
	// Define state variables
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [rows, setRows] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
	const navigate = useNavigate();

	// Fetch data when component mounts
	useEffect(() => {
		fetch('https://gameportal-ebb6841accf5.herokuapp.com/games')
			.then((response) => response.json())
			.then((data) => {
				const updatedRows = data.map((row, index) => ({
					...row,
					No: index + 1,
				}));
				setRows(updatedRows);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	// Handle sorting of table columns
	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};

	// Sort rows based on sort configuration
	const sortedRows = rows.slice().sort((a, b) => {
		if (sortConfig && sortConfig.key) {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'asc' ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'asc' ? 1 : -1;
			}
		}
		return 0;
	});

	// Handle change of page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// Handle change of rows per page
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// Define column widths
	const columnWidths = {
		No: '4%',
		title: '12%',
		author: '12%',
		description: '52%',
		rate: '12%',
	};

	// Start of the component
	return (
		// The main container for the table
		<div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
			{/* The container for the table */}
			<TableContainer style={{ maxHeight: 'calc(100% - 56px)' }}>
				{/* The table itself */}
				<Table stickyHeader aria-label='sticky table'>
					{/* The table head */}
					<TableHead>
						{/* A row in the table head */}
						<StyledTableRow>
							{/* Map through each key in columnWidths and create a cell for it */}
							{Object.keys(columnWidths).map((key) => (
								// The cell in the table head. When clicked, it sorts the table by this column.
								<StyledTableCell key={key} onClick={() => handleSort(key)} style={{ width: columnWidths[key] }}>
									{/* The name of the column. If this column is the one being sorted, show an arrow indicating the sort direction. */}
									{key.charAt(0).toUpperCase() + key.slice(1)}
									{sortConfig &&
										sortConfig.key === key &&
										(sortConfig.direction === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
								</StyledTableCell>
							))}
						</StyledTableRow>
					</TableHead>
					{/* The table body */}
					<TableBody>
						{/* Map through each row in sortedRows (only for the current page) and create a row for it */}
						{sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
							// The row in the table body. When clicked, it navigates to the game details page.
							<StyledTableRow key={index}>
								{Object.keys(columnWidths).map((key) => (
									<StyledTableCell key={key} style={{ color: 'white' }}>
										{/* Jeśli kolumna zawiera ID lub tytuł, przekieruj do odpowiedniej ścieżki */}
										{key === 'id' || key === 'title' ? (
											<Link to={`/game/${encodeURIComponent(row.id)}/${encodeURIComponent(row.title)}`}>
												{row[key]}
											</Link>
										) : (
											// W przeciwnym razie wyświetl normalnie
											row[key]
										)}
									</StyledTableCell>
								))}
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* The pagination controls. It allows changing the current page and the number of rows per page. */}
			<TablePagination
				rowsPerPageOptions={[20, 50, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<Button variant='contained' onClick={() => navigate('/add-game')}>
				Dodaj grę
			</Button>
		</div>
	);
	// End of the component
}
