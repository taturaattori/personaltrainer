import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteSharp } from "@mui/icons-material";
import AddTraining from "./AddTraining";
import ExportCSV from "./ExportCSV";


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => fetchCustomers())
    .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
        }   
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(training),
            headers: { 
                'Content-type': 'application/json' 
            }
          })
          .then(res => {
            setOpen(true);
          })
          .catch(err => console.error(err))
    } 
    

    const columns = [
        {
            headerName: 'Actions',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data} url={params.value}/>,
            width: '100'
        },
        {
            headerName: '',
            field: 'link',
            width: '70',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params => <Tooltip disableFocusListener title="Delete customer"><IconButton size='small' onClick={() => deleteCustomer(params.value)}><DeleteSharp/></IconButton></Tooltip>
        },
        {
            headerName: '',
            width: '70',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params => <AddTraining addTraining={addTraining} url={params.value} customer={params.data}/>
        },
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
            <AddCustomer saveCustomer={saveCustomer} />
            <ExportCSV customers={customers} />
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