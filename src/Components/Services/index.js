import React, { useState, useEffect } from 'react';
import {loadServices,saveServices,updateServices} from './services'
import { Table, Avatar, Button,Space } from 'antd'
import ModalServices from '../Modal/modalServices'

import './styles.css'

const Services = () => {
    const [open,setOpen] =useState(false)
    const [data, setData] = useState([])
    const [item, setItem] = useState(null)
    const [llave, setLlave] = useState(20)

    const Eliminar = (record) => {
        const auxData = data.filter((item) => item.key !== record.key)
        setData(auxData)
      }
      
    const NewServices = async (payload) => {
          setLlave(llave+1)
      
        const newServices = await saveServices(payload);
        console.log(newServices)
        newServices.key = llave
        let newFecha = new Date()
        let dia = newFecha.getDate()
        let mes = newFecha.getMonth()
        let ano = newFecha.getUTCFullYear()
        let hora = newFecha.getHours()
        let minutos = newFecha.getMinutes()
        let segundos = newFecha.getSeconds()
        newServices.fecha = `${ano}/${mes}/${dia}  ${hora}:${minutos}:${segundos}`
        const auxData = [...data] 
        console.log(auxData)
        auxData.unshift({
          ...newServices,                 
        })
        setData(auxData)
        console.log(data)
       
        
   
  }
  const SaveServices = async (payload) => {

    if (item === null) {
      NewServices(payload)
    }
    else {
      EditarServices({...payload, key: item.key })
    }
  
    cancel()
    console.log(data)
  }
  const EditarServices = async (payload) => {
    const dataServices = await updateServices(payload)
    let newFecha = new Date()
    let dia = newFecha.getDate()
    let mes = newFecha.getMonth()
    let ano = newFecha.getUTCFullYear()
    let hora = newFecha.getHours()
    let minutos = newFecha.getMinutes()
    let segundos = newFecha.getSeconds()
    dataServices.fecha = `${ano}/${mes}/${dia}     ${hora}:${minutos}:${segundos}`
    const auxData = [...data]
    const index = auxData.findIndex((item) => item.key === payload.key)
    auxData[index] = {
      ...dataServices,
    
    }
    setData(auxData)

  }
    const openModal=()=>{
   
      


        setOpen(true)
        setItem(null)

    }
    const cancel=()=>{
        setItem(null)
        setOpen(false)
    }
    const Editar=(record)=>{
 
      setItem(record)
      setOpen(true)
    }
    const loadData = async () => {
        const DataServices = await loadServices()
        setData(DataServices)
    }

    useEffect(() => {
        loadData();
    }, []);


    const columns=[
        {
            title: "Vista",
            key: "img",
            width: '200px',
            dataIndex: 'img',
            render: (data, record) =>(
             <Avatar  className='imagen' src={record.img}/>
            ),
        },
       
        {
            title: "Servicio",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Fecha de modificacion",
            dataIndex: "fecha",
            key: "fecha",
            
           
        },
        {
            title: "Acciones",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button type="link" block onClick={() => Editar(record)}>
                  Editar
                </Button>
                <Button type="link" block danger onClick={() => Eliminar(record)}>
                  Eliminar
                </Button>
              </Space>
            ),
          }
        
        
   
    ]

    return (
    
            <Space size={'large'} direction={'vertical'} className='content-servicios'>
                <Button onClick={openModal} className="Nuevo" >Nuevo servicio</Button>
                <Table columns={columns} dataSource={data}/>
                <ModalServices abierto={open}  cerrado={cancel} ok={SaveServices} employe={item} />
                
            </Space>
    );
};

export default Services;