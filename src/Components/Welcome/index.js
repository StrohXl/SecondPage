import React, { useState } from 'react';
import './styles.css'
import Cookies from 'js-cookie';
import { Space, Typography, Button, Modal, Row, Col, Card } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom';
const { Meta } = Card;
const { Title } = Typography
const Welcome = () => {
    const key = Cookies.get('key')
    const [see, setSee] = useState(false)
    const [card, setCard] = useState(false)
    const CardInfo = [
        {
            title: 'Ultimo Servicio Agregado',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultimo Paquete Agregado',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultima Persona Agregada',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultimo Servicio Modificado',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultimo Paquete Modificado',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultima Persona Modificada',
            description: 'xavier -> John'
        },
        {
            title: 'Ultimo Paquete Modificado',
            description: 'jkalsjdfk'
        },
        {
            title: 'Ultima Persona Modificada',
            description: 'xavier -> John'
        }
    ]
    setTimeout(() => { setSee(true) }, 1500)
    setTimeout(() => { setCard(true) }, 2000)
    return (
        <>
            {
                key == undefined ?
                    <Navigate to='/SecondPage/Login' /> :
                    <div className='welcome'>
                        <div className={`content-title-welcome ${see ? ' content-title-welcome-active' : ''}`}>
                            <h1>
                                Bienvenido!
                            </h1>
                        </div>
                        <Row justify={'space-around'}  gutter={[16, 16]}  wrap >
                            {CardInfo.map((i, index) => {
                                return (
                                    <Col key={index} >
                                        <Card 
                                    
                                        hoverable title={i.title} 
                                        className={`welcome-row-col-card ${card? ' welcome-row-col-card-active':''}`}>
                                            <Meta description={i.description} />
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
            }

        </>


    );
};

export default Welcome;