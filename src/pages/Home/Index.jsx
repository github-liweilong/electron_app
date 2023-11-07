import React, { useEffect, useState } from "react";
import { Button, Layout, Tabs } from 'antd';
import UtilModule from "../UtilModule";
import Data from "../Data";

const Home = () => {
    const [winHeight, setWinHeight] = useState(360);
    const [activeKey, setActiveKey] = useState('2');

    useEffect(() => {
        setWinHeight(window.innerHeight);

        window.addEventListener('resize', () => {
            setWinHeight(window.innerHeight);
        })

        sessionStorage.setItem('qiwang', 'false');
    }, [])

    const onChange = (key) => {
        setActiveKey(key);
    };

    return (
        <Layout>
            <Tabs
                activeKey={activeKey}
                items={[
                    {
                        key: '2',
                        label: '算法工程师',
                        children: <>
                            <div style={{ height: winHeight - 28, background: '#C4C4C4' }}>
                                <UtilModule height={winHeight - 25} />
                            </div>
                            <div style={{ height: '25px', background: '#F0F0F0', border: '2px inset' }}></div>
                        </>,
                    },
                    {
                        key: '3',
                        label: '模拟数据监控',
                        children: <Data></Data>
                    }
                ]}
                onChange={onChange}
            />
            {/* <Button onClick={() => {
                window.myApi.sendMsg('message');
                window.electronAPI.setTitle('11111111');
            }}>xxxxxx</Button> */}
            
        </Layout>
    );
};

export default Home;
