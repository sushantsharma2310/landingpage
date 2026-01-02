!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="b7080119-3790-4a38-986c-ca7985d6c3b7",e._sentryDebugIdIdentifier="sentry-dbid-b7080119-3790-4a38-986c-ca7985d6c3b7")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88178,73091,33324,43818,6252,77712],{79501:function(e,t,r){r.d(t,{R:function(){return i}});var a=r(75271),n=r(38699),o=r(89202);function i(e,t,r){let i=(0,o.D)(e=>e.size),s=(0,o.D)(e=>e.viewport),l="number"==typeof e?e:i.width*s.dpr,c="number"==typeof t?t:i.height*s.dpr,{samples:u=0,depth:m,...f}=("number"==typeof e?r:e)||{},d=a.useMemo(()=>{let e=new n.WebGLRenderTarget(l,c,{minFilter:n.LinearFilter,magFilter:n.LinearFilter,type:n.HalfFloatType,...f});return m&&(e.depthTexture=new n.DepthTexture(l,c,n.FloatType)),e.samples=u,e},[]);return a.useLayoutEffect(()=>{d.setSize(l,c),u&&(d.samples=u)},[u,d,l,c]),a.useEffect(()=>()=>d.dispose(),[]),d}},82745:function(e,t,r){r.d(t,{D:function(){return s}});var a=r(13233),n=r(89202),o=r(75271),i=r(38699);let s=o.forwardRef(({light:e,args:t,map:r,toneMapped:s=!1,color:l="white",form:c="rect",intensity:u=1,scale:m=1,target:f=[0,0,0],children:d,...v},p)=>{let h=o.useRef(null);return o.useImperativeHandle(p,()=>h.current,[]),o.useLayoutEffect(()=>{d||v.material||((0,n.k)(h.current.material,{color:l}),h.current.material.color.multiplyScalar(u))},[l,u,d,v.material]),o.useLayoutEffect(()=>{v.rotation||h.current.quaternion.identity(),f&&!v.rotation&&("boolean"==typeof f?h.current.lookAt(0,0,0):h.current.lookAt(Array.isArray(f)?new i.Vector3(...f):f))},[f,v.rotation]),m=Array.isArray(m)&&2===m.length?[m[0],m[1],1]:m,o.createElement("mesh",(0,a.Z)({ref:h,scale:m},v),"circle"===c?o.createElement("ringGeometry",{args:t||[0,.5,64]}):"ring"===c?o.createElement("ringGeometry",{args:t||[.25,.5,64]}):"rect"===c||"plane"===c?o.createElement("planeGeometry",{args:t||[1,1]}):"box"===c?o.createElement("boxGeometry",{args:t||[1,1,1]}):o.createElement(c,{args:t}),d||o.createElement("meshBasicMaterial",{toneMapped:s,map:r,side:i.DoubleSide}),e&&o.createElement("pointLight",(0,a.Z)({castShadow:!0},e)))})},39526:function(e,t,r){r.d(t,{Y:function(){return l}});var a=r(13233),n=r(75271),o=r(38699),i=r(89202);class s extends o.MeshPhysicalMaterial{constructor(e={}){super(e),this.setValues(e),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(e){e.uniforms.time=this._time,e.uniforms.radius=this._radius,e.uniforms.distort=this._distort,e.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      #define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
      ${e.vertexShader}
    `,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(e){this._time.value=e}get distort(){return this._distort.value}set distort(e){this._distort.value=e}get radius(){return this._radius.value}set radius(e){this._radius.value=e}}let l=n.forwardRef(({speed:e=1,...t},r)=>{let[o]=n.useState(()=>new s);return(0,i.F)(t=>o&&(o.time=t.clock.elapsedTime*e)),n.createElement("primitive",(0,a.Z)({object:o,ref:r,attach:"material"},t))})},14879:function(e,t,r){r.d(t,{z:function(){return u}});var a=r(13233),n=r(38699),o=r(75271),i=r(89202),s=r(79501);let l=(0,r(28167).g)({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class c extends n.MeshPhysicalMaterial{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new n.Color("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=r=>{r.uniforms={...r.uniforms,...this.uniforms},this.anisotropy>0&&(r.defines.USE_ANISOTROPY=""),t?r.defines.USE_SAMPLER="":r.defines.USE_TRANSMISSION="",r.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),r.fragmentShader=r.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})) , material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})), material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${e}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(e=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t}))}}let u=o.forwardRef(({buffer:e,transmissionSampler:t=!1,backside:r=!1,side:u=n.FrontSide,transmission:m=1,thickness:f=0,backsideThickness:d=0,backsideEnvMapIntensity:v=1,samples:p=10,resolution:h,backsideResolution:x,background:y,anisotropy:g,anisotropicBlur:b,...S},w)=>{let C,M,k,_;(0,i.e)({MeshTransmissionMaterial:c});let z=o.useRef(null),[D]=o.useState(()=>new l),E=(0,s.R)(x||h),F=(0,s.R)(h);return(0,i.F)(e=>{z.current.time=e.clock.elapsedTime,z.current.buffer===F.texture&&!t&&(_=z.current.__r3f.parent)&&(k=e.gl.toneMapping,C=e.scene.background,M=z.current.envMapIntensity,e.gl.toneMapping=n.NoToneMapping,y&&(e.scene.background=y),_.material=D,r&&(e.gl.setRenderTarget(E),e.gl.render(e.scene,e.camera),_.material=z.current,_.material.buffer=E.texture,_.material.thickness=d,_.material.side=n.BackSide,_.material.envMapIntensity=v),e.gl.setRenderTarget(F),e.gl.render(e.scene,e.camera),_.material=z.current,_.material.thickness=f,_.material.side=u,_.material.buffer=F.texture,_.material.envMapIntensity=M,e.scene.background=C,e.gl.setRenderTarget(null),e.gl.toneMapping=k)}),o.useImperativeHandle(w,()=>z.current,[]),o.createElement("meshTransmissionMaterial",(0,a.Z)({args:[p,t],ref:z},S,{buffer:e||F.texture,_transmission:m,anisotropicBlur:null!=b?b:g,transmission:t?m:0,thickness:f,side:u}))})},49341:function(e,t,r){r.d(t,{A:function(){return i}});var a=r(75271),n=r(89202);let o=(0,a.createContext)(null);function i({iterations:e=10,ms:t=250,threshold:r=.75,step:i=.1,factor:s=.5,flipflops:l=1/0,bounds:c=e=>e>100?[60,100]:[40,60],onIncline:u,onDecline:m,onChange:f,onFallback:d,children:v}){let[p,h]=(0,a.useState)(()=>({fps:0,index:0,factor:s,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:e=>{let t=Symbol();return p.subscriptions.set(t,e.current),()=>void p.subscriptions.delete(t)}})),x=0;return(0,n.F)(()=>{let{frames:a,averages:n}=p;if(!p.fallback&&n.length<e){a.push(performance.now());let o=a[a.length-1]-a[0];if(o>=t){if(p.fps=Math.round(a.length/o*1e3)/1,p.refreshrate=Math.max(p.refreshrate,p.fps),n[p.index++%e]=p.fps,n.length===e){let[t,a]=c(p.refreshrate),o=n.filter(e=>e>=a),s=n.filter(e=>e<t);o.length>e*r&&(p.factor=Math.min(1,p.factor+i),p.flipped++,u&&u(p),p.subscriptions.forEach(e=>e.onIncline&&e.onIncline(p))),s.length>e*r&&(p.factor=Math.max(0,p.factor-i),p.flipped++,m&&m(p),p.subscriptions.forEach(e=>e.onDecline&&e.onDecline(p))),x!==p.factor&&(x=p.factor,f&&f(p),p.subscriptions.forEach(e=>e.onChange&&e.onChange(p))),p.flipped>l&&!p.fallback&&(p.fallback=!0,d&&d(p),p.subscriptions.forEach(e=>e.onFallback&&e.onFallback(p))),p.averages=[]}p.frames=[]}}}),a.createElement(o.Provider,{value:p},v)}},73091:function(e,t,r){r.r(t),r.d(t,{__iconNode:function(){return n},default:function(){return o}});var a=r(28893);let n=[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]],o=(0,a.Z)("Gauge",n)},33324:function(e,t,r){r.r(t),r.d(t,{__iconNode:function(){return n},default:function(){return o}});var a=r(28893);let n=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],o=(0,a.Z)("Key",n)},43818:function(e,t,r){r.r(t),r.d(t,{__iconNode:function(){return n},default:function(){return o}});var a=r(28893);let n=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],o=(0,a.Z)("Lock",n)},6252:function(e,t,r){r.r(t),r.d(t,{__iconNode:function(){return n},default:function(){return o}});var a=r(28893);let n=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],o=(0,a.Z)("ShieldCheck",n)},77712:function(e,t,r){r.r(t),r.d(t,{__iconNode:function(){return n},default:function(){return o}});var a=r(28893);let n=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],o=(0,a.Z)("Terminal",n)}}]);