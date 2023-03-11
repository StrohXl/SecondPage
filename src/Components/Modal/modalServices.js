import React, { useState, useEffect } from 'react';
import { Upload, Form, Input, Modal, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const ModalServices = ({ abierto, cerrado, employe, ok }) => {
  const [form] = Form.useForm()
  const [dataField, setDataField] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(false);
  const onFormDataChange = (data) => {
    setDataField(data)
  };
  
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
  const onOk = async () => {
    form.validateFields().then((values) => {
      ok({ ...values, img: imageUrl })
      setDataField(null)
    })
  }
  useEffect(() => {
    if (abierto) {
      if (employe === null) {
        setDataField(null)
        setImageUrl(null)
        form.resetFields()
      }
      else {
        setDataField({ ...employe })
        form.setFieldsValue({ ...employe })
        setImageUrl(employe.img)
      }
    }
    else {
      setDataField(null)
      form.resetFields()
      setImageUrl(null)
    }
  }, [abierto])  
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

export default ModalServices;