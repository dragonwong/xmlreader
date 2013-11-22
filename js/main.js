	var stage = document.getElementById("stage"),
		progress_bar = document.getElementById("progress-bar");
	

	/* bt_list click start */
	(function(){
		var	body = document.body,
			bt_list = document.getElementById('bt-list');

		bt_list.onclick = function(){
			body.toggleClass('hide-menu');
		};
	})();
	/* bt_list click end */


	
	/* menu fun click start */
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
	})();
	/* menu fun click end */


//menu

	function addOnlineFileListEvent(){
		/* bt-menu click start */
		(function(){
			var items = Array.prototype.slice.call(document.querySelectorAll('.item')),
				bt_menus = Array.prototype.slice.call(document.querySelectorAll('.item .bt-menu')),
				cur = -1,
				class_name = 'show-menu';
		console.log(bt_menus);

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

						//xmltree
						getXML(arr_list[index].url, asynParseXml);
					}
				};
			});
		})();
		/* name click end */
	}

	function asynParseXml(back_data){
		stage.innerHTML = xmlTree(back_data);
	}


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
						stage.innerHTML = xmlTree(xml);

					}
				}
			}else{						//no file
				prompt_file.innerHTML = 'no file selected';
				submit_span.addClass('disabled');
				//disable submit function
				//code...

				stage.innerHTML = '';
			}
		};
	})();



//get list asyn
	var arr_list;

	function createOnlineFileList(){
		ajaxGet("json/file_list.json", '', onlineFileListCallBack);
	}
	function onlineFileListCallBack(back_data){
		arr_list = JSON.parse(back_data);
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

	}





	function xmlTree(back_data){

		//根节点
		var root = back_data.documentElement;

		//开始构建输出
		var output = '<ul>';

		//main
		(function main(node){

			var children = node.children,
				children_len = children.length;

			//开始构建该节点
			output += '<li class="tree">';

				//开始构建自身内容
				output += '<div class="self">';

					//取该节点名字
					output += '<span class="nodeName">' + node.nodeName + '</span>';

					//取构建节点信息
					output += fragInfo(node, children_len);

				//结束构建该节点自身内容
				output += '</div>';


				//构建子节点内容
				if(children_len > 0){

					//如果有子节点
					//递归子节点
					output += '<ul class="tree">';
					for(var i=0; i<children_len; i++){
						arguments.callee(children[i]);
					}
					output += '</ul>';
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


	/* lib */

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
    };
    Element.prototype.removeClass = function(name){
        if(this.classList == undefined){
            this.className = this.className.replace(new RegExp('\\b'+name+'(\\s|$)','g'),"");  
        }else{
            this.classList.remove(name);
        }
    };
    Element.prototype.toggleClass = function(name){
    	if(this.hasClass(name)){
    		this.removeClass(name);
    	}else{
    		this.addClass(name);
    	}
    };



	progress_bar.addClass('start');
