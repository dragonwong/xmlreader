	var stage_tree = document.getElementById('stage-tree'),
		stage_node = document.getElementById('stage-node'),
		stage_node_show = document.getElementById('stage-node-show'),
		bt_show_back = document.getElementById('bt-show-back'),
		xr_nodes,	/* xmlreader nodes */
		xr_parend_id;	/* parent's id of selected node in stage-node */







//test start
	document.getElementById('bt-show-tree').onclick = function(){
		showStage('tree');
	};
	bt_show_back.onclick = function(){
		//console.log(xr_parend_id);
		if(xr_parend_id != -1){
			renderStageNode(xr_parend_id);
		}
	};



	//render stage_tree
	function renderStageNode(xr_id){
		var html = '',
			this_node = xr_nodes[xr_id],
			children = this_node.children,
			parent_id = this_node.parent_id;

		xr_parend_id = parent_id;
		if(parent_id == -1){
			bt_show_back.addClass('h');
		}else{
			bt_show_back.removeClass('h');
		}

		//this_node
		html += '<div class="node this" data-xr_id="' + xr_id + '"><p class="title">' + this_node.name + '</p></div>';

		//this_node
		children.forEach(function(item, index){
			var xr_node = xr_nodes[item],
				y = index * 75;

			html += '<div class="node children" data-xr_id="' + xr_node.id + '"style="top: ' + y + 'px;"><p class="title">' + xr_node.name + '</p></div>';
		})

		stage_node_show.innerHTML = html;


		//add event

		var dom_children = [].slice.call(document.querySelectorAll('#stage-node .children')),
			dom_this_node = document.querySelector('#stage-node .this');

		dom_children.forEach(function(item, index){
			item.onclick = function(){
				this.addClass('selected');
				dom_children.splice(index, 1);
				select(this.dataset['xr_id']);
				//console.log(this);
			};
		});

		function select(selected_node_id){
			dom_children.push(dom_this_node);
			//console.log(test_children);
			dom_children.forEach(function(item){
				item.addClass('unselected');
			});
			setTimeout(function(){
				renderStageNode(selected_node_id);
			},600);
		}

	}


















//progress_bar
	var progress_bar = {
		dom: document.getElementById("progress-bar"),
		start: function(){
			var dom = this.dom;
			dom.removeClass('end').addClass('start');
		},
		end: function(){
			var dom = this.dom;
			dom.addClass('end').removeClass('start');
		}
	};
	




//bt_list click start
	(function(){
		var	body = document.body,
			bt_list = document.getElementById('bt-list');

		bt_list.onclick = function(){
			body.toggleClass('hide-menu');
		};
	})();




	
// menu fun click
	(function(){
		var menu_bts = Array.prototype.slice.call(document.querySelectorAll('.fun .bt')),
			menu_pns = Array.prototype.slice.call(document.querySelectorAll('.cnt .pn')),
			cur = 0;

		menu_bts.forEach(function(item, index){
			item.onclick = function(){
				if(index != cur){
					menu_bts[cur].removeClass("h");
					menu_pns[cur].removeClass("h");
					cur = index;
					item.addClass("h");
					menu_pns[cur].addClass("h");

					//online
					if(index == 1){
						createOnlineFileList();
					}
				}
			};
		});


		/* function */
		function createOnlineFileList(){
			progress_bar.start();
			ajaxGet("json/file_list.json", '', onlineFileListCallBack);

			function onlineFileListCallBack(back_data){
				var arr_list = JSON.parse(back_data);
				var html = '';

				if(arr_list.length == 0){
					html = "No file online, you can upload some :)";
				}else{
					arr_list.forEach(function(item){
						html += '<div class="item"><div class="upper"><div class="name">' + item.name + '</div><div class="bt bt-menu"><span class="icon-list"></span></div></div><div class="lower"><div class="bt bt-download"><span class="icon-download"></span></div><div class="bt bt-info"><span class="icon-info"></span></div><div class="bt bt-rename"><span class="icon-pencil"></span></div><div class="bt bt-delete"><span class="icon-trash"></span></div></div></div>';
					});
				}

				document.querySelector('.online .list').innerHTML = html;
				addOnlineFileListEvent();

				progress_bar.end();

				//function
				function addOnlineFileListEvent(){
					/* bt-menu click start */
					(function(){
						var items = Array.prototype.slice.call(document.querySelectorAll('.item')),
							bt_menus = Array.prototype.slice.call(document.querySelectorAll('.item .bt-menu')),
							cur = -1,
							class_name = 'show-menu';

						bt_menus.forEach(function(item, index){
							item.onclick = function(){
								if(index != cur){
									if(cur != -1){
										items[cur].removeClass(class_name);
									}
									cur = index;
									items[cur].addClass(class_name);
								}else{
									items[cur].toggleClass(class_name);
								}
							};
						});
					})();
					/* bt-menu click end */

					/* name click start */
					(function(){
						var online_file_names = Array.prototype.slice.call(document.querySelectorAll('.item .name')),
							online_file_names_cur = -1,
							class_name = 'h';

						online_file_names.forEach(function(item, index){
							item.onclick = function(){
								if(index != online_file_names_cur){
									if(online_file_names_cur != -1){
										online_file_names[online_file_names_cur].removeClass(class_name);
									}
									online_file_names_cur = index;
									item.addClass(class_name);

									//asyn
									progress_bar.start();
									getXML(arr_list[index].url, asynParseXml);
								}
							};
						});


						//function
						function asynParseXml(xml){
							renderStageTree(xml);
							progress_bar.end();
						}

					})();
					/* name click end */
				}
			}
		}


	})();





//upload
	(function(){
		var	ip_file = document.getElementById("ip_file"),
			prompt_file = document.getElementById("prompt_file"),
			submit = document.getElementById("submit"),
			submit_span = submit.parentElement;

		submit.onclick = function(){
			console.log('submit');
			return false;
		};

		ip_file.onchange = function(){

			if(this.files.length){		//has file

				var file = this.files[0],
					type = 'default',
					reader = new FileReader();

				console.log(file.type);

				if('text/xml' == file.type){
					reader.readAsText(file);
					type = 'xml';
				}else{
					console.log('not xml');
				}

				reader.onerror = function(){
					console.log('cannot read: ' + reader.error.code);
				};

				reader.onprogress = function(){
					if(event.lengthComputable){
						console.log(event.loaded + '/' + event.total);
					}
				};

				reader.onload = function(){

					if(type == 'xml'){
						//show file name
						prompt_file.innerHTML = file.name;
						//able submit button
						submit_span.removeClass('disabled');
						//able submit function
						//code...

						//parse xml
						var xml = parseXml(reader.result);
						renderStageTree(xml);

					}
				}
			}else{						//no file
				prompt_file.innerHTML = 'no file selected';
				submit_span.addClass('disabled');
				//disable submit function
				//code...

				stage_tree.innerHTML = '';
			}
		};
	})();







//render stage_tree
	function renderStageTree(xml){
		showStage('tree');
		//create stage_tree dom
		stage_tree.innerHTML = xmlTree(xml);
		//add event
		var selfs = [].slice.call(document.querySelectorAll('#stage-tree .self'));

		selfs.forEach(function(item){
			item.onclick = function(){
				showStage('node');
				renderStageNode(this.dataset['xr_id']);
			};
		})







		//function
		function xmlTree(xml){

			//根节点
			var root = xml.documentElement,

				xr_node_id = -1,
				xr_node_parent_stack = [];	/* 父节点反向栈 */

			xr_nodes = [];	/* 清空 */

			xr_node_parent_stack[0] = {
				id: -1,
				children: []
			};


			//开始构建输出
			var output = '<ul>';

			//main
			(function main(node){

				var children,
					children_len;

				if(children in node){
					children = node.children;
					children_len = children.length;
				}else{
					var child_nodes = node.childNodes;
					child_nodes_len = child_nodes.length;
					children = [];

					for(var i=0; i<child_nodes_len; i++){
						var this_node = child_nodes[i];
						if(this_node.nodeType == 1){
							children.push(this_node);
						}
					}

					children_len = children.length;
				}


				//xr_nodes
				xr_node_id++;

				var xr_node_parent = xr_node_parent_stack[0];
				
				/* 父元素子元素属性 */
				xr_node_parent.children.push(xr_node_id);

				var xr_node = {
					id: xr_node_id,
					name: node.nodeName,
					parent_id : xr_node_parent.id,
					children: []
				};

				xr_nodes.push(xr_node);


				

				//开始构建该节点
				output += '<li class="tree">';

					//开始构建自身内容
					output += '<div class="self" data-xr_id="' + xr_node_id + '">';

						//取该节点名字
						output += '<span class="nodeName">' + node.nodeName + '</span>';

						//取构建节点信息
						output += fragInfo(node, children_len);

					//结束构建该节点自身内容
					output += '</div>';


					//构建子节点内容
					if(children_len > 0){
						//如果有子节点

						xr_node_parent_stack.unshift(xr_node);	/* 父元素进栈 */

						//递归子节点
						output += '<ul class="tree">';
						for(var i=0; i<children_len; i++){
							arguments.callee(children[i]);
						}
						output += '</ul>';

						xr_node_parent_stack.shift(xr_node);	/* 父元素进栈 */

					}

				//结束构建该节点
				output += '</li>';


			})(root);


			//结束构建输出
			output += '</ul>';

			return output;


			/* 内部方法 */

			//构建节点信息
			function fragInfo(node, children_len){

				var fragment = '';
				
				//取节点信息-属性
				fragment += fragAttr(node);

				//如果无子节点
				//取节点信息-值
				if(children_len == 0){
					
					//Text or CDATASection
					//output += '<div class="nodeValue">' + '值：' + node.childNodes[0] + '</div>';
					var childNodes = node.childNodes,
						text_value = '';

					//如果有值
					if(childNodes.length){
						text_value = htmlEnCode(childNodes[0].nodeValue);
					}
					
					fragment += '<div class="nodeValue">' + 'value：' + text_value + '</div>';
				}

				//如果有内容，用div包装
				if(fragment){
					fragment = '<div class="nodeInfo">' + fragment + '</div>';
				}

				return fragment;
			}

			//构建节点信息-属性
			function fragAttr(node){

				var attr = node.attributes,
					attr_length = attr.length,
					fragment = '';

				//判断有无属性
				if(attr_length){
					//开始构建节点信息-属性
					fragment += '<div class="attr">';

						//tit
						fragment += '<div class="tit">attributes</div>';

						//开始构建属性列表
						fragment += '<ul class="attrList">';

							for(var i=0; i<attr_length; i++){
								fragment += '<li><span class="attrName">' + attr[i].nodeName + '</span>: <span class="attrValue">' + attr[i].nodeValue + '</li>';
							}

						//结束构建属性列表
						fragment += '</ul>';

					
					//结束构建节点信息-属性
					fragment += '</div>';
				}

				return fragment;
			}

			//转义组件开始
			function htmlEnCode(text){
		        var temp = document.createElement("DIV"); 
		        setInnerText(temp, text);
		        text = temp.innerHTML;
		        temp = null;

		        return text; 
		    }

		    function setInnerText(element, text){                   //debug ff
		        if(typeof element.textContent == "string"){
		            element.textContent = text;
		        }else{
		            element.innerText = text;
		        }
		    }
			//转义组件结束
		}

	}


//show stage
	function showStage(stage){
		console.log(stage);
		switch(stage){
			case 'tree':
				stage_tree.addClass('h');
				stage_node.removeClass('h');
				break;
			case 'node':
				stage_node.addClass('h');
				stage_tree.removeClass('h');
				break;
		}
	}





//lib

	//xml parser
	var parseXml = function(xmlStr) {
        return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
    };

	//ajax
	function getXML(url, callback){
        var xhr = new XMLHttpRequest();

        xhr.open("get", url, true);
        xhr.send(null);

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
                    callback(xhr.responseXML);
                }else{
                    console.log("failed: " + xhr.status);
                }
            }
        };
    }
    function ajaxGet(url, data, callback){
        var xhr = new XMLHttpRequest();

        url = url + "?" + data;

        xhr.open("get", url, true);
        xhr.send(null);

        xhr.onreadystatechange = function(){
        	if(xhr.readyState == 4){
		        if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
		            callback(xhr.responseText);
		        }else{
		            console.log("failed: " + xhr.status);
		        }
		    }
		};
    }

    Element.prototype.hasClass = function(name){
        return this.className.match(new RegExp('\\b'+name+'(\\s|$)','g'));
    };
    Element.prototype.addClass = function(name){
        if(this.classList == undefined){
            if(!this.hasClass(name)){
                this.className = this.className+' '+name;  
            }
        }else{
            this.classList.add(name);
        }
        return this;
    };
    Element.prototype.removeClass = function(name){
        if(this.classList == undefined){
            this.className = this.className.replace(new RegExp('\\b'+name+'(\\s|$)','g'),"");  
        }else{
            this.classList.remove(name);
        }
        return this;
    };
    Element.prototype.toggleClass = function(name){
    	if(this.hasClass(name)){
    		this.removeClass(name);
    	}else{
    		this.addClass(name);
    	}
    };