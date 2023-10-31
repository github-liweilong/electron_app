export default class LassoRegression {
    constructor(alpha, maxIterations) {
      this.alpha = alpha; // 正则化参数
      this.maxIterations = maxIterations; // 最大迭代次数
    }
  
    // 训练模型
    fit(X, y) {
      const nSamples = X.length; // 样本数量
      const nFeatures = X[0].length; // 特征数量
  
      // 初始化模型参数
      this.theta = new Array(nFeatures).fill(0);
      this.intercept = 0;
  
      // 梯度下降迭代更新模型参数
      for (let iteration = 0; iteration < this.maxIterations; iteration++) {
        // 计算预测值和误差
        const predictions = this.predict(X);
        const errors = predictions.map((prediction, i) => prediction - y[i]);
  
        // 计算特征的L1范数
        const featureL1Norms = this.theta.map((parameter) => Math.abs(parameter));
  
        // 更新截距参数
        const interceptGradient = errors.reduce((acc, error) => acc + error, 0) / nSamples;
        this.intercept -= this.alpha * interceptGradient;
  
        // 更新特征参数
        for (let j = 0; j < nFeatures; j++) {
          const featureGradient = X.map((sample, i) => sample[j] * errors[i])
            .reduce((acc, gradient) => acc + gradient, 0) / nSamples;
  
          if (this.theta[j] > 0) {
            this.theta[j] = Math.max(0, Math.abs(this.theta[j]) - this.alpha * featureGradient);
          } else if (this.theta[j] < 0) {
            this.theta[j] = Math.min(0, -Math.abs(this.theta[j]) - this.alpha * featureGradient);
          } else {
            this.theta[j] = -this.alpha * featureGradient;
          }
        }
      }
    }
  
    // 预测
    predict(X) {
      return X.map((sample) =>
        sample.reduce((acc, feature, j) => acc + feature * this.theta[j], this.intercept)
      );
    }
  }
  
  // 示例用法
  // const X = [[1, 2], [3, 4], [5, 6]]; // 样本特征矩阵
  // const y = [3, 6, 9]; // 样本标签
  // const alpha = 0.1; // 正则化参数
  // const maxIterations = 100; // 最大迭代次数
  
  // // 创建套索回归模型并训练
  // const lassoRegression = new LassoRegression(alpha, maxIterations);
  // lassoRegression.fit(X, y);
  
  // // 预测新样本
  // const newX = [[7, 8], [9, 10]]; // 新样本特征矩阵
  // const predictions = lassoRegression.predict(newX);
  
  // console.log(predictions);