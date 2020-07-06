import { POST } from "@/plugins";

export const saveNaichaProject = data => {
  return POST("/saveNaicha", "保存奶茶选择方案", data);
};

export const getNaichaProject = () => {
  return POST("/getNaicha", "获取所有奶茶选择方案");
};
