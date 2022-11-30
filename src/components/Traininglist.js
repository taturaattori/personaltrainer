import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from "moment/moment";

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const dateFormatter = (params) => {
        return moment(params.value).format('DD/MM/YYYY HH:mm');
    }

    const nameFormatter = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const columns = [
        {
            headerName: 'Date',
            field: 'date',
            valueFormatter: dateFormatter
        },
        {
            headerName: 'Duration',
            field: 'duration'
        },
        {
            headerName: 'Activity',
            field: 'activity'
        },
        {
            headerName: 'Customer',
            field: 'customer',
            valueGetter: nameFormatter
        }
    ]

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        columnDefs: columns,
        animateRows: true,
        rowSelection: 'single',
        paginationAutoPageSize: true,
        pagination: true
    }

    return (
        <div>
            <div
                className='ag-theme-material'
                style={{
                    height: '700px',
                    width: '43%',
                    margin: 'auto'
                }}
            >
            <AgGridReact
                    rowData={trainings}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    )
}