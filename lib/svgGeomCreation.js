//funzione per la creazione degli elementi geometrici presenti all'interno del rendering del Bigrafo
var geomCreation = function (select,node){
	 var elem;
	 
		 switch(node.data.shape) {
				case "rect":
					elem = createRect(select,node);
					break;
				case "circle":
					elem = createCircle(select,node);
					break;
				case "ellipse":
					elem = createEllipse(select,node);
					break;
				case "polygon":
					elem = createPoly(select,node);
					break;
		 }
		 return elem;
}

//funzione per la creazione della figura Rettangolo con angoli arrotondati
function createRect(select, node){
	var MULTX = 25;
	var MULTY = 15;
	var width = node.descendants().length;
	var height = node.descendants().length;
	select.append("rect")
	.attr("id",function(){return "E"+ node.data.id;})
  .attr("width", function(){
		
		return (MULTX*width/Math.sqrt(NRCount));
	})
	.attr("height",function(){
		
		return (MULTY*height/Math.sqrt(NRCount));
 	})
	.attr("rx",5/Math.sqrt(NRCount))
	.attr("ry",5/Math.sqrt(NRCount))
	.style("stroke", "black")
	.style("stroke-width", 0.5)
	.style("fill",function(){return node.data.color;})
	.select(function(){ return this.parentNode;})
	.append("text")
	.attr("font-size", 10)
	.attr("dx", 5)
	.attr("dy", 10)
	.text(function() { return node.data.id });
}

//funzione per la creazione della figura Cerchio
function createCircle(select, node){
	var MULT = 5;
	var r = node.descendants().length;
	select.append("circle")
	.attr("id",function(){return "E"+ node.data.id;})
	.attr("r",  r * MULT)
	.style("stroke", "black")
	.style("stroke-width", 0.5)
	.style("fill",function(){return node.data.color;})
	.select(function(){ return this.parentNode;})
	.append("text")
	.attr("font-size", 10)
	.attr("dx", function (d){
		if (d.depth % 2 === 0)
			return r * MULT /NRCount
		else
			return -r * MULT /NRCount	
	})
	.attr("dy", function (d){
		if (d.depth % 2 === 0)
			return r * MULT /NRCount
		else
			return -r * MULT /NRCount	
	})
	.text(function() { return node.data.id });
}

//funzione per la creazione della figura Elisse
function createEllipse(select, node){
	var MULTRX = 16;
	var MULTRY = 9;
	var r = node.descendants().length;
	select.append("ellipse")
	.attr("id",function(){return "E"+ node.data.id;})
	.attr("rx",function(d){
		return r*MULTRX/Math.sqrt(NRCount);
	})
	.attr("ry",function(d){
		return r*MULTRY/Math.sqrt(NRCount);
	})
	.style("stroke", "black")
	.style("stroke-width", 0.5)
	.style("fill",function(){return node.data.color;})
	.select(function(){ return this.parentNode;})
	.append("text")
	.attr("font-size", 10)
	.attr("dx", function(d){
		if (d.depth % 2 === 0){
			return r*MULTRX/Math.sqrt(NRCount);
		}else{
			return -r*MULTRX/Math.sqrt(NRCount);
		}
	})
	.attr("dy", function(d){
		if (d.depth % 2 === 0){
			return r*MULTRY/2;
		}else{
			return -r*MULTRY/2;
		}
	})
	.text(function() { return node.data.id });
}

//funzione per la creazione della figura Poligono Regolare
 function createPoly(select,node){
	 var DIM = 15/Math.sqrt(NRCount);
	 select = select || d3.select('svg').append('g');
	 var sides = node.data.sides;
	 var dim = node.descendants().length * DIM;
   var svg_line     = d3.line;
	 var id = node.data.id;
   var line         = svg_line()
   .x(function(d){return d.x;})
   .y(function(d){return d.y;});
	var poly = getCoords(dim,sides);
	var element = select.selectAll('path')
	.append("text")
	.attr("font-size", 10)
	.attr("dx",10)
	.attr("dy",10)
		.data([poly])
		.enter()
		.append('path')
		.attr("id",id)
		.attr('d', function(d){return line(d) + 'Z';})
	.style("stroke", "black")
	.style("stroke-width", 0.5)
 	.style("fill","transparent")
 	.style("stroke","black");
	select.append("text")
	.attr("font-size", 10)
	.attr("dx",-dim)
	.attr("dy",-dim)
	.text(function(){return node.data.id;});
	
 	return element;
 }
 
 //Funzione per il calcolo dei vertici per la creazione del poligono regolare
 function getCoords(radius, sides) {
	var TAU = Math.PI * 2;
	return d3.range(sides).map(function(d){
		var cx           = 0;  // center x
		var cy           = 0;  // center y
		var start_angle;
		if (sides % 2 != 0){
			var vY = 90-(360/sides);
			start_angle  = vY*Math.PI/180;
		}else{
			start_angle = 0;
		}
		var center_angle = TAU / sides;
		var curr_angle   = start_angle + (d * center_angle);
		var vx           = Math.round(cx + radius * Math.cos(curr_angle));
		var vy           = Math.round(cy - radius * Math.sin(curr_angle));
		return {
			'label': 'L' + d,
			'x': vx,
			'y': vy
		};
	});
}