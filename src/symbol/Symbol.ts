/**
 * 至此，我们已经了解了如何使用字符串作为注入名。
 * 但如果你正在构建大型的应用，包含非常多的依赖提供，
 * 或者你正在编写提供给其他开发者使用的组件库，
 * 建议最好使用 Symbol 来作为注入名以避免潜在的冲突。

我们通常推荐在一个单独的文件中导出这些注入名 Symbol：
 */

/**
 * provide 和 inject 通常会在不同的组件中运行。
 * 要正确地为注入的值标记类型，Vue 提供了一个 InjectionKey 接口，
 * 它是一个继承自 Symbol 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：
 */
import type { InjectionKey } from 'vue'
 
/**
 * 
 * 公共按钮的注入key
   provide(ConditionButtonKey, {
    colList,
    data:{dataList:userList,fileName:'用户信息',sheetName:'用户信息'},
    handleAdd,
    deleteBatch,
    handleExportAll,
    handleReload
  })


  const {
  colList,
  data,// {dataList:userList,fileName:'用户',sheetName:'用户信息'}
  handleAdd,
  deleteBatch,
  handleExportAll,
  handleReload,
} = inject(ConditionButtonKey);

 */
export const ConditionButtonKey=Symbol() as InjectionKey<any>

/**
 * 
 * 分页栏
 *  total,
    currentPage,
    pageSize,
    search:handleSearch
 */
export const PaginationKey=Symbol() as InjectionKey<any>
/**
 * 权限系统里的子界面通用key
 *  visible:handleDialogVisible,
    search:handleSearch
 */
export const RbacInfoKey=Symbol() as InjectionKey<any>
/**
 * 权限系统里，查看编辑时，的行数据row
 * row,
 * type
 */
export const RbacInfoRowKey=Symbol() as InjectionKey<any>
/**
 * 搜索条件FormKey ,
 */
export const SearchFormKey=Symbol() as InjectionKey<any>

export const WxmTableKey=Symbol() as InjectionKey<any>