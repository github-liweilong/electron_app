export const moduleNameItems = [
    {name: '线性回归模型', key: 'LinearRegression', selected: false},
    // {name: '逻辑回归模型类', key: 'LogisticRegression', selected: false},
    // {name: '多项式回归模型', key: 'polynomialRegression', selected: false},
    // {name: '逐步回归模型的函数', key: 'stepwiseRegression', selected: false},
    // {name: '岭回归模型参数估计', key: 'ridgeRegression', selected: false},
    // {name: '套索回归模型类', key: 'LassoRegression', selected: false},
    // {name: '线性回归的类', key: 'ElasticRegression', selected: false},
]

export const funcMap = {
    'LinearRegression': [
        { label: '训练', value: 'train' },
        // { label: '梯度下降算法', value: 'gradientDescent' },
        // { label: '预测', value: 'predict' },
        // { label: '计算误差', value: 'calculateError' },
        // { label: '计算权重的梯度', value: 'calculateGradient' }
    ],
    'LogisticRegression': [
        { label: '训练模型', value: 'fit' },
        // { label: '预测标签', value: 'predict' },
        // { label: 'Sigmoid函数', value: 'sigmoid' }
    ],
    'polynomialRegression': [
        { label: '多项式回归函数', value: 'polynomialRegression' },
    ],
    'stepwiseRegression': [
        { label: '逐步回归模型的函数', value: 'stepwiseRegression' },
    ],
    'ridgeRegression': [
        { label: '岭回归模型参数估计函数', value: 'ridgeRegression' },
    ],
    'LassoRegression': [
        { label: '训练', value: 'fit' },
        // { label: '预测', value: 'predict' }
    ],
    'ElasticRegression': [
        { label: '训练模型', value: 'fit' },
        { label: '预测新数据', value: 'predict' }
    ],
}