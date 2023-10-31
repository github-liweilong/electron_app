import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import UtilModule from "../UtilModule";

const Home = () => {
    const [winHeight, setWinHeight] = useState(360);

    useEffect(() => {
        setWinHeight(window.innerHeight);

        window.addEventListener('resize', () => {
            setWinHeight(window.innerHeight);
        })

        sessionStorage.setItem('qiwang', 'false');
    }, [])

    return (
        <Layout>
            <div style={{ height: winHeight - 28, background: '#C4C4C4' }}>
                <UtilModule height={winHeight - 25} />
            </div>
            <div style={{ height: '25px', background: '#F0F0F0', border: '2px inset' }}></div>
        </Layout>
    );
};

export default Home;
