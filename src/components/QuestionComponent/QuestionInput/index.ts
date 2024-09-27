/**
 * @description  问卷  输入框
 */
import Component from './Component'
import PropComponent from "./PropComponent";
import { QuestionInputDefaultProps } from './type'

export * from './type'

// Input 组件配置
export default {
  title: '输入框',
  type: 'questionInput', // 需与后端一致
  Component, // 画布所需要的组件
  PropComponent, // 右侧面板所需要的属性组件
  defaultProps: QuestionInputDefaultProps
}
