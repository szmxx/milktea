export const getRandomColor = () => {
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return "rgb(" + [r, g, b].join(",") + ")";
};
export const getRandomNum = (start, end) => {
  if (end >= start) {
    return Math.floor(Math.random() * (end + 1 - start)) + start;
  }
  return -1;
};
export const getRandomAngle = () => {
  let angle = (Math.PI * 2) / 360;
  return angle * Math.floor(Math.random() * 361);
};
// true：两个数组不同，false:两个数组相同
export const isDiffArr = (arr1, arr2) => {
  let result = false;
  if (arr1.length === arr2.length && arr1.length > 0) {
    arr1.forEach((item, index) => {
      if (arr2[index] && arr2[index] != item) {
        result = true;
      }
    });
  } else {
    return true;
  }
  return result;
};
const linear = (time, begin, end, duration) => {
  return begin + (end - begin) * (time / duration);
};
const easeIn = (time, begin, end, duration) => {
  return begin + (end - begin) * (time /= duration) * time;
};
const easeOut = (time, begin, end, duration) => {
  return -(end - begin) * (time /= duration) * (time - 2) + begin;
};
const easeInOut = (time, begin, end, duration) => {
  if ((time /= duration / 2) < 1) {
    return ((end - begin) / 2) * time * time + begin;
  }
  return (-(end - begin) / 2) * (--time * (time - 2) - 1) + begin;
};

const easeInCubic = (time, begin, end, duration) => {
  return begin + (end - begin) * (time /= duration) * time * time;
};
export const getAnimationByType = function(type) {
  switch (type) {
    case "ease-in":
      return easeIn;
    case "ease-out":
      return easeOut;
    case "linear":
      return linear;
    case "ease-in-out":
      return easeInOut;
    case "ease-in-cubic":
      return easeInCubic;
  }
};
