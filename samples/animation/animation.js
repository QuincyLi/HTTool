function init() {
  ht.Default.setImage('basic', {
    width: 200,
    height: 200,
    comps: [
        {
            type: 'star',
            rect: [17, 180, 180],
            background: 'red',
            gradient: 'radial.center',
            gradientColor: 'yellow',
            borderWidth: 5,
            dashOffset: {
                func: function(data) {
                    return data.s("vector.dash.offset");
                }
            },
            dash: true,
            dashPattern: [10, 10],
            dashColor: '#1abc9c',
            borderColor: '#0069d6'
        }
    ]
});
 var dataModel = new ht.DataModel();
 var graphView = new ht.graph.GraphView(dataModel);
 propertyView = new ht.widget.PropertyView(dataModel);
 var formPane = new ht.widget.FormPane();
 var borderPane = new ht.widget.BorderPane();
 borderPane.setCenterView(propertyView);
 borderPane.setBottomView(formPane, 74);
 var splitView = new ht.widget.SplitView(graphView, borderPane);

  view = graphView.getView();
  view.className = 'main';
  document.body.appendChild(view);
  dataModel.enableAnimation();

  showOrHideNode(initNode(dataModel, 0, 1))
  horizontalMoveNode(initNode(dataModel, 80, 2))
  verticalMoveNode(initNode(dataModel, 160, 3))
  twinkleNode(initNode(dataModel, 240, 4))
  expendNode(initNode(dataModel, 320, 5))
  fontChange(initNode(dataModel, 400, 6))
  rotateNode(initNode(dataModel, 480, 7))
  getToolTip(initNode(dataModel, 560, 8))
  border(dataModel);
  flow(dataModel);
}

function initNode(dataModel, n, id) {
  var node = new ht.Node();
  node.setName('Rect' + id);
  node.setSize(60, 60);
  node.setPosition(150 + n, 50);
  node.setStyle('shape', 'rect');
  node.setStyle('shape.background', 'rgb(255,105,155)');
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

function horizontalMoveNode(node, abc) {
  node.setAnimation({
    moveToLeft: {
      from: asas,
      to: abc,
      easing: "Linear",
      next: "moveToRight",
      onUpdate: function(value) {
        this.setPosition(value, this.getPosition().y);
      }
    },
    moveToRight: {
      from: 300,
      to: 150,
      easing: "Linear",
      next: "moveToLeft",
      onUpdate: function(value) {
        this.setPosition(value, this.getPosition().y);
      }
    },
    start: ["moveToRight"]
  });
}

function verticalMoveNode(node) {
  node.setAnimation({
    moveToLeft: {
      from: 150,
      to: 300,
      easing: "Linear",
      next: "moveToRight",
      onUpdate: function(value) {
        this.setPosition(this.getPosition().x, value);
      }
    },
    moveToRight: {
      from: 300,
      to: 150,
      easing: "Linear",
      next: "moveToLeft",
      onUpdate: function(value) {
        this.setPosition(this.getPosition().x, value);
      }
    },
    start: ["moveToRight"]
  });
}

function twinkleNode(node){
  node.setAnimation({
    blend: {
      from: 255,
      to: 0,
      next: "clear",
      onUpdate: function(value) {
          value = parseInt(value);
          this.s("body.color", "rgb(255, " + 255 + ", " + value + ")");
      }
  },
  clear: {
      from: 0,
      to: 255,
      next: "blend",
      onUpdate: function(value) {
          value = parseInt(value);
          this.s("body.color", "rgb(255, " + 255 + ", " + value + ")");
      }
  },
  start: ["blend"]
  });
}

function expendNode(node){
  node.setAnimation({
    expandWidth: {
        property: "width",
        from: 30,
        to: 100,
        next: "collapseWidth"
    },
    collapseWidth: {
        property: "width",
        from: 100,
        to: 30,
        next: "expandWidth"
    },
    expandHeight: {
        property: "height",
        from: 30,
        to: 100,
        next: "collapseHeight"
    },
    collapseHeight: {
        property: "height",
        from: 100,
        to: 30,
        next: "expandHeight"
    },
    start: ["expandWidth", "expandHeight"]
});
}

function fontChange(node){
  node.setAnimation({
    beforeChange:{
      property: 'name',
      from: 0,
      to: 10,
      next: 'afterChange',
      onUpdate: function(value){
        this.setName('名字')
      }
    },
    afterChange:{
      property: 'name',
      from: 0,
      to: 10,
      next: 'beforeChange',
      onUpdate: function(value){
        this.setName('改变')
      }
    },
    start: ["beforeChange"]
  });
}

function rotateNode(node){
  node.setAnimation({
    rotate:{
      property: 'rotation',
      accessType: 'style',
      from: 0,
      to: Math.PI,
      interval: 100,
      repeat: true,
      onUpdate: function(value){
        this.setRotation(value);
      }
    },
    start: ['rotate']
  });
}

function getToolTip(node){
  node.setStyle('note', '这是tooltip');
}

function border(dataModel){
  var node2 = new ht.Node();
  node2.setImage("basic");
  node2.setPosition(500, 200);
  node2.setSize(100, 100);
  node2.setName("node2");
  node2.setAnimation({
    borderFlow: {
      property: "vector.dash.offset",
      accessType: "style",
      easing: "Linear",
      from: 1,
      to: 20,
      frames: 19,
      onComplete: function() {
        this.s('vector.dash.offset', 0);
      },
      next: "borderFlow"
    },
    start: ["borderFlow"]
  });
  dataModel.add(node2);
}

function flow(dataModel){
  var node1 = initNode(dataModel, 640, 9);
  var node2 = initNode(dataModel, 820, 10);
  var edge1 = new ht.Edge(node1, node2);
  edge1.s({
    'edge.width': 5,
    'edge.gap': 20,
    'edge.dash': true,
    'edge.offset': 0
  });
  edge1.setAnimation({
    flowing: {
      property: 'edge.dash.offset',
      accessType: 'style',
      easing: 'Linear',
      from: 0,
      to: 1000,
      frames: 500,
      interval: 30,
      onComplete: function() {
          this.s('edge.dash.offset', 0);
      },
      next: 'flowing'
    },
    start: ['flowing']
  });
  dataModel.add(edge1)
}

function fillNode(dataModel){
  var formPane = new ht.widget.FormPane();

}

function addButtonNode(dataModel){
  var button = new ht.widget.Button();
  button.setLabel('按钮');

  dataModel.add(button);
}
