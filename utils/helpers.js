export function getArrWithSubArrays(arr, subArraysCount) {
  const c = Math.ceil(arr.length / subArraysCount);
  const newArr = [];
  for (let i = 0; i < arr.length; i += c) {
    newArr.push(arr.slice(i, i + c));
  }
  return newArr;
}

export function sortArrByObjField(field) {
  return (a, b) => {
    a = typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
    b = typeof b[field] === "string" ? b[field].toLowerCase() : b[field];
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };
}
