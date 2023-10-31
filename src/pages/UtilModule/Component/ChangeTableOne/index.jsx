import { useEffect, useState } from "react";
import { Table, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import "./index.css";

const ChangeTableOne = (props) => {
    const {
        title,
        value,
        onChange,
        arrayNumber = 'one', // one一维，two二维
    } = props;

    const [columns, setColumns] = useState([{
        title: '参数1',
        dataIndex: 'name',
        key: 'name',
    }]);
    const [data, setData] = useState([0]);
    const [tableWidth, setTableWidth] = useState(92);

    const changeValue = (x, v) => {
        const data = JSON.parse(JSON.stringify(value));
        data[x] = v;

        onChange(data);
    }

    useEffect(() => {
        if (arrayNumber === 'one') {
            let tableWidth = 0;
            const newColumn = [];
            const tableData = [];
            let cell = {key: 0};

            value.forEach((e, index) => {
                newColumn.push({
                    title: `参数${index + 1}`,
                    dataIndex: `param${index + 1}`,
                    key: `param${index + 1}`,
                    render: (text) => {
                        return <InputNumber value={text} onChange={(v) => { changeValue(index, v) }} />
                    },
                })

                cell = Object.assign(cell, {[`param${index + 1}`]: e});
                tableWidth += 92;
            });
            tableData[0] = cell;

            setColumns(newColumn);
            setData(tableData);
            setTableWidth(tableWidth);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const addCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (arrayNumber === 'one') {
            data.push(0);
        }

        onChange(data);
    }

    const deleteCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (arrayNumber === 'one' && data.length > 1) {
            data.pop();
        }

        onChange(data);
    }

    return <div className="change_table_body" style={{ margin: '10px 0px' }}>
        <div style={{ width: '100px', display: 'inline-block', textAlign: 'center', verticalAlign: 'top' }}>
            <div>{title}</div>
            <div>
                <PlusOutlined className="addRow" onClick={addCol} />
                <MinusOutlined className="addRow" onClick={deleteCol} />
            </div>
        </div>
        <Table className="table" style={{ width: `${tableWidth}px`, display: 'inline-block' }} pagination={false} columns={columns} bordered size="small" dataSource={data} />
    </div>
}

export default ChangeTableOne;
