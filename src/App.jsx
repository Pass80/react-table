import React from "react";
import Table from "./components/Table/Table";
import { dummyData } from "./DummyData/DummyData";

const App = () => {
	const columns = [
		{ Header: "ID", accessor: "id" },
		{ Header: "Name", accessor: "name" },
		{ Header: "Last name", accessor: "lastName" },
		{ Header: "Job", accessor: "job" },
	];
	return <Table columns={columns} data={dummyData} />;
};
export default App;
