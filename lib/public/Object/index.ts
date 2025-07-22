/**
 * @function 从对象中筛选出指定键的属性，并返回一个新对象。
 * @template T 表示对象的类型，它必须是带有键的普通对象。
 * @template K 表示要筛选的键的类型，它是 T 的键的子集。
 * @param obj 需要从中筛选属性的对象。
 * @param keys 需要筛选出来的键的数组。
 * @returns 返回一个新对象，它只包含 `keys` 数组中指定的键及其对应的值。
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<Pick<T, K>> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as K) as boolean)
  ) as Partial<Pick<T, K>>
}

/**
 * 仅将 `source` 中已存在于 `target` 的 key 对应的值赋给 `target`。
 * 其余 key 保持不变。
 *
 * @template {Record<string, any>} T
 * @param {T} target  需要被赋值的目标对象（会被原地修改）
 * @param {Partial<T>} source 提供值的源对象
 * @returns {T} 返回修改后的目标对象（便于链式调用）
 *
 * @example
 * const a = { x: 1, y: 2 };
 * const b = { x: 9, z: 3 };
 * assignExistingKeys(a, b); // a -> { x: 9, y: 2 }
 */
export const assignExistingKeys = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
) => {
  Object.keys(target).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key as keyof T] = source[key as keyof T] as T[keyof T]
    }
  })
  return target
}
