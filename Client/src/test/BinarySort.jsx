/** @format */

function BinarySort() {
  const target = 30;
  const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const BinarySearch = (arr, target) => {
    let right = arr.length - 1;
    let left = 0;

    while (left <= right) {
      let middle = Math.floor((right + left) / 2);
      if (arr[middle] === target) {
        return middle;
      } else if (arr[middle] < target) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
      console.log(arr[middle]);
    }
    return -1;
  };

  console.log(BinarySearch(arr, target));

  return <div>BinarySort</div>;
}

export default BinarySort;
