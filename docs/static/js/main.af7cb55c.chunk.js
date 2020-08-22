(this.webpackJsonpprototype=this.webpackJsonpprototype||[]).push([[0],{183:function(e,t,n){e.exports=n(387)},264:function(e,t,n){},352:function(e,t,n){},353:function(e,t,n){},380:function(e,t,n){},383:function(e,t,n){},384:function(e,t,n){},385:function(e,t,n){},387:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),i=n.n(o),c=n(18),l=n(19),s=n(21),u=n(20),d=n(403),p=n(404),m=n(407),h=n(408),f=n(405),b=n(406),v=n(409),k=n(390),y=n(395),g=n(32);n(37);function E(e){var t,n,a={},r=[],o=Object(g.a)(e);try{for(o.s();!(n=o.n()).done;){var i=n.value;null===i.parent_id||void 0===i.parent_id?(t=i,r.push(t)):a[i.parent_id]?a[i.parent_id].push(i):a[i.parent_id]=[i]}}catch(d){o.e(d)}finally{o.f()}for(;r.length>0;){var c=r.pop();if(c.children=[],a[c.id]){var l,s=Object(g.a)(a[c.id]);try{for(s.s();!(l=s.n()).done;){var u=l.value;c.children.push(u),r.push(u)}}catch(d){s.e(d)}finally{s.f()}}}return t.children.sort((function(e,t){return e.name-t.name})),t}var w,x,S,C,O,N,j,M,F,D=n(394),z=function(e,t,n){D.a[e]({message:t,description:n||null})},_=n(141),I=n(9),P=n.n(I),V=n(23),R=n(182),T=n(397),L=null,A="00000000-0000-0000-0000-000000000000",B=function(){var e=Object(V.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.a)("myDB",1,{upgrade:function(e,t,n,a){return Object(V.a)(P.a.mark((function n(){return P.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return 0===t&&(e.createObjectStore("dirs",{keyPath:"id"}),e.createObjectStore("notes",{keyPath:"id"}),e.createObjectStore("contents",{keyPath:"id"})),n.abrupt("return");case 2:case"end":return n.stop()}}),n)})))()},terminated:function(){console.log("terminated")}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(V.a)(P.a.mark((function e(){var t,n,a,r,o,i,c,l,s;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("fetching menu..."),L||console.log("DB is not ready, need to connect"),e.prev=2,L){e.next=7;break}return e.next=6,B();case 6:L=e.sent;case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:return e.prev=12,e.next=15,L.get("dirs",A);case 15:if(e.sent){e.next=21;break}return t=(new Date).toISOString(),n={id:A,parent_id:null,name:"root",create_time:t,last_update:t,type:"ROOT"},e.next=21,L.put("dirs",n);case 21:return e.next=23,L.getAll("dirs");case 23:return a=e.sent,e.next=26,L.getAll("notes");case 26:r=e.sent,o=[].concat(Object(_.a)(a),Object(_.a)(r)),i={},c=Object(g.a)(o);try{for(c.s();!(l=c.n()).done;)s=l.value,i[s.id]=s}catch(u){c.e(u)}finally{c.f()}return e.abrupt("return",{nodeTable:i,rootNode:E(o)});case 34:return e.prev=34,e.t1=e.catch(12),console.log(e.t1),e.abrupt("return",Promise.reject());case 38:case"end":return e.stop()}}),e,null,[[2,9],[12,34]])})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=Object(V.a)(P.a.mark((function e(t){var n,a,r,o,i,c,l;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(L){e.next=2;break}throw new Error("local DB not available");case 2:return e.prev=2,n=t.value,e.next=6,L.getAll("dirs");case 6:a=e.sent,r=Object(g.a)(a),e.prev=8,r.s();case 10:if((o=r.n()).done){e.next=16;break}if(o.value.name!==n){e.next=14;break}return e.abrupt("return",Promise.reject("name duplication"));case 14:e.next=10;break;case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(8),r.e(e.t0);case 21:return e.prev=21,r.f(),e.finish(21);case 24:return i=Object(T.a)(),A,c=(new Date).toISOString(),"DIR",l={id:i,name:n,parent_id:"00000000-0000-0000-0000-000000000000",create_time:c,last_update:c,type:"DIR"},e.next=33,L.add("dirs",l);case 33:return e.abrupt("return","".concat(n," created"));case 36:return e.prev=36,e.t1=e.catch(2),console.log(e.t1),e.abrupt("return",Promise.reject("failed to create notebook"));case 40:case"end":return e.stop()}}),e,null,[[2,36],[8,18,21,24]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(V.a)(P.a.mark((function e(t,n){var a,r;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.get("dirs",t);case 3:if(a=e.sent){e.next=6;break}throw new Error("notebook does not exist");case 6:return a.name=n.value,r=(new Date).toISOString(),a.last_update=r,e.next=11,L.put("dirs",a);case 11:return e.abrupt("return","notebook updated");case 14:return e.prev=14,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("update failed"));case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}(),U=function(){var e=Object(V.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.delete("dirs",t);case 3:return e.abrupt("return","notebook deleted");case 6:return e.prev=6,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("delete failed"));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(V.a)(P.a.mark((function e(t,n,a){var r,o,i,c,l,s,u,d,p,m,h,f,b;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=a.value,e.next=4,L.getAll("notes");case 4:o=e.sent,i=Object(g.a)(o),e.prev=6,i.s();case 8:if((c=i.n()).done){e.next=14;break}if(c.value.name!==r){e.next=12;break}return e.abrupt("return",Promise.reject("name duplication"));case 12:e.next=8;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(6),i.e(e.t0);case 19:return e.prev=19,i.f(),e.finish(19);case 22:return l="# ".concat(a.value," \n----\n")+t,s=Object(T.a)(),u=Object(T.a)(),d=(new Date).toISOString(),h={id:u,text:l,create_time:p=d,last_update:m=d},f={id:s,parent_id:n,content_id:u,name:r,type:"MKD",create_time:p,last_update:m},b=L.transaction(["notes","contents"],"readwrite"),e.next=33,Promise.all([b.objectStore("contents").add(h),b.objectStore("notes").add(f),b.done]);case 33:return e.abrupt("return","".concat(r," created"));case 36:return e.prev=36,e.t1=e.catch(0),console.log(e.t1),e.abrupt("return",Promise.reject("failed to create new note"));case 40:case"end":return e.stop()}}),e,null,[[0,36],[6,16,19,22]])})));return function(t,n,a){return e.apply(this,arguments)}}(),J={getMenu:K,getContent:function(){var e=Object(V.a)(P.a.mark((function e(t){var n,a,r;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.get("notes",t);case 3:if(n=e.sent){e.next=6;break}throw new Error("note does not exist");case 6:return a=n.content_id,e.next=9,L.get("contents",a);case 9:if(r=e.sent){e.next=12;break}throw new Error("note does not exist");case 12:return e.abrupt("return",{text:r.text});case 15:return e.prev=15,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("failed to get the content"));case 19:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}}(),createNote:W,createDir:H,deleteDir:U,deleteNote:function(){var e=Object(V.a)(P.a.mark((function e(t){var n,a;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.get("notes",t);case 3:return n=e.sent,a=n.content_id,e.next=7,L.delete("notes",t);case 7:return e.next=9,L.delete("contents",a);case 9:return e.abrupt("return","note deleted");case 12:return e.prev=12,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("failed to delete note"));case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),renameDir:G,renameNote:function(){var e=Object(V.a)(P.a.mark((function e(t,n){var a,r;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.get("notes",t);case 3:if(a=e.sent){e.next=6;break}throw new Error("note does not exist");case 6:return a.name=n.value,r=(new Date).toISOString(),a.last_update=r,e.next=11,L.put("notes",a);case 11:return e.abrupt("return","note updated");case 14:return e.prev=14,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("failed to update note"));case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}(),updateNote:function(){var e=Object(V.a)(P.a.mark((function e(t,n){var a,r,o,i;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.get("notes",t);case 3:if(a=e.sent){e.next=6;break}throw new Error("note does not exist");case 6:return r=(new Date).toISOString(),a.last_update=r,e.next=10,L.get("contents",a.content_id);case 10:return(o=e.sent).text=n,i=L.transaction(["notes","contents"],"readwrite"),e.next=15,Promise.all([i.objectStore("contents").put(o),i.objectStore("notes").put(a),i.done]);case 15:return e.abrupt("return","note updated");case 18:return e.prev=18,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",Promise.reject("failed to update note"));case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t,n){return e.apply(this,arguments)}}()};w=J.getMenu,x=J.getContent,S=J.createNote,C=J.createDir,O=J.deleteDir,N=J.deleteNote,j=J.renameDir,M=J.renameNote,F=J.updateNote;var Q=n(391),Y=n(393),q=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleOk=function(){var e=a.props,t=e.callback,n=e.async,r=e.afterSuccess,o=e.maxLength,i=a.state.value;null!==i&&0!==i.trim().length?i.trim().length>o?z("error","input should be shorter than "+(o||1e3)):n?(a.setState({confirmLoading:!0}),t({value:i}).then((function(e){a.setState({confirmLoading:!1}),z("success",e),a.handleCancel(),"function"===typeof r&&r()}),(function(e){z("error",e),a.setState({confirmLoading:!1})}))):(t({value:i}),a.handleCancel(),"function"===typeof r&&r()):z("error","invalid input")},a.handleCancel=function(){(0,a.props.onCancel)()},a.onChange=function(e){a.setState({value:e.target.value})},a.state={confirmLoading:!1,value:a.props.initialValue},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.confirmLoading,n=e.value,a=this.props,o=a.title,i=a.visible,c=a.placeholder;return r.a.createElement(Q.a,{title:o,visible:i,onOk:this.handleOk,confirmLoading:t,onCancel:this.handleCancel},r.a.createElement(Y.a,{value:n,placeholder:c,onChange:this.onChange,onPressEnter:this.handleOk}))}}]),n}(r.a.Component);q.defaultProps={title:"",initialValue:"",placeholder:"",async:!1,afterSuccess:function(){},maxLength:1e3};var X=q,Z=n(8),$=n(174),ee=n.n($),te={heading_1:"# heading",heading_2:"## heading",heading_3:"### heading",heading_4:"#### heading",ul:"- item\n- item\n- item\n",ol:"1. item\n2. item\n3. item\n",check:"\n- [x]  item\n- [ ]  item\n- [ ]  item\n",line:"\n---------------",table:"|       | col-1 | col-2 | col-3 | col-4 | col-5 |\n|-     -|-     -|-     -|-     -|-     -|-     -|\n| row-1 |       |       |       |       |       |\n| row-2 |       |       |       |       |       |\n| row-3 |       |       |       |       |       |\n"},ne=n(396),ae=(n(259),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).show=function(){a.setState({visible:!0})},a.hide=function(){a.setState({visible:!1})},a.renderModal=function(){var e=a.props,t=e.title,n=e.initialValue,o=e.placeholder,i=e.callback,c=e.async,l=e.afterSuccess,s=e.maxLength,u=a.state.visible;return r.a.createElement(X,{visible:u,title:t,initialValue:n,placeholder:o,onCancel:a.hide,callback:i,async:c,afterSuccess:l,maxLength:s,key:Math.random()})},a.state={visible:!1},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.content,t=r.a.cloneElement(e,{onClick:this.show});return r.a.createElement(r.a.Fragment,null,t,this.renderModal())}}]),n}(r.a.Component));ae.defaultProps={title:"",initialValue:"",placeholder:"",async:!1,afterSuccess:function(){},maxLength:1e3};var re=ae,oe=(n(262),n(263),n(264),{lineNumbers:!1,readOnly:!1,mode:"markdown",theme:"darcula",scrollbarStyle:"null",lineWrapping:!0}),ie=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).onChange=function(e){a.props.onChange(e)},a.componentDidMount=function(){var e=a.props.initialValue;try{window.codeMirror=a.editorRef.current.getCodeMirror();var t=a.editorRef.current.getCodeMirror().getDoc();t.setValue(e),a.onChange(t.getValue())}catch(n){console.log(n)}},a.insertTextAtCursor=function(e){try{var t=a.editorRef.current.getCodeMirror().getDoc(),n=t.getCursor();t.replaceRange(e,n)}catch(r){console.log(r)}},a.handleInsert=function(e,t){var n=e.key;if("pic"===n)a.insertTextAtCursor("\n![alt text](".concat(t.value,")\n"));else if("link"===n)a.insertTextAtCursor("\n[text](".concat(t.value,")\n"));else{var r=te[n];r&&a.insertTextAtCursor(r)}},a.headingMenu=r.a.createElement(y.a,{onClick:a.handleInsert},r.a.createElement(y.a.Item,{key:"heading_1"},"Heading level 1"),r.a.createElement(y.a.Item,{key:"heading_2"},"Heading level 2"),r.a.createElement(y.a.Item,{key:"heading_3"},"Heading level 3"),r.a.createElement(y.a.Item,{key:"heading_4"},"Heading level 4")),a.listMenu=r.a.createElement(y.a,{onClick:a.handleInsert},r.a.createElement(y.a.Item,{key:"ol"},"Ordered list"),r.a.createElement(y.a.Item,{key:"ul"},"Unordered list"),r.a.createElement(y.a.Item,{key:"check"},"Check list")),a.incFontSize=function(){a.setState({fontSize:a.state.fontSize+1})},a.resetFontSize=function(){a.setState({fontSize:16})},a.decFontSize=function(){a.setState({fontSize:a.state.fontSize-1})},a.editorRef=r.a.createRef(),a.state={fontSize:16},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.shrink,n=e.expand,a=this.state.fontSize,o="mk-editor";return t&&(o+=" shrink"),n&&(o+=" expand"),r.a.createElement("div",{className:o,style:{fontSize:a+"px"}},r.a.createElement("div",{className:"top-bar"},"Insert:",r.a.createElement(ne.a,{overlay:this.headingMenu,trigger:["click"]},r.a.createElement("span",{className:"option"},"Heading")),r.a.createElement(ne.a,{overlay:this.listMenu,trigger:["click"]},r.a.createElement("span",{className:"option"},"List")),r.a.createElement(re,{title:"Insert picture",placeholder:"Paste the picture link here",initialValue:"",callback:this.handleInsert.bind(this,{key:"pic"}),async:!1,content:r.a.createElement("span",{className:"option"},"Picture")}),r.a.createElement(re,{title:"Insert link",placeholder:"Paste the link here",initialValue:"",callback:this.handleInsert.bind(this,{key:"link"}),async:!1,content:r.a.createElement("span",{className:"option"},"Link")}),r.a.createElement("span",{className:"option",onClick:this.handleInsert.bind(this,{key:"line"})},"Line"),r.a.createElement("span",{className:"option",onClick:this.handleInsert.bind(this,{key:"table"})},"Table"),r.a.createElement("span",{className:"gap"}),"Font size:",r.a.createElement("span",{className:"option",onClick:this.incFontSize},"+"),r.a.createElement("span",{className:"option",onClick:this.resetFontSize},"Reset"),r.a.createElement("span",{className:"option",onClick:this.decFontSize},"-")),r.a.createElement(ee.a,{ref:this.editorRef,onChange:this.onChange,options:oe}))}}]),n}(r.a.Component),ce=n(177),le=n.n(ce),se=(n(352),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).incFontSize=function(){a.setState({fontSize:a.state.fontSize+1})},a.resetFontSize=function(){a.setState({fontSize:16})},a.decFontSize=function(){a.setState({fontSize:a.state.fontSize-1})},a.state={fontSize:16},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.shrink,n=e.expand,a=e.source,o=this.state.fontSize,i="mk-display";return t&&(i+=" shrink"),n&&(i+=" expand"),r.a.createElement("div",{className:i,style:{fontSize:o+"px"}},r.a.createElement("div",{className:"font-size"},"Font size:",r.a.createElement("span",{className:"option",onClick:this.incFontSize},"+"),r.a.createElement("span",{className:"option",onClick:this.resetFontSize},"Reset"),r.a.createElement("span",{className:"option",onClick:this.decFontSize},"-")),r.a.createElement(le.a,{source:a,escapeHtml:!1}))}}]),n}(r.a.Component)),ue=n(389),de=n(392),pe=n(399),me=(n(353),r.a.createElement(pe.a,{style:{fontSize:120},spin:!0})),he=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).getNewContent=function(e){a.setState({ready:!1}),x(e).then((function(e){a.setState({source:e.text,ready:!0,changed:!1})}),(function(){}))},a.onEditorChange=function(e){a.state.source!==e&&a.setState({source:e,changed:!0})},a.sizeChange=function(e){a.setState({sizeConfig:e})},a.state={source:"",ready:!1,changed:!1,sizeConfig:1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.noteId;this.getNewContent(e)}},{key:"componentDidUpdate",value:function(e){var t=this.props.noteId;e.noteId!==t&&this.getNewContent(t)}},{key:"shouldComponentUpdate",value:function(e){if(e.location.pathname!==this.props.location.pathname){var t=window.codeMirror.getDoc(),n=this.props.location.pathname.slice(6),a=this.state.changed;if(!t||!n||n.length<1||!a)return!0;var r=t.getValue();F(n,r).then((function(e){z("success","Auto saving completed \n"+e)}),(function(){z("error","update failed, try again later")}))}return!0}},{key:"componentWillUnmount",value:function(){var e=window.codeMirror.getDoc(),t=this.props.location.pathname.slice(6),n=this.state.changed;if(!e||!t||t.length<1||!n)return!0;var a=e.getValue();F(t,a).then((function(e){z("success","Auto saving completed \n"+e)}),(function(){z("error","update failed, try again later")}))}},{key:"render",value:function(){var e=this.state,t=e.source,n=e.ready,a=e.sizeConfig;return r.a.createElement("div",{className:"main mk-mode"},!n&&r.a.createElement(ue.a,{indicator:me}),!!n&&r.a.createElement(r.a.Fragment,null,r.a.createElement(ie,{onChange:this.onEditorChange,initialValue:t,shrink:0===a,expand:2===a}),r.a.createElement(se,{source:this.state.source,shrink:2===a,expand:0===a}),r.a.createElement("div",{className:"slider-bar"},r.a.createElement(de.a,{max:2,defaultValue:1,included:!1,tooltipVisible:!1,onChange:this.sizeChange,value:a}))))}}]),n}(r.a.Component),fe=Object(Z.h)(he),be=n(58),ve=n(400),ke=n(401),ye=n(402),ge=n(398),Ee=n(17),we=(n(380),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).renderChildren=function(t,n){var a=e.props.history,o=[],i=[];t.sort((function(e,t){return(""+e.name).localeCompare(""+t.name)}));var c,l=Object(g.a)(t);try{var s=function(){var t=c.value;"DIR"===t.type?o.push(r.a.createElement("div",{className:"unit",key:t.id},r.a.createElement("div",{className:"icon-container",style:{textAlign:"center"}},r.a.createElement(ve.a,{style:{fontSize:"50px"},className:"pointer",onClick:function(){a.push("/dir/".concat(t.id))}})),r.a.createElement("div",{className:"file-name pointer",onClick:function(){a.push("/dir/".concat(t.id))}},t.name),e.renderRenameButtonForNotebook(j.bind(Object(be.a)(e),t.id),t.name),e.renderDeleteButtonForNotebook(e.onDirDelete.bind(Object(be.a)(e),t.id)))):i.push(r.a.createElement("div",{className:"unit",key:t.id},r.a.createElement("div",{className:"icon-container",style:{textAlign:"center"}},r.a.createElement(ke.a,{style:{fontSize:"50px"},className:"pointer",twoToneColor:"#ffd152",onClick:function(){a.push("/note/".concat(t.id))}})),r.a.createElement("div",{className:"file-name pointer",onClick:function(){a.push("/note/".concat(t.id))}},t.name),e.renderRenameButtonForNote(M.bind(Object(be.a)(e),t.id),t.name),e.renderDeleteButtonForNote(e.onNoteDelete.bind(Object(be.a)(e),t.id))))};for(l.s();!(c=l.n()).done;)s()}catch(d){l.e(d)}finally{l.f()}var u=[].concat(o,i);return"00000000-0000-0000-0000-000000000000"!==n&&u.unshift(r.a.createElement("div",{className:"unit",key:"return"},r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(ye.a,{className:"pointer",style:{fontSize:"50px",color:"#1790ff"},onClick:function(){a.push("/root")}})),r.a.createElement("div",{className:"file-name pointer",onClick:function(){a.push("/root")}},"Return"))),u},e.renderDeleteButtonForNotebook=function(e){return r.a.createElement(ge.a,{title:"Sure to delete this notebook?",onConfirm:e},r.a.createElement(Ee.a,{danger:!0,type:"primary",size:"small"},"Delete"))},e.renderDeleteButtonForNote=function(e){return r.a.createElement(ge.a,{title:"Sure to delete this note?",onConfirm:e},r.a.createElement(Ee.a,{danger:!0,type:"primary",size:"small"},"Delete"))},e.renderRenameButtonForNotebook=function(t,n){return r.a.createElement(re,{title:"Rename notebook",placeholder:"Give a new name for your notebook",initialValue:n,callback:t,async:!0,afterSuccess:e.props.updateFunction,content:r.a.createElement(Ee.a,{size:"small"},"Rename")})},e.renderRenameButtonForNote=function(t,n){return r.a.createElement(re,{title:"Rename note",placeholder:"Give a new name for your note",initialValue:n,callback:t,async:!0,afterSuccess:e.props.updateFunction,content:r.a.createElement(Ee.a,{size:"small"},"Rename"),maxLength:50})},e.onDirDelete=function(t){O(t).then((function(t){e.props.updateFunction(),z("success",t)}))},e.onNoteDelete=function(t){N(t).then((function(t){e.props.updateFunction(),z("success",t)}))},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.directory,t=e.name,n=e.id,a=this.renderChildren(e.children,n);return r.a.createElement("div",{className:"dir-module"},r.a.createElement("h1",{className:"title"},t),r.a.createElement("div",{className:"fileContainer"},a))}}]),n}(r.a.Component)),xe=Object(Z.h)(we),Se=(n(383),n(77)),Ce=function(){return r.a.createElement("div",{className:"welcome"},r.a.createElement("h1",null,"Welcome to EasyMDE"),r.a.createElement("p",null,"This is a markdown note application in which you can:"),r.a.createElement("ul",null,r.a.createElement("li",null,"Create & Manage notes"),r.a.createElement("li",null,"Full Markdown syntax support"),r.a.createElement("li",null,"No need for account"),r.a.createElement("li",null,"Automatical saving")),r.a.createElement("br",null),r.a.createElement("h2",null,"Local Storage"),r.a.createElement("p",null,"EasyMDE stores your notes locally, which means all your files are accessible offline!"),r.a.createElement("br",null),r.a.createElement("h2",null,"Navigation"),r.a.createElement("p",null,"You can keep mutiple notebooks(folders), each of them can hold mutiple notes(files). Use the Menu on left side for navigation."),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(d.a,null)," directs you to a notebook view which allows you manage everything in it."),r.a.createElement("li",null,r.a.createElement(p.a,null)," directs you to a note editor."),r.a.createElement("li",null,r.a.createElement(f.a,null)," creates a new notebook."),r.a.createElement("li",null,r.a.createElement(b.a,null)," creates a new note file in current notebook.")),r.a.createElement("p",null,"Click ",r.a.createElement(Se.b,{to:"/root"},"here")," to view your root directory."),r.a.createElement("br",null),r.a.createElement("h2",null,"About Markdown"),r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"104",height:"64",viewBox:"0 0 208 128"},r.a.createElement("rect",{width:"198",height:"118",x:"5",y:"5",ry:"10",stroke:"#FFD152",strokeWidth:"10",fill:"none"}),r.a.createElement("path",{fill:"#FFD152",d:"M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"}),r.a.createElement("script",{xmlns:""})),r.a.createElement("p",null,"Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world\u2019s most popular markup languages."),r.a.createElement("p",null,"Markdown is a fast and easy way to take notes, create content for a website, and produce print-ready documents. It doesn\u2019t take long to learn the Markdown syntax, and once you know how to use it, you can write using Markdown just about everywhere. Most people use Markdown to create content for the web, but Markdown is good for formatting everything from email messages to grocery lists."),r.a.createElement("br",null),r.a.createElement("h2",null,"About me"))},Oe=function(e){var t=e.rootDir,n=e.updateFunction;return r.a.createElement(xe,{directory:t,updateFunction:n})},Ne=function(e){var t=Object(Z.g)().id,n=e.nodeTable,a=e.updateFunction;return n[t]?r.a.createElement(xe,{directory:n[t],updateFunction:a}):r.a.createElement(Z.a,{to:"/root"})},je=function(){var e=Object(Z.g)().id;return r.a.createElement(fe,{noteId:e})},Me=function(e){var t=e.nodeTable,n=e.rootKey,a=e.fetchMenuFromRear;return r.a.createElement(Z.d,null,r.a.createElement(Z.b,{exact:!0,path:"/"},r.a.createElement(Ce,null)),r.a.createElement(Z.b,{exact:!0,path:"/root"},r.a.createElement(Oe,{rootDir:t?t[n]:null,updateFunction:a})),r.a.createElement(Z.b,{path:"/dir/:id"},r.a.createElement(Ne,{nodeTable:t,updateFunction:a})),r.a.createElement(Z.b,{path:"/note/:id"},r.a.createElement(je,null)),r.a.createElement(Z.b,null,r.a.createElement(Z.a,{to:"/"})))},Fe=(n(384),k.a.Sider),De=y.a.SubMenu,ze=y.a.Item,_e=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).rootKey=null,a.fetchMenuFromRear=function(){w().then((function(e){if(e&&"object"===typeof e){var t=e.nodeTable,n=e.rootNode;console.info("fetch Menu From Rear",t,n),a.rootKey=n.id,a.setState({ready:!0,nodeTable:t,renderedMenu:a.renderMenu(n,!0)})}else z("error","failed to fetch your notebooks, please refresh")}),(function(e){z("error","failed to fetch your notebooks, please refresh")}))},a.renderMenu=function(e,t){var n=a.props.history;if(t){var o=e.children.map((function(e){return a.renderMenu(e,!1)}));return r.a.createElement(De,{key:e.id,icon:r.a.createElement(d.a,null),title:"Notebooks",onTitleClick:function(){a.state.isSidebarCollapsed?a.moveSideMenu(!1):n.push("/root")},popupClassName:"side-bar-popup"},o)}if("MKD"===e.type)return r.a.createElement(ze,{key:e.id,icon:r.a.createElement(p.a,null)},e.name);var i=e.children.map((function(e){return a.renderMenu(e,!1)}));return r.a.createElement(De,{key:e.id,icon:r.a.createElement(d.a,null),title:e.name,onTitleClick:function(){n.push("/dir/".concat(e.id))}},i)},a.moveSideMenu=function(e){a.setState({isSidebarCollapsed:e})},a.setNewFolderPopupVisibility=function(e){a.setState({newFolderPopupVisible:e})},a.setNewNotePopupVisibility=function(e){a.setState({newNotePopupVisible:e})},a.onItemSelect=function(e){e.item;var t=e.key,n=(e.keyPath,e.selectedKeys,e.domEvent,a.props.history);"new_notebook"===t||"new_note"===t||"save"===t||("home"===t?n.push("/"):n.push("/note/".concat(t)))},a.saveCurrent=function(){var e=a.props.location,t=window.codeMirror.getDoc(),n=0===e.pathname.indexOf("/note/"),r=e.pathname.slice(6);if(n&&t&&r&&!(r.length<1)){var o=t.getValue();F(r,o).then((function(e){z("success",e)}),(function(){z("error","update failed, try again later")}))}},a.getOpenKeys=function(e){var t=a.state.nodeTable;if(0===e.indexOf("/root"))return[a.rootKey];if(0===e.indexOf("/dir/")){var n=e.slice(5);return[a.rootKey,n]}if(0===e.indexOf("/note/")){var r=e.slice(6),o=!!t[r]&&t[r].parent_id;return[a.rootKey,o]}return[]},a.getDirId=function(e){return"/root"===e?a.rootKey:0===e.indexOf("/dir/")?e.slice(5):null},a.state={isSidebarCollapsed:!0,nodeTable:null,renderedMenu:null,newFolderPopupVisible:!1,newNotePopupVisible:!1,openNotebooks:[],ready:!1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.fetchMenuFromRear()}},{key:"render",value:function(){var e=this.state,t=e.isSidebarCollapsed,n=e.renderedMenu,a=e.ready,o=e.nodeTable,i=this.props.location,c=0===i.pathname.indexOf("/note/"),l=0===i.pathname.indexOf("/dir/")||0===i.pathname.indexOf("/root"),s=c?i.pathname.slice(6):null,u=this.getDirId(i.pathname),d=a?this.getOpenKeys(i.pathname):[];return r.a.createElement("div",{className:"App"},r.a.createElement(k.a,null,r.a.createElement(Fe,{className:"side-bar",collapsible:!0,collapsed:t,onCollapse:this.moveSideMenu,width:240,trigger:r.a.createElement(m.a,{className:"forward-arrow icon-btn",style:{fontSize:"3rem"}}),reverseArrow:!0},r.a.createElement(y.a,{mode:"inline",selectable:!0,onSelect:this.onItemSelect,openKeys:d,selectedKeys:[s]},r.a.createElement(y.a.Item,{key:"home",icon:r.a.createElement(h.a,null)},"Home"),r.a.createElement(y.a.Item,{key:"new_notebook",icon:r.a.createElement(f.a,null),onClick:this.setNewFolderPopupVisibility.bind(this,!0)},"New Note Book"),!!l&&r.a.createElement(y.a.Item,{key:"new_note",icon:r.a.createElement(b.a,null),onClick:this.setNewNotePopupVisibility.bind(this,!0)},"New Note"),!!c&&r.a.createElement(y.a.Item,{key:"save",icon:r.a.createElement(v.a,null),onClick:this.saveCurrent},"Save"),n)),r.a.createElement(k.a,{className:"site-layout module-frame"},!!a&&r.a.createElement(Me,{nodeTable:o,rootKey:this.rootKey,fetchMenuFromRear:this.fetchMenuFromRear}))),r.a.createElement(X,{visible:this.state.newFolderPopupVisible,title:"Create a new notebook.",placeholder:"Give a name for your new notebook",onCancel:this.setNewFolderPopupVisibility.bind(this,!1),callback:C,async:!0,afterSuccess:this.fetchMenuFromRear,key:Math.random(),maxLength:50}),r.a.createElement(X,{visible:this.state.newNotePopupVisible,title:"Create a new note.",placeholder:"Give a name for your new note",onCancel:this.setNewNotePopupVisibility.bind(this,!1),callback:S.bind(this,"\n\n<----- Save Button\n\n### This is your new Markdown note\nAll the frequenly used Markdown syntax are supported. For more infor about the syntax, please check [here](https://www.markdownguide.org/basic-syntax/).\nYou can use insertion button on the top to insert Markdown code templetes or you can write whatever Markdown you like\n<br><br>\n\n### Examples\n---------------\n#### Bold&Italic:\n\n**bold** text.\n\n__bold__ text.\n\n*Italicized* text.\n\n<br>\n\n#### Lists:\n\n1. item\n2. item\n3. item\n\n- item\n- item\n- item\n\n\n- [x]  item\n- [ ]  item\n- [ ]  item\n\n<br>\n\n#### Tables\n|       | col-1 | col-2 | col-3 | col-4 | col-5 |\n|-     -|-     -|-     -|-     -|-     -|-     -|\n| row-1 |       |       |       |       |       |\n| row-2 |       |       |       |       |       |\n| row-3 |       |       |       |       |       |\n\n<br>\n\n#### Links\nThis is a link: [link](https://en.wikipedia.org/wiki/Don_Quixote)\n\nThis is also a link: https://en.wikipedia.org/wiki/Don_Quixote\n\n<br>\n\n#### Pictures\n\n![alt text](https://upload.wikimedia.org/wikipedia/commons/2/20/Don_Quijote_and_Sancho_Panza.jpg)\n",u),async:!0,afterSuccess:this.fetchMenuFromRear,key:Math.random(),maxLength:50}))}}]),n}(r.a.Component),Ie=Object(Z.h)(_e);n(385),n(386);i.a.render(r.a.createElement(Se.a,null,r.a.createElement(Ie,null)),document.getElementById("root"))}},[[183,1,2]]]);
//# sourceMappingURL=main.af7cb55c.chunk.js.map