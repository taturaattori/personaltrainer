import React, {useState} from 'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

export default function Navigation() {

    const [value, setValue] = useState('customers')

    const handleChange = (event, value) => {  setValue(value);};

    return (
        <div>
            <h2>PersonalTrainer</h2>
            <Tabs value={value} onChange={handleChange}>
            <Tab value='trainings' label="Trainings"/>
            <Tab value='customers' label="Customers"/>
            </Tabs>
            {value === 'trainings' && <Traininglist/>}
            {value === 'customers' && <Customerlist/>}
        </div>
    );
}