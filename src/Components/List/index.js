import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm,notification } from 'antd'
import ModalList from '../Modal/modalList'
import "./styles.css"
import { LoadList, saveList, updateList } from './List';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const List = () => {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(null)
  const [ventana, setVentana] = useState()
  const [data, setData] = useState([])
  const key = Cookies.get('key')
  const [llave, setLlave] = useState(30)
  const WindowInner = () => {
    const ventana = window.innerWidth
    setVentana(ventana)
  }
  const Eliminar = (record) => {
    const auxData = data.filter((item) => item.key !== record.key)
    setData(auxData)
    notification.open({
      message: 'Persona Eliminada'
    })
  }
  const Editar = (record) => {
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
    notification.open({
      message: 'Nueva Persona Agregada',
      description: <Space><span>Nombre: {newEmployee.nombre} </span><span>C.I: {newEmployee.cedula}</span></Space>
    })
    setLlave(llave + 1)
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
    }
    else {
      EditarList({ ...payload, key: item.key })
    }

    cancelModal()
  }
  const EditarList = async (payload) => {
    const dataList = await updateList(payload)
    let newFecha = new Date()
    let dia = newFecha.getDate()
    notification.open({
      message: 'Persona Editada'
    })
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

  useEffect(() => {
    window.addEventListener('resize', () => WindowInner())
    const ventana = window.innerWidth
    setVentana(ventana)
    dataList();
  }, []);
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
      title: "Dias:",
      dataIndex: "dias",

    },
    {
      title: "Personas:",
      dataIndex: "personas",
    },
    {
      title: "Acciones",

      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" block onClick={() => Editar(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estas seguro de Eliminar esta Persona?"
            onConfirm={() => Eliminar(record)}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" block danger >
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,


  ]
  const columnsResponsive1 = [
    {
      title: "Nombre:",
      dataIndex: "nombre",
    },

    {
      title: "Acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" block onClick={() => Editar(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estas seguro de Eliminar esta Persona?"
            onConfirm={() => Eliminar(record)}
            okText="Si"
            cancelText="No"
          >
             <Button type="primary" block danger >
            Eliminar
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,


  ]
  const columnsResponsive2 = [
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
      title: "Acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" block onClick={() => Editar(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estas seguro de Eliminar esta Persona?"
            onConfirm={() => Eliminar(record)}
            okText="Si"
            cancelText="No"
          >
             <Button type="primary" block danger >
            Eliminar
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,


  ]

  return (
    <>
      {
        key == undefined ?
          <Navigate to='/SecondPage/Login' /> :
          <Space size={'large'} direction='vertical' className='content-lista'>
            <Button onClick={showModal} type='primary' className="Nuevo" >Nueva reservacion</Button>
            {ventana < 600 ?

              <Table
                columns={columnsResponsive1}
                dataSource={data}
                expandable={{
                  expandedRowRender: (item) => (
                    <>
                      <tr>
                        Cedula: {item.cedula}
                      </tr>
                      <tr>
                        Telefono: {item.telefono}
                      </tr>
                      <tr>
                        Fecha: {item.fecha}
                      </tr>
                      <tr>
                        Dias: {item.dias}
                      </tr>
                      <tr>
                        Personas: {item.personas}
                      </tr>
                    </>
                  ),
                }} />
              :
              ventana < 900 ?
                <Table
                  columns={columnsResponsive2}
                  dataSource={data}
                  expandable={{
                    expandedRowRender: (item) => (
                      <>
                        <tr>
                          Fecha: {item.fecha}
                        </tr>
                        <tr>
                          Dias: {item.dias}
                        </tr>
                        <tr>
                          Personas: {item.personas}
                        </tr>
                      </>
                    ),
                  }} />
                :
                <Table columns={columns} dataSource={data} />

            }

            <ModalList cerrado={cancelModal} abierto={open} ok={SaveClient} employe={item} />
          </Space>}

    </>


  );
};

export default List;