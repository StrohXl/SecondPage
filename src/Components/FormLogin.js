import React from 'react';
import { Button, Form, Input, } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const FormLogin = ({onFinish}) => {
    return (
        <Form
        layout={'vertical'}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"

    >
        <Form.Item
            name="username"
            rules={[
                {
                  required: true,
                  message: 'Porfavor escriba su nombre de usuario!',
                },
              ]}
        >
            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Nombre de Usuario' />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
                {
                  required: true,
                  message: 'Porfavor escriba su contrasena de usuario!',
                },
              ]}

        >
            <Input size='large' prefix={<LockOutlined className="site-form-item-icon" />}
                type="password" placeholder='Contrasena de Usuario' />
        </Form.Item>



        <Form.Item
        >
            <Button  size={'large'} type="primary" htmlType="submit"  >
                Ingresar
            </Button>
        </Form.Item>
    </Form>
    );
};

export default FormLogin;