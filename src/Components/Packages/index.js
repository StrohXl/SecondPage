import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Avatar } from 'antd'
import ModalPackages from '../Modal/modalPackages'
import './styles.css'
import { LoadPackages, savePack, updatePackages } from './Packages'
const Packages = () => {
  const [data, setData] = useState([])
  const [item, setItem] = useState(null)
  const [open, setOpen] = useState(false)
  const [llave, setLlave] = useState(20)
  const Eliminar = (record) => {
    const auxData = data.filter((item) => item.key !== record.key)
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
    let segundos = newFecha.getSeconds()
    newPackages.fecha = `${ano}/${mes}/${dia}     ${hora}:${minutos}:${segundos}`
    newPackages.key = llave
    const auxData = [...data]
    auxData.unshift({
      ...newPackages,
    })
    setData(auxData)

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
    dataPackages.fecha = `${ano}/${mes}/${dia}     ${hora}:${minutos}:${segundos}`
    const auxData = [...data]
    const index = auxData.findIndex((item) => item.key === payload.key)
    auxData[index] = {
      ...dataPackages,

    }
    setData(auxData)

  }

  useEffect(() => { LoadData() }, [])
  const columns = [
    {
      title: "Vista",
      key: "imagen",
      width: '200px',
      dataIndex: 'imagen',
      render: (data, round) => (
        <Avatar className='imagen' src={round.img} />
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

    <Space size={'large'} direction='vertical' className='content-paquetes'>
      <Button onClick={showModal} className="Nuevo" >Nuevo Paquete</Button>
      <Table columns={columns} dataSource={data} />
      <ModalPackages cerrado={cancelModal} abierto={open} ok={SavePackages} employe={item} />
    </Space>



  );
};

export default Packages;