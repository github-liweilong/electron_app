import { InputNumber, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import "./index.css";

/**
 * 返回输入 例:[1,2,3]
 * @param {*} props 
 * @returns 
 */
const InputArray = (props) => {
    const { value, onChange, title } = props;

    const addCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if(data.length > 4) {
            return;
        }
        data.push(0);

        onChange(data);
    }

    const deleteCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (data.length < 2) {
            return;
        }
        data.pop(0);

        onChange(data);
    }

    const changeValue = (x, v) => {
        const data = JSON.parse(JSON.stringify(value));
        data[x] = v;

        onChange(data);
    }

    return <div className='_inputArray'>
        <div className="label">{title}</div>
        <div className="grid">
            <div style={{ alignItems: 'left', width: '500px' }}>
                <div style={{ textAlign: 'left' }}>
                    {
                        (value || []).map((item, m) => {
                            return <Input readOnly key={m} size="small" style={{ width: '90px', cursor: 'default', borderRadius: 'inherit' }} value={'参数' + (m + 1)}/>
                        })
                    }
                </div>
                <div style={{ textAlign: 'left' }}>
                    {
                        (value || []).map((item, m) => {
                            return <InputNumber style={{ borderRadius: 'inherit' }} key={m} size="small" value={item} onChange={(v) => { changeValue(m, v) }} />
                        })
                    }
                </div>
                <div style={{ textAlign: 'left' }}>
                    <PlusOutlined className="add" onClick={addCol} />
                    <MinusOutlined className="add" onClick={deleteCol} />
                </div>
            </div>
        </div>
    </div>

}

export default InputArray;
