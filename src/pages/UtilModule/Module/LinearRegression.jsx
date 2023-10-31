export class LinearRegression {
    constructor() {
        this.learningRate = 0.01;
        this.maxIterations = 1000;
        this.weights = [];
        this.bias = 0;
    }

    // 训练模型
    train(features, labels) {
        // 初始化权重
        for (let i = 0; i < features[0].length; i++) {
            this.weights.push(Math.random());
        }

        // 执行梯度下降
        for (let iteration = 0; iteration < this.maxIterations; iteration++) {
            this.gradientDescent(features, labels);
        }
    }

    // 梯度下降算法
    gradientDescent(features, labels) {
        const predictions = this.predict(features);
        const error = this.calculateError(predictions, labels);

        // 更新权重和偏置
        for (let i = 0; i < this.weights.length; i++) {
            const feature = features.map(x => x[i]);
            const gradient = this.calculateGradient(feature, error);

            this.weights[i] -= this.learningRate * gradient;
        }

        this.bias -= this.learningRate * this.calculateGradient([1], error);
    }

    // 预测
    predict(features) {
        const predictions = [];

        for (let i = 0; i < features.length; i++) {
            let prediction = 0;

            for (let j = 0; j < this.weights.length; j++) {
                prediction += features[i][j] * this.weights[j];
            }

            prediction += this.bias;
            predictions.push(prediction);
        }

        return predictions;
    }

    // 计算误差
    calculateError(predictions, labels) {
        const errors = [];

        for (let i = 0; i < predictions.length; i++) {
            const error = predictions[i] - labels[i];
            errors.push(error);
        }

        return errors;
    }

    // 计算权重的梯度
    calculateGradient(feature, errors) {
        let gradient = 0;

        for (let i = 0; i < feature.length; i++) {
            gradient += feature[i] * errors[i];
        }

        return gradient / feature.length;
    }
}

// 使用示例
// const features = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// const labels = [6, 15, 24];
// const model = new LinearRegression();
// model.train(features, labels);

// const testFeatures = [[10, 11, 12], [13, 14, 15]];
// const predictions = model.predict(testFeatures);
// console.log(predictions);