interface Callback {
  (name: string): void;
}
/**
 * 已访问标签页的meta信息
 */
interface VisitedPathMeta {
  // 是否需要缓存, 默认为false
  noCache: boolean,
  // 标签页名称
  title: string
}

/**
 * 已访问标签页的基本信息
 */
interface VisitedPath {
  // 路由路径
  path: string,
  // 路由名称
  name: string,
  // meta 信息
  meta: VisitedPathMeta
}

/**
 * 请求接口返回值类型
 */
interface ResponseResult {
  code: number,
  message: string,
  result: any
}
