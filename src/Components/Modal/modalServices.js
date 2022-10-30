import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import actividad1 from '../../Images/actividad1.jpg'
import actividad2 from '../../Images/actividad2.jpg'
import actividad3 from '../../Images/actividad3.jpg'
import actividad4 from '../../Images/actividad4.jpg'
import actividad5 from '../../Images/actividad5.jpg'
import actividad6 from '../../Images/actividad6.jpg'
import Bebida from '../../Images/Bebida.jpg'
import Bebida1 from '../../Images/bebida1.jpg'
import Boda2 from '../../Images/boda2.jpg'
import comida3 from '../../Images/comida3.jpg'
import comida from '../../Images/comida.jpg'
import casa2 from '../../Images/casa2.jpg'

const ModalServices = ({ abierto, cerrado, employe, ok }) => {
  const [form] = Form.useForm()
  const [dataField, setDataField] = useState(null)
  const onFormDataChange = (data) => {
    setDataField(data)
  };
  const onOk = async () => {
    form.validateFields().then((values) => {
      ok(values)
      setDataField(null)
    })
  }
  useEffect(() => {
    if (abierto) {
      if (employe === null) {

        form.resetFields()
      }
      else {
        setDataField({ ...employe })
        form.setFieldsValue({ ...employe })

      }
    }
  }, [abierto])

  return (
    <Modal
      title={employe == null ? 'Nuevo Servicio' : 'Datos del Servicio'}
      open={abierto}
      onOk={onOk}
      onCancel={cerrado}

    >
      <Form
        form={form}
        layout={"vertical"}
        initialValues={dataField}
        onValuesChange={onFormDataChange}>
        <Form.Item

          label="Servicio"
          name="title"
          rules={[
            {
              required: true,
              message: 'Porfavor escriba el nombre del servicio!',
            },
          ]}>
          <Input />
        </Form.Item>


        <Form.Item label="Seleccione una imagen"
          name="imagen">
          <Select style={{ width: 180 }}>
            <Select.Option value="/Images/actividad1.jpg"><img className='imagenSeleccionada' src={actividad1} /></Select.Option>
            <Select.Option value="/Images/actividad2.jpg"><img className='imagenSeleccionada' src={actividad2} /></Select.Option>
            <Select.Option value="/Images/actividad3.jpg"><img className='imagenSeleccionada' src={actividad3} /></Select.Option>
            <Select.Option value="/Images/actividad4.jpg"><img className='imagenSeleccionada' src={actividad4} /></Select.Option>
            <Select.Option value="/Images/actividad5.jpg"><img className='imagenSeleccionada' src={actividad5} /></Select.Option>
            <Select.Option value="/Images/actividad6.jpg"><img className='imagenSeleccionada' src={actividad6} /></Select.Option>
            <Select.Option value="/Images/Bebida.jpg"><img className='imagenSeleccionada' src={Bebida} /></Select.Option>
            <Select.Option value="/Images/bebida1.jpg"><img className='imagenSeleccionada' src={Bebida1} /></Select.Option>
            <Select.Option value="/Images/boda2.jpg"><img className='imagenSeleccionada' src={Boda2} /></Select.Option>
            <Select.Option value="/Images/comida.jpg"><img className='imagenSeleccionada' src={comida} /></Select.Option>
            <Select.Option value="/Images/comida3.jpg"><img className='imagenSeleccionada' src={comida3} /></Select.Option>
            <Select.Option value="/Images/casa2.jpg"><img className='imagenSeleccionada' src={casa2} /></Select.Option>
            <Select.Option value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstrP3jNrjepdIo1vC8-UB8eIB3kvRy9T3n6Da0xOz&s"><img className='imagenSeleccionada' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstrP3jNrjepdIo1vC8-UB8eIB3kvRy9T3n6Da0xOz&s' /></Select.Option>
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default ModalServices;