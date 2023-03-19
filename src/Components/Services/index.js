import React, { useState, useEffect } from 'react';
import { loadServices, saveServices, updateServices } from './services'
import { Table, Avatar, Button, Space, Popconfirm, notification } from 'antd'
import Cookies from 'js-cookie';
import ModalServices from '../Modal/modalServices'
import './styles.css'
import { Navigate } from 'react-router-dom';

const Services = () => {
  const key = Cookies.get('key')
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [item, setItem] = useState(null)
  const [ventana, setVentana] = useState()
  const [llave, setLlave] = useState(20)


  const Eliminar = (record) => {
    const auxData = data.filter((item) => item.key !== record.key)
    setData(auxData)
    notification.open({
      message: 'Servicio Eliminado',
    
    });
  }
  const WindowInner = () => {
    const ventana = window.innerWidth
    setVentana(ventana)
  }
  const NewServices = async (payload) => {
    setLlave(llave + 1)

    const newServices = await saveServices(payload);
    newServices.key = llave
    let newFecha = new Date()
    let dia = newFecha.getDate()
    let mes = newFecha.getMonth()
    let ano = newFecha.getUTCFullYear()
    let hora = newFecha.getHours()
    let minutos = newFecha.getMinutes()
    let segundos = newFecha.getSeconds()
    notification.open({
      message: 'Nuevo Servicio Agregado',
      description: <Space><Avatar size={40} src={newServices.img} /> {newServices.title}</Space>
        
    });
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
      EditarServices({ ...payload, key: item.key })
    }

    cancel()
    console.log(data)
  }
  const EditarServices = async (payload) => {
    const dataServices = await updateServices(payload)
    notification.open({
      message: 'Servicio Editado',
        
    });
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
  const openModal = () => {

    setOpen(true)
    setItem(null)

  }
  const cancel = () => {
    setItem(null)
    setOpen(false)
  }
  const Editar = (record) => {

    setItem(record)
    setOpen(true)
  }
  const loadData = async () => {
    const DataServices = await loadServices()
    setData(DataServices)
  }

  useEffect(() => {
    window.addEventListener('resize', () => WindowInner())
    const ventana = window.innerWidth
    setVentana(ventana)
    loadData();
  }, []);


  const columns = [
    {
      title: "Vista",
      key: "img",
      width: '200px',
      dataIndex: 'img',
      render: (data, record) => (
        <Avatar size={64} src={record.img} />
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
          <Button type="primary" block onClick={() => Editar(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estas seguro de Eliminar este Servicio?"
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
    }



  ]
  const columnsResponsive1 = [
    {
      title: "Vista",
      key: "img",
      width: '200px',
      dataIndex: 'img',
      render: (data, record) => (
        <Avatar size={64} src={record.img} />
      ),
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" block onClick={() => Editar(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estas seguro de Eliminar este Servicio?"
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
          <Space size={'large'} direction={'vertical'} className='content-servicios'>
            <Button type='primary' onClick={openModal} className="Nuevo" >Nuevo servicio</Button>
            {ventana < 600 ?

              <Table
                columns={columnsResponsive1}
                dataSource={data}
                expandable={{
                  expandedRowRender: (item) => (
                    <>
                      <tr>
                        Servicio: {item.title}
                      </tr>
                      <tr>
                        Fecha de modificacion: {item.fecha}
                      </tr>
                    </>
                  ),
                }} />
              :
              <Table columns={columns} dataSource={data} />

            }

            <ModalServices abierto={open} cerrado={cancel} ok={SaveServices} employe={item} />

          </Space>}

    </>

  );
};

export default Services;