/**
 * 获取单位矩阵
 * @param {*} num 
 * @returns 
 */
export const eye = (num) => {
    if (typeof num !== 'number') {
        return [];
    }

    let result = [];
    for (let i = 0; i < num; i++) {
        result.push([]);

        for (let j = 0; j < num; j++) {
            result[i][j] = i === j ? 1 : 0;
        }
    }
    return result;
}