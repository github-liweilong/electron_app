import { Input } from 'antd';
import "./index.css";

const OutResult = (props) => {

    const { title, value } = props;

    return <div className='_outResult'>
        <div className="label">{title}</div>
        <div className="grid">
            <div>
                {
                    (value || []).map((item, m) => {
                        return <div key={m + 'row'}>
                            {
                                Array.isArray(item) ? <>
                                    {/* 表头部分 */}
                                    {m === 0 && <div className="userInput" key={m + 'header'}>
                                        {item.map((i, n) => {
                                            return <div key={n + 'cell'}>
                                                <Input size="small" readOnly style={{ cursor: 'default', borderRadius: 'inherit' }} value={"结果" + n}/>
                                            </div>
                                        })}
                                    </div>}

                                    {/* 数据展示部分 */}
                                    <div className="userInput">
                                        {item.map((i, n) => {
                                            return <div key={n}>
                                                
                                                <Input size="small" readOnly value={i} style={{ cursor: 'default', borderRadius: 'inherit' }}/>
                                            </div>
                                        })}
                                    </div>
                                </> : 
                                <>
                                    <div style={{ textAlign: 'left' }}>
                                        <Input size="small" style={{ cursor: 'default', borderRadius: 'inherit'}} readOnly key={m} value={item} />
                                    </div>
                                </>
                            }
                            
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default OutResult;
