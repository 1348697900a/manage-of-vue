import type { RouteRecordRaw } from "vue-router";

const getParentsKeys = (
  data: RouteRecordRaw[],
  targetPath: string,
  parent: string[] = []
): string[] => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.path === targetPath) {
      return [...parent];
    }
    if (item.children) {
      const res = getParentsKeys(item.children, targetPath, [
        ...parent,
        item.path,
      ]);
      if (res?.length) return res;
    }
  }
  return [];
};
export default getParentsKeys