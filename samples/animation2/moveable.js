var node;
var index = 1;
var dataModel;
var startObj = {
  start: []
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
  // var config = {};
  // config.property = document.getElementsByName('property')[indexArg].value;
  // config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  // config.to = parseInt(document.getElementsByName('to')[indexArg].value);
  // config.frames = parseInt(document.getElementsByName('frames')[indexArg].value);
  // config.interval = parseInt(document.getElementsByName('interval')[indexArg].value);
  // config.delay = parseInt(document.getElementsByName('delay')[indexArg].value);
  // if (document.getElementsByName('next')[indexArg].value) {
  //   config.next = document.getElementsByName('next')[indexArg].value;
  // }
  // if (document.getElementById('isRepeat' + indexArg).checked) {
  //   config.repeat = true;
  // } else if (parseInt(document.getElementById('repeat' + indexArg).value) > 0) {
  //   config.repeat = parseInt(document.getElementById('repeat' + indexArg).value);
  // }
  // config.easing = document.getElementsByName('easing')[indexArg].value;
  // config.accessType = document.getElementsByName('accessType')[indexArg].value == 'null' ? null : document.getElementsByName('accessType')[indexArg].value;
  // if (!!startObj[name]) {
  //   startObj[name] = config;
  // } else {
  //   var next = document.getElementsByName('next');
  //   for (var i = 0; i < next.length; i++) {
  //     next[i].add(new Option(name, name));
  //   }
  //   startObj[name] = config;
  // }
  var config = {};
  var property = document.getElementsByName('property')[indexArg].value;
  switch (property) {
    case '1': verticalMoveNode(config, indexArg); break;
    case '2': rotateNode(config, indexArg); break;
    case '3': hideNode(config, indexArg); break;
    case '4': twinkleNode(config, indexArg); break;
    case '5': colorfulNode(config, indexArg); break;
    case '6': colorfulBorder(config, indexArg); break;
    case '7': changeableBorder(config, indexArg); break;
    case '0':
    default: horizontalMoveNode(config, indexArg);
  }
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

function horizontalMoveNode(config, indexArg) {
  config.onUpdate = leftToRgiht;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function verticalMoveNode(config, indexArg) {
  config.onUpdate = bottomToTop;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function rotateNode(config, indexArg) {
  config.onUpdate = rotate;
  config.from = getAngle(document.getElementsByName('fromAngle')[indexArg].value);
  config.to = getAngle(document.getElementsByName('toAngle')[indexArg].value);
}

function hideNode(config, indexArg) {
  config.property = 'opacity';
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function twinkleNode(config, indexArg) {
  config.onUpdate = colorTwinkle;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function colorfulNode(config, indexArg) {
  config.onUpdate = colorChange;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function colorfulBorder(config, indexArg){
  config.onUpdate = changeBorder;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function changeableBorder(config, indexArg){
  config.onUpdate = borderWidthChange;
  config.from = parseInt(document.getElementsByName('from')[indexArg].value);
  config.to = parseInt(document.getElementsByName('to')[indexArg].value);
}

function getAngle(value) {
  switch (value) {
    case '1': return Math.PI / 2;
    case '2': return Math.PI;
    case '3': return 2 * Math.PI;
    case '0':
    default: return 0;
  }
}

function propertyChange(event, value) {
  var parent = event.target.parentNode.parentNode;
  var accessType = parent.children[2];
  var from = parent.children[3];
  var to = parent.children[4];
  if (value == 2) {
    from.children[1].style.display = 'none';
    from.children[2].style.display = '';
    to.children[1].style.display = 'none';
    to.children[2].style.display = '';
    accessType.lastElementChild.value = 'null';
    accessType.lastElementChild.disabled = false;
  } else if (value == 3) {
    accessType.lastElementChild.value = 'style';
    accessType.lastElementChild.disabled = true;
  } else {
    from.children[2].style.display = 'none';
    from.children[1].style.display = '';
    to.children[2].style.display = 'none';
    to.children[1].style.display = '';
    accessType.lastElementChild.value = 'null';
    accessType.lastElementChild.disabled = false;
  }
}

function leftToRgiht(value) {
  this.setPosition(value, this.getPosition().y);
}

function bottomToTop(value) {
  this.setPosition(this.getPosition().x, value);
}

function rotate(value) {
  this.setRotation(value);
}

function colorTwinkle(value) {
  value = parseInt(value);
  if (value < 50) {
    this.s("body.color", "rgb(175, 62, 167)");
  } else {
    this.s("body.color", "rgb(228, 147, 6)");
  }
}

function colorChange(value) {
  this.s("body.color", "rgb(" + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ")");
}

function changeBorder(value) {
  this.s('border.color', "rgb(" + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ")");
}

function borderWidthChange(value){
 this.s('border.width', value);
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
