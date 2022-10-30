import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';

const ModalList = ({ abierto, cerrado, ok, employe, }) => {

  const [form] = Form.useForm();
  const { Option } = Select;
  const [dataDefault, setDataDefault] = useState(null);
  const onFormDataChange = (data) => {
    setDataDefault(data);
  };

  const onOk = async () => {
    form.validateFields().then((values) => {
      ok(values)
      setDataDefault(null)
    })
  }
  useEffect(() => {
    if (abierto) {
      if (employe === null) {
        form.resetFields()
      }
      else {
        setDataDefault({ ...employe })
        form.setFieldsValue({ ...employe })
      }
    }
  }, [abierto])

  return (
    <Modal
      title={employe == null ? 'Nueva reservacion' : 'Datos de reservacion'}
      open={abierto}
      onOk={onOk}

      onCancel={cerrado}
    >
      <Form
        form={form}
        initialValues={dataDefault}
        onValuesChange={onFormDataChange}
        layout={"vertical"}>
        <Form.Item
          hasFeedback
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Porfavor escriba su nombre!',
            },
          ]}>
          <Input placeholder='Introduzca su nombre' />
        </Form.Item>
        <Form.Item
          label="Cedula"
          name="cedula"

          hasFeedback
          rules={[
            {
              required: true,
              message: 'Porfavor escriba su Cedula',
            },
          ]}>
          <Input placeholder='Introduzca su cedula' />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Nro. De telefono"
          name="telefono"

          rules={[
            {
              required: true,
              message: 'Porfavor escriba su numero de telefono',
            },
          ]}>
          <Input placeholder='Introduzca su numero de telefono' />
        </Form.Item>
        <Form.Item
          label="Dias reservados"
          hasFeedback
          name="dias"
          rules={[
            {
              required: true,
              message: 'Porfavor seleccione los dias reservados',
            },
          ]}>
          <Select
            placeholder="Max:20"

            allowClear
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
            <Option value="13">13</Option>
            <Option value="14">14</Option>
            <Option value="15">15</Option>
            <Option value="16">16</Option>
            <Option value="17">17</Option>
            <Option value="18">18</Option>
            <Option value="19">19</Option>
            <Option value="20">20</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Personas reservadas"
          hasFeedback
          name="personas"
          rules={[
            {
              required: true,
              message: 'Porfavor seleccione la cantidad personas reservadas',
            },
          ]}>
          <Select
            placeholder="Max:10"

            allowClear
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select>
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default ModalList;