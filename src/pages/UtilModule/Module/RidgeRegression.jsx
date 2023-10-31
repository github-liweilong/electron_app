import { multiply, transpose, add, identity, inv } from "mathjs";

/**
 * 岭回归模型
 * @param {*} X 
 * @param {*} y 
 * @param {*} alpha 
 * @returns 
 */
export function ridgeRegression(X, y, alpha) {
    const X_T = transpose(X);
    const XtX = multiply(X_T, X);
    const XtX_alpha = add(XtX, multiply(alpha, identity(XtX.length)));
    const XtX_alpha_inv = inv(XtX_alpha);
    const XTy = multiply(X_T, y);
    
    const beta = multiply(XtX_alpha_inv, XTy);
    return beta;
}
  
// // 数据准备
// const X = [
//     [1, 2],
//     [3, 4],
//     [5, 6]
// ];
// const y = [3, 5, 7];
// const alpha = 0.1;

// // 运行岭回归模型
// const beta = ridgeRegression(X, y, alpha);
// console.log(beta);