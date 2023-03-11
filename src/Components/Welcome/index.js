import React, { useState } from 'react';
import './styles.css'
import { Space, Typography, Button, Modal, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Title } = Typography
const Welcome = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const abrir = () => {
        setOpen(true)
    }
    const cerrar = () => {
        setOpen(false)
    }
    return (
        <div className='welcome'>
            <Space direction={'vertical'} className='content-title'>
                <Title>Bienvenido al dashboard de Parque nacional mochima</Title>
                <div className='welcomeResponsive'>
                    <Title level={4}>Para iniciar la gestion de los archivos presione aqui </Title>
                    <Button shape='round' className='iniciar' onClick={abrir}>Iniciar</Button>
                    <Modal className='modalWelcome'
                        open={open}
                        onCancel={cerrar}
                        okText='hola'
                        footer={null}
                        title='Seleccione una opcion'
                    >
                    
                        <Row justify='around'>
                            <Col className='welcomeCol' span={7}>
                                <Button shape='round' onClick={() => { setOpen(false); navigate('/Services') }} >
                                    Servicios
                                </Button>
                            </Col>
                            <Col className='welcomeCol' span={10}>
                                <Button shape='round' onClick={() => { setOpen(false); navigate('/List') }} >
                                    Lista de reservaciones
                                </Button>
                            </Col>
                    
                            <Col className='welcomeCol' span={7}>
                                <Button shape='round' onClick={() => { setOpen(false); navigate('/Packages') }}>
                                    Paquetes
                                </Button>
                            </Col>
                        </Row>
                    
                    
                    </Modal>
                    
                </div>            </Space>


        </div>
    );
};

export default Welcome;