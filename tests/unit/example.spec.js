import { isDiffArr } from "@/utils/common.js";
describe("测试工具类", () => {
  test("测试 isDiffArr", () => {
    let arr1 = [],
      arr2 = ["dfg"];
    expect(isDiffArr(arr1, arr2)).toBe(true);
  });
});
