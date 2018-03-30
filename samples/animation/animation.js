function init() {
  dataModel = new ht.DataModel();
  graphView = new ht.graph.GraphView(dataModel);
  view = graphView.getView();

  view.className = 'main';
  document.body.appendChild(view);
  dataModel.enableAnimation();

  showOrHideNode(initNode(dataModel, 0))
  moveNode(initNode(dataModel, 50))

}

function initNode(dataModel, n) {
  var node = new ht.Node();
  node.setName('Rect');
  node.setSize(60, 60);
  node.setPosition(150 + n, 50);
  node.setStyle('shape', 'rect');
  dataModel.add(node);
  return node;
}

function showOrHideNode(node) {
  node.setAnimation({
    show: {
      property: "opacity",
      accessType: "style",
      from: 1,
      to: 0,
      repeat: true
    },
    start: ["show"]
  });
}

function moveNode(node) {
  node.setAnimation({
    moveToLeft: {
      property: "position",
      accessType: "style",
      from: 300,
      to: 150,
      next: "moveToRight"
    },
    moveToRight: {
      property: "position",
      accessType: "style",
      from: 150,
      to: 300,
      next: "moveToLeft"
    },
    start: ["moveToRight"]
  });
}
