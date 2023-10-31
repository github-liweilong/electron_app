import { useState } from "react";
import InputFeatureArray from "../InputFeatureArray";
import stepwiseRegression from "../../Module/StepwiseRegression";
import OutResult from "../OutResult";
import { Button } from "antd";
import MyCanves from "../../MyCanves";
import ChangeTableOne from "../ChangeTableOne";

import "./index.css";

const StepwiseRegressionComponent = () => {
    const [inputParam1, setInputParam1] = useState([{ feature1: 0, feature2: 0 }]);
    const [inputParam2, setInputParam2] = useState([0]);
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
        const lassoRegression = stepwiseRegression(param1, param2);

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
        {step === 1 && <>
            <div>
                <InputFeatureArray
                    key={'param1'}
                    title="输入:"
                    value={inputParam1}
                    onChange={(value) => {
                        setInputParam1(value);
                    }}
                />
            </div>
            <div>
                <ChangeTableOne title="输出:" value={inputParam2} onChange={(value) => { setInputParam2(value); }} />
            </div>
        </>}
        {step === 2 && <div>
            <OutResult title="结果：" value={resultValue} />
            <MyCanves />
        </div>}
    </>
}

export default StepwiseRegressionComponent;
