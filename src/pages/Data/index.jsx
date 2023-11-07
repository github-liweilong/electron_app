import { Button, Input } from "antd";
import { useEffect, useState } from "react";

const Data = () => {

    const [value, setValue] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        // 打开端口
        window.electronAPI.openPort();
        // 监听端口消息
        window.electronAPI.receiveMainMsg((message) => {
            setMsg(message);
        })

        // window.electronAPI.onUpdateCounter((_event, value) => {
        //     console.log(value)
        // })
    }, [])

    return <div>
        <Input value={value} onChange={(val) => {console.log(val); setValue(val.target.value)}}></Input>
        <Button onClick={() => {
            window.electronAPI.setTitle(value)
        }}>向端口发送消息</Button>
        <Button onClick={() => {window.electronAPI.openPort()}}>打开端口</Button>
        <div>{JSON.stringify(msg)}</div>
    </div>
}

export default Data;
