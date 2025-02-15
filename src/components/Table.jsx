import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";

const Table = ({ columns, data, tableWidth }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedData = React.useMemo(() => {
        if (sortConfig.key) {
            return [...data].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
                if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    const handleSort = (key) => {
        if (!key) return;
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                return {
                    key,
                    direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return { key, direction: 'asc' };
        });
    };

    return (
        <div
            className="table-container"
            style={{ width: tableWidth || '100%', overflowX: 'auto', fontSize: 12 }}
        >
            <table className="custom-table" style={{ width: '100%' }}>
                <thead>
                <tr>
                    {columns?.map((col, index) => (
                        <th
                            key={index}
                            style={{
                                width: col.width || 'auto',
                                cursor: col.indexKey ? 'pointer' : 'default',
                            }}
                            onClick={() => col.indexKey && handleSort(col.indexKey)}
                        >
                            <div style={{display: "flex"}}>
                                {col.label}
                                {sortConfig.key === col.indexKey && (
                                    <span>
                                        {sortConfig.direction === 'asc' ? (<AiFillCaretUp/>) : <AiFillCaretDown/>}
                                    </span>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sortedData?.map((record, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns?.map((col, colIndex) => (
                            <td key={colIndex}>
                                {col.render
                                    ? col.render(record)
                                    : col.indexKey
                                        ? record[col.indexKey] || ''
                                        : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            render: PropTypes.func,
            width: PropTypes.string,
            indexKey: PropTypes.string,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    tableWidth: PropTypes.string,
};

export default Table;



