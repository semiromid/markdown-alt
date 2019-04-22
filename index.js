'use strict';


class markdownAlt{

	static getHTML(html){
	    html = this.to_HTML__set_p(html);
	    html = this.to_HTML__set_paragraph(html);
	    html = this.to_HTML__set_hr(html);
	    html = this.to_HTML__set_br(html);  
	    html = this.to_HTML__set_h3(html);
	    html = this.to_HTML__set_h2(html);                      
	    html = this.to_HTML__set_a(html);

	    html = this.to_HTML__set_img(html);
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
	        video_GIF = ' *!\\[\\*\\*video-GIF\\*\\*\\]\\(.+? "\\[autoplay=(true|false)\\]\\[quality=(HD|SD)\\]\\[speed=[0-9]\\.[0-9]+?\\]\\[controls=(true|false)\\]"\\)',
	        video_YouTube = ' *!\\[\\*\\*video-YouTube\\*\\*\\]\\(.+?\\)',
	        video_Vimeo = ' *!\\[\\*\\*video-Vimeo\\*\\*\\]\\(.+?\\)',


	        regExp = new RegExp("^(?:"+h2+"|"+h3+"|"+hr+"|"+img+"|"+video_GIF+"|"+video_YouTube+"|"+video_Vimeo+")$","gi");

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
	static to_HTML__set_img(text){
	    return text.replace(/\n!\[(.*?)\]\((.*?) "(.*?)"(?:\[source=(.*?)?\])\)\n/g, function(match, p1, p2, p3, p4, offset, str_full){
	        
	        return this.to_HTML__set_img__layout(p1, p2, p3, p4);
	    });
	} 

	static to_HTML__set_img__layout(alt, link, description, linksource){
	    return p1+p2+p3+p4;
	}
	//------------------------------
	//------------------------------

}





try {
    module.exports = markdownAlt;
}
catch (e) {
   
}

