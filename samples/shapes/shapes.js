function init(){                                
  dataModel = new ht.DataModel();
  graphView = new ht.graph.GraphView(dataModel);
  view = graphView.getView();            

  view.className = 'main';
  document.body.appendChild(view);    
  window.addEventListener('resize', function (e) {
      graphView.invalidate();
  }, false);  


  graphView.setEditable(true);
  graphView.setZoom(0.8);
  graphView.translate(-80, -50);

  var w = 60, h = 40;
  var shapes = ['rect', 'circle', 'oval', 'roundRect', 'star', 'triangle', 'hexagon', 'pentagon', 'diamond', 'rightTriangle', 'parallelogram', 'trapezoid'];
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      node.setName(shapes[i]);
      node.setSize(w, h);                    
      node.setPosition(70 + i * 80, 50);
      node.setStyle('shape', shapes[i]); 
      dataModel.add(node);
  }
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      node.setName(shapes[i]);
      node.setSize(w, h);                    
      node.setPosition(70 + i * 80, 150);
      node.setStyle('shape', shapes[i]);
      node.setStyle('shape.border.width', 1);
      node.setStyle('shape.border.color', 'yellow');
      node.setStyle('shape.repeat.image', '../../assets/ie.png');
      dataModel.add(node);
  }
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      node.setName(shapes[i]);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 250);
      node.setStyle('shape', shapes[i]);
      node.setStyle('shape.background', null);
      node.setStyle('shape.border.width', 5);
      node.setStyle('shape.border.3d', true);
      dataModel.add(node);
  }
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      node.setName(shapes[i]);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 350);
      node.setStyle('shape', shapes[i]);
      node.setStyle('shape.background', null);
      node.setStyle('shape.border.width', 1);
      node.setStyle('shape.border.pattern', [5, 5]);
      dataModel.add(node);
  } 
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      node.setName(shapes[i]);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 450);
      node.setStyle('shape', shapes[i]);
      node.setStyle('shape.background', null);
      node.setStyle('shape.border.width', 6);
      node.setStyle('shape.border.cap', 'butt');
      node.setStyle('shape.dash', true);
      node.setStyle('shape.dash.3d', true);
      node.setStyle('shape.dash.pattern', [5]);
      node.setStyle('shape.dash.color', 'red');
      node.setStyle('shape.dash.width', 4);
      dataModel.add(node);
  } 
  for (var i = 0; i < shapes.length; i++) {
      var node = new ht.Node();
      var side = i + 3;
      node.setName('Pology ' + side);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 550);
      node.setStyle('shape', 'polygon');
      node.setStyle('shape.polygon.side', side);
      node.setStyle('shape.border.width', 6);
      node.setStyle('shape.border.cap', 'butt');
      node.setStyle('shape.dash', true);
      node.setStyle('shape.dash.3d', true);
      node.setStyle('shape.dash.pattern', [5]);
      node.setStyle('shape.dash.color', 'red');
      node.setStyle('shape.dash.width', 4);
      node.setStyle('shape.gradient', 'linear.south');
      node.setStyle('shape.background', 'yellow');
      dataModel.add(node);
  }         
  for (var i = 0; i < 10; i++) {
      var node = new ht.Node();                    
      node.setName('Arc ' + i * 30);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 650);
      node.setStyle('shape', 'arc');
      node.setStyle('shape.arc.from', Math.PI * 2 * i * 30 / 360);
      node.setStyle('shape.border.width', 4);
      node.setStyle('shape.border.cap', 'butt');
      node.setStyle('shape.dash', true);
      node.setStyle('shape.dash.3d', true);
      node.setStyle('shape.dash.pattern', [5]);
      node.setStyle('shape.dash.color', 'red');
      node.setStyle('shape.gradient', 'linear.south');
      node.setStyle('shape.repeat.image', '../../assets/ie.png');
      dataModel.add(node);
  }   
  for (var i = 0; i < 10; i++) {
      var node = new ht.Node();                    
      node.setName('Arc ' + i * 30);
      node.setSize(w, h);
      node.setPosition(70 + i * 80, 750);
      node.setStyle('shape', 'arc');
      node.setStyle('shape.arc.oval', true);
      node.setStyle('shape.arc.from', 0);
      node.setStyle('shape.arc.to', Math.PI * 2 - Math.PI * 2 * i * 30 / 360);
      node.setStyle('shape.arc.close', false);
      node.setStyle('shape.background', null);
      node.setStyle('shape.border.width', 4);
      node.setStyle('shape.border.cap', 'butt');
      node.setStyle('shape.dash', true);
      node.setStyle('shape.dash.3d', true);
      node.setStyle('shape.dash.pattern', [5]);
      node.setStyle('shape.dash.color', 'red');
      dataModel.add(node);
  }                   
  
}