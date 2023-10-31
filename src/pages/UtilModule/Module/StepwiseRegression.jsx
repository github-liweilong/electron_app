export default function stepwiseRegression(x, y) {
    var features = Object.keys(x[0]); // 所有特征的列表
    var selectedFeatures = []; // 已选择的特征列表

    // 向前逐步回归，直到没有新特征可以加入模型
    while (features.length > 0) {
        var bestFeature = null;
        var bestModel = null;
        var bestError = Infinity;

        // 对于每个未选择的特征，尝试将其添加到模型中并计算误差
        features.forEach(function (feature) {
            var model = selectedFeatures.concat(feature);
            var error = computeError(x, y, model);

            // 更新最佳模型和误差
            if (error < bestError) {
                bestFeature = feature;
                bestModel = model;
                bestError = error;
            }
        });

        // 如果误差没有改进，则退出循环
        if (bestFeature === null) {
            break;
        }

        // 将最佳特征添加到已选择列表中，并从未选择列表中删除
        selectedFeatures.push(bestFeature);
        features = features.filter((feature) => {
            return feature !== bestFeature;
        });
    }

    // 返回最佳模型
    return selectedFeatures;
}

// 计算模型在给定数据上的误差
function computeError(x, y, model) {
    var predictions = x.map(function (example) {
        return predict(example, model);
    });

    var error = 0;
    for (var i = 0; i < y.length; i++) {
        error += Math.pow(predictions[i] - y[i], 2);
    }

    return error;
}

// 使用模型预测一个样本的输出
function predict(example, model) {
    var prediction = 0;
    model.forEach(function (feature) {
        prediction += example[feature];
    });

    return prediction;
}

// // 示例用法：
// var x = [
//     { feature1: 1, feature2: 2 },
//     { feature1: 2, feature2: 3 },
//     { feature1: 3, feature2: 4 },
//     // 更多样本...
// ];

// var y = [3, 4, 5]; // 样本对应的输出

// var model = stepwiseRegression(x, y);
// console.log(model); // 输出选择的最佳特征列表