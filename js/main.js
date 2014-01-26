//add state for touching in mobile
	document.addEventListener("touchstart",function(){}, true);

//lib
    function ajaxGet(url, callback){
        var xhr = new XMLHttpRequest();

        xhr.open("get", url, true);
        xhr.send(null);

        xhr.onreadystatechange = function(){
        	if(xhr.readyState == 4){
		        if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
		            callback(xhr.responseText);
		        }else{
		            console.log("failed: " + xhr.status);
		            if(xhr.status = 404){
		            	alert('The address does not exist.');
		            }
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
		xr_json: '',
		xr_nodes: {},
		xr_history: {
			_arr: [],
			push: function(item){
				if(this._arr.length == 0){
					xr.bt_back.addClass('able');
				}
				this._arr.push(item);
			},
			pop: function(item){
				if(this._arr.length == 1){
					xr.bt_back.removeClass('able');
				}
				return this._arr.pop();
			},
			reset: function(item){
				this._arr = [];
				xr.bt_back.removeClass('able');
			}
		},

		progress_bar: {
			dom: document.getElementById("progress-bar"),
			start: function(){
				this.dom.removeClass('end').addClass('start');
			},
			end: function(){
				this.dom.addClass('end').removeClass('start');
			}
		},

		menuToggle: function(act){
			if(act == 'hide'){
				xr.body.addClass('hide-menu');
			}else{
				xr.body.toggleClass('hide-menu');
			}
		},

		createOnlineFileList: function(){

			xr.progress_bar.start();
			ajaxGet("json/ENLS_admin.json", callback);

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
						_html = "No file.";
					}else{
						arr_list.forEach(function(item){
							_html += '<div class="item"><div class="name" data-json="' + item.json + '">' + item.name + '</div></div>';
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

								//switch class
								if(online_file_names_cur != -1){
									online_file_names[online_file_names_cur].removeClass(class_name);
								}
								online_file_names_cur = index;
								this.addClass(class_name);

								//asyn
								xr.asynLoadJson(this.dataset['json']);
								xr.xr_history.reset();

								//hide menu in mobile
								if(xr.body.scrollWidth <= 600){
									xr.menuToggle('hide');
								}
							};
						});

					})();

				}
			}
		},

		asynLoadJson: function(json, node){

			xr.xr_json = json;
			location.hash = '/' + xr.xr_json;

			node = node ? node : 'Begin';

			xr.progress_bar.start();

			var url = 'json/' + json + '.json';
			ajaxGet(url, callback);

			function callback(back_data){
							
				var data = JSON.parse(back_data);

				if(data.nodes){
					xr.xr_nodes = data.nodes;
					xr.renderStageTree();
					xr.renderStageNode(node);
				}else{
					//no nodes
					xr.stage_tree.innerHTML = 'no nodes';
					xr.stage_node.innerHTML = '<div style="padding: 10px;">no nodes</div>';
					xr.showStage('note');
				}
				xr.renderStageNote(data.notes, data.checklist);
				
				xr.progress_bar.end();

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
					xr.renderStageNode(this.dataset['index']);
					//从树状图进入，重置历史记录
					xr.xr_history.reset();
				};
			});

			function xmlTree(){

				//根节点
				var root = xr.xr_nodes["Begin"];

				//开始构建输出
				var output = '<ul>';

				//main
				(function main(node, index){

					var children = node.children,
						children_len = children.length;					

					//开始构建该节点
					output += '<li class="tree">';

						//开始构建自身内容
						output += '<div class="self" data-index="' + index + '">';

							//取该节点名字
							output += '<span class="nodeName">' + node.shortTitle + '</span>';

						//结束构建该节点自身内容
						output += '</div>';


						//构建子节点内容
						if(children_len > 0){		//如果有子节点

							//递归子节点
							output += '<ul class="tree">';
							for(var i=0; i<children_len; i++){
								var child = children[i];
								arguments.callee(xr.xr_nodes[child], child);
							}
							output += '</ul>';

						}

					//结束构建该节点
					output += '</li>';


				})(root, "Begin");

				//结束构建输出
				output += '</ul>';

				return output;

			}

		},

		renderStageNode: function (this_index){

			var html = '',
				this_node = xr.xr_nodes[this_index];

			if(this_node && this_node.children){
				var children = this_node.children;
			}else{
				alert('This node dose not exist.');
				return;
			}

			location.hash = '/' + xr.xr_json + '/' + this_index;
			xr.showStage('node');

			//this self
			html += '<div class="this" data-index="' + this_index + '"><div class="node"><p class="title">' + this_node.title + '</p><p class="body">' + this_node.body + '</p></div></div>';

			//explanation
			html += '<div class="explanation">';
			html += '<div class="detail">' + this_node.explanation + '</div>';
			html += '</div>';

			//children
			if(children.length > 0){
				html += '<div class="next"><div class="detail">';
				children.forEach(function(item, index){
					var xr_node = xr.xr_nodes[item];

					html += '<div class="node" data-index="' + item + '"><p class="title">' + xr_node.title + '</p><p class="body">' + xr_node.body + '</p></div>';
				})
				html += '</div></div>';
			}
			
			xr.stage_node.innerHTML = html;

			//回到顶部
			xr.body.scrollTop = 0;

			//add event
			var dom_children = Array.prototype.slice.call(document.querySelectorAll('#stage-node .next .node'));
			dom_children.forEach(function(item, index){
				item.onclick = function(){
					xr.renderStageNode(this.dataset['index']);
					xr.xr_history.push(this_index);
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
				//只有当有历史记录且显示在node页面才可点击
				if(xr.xr_history._arr.length && xr.page.hasClass('show-node')){
					xr.renderStageNode(xr.xr_history.pop());
				}
			};

			//router init
			if(location.hash){
				//asyn
				var url_arr = location.hash.substr(1).split('/');
				xr.asynLoadJson(url_arr[1], url_arr[2]);
			}
		}
	}

	xr.init();
