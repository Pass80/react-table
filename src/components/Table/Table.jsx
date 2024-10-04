// src/components/Table.jsx
import React, { useState } from "react";
import "./Table.css";

const Table = ({ columns, data, rowsPerPage = 5 }) => {
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: "asc",
	});
	const [page, setPage] = useState(0);
	const totalPages = Math.ceil(data.length / rowsPerPage);

	const sortedData = React.useMemo(() => {
		let sortableData = [...data];
		if (sortConfig.key !== null) {
			sortableData.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableData;
	}, [data, sortConfig]);

	const paginatedData = sortedData.slice(
		page * rowsPerPage,
		(page + 1) * rowsPerPage
	);

	const handleSort = (key) => {
		console.log("hallo");

		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.accessor}
								onClick={() => handleSort(column.accessor)}
							>
								{column.Header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column) => (
								<td key={column.accessor}>
									{row[column.accessor]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination Controls */}
			<div>
				<button onClick={() => setPage(page - 1)} disabled={page === 0}>
					Previous
				</button>
				<span>
					Page {page + 1} of {totalPages}
				</span>
				<button
					onClick={() => setPage(page + 1)}
					disabled={page + 1 >= totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Table;
