/* (c) N.Landsteiner, www.masswerk.at */
var HeadingLinker=new function(){if(!document.getElementsByTagName)return;function setHeadingHandler(){var et,h=document.getElementsByTagName('h1')[0];if(h){if(window.HttpInvaders&&HttpInvaders.isTouch()){var et=HttpInvaders.getTouchEvents().touchstart||'click';h.addEventListener(et,headingHandler,false);}
else{registerEvent(h,'click',headingHandler);}
h.style.cursor='pointer';var title='Click here to play another status-code ...';if(h.setAttribute){h.setAttribute('title',title);}
else{h.title=title;}}}
function headingHandler(e){var v=prompt('Enter a 3-digit HTTP status-code (e.g. 404):','000');if(v&&v.match(/^[0-9]{3}$/))self.location.href='/status/?'+v;}
function registerEvent(obj,type,handler){if(document.addEventListener){obj.addEventListener(type,handler,false);}
else if(document.attachEvent){obj.attachEvent('on'+type,handler);}}
registerEvent(window,'load',setHeadingHandler);}