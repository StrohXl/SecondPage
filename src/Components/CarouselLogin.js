import React from 'react';
import { Carousel, Typography } from 'antd';
import svgImage1 from '../Images/undraw_add_user_re_5oib.svg'
import svgImage2 from '../Images/undraw_dashboard_re_3b76.svg'
import svgImage3 from '../Images/undraw_real_time_collaboration_c62i.svg'
import '../Styles/CarouselLogin.css'
const { Title } = Typography
const CarouselLogin = () => {
    return (
        <Carousel autoplay>
            <div className='content-ant-image-carousel'>
                <h4 style={{color: '#fff'}} >Agrega nuevas personas, servicios y paquetes</h4>
                <img src={svgImage1} className='ant-image-carousel' />
            </div>
            <div className='content-ant-image-carousel'>
                <h4  style={{color: '#fff'}} >Maneja un Dashboard confiable y seguro</h4>
                <img src={svgImage2} className='ant-image-carousel' />
            </div>
            <div className='content-ant-image-carousel'>
                <h4 style={{color: '#fff'}} >Accede desde cualquier dispositivo</h4>
                <img src={svgImage3} className='ant-image-carousel' />
            </div>
        </Carousel>
    );
};

export default CarouselLogin;