import { useState } from "react";
import { InputNumber, Button } from "antd";
import { ridgeRegression } from "../../Module/RidgeRegression";
import OutResult from "../OutResult";
import MyCanves from "../../MyCanves";
import ChangeTableOne from "../ChangeTableOne";
import ChangeTableTwo from "../ChangeTableTwo";

import "./index.css";

const RidgeRegressionComponent = () => {
    const [inputParam1, setInputParam1] = useState([[0]]);
    const [inputParam2, setInputParam2] = useState([0]);
    const [inputParam3, setInputParam3] = useState(0);
    const [resultValue, setResultValue] = useState([0]);

    // 步骤1、2、3
    const [step, setStep] = useState(1);

    const computeResult = (value, type) => {
        let param1 = inputParam1;
        let param2 = inputParam2;
        let alpha = inputParam3;
        if (type === 1) {
            param1 = value;
        }

        if (type === 2) {
            param2 = value;
        }

        if (type === 3) {
            alpha = value;
        }
        if (!alpha) {
            return;
        }

        // 创建套索回归模型并训练
        const lassoRegression = ridgeRegression(param1, param2, alpha);

        if (Array.isArray(lassoRegression._data)) {
            setResultValue(lassoRegression._data);
        }
    }

    return <>
        <div style={{ textAlign: 'right' }}>
            <Button size="small" style={{ margin: '0 10px 0 0', borderRadius: 'inherit' }} disabled={step === 1} onClick={() => { setStep(step - 1) }}>上一步</Button>
            <Button size="small" style={{ margin: '0 20px 0 0', borderRadius: 'inherit' }} disabled={step === 3} onClick={() => {
                setStep(step + 1);
                if (step >= 3) {
                    computeResult(0, 0);
                }
            }}>{step >= 3 ? '完成' : '下一步'}</Button>
        </div>
        {step === 1 && <>
            <div>
                <ChangeTableTwo title="输入:" value={inputParam1} onChange={(value) => { setInputParam1(value); }} />
            </div>
            <div>
                <ChangeTableOne title="输出:" value={inputParam2} onChange={(value) => { setInputParam2(value); }} />
            </div>
        </>}
        {step === 2 && <div className='_inputNumber'>
            <div className="label">alpha:</div>
            <div className="grid">
                <InputNumber size="small" value={inputParam3} onChange={(v) => { setInputParam3(v); }} />
            </div>
        </div>}
        {step === 3 && <div>
            <OutResult title="结果：" value={resultValue} />
            <MyCanves />
        </div>}
    </>
}

export default RidgeRegressionComponent;
