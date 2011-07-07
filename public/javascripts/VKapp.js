/*
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009, Ã˜yvind Sean Kinsey, oyvind@kinsey.no.
 *
 * MIT Licensed - http://easyxdm.net/license/mit.txt
 *
 */
(function(i,s,c,d,n,b){var r=0;var w=/^(http.?:\/\/([^\/\s]+))/,x=/[\-\w]+\/\.\.\//,l=/([^:])\/\//g;function k(B,D){var C=typeof B[D];return C=="function"||(!!(C=="object"&&B[D]))||C=="unknown"}function h(B,C){return !!(typeof(B[C])=="object"&&B[C])}var m=(function(){if(k(i,"addEventListener")){return function(D,B,C){D.addEventListener(B,C,false)}}else{return function(B,D,C){B.attachEvent("on"+D,C)}}}());var o=(function(){if(k(i,"removeEventListener")){return function(E,C,D,B){E.removeEventListener(C,D,B)}}else{return function(B,D,C){B.detachEvent("on"+D,C)}}}());function u(B){return B.match(w)[2]}function A(B){return B.match(w)[1]}function e(B){B=B.replace(l,"$1/");if(!B.match(/^(http||https):\/\//)){var C=(B.substring(0,1)==="/")?"":c.pathname;if(C.substring(C.length-1)!=="/"){C=C.substring(0,C.lastIndexOf("/")+1)}B=c.protocol+"//"+c.host+C+B}while(x.test(B)){B=B.replace(x,"")}return B}function j(B,D){var E=[];for(var C in D){if(D.hasOwnProperty(C)){E.push(C+"="+D[C])}}return B+((B.indexOf("?")===-1)?"?":"&")+E.join("&")}var p=(function(){var E={},F,D=c.search.substring(1).split("&"),C=D.length;while(C--){F=D[C].split("=");E[F[0]]=F[1]}if(i.parent){var B=i.name.replace(/\<#>/g,":").split(",");E.xdm_e=B[1];E.xdm_c=B[2];E.xdm_p=B[3];if(B[4]!=null){E.xdm_s=B[4]}}return E}());function f(B){return typeof B==="undefined"}function y(){var C={};var D={a:[1,2,3]},B='{"a":[1,2,3]}';if(JSON&&typeof JSON.stringify==="function"&&JSON.stringify(D).replace((/\s/g),"")===B){return JSON}if(Object.toJSON){if(Object.toJSON(D).replace((/\s/g),"")===B){C.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){D=B.evalJSON();if(D.a&&D.a.length===3&&D.a[2]===3){C.parse=function(E){return E.evalJSON()}}}if(C.stringify&&C.parse){y=function(){return C};return C}return null}function t(E,C,D){if(!C){return}for(var B in C){if(C.hasOwnProperty(B)&&(!D||!E[B])){E[B]=C[B]}}}function z(C,B,E,G){var F;if(G!=null&&G.name){G.name=G.name.replace(/:/g,"<#>");if(!/opera/i.test(navigator.userAgent.toLowerCase())&&(/msie [67]/i.test(navigator.userAgent.toLowerCase()))){F=s.createElement('<IFRAME NAME="'+G.name+'">')}else{F=s.createElement("IFRAME");F.name=G.name}}else{F=s.createElement("IFRAME")}for(var D in G){F.setAttribute(D,G[D])}F.src=C;if(E){F.loadFn=function(){E(F.contentWindow)};m(F,"load",F.loadFn)}if(B){F.border=F.frameBorder=0;B.appendChild(F)}else{F.style.position="absolute";F.style.left="-2000px";F.style.top="0px";s.body.appendChild(F)}return F}var a=(function(){if(k(i,"XMLHttpRequest")){return function(){return new XMLHttpRequest()}}else{var B=(function(){var D=["Microsoft","Msxml2","Msxml3"],C=D.length;while(C--){try{B=D[C]+".XMLHTTP";var F=new ActiveXObject(B);return B}catch(E){}}}());return function(){return new ActiveXObject(B)}}}());function q(I,C,G,H,B){if(!B){B=function(){}}var E=a(),F=[];E.open(I,C,true);E.setRequestHeader("Content-Type","application/x-www-form-urlencoded");E.setRequestHeader("X-Requested-With","XMLHttpRequest");E.onreadystatechange=function(){if(E.readyState==4){if(E.status>=200&&E.status<300){H(y().parse(E.responseText))}else{B("An error occured. Status code: "+E.status)}E.onreadystatechange=null;delete E.onreadystatechange}};if(G){for(var D in G){if(G.hasOwnProperty(D)){F.push(D+"="+b(G[D]))}}}E.send(F.join("&"))}function g(D){var I=D.protocol,C;D.isHost=D.isHost||f(p.xdm_p);if(!D.isHost){D.channel=p.xdm_c;D.secret=p.xdm_s;D.remote=n(p.xdm_e);I=p.xdm_p}else{D.remote=e(D.remote);D.channel=D.channel||"default"+r++;D.secret=Math.random().toString(16).substring(2);if(f(I)){if(k(i,"postMessage")){I="1"}else{if(k(i,"ActiveXObject")&&k(i,"execScript")){I="3"}else{if(D.remoteHelper){D.remoteHelper=e(D.remoteHelper);I="2"}else{I="0"}}}}}switch(I){case"0":t(D,{interval:300,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(D.isHost){if(!D.local){var G=c.protocol+"//"+c.host,B=s.body.getElementsByTagName("img"),E=B.length,H;while(E--){H=B[E];if(H.src.substring(0,G.length)===G){D.local=H.src;break}}if(!D.local){D.local=i}}var F={xdm_c:D.channel,xdm_p:0};if(D.local===i){D.usePolling=true;D.useParent=true;D.local=c.protocol+"//"+c.host+c.pathname+c.search;F.xdm_e=b(D.local);F.xdm_pa=1}else{F.xdm_e=e(D.local)}if(D.container){D.useResize=false;F.xdm_po=1}D.remote=j(D.remote,F)}else{t(D,{channel:p.xdm_c,remote:n(p.xdm_e),useParent:!f(p.xdm_pa),usePolling:!f(p.xdm_po),useResize:D.useParent?false:D.useResize})}C=[new easyXDM.stack.HashTransport(D),new easyXDM.stack.ReliableBehavior({timeout:((D.useResize?50:D.interval*1.5)+(D.usePolling?D.interval*1.5:50))}),new easyXDM.stack.QueueBehavior({encode:true,maxLength:4000-D.remote.length}),new easyXDM.stack.VerifyBehavior({initiate:D.isHost})];break;case"1":C=[new easyXDM.stack.PostMessageTransport(D)];break;case"2":C=[new easyXDM.stack.NameTransport(D),new easyXDM.stack.QueueBehavior(),new easyXDM.stack.VerifyBehavior({initiate:D.isHost})];break;case"3":C=[new easyXDM.stack.NixTransport(D)];break}return C}function v(E){var F,D={incoming:function(H,G){this.up.incoming(H,G)},outgoing:function(G,H){this.down.outgoing(G,H)},callback:function(G){this.up.callback(G)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var C=0,B=E.length;C<B;C++){F=E[C];t(F,D,true);if(C!==0){F.down=E[C-1]}if(C!==B-1){F.up=E[C+1]}}return F}easyXDM={version:"2.3.1.85",apply:t,ajax:q,getJSONObject:y,stack:{}};easyXDM.DomHelper={on:m,un:o,requiresJSON:function(B){if(!h(i,"JSON")){s.write('<script type="text/javascript" src="'+B+'"><\/script>')}}};(function(){var B={};easyXDM.Fn={set:function(C,D){B[C]=D},get:function(D,C){var E=B[D];if(C){delete B[D]}return E}}}());easyXDM.Socket=function(C){var B=v(g(C).concat([{incoming:function(F,E){C.onMessage(F,E)},callback:function(E){if(C.onReady){C.onReady(E)}}}])),D=A(C.remote);this.destroy=function(){B.destroy()};this.postMessage=function(E){B.outgoing(E,D)};B.init()};easyXDM.Rpc=function(D,C){if(C.local){for(var F in C.local){if(C.local.hasOwnProperty(F)){var E=C.local[F];if(typeof E==="function"){C.local[F]={method:E}}}}}var B=v(g(D).concat([new easyXDM.stack.RpcBehavior(this,C),{callback:function(G){if(D.onReady){D.onReady(G)}}}]));this.destroy=function(){B.destroy()};B.init()};easyXDM.stack.PostMessageTransport=function(E){var G,H,C,D;function B(I){if(I.origin){return I.origin}if(I.uri){return A(I.uri)}if(I.domain){return c.protocol+"//"+I.domain}throw"Unable to retrieve the origin of the event"}function F(J){var I=B(J);if(J.data.substring(0,E.channel.length+1)==E.channel+" "){G.up.incoming(J.data.substring(E.channel.length+1),I)}}return(G={outgoing:function(I,J){C.postMessage(E.channel+" "+I,J||D)},destroy:function(){o(i,"message",F);if(H){C=null;H.parentNode.removeChild(H);H=null}},init:function(){D=A(E.remote);var J=D.indexOf("?");if(J>0){D=D.substr(0,J)}if(E.isHost){o(i,"message",F);m(i,"message",function I(K){if(K.data==E.channel+"-ready"){C=H.contentWindow;o(i,"message",I);o(i,"message",F);m(i,"message",F);d(function(){G.up.callback(true)},0)}});if(!E.prop){E.prop={}}E.prop.name=E.prop.name+","+c.protocol+"//"+c.host+","+E.channel+",1";H=z(E.remote,E.container,null,E.prop)}else{m(i,"message",F);C=i.parent;C.postMessage(E.channel+"-ready",D);d(function(){G.up.callback(true)},0)}}})};easyXDM.stack.NixTransport=function(C){var E,G,F,B,D;return(E={outgoing:function(H,I){F(H)},destroy:function(){if(G){D=null;G.parentNode.removeChild(G);G=null}},init:function(){B=A(C.remote);if(C.isHost){try{if(!k(i,"GetNixProxy")){i.execScript("Class NixProxy\n    Private m_parent, m_child, m_Auth\n\n    Public Sub SetParent(obj, auth)\n        If isEmpty(m_Auth) Then m_Auth = auth\n        SET m_parent = obj\n    End Sub\n    Public Sub SetChild(obj)\n        SET m_child = obj\n        m_parent.ready()\n    End Sub\n\n    Public Sub SendToParent(data, auth)\n        If m_Auth = auth Then m_parent.send(CStr(data))\n    End Sub\n    Public Sub SendToChild(data, auth)\n        If m_Auth = auth Then m_child.send(CStr(data))\n    End Sub\nEnd Class\nFunction GetNixProxy()\n    Set GetNixProxy = New NixProxy\nEnd Function\n","vbscript")}D=GetNixProxy();D.SetParent({send:function(I){E.up.incoming(I,B)},ready:function(){d(function(){E.up.callback(true)},0)}},C.secret);F=function(I){D.SendToChild(I,C.secret)}}catch(H){throw new Error("Could not set up VBScript NixProxy:"+H.message)}if(!C.prop){C.prop={}}C.prop.name=C.prop.name+","+c.protocol+"//"+c.host+","+C.channel+",3,"+C.secret;G=z(C.remote,C.container,null,C.prop);G.contentWindow.opener=D}else{D=i.opener;D.SetChild({send:function(I){E.up.incoming(I,B)}});F=function(I){D.SendToParent(I,C.secret)};d(function(){E.up.callback(true)},0)}}})};easyXDM.stack.NameTransport=function(F){var G;var I,M,E,K,L,C,B;function J(P){var O=F.remoteHelper+(I?("#_3"+b(B+"#"+F.channel)):("#_2"+F.channel));M.contentWindow.sendMessage(P,O)}function H(){if(I){if(++K===2||!I){G.up.callback(true)}}else{J("ready");G.up.callback(true)}}function N(O){G.up.incoming(O,C)}function D(){if(L){d(function(){L(true)},0)}}return(G={outgoing:function(P,Q,O){L=O;J(P)},destroy:function(){M.parentNode.removeChild(M);M=null;if(I){E.parentNode.removeChild(E);E=null}},init:function(){I=F.isHost;K=0;C=A(F.remote);F.local=e(F.local);if(I){easyXDM.Fn.set(F.channel,function(O){if(I&&O==="ready"){easyXDM.Fn.set(F.channel,N);H()}});if(!F.prop){F.prop={}}F.prop.name=F.prop.name+","+F.local+","+F.channel+",2";E=z(F.remote+"#"+F.channel,F.container,null,F.prop)}else{F.remoteHelper=F.remote;easyXDM.Fn.set(F.channel,N)}M=z(F.local+"#_4"+F.channel,null,function(){o(M,"load",M.loadFn);easyXDM.Fn.set(F.channel+"_load",D);H()})}})};easyXDM.stack.HashTransport=function(S){var Q;var T=this,N,C,B,M,E,J,P;var G,L,D,H;function F(V){if(!P){return}var U=S.remote+"#"+(E++)+"_"+V;if(N||!L){P.contentWindow.location=U;if(D){P.width=P.width>75?50:100}}else{P.location=U}}function R(U){M=U;Q.up.incoming(M.substring(M.indexOf("_")+1),H)}function I(){R(J.location.hash)}function O(){if(J.location.hash&&J.location.hash!=M){R(J.location.hash)}}function K(){if(G){C=setInterval(O,B)}else{m(J,"resize",I)}}return(Q={outgoing:function(U,V){F(U)},destroy:function(){if(G){i.clearInterval(C)}else{if(J){o(J,"resize",O)}}if(N||!L){P.parentNode.removeChild(P)}P=null},init:function(){N=S.isHost;B=S.interval;M="#"+S.channel;E=0;G=S.usePolling;L=S.useParent;D=S.useResize;H=A(S.remote);if(!N&&L){J=i;P=parent;K();Q.up.callback(true)}else{if(!S.prop){S.prop={}}S.prop.name=(N?"local_":"remote_")+S.channel;S.prop.name=S.prop.name+","+c.protocol+"//"+c.host+","+S.channel+",1";P=z((N?S.remote:S.remote+"#"+S.channel),S.container,(N&&L||!N)?function(){J=i;K();Q.up.callback(true)}:null,S.prop);if(N&&!L){var W=0,U=S.delay/50;(function V(){if(++W>U){throw new Error("Unable to reference listenerwindow")}if(J){return}try{J=P.contentWindow.frames["remote_"+S.channel];i.clearTimeout(C);K();Q.up.callback(true);return}catch(X){d(V,50)}}())}}}})};easyXDM.stack.ReliableBehavior=function(D){var E,B,I,G,K=0,F=0,H=D.tries||5,J=D.timeout,C=0,L;return(E={incoming:function(O,M){var N=O.indexOf("_"),Q=parseInt(O.substring(0,N),10),P;O=O.substring(N+1);N=O.indexOf("_");P=parseInt(O.substring(0,N),10);N=O.indexOf("_");O=O.substring(N+1);if(B&&Q===K){i.clearTimeout(B);B=null;if(L){d(function(){L(true)},0)}}if(P!==0){if(P!==C){C=P;O=O.substring(P.length+1);E.down.outgoing(P+"_0_ack",M);d(function(){E.up.incoming(O,M)},D.timeout/2)}else{E.down.outgoing(P+"_0_ack",M)}}},outgoing:function(O,M,N){L=N;F=0;I={data:C+"_"+(++K)+"_"+O,origin:M};(function P(){B=null;if(++F>H){if(L){d(function(){L(false)},0)}}else{E.down.outgoing(I.data,I.origin);B=d(P,D.timeout)}}())},destroy:function(){if(B){i.clearInterval(B)}E.down.destroy()}})};easyXDM.stack.QueueBehavior=function(C){var E,F=[],J=false,D="",I,B=(C)?C.maxLength:0,G=(C)?(C.encode||false):false;function H(){if(J||F.length===0||I){return}J=true;var K=F.shift();E.down.outgoing(K.data,K.origin,function(L){J=false;if(K.callback){d(function(){K.callback(L)},0)}H()})}return(E={incoming:function(N,L){var M=N.indexOf("_"),K=parseInt(N.substring(0,M),10);D+=N.substring(M+1);if(K===0){if(G){D=n(D)}E.up.incoming(D,L);D=""}},outgoing:function(O,L,N){if(G){O=b(O)}var K=[],M;if(B){while(O.length!==0){M=O.substring(0,B);O=O.substring(M.length);K.push(M)}}else{K.push(O)}while((M=K.shift())){F.push({data:K.length+"_"+M,origin:L,callback:K.length===0?N:null})}H()},destroy:function(){I=true;E.down.destroy()}})};easyXDM.stack.VerifyBehavior=function(F){var G,E,C,D=false;function B(){E=Math.random().toString(16).substring(2);G.down.outgoing(E)}return(G={incoming:function(J,H){var I=J.indexOf("_");if(I===-1){if(J===E){G.up.callback(true)}else{if(!C){C=J;if(!F.initiate){B()}G.down.outgoing(J)}}}else{if(J.substring(0,I)===C){G.up.incoming(J.substring(I+1),H)}}},outgoing:function(J,H,I){G.down.outgoing(E+"_"+J,H,I)},callback:function(H){if(F.initiate){B()}}})};easyXDM.stack.RpcBehavior=function(I,C){var E,K=C.serializer||y();var J=0,H={};function B(L){L.jsonrpc="2.0";E.down.outgoing(K.stringify(L))}function F(){}function G(L,N){var M=Array.prototype.slice;return function(){var O=arguments.length,Q,P={method:N};if(O>0&&typeof arguments[O-1]==="function"){if(O>1&&typeof arguments[O-2]==="function"){Q={success:arguments[O-2],error:arguments[O-1]};P.params=M.call(arguments,0,O-2)}else{Q={success:arguments[O-1]};P.params=M.call(arguments,0,O-1)}H[""+(++J)]=Q;P.id=J}else{P.params=M.call(arguments,0)}B(P)}}function D(L,N,Q,O){if(!Q){if(N){B({id:N,error:{code:-32601,message:"Procedure not found."}})}return}var S=false,R,P;if(N){R=function(U){if(S){return}S=true;B({id:N,result:U})};P=function(U){if(S){return}S=true;B({id:N,error:{code:-32099,message:"Application error: "+U}})}}else{R=P=F}try{var T=Q.method.apply(Q.scope,O.concat([R,P]));if(!f(T)){R(T)}}catch(M){P(M.message)}}return(E={incoming:function(M,L){var N=K.parse(M);if(N.method){if(C.handle){C.handle(N,B)}else{D(N.method,N.id,C.local[N.method],N.params)}}else{var O=H[N.id];if(N.result&&O&&O.success){if(typeof(O.success)!="undefined"){O.success(N.result)}}else{if(N.error){if(O.error){O.error(N.error)}}}delete H[N.id]}},init:function(){if(C.remote){for(var L in C.remote){if(C.remote.hasOwnProperty(L)){I[L]=G(C.remote[L],L)}}}E.down.init()},destroy:function(){for(var L in C.remote){if(C.remote.hasOwnProperty(L)&&I.hasOwnProperty(L)){delete I[L]}}E.down.destroy()}})}})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);


easyXDM.DomHelper.requiresJSON("http://vk.com/js/lib/json2.js");


(function(w) {
if (w.fastXDM) return;

var handlers = {};
var onEnvLoad = [];
var env = {};

// Key generation
function genKey() {
  var key = '';
  for (i=0;i<5;i++) key += Math.ceil(Math.random()*15).toString(16);
  return key;
}
function waitFor(obj, prop, func, self,  count) {
  if (obj[prop]) {
     func.apply(self);
  } else {
    count = count || 0;
    if (count < 1000) setTimeout(function() {
      waitFor(obj, prop, func, self, count + 1)
    }, 0);
  }
}
function attachScript(url) {
  setTimeout(function() {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url || w.fastXDM.helperUrl;
    waitFor(document, 'body', function() {
      document.getElementsByTagName('HEAD')[0].appendChild(newScript);
    });
  }, 0);
}

// Env functions
function getEnv(callback, self) {
  if (env.loaded) {
    callback.apply(self, [env]);
  } else {
    onEnvLoad.push([self, callback]);
  }
}

function envLoaded() {
  env.loaded = true;
  var i = onEnvLoad.length;
  while (i--) {
    onEnvLoad[i][1].apply(onEnvLoad[i][0], [env]);
  }
}

function applyMethod(strData, self) {
  getEnv(function(env) {
    var data = env.json.parse(strData);
    if (data[0]) {
      if (!data[1]) data[1] = [];
      var i = data[1].length;
      while (i--) {
        if (data[1][i]._func) {
          var funcNum = data[1][i]._func;
          data[1][i] = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('_func'+funcNum);
            self.callMethod.apply(self, args);
          }
        }
      }
      setTimeout(function() {
        if (!self.methods[data[0]]) throw Error('fastXDM: Method ' + data[0] + ' is undefined');
        self.methods[data[0]].apply(self, data[1]);
      }, 0);
    }
  });
}
// XDM object
w.fastXDM = {
  _id: 0,
  helperUrl: 'http://userapi.com/js/api/xdmHelper.js',

  Server: function(methods, filter) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    this.filter = filter;
    this.key = genKey();
    this.methods['%init%'] = this.methods['__fxdm_i'] = function() {
      w.fastXDM.run(this.id);
      if (this.methods['onInit']) this.methods['onInit']();
    };
    this.frameName = 'fXD'+this.key;
    this.server = true;
    handlers[this.key] = [applyMethod, this];
  },

  Client: function(methods) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    w.fastXDM.run(this.id);
    if (window.name.indexOf('fXD') == 0) {
      this.key = window.name.substr(3);
    } else {
      throw Error('Wrong window.name property.');
    }
    this.caller = window.parent;
    handlers[this.key] = [applyMethod, this];
    this.client = true;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onClientStart(this);
    }, this);

    getEnv(function(env) {
      env.send(this, env.json.stringify(['%init%']));
      var methods = this.methods;
      setTimeout(function() {
        if (methods['onInit']) methods['onInit']();
      }, 0);
    }, this);
  },

  onMessage: function(e) {
    if (!e.data) return false;
    var key = e.data.substr(0, 5);
    if (handlers[key]) {
      var self = handlers[key][1];
      if (self && (!self.filter || self.filter(e.origin))) {
        handlers[key][0](e.data.substr(6), self);
      }
    }
  },

  setJSON: function(json) {
    env.json = json;
  },

  getJSON: function(callback) {
    if (!callback) return env.json;
    getEnv(function(env) {
      callback(env.json);
    });
  },

  setEnv: function(exEnv) {
    for (i in exEnv) {
      env[i] = exEnv[i];
    }
    envLoaded();
  },

  _q: {},

  on: function(key, act, self) {
    if (!this._q[key]) this._q[key] = [];
    if (this._q[key] == -1) {
      act.apply(self);
    } else {
      this._q[key].push([act, self]);
    }
  },

  run: function(key) {
    var len = (this._q[key] || []).length;
    if (this._q[key] && len > 0) {
      for (var i = 0; i < len; i++) this._q[key][i][0].apply(this._q[key][i][1]);
    }
    this._q[key] = -1;
  },

  waitFor: waitFor
}

w.fastXDM.Server.prototype.start = function(obj, count) {
  if (obj.contentWindow) {
    this.caller = obj.contentWindow;
    this.frame = obj;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onServerStart(this);
    }, this);

  } else { // Opera old versions
    var self = this;
    count = count || 0;
    if (count < 50) setTimeout(function() {
      self.start.apply(self, [obj, count+1]);
    }, 100);
  }
}

function extend(obj1, obj2){
  for (var i in obj2) {
    if (obj1[i] && typeof(obj1[i]) == 'object') {
      extend(obj1[i], obj2[i])
    } else {
      obj1[i] = obj2[i];
    }
  }
}

w.fastXDM.Server.prototype.append = function(obj, options) {
  var div = document.createElement('DIV');
  div.innerHTML = '<iframe name="'+this.frameName+'" />';
  var frame = div.firstChild;
  var self = this;
  setTimeout(function() {
    frame.frameBorder = '0';
    if (options) extend(frame, options);
    obj.insertBefore(frame, obj.firstChild);
    self.start(frame);
  }, 0);
  return frame;
}

w.fastXDM.Client.prototype.callMethod = w.fastXDM.Server.prototype.callMethod = function() {
  var args = Array.prototype.slice.call(arguments);
  var method = args.shift();
  var i = args.length;
  while (i--) {
    if (typeof(args[i]) == 'function') {
      this.funcsCount = (this.funcsCount || 0) + 1;
      var func = args[i];
      var funcName = '_func' + this.funcsCount;
      this.methods[funcName] = function() {
        func.apply(this, arguments);
        delete this.methods[funcName];
      }
      args[i] = {_func: this.funcsCount};
    }
  }
  waitFor(this, 'caller', function() {
    w.fastXDM.on(this.id, function() {
      getEnv(function(env) {
        env.send(this, env.json.stringify([method, args]));
      }, this);
    }, this);
  }, this);
}

if (w.JSON && typeof(w.JSON) == 'object' && w.JSON.parse && w.JSON.stringify && w.JSON.stringify({a:[1,2,3]}).replace(/ /g, '') == '{"a":[1,2,3]}') {
  env.json = {parse: w.JSON.parse, stringify: w.JSON.stringify};
} else {
  w.fastXDM._needJSON = true;
}

// PostMessage cover
if (w.postMessage) {
  env.protocol = 'p';
  env.send = function(xdm, strData) {
    // alert(key+':'+strData);
    xdm.caller.postMessage(xdm.key+':'+strData, "*");
  }
  if (w.addEventListener) {
    w.addEventListener("message", w.fastXDM.onMessage, false);
  } else {
    w.attachEvent("onmessage", w.fastXDM.onMessage);
  }

  if (w.fastXDM._needJSON) {
    w.fastXDM._onlyJSON = true;
    attachScript();
  } else {
    envLoaded();
  }
} else {
  attachScript();
}
})(window);



if (typeof(VK) == 'undefined') VK = {};


VK._Rpc = null;
VK._callbacks = {};
VK._initQueue = [];
VK._inited = false;

VK.init = function(success, failure) {
  if (!VK._inited) {
  	VK._inited = true;
    if (!parent) failure();
    window.vk_onConnectionInit = function() {
      if (VK.isFunc(success)) success();
    };
    VK.initXDConn();
  } else {
    if (VK.isFunc(success)) success();
  }
};

VK.initXDConn = function() {

  if (window.name.length > 10) {

    VK._Rpc = new easyXDM.Rpc({
      local: '/xd_receiver.html',
      onReady: function() {
        //try {
          while (VK._initQueue.length > 0) {
            var func = VK._initQueue.pop();
            if (VK.isFunc(func)) func();
          }
        //} catch(e) {}
        window.vk_onConnectionInit();
      }
    },{
      remote: {
         callMethod: {},
         ApiCall: {}
      },
      local: {
        runCallback: function (args) {
          var eventName;
          eventName = args.shift();
          if (VK.isFunc(VK._callbacks[eventName])) VK._callbacks[eventName].apply(VK,args);
        }
      }
    });
    
  } else {
    VK.fxdm = true;
    VK._Rpc = new fastXDM.Client({
      onInit: function() {
        //try {
          while (VK._initQueue.length > 0) {
            var func = VK._initQueue.pop();
            if (VK.isFunc(func)) func();
          }
        //} catch(e) {}
        window.vk_onConnectionInit();
      },
      runCallback: function (args) {
        var eventName;
        eventName = args.shift();
        if (VK.isFunc(VK._callbacks[eventName])) VK._callbacks[eventName].apply(VK,args);
      },
      getHeight: function(callback) {
        var calcHeight = function() {
          //console.log(document.body.scrollHeight);
          //console.log(document.body.offsetHeight);
          if (window.getComputedStyle !== undefined) {
            var computedStyle = window.getComputedStyle(document.body, null);
            var margin = parseInt(computedStyle.getPropertyValue('margin-top').replace('px', ''));
            margin += parseInt(computedStyle.getPropertyValue('margin-bottom').replace('px', ''));
          } else {
            var margin = parseInt(document.body.currentStyle['marginTop'].replace('px', ''));
            margin += parseInt(document.body.currentStyle['marginBottom'].replace('px', ''));
          }
          return (document.body.offsetHeight || document.body.scrollHeight) + margin;
        }
        var resize = function() {
          VK._Rpc.callMethod('setHeight', calcHeight());
        }
        setInterval(resize, 1000);
        document.addEventListener("click", function() {
          setTimeout(resize, 0);
        }, false);
        return callback(calcHeight());
      }
    });
    
    VK._Rpc.ApiCall = function(args, callback) {
      VK._Rpc.callMethod('ApiCall', args, callback);
    }
  }
};

VK.callMethod = function() {
  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (VK._Rpc != null) {
    if (VK.fxdm) {
      VK._Rpc.callMethod.apply(VK._Rpc, args);
    } else {
      if (VK.isFunc(args[args.length-1])) callback = args.pop();
      VK._Rpc.callMethod(args,callback);
    }
  } else {
    VK._initQueue.push(function() {VK.callMethod.apply(VK, args);});
    VK.init();
  }
};

VK.addCallback = function(eventName, callback) {
  if (callback) VK._callbacks[eventName] = callback;
};

VK.removeCallback = function(eventName) {
  if (VK._callbacks[eventName]) delete VK._callbacks[eventName];
};

VK.isFunc = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
};

VK.params = {};

VK.loadParams = function(q) {
  if (typeof q == 'Object') VK.params = q;
  else {
    var tmp = q.substr(q.indexOf('?') + 1).split('&');
    var i = tmp.length;
    while (i--) {
      var v = tmp[i].split('=');
      VK.params[v[0]] = decodeURIComponent(v[1]);
    }
  }
};

VK.addScript = function(url) {
  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.src = url;
  document.getElementsByTagName('head')[0].appendChild(el);
};

VK.api = function() {
  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (VK._Rpc != null) {
    if (VK.isFunc(args[args.length-1])) callback = args.pop();
    VK._Rpc.ApiCall(args,callback);
  } else {
    VK._initQueue.push(function() {VK.api.apply(VK, args);});
    VK.init();
  }
};

VK.Modules = {
  callbacks: {},
  loaded: function(name) {
    if (this.callbacks[name]) {
      var i = this.callbacks[name].length;
      while (i--) {
        if (VK.isFunc(this.callbacks[name][i])) this.callbacks[name][i]();
      }
    }
  },
  load: function(name, callback, path) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = [callback];
      if (path == null) path = 'http://vk.com/js/api/modules/' + name + '.js';
      VK.addScript(path);
    } else {
      this.callbacks[name].push(callback);
    }
  }
};

if (!VK.Widgets) {
  VK.Widgets = (function() {
    var obj = {};
    var widgetlist = ['Comments', 'Auth', 'Group', 'Donate', 'Like'];
    VK.xdConnectionCallbacks = [];
    var i = widgetlist.length;
    while (i--) (function(f) {
      obj[f] = function() {
        var args = arguments;
        
        VK.xdConnectionCallbacks.push(function() {
          VK._iframeAppWidget = true;
          VK.Widgets[f].apply(VK, args);
        });
        
        if (!VK._openApiAttached) {
          VK.callMethod('_getAppInfo', function(data) {
            VK._apiId = data[0];
            VK._browserHash = data[1];
            VK.addScript('http://vk.com/js/api/openapi.js?22');
          });
          VK._openApiAttached = true;
        }
        
      }
    })(widgetlist[i]);
    return obj;
  })();
}


/* Obsolete methods */
VK.External={showPaymentBox:function(a){VK.callMethod("showPaymentBox",a)},showSettingsBox:function(a){VK.callMethod("showSettingsBox",a)},showInstallBox:function(){VK.callMethod("showInstallBox")},showInviteBox:function(){VK.callMethod("showInviteBox")},resizeWindow:function(b,a){VK.callMethod("resizeWindow",b,a)},scrollWindow:function(b,a){VK.callMethod("scrollWindow",b,a)},setLocation:function(a,b){VK.callMethod("setLocation",a,b)},setTitle:function(a){VK.callMethod("setTitle",a)},saveWallPost:function(a){VK.callMethod("saveWallPost",a)},showProfilePhotoBox:function(a){VK.callMethod("showProfilePhotoBox",a)},showMerchantPaymentBox:function(a){VK.callMethod("showMerchantPaymentBox",a)}};
