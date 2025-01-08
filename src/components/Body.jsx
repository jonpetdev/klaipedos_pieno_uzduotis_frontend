import React, {useEffect, useState} from "react";
import {createUpdateEmployee, deleteEmployee, getAllEmployees, searchEmployees} from "../util/APIUtils.jsx";
import Spin from "./Spin.jsx";
import './Body.css'
import Table from "./Table.jsx";
import Button from "./Button.jsx";
import {AiFillDelete, AiFillEdit, AiFillPlusSquare} from "react-icons/ai";
import SearchInput from "./SearchInput.jsx";
import Modal from "./Modal.jsx";
import CustomInput from "./CustomInput.jsx";
import { DatePicker} from 'antd';
import dayjs from "dayjs";



const Body =()=>{
    const [employees, setEmployees] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [employee, setEmployee] = useState({});
    const [createVisible, setCreateVisible] = useState(false);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees=async () => {
        try {
            setIsLoading(true);

            const response = await getAllEmployees();
            setEmployees(response || []);
        } catch (error) {
            if (error.status === 404) {
                alert("Not Found!!");
            } else {
                alert("Server error!!");
            }
        } finally {
            setIsLoading(false);
        }
    }


    const handleSearch = async (e) => {
        setSearchText(e);
        if (e.length >= 3) {
            const response = await searchEmployees(e);
            setEmployees(response);
        } else if (e === '') {
            await getEmployees();
        }
    };

    const handleInputChange=(e, name)=>{
        setEmployee((prevState)=>({...prevState, [name]:e.target.value}))
    }
    const handleDateChange=(e)=>{
        setEmployee((prevState)=>({...prevState, birthDate:e == null ? undefined : new Date(e).toLocaleDateString("LT") }))
    }


    const handleAdd=()=>{
        setCreateVisible(true);
    }

    const handleUpdate=(emp)=>{
        setEmployee(emp);
        setCreateVisible(true);
    }

    const handleClose=()=>{
        setCreateVisible(false);
        setEmployee({})
    }

    const handleDeleteSearchText=()=>{
        getEmployees();
        setSearchText("")
    }

    const handleSubmitEmployee=()=>{
        createUpdateEmployee(employee)
            .then(response => {
                const fEmployeeIndex = employees.findIndex(emp => emp.id === response.id);
                if (fEmployeeIndex !== -1) {
                    const updatedEmployees = [...employees];
                    updatedEmployees[fEmployeeIndex] = response;
                    setEmployees(updatedEmployees);
                } else {
                    setEmployees([...employees, response]);
                }
                handleClose();
            }).catch(error => {
                alert("Atsiprašome! ivyko klaida / "+error)
        });
    }

    const handleDelete=(id)=>{
        deleteEmployee(id)
            .then(response => {
                if(response.success){
                    const list = employees.filter(emp=> emp.id !==id);
                    setEmployees(list);
                }else{
                    alert(response.message)
                }

            }).catch(error => {
            alert("Atsiprašome! ivyko klaida / "+error)
        });
    }


    const columns=[
        {
            indexKey:"firstName",
            label: (<div>Vardas</div>),
            render:(record)=>(<div>{record.firstName}</div>)
        },
        {
            indexKey:"lastName",
            label: (<div>Pavardė</div>),
            render:(record)=>(<div>{record.lastName}</div>)
        },
        {
            indexKey:"position",
            label: (<div>Pareigos</div>),
            render:(record)=>(<div>{record.position}</div>)
        },
        {
            indexKey:"phone",
            label: (<div>Telefonas</div>),
            render:(record)=>(<div>{record.phone}</div>)
        },
        {
            indexKey:"email",
            label: (<div>El.paštas</div>),
            render:(record)=>(<div>{record.email}</div>)
        },
        {
            indexKey:"birthDate",
            label: (<div>Gimimo data</div>),
            render:(record)=>(<div>{record.birthDate !== null ? new Date(record.birthDate).toLocaleDateString("LT"):undefined}</div>)
        },
        {
            label: (<div></div>),
            render:(record)=>(
                <div style={{gap:5}}>
                    <Button className={"small-button"} onClick={()=>{handleUpdate(record)}}><AiFillEdit /></Button>
                    <Button className={"small-button"} onClick={()=>{handleDelete(record.id)}}><AiFillDelete /></Button>
                </div>)
        }
    ]

    const validateForm = () => {
        return (
            employee.firstName === undefined ||
            employee.firstName === null ||
            employee.firstName.length === 0 ||
            employee.lastName === undefined ||
            employee.lastName === null ||
            employee.lastName.length === 0
        );
    };

    return (

            <>
                <div className={"body-container"}>
                    <div className={"action-box"}>
                        <Button onClick={handleAdd}><AiFillPlusSquare/> Naujas</Button>
                        <SearchInput onChange={handleSearch} onDelete={handleDeleteSearchText} value={searchText}/>
                    </div>
                    <Spin isLoading={isLoading}>
                    <div className={"table-box"}>

                            <Table columns={columns} data={employees} tableWidth={"100%"}/>

                    </div>
                    </Spin>
                </div>
                <Modal onClose={handleClose} open={createVisible} width={"500px"} title={<div>{employee?.id!==undefined ? employee?.firstName+" "+employee?.lastName: null}</div>}>

                    <div>
                        <CustomInput
                            type={"text"}
                            value={employee?.firstName || ''}
                            onChange={handleInputChange}
                            title={"Vardas"}
                            name={"firstName"}
                            placeholder={"Įrašykite vardą"}
                            required={true}
                        />
                        <CustomInput
                            type={"text"}
                            value={employee?.lastName || ''}
                            onChange={handleInputChange}
                            title={"Pavardė"}
                            name={"lastName"}
                            placeholder={"Įrašykite pavardę"}
                            required={true}
                        />
                        <CustomInput
                            type={"text"}
                            value={employee?.position || ''}
                            onChange={handleInputChange}
                            title={"Pareigos"}
                            name={"position"}
                            placeholder={"Įrašykite pareigas"}

                        />
                        <CustomInput
                            type={"text"}
                            value={employee?.phone || ''}
                            onChange={handleInputChange}
                            title={"Telefonas"}
                            name={"phone"}
                            placeholder={"Įrašykite telefonp numerį"}

                        />
                        <CustomInput
                            type={"email"}
                            value={employee?.email || ''}
                            onChange={handleInputChange}
                            title={"El.paštas"}
                            name={"email"}
                            placeholder={"Įrašykite elektroninį paštą"}
                        />
                        <div >
                            <div className={"input-title"}>Gimimo data</div>
                            <DatePicker
                                onChange={handleDateChange}
                                dateFormat={"YYYY-MM-DD"}
                                value={employee?.birthDate === undefined || employee?.birthDate === null ? null : dayjs(employee?.birthDate)}
                            />
                        </div>
                    </div>
                    <div className={"modal-button-box"}>
                        <Button disabled={validateForm()} styles={{flex: 2, backgroundColor: "#252525", color: "#fff"}} onClick={handleSubmitEmployee}>Išsaugoti</Button>
                        <Button styles={{flex: 1}} onClick={handleClose}>Atšaukti</Button>
                    </div>
                </Modal>
            </>


    )
}

export default Body;