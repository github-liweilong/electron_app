import { useEffect, useState } from "react";
import { Table, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import "./index.css";

const ChangeTableTwo = (props) => {
    const {
        title,
        value,
        onChange,
    } = props;

    const [columns, setColumns] = useState([{
        title: '参数1',
        dataIndex: 'name',
        key: 'name',
    }]);
    const [data, setData] = useState([[0]]);
    const [tableWidth, setTableWidth] = useState(92);

    const changeValue = (x, y, v) => {
        const data = JSON.parse(JSON.stringify(value));
        data[x][y] = v;

        onChange(data);
    }

    useEffect(() => {
        let tableWidth = 0;
        const newColumn = [];
        const tableData = [];

        // 确定是有效二维数组
        if (Array.isArray(value) && value.length > 0 && value[0].length > 0) {
            value[0].forEach((e, index) => {
                newColumn.push({
                    title: `参数${index + 1}`,
                    dataIndex: `param${index + 1}`,
                    key: `param${index + 1}`,
                    render: (text, record) => {
                        return <InputNumber value={text} onChange={(v) => { changeValue(record.key, index, v) }} />
                    },
                })

                tableWidth += 92;
            });
            for (let i = 0; i < value.length; i++) {
                let cell = { key: i };
                for (let j = 0; j < value[i].length; j++) {
                    cell = Object.assign(cell, { [`param${j + 1}`]: value[i][j] });
                }
                tableData.push(cell);
            }

            setColumns(newColumn);
            setData(tableData);
            setTableWidth(tableWidth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const addCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (Array.isArray(value) && value.length > 0 && value[0].length > 0) {
            for (let i = 0; i < value.length; i++) {
                data[i].push(0);
            }
        }

        onChange(data);
    }

    const deleteCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (Array.isArray(value) && value.length > 0 && value[0].length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (value[i].length > 1) {
                    data[i].pop();
                }
            }
        }

        onChange(data);
    }

    const addRow = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (Array.isArray(value) && value.length > 0 && value[0].length > 0) {
            const row = [];
            for (let i = 0; i < value[0].length; i++) {
                row.push(0);
            }
            data.push(row);
        }

        onChange(data);
    }

    const deleteRow = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (Array.isArray(value) && value.length > 0 && value[0].length > 0) {
            if (data.length > 1) {
                data.pop();
            }
        }

        onChange(data);
    }

    return <div className="change_table_body" style={{ margin: '10px 0px' }}>
        <div style={{ width: '100px', display: 'inline-block', textAlign: 'center', verticalAlign: 'top' }}>
            <div>{title}</div>
            <div>
                <span>列</span>
                <PlusOutlined className="addRow" onClick={addCol} />
                <MinusOutlined className="addRow" onClick={deleteCol} />
            </div>
            <div>
                <span>行</span>
                <PlusOutlined className="addRow" onClick={addRow} />
                <MinusOutlined className="addRow" onClick={deleteRow} />
            </div>
        </div>
        <Table className="table" style={{ width: `${tableWidth}px`, display: 'inline-block' }} pagination={false} columns={columns} bordered size="small" dataSource={data} />
    </div>
}

export default ChangeTableTwo;
