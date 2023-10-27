function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    let name = child?.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}

export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // 遍历找到对应的组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit(eventName, params);
      }
    },

    // 这样写 child.broadcast 不是一个函数. 因为在子组件中没有注入emitter
    // broadcast(componentName, eventName, params) {
    //   this.$children.forEach((child) => {
    //     let name = child?.$options.name;

    //     if (name === componentName) {
    //       child.$emit.apply(child, [eventName].concat(params));
    //     } else {
    //       child.broadcast.apply(
    //         child,
    //         [componentName, eventName].concat(params)
    //       );
    //     }
    //   });
    // },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
