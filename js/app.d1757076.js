(function(e){function t(t){for(var r,c,d=t[0],o=t[1],s=t[2],u=0,l=[];u<d.length;u++)c=d[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&l.push(a[c][0]),a[c]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,d=1;d<n.length;d++){var o=n[d];0!==a[o]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},i=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var d=window["webpackJsonp"]=window["webpackJsonp"]||[],o=d.push.bind(d);d.push=t,d=d.slice();for(var s=0;s<d.length;s++)t(d[s]);var f=o;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"022a":function(e,t,n){},"051b":function(e,t,n){},"9cdc":function(e,t,n){"use strict";n("022a")},a358:function(e,t,n){"use strict";n("051b")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("830f"),a=(n("99af"),n("5c40")),i={id:"app"},c={style:{border:"1px solid black",display:"flex"}},d={style:{margin:"1rem"}};function o(e,t){var n=Object(a["r"])("CardList"),o=Object(a["r"])("SCard");return Object(a["o"])(),Object(a["f"])("div",i,[Object(a["j"])("div",c,[(Object(a["o"])(),Object(a["f"])("svg",{xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none","font-family":"sans-serif",viewBox:"0 0 ".concat(e.fields.state.fieldSize.width," ").concat(e.fields.state.fieldSize.height),style:{width:"100%",height:"auto"},onMousemove:t[3]||(t[3]=Object(r["b"])((function(t){return e.hoverCard()}),["self"]))},[Object(a["j"])(n,{cardList:e.fields.state.deck,cardInfoList:e.fields.state.deckInfoList,cardSize:e.fields.state.cardSize},null,8,["cardList","cardInfoList","cardSize"]),Object(a["j"])(n,{cardList:e.fields.state.talon,cardInfoList:e.fields.state.talonInfoList,cardSize:e.fields.state.cardSize},null,8,["cardList","cardInfoList","cardSize"]),Object(a["j"])("g",null,[Object(a["j"])(o,{x:10,y:e.fields.state.fieldSize.height-e.fields.state.cardSize.height-10,width:e.fields.state.cardSize.width,height:e.fields.state.cardSize.height,scale:.5},{default:function(){return[Object(a["j"])("text",{fill:"black","font-size":"140",x:e.fields.state.cardSize.width/2,y:e.fields.state.cardSize.height/2,"text-anchor":"middle","dominant-baseline":"middle"},Object(a["u"])(e.fields.state.deckKeys.length),9,["x","y"])]},_:1},8,["y","width","height"])]),Object(a["j"])("g",null,[Object(a["j"])(o,{x:e.fields.state.fieldSize.width-e.fields.state.cardSize.width-10,y:e.fields.state.fieldSize.height-e.fields.state.cardSize.height-10,width:e.fields.state.cardSize.width,height:e.fields.state.cardSize.height,scale:.5},{default:function(){return[Object(a["j"])("text",{fill:"black","font-size":"140",x:e.fields.state.cardSize.width/2,y:e.fields.state.cardSize.height/2,"text-anchor":"middle","dominant-baseline":"middle"},Object(a["u"])(e.fields.state.talonKeys.length),9,["x","y"])]},_:1},8,["x","y","width","height"])]),Object(a["j"])(n,{cardList:e.fields.state.hand,cardInfoList:e.fields.state.handInfoList,cardSize:e.fields.state.cardSize,hideKeyList:[e.fields.state.hoveredCardKey],onHover:t[1]||(t[1]=function(t){return e.hoverCard(t)})},null,8,["cardList","cardInfoList","cardSize","hideKeyList"]),e.fields.state.hoveredCardKey?(Object(a["o"])(),Object(a["f"])(n,{key:0,cardList:[e.fields.state.cards[e.fields.state.hoveredCardKey]],cardInfoList:[e.fields.state.cardInfos[e.fields.state.hoveredCardKey]],cardSize:e.fields.state.cardSize,onClick:t[2]||(t[2]=function(t){return e.discard([e.fields.state.hoveredCardKey])})},null,8,["cardList","cardInfoList","cardSize"])):Object(a["g"])("",!0)],40,["viewBox"]))]),Object(a["j"])("div",d,[Object(a["j"])("button",{style:{padding:"1rem"},onClick:t[4]||(t[4]=function(t){return e.draw(1)})},"Draw"),Object(a["j"])("button",{style:{margin:"0 1rem",padding:"1rem"},onClick:t[5]||(t[5]=function(t){return e.draw(10-e.fields.state.handKeys.length)})}," Draw 10 "),Object(a["j"])("button",{style:{padding:"1rem"},onClick:t[6]||(t[6]=function(t){return e.discard(e.fields.state.handKeys)})}," Discard All ")])])}n("4de4"),n("4160"),n("caad"),n("d81d"),n("13d5"),n("2532"),n("159b");var s=n("ade3"),f=n("5530"),u=n("2909"),l=n("a1e9");function h(e){return{key:"".concat(e),name:"card_".concat(e)}}n("c975"),n("b64b");function y(e,t){return(t-1)/2-e}function b(e){var t=y(e.index,e.handCount);return{x:-e.cardSize.width/2+e.fieldSize.width/2-.9*e.cardSize.width*t,y:e.fieldSize.height-1.5*e.cardSize.height+.04*e.cardSize.height*Math.pow(Math.abs(t),1.9)}}function j(e){return-5*y(e.index,e.handCount)}function w(e){return e.deckKeys.reduce((function(t,n){return Object(f["a"])({},t,Object(s["a"])({},n,{x:10,y:e.fieldSize.height-e.cardSize.height-10,rotate:0,scale:.5}))}),{})}function g(e){var t=e.handKeys.indexOf(e.hoveredCardKey);return e.handKeys.reduce((function(n,r,a){var i=Object(f["a"])({},b({index:a,handCount:e.handKeys.length,cardSize:e.cardSize,fieldSize:e.fieldSize}),{rotate:j({index:a,handCount:e.handKeys.length}),scale:1});if(-1!==t){var c=t-a;0===c?(i.y=i.y-.15*e.cardSize.height,i.rotate=0,i.scale=1.4):i.x=i.x-.15*e.cardSize.width/c}return Object(f["a"])({},n,Object(s["a"])({},r,i))}),{})}function p(e){return e.talonKeys.reduce((function(t,n){return Object(f["a"])({},t,Object(s["a"])({},n,{x:e.fieldSize.width-e.cardSize.width-10,y:e.fieldSize.height-e.cardSize.height-10,rotate:0,scale:.5}))}),{})}function O(e){return Object(f["a"])({},w(e),{},g(e),{},p(e))}function v(e){var t=Object(l["g"])({cards:e.cards,deckKeys:Object.keys(e.cards),handKeys:[],talonKeys:[],cardInfos:{},hoveredCardKey:"",deck:Object(a["e"])((function(){return t.deckKeys.map((function(e){return t.cards[e]}))})),hand:Object(a["e"])((function(){return t.handKeys.map((function(e){return t.cards[e]}))})),talon:Object(a["e"])((function(){return t.talonKeys.map((function(e){return t.cards[e]}))})),deckInfoList:Object(a["e"])((function(){return t.deckKeys.map((function(e){return t.cardInfos[e]}))})),handInfoList:Object(a["e"])((function(){return t.handKeys.map((function(e){return t.cardInfos[e]}))})),talonInfoList:Object(a["e"])((function(){return t.talonKeys.map((function(e){return t.cardInfos[e]}))})),fieldSize:Object(a["e"])((function(){return e.fieldSize})),cardSize:Object(a["e"])((function(){return e.cardSize})),handMax:Object(a["e"])((function(){return 10}))});return t.cardInfos=O(t),{state:t,getDeckInfos:function(){return w(t)},getHandInfos:function(){return g(t)},getTalonInfos:function(){return p(t)},getCardInfos:function(){return O(t)}}}n("45fc");function S(e){return!!e&&[e].concat(Object(u["a"])(e._chainedTweens)).some((function(e){return e._isPlaying}))}function z(e,t,n){e[t]&&e[t].stop(),e[t]=n.start()}function m(e,t,n){S(e[t])?e[t]._chainedTweens.length>0?e[t]._chainedTweens[e[t]._chainedTweens.length-1].chain(n):e[t].chain(n):e[t]=n.start()}function x(){var e=Object(l["g"])({tweens:{}});return{state:e,overrideTween:function(t,n){return z(e.tweens,t,n)},addTween:function(t,n){return m(e.tweens,t,n)}}}function K(e,t){var n=Object(a["r"])("SCard");return Object(a["o"])(),Object(a["f"])("g",null,[(Object(a["o"])(!0),Object(a["f"])(a["b"],null,Object(a["p"])(e.cardList,(function(t,r){return Object(a["o"])(),Object(a["f"])(n,{key:t.key,x:e.cardInfoList[r].x,y:e.cardInfoList[r].y,width:e.cardSize.width,height:e.cardSize.height,rotate:e.cardInfoList[r].rotate,scale:e.cardInfoList[r].scale,opacity:e.hideKeyList.includes(t.key)?0:1,onMousemove:function(n){return e.hover(t.key)}},{default:function(){return[Object(a["j"])("text",{fill:"black","font-size":"140",x:e.cardSize.width/2,y:e.cardSize.height/2,"text-anchor":"middle","dominant-baseline":"middle"},Object(a["u"])(t.key),9,["x","y"])]},_:1},1032,["x","y","width","height","rotate","scale","opacity","onMousemove"])})),128))])}function k(e,t){return Object(a["o"])(),Object(a["f"])("g",{transform:e.state.transform},[Object(a["j"])("rect",{width:e.width,height:e.height,stroke:"black","stroke-width":"2",fill:"white"},null,8,["width","height"]),Object(a["q"])(e.$slots,"default")],8,["transform"])}n("a15b"),n("a9e3");function I(e,t,n){return["translate(".concat(t,", ").concat(n,")"),"scale(".concat(e,")"),"translate(".concat(-t,", ").concat(-n,")")].join(" ")}var L=Object(a["k"])({props:{x:{type:Number,required:!0},y:{type:Number,required:!0},rotate:{type:Number,default:0},scale:{type:Number,default:1},width:{type:Number,required:!0},height:{type:Number,required:!0}},setup:function(e){var t=Object(l["g"])({center:Object(a["e"])((function(){return{x:e.x+e.width/2,y:e.y+e.height/2}})),transform:Object(a["e"])((function(){return"".concat(I(e.scale,t.center.x,t.center.y)," rotate(").concat(Math.round(e.rotate),", ").concat(Math.round(e.x+e.width/2),", ").concat(Math.round(e.y+e.height/2),") translate(").concat(e.x,", ").concat(e.y,")")}))});return{state:t}}});n("a358");L.render=k;var C=L,T=Object(a["k"])({components:{SCard:C},props:{cardList:{type:Array,required:!0},cardInfoList:{type:Array,required:!0},cardSize:{type:Object,required:!0},hideKeyList:{type:Array,default:function(){return[]}}},setup:function(e,t){return{hover:function(e){return t.emit("hover",e)}}}});T.render=K;var M=T,_=n("22b5");function A(){requestAnimationFrame(A),_["a"].update()}requestAnimationFrame(A);var q=Object(a["k"])({name:"App",components:{CardList:M,SCard:C},setup:function(){var e=x(),t=v({cards:Object(u["a"])(Array(15)).map((function(e,t){return h(t+1)})).reduce((function(e,t){return Object(f["a"])({},e,Object(s["a"])({},t.key,t))}),{}),fieldSize:{width:2600,height:900},cardSize:{width:220,height:20/13*220}}),n=Object(l["g"])({}),r=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(t.state.hoveredCardKey!==n){t.state.hoveredCardKey=n;var r=t.getHandInfos();t.state.handKeys.forEach((function(a){a===n?e.overrideTween(a,new _["a"].Tween(t.state.cardInfos[a]).to(r[a],100)):e.addTween(a,new _["a"].Tween(t.state.cardInfos[a]).to(r[a],100))}))}},a=function(){t.state.deckKeys=t.state.talonKeys,t.state.talonKeys=[];var n=t.getCardInfos();t.state.deckKeys.forEach((function(r,a){e.overrideTween(r,new _["a"].Tween(t.state.cardInfos[r]).to(Object(f["a"])({},n[r],{x:n[r].x+t.state.fieldSize.width/2,y:n[r].y+t.state.cardSize.height/2*(Math.random()-.5)}),200+50*a).chain(new _["a"].Tween(t.state.cardInfos[r]).to(n[r],200+50*a)))}))},i=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(!(n<=0)&&!(t.state.handKeys.length>=t.state.handMax)){var r=t.state.handKeys.concat(),i=[];Object(u["a"])(Array(n)).map((function(){0===t.state.deckKeys.length&&a();var e=t.state.deckKeys.shift();e&&(t.state.handKeys=[].concat(Object(u["a"])(t.state.handKeys),[e]),i.push(e))}));var c=t.getCardInfos();r.forEach((function(n){e.addTween(n,new _["a"].Tween(t.state.cardInfos[n]).to(c[n],400))})),i.forEach((function(n,r){e.addTween(n,new _["a"].Tween(t.state.cardInfos[n]).delay(20*Math.pow(r,1.2)).to(Object(f["a"])({},c[n],{x:c[n].x+.3*t.state.cardSize.width}),400).chain(new _["a"].Tween(t.state.cardInfos[n]).to(c[n],100)))}))}},c=function(n){t.state.hoveredCardKey="",t.state.handKeys=t.state.handKeys.filter((function(e){return!n.includes(e)})),t.state.talonKeys=[].concat(Object(u["a"])(t.state.talonKeys),Object(u["a"])(n));var r=t.getCardInfos();t.state.handKeys.forEach((function(n){e.overrideTween(n,new _["a"].Tween(t.state.cardInfos[n]).to(r[n],300))})),t.state.talonKeys.concat().reverse().forEach((function(n,a){e.overrideTween(n,new _["a"].Tween(t.state.cardInfos[n]).delay(20*Math.pow(a,1.2)).to(r[n],300))}))};return{fields:t,state:n,hoverCard:r,draw:i,discard:c}}});n("9cdc");q.render=o;var N=q,P=n("9483");Object(P["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(r["a"])(N).mount("#app")}});
//# sourceMappingURL=app.d1757076.js.map