// 空字符默认显示--
export const defaultEmpty = value => {
  if (value === undefined || value === '' || value === null) return '--'
  return value
}
