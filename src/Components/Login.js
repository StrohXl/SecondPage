import { message, Col, Row, Button } from 'antd';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import CarouselLogin from './CarouselLogin';
import React from 'react'
import '../Styles/Login.css'
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import FormLogin from './FormLogin';
const Login = () => {
    const [valueCol1, setValueCol1] = useState(8)
    const [valueCol2, setValueCol2] = useState(16)
    const key = Cookies.get('key')
    const error = () => {
        message.error('Datos incorrectos');
    };
    const navigate = useNavigate()
    const ChangeWindow = () => {
        const ventana = window.innerWidth
        if (ventana < 800) {
            setValueCol1(24)
            setValueCol2(24)
        }
        else {
            setValueCol1(8)
            setValueCol2(16)
        }
    }
    useEffect(() => {
        const ventana = window.innerWidth
        if (ventana < 800) {
            setValueCol1(24)
            setValueCol2(24)
        }
        else {
            setValueCol1(8)
            setValueCol2(16)
        }
        window.addEventListener('resize', () => ChangeWindow())
    }, [])


    const onFinish = (values) => {
        if (values.username == 'admin' && values.password == 'admin') {
            Cookies.set('key', `${values}`)
            navigate('/SecondPage/Services')
        }
        else {
            error()
        }
    };
    return (
        <>
            {
                key != undefined ?
                    <Navigate to='/SecondPage/' />
                    :
                    <div className='login'>
                        <Row className='row' wrap>
                            <Col className='col-form'>
                                <div className='content-form'>
                                    <div className='element1'>Ingresar Cuenta <UserOutlined className="element1__icon" /></div>
                                    <div className='content-form-title'>
                                        <span>Crud</span>
                                        <span>Mochima</span>
                                    </div>
                                    <FormLogin onFinish={onFinish} />
                                    <div className='element3'>
                                        <div></div>
                                        Visitar pagina principal
                                        <div></div>
                                    </div>
                                    <a href='http://strohxl.github.io/MyFirstPage/'>
                                        <Button style={{marginTop: '1rem'}} >Visitar</Button>
                                    </a>
                                </div>
                            </Col>
                            <Col className='col-info'>
                                <CarouselLogin />
                            </Col>
                        </Row>

                    </div>

            }
        </>
    );
};

export default Login;