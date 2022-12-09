import moment from 'moment';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'


export default function TrainingCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setEvents(eventConverter(data)))
        .catch(err => console.error(err))
    }

    const eventConverter = (list) => {
        const newList = list.map((event) => {
            return {
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'm').toDate(),
                title: event.activity + ' / ' + event.customer?.firstname + ' ' + event.customer?.lastname
            }
        });
        return newList;
    }
    
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin]}
                events={events}
                initialView='timeGridWeek'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                firstDay='1'
                height={650}
                timeZone='local'
                dayHeaderFormat={{
                    weekday: 'short',
                    month: 'numeric'
                }}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                }}
            />
        </div>
    );
}