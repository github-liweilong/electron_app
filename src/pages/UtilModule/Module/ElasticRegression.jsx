import { multiply, transpose, add, ones, inv, matrix, concat } from "mathjs";
import { eye } from "../util";

export default class ElasticRegression {
    constructor(lambda) {
        this.lambda = lambda;  // 控制惩罚项的力度
        this.weights = null;  // 回归系数
    }

    // 训练模型
    fit(X, y) {
        try {
            const n = X.length;
            const m = X[0].length;

            // 创建一个包含所有特征的矩阵
            const XMatrix = matrix(X);

            // 创建一个包含所有目标变量的向量
            const yVector = matrix(y);

            // 添加常数项的一列特征
            const onesMatrix = ones(n, 1);
            const XMatrixWithOnes = concat(XMatrix, onesMatrix, 1);

            // 计算正规方程的解
            const identityMatrix = eye(m + 1);
            const lambdaMatrix = multiply(this.lambda, identityMatrix);
            const XXt = multiply(transpose(XMatrixWithOnes), XMatrixWithOnes);
            const XXtPlusLambda = add(XXt, lambdaMatrix);
            const inverseMatrix = inv(XXtPlusLambda);
            const XtXInverse = multiply(inverseMatrix, transpose(XMatrixWithOnes));
            this.weights = multiply(XtXInverse, yVector);
        } catch (error) {
            console.error('数据解析错')
        }
        
    }

    // 预测新数据
    predict(X) {
        try {
            const n = X.length;

            // 创建一个包含所有特征的矩阵
            const XMatrix = matrix(X);

            // 添加常数项的一列特征
            const onesMatrix = ones(n, 1);
            const XMatrixWithOnes = concat(XMatrix, onesMatrix, 1);

            // 预测目标变量
            const yPredicted = multiply(XMatrixWithOnes, this.weights);

            return yPredicted._data;
        } catch (error) {
            console.error('数据解析错')
        }
    }
}

// // 创建一个弹性回归对象
// const elasticRegression = new ElasticRegression(0.5);

// // 示例数据
// const X = [[1, 1], [1, 2], [1, 3], [1, 4]];
// const y = [3, 5, 7, 9];

// // 训练模型
// elasticRegression.fit(X, y);

// // 预测新数据
// const newX = [[1, 5], [1, 6], [1, 7]];
// const yPredicted = elasticRegression.predict(newX);

// console.log(yPredicted);