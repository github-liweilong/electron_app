import { useState } from "react";
import { Button } from "antd";
import OutResult from "../OutResult";
import MyCanves from "../../MyCanves";
import { LinearRegression } from "../../Module/LinearRegression";
import ChangeTableOne from "../ChangeTableOne"
import ChangeTableTwo from "../ChangeTableTwo"

const LinearRegressionComponent = () => {

    const [inputParam1, setInputParam1] = useState([[0]]);
    const [inputParam2, setInputParam2] = useState([0]);
    const [inputParam3, setInputParam3] = useState([[0]]);
    const [resultValue, setResultValue] = useState([0]);

    const computeResult = (value, type) => {
        const module = new LinearRegression();
        let param1 = inputParam1;
        let param2 = inputParam2;
        let param3 = inputParam3;

        if (type === 1) {
            param1 = value;
        }

        if (type === 2) {
            param2 = value;
        }

        if (type === 3) {
            param3 = value;
        }

        module.train(param1, param2);

        const predictions = module.predict(param3);
        console.log(predictions);
        setResultValue(predictions);
    }

    // 步骤1、2、3、4
    const [step, setStep] = useState(1);

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
            {sessionStorage.getItem('qiwang') === 'true' && <div>
                <ChangeTableOne title="期望值:" value={inputParam2} onChange={(value) => { setInputParam2(value); }} />
            </div>}
        </>}
        {step === 2 && <div>
            <ChangeTableTwo title="预测:" value={inputParam3} onChange={(value) => { setInputParam3(value); }} />
        </div>}
        {step === 3 && <div>
            <OutResult title="结果：" value={resultValue} />
            <MyCanves />
        </div>}
    </>
}

export default LinearRegressionComponent;
