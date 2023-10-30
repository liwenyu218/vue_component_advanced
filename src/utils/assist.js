function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * @description:
 * @param {Object} context: 当前组件
 * @param {String} componentName: 要找的组件name
 * @return {Object} 找到的组件实例
 */
function findComponentsUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  let parents = [];

  while (parent) {
    parent = parent.$parent;
    name = parent?.$options.name;
    if (name === componentName) parents.push(parent);
  }
  return parents;
}

// function findComponentDownward(context, componentName) {
//   const childrens = context.$children;

//   if (childrens.length) {
//     for (const child of childrens) {
//       const name = child.$options.name;

//       if (name === componentName) {
//         return parent;
//       } else {
//         return findComponentDownward(child, componentName);
//       }
//     }
//   }
// }
function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        break;
      }
    }
  }
  return children;
}

function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    const name = child.$options.name;
    if (name === componentName) components.push(child);
    const foundsChilds = findComponentsDownward(child, componentName);
    return components.concat(foundsChilds);
  }, []);
}

function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter((item) => {
    return item.$options.name === componentName;
  });

  let index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);

  return res;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents,
};
