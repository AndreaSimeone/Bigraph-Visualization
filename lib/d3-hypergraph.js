(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

	var hypergraph = function (links,nodes) {
		var obj;
		var hyper = [];
		var nodesLinked = [];
		var	i;
		var	j;
		var	k;
		var nodeLDepth;
		links.forEach(function(d) {
			//if link length >2 there's an Hyperlink: i need to create a connection node
			if (d.length > 2) {
			//connection node id creation
				var	id = 'ln';
				for(k = 0; k < d.length; k++) {
					id += d[k];
				}
			//search for the nodes that are connected by hypergraph
				d.forEach(function(e){
					obj = nodes.filter(function ( obj ) {
						if (!obj.link)
					    return obj.data.id === e;
					})[0];
					nodesLinked.push(obj);
				})
				//search for undefined entry (for example interfaces nodes aren't into the nodes passed to the function)
				nodesLinked = nodesLinked.filter(function(n){ return n != undefined }); 
			//sorting the nodes to find  less deep to assign it to the linknode 
				nodesLinked.sort(function(e,f){
					return d3.ascending(e.depth,f.depth);
				});
			//if multiple nodes have the same depth search for presence of other linknodes
				var nodesWithSameDepth = nodesLinked.filter(function (x){return x.depth<=nodesLinked[0].depth});
				
				if (nodesWithSameDepth.length >1){
				for (var i=0;i<nodesWithSameDepth.length;i++){
					nodesWithSameDepth[i].linkNodeNumb = nodesWithSameDepth[i].parent.children.filter(x=>x.link).length;
					
				}
				nodesWithSameDepth.sort(function(e,f){
					return d3.ascending(e.linkNodeNumb,f.linkNodeNumb);
				});
				}
			//connection node creation
				i = {id: id,link: true,depth:nodesLinked[0].depth,parent:nodesWithSameDepth[0].parent};
			//creation of reference of the parent for the new child node
				if(nodesWithSameDepth[0].parent !== null){
					nodesWithSameDepth[0].parent.children.push(i);
				}
			//add the connection node to the node array
				nodes.push(i);
				nodesLinked = [];
			//creation of the link from every node of the connection set to the connection node
				for (j = 0; j < d.length; j++) {
					hyper.push({source: d[j], target: i.id});
				}
			}else{
			//if link < 2 then the connection is the traditional one w/o connection node
				hyper.push({source: d[0],target: d[1]});
			}
		});
		
		 var obj  = {links:hyper,nodes:nodes};
		 return obj;
	}

	exports.hypergraph = hypergraph;

	Object.defineProperty(exports, '__esModule', { value: true });

}));