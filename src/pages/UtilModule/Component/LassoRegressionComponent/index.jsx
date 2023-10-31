import { useState } from "react";
import { Button, InputNumber } from "antd";
import OutResult from "../OutResult";
import LassoRegression from "../../Module/LassoRegression";
import MyCanves from "../../MyCanves";
import ChangeTableOne from "../ChangeTableOne";
import ChangeTableTwo from "../ChangeTableTwo";

import "./index.css";

const LassoRegressionComponent = () => {

    const [inputParam1, setInputParam1] = useState([[0]]);
    const [inputParam2, setInputParam2] = useState([0]);
    const [inputParam3, setInputParam3] = useState(0);
    const [inputParam4, setInputParam4] = useState(0);
    const [inputParam5, setInputParam5] = useState([[0]]);
    const [resultValue, setResultValue] = useState([0]);

    const computeResult = (value, type) => {
        let param1 = inputParam1;
        let param2 = inputParam2;
        let alpha = inputParam3;
        let maxIterations = inputParam4;
        let param5 = inputParam5;

        if (type === 1) {
            param1 = value;
        }

        if (type === 2) {
            param2 = value;
        }

        if (type === 3) {
            alpha = value;
        }

        if (type === 4) {
            maxIterations = value;
        }

        if (type === 5) {
            param5 = value;
        }

        // 创建套索回归模型并训练
        const lassoRegression = new LassoRegression(alpha, maxIterations);
        lassoRegression.fit(param1, param2);

        // 预测新样本
        const predictions = lassoRegression.predict(param5);

        console.log(predictions);
        setResultValue(predictions);
    }

    // 步骤1、2、3、4
    const [step, setStep] = useState(1);

    return <>
        <div style={{ textAlign: 'right' }}>
            <Button size="small" style={{ margin: '0 10px 0 0', borderRadius: 'inherit' }} disabled={step === 1 || step === 3} onClick={() => { setStep(step - 1) }}>上一步</Button>
            <Button size="small" style={{ margin: '0 20px 0 0', borderRadius: 'inherit' }} disabled={step === 3} onClick={() => {
                setStep(step + 1);
                if (step >= 3) {
                    computeResult(0, 0);
                }
            }}>{step >= 2 ? '完成' : '下一步'}</Button>
        </div>

        {step === 1 && <div>
            <ChangeTableTwo title="输入:" value={inputParam1} onChange={(value) => { setInputParam1(value); }} />
        </div>}

        {step === 1 && <div>
            <ChangeTableOne title="输出:" value={inputParam2} onChange={(value) => { setInputParam2(value); }} />
        </div>}

        {step === 2 && <><div className='_inputNumber'>
            <div className="label">alpha:</div>
            <div className="grid">
                <InputNumber size="small" value={inputParam3} onChange={(v) => { setInputParam3(v); }} />
            </div>
        </div>
            <div className='_inputNumber'>
                <div className="label">最大迭代次数:</div>
                <div className="grid">
                    <InputNumber size="small" value={inputParam4} onChange={(v) => { setInputParam4(v); }} />
                </div>
            </div>
            <div>
                <ChangeTableTwo title="预测一:" value={inputParam5} onChange={(value) => { setInputParam5(value); }} />
            </div></>}

        {step === 3 && <div>
            <OutResult title="结果：" value={resultValue} />
        </div>}

        {step === 3 && <MyCanves result={resultValue} param1={inputParam1} param2={inputParam2} />}
    </>
}

export default LassoRegressionComponent;
