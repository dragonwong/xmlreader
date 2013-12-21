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
		this.classList.toggle(name);
    };


//main
	var xr = {

		body: document.body,
		page: document.getElementById('page'),
		stage_tree: document.getElementById('stage-tree'),
		stage_node: document.getElementById('stage-node'),
		stage_note: document.getElementById('stage-note'),
		bt_back: document.getElementById('bt-back'),
		bt_note: document.getElementById('bt-note'),
		bt_note_isable: true,
		xr_nodes: [],
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
			ajaxGet("json/ENLS_admin.json", '', callback);

			function callback(back_data){
				var _list = JSON.parse(back_data),
					_dom = document.querySelectorAll('#menu .pn .list');


				_eachPane(_list.topics, _dom[0]);
				_eachPane(_list.subtopics, _dom[1]);

				_addOnlineFileListEvent();
				xr.progress_bar.end();

				//function
				function _eachPane(arr_list, dom){
					var _html = '';

					if(arr_list.length == 0){
						_html = "No file online, you can upload some :)";
					}else{
						arr_list.forEach(function(item){
							_html += '<div class="item"><div class="name" data-url="' + item.url + '">' + item.name + '</div></div>';
						});
					}

					dom.innerHTML = _html;
				}

				function _addOnlineFileListEvent(){

					// name click
					(function(){
						var online_file_names = Array.prototype.slice.call(document.querySelectorAll('#menu .item .name')),
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
							
							var data = JSON.parse(back_data);
							xr.xr_nodes = data.nodes;

							xr.renderStageTree();
							xr.renderStageNode(0);
							xr.renderStageNote(data.notes, data.checklist);
							
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
					xr.page.removeClass('show-node').removeClass('show-note').addClass('show-tree');
					break;
				case 'node':
					xr.page.removeClass('show-tree').removeClass('show-note').addClass('show-node');
					break;
				case 'note':
					xr.page.removeClass('show-tree').removeClass('show-node').addClass('show-note');
					break;
			}
		},

		renderStageTree: function(){

			xr.showStage('tree');
			//create stage_tree dom
			xr.stage_tree.innerHTML = xmlTree();
			//add event
			var selfs = Array.prototype.slice.call(document.querySelectorAll('#stage-tree .self'));

			selfs.forEach(function(item){
				item.onclick = function(){
					this.addClass('h');
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

			xr.showStage('node');

			xr.xr_parend_id = parent;
			if(parent == -1){
				xr.bt_back.removeClass('able');
			}else{
				xr.bt_back.addClass('able');
			}

			//this self
			html += '<div class="this" data-xr_id="' + xr_id + '"><div class="node"><p class="title">' + this_node.title + '</p><p class="body">' + this_node.body + '</p></div></div>';

			//explanation
			html += '<div class="explanation">';
			html += '<div class="detail">' + this_node.explanation + '</div>';
			html += '</div>';

			//children
			if(children.length > 0){
				html += '<div class="next"><div class="detail">';
				children.forEach(function(item, index){
					var xr_node = xr.xr_nodes[item];

					html += '<div class="node" data-xr_id="' + xr_node.id + '"><p class="title">' + xr_node.title + '</p><p class="body">' + xr_node.body + '</p></div>';
				})
				html += '</div></div>';
			}
			
			xr.stage_node.innerHTML = html;


			//add event
			var dom_children = Array.prototype.slice.call(document.querySelectorAll('#stage-node .next .node'));
			dom_children.forEach(function(item, index){
				item.onclick = function(){
					xr.renderStageNode(this.dataset['xr_id']);
				};
			});

		},

		renderStageNote: function(notes, checklist){

			var html = '',
				items,
				len,
				bt_isable = false;
			
			//notes
			items = notes.content;
			len = items.length;

			if(len > 0){
				bt_isable = true;

				html += '<div class="notes"><div class="header">' + notes.title + '</div><div class="detail"><ul>';
				for(var i=0; i<len; i++){
					html += '<li>' + items[i] + '</li>';
				}
				html += '</ul></div></div>';
			}

			//checklist
			items = checklist.list;
			len = items.length;

			if(len > 0){
				bt_isable = true;

				html += '<div class="checklist"><div class="header">' + checklist.title + '</div><div class="detail"><ul>';
				for(var i=0; i<len; i++){
					html += '<li><input type="checkbox" id="checkbox-' + i + '" /><label for="checkbox-' + i + '">' + items[i] + '</label></li>';
				}
				html += '</ul></div></div>';
			}

			if(bt_isable){
				xr.bt_note.removeClass('disable');
			}else{
				xr.bt_note.addClass('disable');
			}

			xr.bt_note_isable = bt_isable;
			xr.stage_note.innerHTML = html;
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

			//bt in stage
			document.getElementById('bt-node').onclick = function(){
				xr.showStage('node');
			};
			document.getElementById('bt-tree').onclick = function(){
				xr.showStage('tree');
			};
			xr.bt_note.onclick = function(){
				if(xr.bt_note_isable){
					xr.showStage('note');
				}
			};
			xr.bt_back.onclick = function(){
				//只有当当前节点没有父节点且显示在node页面才可点击
				if(xr.xr_parend_id != -1 && xr.page.hasClass('show-node')){
					xr.renderStageNode(xr.xr_parend_id);
				}
			};

		}
	}

	xr.init();
