import React, { useState } from 'react';
import { Layout, Space } from 'antd'
import Head from '../Head'
import { useLocation } from 'react-router-dom';
import Crumb from '../Breadcrumb';
import './styles.css'
import './responsive.css'
const { Header, Content, Footer } = Layout
const Layaout = (props) => {
    const location = useLocation()
    const [clase,setClase]=useState('')
    let cont = "ini"
    let foter = 'iniciooooo'
    if (location.pathname === "/") {
        cont = "inicio"
        foter = "inicioFooter"
 
    }
    else if (location.pathname === "/Services") {
        cont = "serviciosContenido"
        foter = "serviciosFooter"
       
    }
    else if (location.pathname === "/Packages") {
        cont = "paquetesContenido"
        foter = "paquetesFooter"
       
    }
    else {
        cont = "listaContenido"
        foter = "listaFooter"
       
    }
    return (
        <>
            <Header><Head /></Header>
            <Content className={cont}>
                <Space className='content-crumb' size={'small'} direction={'vertical'}> <Crumb /> </Space>

                {props.children}
            </Content>
            <Footer className={foter} >
                <div className="creado">
                    PARQUE NACIONAL MOCHIMA ©2022 Created by Xavier Mayora
                </div>
            </Footer>
        </>

    );
};

export default Layaout;