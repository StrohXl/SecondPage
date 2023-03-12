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
        { name: 'Inicio', path: '/SecondPage/' },
        { name: 'Servicios', path: '/SecondPage/Services' },
        { name: 'Paquetes', path: '/SecondPage/Packages' },
        { name: 'Lista', path: '/SecondPage/List' },
    ]
    useEffect(() => {
        const option = options.find((item) => location.pathname === item.path)
        setNameLocation(option.name)
    }, [location])
    return (
        <Breadcrumb>
            <Breadcrumb.Item className='inicio'disabled onClick={()=>navigate('/SecondPage/')}><HomeOutlined/> Inicio</Breadcrumb.Item>
            {nameLocation !== "Inicio" && ( 
            <Breadcrumb.Item>{nameLocation}</Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Crumb;