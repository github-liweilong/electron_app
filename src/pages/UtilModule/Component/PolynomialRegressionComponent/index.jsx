import { useState } from "react";
import { InputNumber } from "antd";
import { polynomialRegression } from "../../Module/PolynomialRegression";
import InputStringArray from "../InputStringArray";
import OutResult from "../OutResult";
import { Button } from "antd";
import MyCanves from "../../MyCanves";

import "./index.css";

/**
 * 多项式回归模型
 * @returns 
 */
const PolynomialRegressionComponent = () => {

    const [inputParam1, setInputParam1] = useState([{ x: 0, y: 0 }]);
    const [inputParam2, setInputParam2] = useState(0);
    const [resultValue, setResultValue] = useState([0]);

    // 步骤1、2、3
    const [step, setStep] = useState(1);

    const computeResult = (value, type) => {
        let param1 = inputParam1;
        let param2 = inputParam2;
        if (type === 1) {
            param1 = value;
        }

        if (type === 2) {
            param2 = value;
        }

        // 创建套索回归模型并训练
        const lassoRegression = polynomialRegression(param1, param2);

        if (Array.isArray(lassoRegression)) {
            setResultValue(lassoRegression);
        }
    }

    return <>
        <div style={{ textAlign: 'right' }}>
            <Button size="small" style={{ margin: '0 10px 0 0', borderRadius: 'inherit' }} disabled={step === 1} onClick={() => { setStep(step - 1) }}>上一步</Button>
            <Button size="small" style={{ margin: '0 20px 0 0', borderRadius: 'inherit' }} disabled={step === 2} onClick={() => {
                setStep(step + 1);
                if (step >= 2) {
                    computeResult(0, 0);
                }
            }}>{step >= 2 ? '完成' : '下一步'}</Button>
        </div>
        {step === 1 && <><div>
            <InputStringArray
                key={'param1'}
                title="输入一:"
                value={inputParam1}
                onChange={(value) => {
                    setInputParam1(value);
                    console.log(value)
                    // computeResult(value, 1);
                }}
            />
        </div>
            <div className='_polynomialRegressionComponent'>
                <div className="label">degree:</div>
                <div className="grid">
                    <InputNumber size="small" value={inputParam2} onChange={(v) => { setInputParam2(v); }} />
                </div>
            </div></>}
        {step === 2 && <div>
            <OutResult title="结果：" value={resultValue} />
            <MyCanves />
        </div>}
    </>
}

export default PolynomialRegressionComponent;
