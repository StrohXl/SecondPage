import React, { useState, useEffect } from 'react';
import { Table, Button, Space, } from 'antd'
import ModalList from '../Modal/modalList'
import "./styles.css"
import { LoadList, saveList, updateList } from './List';
const List = () => {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(null)
  const [data, setData] = useState([]) 
  const [llave, setLlave] = useState(30)

  const Eliminar = (record) => {
    const auxData = data.filter((item) => item.key !== record.key)
    setData(auxData)
  }
 const Editar =(record)=>{
  setOpen(true)
  setItem(record)
 }
 const showModal = () => {
  setOpen(true)
  setItem(null)
}
  const dataList = async () => {
    const lista = await LoadList()
    setData(lista)
  }

 
  const cancelModal = () => {
    setOpen(false)
    setItem(null)
  }
  const NewClient = async (payload) => {
    const newEmployee = await saveList(payload);
    newEmployee.key = llave
    setLlave(llave+1)
    let newFecha = new Date()
        let dia = newFecha.getDate()
        let mes = newFecha.getMonth()
        let ano = newFecha.getUTCFullYear()
        newEmployee.fecha = `${ano}/${mes}/${dia}`
    const auxData = [...data]
    auxData.unshift({
      ...newEmployee,

    })

    setData(auxData)

  }
  
  const SaveClient = async (payload) => {
    if (item === null) {
      NewClient(payload)
      console.log(data)
    }
    else {
      EditarList({...payload, key: item.key })
    }
   
    cancelModal()
  }
  const EditarList = async (payload) => {
    const dataList = await updateList(payload)
    let newFecha = new Date()
        let dia = newFecha.getDate()
        let mes = newFecha.getMonth()
        let ano = newFecha.getUTCFullYear()
        dataList.fecha = `${ano}/${mes}/${dia}`
    const auxData = [...data]
    const index = auxData.findIndex((item) => item.key === payload.key)
    auxData[index] = {
      ...dataList,
    
    }
    setData(auxData)

  }
  
  useEffect(() => { dataList() }, [])
  const columns = [
    {
      title: "Nombre:",
      dataIndex: "nombre",
    },
    {
      title: "Cedula:",
      dataIndex: "cedula",
     
           
    },
    {
      title: "Telefono:",
      dataIndex: "telefono",
     
    },
    {
      title: "Fecha:",
      dataIndex: "fecha",
      },
    {
      title: "Acciones",
     
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
    },
    Table.EXPAND_COLUMN,


  ]

  return (
    <Space size={'large'} direction='vertical' className='content-lista'>
      <Button onClick={showModal} className="Nuevo" >Nueva reservacion</Button>
  
      <Table
        columns={columns}
      className='listTabla'
        dataSource={data}
        expandable={{
          expandedRowRender: (item) => (
    
            <strong
              style={{
                margin: 0,

              }}
            >     
            {`Dias reservados: ${item.dias}, Numero de personas: ${item.personas}`}
           
              
            </strong>
          ),
        }} />
      <ModalList cerrado={cancelModal} abierto={open} ok={SaveClient} employe={item}/>
    </Space>

  );
};

export default List;