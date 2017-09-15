
/**
 * 给定两个数组,
 * array里的元素按order中规定的顺序排序.
 * eg: predefinedSort([4,2,1,3,5,7],[1,4,3,2,7]) ==> [1,4,3,2,7,5]
 */
const predefinedSort = (array, order) => 
    order.filter(x=>~array.indexOf(x))
        .concat(array.filter(x=>!~order.indexOf(x)))
