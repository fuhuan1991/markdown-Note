export default function constructMenuData (data) {

  const childrenTable = {};
  const arr = [...data.notebooks, ...data.notes];
  const rootNode = {
    id: 'ROOT',
    name: 'Root'
  };
  const queue = [rootNode];
  const nodeTable = {
    'ROOT': rootNode,
  };

  // console.log({data})

  for (let node of arr) {
    nodeTable[node.id] = node;

    if (!!node.title) {
      node.name = node.title;
    } else {
      node.name = node.notebook_name;
    }

    if (!node.type) {
      node.type = 'DIR';
    }

    if (!node.parent_id) {
      if (!!childrenTable['ROOT']) {
        childrenTable['ROOT'].push(node);
      } else {
        childrenTable['ROOT'] = [node];
      }
    } else {
      if (!!childrenTable[node.parent_id]) {
        childrenTable[node.parent_id].push(node);
      } else {
        childrenTable[node.parent_id] = [node];
      }
    }
  }

  // console.log({nodeTable, childrenTable})

  // //BFS
  while (queue.length > 0) {
    const node = queue.pop();
    node.children = [];
    if (childrenTable[node.id]) {
      for (let child of childrenTable[node.id]) {
        node.children.push(child);
        queue.push(child);
      }
    }
    if (!node.id === 'ROOT') node.children.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  return {rootNode, nodeTable};
}