window._=window._||{};
const pc=navigator.userAgent.indexOf(' Mobile ') === -1;
document.addEventListener("DOMContentLoaded",e=>{});
_.showTip=(val,ms=456)=>{
	let screenx=document.documentElement.clientWidth,tipy=45;
	let tiper=_.crt("span"),wrper=_.crt("nav");
	document.body.appendChild(wrper);
	wrper.appendChild(tiper);
	wrper.style.position="fixed";
	wrper.style.zIndex="2";
	tiper.style.color="white";
	tiper.style.display="inline-block";
	wrper.style.backgroundColor="transparent";
	tiper.style.backgroundColor="#222222";
	tiper.innerText=val;
	self.setTimeout(()=>{wrper.removeChild(tiper);document.body.removeChild(wrper);},ms);
	wrper.style.width=screenx+"px";
	wrper.style.left="0px";
	wrper.style.height=tipy+"px";
	tiper.style.height=tiper.style.lineHeight=wrper.style.height;
	wrper.style.textAlign=tiper.style.textAlign="center";
	tiper.style.borderRadius=tipy/5+"px";
	wrper.style.top=(document.documentElement.clientHeight-tipy)/2+"px";
	tiper.style.margin="0px auto";
	tiper.style.padding="0px 1.2rem";
};
_.calcLoadUrl=()=>{
	if(_.loadurl){
		return _.loadurl;
	}
	for(let s of document.scripts){
		if(s.src && s.src.endsWith("/main.js")){
			_.loadurl=s.src;
			break;
		}
	}
	return _.loadurl=_.loadurl.substring(0,_.loadurl.length-7)+"loading.gif";
};
_.showLoading=(val)=>{
	let screenx=document.documentElement.clientWidth,screeny=document.documentElement.clientHeight;
	let blur=document.createElement("aside"),wrper=document.createElement("nav"),tipx=130,tipy=130;
	document.body.appendChild(blur);
	document.body.appendChild(wrper);
	let tmpHTML='<img style="position:static;display:block;width:4rem;height:4rem;margin:0.7rem auto 0.1rem;background-color:transparent;" src="'+_.calcLoadUrl()+'"/>';
	tmpHTML+='<span style="position:static;display:inline-block;text-align:center;color:black;width:100%;height:2rem;font-size:0.9rem;">'+val+'</span>';
	wrper.innerHTML=tmpHTML;
	blur.style.position=wrper.style.position="fixed";
	blur.style.zIndex=wrper.style.zIndex="2";
	blur.style.backgroundColor="rgba(0,0,0,0.5)";
	wrper.style.backgroundColor="white";
	blur.style.width=screenx+"px";
	blur.style.height=screeny+"px";
	blur.style.top=blur.style.left="0px";
	wrper.style.width=tipx+"px";
	wrper.style.height=tipy+"px";
	wrper.style.borderRadius="11px";
	wrper.style.top=(screeny-tipy)/2+"px";
	wrper.style.left=(screenx-tipx)/2+"px";
	return ()=>{wrper.innerHTML=null;document.body.removeChild(wrper);document.body.removeChild(blur);};
};
_.showConfirm=(tip,cnt,okfn,nofn,oktxt,notxt)=>{
	let screenx=document.documentElement.clientWidth,screeny=document.documentElement.clientHeight;
	let blur=document.body.appendChild(_.crt("aside")),tipx=screenx*0.8;
	let wrper=document.body.appendChild(_.crt("nav")),tipy=screenx*0.6;
	wrper.innerHTML='<span style="position:absolute;display:block;text-align:center;color:black;width:100%;font-weight:bold;font-size:0.9rem;left:0px;top:0px;height:2.5rem;line-height:2.5rem;border-bottom:1px solid #d3d3d3;">'+tip+'</span>';
	
	blur.style.position=wrper.style.position="fixed";
	blur.style.zIndex=wrper.style.zIndex="2";
	blur.style.backgroundColor="rgba(0,0,0,0.5)";
	wrper.style.backgroundColor="white";
	blur.style.width=screenx+"px";
	wrper.style.width=tipx+"px";
	wrper.style.boxSizing="border-box";
	wrper.style.padding="0px 1rem";
	blur.style.height=screeny+"px";
	wrper.style.height=tipy+"px";
	blur.style.top=blur.style.left="0px";
	wrper.style.textAlign="center";
	wrper.style.borderRadius="9px";
	wrper.style.top=(screeny-tipy)/2+"px";
	wrper.style.left=(screenx-tipx)/2+"px";
	
	wrper.innerHTML+='<div style="display:block;box-sizing:border-box;text-align:center;width:100%;word-wrap:break-word;word-break:break-all;white-space:normal;">'+cnt+'</div>';
	let hwrp=Number.parseInt(getComputedStyle(wrper).height),ocnt=wrper.firstElementChild.nextElementSibling;
	let hcnt=Number.parseInt(getComputedStyle(ocnt).height);
	ocnt.style.marginTop=(hwrp-hcnt)/2+"px";
	
	let okele=wrper.appendChild(_.crt("button")),noele=wrper.appendChild(_.crt("button"));
	okele.innerText=oktxt||"确 定";
	noele.innerText=notxt||"取 消";
	okele.onclick=noele.onclick=function(){
		if(okele===this && "function"===typeof okfn){
			okfn(this);
		}
		if(noele===this && "function"===typeof nofn){
			nofn(this);
		}
		okele.onclick=noele.onclick=undefined;
		wrper.innerHTML=null;
		document.body.removeChild(wrper);
		document.body.removeChild(blur);
	};
	okele.style.backgroundColor=noele.style.backgroundColor="transparent";
	okele.style.color=noele.style.color="blue";
	okele.style.display=noele.style.display="inline-block";
	okele.style.width=noele.style.width="50%";
	okele.style.height=noele.style.height="2.5rem";
	okele.style.lineHeight=noele.style.lineHeight="1.7rem";
	okele.style.textAlign=noele.style.textAlign="center";
	okele.style.position=noele.style.position="absolute";
	okele.style.bottom=noele.style.bottom="0px";
	okele.style.left=noele.style.right="0px";
	okele.style.fontWeight=noele.style.fontWeight="bold";
	okele.style.cursor=noele.style.cursor="pointer";
	noele.style.borderLeft="1px solid #8a8a8a";
	okele.style.borderTop=noele.style.borderTop="1px solid #d3d3d3";
};
_.exec=(url,sync=true)=>{
	let exe=_.crt("script");
	exe.type="text/javascript";
	exe.charset="utf-8";
	if(url){
		exe.src=url;
	}
	exe.async=!sync;
	return document.head.appendChild(exe);
};
_.id=p=>{return document.getElementById(p);};
_.name=p=>{return document.getElementsByName(p);};
_.tag=p=>{return document.getElementsByTagName()(p);};
_.cls=p=>{return document.getElementsByClassName(p);};
_.init=fn=>{document.addEventListener("DOMContentLoaded",fn);};
_.load=fn=>{self.addEventListener("load",fn);};
_.crt=p=>{return document.createElement(p);};
_.css=(p)=>{return document.querySelectorAll(p);};
_.add=(p,s)=>{
	p.appendChild(s);
	return p;
};
_.del=(p,s)=>{
	p.removeChild(s);
	return p;
};
_.attr=(e,k,v)=>{
	if(v){
		return e.setAttribute(k,v);
	}
	if(null===v){
		return e.removeAttribute(k);
	}
	return e.getAttribute(k);
};
_.str=val=>{
	return val?val:"";
};
_.encryptAes=(key,str)=>{
	if("undefined"===typeof CryptoJS){
		return null;
	}
	let keyHex = CryptoJS.enc.Utf8.parse(key);
	let msg = CryptoJS.enc.Utf8.parse(str);
	let encrypted = CryptoJS.AES.encrypt(msg,keyHex,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
	return encrypted.toString();
};
_.decryptAes=(key,str)=>{
	if("undefined"===typeof CryptoJS){
		return null;
	}
	let keyHex = CryptoJS.enc.Utf8.parse(key);
	let decrypted = CryptoJS.AES.decrypt({ciphertext:CryptoJS.enc.Base64.parse(str)},keyHex,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
	return decrypted.toString(CryptoJS.enc.Utf8);
};
(function(w){
	let tk=location.href;
	let idx=tk.lastIndexOf("?tk=");
	if(-1===idx || 4+idx===tk.length){
		return location.replace("../error.html?s=invalid");
	}
	tk=tk.substring(idx+4);
	tk=w.decodeURIComponent(tk);
	tk=_.decryptAes("dngdkfjasdf874354958",tk);
	if(!tk){
		return location.replace("../error.html?s=invalid");
	}
	tk=Number.parseInt(tk);
	if(w.isNaN(tk)){
		return location.replace("../error.html?s=invalid");
	}
	if(tk<Date.now()){
		return location.replace("../error.html?s=expire");
	}
})(window);
let mob=navigator.userAgent.indexOf(' Mobile/') !== -1;
document.addEventListener("DOMContentLoaded",function(evt){
	if(mob){
		document.querySelectorAll('.pc').forEach(ele=>{
			ele.classList.add("hide");
		});
	}else{
		document.querySelectorAll('.mob').forEach(ele=>{
			ele.classList.add("hide");
		});
	}
});