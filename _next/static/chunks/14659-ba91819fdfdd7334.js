!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r=(new e.Error).stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="a5e8f215-1270-41ca-970a-713dea16681a",e._sentryDebugIdIdentifier="sentry-dbid-a5e8f215-1270-41ca-970a-713dea16681a")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[14659,8147,40010],{17272:function(e,r,t){t.d(r,{J:function(){return x}});var a=t(13233),n=t(38699),i=t(75271),l=t(89202),o=t(79501);let u=i.forwardRef(({children:e,compute:r,width:t,height:u,samples:v=8,renderPriority:d=0,eventPriority:m=0,frames:c=1/0,stencilBuffer:f=!1,depthBuffer:g=!0,generateMipmaps:p=!1,...x},y)=>{let{size:h,viewport:b}=(0,l.D)(),w=(0,o.R)((t||h.width)*b.dpr,(u||h.height)*b.dpr,{samples:v,stencilBuffer:f,depthBuffer:g,generateMipmaps:p}),[F]=i.useState(()=>new n.Scene),R=i.useCallback((e,r,t)=>{var a,i;let l=null==(a=w.texture)?void 0:a.__r3f.parent;for(;l&&!(l instanceof n.Object3D);)l=l.__r3f.parent;if(!l)return!1;t.raycaster.camera||t.events.compute(e,t,null==(i=t.previousRoot)?void 0:i.getState());let[o]=t.raycaster.intersectObject(l);if(!o)return!1;let u=o.uv;if(!u)return!1;r.raycaster.setFromCamera(r.pointer.set(2*u.x-1,2*u.y-1),r.camera)},[]);return i.useImperativeHandle(y,()=>w.texture,[w]),i.createElement(i.Fragment,null,(0,l.h)(i.createElement(s,{renderPriority:d,frames:c,fbo:w},e,i.createElement("group",{onPointerOver:()=>null})),F,{events:{compute:r||R,priority:m}}),i.createElement("primitive",(0,a.Z)({object:w.texture},x)))});function s({frames:e,renderPriority:r,children:t,fbo:a}){let n,o,u,s,v=0;return(0,l.F)(r=>{(e===1/0||v<e)&&(n=r.gl.autoClear,o=r.gl.xr.enabled,u=r.gl.getRenderTarget(),s=r.gl.xr.isPresenting,r.gl.autoClear=!0,r.gl.xr.enabled=!1,r.gl.xr.isPresenting=!1,r.gl.setRenderTarget(a),r.gl.render(r.scene,r.camera),r.gl.setRenderTarget(u),r.gl.autoClear=n,r.gl.xr.enabled=o,r.gl.xr.isPresenting=s,v++)},r),i.createElement(i.Fragment,null,t)}var v=t(28167),d=Object.defineProperty,m=(e,r,t)=>r in e?d(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,c=(e,r,t)=>(m(e,"symbol"!=typeof r?r+"":r,t),t);class f{constructor(e){c(this,"camera",new n.OrthographicCamera(-1,1,1,-1,0,1)),c(this,"geometry",new n.PlaneGeometry(2,2)),c(this,"mesh"),this.mesh=new n.Mesh(this.geometry,e)}get material(){return this.mesh.material}set material(e){this.mesh.material=e}dispose(){this.mesh.geometry.dispose()}render(e){e.render(this.mesh,this.camera)}}var g=t(12350);let p=(0,v.g)({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new n.Vector2},`varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
   }`,`uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${g.i>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),x=i.forwardRef(({children:e,events:r,blur:t=0,eventPriority:s=0,renderPriority:v=0,worldUnits:d=!1,resolution:m=512,...c},f)=>{(0,l.e)({PortalMaterialImpl:p});let g=i.useRef(null),{scene:x,gl:b,size:w,viewport:F,setEvents:R}=(0,l.D)(),M=(0,o.R)(m,m),[k,_]=i.useState(0);(0,l.F)(()=>{let e=g.current.blend>0?Math.max(1,v):0;k!==e&&_(e)}),i.useEffect(()=>{void 0!==r&&R({enabled:!r})},[r]);let[U,D]=i.useState(!0),T=function(e){let r=i.useRef(null),t=i.useRef(!1),a=i.useRef(!1),n=i.useRef(e);return i.useLayoutEffect(()=>void(n.current=e),[e]),i.useEffect(()=>{let e=r.current;if(e){let r=(0,l.o)(()=>(t.current=!1,!0)),i=e.onBeforeRender;e.onBeforeRender=()=>t.current=!0;let o=(0,l.p)(()=>(t.current!==a.current&&(null==n.current||n.current(a.current=t.current)),!0));return()=>{e.onBeforeRender=i,r(),o()}}},[]),r}(D);i.useLayoutEffect(()=>{var e;T.current=null==(e=g.current)?void 0:e.__r3f.parent},[]),i.useLayoutEffect(()=>{if(T.current&&t&&null===g.current.sdf){let e=new n.Mesh(T.current.geometry,new n.MeshBasicMaterial),r=new n.Box3().setFromBufferAttribute(e.geometry.attributes.position),t=new n.OrthographicCamera(r.min.x*(1+2/m),r.max.x*(1+2/m),r.max.y*(1+2/m),r.min.y*(1+2/m),.1,1e3);t.position.set(0,0,1),t.lookAt(0,0,0),b.setRenderTarget(M),b.render(e,t);let a=h(m,m,b)(M.texture),i=new Float32Array(m*m);b.readRenderTargetPixels(a,0,0,m,m,i);let l=1/0;for(let e=0;e<i.length;e++)i[e]<l&&(l=i[e]);l=-l,g.current.size=l,g.current.sdf=a.texture,b.setRenderTarget(null)}},[m,t]),i.useImperativeHandle(f,()=>g.current);let S=i.useCallback((e,r,t)=>{var a;if(!T.current)return!1;if(r.pointer.set(e.offsetX/r.size.width*2-1,-(e.offsetY/r.size.height*2)+1),r.raycaster.setFromCamera(r.pointer,r.camera),(null==(a=g.current)?void 0:a.blend)===0){let[e]=r.raycaster.intersectObject(T.current);if(!e)return r.raycaster.camera=void 0,!1}},[]);return i.createElement("portalMaterialImpl",(0,a.Z)({ref:g,blur:t,blend:0,resolution:[w.width*F.dpr,w.height*F.dpr],attach:"material"},c),i.createElement(u,{attach:"map",frames:U?1/0:0,eventPriority:s,renderPriority:v,compute:S},e,i.createElement(y,{events:r,rootScene:x,priority:k,material:g,worldUnits:d})))});function y({events:e,rootScene:r,material:t,priority:a,worldUnits:u}){let s=(0,l.D)(e=>e.scene),v=(0,l.D)(e=>e.setEvents),d=(0,o.R)(),m=(0,o.R)();i.useLayoutEffect(()=>{s.matrixAutoUpdate=!1},[]),i.useEffect(()=>{void 0!==e&&v({enabled:e})},[e]);let[c,p]=i.useMemo(()=>{let e={value:0};return[new f(new n.ShaderMaterial({uniforms:{a:{value:d.texture},b:{value:m.texture},blend:e},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,fragmentShader:`
          uniform sampler2D a;
          uniform sampler2D b;
          uniform float blend;
          varying vec2 vUv;
          #include <packing>
          void main() {
            vec4 ta = texture2D(a, vUv);
            vec4 tb = texture2D(b, vUv);
            gl_FragColor = mix(tb, ta, blend);
            #include <tonemapping_fragment>
            #include <${g.i>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),e]},[]);return(0,l.F)(e=>{var n,i,l,o,v;let f=null==t||null==(n=t.current)?void 0:n.__r3f.parent;f&&(u?s.matrixWorld.identity():(a&&(null==(i=t.current)?void 0:i.blend)===1&&f.updateWorldMatrix(!0,!1),s.matrixWorld.copy(f.matrixWorld)),a&&((null==(l=t.current)?void 0:l.blend)>0&&(null==(o=t.current)?void 0:o.blend)<1?(p.value=t.current.blend,e.gl.setRenderTarget(d),e.gl.render(s,e.camera),e.gl.setRenderTarget(m),e.gl.render(r,e.camera),e.gl.setRenderTarget(null),c.render(e.gl)):(null==(v=t.current)?void 0:v.blend)===1&&e.gl.render(s,e.camera)))},a),i.createElement(i.Fragment,null)}let h=(e,r,t)=>{let a=new n.WebGLRenderTarget(e,r,{minFilter:n.LinearMipmapLinearFilter,magFilter:n.LinearFilter,type:n.FloatType,format:n.RedFormat,generateMipmaps:!0}),i=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter}),l=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter}),o=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter}),u=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter}),s=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter,type:n.FloatType,format:n.RedFormat}),v=new n.WebGLRenderTarget(e,r,{minFilter:n.NearestFilter,magFilter:n.NearestFilter,type:n.FloatType,format:n.RedFormat}),d=new f(new n.ShaderMaterial({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (round(texture2D(tex, vUv).x)));
        }`})),m=new f(new n.ShaderMaterial({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (1.0 - round(texture2D(tex, vUv).x)));
        }`})),c=new f(new n.ShaderMaterial({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform float offset;
        uniform float level;
        uniform float maxSteps;
        #include <packing>
        void main() {
          float closestDist = 9999999.9;
          vec2 closestPos = vec2(0.0);
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 voffset = vUv;
              voffset += vec2(x, y) * vec2(${1/e}, ${1/r}) * offset;
              vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
              float dist = distance(pos.xy, vUv);
              if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
                closestDist = dist;
                closestPos = pos;
              }
            }
          }
          gl_FragColor = pack2HalfToRGBA(closestPos);
        }`})),g=new f(new n.ShaderMaterial({uniforms:{tex:{value:null},size:{value:new n.Vector2(e,r)}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform vec2 size;
        #include <packing>
        void main() {
          gl_FragColor = vec4(distance(size * unpackRGBATo2Half(texture2D(tex, vUv)), size * vUv), 0.0, 0.0, 0.0);
        }`})),p=new f(new n.ShaderMaterial({uniforms:{inside:{value:v.texture},outside:{value:s.texture},tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D inside;
        uniform sampler2D outside;
        uniform sampler2D tex;
        #include <packing>
        void main() {
          float i = texture2D(inside, vUv).x;
          float o =texture2D(outside, vUv).x;
          if (texture2D(tex, vUv).x == 0.0) {
            gl_FragColor = vec4(o, 0.0, 0.0, 0.0);
          } else {
            gl_FragColor = vec4(-i, 0.0, 0.0, 0.0);
          }
        }`}));return f=>{f.minFilter=n.NearestFilter,f.magFilter=n.NearestFilter,d.material.uniforms.tex.value=f,t.setRenderTarget(i),d.render(t);let x=Math.ceil(Math.log(Math.max(e,r))/Math.log(2)),y=i,h=null;for(let e=0;e<x;e++){let r=Math.pow(2,x-e-1);h=y===i?o:i,c.material.uniforms.level.value=e,c.material.uniforms.maxSteps.value=x,c.material.uniforms.offset.value=r,c.material.uniforms.tex.value=y.texture,t.setRenderTarget(h),c.render(t),y=h}t.setRenderTarget(s),g.material.uniforms.tex.value=h.texture,g.render(t),m.material.uniforms.tex.value=f,t.setRenderTarget(l),m.render(t),y=l;for(let e=0;e<x;e++){let r=Math.pow(2,x-e-1);h=y===l?u:l,c.material.uniforms.level.value=e,c.material.uniforms.maxSteps.value=x,c.material.uniforms.offset.value=r,c.material.uniforms.tex.value=y.texture,t.setRenderTarget(h),c.render(t),y=h}return t.setRenderTarget(v),g.material.uniforms.tex.value=h.texture,g.render(t),t.setRenderTarget(a),p.material.uniforms.tex.value=f,p.render(t),t.setRenderTarget(null),a}}},8147:function(e,r,t){t.r(r),t.d(r,{__iconNode:function(){return n},default:function(){return i}});var a=t(28893);let n=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",key:"lc1i9w"}],["path",{d:"m7 16.5-4.74-2.85",key:"1o9zyk"}],["path",{d:"m7 16.5 5-3",key:"va8pkn"}],["path",{d:"M7 16.5v5.17",key:"jnp8gn"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",key:"8zsnat"}],["path",{d:"m17 16.5-5-3",key:"8arw3v"}],["path",{d:"m17 16.5 4.74-2.85",key:"8rfmw"}],["path",{d:"M17 16.5v5.17",key:"k6z78m"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",key:"1xygjf"}],["path",{d:"M12 8 7.26 5.15",key:"1vbdud"}],["path",{d:"m12 8 4.74-2.85",key:"3rx089"}],["path",{d:"M12 13.5V8",key:"1io7kd"}]],i=(0,a.Z)("Boxes",n)},40010:function(e,r,t){t.r(r),t.d(r,{__iconNode:function(){return n},default:function(){return i}});var a=t(28893);let n=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]],i=(0,a.Z)("UserCheck",n)}}]);