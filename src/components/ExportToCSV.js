import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ headers, data, filename }) => {
    return (
        <CSVLink data={data} headers={headers} filename={filename}>
            Export to CSV
        </CSVLink>
    );
};

export default ExportCSV;
