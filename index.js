'use strict';



class markdownAlt{
	/*
		To exclude function parse.
		Example:

		markdownAlt.lock__GFYCAT = true;
	*/
	static lock__P = true;
	static lock__PARAGRAPH = true;
	static lock__HR = true;
	static lock__BR = true;
	static lock__H2 = true;
	static lock__H3 = true;
	static lock__A = true;
	static lock__IMG = true;
	static lock__GFYCAT = true;
	static lock__YOUTUBE = true;
	static lock__VIMEO = true;

	static lock__ESCAPE = true;
	
	


	static getHTML(html){

	    if(this.lock__P){
	    	html = this.to_HTML__set_p(html);
	    }	

	    if(this.lock__PARAGRAPH){
	    	html = this.to_HTML__set_paragraph(html);
	    }	

	    if(this.lock__HR){
	    	html = this.to_HTML__set_hr(html);
	    }	

	    if(this.lock__BR){
	    	html = this.to_HTML__set_br(html);
	    }	

	    if(this.lock__H2){
	    	html = this.to_HTML__set_h2(html);
	    }	

	    if(this.lock__H3){
	    	html = this.to_HTML__set_h3(html);
	    }	

	    if(this.lock__A){
	    	html = this.to_HTML__set_a(html);
	    }

	    if(this.lock__IMG){
	    	html = this.to_HTML__IMG(html);
	    }

	    if(this.lock__GFYCAT){
	    	html = this.to_HTML__GFYCAT(html);
	    }

	    if(this.lock__YOUTUBE){
	    	html = this.to_HTML__YOUTUBE(html);
	    }

	    if(this.lock__VIMEO){
	    	html = this.to_HTML__VIMEO(html);
	    }	   



	    if(this.lock__ESCAPE){
	    	html = this.escapeHtml(html);
	    }	

	    return html;
	}


	static to_HTML__set_br(text){
	    return text.replace(/(.*)((?<!\n)\n)(.+)/g, function(match, p1, p2, p3, offset, str_full){
	        p2 = "<br>";
	        return p1+p2+p3;
	    });
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



	static to_HTML__set_a(text){
	    return text.replace(/([\s\S]*?[^!])\[(.+?)\]\(([^\s]+?)\)([\s\S]*?)/g, function(match, p1, p2, p3, p4, offset, str_full){
	      return p1+'<a rel="noopener noreferrer nofollow" target="_blank" href="'+p3+'">'+p2+'</a>'+p4;
	    });
	}


	static to_HTML__set_hr(text){
	    return text.replace(/([\s\S]*?\n\n)(____+?)(\n\n(?!____+))/g, function(match, p1, p2, p3, offset, str_full){
	      return p1+'<div class="wy__m1__markdown__hr"><hr></div>'+p3;
	    });
	}   




	static to_HTML__set_p(text){
	    return text.replace(/((?:\n\n+)*)([\s\S]+?)(\n\n+|$)/g, function(match, p1, p2, p3, offset, str_full){

	        if(!markdownAlt.to_HTML__testTAG(p2)){
	            p2 = "<p>"+p2+"</p>";
	        }

	      return p1+p2+p3;
	    });
	}




	static to_HTML__testTAG(text){
	    let h2 = "(## .+)",
	        h3 = "(### .+)",
	        hr = "(____+)",
	        img = ' *!\\[.*?\\]\\(.+? ".*?"(\\[source=.+?\\])?\\)',
	        video_GFICAT = ' *!\\[\\*\\*GFYCAT\\*\\*\\]\\(.+? "\\[autoplay=(true|false)\\]\\[quality=(HD|SD)\\]\\[speed=[0-9]\\.[0-9]+?\\]\\[controls=(true|false)\\]"\\)',
	        video_YOUTUBE = ' *!\\[\\*\\*YOUTUBE\\*\\*\\]\\(.+?\\)',
	        video_VIMEO = ' *!\\[\\*\\*VIMEO\\*\\*\\]\\(.+?\\)',


	        regExp = new RegExp("^(?:"+h2+"|"+h3+"|"+hr+"|"+img+"|"+video_GFICAT+"|"+video_YOUTUBE+"|"+video_VIMEO+")$","gi");

	    return regExp.test(text);
	}





	static to_HTML__set_h3(text){
	    return text.replace(/### (.+?)(\n\n)/g, function(match, p1, p2, offset, str_full){   
	      return "<h3>"+p1+"</h3>"+p2;
	    });
	}

	static to_HTML__set_h2(text){
	    return text.replace(/## (.+?)(\n\n)/g, function(match, p1, p2, offset, str_full){   
	      return "<h2>"+p1+"</h2>"+p2;
	    });
	}




	//------------------------------
	// IMG 
	//------------------------------
	/*
	    ![Alt](https://i.imgur.com/zk48nju.jpg "Чистоте."[source=https://imgur.com/account/favorites/uHGMO17])
	*/  

	static to_HTML__IMG(text){
	    return text.replace(/\n!\[(.*?)\]\((.*?) "(.*?)"(?:\[source=(.*?)?\])\)\n/g, function(match, p1, p2, p3, p4, offset, str_full){
	        
	        return markdownAlt.layout__IMG(p1, p2, p3, p4);
	    });
	} 

	static layout__IMG(alt, link, description, linksource){
	    return '<img src="'+link+'" alt="'+alt+'">';
	}

	/*
	//Example extends function

		markdownAlt.layout__IMG = function(alt, link, description, linksource){
		    return alt+link+description+linksource;
		}
	*/
	//------------------------------
	//------------------------------







	//------------------------------
	// GFYCAT
	//------------------------------
	/*
	    ![**GFYCAT**](https://gfycat.com/foolishslimegret "[autoplay=false][quality=HD][speed=1.0][controls=true]")
	*/ 

	static to_HTML__GFYCAT(text){
	    return text.replace(/\n!\[\*\*GFYCAT\*\*\]\((.*?) "\[autoplay=(true|false)\]\[quality=(HD|SD)\]\[speed=([0-9]\.[0-9]+?)\]\[controls=(true|false)\]"\)\n/g, function(match, p1, p2, p3, p4, p5, offset, str_full){
	        
	        return markdownAlt.layout__GFYCAT(p1, p2, p3, p4, p5);
	    });
	} 

	static layout__GFYCAT(href, autoplay, quality, speed, controls){

		href = href+"?autoplay="+autoplay+"&hd="+quality+"&speed="+speed+"&controls="+controls;

	    return '<div><iframe src="'+href+'" frameborder="0" scrolling="no" width="100%" height="100%" allowfullscreen></iframe></div>';
	}

	/*
	//Example extends function

		markdownAlt.layout__GFYCAT = function(href, autoplay, quality, speed, controls){
		    return href+autoplay+quality+speed+controls;
		}
	*/
	//------------------------------
	//------------------------------





	//------------------------------
	// YOUTUBE
	//------------------------------
	/*
	    ![**YOUTUBE**](https://www.youtube.com/watch?v=IGcKgTih__4)
	*/ 

	static to_HTML__YOUTUBE(text){
	    return text.replace(/\n!\[\*\*YOUTUBE\*\*\]\((.*?)\)\n/g, function(match, p1, offset, str_full){
	        
	        return markdownAlt.layout__YOUTUBE(p1);
	    });
	} 

	static layout__YOUTUBE(href){
	    return '<div><iframe src="'+href+'" frameborder="0" scrolling="no" width="100%" height="100%" allowfullscreen></iframe></div>';
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
	    ![**VIMEO**](https://www.youtube.com/watch?v=IGcKgTih__4)
	*/ 

	static to_HTML__VIMEO(text){
	    return text.replace(/\n!\[\*\*VIMEO\*\*\]\((.*?)\)\n/g, function(match, p1, offset, str_full){
	        
	        return markdownAlt.layout__VIMEO(p1);
	    });
	} 

	static layout__VIMEO(href){
	    return '<div><iframe src="'+href+'" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>';
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
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
          return markdownAlt.entityMap[s];
        });
    }
}





try {
    module.exports = markdownAlt;
}
catch (e) {
   
}

