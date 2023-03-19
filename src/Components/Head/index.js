import React, { useState } from 'react';
import { Drawer, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom';
import './styles.css'
import './responsive.css'
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import Cookies from 'js-cookie';
const Head = () => {
    let navigate = useNavigate()
    const { Title } = Typography
    const items = [

        {
            label: <Link to='/SecondPage/Services'>  Servicios</Link>,
            key: 2
        },
        {
            label: <Link to='/SecondPage/Packages'> Paquetes</Link>,
            key: 3
        },
        {
            label: <Link to='/SecondPage/List'>  Lista de reservaciones</Link>,
            key: 4
        },
        {
            label: <a href='/SecondPage/Login' onClick={() => Salir()}>  Salir</a>,
            key: 5
        },

    ]
    const itemsresponsive = [

        {
            label: <Link to='/SecondPage/Services' onClick={() => menuResponsive()}>  Servicios</Link>,
            key: 2
        },
        {
            label: <Link to='/SecondPage/Packages' onClick={() => menuResponsive()}> Paquetes</Link>,
            key: 3
        },
        {
            label: <Link to='/SecondPage/List' onClick={() => menuResponsive()}>  Lista de reservaciones</Link>,
            key: 4
        },
        {
            label: <a href='/SecondPage/Login' onClick={() => Salir()}>  Salir</a>,
            key: 5
        },

    ]
    const [open, setOpen] = useState(false)
    const menuResponsive = () => {
        setOpen(!open)
    }
    const Salir = () => {
        Cookies.remove('key')
    }
    return (
        <div className='Head'>
            <h1 className='titulo1'>Crud
                <span>
                    Mochima
                </span>
            </h1>
            <Menu className='Menu' theme='dark' mode="horizontal" items={items} />
            <GiHamburgerMenu className='burger' onClick={menuResponsive} />
            <Drawer width={250} bodyStyle={{ padding: '0', background: '#001529'}} headerStyle={{ display: 'none' }} open={open} onClose={menuResponsive}>
                <h1 className='titulo1' style={{justifyContent: 'center'}}>Crud
                    <span>
                        Mochima
                    </span>
                </h1>
                <Menu theme='dark'  className='Menu2'  mode="inline" items={itemsresponsive} />

            </Drawer>
        </div>

    );
};

export default Head;