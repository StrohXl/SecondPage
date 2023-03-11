import React,{useState,useEffect} from 'react';
import { Upload, Form, Input, Modal, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ModalPackages = ({abierto,cerrado, employe, ok}) => {
  const [form] = Form.useForm()
  const [dataDefault, setDataDefault] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(false);
  const onFormDataChange = (data) => {
		setDataDefault(data)
	};
  const onOk = async () => {
		form.validateFields().then((values) => {
      ok({ ...values, img: imageUrl })
			setDataDefault(null)
		})
	}
  useEffect(() => {
		if (abierto) {
			if (employe === null) {
				form.resetFields()
        setDataDefault(null)
        setImageUrl(null)
			}
      else{
        setDataDefault({...employe})
        form.setFieldsValue({ ...employe })
        setImageUrl(employe.img)
      }
      
		}
	}, [abierto])
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };
  const handleChangeImg = (info) => {
    getBase64(info.fileList[0].originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };
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
  
        <Form.Item label="Seleccione una imagen">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeImg}
            maxCount={1}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>

        </Form.Item>
       </Form>
       </Modal>
    );
};

export default ModalPackages;