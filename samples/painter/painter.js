var node;
var index = 1;
var dataModel;
var startObj = {
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
};

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

function add() {
  var element = document.getElementById('configContent').cloneNode(true);
  var animation = document.getElementById('animation');
  element.children[8].innerHTML = '<label>repeat:</label><input id="isRepeat' + index + '" type="checkbox" onclick="showInput(this, repeat' + index + ')" checked><input id="repeat' + index + '" type="text" style="display:none">';
  element.lastElementChild.innerHTML = '<button style="margin-top:10px" onclick="apply(' + index + ')">apply</button>';
  index += 1;
  animation.appendChild(element);
}

function start() {
  delete node._animationprocess;
  delete node._animationstatus;
  node.setAnimation(startObj);
}

function cancel() {
  startObj = {
    start: []
  };
  checkAnimation();
  node.setAnimation(null);
}

function apply(indexArg) {
  var name = document.getElementsByName('name')[indexArg].value;
  var reg = /\d/g;
  if (reg.test(name)) {
    alert('名称不能含有数字');
    return;
  }
  var config = {};
  config.property = document.getElementsByName('property')[indexArg].value;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
  config.frames = parseInt(document.getElementsByName('frames')[indexArg].value);
  config.interval = parseInt(document.getElementsByName('interval')[indexArg].value);
  config.delay = parseInt(document.getElementsByName('delay')[indexArg].value);
  if (document.getElementsByName('next')[indexArg].value) {
    config.next = document.getElementsByName('next')[indexArg].value;
  }
  if (document.getElementById('isRepeat' + indexArg).checked) {
    config.repeat = true;
  } else if (parseInt(document.getElementById('repeat' + indexArg).value) > 0) {
    config.repeat = parseInt(document.getElementById('repeat' + indexArg).value);
  }
  config.easing = document.getElementsByName('easing')[indexArg].value;
  config.accessType = document.getElementsByName('accessType')[indexArg].value == 'null' ? null : document.getElementsByName('accessType')[indexArg].value;
  if (!!startObj[name]) {
    startObj[name] = config;
  } else {
    var next = document.getElementsByName('next');
    for (var i = 0; i < next.length; i++) {
      next[i].add(new Option(name, name));
    }
    startObj[name] = config;
  }
  console.log(startObj);
}

function checkAnimation() {
  var animation = document.getElementsByName('start');
  var result = [];
  for (var i = 0; i < animation.length; i++) {
    if (animation[i].checked) {
      var name = document.getElementsByName('name')[i].value;
      result.push(name);
    }
  }
  startObj.start = result;
}

function showInput(target, id) {
  if (target.checked) {
    id.style.display = 'none';
  } else {
    id.style.display = '';
  }
}

function deleteAnimation(value) {

}
