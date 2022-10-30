import React,{useState,useEffect} from 'react';
import {Form, Input, Modal,Select } from 'antd';
import paquete1 from '../../Images/images1.jpeg'
import paquete2 from '../../Images/images2.jpeg'
import paquete3 from '../../Images/images3.jpeg'
import paquete4 from '../../Images/images4.jpeg'
import paquete5 from '../../Images/paquete2.jpg'
import paquete6 from '../../Images/paquete3.jpg'
import paquete7 from '../../Images/paquetes5.jpeg'

const ModalPackages = ({abierto,cerrado, employe, ok}) => {
  const [form] = Form.useForm()
  const [dataDefault, setDataDefault] = useState(null)
  const onFormDataChange = (data) => {
		setDataDefault(data)
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
      else{
        setDataDefault({...employe})
        form.setFieldsValue({ ...employe })

      }
		}
	}, [abierto])



    return (
       <Modal 
       title={employe == null? 'Nuevo Paquete': 'Datos del Paquete'}
       open={abierto}
       onOk={onOk}
       onCancel={cerrado}
    
       >    
       <Form 
       layout={"vertical"}
        form={form}
        initialValues={dataDefault}
        onValuesChange={onFormDataChange}
       >
        <Form.Item  
        label="Paquete"
        name="paquete"
        rules={[
          {
            required: true,
            message: 'Porfavor escriba el nombre del paquete!',
          },
        ]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Seleccione una imagen"
          name="imagen">
          <Select style={{ width: 180 }}>
            <Select.Option value="../../Images/images1.jpeg"><img className='imagenSeleccionada' src={paquete1} /></Select.Option>
            <Select.Option value="../../Images/images2.jpeg"><img className='imagenSeleccionada' src={paquete2} /></Select.Option>
            <Select.Option value='../../Images/images3.jpeg'><img className='imagenSeleccionada' src={paquete3} /></Select.Option>
            <Select.Option value='../../Images/images4.jpeg'><img className='imagenSeleccionada' src={paquete4} /></Select.Option>
            <Select.Option value='../../Images/paquete2.jpg'><img className='imagenSeleccionada' src={paquete5} /></Select.Option>
            <Select.Option value='../../Images/paquete3.jpg'><img className='imagenSeleccionada' src={paquete6} /></Select.Option>
            <Select.Option value='../../Images/paquetes5.jpeg'><img className='imagenSeleccionada' src={paquete7} /></Select.Option>
  
          </Select>
        </Form.Item>
       </Form>
       </Modal>
    );
};

export default ModalPackages;