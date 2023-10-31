import * as math from "mathjs";
// // 训练数据
// var trainingData = [
//     { x: 1, y: 1 },
//     { x: 2, y: 2 },
//     { x: 3, y: 4 },
//     { x: 4, y: 6 },
//     { x: 5, y: 8 }
//   ];
  
  // 定义多项式回归模型
export function polynomialRegression(data, degree) {
    var matrix = [];
    var vector = [];
  
    for (var i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
    
        var row = [];
        for (var j = 0; j <= degree; j++) {
            row.push(Math.pow(x, j));
        }
    
        matrix.push(row);
        vector.push([y]);
    }
  
    var XtX = math.multiply(math.transpose(matrix), matrix);
    var XtY = math.multiply(math.transpose(matrix), vector);
  
    var coeffs = math.multiply(math.inv(XtX), XtY);
    return coeffs;
}
  
//   // 使用训练数据拟合多项式回归模型，并输出系数
// //   var degree = 2;
// //   var coeffs = polynomialRegression(trainingData, degree);
  
// //   console.log('多项式回归模型系数：');
// //   console.log(coeffs);