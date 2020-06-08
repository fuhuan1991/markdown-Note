const x = [
    {
        "id": "00000000-0000-0000-0000-000000000000",
        "parent_id": null,
        "type": "DIR",
        "name": "Root"
    },
    {
        "id": "d189a975-1f16-4227-bcc1-24be56a39a54",
        "parent_id": "00000000-0000-0000-0000-000000000000",
        "type": "DIR",
        "name": "D1"
    },
    {
        "id": "98269c00-2ba5-4ceb-aaea-9d650d33583e",
        "parent_id": "d189a975-1f16-4227-bcc1-24be56a39a54",
        "type": "DIR",
        "name": "d11"
    },
    {
        "id": "567e7ee8-30f0-4067-b93b-a17990c887d0",
        "parent_id": "d189a975-1f16-4227-bcc1-24be56a39a54",
        "type": "DIR",
        "name": "d12"
    },
    {
        "id": "f710c1d8-e1e5-43c6-9a09-f8f32414f835",
        "parent_id": "019d1f01-5cfc-407e-9385-2bfbdf7e90f3",
        "type": "DIR",
        "name": "d21"
    },
    {
        "id": "85b84150-a2be-4104-b63b-b892f4c05aec",
        "parent_id": "019d1f01-5cfc-407e-9385-2bfbdf7e90f3",
        "type": "DIR",
        "name": "d22"
    },
    {
        "id": "019d1f01-5cfc-407e-9385-2bfbdf7e90f3",
        "parent_id": "85b84150-a2be-4104-b63b-b892f4c05aec",
        "type": "DIR",
        "name": "d22a"
    },
    {
        "id": "93c75b92-47ac-4883-8ff3-039b97b38719",
        "parent_id": "98269c00-2ba5-4ceb-aaea-9d650d33583e",
        "type": "DIR",
        "name": "aabs"
    },
    {
        "id": "0c3d2d95-7e3b-473d-a20f-e665d796d154",
        "parent_id": "00000000-0000-0000-0000-000000000000",
        "type": "FILE",
        "name": "n1"
    },
    {
        "id": "6f5cb0d8-8ef0-4dbf-89ba-980bd6d3e8aa",
        "parent_id": "d189a975-1f16-4227-bcc1-24be56a39a54",
        "type": "FILE",
        "name": "note_4423242"
    }
];

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

console.log(menuConstruction(x));
// export default menuConstruction;