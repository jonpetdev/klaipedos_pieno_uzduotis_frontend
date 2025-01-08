import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

const CustomDatePicker = (date) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <input
                type="text"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (!isNaN(date.getTime())) {
                        setSelectedDate(date);
                    }
                }}
                style={{
                    padding: '10px 40px 10px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '200px',
                }}
            />
            <div
                onClick={() => document.getElementById('hidden-datepicker').click()}
                style={{
                    position: 'absolute',
                    right: '10px',
                    cursor: 'pointer',
                }}
            >
                <FaRegCalendarAlt size={20} />
            </div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                customInput={<input id="hidden-datepicker" style={{ display: 'none' }} />}
                dateFormat="yyyy-MM-dd"
                onClickOutside={(e) => e.stopPropagation()} // Avoid closing when clicking outside
                showMonthYearDropdown/>
        </div>
    );
};

export default CustomDatePicker;
