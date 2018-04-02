var node;
var index;
var dataModel;
var startObj = {
  start: []
};
var tempStart = {};

function init() {
  dataModel = new ht.DataModel();
  var graphView = new ht.graph.GraphView(dataModel);
  var view = graphView.getView();
  view.className = "drawContent";
  document.getElementById('draw').appendChild(view);
  dataModel.enableAnimation();

  node = initNode(dataModel);
}

function initNode(dataModel) {
  var node = new ht.Node();
  node.setName('Rect');
  node.setSize(60, 60);
  node.setPosition(150, 50);
  node.setStyle('shape', 'rect');
  node.setStyle('shape.background', 'rgb(255,105,155)');
  dataModel.add(node);
  return node;
}

function apply() {
  node.setAnimation(null);
  dataModel.enableAnimation();
  var name = document.getElementById('name').value;
  var reg = /\d/g;
  if (reg.test(name)) {
    alert('名称不能含有数字');
    return;
  }
  var config = {};
  config.property = document.getElementById('property').value;
  config.from = parseInt(document.getElementById('from').value);
  config.to = parseInt(document.getElementById('to').value);
  config.frames = parseInt(document.getElementById('frames').value);
  config.interval = parseInt(document.getElementById('interval').value);
  config.delay = parseInt(document.getElementById('delay').value);
  if (document.getElementById('next').value) {
    config.next = document.getElementById('next').value;
  }
  if (document.getElementsByName('repeat')[0].checked) {
    config.repeat = true;
  } else if (parseInt(document.getElementById('repeat').value) > 0) {
    config.repeat = parseInt(document.getElementById('repeat').value);
  }
  config.easing = document.getElementById('easing').value;
  config.accessType = document.getElementById('accessType').value == 'null' ? null : document.getElementById('accessType').value;
  if (!!startObj[name]) {
    startObj[name] = config;
    node.setAnimation(startObj);
  } else {
    var start = document.getElementById('start');
    var child = document.createElement('div');
    var next = document.getElementById('next');
    child.innerHTML = '<input type="checkbox" name="start" onclick="checkAnimation(this.value)" value="' + name + '" checked/><span>' + name + '</span>';
    next.add(new Option(name, name));
    start.appendChild(child);
    startObj[name] = config;
    startObj.start.push(name);
    node.setAnimation(startObj);
  }
  tempStart = startObj;
  console.log(startObj);
}

function checkAnimation(value) {
  var animation = document.getElementsByName('start');
  var result = [];
  for (var i = 0; i < animation.length; i++) {
    if (animation[i].checked) {
      result.push(animation[i].value);
    }
  }
  startObj.start = result;
}

function showInput(value, id) {
  if (value == 0) {
    id.style.display = '';
  } else {
    id.style.display = 'none';
  }
}
