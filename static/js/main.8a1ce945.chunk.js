(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(e,t,a){e.exports=a(271)},163:function(e,t,a){},269:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},270:function(e,t,a){},271:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(11),o=a.n(l),s=(a(163),a(66)),i=a(67),c=a(79),u=a(80),d=a(14),m=["user-read-email","playlist-modify-public","playlist-modify-private"],p=a(139),f=a(321),g=a(56),b=window.location.hash.substring(1).split("&").reduce(function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e},{});window.location.hash="";var h=b,y=a(13),v=a(141),k=a(306),x=a(319),w=a(324),E=a(320),O=a(323),j=a(317),S=a(140),A=a(17),C=a(16),P=a(135),N=a.n(P),z={name:"",id:"",token:"",tokenms:0,allPlaylists:[],filteredPlaylists:[],selectedAlbums:[],allAlbums:{},selectedPlaylists:[],progress:{done:0,total:0,percent:0},log:function(e,t){var a=t||"normal",n="> "+e;I.logArray.push({text:n,color:{start:"cornflowerblue",normal:"#ddd",end:"lightgreen",error:"red"}[a]});var r=document.getElementById("logger");r.scrollTop=r.scrollHeight+50},logArray:[],errors:[]};var I=Object(A.a)(null!=localStorage.getItem("user")?N()(z,JSON.parse(localStorage.getItem("user"))):z);Object(C.c)(function(){localStorage.setItem("user",JSON.stringify(I))}),window.user=I;var B=a(273),T=a(322),L=a(9),_=a.n(L),R=a(22),D=a(308),M=a(310),U=a(312),G=a(311),W=a(329),F=a(15),J=a.n(F),H=Object(k.a)(function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper,paddingLeft:10},list:{position:"relative",overflow:"auto",maxHeight:"50vh"}}});Object.filter=function(e,t){return Object.keys(e).filter(function(a){return t(e[a])}).reduce(function(t,a){return t[a]=e[a],t},{})};var V=Object(A.b)(function(e){var t=H(),a=e.token;Object(n.useEffect)(function(){function e(){return(e=Object(R.a)(_.a.mark(function e(){var t,n,r;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:I.log("Getting LS albums...");case 1:return e.next=3,J.a.get(t||"https://api.spotify.com/v1/artists/4SCWiQbJCMTHK737aNUqBJ/albums?offset=0&limit=50&market=CA",{headers:{Authorization:"Bearer "+a}});case 3:for(n=e.sent,r=0;r<n.data.items.length;r++)I.allAlbums[n.data.items[r].id]=n.data.items[r];t=n.data.next;case 6:if(t){e.next=1;break}case 7:I.log("Loaded ".concat(Object.values(I.allAlbums).length," albums")),console.log(I.allAlbums);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}(),I.selectedAlbums=[]},[]);var l=function(e,t){if(I.selectedAlbums.indexOf(t)>-1){var a=I.selectedAlbums.filter(function(e){return e!==t});I.selectedAlbums=a}else I.selectedAlbums=I.selectedAlbums.concat(t)};return r.a.createElement("div",{className:t.root},r.a.createElement(D.a,{className:t.list,component:"nav","aria-label":"main mailbox folders"},r.a.createElement(g.a,{variant:"body1"},"Albums"),I.allAlbums&&Object.values(Object.filter(I.allAlbums,function(e){return"album"===e.album_type})).map(function(e,t){var a=new Date(e.release_date);return r.a.createElement(M.a,{button:!0,selected:I.selectedAlbums.indexOf(e.id)>-1,onClick:function(t){return l(0,e.id)},key:e.id,style:{paddingLeft:0,paddingBottom:0,paddingTop:0}},r.a.createElement(G.a,null,r.a.createElement(W.a,{variant:"square",src:e.images[1].url})),r.a.createElement(U.a,{primary:e.name,secondary:a.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}))}),r.a.createElement(g.a,{variant:"body1"},"Singles"),I.allAlbums&&Object.values(Object.filter(I.allAlbums,function(e){return"single"===e.album_type})).map(function(e,t){var a=new Date(e.release_date);return r.a.createElement(M.a,{button:!0,selected:I.selectedAlbums.indexOf(e.id)>-1,onClick:function(t){return l(0,e.id)},key:e.id,style:{paddingLeft:0,paddingBottom:0,paddingTop:0}},r.a.createElement(G.a,null,r.a.createElement(W.a,{variant:"square",src:e.images[1].url})),r.a.createElement(U.a,{primary:e.name,secondary:a.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}))})))}),Y=a(78),q=a(326),K=a(136),Q=a.n(K),Z=a(142),$=a(137),X=a.n($);function ee(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"===typeof e)return te(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return te(e,t)}(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r,l=!0,o=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){o=!0,r=e},f:function(){try{l||null==n.return||n.return()}finally{if(o)throw r}}}}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var ae=300;function ne(){return(ne=Object(R.a)(_.a.mark(function e(){var t,a,n,r,l;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:I.log("Fetching all of ".concat(I.name,"'s playlists"));case 1:return e.next=3,J.a.get(t||"https://api.spotify.com/v1/me/playlists?limit=50",{headers:{Authorization:"Bearer "+I.token}});case 3:a=e.sent,n=a.data.items,I.log("Retrieved ".concat(a.data.items.length," playlists")),r=_.a.mark(function e(t){var a,r;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((a=n[t]).owner.id!==I.id){e.next=9;break}if(-1!==I.allPlaylists.findIndex(function(e){return e.id===a.id})||-1!==I.filteredPlaylists.indexOf(a.id)){e.next=9;break}return e.next=5,ge(ae);case 5:return e.next=7,re(a);case 7:void 0!==(a=e.sent).tracks?(console.log(a),l=a,I.allPlaylists.push({id:l.id,name:l.name,url:l.external_urls.spotify,tracks_endpoint:l.tracks.href,description:decodeURIComponent(l.description),tracks:l.tracks,albumsString:l.albumsString,albums:l.albums,lastUpdated:l.lastUpdated,playlistMilliseconds:l.playlistMilliseconds})):(I.log("".concat(a.name," was not relaxing enough.")),(r=I.filteredPlaylists.splice()).push(a.id),I.filteredPlaylists=r);case 9:case"end":return e.stop()}var l},e)}),e.t0=_.a.keys(n);case 8:if((e.t1=e.t0()).done){e.next=13;break}return l=e.t1.value,e.delegateYield(r(l),"t2",11);case 11:e.next=8;break;case 13:t=a.data.next;case 14:if(t){e.next=1;break}case 15:case"end":return e.stop()}},e)}))).apply(this,arguments)}function re(e){return le.apply(this,arguments)}function le(){return(le=Object(R.a)(_.a.mark(function e(t){var a,n,r,l,o,s,i,c,u,d;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=!1,l={tracks:[],albums:[],albumsString:"",lastUpdated:Date.parse("1980-01-01T12:00:00Z"),playlistMilliseconds:0};case 3:return e.next=5,J.a.get(a||"https://api.spotify.com/v1/playlists/".concat(t.id,"/tracks?fields="),{headers:{Authorization:"Bearer "+I.token}});case 5:o=e.sent,n=n.concat(o.data.items),s=ee(o.data.items),e.prev=8,s.s();case 10:if((i=s.n()).done){e.next=17;break}if("Little Symphony"!==i.value.track.artists[0].name){e.next=15;break}return r=!0,e.abrupt("break",17);case 15:e.next=10;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(8),s.e(e.t0);case 22:return e.prev=22,s.f(),e.finish(22);case 25:a=o.data.next;case 26:if(a&&r){e.next=3;break}case 27:if(r){e.next=30;break}return t.tracks=void 0,e.abrupt("return",t);case 30:for(c in n)u=n[c].track,l.tracks.push({place:c,id:u.id,length:u.duration_ms,album:u.album.name}),l.playlistMilliseconds+=u.duration_ms,(d=Date.parse(n[c].added_at))>l.lastUpdated&&(l.lastUpdated=d),-1===l.albumsString.indexOf(u.album.name)&&(l.albums.push({id:u.album.id,name:u.album.name}),l.albumsString+=u.album.name+", ");return!r&&Object.entries(l.tracks).length>0&&(l.tracks=void 0),l.albumsString=l.albumsString.substring(0,l.albumsString.length-2),t=Object(Z.a)({},t,l),e.abrupt("return",t);case 35:case"end":return e.stop()}},e,null,[[8,19,22,25]])}))).apply(this,arguments)}function oe(e,t){return se.apply(this,arguments)}function se(){return(se=Object(R.a)(_.a.mark(function e(t,a){var n,r,l,o,s,i,c,u,d,m,p,f,g,b,h;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:pe(),r=[],l=0,o=[],s="",i=0,c=[],u=[],(n="replace"===a)?(t="end",I.log("It's time to replace ".concat(I.selectedPlaylists.length," playlists with ").concat(I.selectedAlbums.length," selected albums."),"start")):I.log("It's time to add ".concat(I.selectedAlbums.length," albums to the ").concat(t," of ").concat(I.selectedPlaylists.length," playlists"),"start"),d=0;case 11:if(!(d<I.selectedAlbums.length)){e.next=24;break}return I.log("Grabbing track info for ".concat(I.allAlbums[I.selectedAlbums[d]].name)),e.next=15,J.a.get("https://api.spotify.com/v1/albums/".concat(I.selectedAlbums[d],"/tracks?limit=50"),{headers:{Authorization:"Bearer "+I.token}});case 15:for(m=e.sent,r=r.concat(m.data),s+="".concat(I.allAlbums[I.selectedAlbums[d]].name,", "),c.push(I.allAlbums[I.selectedAlbums[d]]),console.log(r[0]),p=0;p<r[d].total;p++)o.push(r[d].items[p].uri),i+=r[d].items[p].duration_ms,u.push({place:p,id:r[d].items[p].id,length:r[d].items[p].duration_ms,album:I.selectedAlbums[d].name});case 21:d++,e.next=11;break;case 24:console.log(c),console.log(u),f=o.length,g=_.a.mark(function e(){var a,r,d,m,p,g,y,v;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=I.selectedPlaylists[b],r=I.allPlaylists.findIndex(function(e){return e.id===a}),d=I.allPlaylists[r],console.log(d.tracks),e.prev=5;case 6:p="start"===t?{uris:[],position:0}:{uris:[]},h=0;case 8:if(!(h<o.length)){e.next=16;break}if(g=void 0,"start"===t?(g=o[o.length-1-h],p.uris.unshift(g)):(g=o[h],p.uris.push(g)),99!==h){e.next=13;break}return e.abrupt("break",16);case 13:h++,e.next=8;break;case 16:if(o="start"===t?o.slice(0,-p.uris.length):o.slice(p.uris.length,o.length),y="https://api.spotify.com/v1/playlists/".concat(d.id,"/tracks"),!n||o.length+p.uris.length!==f){e.next=24;break}return e.next=21,J.a.put(y,p,{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 21:m=e.sent,e.next=27;break;case 24:return e.next=26,J.a.post(y,p,{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 26:m=e.sent;case 27:console.log(m);case 28:if(o.length>0){e.next=6;break}case 29:console.log(m),201===m.status&&(n&&(I.log("Removed all previous albums from ".concat(d.name,".")),I.allPlaylists[r].albumsString="",I.allPlaylists[r].albums=[],I.allPlaylists[r].tracks=[],I.allPlaylists[r].playlistMilliseconds=0),I.log("Successfully plopped ".concat(f," beats onto ").concat(d.name,".")),v=X()(I.allPlaylists[r]),"start"===t?(v.albumsString=s+v.albumsString,v.albums=he(c,v.albums),v.tracks=he(u,v.tracks)):(""!==v.albumsString&&(v.albumsString+=", "),v.albumsString=v.albumsString+s.substring(0,s.length-2),v.albums=he(v.albums,c),v.tracks=he(v.tracks,u)),v.playlistMilliseconds+=i,v.lastUpdated=Date.now().toString(),I.allPlaylists[r]=v),e.next=37;break;case 33:e.prev=33,e.t0=e.catch(5),I.log("Houston, we had an issue with ".concat(d.name,"."),"error"),console.log(e.t0);case 37:return fe(),l+=ae,e.next=41,ge(l);case 41:case"end":return e.stop()}},e,null,[[5,33]])}),b=0;case 29:if(!(b<I.selectedPlaylists.length)){e.next=34;break}return e.delegateYield(g(),"t0",31);case 31:b++,e.next=29;break;case 34:I.log("All finished big guy.","end");case 35:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ie(){return(ie=Object(R.a)(_.a.mark(function e(t){var a,n,r;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:pe(),a=0,I.log("Description time! Changing the description of ".concat(I.selectedPlaylists.length," playlists."),"start"),n=_.a.mark(function e(){var n,l,o,s;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=I.selectedPlaylists[r],l=I.allPlaylists.findIndex(function(e){return e.id===n}),o=I.allPlaylists[l],s={description:t},e.prev=4,e.next=7,J.a.put("https://api.spotify.com/v1/playlists/".concat(o.id,"/"),s,{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 7:200===e.sent.status&&(I.log("Bam. Description of ".concat(o.name," updated.")),o.description=t,I.allPlaylists[l]=o),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(4),I.log("Uh oh! There was an issue with ."),console.log(e.t0);case 15:return fe(),a+=ae,e.next=19,ge(a);case 19:case"end":return e.stop()}},e,null,[[4,11]])}),r=0;case 5:if(!(r<I.selectedPlaylists.length)){e.next=10;break}return e.delegateYield(n(),"t0",7);case 7:r++,e.next=5;break;case 10:pe(),I.log("We're done here.","end");case 12:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ce(){return(ce=Object(R.a)(_.a.mark(function e(){var t,a,n,r;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:I.log("We're about to refresh ".concat(I.selectedPlaylists.length," playlists."),"start"),t=_.a.mark(function e(){var t,l,o,s,i,c,u;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(t=I.selectedPlaylists[a],l=I.allPlaylists.findIndex(function(e){return e.id===t}),o=I.allPlaylists[l],s=[],n=0;n<Object.keys(o.tracks).length;n++)s.push("spotify:track:".concat(o.tracks[n].id));return e.prev=5,c="https://api.spotify.com/v1/playlists/".concat(o.id,"/tracks"),e.next=9,J.a.put(c,{uris:[]},{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 9:i=e.sent;case 10:console.log(s),u={uris:[]},r=0;case 13:if(!(r<s.length)){e.next=20;break}if(u.uris.push(s[r]),99!==r){e.next=17;break}return e.abrupt("break",20);case 17:r++,e.next=13;break;case 20:return s=s.slice(u.uris.length,s.length),console.log(s),console.log(u),e.next=25,J.a.post(c,u,{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 25:i=e.sent;case 26:if(s.length>0){e.next=10;break}case 27:201===i.status?I.log("".concat(o.name," is looking refreshed af."),"end"):I.log("Refreshing ".concat(o.name," gave us an error. Not cool man."),"error"),e.next=34;break;case 30:e.prev=30,e.t0=e.catch(5),I.log("Refreshing ".concat(o.name," gave us an error. Not cool man."),"error"),console.log(e.t0);case 34:case"end":return e.stop()}},e,null,[[5,30]])}),a=0;case 3:if(!(a<I.selectedPlaylists.length)){e.next=8;break}return e.delegateYield(t(),"t0",5);case 5:a++,e.next=3;break;case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ue(){return(ue=Object(R.a)(_.a.mark(function e(t){var a,n,r,l,o;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.split("\n"),n=a.map(function(e){var t=e.indexOf("playlist"),a=e.indexOf("?");return e.substring(t+9,a)}),I.log("We're about to follow ".concat(n.length," playlists."),"start"),r=0;case 4:if(!(r<n.length)){e.next=23;break}return l=n[r],console.log(l),e.prev=7,void 0,o="https://api.spotify.com/v1/playlists/".concat(l,"/followers"),e.next=12,J.a.put(o,{},{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 12:200===e.sent.status?I.log("".concat(n[r]," has been followed.")):I.log("Following ".concat(a[r]," gave us an error. Not cool man."),"error"),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(7),I.log("Following ".concat(a[r]," gave us an error. Not cool man."),"error"),console.log(e.t0);case 20:r++,e.next=4;break;case 23:I.log("All done boss.","end");case 24:case"end":return e.stop()}},e,null,[[7,16]])}))).apply(this,arguments)}function de(e){return me.apply(this,arguments)}function me(){return(me=Object(R.a)(_.a.mark(function e(t){var a,n,r,l,o,s,i;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=[],n=t.split("\n"),r=n.map(function(e){var t=e.indexOf("playlist"),a=e.indexOf("?");return-1===a&&(a=e.length),e.substring(t+9,a)}),I.log("We're about to get follower counts from ".concat(r.length," playlists."),"start"),l=0;case 5:if(!(l<r.length)){e.next=25;break}return o=r[l],console.log(o),e.prev=8,s=void 0,i="https://api.spotify.com/v1/playlists/".concat(o),e.next=13,J.a.get(i,{headers:{Authorization:"Bearer "+I.token,"Content-Type":"application/json"}});case 13:s=e.sent,console.log(s),200===s.status?(I.log("Got followers from ".concat(r[l],".")),a.push(s.data.followers.total)):I.log("Getting followers from ".concat(n[l]," gave us an error. Not cool man."),"error"),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(8),I.log("Getting followers from ".concat(n[l]," gave us an error. Not cool man."),"error"),console.log(e.t0);case 22:l++,e.next=5;break;case 25:return I.log("All done boss.","end"),e.abrupt("return",a.join("\n"));case 27:case"end":return e.stop()}},e,null,[[8,18]])}))).apply(this,arguments)}function pe(){I.progress.done=0,I.progress.total=I.selectedPlaylists.length,I.progress.percent=0}function fe(){I.progress.done++,I.progress.percent=I.progress.done/I.progress.total*100}function ge(e){return be.apply(this,arguments)}function be(){return(be=Object(R.a)(_.a.mark(function e(t){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ye(t);case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function he(e,t){return t.forEach(function(t){e.push(t)}),e}var ye=function(e){return new Promise(function(t){return setTimeout(t,e)})},ve=Object(k.a)(function(e){return{root:{fontSize:14}}}),ke=Object(A.b)(function(e){var t=ve(),a=Object(n.useState)(500),l=Object(y.a)(a,2),o=l[0],s=l[1],i=Object(n.useState)(I.allPlaylists),c=Object(y.a)(i,2),u=c[0],d=c[1],m=Object(n.useState)(I.allPlaylists),p=Object(y.a)(m,2),f=p[0],g=p[1];Object(n.useEffect)(function(){var e=window.innerWidth;s(e-520),window.addEventListener("resize",function(){var e=window.innerWidth;s(e-520)}),function(){ne.apply(this,arguments)}()},[]),Object(n.useEffect)(function(){if(console.log(e.search.length),e.search.length>2){var t=u.filter(function(t){return console.log(t.name),console.log(t.name.indexOf(e.search.toLowerCase())),t.name.toLowerCase().indexOf(e.search.toLowerCase())>-1||t.albumsString.toLowerCase().indexOf(e.search.toLowerCase())>-1});console.log(t),g(t)}else g(u)},[e.search,u]);var b=function(e){var t=e.value;return r.a.createElement(q.a,{title:t,placement:"bottom"},r.a.createElement("div",{className:"no-overflow"},t))},h=[{key:"name",name:"Name",width:300,sortable:!0,resizable:!0,formatter:b},{key:"playlistMilliseconds",name:"Total length",formatter:function(e){var t,a,n,r,l=e.value,o=parseInt(l);return r=Math.floor(o/1e3),n=Math.floor(r/60),r%=60,a=Math.floor(n/60),n%=60,t=Math.floor(a/24),a%=24,"".concat((a+=24*t)<10?"0"+a:a,":").concat(n<10?"0"+n:n,":").concat(r<10?"0"+r:r)},width:100},{key:"lastUpdated",name:"Last updated",formatter:function(e){var t=e.value,a=Date.now().toString(),n=Math.floor((a-t)/864e5),r=1===n?"day":"days";return"".concat(n," ").concat(r," ago")},width:120,sortable:!0},{key:"albumsString",name:"Albums",resizable:!0,formatter:b}];return r.a.createElement("div",{className:t.root},r.a.createElement(Q.a,{columns:h,rowGetter:function(e){return f[e]},rowsCount:f.length,minHeight:800,minWidth:o,rowSelection:{showCheckbox:!0,enableShiftSelect:!0,onRowsSelected:function(e){for(var t=0;t<e.length;t++){var a=I.selectedPlaylists.slice();a.push(e[t].row.id),I.selectedPlaylists=a}},onRowsDeselected:function(e){for(var t=0;t<e.length;t++)I.selectedPlaylists=I.selectedPlaylists.filter(function(a){return a!==e[t].row.id})},selectBy:{keys:{rowKey:"id",values:I.selectedPlaylists}}},onGridSort:function(e,t){d(function(e,t,a){return function(n){return"NONE"===a?e:Object(Y.a)(n).sort(function(e,n){return"ASC"===a?e[t]>n[t]?1:-1:"DESC"===a?e[t]<n[t]?1:-1:void 0})}}(I.allPlaylists,e,t))}}))}),xe=a(318),we=a(327),Ee=a(316),Oe=a(315),je=Object(k.a)(function(e){return{item:{margin:0,marginRight:2,marginBottom:2}}}),Se=function(e){var t=je();return r.a.createElement("div",null,r.a.createElement(we.a,{open:e.open,onClose:e.onClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(Oe.a,{id:"alert-dialog-title"},"Please do the following in order:"),r.a.createElement(Ee.a,null,r.a.createElement("div",null,r.a.createElement(g.a,{variant:"body1"},"Spotify probably needs to re-authenticate."),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){localStorage.setItem("token",""),I.log("Spotify token has been cleared. Please hit Ctrl+F5 to hard refresh your webpage.","end")},size:"small"},"Click here"),r.a.createElement("br",null),r.a.createElement(g.a,{variant:"body1"},"If the above button not work, let's reset all your data."),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){localStorage.clear(),I.allPlaylists=[],I.log("All playlist data has been cleared. Please hit Ctrl+F5 to hard refresh your webpage.","end")},size:"small"},"Click here"),r.a.createElement("br",null),r.a.createElement(g.a,{variant:"body1"},"If those didn't work, contact Brandon."),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,href:"mailto:cathcart.brandon@gmail.com",size:"small"},"Click here")))))},Ae=Object(k.a)(function(e){return{bg:{background:e.palette.background.paper},root:{display:"flex",flexWrap:"wrap",justifyContent:"flex-start"},item:{margin:0,marginRight:2,marginBottom:2},progressBox:{width:"100%",display:"flex",alignItems:"center"},progress:{flexGrow:"1"}}}),Ce=Object(A.b)(function(e){var t=Ae(),a=Object(n.useState)(""),l=Object(y.a)(a,2),o=l[0],s=l[1],i=Object(n.useState)(!1),c=Object(y.a)(i,2),u=c[0],d=c[1];return r.a.createElement("div",null,r.a.createElement("div",{className:t.root},r.a.createElement("div",{className:t.progressBox},r.a.createElement(xe.a,{variant:"determinate",value:I.progress.percent,color:"secondary",className:t.progress,style:{display:"none"}})),r.a.createElement(g.a,{variant:"body1",style:{flexBasis:"100%",paddingTop:5}},"Add Albums to"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){oe("start")},size:"small"},"start"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){oe("end")},size:"small"},"end"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){oe("start","replace")},size:"small"},"Replace"),r.a.createElement(g.a,{variant:"body1",style:{flexBasis:"100%",paddingTop:5}},"Playlist Actions"),r.a.createElement("div",{style:{textAlign:"left"}},r.a.createElement("input",{id:"new-description",placeholder:"Description",onChange:function(e){s(e.target.value)},style:{width:"120px",padding:5},type:"text"}),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){!function(e){ie.apply(this,arguments)}(o)},size:"small"},"Replace"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){!function(){ce.apply(this,arguments)}()},size:"small"},"refresh albums")),r.a.createElement(g.a,{variant:"body1",style:{flexBasis:"100%",paddingTop:5}},"Utility"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){localStorage.setItem("token",""),I.log("Spotify token has been cleared. Please refresh your webpage.","end")},size:"small"},"Spotify access token"),r.a.createElement(j.a,{variant:"contained",color:"primary",className:t.item,onClick:function(){d(!0)},size:"small"},"I'm getting an error!"),r.a.createElement(Se,{open:u,onClose:function(){d(!1),console.log(u)}})))}),Pe=a(330),Ne=Object(k.a)(function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}),ze=Object(A.b)(function(){var e=Ne();return r.a.createElement(B.a,{component:"ul",className:e.root},I.selectedAlbums.map(function(t,a){return r.a.createElement("li",{key:a},r.a.createElement(q.a,{title:I.allAlbums[t].name,placement:"top"},r.a.createElement(Pe.a,{onClick:(n=t,function(){I.selectedAlbums=I.selectedAlbums.filter(function(e){return e!==n})}),className:e.chip,size:"small",avatar:r.a.createElement(W.a,{src:I.allAlbums[t].images[1].url})})));var n}))}),Ie=Object(A.b)(function(e){return Object(n.useEffect)(function(){I.logArray=[]},[]),r.a.createElement("div",{style:{position:"absolute",right:5,top:3,display:"flex",alignItems:"flex-start",justifyContent:"flex-end",width:"100%",height:"calc(100vh - 60px)",background:"rgba(0,0,0,0.6)",zIndex:1e3,transition:"0.5s",borderRadius:10,overflowY:"scroll"},className:"logger",id:"logger"},r.a.createElement("div",{style:{color:"#ddd",flexGrow:1,paddingTop:15,textAlign:"left",paddingLeft:12}},I.logArray.map(function(e,t){return r.a.createElement(g.a,{component:"p",variant:"body2",id:"last-log",style:{display:"block",color:e.color},key:t},e.text)})))}),Be=Object(k.a)(function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"left",color:e.palette.text.secondary,height:"calc(100vh - 60px)",backgroundColor:"rgba(240,240,240,0.7)"}}}),Te=function(e){var t=e.token,a=Be(),l=Object(n.useState)(""),o=Object(y.a)(l,2),s=o[0],i=o[1];return Object(n.useEffect)(function(){I.selectedPlaylists=[]},[]),r.a.createElement("div",{className:a.root},r.a.createElement("div",{style:{position:"fixed",width:250,top:55,left:5}},r.a.createElement(B.a,{className:a.paper,style:{padding:10}},r.a.createElement(V,{token:t}),r.a.createElement(ze,null),r.a.createElement(Ce,{token:t}))),r.a.createElement("div",{style:{position:"absolute",marginRight:10,left:260,top:55}},r.a.createElement(T.a,{id:"outlined-basic",label:"Search",variant:"outlined",style:{float:"right",background:"rgba(250,250,250,0.7)",marginBottom:10},onChange:function(e){i(e.target.value)},value:s}),r.a.createElement(ke,{token:t,search:s})),r.a.createElement("div",{style:{position:"fixed",height:"100vh",width:250,top:50,right:0}},r.a.createElement(Ie,null)))},Le=Object(k.a)(function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"left",color:e.palette.text.secondary,height:"calc(100vh - 60px)",backgroundColor:"rgba(240,240,240,0.7)"}}}),_e=function(e){e.token;var t=Le(),a=r.a.useState(""),n=Object(y.a)(a,2),l=n[0],o=n[1],s=r.a.useState(""),i=Object(y.a)(s,2),c=i[0],u=i[1],d=r.a.useState(""),m=Object(y.a)(d,2),p=m[0],f=m[1];function g(){return(g=Object(R.a)(_.a.mark(function e(){var t;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("starting"),e.next=3,de(c);case 3:t=e.sent,console.log(t),f(t);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}return r.a.createElement("div",{className:t.root},r.a.createElement("div",{style:{width:"30%",display:"inline-block"}},r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement("div",null,r.a.createElement(B.a,{style:{width:"10%",minWidth:200}},r.a.createElement(T.a,{id:"outlined-multiline-static",label:"Playlists to Follow",multiline:!0,rows:20,defaultValue:"",variant:"outlined",onChange:function(e){o(e.target.value)}})))),r.a.createElement(j.a,{style:{display:"block",marginTop:10},variant:"contained",color:"primary",onClick:function(){!function(e){ue.apply(this,arguments)}(l)},size:"small"},"Follow playlists")),r.a.createElement("div",{style:{width:"50%",display:"inline-block"}},r.a.createElement("form",{noValidate:!0,autoComplete:"off",style:{display:"inline-block"}},r.a.createElement("div",null,r.a.createElement(B.a,{style:{width:"10%",minWidth:200}},r.a.createElement(T.a,{id:"outlined-multiline-static",label:"Get follow stats",multiline:!0,rows:20,defaultValue:"",variant:"outlined",onChange:function(e){u(e.target.value)}})))),r.a.createElement("form",{noValidate:!0,autoComplete:"off",style:{display:"inline-block"}},r.a.createElement("div",null,r.a.createElement(B.a,{style:{width:"10%",minWidth:200}},r.a.createElement(T.a,{id:"follower-results",label:"Results appear here",multiline:!0,rows:20,variant:"outlined",value:p})))),r.a.createElement(j.a,{style:{display:"block",marginTop:10},variant:"contained",color:"primary",onClick:function(){!function(){g.apply(this,arguments)}()},size:"small"},"Get follow counts")),r.a.createElement("div",{style:{position:"fixed",height:"100vh",width:250,top:50,right:0}},r.a.createElement(Ie,null)))};function Re(e){var t=e.children,a=e.value,n=e.index,l=Object(v.a)(e,["children","value","index"]);return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},l),a===n&&r.a.createElement(O.a,{p:3},t))}function De(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var Me=Object(k.a)(function(e){return{root:{flexGrow:1,height:"calc(100vh - 48px)"}}}),Ue=Object(A.b)(function(e){var t=Me(),a=e.token,l=Object(n.useState)(0),o=Object(y.a)(l,2),s=o[0],i=o[1],c=Object(n.useState)(I.tokenms-Date.now()),u=Object(y.a)(c,2),d=u[0],m=u[1],p=Object(S.a)({url:"https://api.spotify.com/v1/me",method:"GET",headers:{Authorization:"Bearer "+a}}),f=Object(y.a)(p,1)[0],b=f.data,h=f.loading,v=f.error;h&&console.log("Loading user..."),b&&(I.name=b.display_name,I.id=b.id),Object(n.useEffect)(function(){var e=setInterval(function(){m(I.tokenms-Date.now()),d<1e3&&e.clear()},6e4)},[]);return""!==I.id?r.a.createElement("div",{className:t.root},r.a.createElement(x.a,{position:"static",style:{width:"100%"}},r.a.createElement(w.a,{value:s,onChange:function(e,t){i(t)},"aria-label":"simple tabs example",style:{width:"75%"}},r.a.createElement(E.a,Object.assign({label:"Playlist Tools"},De(0))),r.a.createElement(E.a,Object.assign({label:"Utilities"},De(1)))),r.a.createElement("div",{style:{position:"absolute",top:10,right:10}},r.a.createElement(g.a,{variant:"h5"},"Spotify access expires in:"," ",Math.ceil(d/1e3/60)," mins"))),r.a.createElement(Re,{value:s,index:0,style:{height:"100%"}},r.a.createElement(Te,{token:a})),r.a.createElement(Re,{value:s,index:1},r.a.createElement(_e,{token:a}))):v?r.a.createElement("div",null,r.a.createElement("p",null,"If you're seeing this, click this button, then refresh the page."),r.a.createElement(j.a,{variant:"contained",color:"primary",onClick:function(){localStorage.setItem("token","")}},"Clear Token")):r.a.createElement("div",null,r.a.createElement("p",null,"Loading..."))});a(269),a(270);function Ge(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(d.a)(e);if(t){var r=Object(d.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(u.a)(this,a)}}var We=Object(p.a)({palette:{primary:{main:"#0a5e54"},secondary:{main:"#ede8e5"}}}),Fe=function(e){Object(c.a)(a,e);var t=Ge(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).state={token:null,item:{album:{images:[{url:""}]},name:"",artists:[{name:""}],duration_ms:0},is_playing:"Paused",progress_ms:0},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=h.access_token||localStorage.getItem("token");h.access_token&&(I.tokenms=Date.now()+18e5),e&&(this.setState({token:e}),localStorage.setItem("token",e),I.token=e)}},{key:"clearLocalStorage",value:function(){localStorage.setItem("token","")}},{key:"render",value:function(){return r.a.createElement(f.a,{theme:We},r.a.createElement("header",null,r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"bg"},!this.state.token&&r.a.createElement("div",{className:"App-header"},r.a.createElement(g.a,{variant:"h1",component:"h1",style:{textShadow:"0px 5px 10px rgba(0,0,0,0.9)"}},"Little Conductor"),r.a.createElement("a",{className:"btn btn--loginApp-link",href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("149f235f7ad941419d900b585b05d9e3","&redirect_uri=").concat("https://brandoshizzle.github.io/Little-Conductor/","&scope=").concat(m.join("%20"),"&response_type=token&show_dialog=true")},"Login to Spotify")))),this.state.token&&r.a.createElement(Ue,{token:this.state.token})))}}]),a}(n.Component);o.a.render(r.a.createElement(Fe,null),document.getElementById("root"))}},[[158,1,2]]]);
//# sourceMappingURL=main.8a1ce945.chunk.js.map