
function menuConstruction (arr) {
  const map = [];
  const queue = [];
  let root;

  for (let unit of arr) {
    if (unit.parent_id === null || unit.parent_id === undefined) {
      root = unit;
      queue.push(root);
    } else {
      if (!!map[unit.parent_id]) {
        map[unit.parent_id].push(unit);
      } else {
        map[unit.parent_id] = [unit];
      }
    }
  }

  //BFS
  while (queue.length > 0) {
    const unit = queue.pop();
    unit.children = [];
    if (map[unit.id]) {
      for (let child of map[unit.id]) {
        unit.children.push(child);
        queue.push(child);
      }
    }
  }

  return root;
}
