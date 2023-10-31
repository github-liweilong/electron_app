export class LogisticRegression {
    constructor() {
      this.weights = null;
      this.bias = null;
    }
  
    // 训练模型
    fit(X, y, learningRate = 0.1, numIterations = 100) {
      const numSamples = X.length;
      const numFeatures = X[0].length;
  
      // 初始化权重和偏差
      this.weights = new Array(numFeatures).fill(0);
      this.bias = 0;
  
      // 梯度下降算法更新权重和偏差
      for (let iteration = 0; iteration < numIterations; iteration++) {
        let yPredicted = [];
  
        // 预测标签
        for (let i = 0; i < numSamples; i++) {
          let linearModel = 0;
          for (let j = 0; j < numFeatures; j++) {
            linearModel += this.weights[j] * X[i][j];
          }
          linearModel += this.bias;
          yPredicted[i] = this.sigmoid(linearModel);
        }
  
        // 计算梯度
        let dw = new Array(numFeatures).fill(0);
        let db = 0;
  
        for (let i = 0; i < numSamples; i++) {
          for (let j = 0; j < numFeatures; j++) {
            dw[j] += (yPredicted[i] - y[i]) * X[i][j];
          }
          db += (yPredicted[i] - y[i]);
        }
  
        // 更新权重和偏差
        for (let j = 0; j < numFeatures; j++) {
          this.weights[j] -= learningRate * dw[j] / numSamples;
        }
        this.bias -= learningRate * db / numSamples;
      }
    }
  
    // 预测标签
    predict(X) {
      const numSamples = X.length;
      const numFeatures = X[0].length;
  
      let yPredicted = [];
  
      for (let i = 0; i < numSamples; i++) {
        let linearModel = 0;
        for (let j = 0; j < numFeatures; j++) {
          linearModel += this.weights[j] * X[i][j];
        }
        linearModel += this.bias;
        yPredicted[i] = this.sigmoid(linearModel) >= 0.5 ? 1 : 0;
      }
  
      return yPredicted;
    }
  
    // Sigmoid函数
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
  }
  
  // 使用示例
//   const X = [[1, 2], [3, 4], [5, 6], [7, 8]];
//   const y = [0, 1, 0, 1];
  
//   const classifier = new LogisticRegression();
//   classifier.fit(X, y);
  
//   const newX = [[9, 10], [11, 12]];
//   const yPredicted = classifier.predict(newX);
  
//   console.log(yPredicted);  // 输出: [1, 1]