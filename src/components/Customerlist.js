import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Address',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true,
            floatingFilter: true
        }
    ]

    const gridOptions = {
        defaultColDef: {
            resizable: true,
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
                    width: '75%',
                    margin: 'auto'}}
            >
            <AgGridReact
                    rowData={customers}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    );
}