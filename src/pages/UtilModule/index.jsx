import { useEffect, useState } from "react";
import LinearRegressionComponent from "./Component/LinearRegressionComponent";
import LogisticRegressionComponent from "./Component/LogisticRegressionComponent";
import LassoRegressionComponent from "./Component/LassoRegressionComponent";
import RidgeRegressionComponent from "./Component/RidgeRegressionComponent";
import ElasticRegressionComponent from "./Component/ElasticRegressionComponent";
import PolynomialRegressionComponent from "./Component/PolynomialRegressionComponent";
import StepwiseRegressionComponent from "./Component/StepwiseRegressionComponent";

import './index.css';

const UtilModule = (props) => {

    const [moduleNameItems, setModuleNameItems] = useState([
        {name: '线性回归模型', key: 'LinearRegression', selected: true},
        {name: '逻辑回归模型', key: 'LogisticRegression', selected: false},
        {name: '多项式回归模型', key: 'polynomialRegression', selected: false},
        {name: '逐步回归模型', key: 'stepwiseRegression', selected: false},
        {name: '岭回归模型', key: 'ridgeRegression', selected: false},
        {name: '套索回归模型', key: 'LassoRegression', selected: false},
        {name: '线性回归函数', key: 'ElasticRegression', selected: false},
    ]);
    const [moduleValue, setModuleValue] = useState('');

    useEffect(() => {
        setModuleValue(moduleNameItems[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const selectModule = (value) => {
        const items = JSON.parse(JSON.stringify(moduleNameItems));
        for (let i = 0; i < items.length; i++) {
            if (items[i].key === value.key) {
                items[i].selected = true;
                setModuleValue(value);
            } else {
                items[i].selected = false;
            }
        }

        setModuleNameItems(items);
    }

    return (
        <div className="utilModuleClass" style={{ height: props.height }}>
            <div className="moduleSelect">
                {moduleNameItems.map((item) => {
                    return <div title={item.name} key={item.key} className={item.selected ? "selectedState" : "selectItem"} onClick={() => {selectModule(item)}}>{item.name}</div>
                })}
            </div>
            <div
                style={{
                    display: 'inline-block',
                    marginTop: '2px',
                    overflow: 'auto',
                    width: 'calc(100% - 200px)',
                    padding: '0 0 0 10px',
                    background: 'white'
                }}
            >
                <div style={{ textAlign: 'left', margin: '5px 0 5px 10px' }}>
                    <h3>{moduleValue.name}</h3>
                </div>
                {
                    // 线性回归模型
                    moduleValue.key === "LinearRegression" && <>
                        <LinearRegressionComponent />
                    </>
                }
                {
                    // 逻辑回归模型
                    moduleValue.key === 'LogisticRegression' && <>
                        <LogisticRegressionComponent />
                    </>
                }
                {
                    // 套索回归模型类
                    moduleValue.key === 'LassoRegression' && <>
                        <LassoRegressionComponent />
                    </>
                }
                {
                    // 岭回归模型
                    moduleValue.key === 'ridgeRegression' && <>
                        <RidgeRegressionComponent />
                    </>
                }
                {
                    // 线性回归的类
                    moduleValue.key === 'ElasticRegression' && <>
                        <ElasticRegressionComponent />
                    </>
                }
                {
                    // 多项式回归模型
                    moduleValue.key === 'polynomialRegression' && <>
                        <PolynomialRegressionComponent />
                    </>
                }
                {
                    // 逐步回归模型
                    moduleValue.key === 'stepwiseRegression' && <>
                        <StepwiseRegressionComponent />
                    </>
                }
            </div>
        </div>
    )
}

export default UtilModule;

  
  // 使用示例
  // const features = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  // const labels = [6, 15, 24];
  
  // const model = new LinearRegression();
  // model.train(features, labels);
  
  // const testFeatures = [[10, 11, 12], [13, 14, 15]];
  // const predictions = model.predict(testFeatures);
  // console.log(predictions);
