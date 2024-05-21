// import React, { FC } from 'react';
import Header from '../../component/header/Header'
import Upcoming from '../../component/upcoming/Upcoming'
import Blog from '../../component/blog/Blog'
import Brand from '../../component/brands/Brand'
import MakeEventImage from '../../component/addeventimage/MakeEventImage'
import Filter from '../../component/filter/Filter'


const Home = ()=> {
    return (
        // testing commnet
        <>
            <Header></Header>
            <Filter></Filter>
            <Upcoming></Upcoming>
            <MakeEventImage/>
            <Brand></Brand>
            <Blog/>
        </>
    );
}

export default Home;