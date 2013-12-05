//add state for touching in mobile
	document.addEventListener("touchstart",function(){}, true);

//lib
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


//main
	var xr = {

		body: document.body,
		stage_tree: document.getElementById('stage-tree'),
		stage_node: document.getElementById('stage-node'),
		bt_show_back: document.getElementById('bt-show-back'),
		stage_node_show: document.getElementById('stage-node-show'),
		stage_node_info: document.getElementById('stage-node-info'),
		xr_nodes: [],		/* xmlreader nodes */
		xr_parend_id: -1,	/* parent's id of selected node in stage-node */

		progress_bar: {
			dom: document.getElementById("progress-bar"),
			start: function(){
				var dom = this.dom;
				dom.removeClass('end').addClass('start');
			},
			end: function(){
				var dom = this.dom;
				dom.addClass('end').removeClass('start');
			}
		},

		menuToggle: function(){
			xr.body.toggleClass('hide-menu');
		},

		createOnlineFileList: function(){

			xr.progress_bar.start();
			ajaxGet("json/_list.json", '', callback);

			function callback(back_data){
				var _list = JSON.parse(back_data),
					cnt = document.querySelector('#menu .cnt'),
					_dom = cnt.querySelectorAll('.pn .list');


				_eachPane(_list.topics, _dom[0]);
				_eachPane(_list.sub_topics, _dom[1]);

				_addOnlineFileListEvent();
				xr.progress_bar.end();

				//function
				function _eachPane(arr_list, dom){
					var _html = '';

					if(arr_list.length == 0){
						_html = "No file online, you can upload some :)";
					}else{
						arr_list.forEach(function(item){
							_html += '<div class="item"><div class="upper"><div class="name" data-url="' + item.url + '">' + item.name + '</div><div class="bt bt-menu"><span class="icon-list"></span></div></div><div class="lower"><div class="bt bt-download"><span class="icon-download"></span></div><div class="bt bt-info"><span class="icon-info"></span></div><div class="bt bt-rename"><span class="icon-pencil"></span></div><div class="bt bt-delete"><span class="icon-trash"></span></div></div></div>';
						});
					}

					dom.innerHTML = _html;
				}

				function _addOnlineFileListEvent(){
					// bt-menu click
					(function(){
						var items = Array.prototype.slice.call(cnt.querySelectorAll('.pn .list .item')),
							bt_menus = Array.prototype.slice.call(document.querySelectorAll('.pn .list .item .bt-menu')),
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

					// name click
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
									this.addClass(class_name);

									//asyn
									xr.progress_bar.start();
									ajaxGet(this.dataset['url'], '', callback);
								}
							};
						});

						function callback(back_data){
							
							xr.xr_nodes = JSON.parse(back_data).nodes;
							xr.renderStageTree();
							
							xr.progress_bar.end();

							//menu slide out in mobile
							if(xr.body.scrollWidth <= 600){
								xr.menuToggle();
							}
						}

					})();

				}
			}
		},

		showStage: function(stage){
			switch(stage){
				case 'tree':
					xr.stage_tree.addClass('h');
					xr.stage_node.removeClass('h');
					break;
				case 'node':
					xr.stage_node.addClass('h');
					xr.stage_tree.removeClass('h');
					break;
			}
		},

		renderStageTree: function(){

			var showStage = this.showStage;
			
			showStage('tree');
			//create stage_tree dom
			xr.stage_tree.innerHTML = xmlTree();
			//add event
			var selfs = Array.prototype.slice.call(document.querySelectorAll('#stage-tree .self'));

			selfs.forEach(function(item){
				item.onclick = function(){
					showStage('node');
					xr.renderStageNode(this.dataset['xr_id']);
				};
			});

			function xmlTree(){

				//根节点
				var root = xr.xr_nodes[0];

				//开始构建输出
				var output = '<ul>';

				//main
				(function main(node){

					var children = node.children,
						children_len = children.length;
					

					//开始构建该节点
					output += '<li class="tree">';

						//开始构建自身内容
						output += '<div class="self" data-xr_id="' + node.id + '">';

							//取该节点名字
							output += '<span class="nodeName">' + node.shortTitle + '</span>';


						//结束构建该节点自身内容
						output += '</div>';


						//构建子节点内容
						if(children_len > 0){		//如果有子节点

							//递归子节点
							output += '<ul class="tree">';
							for(var i=0; i<children_len; i++){
								arguments.callee(xr.xr_nodes[children[i]]);
							}
							output += '</ul>';

						}

					//结束构建该节点
					output += '</li>';


				})(root);

				//结束构建输出
				output += '</ul>';

				return output;

			}

		},

		renderStageNode: function (xr_id){

			var html = '',
				this_node = xr.xr_nodes[xr_id],
				children = this_node.children,
				parent = this_node.parent;

			xr.xr_parend_id = parent;
			if(parent == -1){
				xr.bt_show_back.addClass('h');
			}else{
				xr.bt_show_back.removeClass('h');
			}

			//this_node
			html += '<div class="node this" data-xr_id="' + xr_id + '"><p class="title">' + this_node.title + '</p><p class="body">' + this_node.body + '</p></div>';

			//children
			html += '<div class="children">';
			children.forEach(function(item, index){
				var xr_node = xr.xr_nodes[item];

				html += '<div class="node" data-xr_id="' + xr_node.id + '"><p class="title">' + xr_node.title + '</p><p class="body">' + xr_node.body + '</p></div>';
			})
			html += '</div>';

			xr.stage_node_show.innerHTML = html;


			//add event

			var dom_children = Array.prototype.slice.call(document.querySelectorAll('#stage-node .children .node')),
				dom_this_node = document.querySelector('#stage-node .this');

			dom_children.forEach(function(item, index){
				item.onclick = function(){
					xr.stage_node_show.style.minHeight = xr.stage_node_show.scrollHeight + 'px';
					item.style.top = item.offsetTop + 'px';
					item.style.left = item.offsetLeft + 'px';
					this.addClass('selected');
					dom_children.splice(index, 1);
					select(this.dataset['xr_id']);
				};
			});

			//info

			xr.stage_node_info.innerHTML = this_node.explanation;

			function select(selected_node_id){
				dom_children.push(dom_this_node);
				dom_children.forEach(function(item){
					item.addClass('unselected');
				});
				setTimeout(function(){
					xr.stage_node_show.style.minHeight = '0px';
					xr.renderStageNode(selected_node_id);
				},600);
			}

		},

		init: function(){

			//bt_list click
			document.getElementById('bt-list').onclick = xr.menuToggle;
			
			// load online file
			xr.createOnlineFileList();

			// menu fun click
			(function(){
				var menu_bts = Array.prototype.slice.call(document.querySelectorAll('#menu .fun .bt')),
					menu_pns = Array.prototype.slice.call(document.querySelectorAll('#menu .cnt .pn')),
					cur = 0;

				menu_bts.forEach(function(item, index){
					item.onclick = function(){
						if(index != cur){
							menu_bts[cur].removeClass("h");
							menu_pns[cur].removeClass("h");
							cur = index;
							item.addClass("h");
							menu_pns[cur].addClass("h");
						}
					};
				});

			})();

			//bt in stage_node
			document.getElementById('bt-show-tree').onclick = function(){
				xr.showStage('tree');
			};
			xr.bt_show_back.onclick = function(){
				if(xr.xr_parend_id != -1){
					xr.renderStageNode(xr.xr_parend_id);
				}
			};

		}
	}

	xr.init();
