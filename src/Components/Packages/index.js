import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Avatar, Popconfirm, notification } from 'antd'
import ModalPackages from '../Modal/modalPackages'
import { Navigate } from 'react-router-dom';
import './styles.css'
import Cookies from 'js-cookie';
import { LoadPackages, savePack, updatePackages } from './Packages'
const Packages = () => {
  const [ventana, setVentana] = useState()
  const key = Cookies.get('key')
  const [data, setData] = useState([])
  const [item, setItem] = useState(null)
  const [open, setOpen] = useState(false)
  const [llave, setLlave] = useState(20)
  const Eliminar = (record) => {
    const auxData = data.filter((item) => item.key !== record.key)
    notification.open({
      message: 'Paquete Eliminado'
    })
    setData(auxData)
  }
  const Editar = (record) => {
    setOpen(true)
    setItem(record)
  }
  const showModal = () => {
    setOpen(true)
    setItem(null)
  }
  const LoadData = async () => {
    const dataPackages = await LoadPackages()
    setData(dataPackages)
  }
  const cancelModal = () => {
    setOpen(false)
    setItem(null)
  }
  const NewPackages = async (payload) => {
    setLlave(llave + 1)
    const newPackages = await savePack(payload);
    let newFecha = new Date()
    let dia = newFecha.getDate()
    let mes = newFecha.getMonth()
    let ano = newFecha.getUTCFullYear()
    let hora = newFecha.getHours()
    let minutos = newFecha.getMinutes()
    notification.open({
      message: 'Nuevo Paquete Agregado',
      description: <Space><Avatar size={30} src={newPackages.img} /> {newPackages.paquete}</Space>
    })
    let segundos = newFecha.getSeconds()
    newPackages.fecha = `${ano}/${mes}/${dia}     ${hora}:${minutos}:${segundos}`
    newPackages.key = llave
    const auxData = [...data]
    auxData.unshift({
      ...newPackages,
    })
    setData(auxData)

  }
  const WindowInner = () => {
    const ventana = window.innerWidth
    setVentana(ventana)
  }
  const SavePackages = async (payload) => {
    if (item === null) {
      NewPackages(payload)
      cancelModal()
    }
    else {
      EditarPackages({ ...payload, key: item.key })
      cancelModal()
    }

    cancelModal()
  }
  const EditarPackages = async (payload) => {
    const dataPackages = await updatePackages(payload)
    let newFecha = new Date()
    let dia = newFecha.getDate()
    let mes = newFecha.getMonth()
    let ano = newFecha.getUTCFullYear()
    let hora = newFecha.getHours()
    let minutos = newFecha.getMinutes()
    let segundos = newFecha.getSeconds()
    notification.open({
      message: 'Paquete Editado'
    })
    dataPackages.fecha = `${ano}/${mes}/${dia}     ${hora}:${minutos}:${segundos}`
    const auxData = [...data]
    const index = auxData.findIndex((item) => item.key === payload.key)
    auxData[index] = {
      ...dataPackages,

    }
    setData(auxData)

  }
  useEffect(() => {
    window.addEventListener('resize', () => WindowInner())
    const ventana = window.innerWidth
    setVentana(ventana)
    LoadData();
  }, []);
  const columns = [
    {
      title: "Vista",
      key: "imagen",
      width: '200px',
      dataIndex: 'imagen',
      render: (data, round) => (
        <Avatar size={64} src={round.img} />
      ),
    },
    {
      title: 'Paquetes',
      dataIndex: 'paquete',
      key: 'key',

    },
    {
      title: 'Fecha de modificacion',
      dataIndex: 'fecha',
      key: 'key',
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
            title="Estas seguro de Eliminar este Paquete?"
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
      key: "imagen",
      width: '200px',
      dataIndex: 'imagen',
      render: (data, round) => (
        <Avatar size={64} src={round.img} />
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
            title="Estas seguro de Eliminar este Paquete?"
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
          <Space size={'large'} direction='vertical' className='content-paquetes'>
            <Button type='primary' onClick={showModal} className="Nuevo" >Nuevo Paquete</Button>
            {ventana < 600 ?

              <Table
                columns={columnsResponsive1}
                dataSource={data}
                expandable={{
                  expandedRowRender: (item) => (
                    <>
                      <tr>
                        Paquete: {item.paquete}
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


            <ModalPackages cerrado={cancelModal} abierto={open} ok={SavePackages} employe={item} />
          </Space>}

    </>

  );
};

export default Packages;