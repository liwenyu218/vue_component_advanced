/*
 * @Author: Liwenyu
 * @Date: 2023-11-03 10:33:50
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-11-03 10:34:00
 * @FilePath: \vue_component_advanced\src\components\TableRender\Render.js
 * @Description:
 *
 */
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    };

    return ctx.props.render(h, params);
  },
};
