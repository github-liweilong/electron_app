import { InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import "./index.css";

/**
 * 返回输入 例:[1,2,3]
 * @param {*} props 
 * @returns 
 */
const InputStringArray = (props) => {
    const { value, onChange, title } = props;

    const addCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if(data.length > 4) {
            return;
        }
        data.push({x: 0, y: 0});

        onChange(data);
    }

    const deleteCol = () => {
        const data = JSON.parse(JSON.stringify(value));
        if (data.length < 2) {
            return;
        }
        data.pop();

        onChange(data);
    }

    const changeValue = (num, type, v) => {
        const data = JSON.parse(JSON.stringify(value));
        if (type === 'x') {
            data[num].x = v;
        }
        if (type === 'y') {
            data[num].y = v;
        }

        onChange(data);
    }

    return <div className='_inputStringArray'>
        <div className="label">{title}</div>
        <div className="grid">
            <div style={{ textAlign: 'left' }}>
                {
                    (value || []).map((item, m) => {
                        return <div key={m}>
                            x: <InputNumber size="small" style={{ width: '100px', marginRight: '10px', borderRadius: 'inherit' }} value={item.x} onChange={(v) => { changeValue(m, 'x', v) }} />
                            y: <InputNumber size="small" style={{ width: '100px', borderRadius: 'inherit' }} value={item.y} onChange={(v) => { changeValue(m, 'y', v) }} />
                        </div>
                    })
                }
            </div>
            <div style={{ textAlign: 'left' }}>
                <PlusOutlined className="add" onClick={addCol} />
                <MinusOutlined className="add" onClick={deleteCol} />
            </div>
        </div>
    </div>

}

export default InputStringArray;
