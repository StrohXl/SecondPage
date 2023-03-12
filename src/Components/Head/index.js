import React, { useState } from 'react';
import { Menu, Typography } from 'antd'
import './styles.css'
import './responsive.css'
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
const Head = () => {
    let navigate = useNavigate()
    const { Title } = Typography
    const [open, setOpen] = useState(false)
    const menuResponsive = () => {
        setOpen(!open)
    }
    return (
        <div className='Head'>
            <Title level={3} className='titulo0'>Parque nacional <span className='titulo1'>MOCHIMA</span></Title>
            <Menu className='Menu' theme='dark' mode="horizontal" defaultSelectedKeys={['mail']}>
                <Menu.Item onClick={() => navigate('/SecondPage/')}>
                    Inicio
                </Menu.Item>
                <Menu.Item onClick={() => navigate('/SecondPage/Services')} >

                    Servicios
                </Menu.Item>
                <Menu.Item onClick={() => navigate('/SecondPage/Packages')}>
                    Paquetes
                </Menu.Item>
                <Menu.Item onClick={() => navigate('/SecondPage/List')}>
                    Lista de reservaciones
                </Menu.Item>
              
            </Menu>
            <GiHamburgerMenu className='burger' onClick={menuResponsive} />
            <ul className={`menuResponsive ${open ? ' menuResponsiveOpen' : ''}`}>
                <li className='menuItemResponsive' onClick={()=>{navigate('/SecondPage/'); setOpen(false)}}>Inicio</li>
                <li className='menuItemResponsive' onClick={()=>{navigate('/SecondPage/Services'); setOpen(false)}}>Servicios</li>
                <li className='menuItemResponsive' onClick={()=>{navigate('/SecondPage/Packages'); setOpen(false)}}>Paquetes</li>
                <li className='menuItemResponsive' onClick={()=>{navigate('/SecondPage/List'); setOpen(false)}}>Lista de reservaciones</li>
            </ul>
        </div>

    );
};

export default Head;