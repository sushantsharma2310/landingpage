!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="83e6dbe7-5583-42bd-bf45-5818189ac3ed",e._sentryDebugIdIdentifier="sentry-dbid-83e6dbe7-5583-42bd-bf45-5818189ac3ed")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[72288],{79501:function(e,t,n){n.d(t,{R:function(){return o}});var r=n(75271),a=n(38699),l=n(89202);function o(e,t,n){let o=(0,l.D)(e=>e.size),i=(0,l.D)(e=>e.viewport),s="number"==typeof e?e:o.width*i.dpr,u="number"==typeof t?t:o.height*i.dpr,{samples:f=0,depth:c,...d}=("number"==typeof e?n:e)||{},p=r.useMemo(()=>{let e=new a.WebGLRenderTarget(s,u,{minFilter:a.LinearFilter,magFilter:a.LinearFilter,type:a.HalfFloatType,...d});return c&&(e.depthTexture=new a.DepthTexture(s,u,a.FloatType)),e.samples=f,e},[]);return r.useLayoutEffect(()=>{p.setSize(s,u),f&&(p.samples=f)},[f,p,s,u]),r.useEffect(()=>()=>p.dispose(),[]),p}},42185:function(e,t,n){n.d(t,{i:function(){return s}});var r=n(13233),a=n(75271),l=n(89202),o=n(79501);let i=e=>"function"==typeof e,s=a.forwardRef(({envMap:e,resolution:t=256,frames:n=1/0,children:s,makeDefault:u,...f},c)=>{let d=(0,l.D)(({set:e})=>e),p=(0,l.D)(({camera:e})=>e),m=(0,l.D)(({size:e})=>e),b=a.useRef(null);a.useImperativeHandle(c,()=>b.current,[]);let g=a.useRef(null),h=(0,o.R)(t);a.useLayoutEffect(()=>{f.manual||b.current.updateProjectionMatrix()},[m,f]),a.useLayoutEffect(()=>{b.current.updateProjectionMatrix()}),a.useLayoutEffect(()=>{if(u)return d(()=>({camera:b.current})),()=>d(()=>({camera:p}))},[b,u,d]);let v=0,x=null,w=i(s);return(0,l.F)(t=>{w&&(n===1/0||v<n)&&(g.current.visible=!1,t.gl.setRenderTarget(h),x=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,b.current),t.scene.background=x,t.gl.setRenderTarget(null),g.current.visible=!0,v++)}),a.createElement(a.Fragment,null,a.createElement("orthographicCamera",(0,r.Z)({left:-(m.width/2),right:m.width/2,top:m.height/2,bottom:-(m.height/2),ref:b},f),!w&&s),a.createElement("group",{ref:g},w&&s(h.texture)))})},49341:function(e,t,n){n.d(t,{A:function(){return o}});var r=n(75271),a=n(89202);let l=(0,r.createContext)(null);function o({iterations:e=10,ms:t=250,threshold:n=.75,step:o=.1,factor:i=.5,flipflops:s=1/0,bounds:u=e=>e>100?[60,100]:[40,60],onIncline:f,onDecline:c,onChange:d,onFallback:p,children:m}){let[b,g]=(0,r.useState)(()=>({fps:0,index:0,factor:i,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:e=>{let t=Symbol();return b.subscriptions.set(t,e.current),()=>void b.subscriptions.delete(t)}})),h=0;return(0,a.F)(()=>{let{frames:r,averages:a}=b;if(!b.fallback&&a.length<e){r.push(performance.now());let l=r[r.length-1]-r[0];if(l>=t){if(b.fps=Math.round(r.length/l*1e3)/1,b.refreshrate=Math.max(b.refreshrate,b.fps),a[b.index++%e]=b.fps,a.length===e){let[t,r]=u(b.refreshrate),l=a.filter(e=>e>=r),i=a.filter(e=>e<t);l.length>e*n&&(b.factor=Math.min(1,b.factor+o),b.flipped++,f&&f(b),b.subscriptions.forEach(e=>e.onIncline&&e.onIncline(b))),i.length>e*n&&(b.factor=Math.max(0,b.factor-o),b.flipped++,c&&c(b),b.subscriptions.forEach(e=>e.onDecline&&e.onDecline(b))),h!==b.factor&&(h=b.factor,d&&d(b),b.subscriptions.forEach(e=>e.onChange&&e.onChange(b))),b.flipped>s&&!b.fallback&&(b.fallback=!0,p&&p(b),b.subscriptions.forEach(e=>e.onFallback&&e.onFallback(b))),b.averages=[]}b.frames=[]}}}),r.createElement(l.Provider,{value:b},m)}},12822:function(e,t,n){let r;n.d(t,{x:function(){return c}});var a=n(52676),l=n(38699),o=n(75271),i=n(89202),s=n(83990);let u=(0,o.createContext)(null),f=e=>(e.getAttributes()&s.VB.CONVOLUTION)===s.VB.CONVOLUTION,c=o.memo((0,o.forwardRef)(({children:e,camera:t,scene:n,resolutionScale:c,enabled:d=!0,renderPriority:p=1,autoClear:m=!0,depthBuffer:b,enableNormalPass:g,stencilBuffer:h,multisampling:v=8,frameBufferType:x=l.HalfFloatType},w)=>{let{gl:y,scene:_,camera:E,size:C}=(0,i.D)(),M=n||_,D=t||E,[R,k,F]=(0,o.useMemo)(()=>{let e=function(){var e;if(void 0!==r)return r;try{let t;let n=document.createElement("canvas");return r=!!(window.WebGL2RenderingContext&&(t=n.getContext("webgl2"))),t&&(null==(e=t.getExtension("WEBGL_lose_context"))||e.loseContext()),r}catch(e){return r=!1}}(),t=new s.xC(y,{depthBuffer:b,stencilBuffer:h,multisampling:v>0&&e?v:0,frameBufferType:x});t.addPass(new s.CD(M,D));let n=null,a=null;return g&&((a=new s.gh(M,D)).enabled=!1,t.addPass(a),void 0!==c&&e&&((n=new s.xs({normalBuffer:a.texture,resolutionScale:c})).enabled=!1,t.addPass(n))),[t,a,n]},[D,y,b,h,v,x,M,g,c]);(0,o.useEffect)(()=>null==R?void 0:R.setSize(C.width,C.height),[R,C]),(0,i.F)((e,t)=>{if(d){let e=y.autoClear;y.autoClear=m,h&&!m&&y.clearStencil(),R.render(t),y.autoClear=e}},d?p:0);let I=(0,o.useRef)(null);(0,o.useLayoutEffect)(()=>{var e;let t=[],n=null==(e=I.current)?void 0:e.__r3f;if(n&&R){let e=n.objects;for(let n=0;n<e.length;n++){let r=e[n];if(r instanceof s.Qm){let a=[r];if(!f(r)){let t=null;for(;(t=e[n+1])instanceof s.Qm&&!f(t);)a.push(t),n++}let l=new s.H5(D,...a);t.push(l)}else r instanceof s.w2&&t.push(r)}for(let e of t)null==R||R.addPass(e);k&&(k.enabled=!0),F&&(F.enabled=!0)}return()=>{for(let e of t)null==R||R.removePass(e);k&&(k.enabled=!1),F&&(F.enabled=!1)}},[R,e,D,k,F]),(0,o.useEffect)(()=>{let e=y.toneMapping;return y.toneMapping=l.NoToneMapping,()=>{y.toneMapping=e}},[y]);let T=(0,o.useMemo)(()=>({composer:R,normalPass:k,downSamplingPass:F,resolutionScale:c,camera:D,scene:M}),[R,k,F,c,D,M]);return(0,o.useImperativeHandle)(w,()=>R,[R]),(0,a.jsx)(u.Provider,{value:T,children:(0,a.jsx)("group",{ref:I,children:e})})}))},24240:function(e,t,n){n.d(t,{d:function(){return a}});var r=n(83990);let a=(0,n(80173).p1)(r.rk,{blendFunction:r.YQ.ADD})},68779:function(e,t,n){n.d(t,{y:function(){return s}});var r=n(38699),a=n(83990),l=n(80173);let o={fragmentShader:`

    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int samples;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);
        float f_samples = float(samples);
        float half_samples = f_samples / 2.0;

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance
        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        vec2 normal = normalize(vec2(startPixel.y - endPixel.y, endPixel.x - startPixel.x));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            if (i >= samples) { break; } // return early if over sample count
            float f_i = float(i);
            float s_i = -half_samples + f_i;
            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);
            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);
            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;
            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `};class i extends a.Qm{constructor({blendFunction:e=a.YQ.NORMAL,blur:t=.15,taper:n=.5,start:l=[.5,0],end:i=[.5,1],samples:s=10,direction:u=[1,1]}={}){super("TiltShiftEffect",o.fragmentShader,{blendFunction:e,attributes:a.VB.CONVOLUTION,uniforms:new Map([["blur",new r.Uniform(t)],["taper",new r.Uniform(n)],["start",new r.Uniform(l)],["end",new r.Uniform(i)],["samples",new r.Uniform(s)],["direction",new r.Uniform(u)]])})}}let s=(0,l.p1)(i,{blendFunction:a.YQ.NORMAL})},80173:function(e,t,n){n.d(t,{p1:function(){return s}});var r=n(52676),a=n(75271),l=n(89202);let o=0,i=new WeakMap,s=(e,t)=>a.forwardRef(function({blendFunction:n=null==t?void 0:t.blendFunction,opacity:s=null==t?void 0:t.opacity,...u},f){let c=i.get(e);if(!c){let t=`@react-three/postprocessing/${e.name}-${o++}`;(0,l.e)({[t]:e}),i.set(e,c=t)}let d=(0,l.D)(e=>e.camera),p=a.useMemo(()=>{var e,n;return[...null!=(e=null==t?void 0:t.args)?e:[],...null!=(n=u.args)?n:[{...t,...u}]]},[JSON.stringify(u)]);return(0,r.jsx)(c,{camera:d,"blendMode-blendFunction":n,"blendMode-opacity-value":s,...u,ref:f,args:p})})}}]);