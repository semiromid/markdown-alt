'use strict';



class markdownAlt{
	/*
		To exclude function parse.
		Example:

		markdownAlt.lock__GFYCAT = true;
	*/
	static lock__P = true;
	static lock__QUOTE = true;
	static lock__LIST_UL = true;
	static lock__LIST_OL = true;	
	static lock__PARAGRAPH = true;
	static lock__HR = true;
	static lock__BR = true;
	static lock__TEXT_BOLD = true;
	static lock__TEXT_ITALIC = true;
	static lock__CODE = true;
	static lock__PRE_CODE = true;
	static lock__H2 = true;
	static lock__H3 = true;
	static lock__A = true;
	static lock__IMG = true;
	static lock__GFYCAT = true;
	static lock__YOUTUBE = true;
	static lock__VIMEO = true;


	static lock__ESCAPE = true;
	
	





	static getHTML__Timer;

	static async_getHTML(html, callback){
		if(this.getHTML__Timer !== undefined){
			clearTimeout(this.getHTML__Timer);
		}

		this.getHTML__Timer = setTimeout(function(){
			callback(markdownAlt.getHTML(html));
		}, 1000);
	}



	static getHTML(html){
	    if(this.lock__P){
	    	html = this.to_HTML__set_p(html);	    	
	    }    	
	    return html;
	}





	static html = '';

	static to_HTML__set_p(text){
	    return text.replace(/((?:\n\n+)*)([\s\S]+?)(\n\n+|$)/g, function(match, p1, p2, p3, offset, str_full){

	    	markdownAlt.html = markdownAlt.to_HTML__otherTAGs(p2);

	        if(!markdownAlt.html){
			    if(markdownAlt.lock__ESCAPE){
			    	p2 = markdownAlt.escapeHtml(p2);
			    }	  

	            p2 = "<p>"+p2+"</p>";

	            //-----------------------------
			    // PARAGRAPH
			    if(markdownAlt.lock__PARAGRAPH){
			    	p2 = markdownAlt.to_HTML__set_paragraph(p2);
			    }

	            // BR
			    if(markdownAlt.lock__BR){
			    	p2 = markdownAlt.to_HTML__set_br(p2);
			    }	

			    // A
			    if(markdownAlt.lock__A){
			    	p2 = markdownAlt.to_HTML__set_a(p2);
			    }	

			    // TEXT BOLD
			    if(markdownAlt.lock__TEXT_BOLD){
			    	p2 = markdownAlt.to_HTML__set_text_bold(p2);
			    }

			    // TEXT ITALIC
			    if(markdownAlt.lock__TEXT_ITALIC){
			    	p2 = markdownAlt.to_HTML__set_text_italic(p2);
			    }

			    // CODE
			    if(markdownAlt.lock__CODE){
			    	p2 = markdownAlt.to_HTML__set_code(p2);
			    }

	            //-----------------------------			    
	        }else{
	        	return p1+markdownAlt.html+p3;
	        }
	        
	     	return p1+p2+p3;
	    });
	}









	static to_HTML__otherTAGs(text){
	    this.html = '';


		if(this.lock__H2){
			if(/^## .+$/.test(text)){
		    	return this.to_HTML__set_h2(text);
		    }			
		}


		if(this.lock__H3){
			if(/^### .+$/.test(text)){
		    	return this.to_HTML__set_h3(text);
		    }			
		}


		if(this.lock__HR){
			if(/^____+$/.test(text)){
		    	return this.to_HTML__set_hr();
		    }			
		}

		
		if(this.lock__QUOTE){
			if(/^> [\s\S]+/.test(text)){		
		    	return this.to_HTML__set_quote(text);
		    }	
		}


		if(this.lock__PRE_CODE){
			if(/^ {0,5}```\n[\s\S]+?\n``` {0,5}$/.test(text)){	
		    	return this.to_HTML__set_pre_code(text);
		    }	
		}
		

		if(this.lock__LIST_UL){
			if(/^- [\s\S]+/.test(text)){
		    	return this.getList__ul_li(text);
		    }
		}


		if(this.lock__LIST_OL){
			if(/[0-9]+\. [\s\S]+/.test(text)){
		    	return this.getList__ol_li(text);
		    }
		}



		if(this.lock__IMG){
			if(/^!\[.*?\]\(.+? ".*?"(\[source=.+?\])?\)$/.test(text)){
		    	return this.to_HTML__IMG(text);
		    }			
		}


		if(this.lock__GFYCAT){
			if(/^!\|GFYCAT\|\(.+? "\[autoplay=(1|0)\]\[quality=(1|0)\]\[speed=[0-9]\.[0-9]+?\]\[controls=(1|0)\]"\)$/.test(text)){
		    	return this.to_HTML__GFYCAT(text);
		    }			
		}

		if(this.lock__YOUTUBE){
			if(/^!\|YOUTUBE\|\(.+?\)$/.test(text)){
		    	return this.to_HTML__YOUTUBE(text);
		    }			
		}


	    if(this.lock__VIMEO){
			if(/^!\|VIMEO\|\(.+?\)$/.test(text)){
		    	return this.to_HTML__VIMEO(text);
		    }	    	
	    }	  

		return false;
	}



	/*
	    \n
	    \
	    \n
	*/
	static to_HTML__set_paragraph(text){
	    return text.replace(/(<p>)([\s\S]+?)(<\/p>)/g, function(match, p1, p2, p3, offset, str_full){

	        p2 = p2.replace(/(\n(?:\\)\n|(?:(?<=\n)\\)\n)/g, "<br>");
	        return p1+p2+p3;
	    });
	} 


	//------------------------------
	// A
	//------------------------------	
	/*
	    [text](https://www.youtube.com/watch?v=IGcKgTih__4)
	*/	
	static to_HTML__set_a(text){
	    return text.replace(/\[(.+?)\]\(([^\s]+?)\)/g, function(match, p1, p2, offset, str_full){
	      
		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.escapeHtml(p1);
		    	
		    	p2 = markdownAlt.reescapeHtml(p2);
		    	p2 = markdownAlt.safeAttrHtml(p2);
		    }

	      	return markdownAlt.layout__A(p1, p2);
	    });
	}

	static layout__A(p1, p2){
		return '<a rel="noopener noreferrer nofollow" target="_blank" href="'+p2+'">'+p1+'</a>';
	}

	/*
	//Example extends function
		static layout__A(p1, p2){
			return '<a rel="noopener noreferrer nofollow" target="_blank" href="'+p2+'">'+p1+'</a>';
		}
	*/
	//------------------------------
	//------------------------------



	static to_HTML__set_br(text){
	    return text.replace(/\n/g, function(match, p1, offset, str_full){
	        return "<br>";
	    });
	}  

	/*
	   Text bold
	   **text**
	*/
	static to_HTML__set_text_bold(text){
	    return text.replace(/\*\*([\s\S]+?)\*\*/g, function(match, p1, offset, str_full){
	        return "<strong>"+p1+"</strong>";
	    });
	} 



	/*
	   Text italic
	   *text*
	*/
	static to_HTML__set_text_italic(text){
	    return text.replace(/\*([\s\S]+?)\*/g, function(match, p1, offset, str_full){
	        return "<em>"+p1+"</em>";
	    });
	} 


	//------------------------------
	// CODE
	//------------------------------	
	/*
	   Code
	   `x = 3`
	*/
	static to_HTML__set_code(text){

	    return text.replace(/(?:`|&#x60;)([\s\S]+?)(?:`|&#x60;)/g, function(match, p1, offset, str_full){
	        return markdownAlt.layout__CODE(p1);
	    });
	} 

	static layout__CODE(p1){
		return "<code>"+p1+"</code>";
	}

	/*
	//Example extends function
		static layout__CODE(){
			return "<code>"+p1+"</code>";
		}
	*/
	//------------------------------
	//------------------------------









	//------------------------------
	// HR
	//------------------------------
	/*
	    ____
	*/	
	static to_HTML__set_hr(){
	    return markdownAlt.layout__HR();
	}   

	static layout__HR(){
		return '<hr>';
	}

	/*
	//Example extends function
		static layout__HR(){
			return '<hr>';
		}
	*/
	//------------------------------
	//------------------------------



	static to_HTML__set_h2(text){
	    return text.replace(/## (.+)/, function(match, p1, offset, str_full){ 

		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.escapeHtml(p1);
		    }	

	      return "<h2>"+p1+"</h2>";
	    });
	}


	static to_HTML__set_h3(text){
	    return text.replace(/### (.+)/, function(match, p1, offset, str_full){   

		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.escapeHtml(p1);
		    }	    	

	      	return "<h3>"+p1+"</h3>";
	    });
	}


	//------------------------------
	// PRE CODE
	//------------------------------
	/*
``` 
var i; 
for (i=0; i<5; i++) { 
console.log(i); 
} 
```
	*/	
	static to_HTML__set_pre_code(text){
	    return text.replace(/^ {0,5}```\n([\s\S]+?)\n``` {0,5}$/g, function(match, p1, offset, str_full){
		    p1 = markdownAlt.escapeHtml(p1);	
	      	p1 = markdownAlt.to_HTML__set_br(p1);
	      	return markdownAlt.layout__PRE_CODE(p1);
	    });
	} 
	static layout__PRE_CODE(text){
		return '<pre><code>'+text+'</code></pre>';
	}

	/*
	//Example extends function
		static layout__PRE_CODE(text){
			return '<pre><code>'+text+'</code></pre>';
		}
	*/
	//------------------------------
	//------------------------------










	//------------------------------
	// QUOTES
	//------------------------------
	/*
> text
text text text
>> text text text
text text text text
	*/  
	static to_HTML__set_quote(text){
	    return markdownAlt.getQuotes(text);
	}


	static getQuotes(text){

		let arrayQuotes = [];
		let length = 0;

		function getArray(text){
			text = text.replace(/(\n>+)/g, '\n$1');
			return text.replace(/(>+ )([\s\S]+?)(\n\n|$)/g, function(match, p1, p2){
				if(length < p1.length){
					length = p1.length;
					return arrayQuotes.push(p2);
				}

		  		return arrayQuotes[arrayQuotes.length - 1] = arrayQuotes[arrayQuotes.length - 1]+' '+p2;
		    });
		}

		getArray("\n"+text);
		//console.log(arrayQuotes);


		let p2 = '';
		function getHTML(arr, i){

		    if(markdownAlt.lock__ESCAPE){
		    	p2 = "<p>"+markdownAlt.escapeHtml(arr[i])+"</p>";
		    }else{
		    	p2 = "<p>"+arr[i]+"</p>";
		    }

			if(arr[i + 1] !== undefined){
				return markdownAlt.layout__QUOTES(p2+getHTML(arr, i + 1));
			}

			return markdownAlt.layout__QUOTES(p2);
		}

		return this.to_HTML__set_br(getHTML(arrayQuotes, 0));
	}

	static layout__QUOTES(text){
		return '<blockquote>'+text+'</blockquote>';
	}

	/*
	//Example extends function
		static layout__QUOTES(text){
			return '<blockquote>'+text+'</blockquote>';
		}
	*/
	//------------------------------
	//------------------------------






	//------------------------------
	// LIST (<ul>)
	//------------------------------
	/*
- text text text
- text text text
  - text text text
    - text text text
      - text text text
  - text text text   
- text text text
- text text text
	*/ 

	static getList__ul_li(text){

		var array = [];

		function getArray(text, array){
			return text.replace(/( *- [\s\S]+?)(\n|$)/g, function(match, p1, p2){
		  		return array.push(p1);
		    });
		}
		getArray(text, array);
		//console.log(array);

		let i = 0;

		function getHTML(){
			const 	ul_1 = "<ul>", 
					ul_2 = "</ul>";
			let str = "", 
				level = '', 
				r;

			for (i; i <= array.length - 1; i++) {

				if(array[i+1] !== undefined){

					if(level === ''){
						level = compare_space(array[i]).length;
					}

					r = compare_space(array[i+1]).length;

					//------------------------
					// Compare spaces
					//------------------------
					if(level === r){ // Level is match
						str = str+"<li>"+getText(array[i])+"</li>";

					}else if(level < r){ // Level ->
						str = str+"<li>"+getText(array[i]);
						i = i + 1;
						str = str+getHTML()+"</li>";

						if(array[i+1] == undefined || compare_space(array[i+1]).length !== level){
							return ul_1+str+ul_2;
						}
					}else{ // Level <-

						return ul_1+str+"<li>"+getText(array[i])+"</li>"+ul_2;
					}
					//------------------------
				}else{ // END
					str = ul_1+str+"<li>"+getText(array[i])+"</li>"+ul_2;
					return str;
				}
			}

			return false;		
		}


		function getText(text){

		    if(markdownAlt.lock__ESCAPE){
		    	text = markdownAlt.escapeHtml(text);
		    }

		    text = preparation_text(text);

			return markdownAlt.layout__UL_LI(text);
		}


		function compare_space(text){
			if(text === undefined){
				return '';
			}
			return text.replace(/^( *)- [\s\S]+?(?:\n|$)/g, '$1');
		}

		function preparation_text(text){
			return text.replace(/^ *- ([\s\S]+)/g, '$1');
		}

		return markdownAlt.layout__UL(getHTML());
	}


	static layout__UL_LI(text){

		return text;
	}

	static layout__UL(text){

		return text;
	}

	/*
	//Example extends function:

		// It return entire list UL
		markdownAlt.layout__UL = function(text){
			return text;
		}

		// It return text between tag <li>
		markdownAlt.layout__UL_LI = function(text){
			return text;
		}
	*/
	//------------------------------
	//------------------------------







	//------------------------------
	// LIST (<ol>)
	//------------------------------
	/*
1. text text text
2. text text text
  1. text text text
    1. text text text
      1. text text text
  2. text text text   
3. text text text
4. text text text
	*/ 

	static getList__ol_li(text){

		var array = [];

		function getArray(text, array){
			return text.replace(/( *[0-9]+\. [\s\S]+?)(\n|$)/g, function(match, p1, p2){
		  		return array.push(p1);
		    });
		}
		getArray(text, array);
		//console.log(array);

		let i = 0;

		function getHTML(){
			const 	ul_1 = "<ol>", 
					ul_2 = "</ol>";
			let str = "", 
				level = '', 
				r;

			for (i; i <= array.length - 1; i++) {

				if(array[i+1] !== undefined){

					if(level === ''){
						level = compare_space(array[i]).length;
					}

					r = compare_space(array[i+1]).length;

					//------------------------
					// Compare spaces
					//------------------------
					if(level === r){ // Level is match
						str = str+"<li>"+getText(array[i])+"</li>";

					}else if(level < r){ // Level ->
						str = str+"<li>"+getText(array[i]);
						i = i + 1;
						str = str+getHTML()+"</li>";

						if(array[i+1] == undefined || compare_space(array[i+1]).length !== level){
							return ul_1+str+ul_2;
						}
					}else{ // Level <-

						return ul_1+str+"<li>"+getText(array[i])+"</li>"+ul_2;
					}
					//------------------------
				}else{ // END
					str = ul_1+str+"<li>"+getText(array[i])+"</li>"+ul_2;
					return str;
				}
			}

			return false;		
		}


		function getText(text){

		    if(markdownAlt.lock__ESCAPE){
		    	text = markdownAlt.escapeHtml(text);
		    }

		    text = preparation_text(text);

			return markdownAlt.layout__OL_LI(text);
		}


		function compare_space(text){
			if(text === undefined){
				return '';
			}
			return text.replace(/^( *)[0-9]+\. [\s\S]+?(?:\n|$)/g, '$1');
		}

		function preparation_text(text){
			return text.replace(/^ *[0-9]+\. ([\s\S]+)/g, '$1');
		}

		return markdownAlt.layout__OL(getHTML());
	}


	static layout__OL_LI(text){

		return text;
	}

	static layout__OL(text){

		return text;
	}

	/*
	//Example extends function:

		// It return entire list UL
		markdownAlt.layout__UL = function(text){
			return text;
		}

		// It return text between tag <li>
		markdownAlt.layout__UL_LI = function(text){
			return text;
		}
	*/
	//------------------------------
	//------------------------------





	//------------------------------
	// IMG 
	//------------------------------
	/*
![Alt](https://i.imgur.com/zk48nju.jpg "Чистоте."[source=https://imgur.com/account/favorites/uHGMO17])
	*/  

	static to_HTML__IMG(text){
	    return text.replace(/!\[(.*?)\]\((.+?) "(.*?)"(?:\[source=(.+?)\])?\)/g, function(match, p1, p2, p3, p4, offset, str_full){

			    if(markdownAlt.lock__ESCAPE){
			    	p1 = markdownAlt.escapeHtml(p1);
			    	p1 = markdownAlt.safeAttrHtml(p1);

			    	p2 = markdownAlt.safeAttrHtml(p2);

			    	p3 = markdownAlt.escapeHtml(p3);

			    	p4 = markdownAlt.safeAttrHtml(p4);
			    }	 

	        return markdownAlt.layout__IMG(p1, p2, p3, p4);
	    });
	} 

	static layout__IMG(alt, href, description, linksource){
	    return '<img src="'+href+'" alt="'+alt+'">';
	}

	/*
	//Example extends function

		markdownAlt.layout__IMG = function(alt, href, description, linksource){
		    return alt+href+description+linksource;
		}
	*/
	//------------------------------
	//------------------------------







	//------------------------------
	// GFYCAT
	//------------------------------
	/*
	    !|GFYCAT|(https://gfycat.com/foolishslimegret "[autoplay=false][quality=HD][speed=1.0][controls=true]")
	*/ 

	static to_HTML__GFYCAT(text){
	    return text.replace(/!\|GFYCAT\|\((.+?) "\[autoplay=(1|0)\]\[quality=(1|0)\]\[speed=([0-9]\.[0-9]+?)\]\[controls=(1|0)\]"\)/g, function(match, p1, p2, p3, p4, p5, offset, str_full){

		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.safeAttrHtml(p1);
		    }

	        return markdownAlt.layout__GFYCAT(p1, p2, p3, p4, p5);
	    });
	} 

	static layout__GFYCAT(href, autoplay, quality, speed, controls){

		href = href.replace(/^(https:\/\/gfycat\.com\/)(.*)/g, '$1ifr/$2');

		href = href+"?autoplay="+autoplay+"&hd="+quality+"&speed="+speed+"&controls="+controls;

	    return '<div><iframe src="'+href+'" style="width: 100%; height: 100%; border: 0px;" width="100" height="100" allowfullscreen></iframe></div>';
	}

	/*
	//Example extends function

		static layout__GFYCAT(href, autoplay, quality, speed, controls){

			href = href.replace(/^(https:\/\/gfycat\.com\/)(.*)/g, '$1ifr/$2');

			href = href+"?autoplay="+autoplay+"&hd="+quality+"&speed="+speed+"&controls="+controls;

		    return '<div><iframe src="'+href+'" style="width: 100%; height: 100%; border: 0px;" width="100" height="100" allowfullscreen></iframe></div>';
		}
	*/
	//------------------------------
	//------------------------------





	//------------------------------
	// YOUTUBE
	//------------------------------
	/*
	    !|YOUTUBE|(https://www.youtube.com/watch?v=IGcKgTih__4)
	*/ 

	static to_HTML__YOUTUBE(text){
	    return text.replace(/!\|YOUTUBE\|\((.+?)\)/g, function(match, p1, offset, str_full){

		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.safeAttrHtml(p1);
		    }

            p1 = p1.replace(/^(.+?youtube\.com\/)watch\?v=([^&]*).*/g, '$1embed/$2');

	        return markdownAlt.layout__YOUTUBE(p1);
	    });
	} 

	static layout__YOUTUBE(href){
	    return '<div style="position: relative; padding-bottom: 56.25%;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0px;" src="'+href+'" scrolling="no" width="100" height="100" allowfullscreen></iframe></div>';
	}
           
          
	/*
	//Example extends function

		markdownAlt.layout__YOUTUBE = function(href){
		    return href;
		}
	*/
	//------------------------------
	//------------------------------



	//------------------------------
	// VIMEO
	//------------------------------
	/*
	    !|VIMEO|(https://vimeo.com/groups/582902/videos/327664838)
	*/ 

	static to_HTML__VIMEO(text){
	    return text.replace(/!\|VIMEO\|\((.+?)\)/g, function(match, p1, offset, str_full){

		    if(markdownAlt.lock__ESCAPE){
		    	p1 = markdownAlt.safeAttrHtml(p1);
		    }

			p1 = "https://player.vimeo.com/video/"+p1.replace(/.+?\/([0-9]+)$/g, '$1')+"?color=ffffff";

	        return markdownAlt.layout__VIMEO(p1);
	    });
	} 

	static layout__VIMEO(href){
	    return '<div style="position: relative; padding: 56.25% 0 0 0;"><iframe src="'+href+'" style="position: absolute; top:0; left:0; border: 0px; width: 100%; height: 100%;" allow="autoplay; fullscreen" allowfullscreen></iframe></div>';
	}

	/*
	//Example extends function

		markdownAlt.layout__VIMEO = function(href){
		    return href;
		}
	*/
	//------------------------------
	//------------------------------


    static entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    static escapeHtml(string) {
    	if(undefined === string){
    		return '';
    	}

        return String(string).replace(/[&<>"'`=/]/g, function (s) {
          return markdownAlt.entityMap[s];
        });
    }





    static reentityMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '='
    };

    static reescapeHtml(string) {
    	if(undefined === string){
    		return '';
    	}

        return String(string).replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;)/g, function (s) {
          return markdownAlt.reentityMap[s];
        });
    }





    static safeAttrHtml(string) {
    	if(undefined === string){
    		return '';
    	}
        return string.replace(/["']/g, '');
    }

}



/*
if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  root.marked = marked;
}
})(this || (typeof window !== 'undefined' ? window : global));
*/


if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = markdownAlt;
}

