import { Breadcrumb } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons'



const Crumb = () => {
    let navigate=useNavigate()
    const location = useLocation()
    const [nameLocation, setNameLocation] = useState('Inicio')
    const options = [
        { name: 'Inicio', path: '/' },
        { name: 'Servicios', path: '/Services' },
        { name: 'Paquetes', path: '/Packages' },
        { name: 'Lista', path: '/List' },
        { name: 'prueba', path: '/prueba' },
    ]
    useEffect(() => {
        const option = options.find((item) => location.pathname === item.path)
        setNameLocation(option.name)
    }, [location])
    return (
        <Breadcrumb>
            <Breadcrumb.Item className='inicio'disabled onClick={()=>navigate('/')}><HomeOutlined/> Inicio</Breadcrumb.Item>
            {nameLocation !== "Inicio" && ( 
            <Breadcrumb.Item>{nameLocation}</Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Crumb;