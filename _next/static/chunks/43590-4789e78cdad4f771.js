!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="38d47c60-4082-4815-b00e-db26a15d9ca8",e._sentryDebugIdIdentifier="sentry-dbid-38d47c60-4082-4815-b00e-db26a15d9ca8")}catch(e){}}(),(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[43590],{80056:function(e,t,n){"use strict";n.d(t,{w:function(){return l}});var r=n(13233),i=n(75271),o=n(38699),a=n(56146);let l=i.forwardRef(({threshold:e=15,geometry:t,...n},l)=>{let s=i.useRef(null);i.useImperativeHandle(l,()=>s.current,[]);let c=i.useMemo(()=>[0,0,0,1,0,0],[]),u=i.useRef(),d=i.useRef();return i.useLayoutEffect(()=>{let n=s.current.parent,r=null!=t?t:null==n?void 0:n.geometry;if(!r||u.current===r&&d.current===e)return;u.current=r,d.current=e;let i=new o.EdgesGeometry(r,e).attributes.position.array;s.current.geometry.setPositions(i),s.current.geometry.attributes.instanceStart.needsUpdate=!0,s.current.geometry.attributes.instanceEnd.needsUpdate=!0,s.current.computeLineDistances()}),i.createElement(a.x,(0,r.Z)({segments:!0,points:c,ref:s,raycast:()=>null},n))})},56146:function(e,t,n){"use strict";let r,i;n.d(t,{x:function(){return $}});var o=n(13233),a=n(75271),l=n(38699),s=n(89202);let c=new l.Box3,u=new l.Vector3;class d extends l.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new l.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new l.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new l.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new l.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new l.InterleavedBufferAttribute(r,t,0)),this.setAttribute("instanceColorEnd",new l.InterleavedBufferAttribute(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,o=e.count;i<o;i++)u.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(u)),u.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(u));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=n(72616);class p extends l.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:l.UniformsUtils.clone(l.UniformsUtils.merge([l.UniformsLib.common,l.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new l.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${f.i>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let h=f.i>=125?"uv1":"uv2",m=new l.Vector4,g=new l.Vector3,v=new l.Vector3,y=new l.Vector4,x=new l.Vector4,b=new l.Vector4,_=new l.Vector3,w=new l.Matrix4,E=new l.Line3,S=new l.Vector3,P=new l.Box3,M=new l.Sphere,C=new l.Vector4;function T(e,t,n){return C.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),C.multiplyScalar(1/C.w),C.x=i/n.width,C.y=i/n.height,C.applyMatrix4(e.projectionMatrixInverse),C.multiplyScalar(1/C.w),Math.abs(Math.max(C.x,C.y))}class z extends l.Mesh{constructor(e=new d,t=new p({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,o=t.count;e<o;e++,i+=2)g.fromBufferAttribute(t,e),v.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+g.distanceTo(v);let i=new l.InstancedInterleavedBuffer(r,2,1);return e.setAttribute("instanceDistanceStart",new l.InterleavedBufferAttribute(i,1,0)),e.setAttribute("instanceDistanceEnd",new l.InterleavedBufferAttribute(i,1,1)),this}raycast(e,t){let n,o;let a=this.material.worldUnits,s=e.camera;null!==s||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;r=e.ray;let u=this.matrixWorld,d=this.geometry,f=this.material;if(i=f.linewidth+c,null===d.boundingSphere&&d.computeBoundingSphere(),M.copy(d.boundingSphere).applyMatrix4(u),a)n=.5*i;else{let e=Math.max(s.near,M.distanceToPoint(r.origin));n=T(s,e,f.resolution)}if(M.radius+=n,!1!==r.intersectsSphere(M)){if(null===d.boundingBox&&d.computeBoundingBox(),P.copy(d.boundingBox).applyMatrix4(u),a)o=.5*i;else{let e=Math.max(s.near,P.distanceToPoint(r.origin));o=T(s,e,f.resolution)}P.expandByScalar(o),!1!==r.intersectsBox(P)&&(a?function(e,t){let n=e.matrixWorld,o=e.geometry,a=o.attributes.instanceStart,s=o.attributes.instanceEnd,c=Math.min(o.instanceCount,a.count);for(let o=0;o<c;o++){E.start.fromBufferAttribute(a,o),E.end.fromBufferAttribute(s,o),E.applyMatrix4(n);let c=new l.Vector3,u=new l.Vector3;r.distanceSqToSegment(E.start,E.end,u,c),u.distanceTo(c)<.5*i&&t.push({point:u,pointOnLine:c,distance:r.origin.distanceTo(u),object:e,face:null,faceIndex:o,uv:null,[h]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,a=e.material.resolution,s=e.matrixWorld,c=e.geometry,u=c.attributes.instanceStart,d=c.attributes.instanceEnd,f=Math.min(c.instanceCount,u.count),p=-t.near;r.at(1,b),b.w=1,b.applyMatrix4(t.matrixWorldInverse),b.applyMatrix4(o),b.multiplyScalar(1/b.w),b.x*=a.x/2,b.y*=a.y/2,b.z=0,_.copy(b),w.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<f;t++){if(y.fromBufferAttribute(u,t),x.fromBufferAttribute(d,t),y.w=1,x.w=1,y.applyMatrix4(w),x.applyMatrix4(w),y.z>p&&x.z>p)continue;if(y.z>p){let e=y.z-x.z,t=(y.z-p)/e;y.lerp(x,t)}else if(x.z>p){let e=x.z-y.z,t=(x.z-p)/e;x.lerp(y,t)}y.applyMatrix4(o),x.applyMatrix4(o),y.multiplyScalar(1/y.w),x.multiplyScalar(1/x.w),y.x*=a.x/2,y.y*=a.y/2,x.x*=a.x/2,x.y*=a.y/2,E.start.copy(y),E.start.z=0,E.end.copy(x),E.end.z=0;let c=E.closestPointToPointParameter(_,!0);E.at(c,S);let f=l.MathUtils.lerp(y.z,x.z,c),m=f>=-1&&f<=1,g=_.distanceTo(S)<.5*i;if(m&&g){E.start.fromBufferAttribute(u,t),E.end.fromBufferAttribute(d,t),E.start.applyMatrix4(s),E.end.applyMatrix4(s);let i=new l.Vector3,o=new l.Vector3;r.distanceSqToSegment(E.start,E.end,o,i),n.push({point:o,pointOnLine:i,distance:r.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[h]:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(m),this.material.uniforms.resolution.value.set(m.z,m.w))}}class A extends d{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(3===t)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class O extends z{constructor(e=new A,t=new p({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let $=a.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:i,segments:c,dashed:u,...f},h){var m,g;let v=(0,s.D)(e=>e.size),y=a.useMemo(()=>c?new z:new O,[c]),[x]=a.useState(()=>new p),b=(null==n||null==(m=n[0])?void 0:m.length)===4?4:3,_=a.useMemo(()=>{let r=c?new d:new A,i=e.map(e=>{let t=Array.isArray(e);return e instanceof l.Vector3||e instanceof l.Vector4?[e.x,e.y,e.z]:e instanceof l.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=16777215;let e=n.map(e=>e instanceof l.Color?e.toArray():e);r.setColors(e.flat(),b)}return r},[e,c,n,b]);return a.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),a.useLayoutEffect(()=>{u?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[u,x]),a.useEffect(()=>()=>{_.dispose(),x.dispose()},[_]),a.createElement("primitive",(0,o.Z)({object:y,ref:h},f),a.createElement("primitive",{object:_,attach:"geometry"}),a.createElement("primitive",(0,o.Z)({object:x,attach:"material",color:t,vertexColors:!!n,resolution:[v.width,v.height],linewidth:null!==(g=null!=r?r:i)&&void 0!==g?g:1,dashed:u,transparent:4===b},f)))})},59220:function(e,t,n){"use strict";n.d(t,{z:function(){return x}});var r=n(13233),i=n(89202),o=n(75271),a=n(38699),l=Object.defineProperty,s=(e,t,n)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t,n)=>(s(e,"symbol"!=typeof t?t+"":t,n),n);class u{constructor(){c(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}}var d=Object.defineProperty,f=(e,t,n)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t,n)=>(f(e,"symbol"!=typeof t?t+"":t,n),n);let h=new a.Ray,m=new a.Plane,g=Math.cos(Math.PI/180*70),v=(e,t)=>(e%t+t)%t;class y extends u{constructor(e,t){super(),p(this,"object"),p(this,"domElement"),p(this,"enabled",!0),p(this,"target",new a.Vector3),p(this,"minDistance",0),p(this,"maxDistance",1/0),p(this,"minZoom",0),p(this,"maxZoom",1/0),p(this,"minPolarAngle",0),p(this,"maxPolarAngle",Math.PI),p(this,"minAzimuthAngle",-1/0),p(this,"maxAzimuthAngle",1/0),p(this,"enableDamping",!1),p(this,"dampingFactor",.05),p(this,"enableZoom",!0),p(this,"zoomSpeed",1),p(this,"enableRotate",!0),p(this,"rotateSpeed",1),p(this,"enablePan",!0),p(this,"panSpeed",1),p(this,"screenSpacePanning",!0),p(this,"keyPanSpeed",7),p(this,"zoomToCursor",!1),p(this,"autoRotate",!1),p(this,"autoRotateSpeed",2),p(this,"reverseOrbit",!1),p(this,"reverseHorizontalOrbit",!1),p(this,"reverseVerticalOrbit",!1),p(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),p(this,"mouseButtons",{LEFT:a.MOUSE.ROTATE,MIDDLE:a.MOUSE.DOLLY,RIGHT:a.MOUSE.PAN}),p(this,"touches",{ONE:a.TOUCH.ROTATE,TWO:a.TOUCH.DOLLY_PAN}),p(this,"target0"),p(this,"position0"),p(this,"zoom0"),p(this,"_domElementKeyEvents",null),p(this,"getPolarAngle"),p(this,"getAzimuthalAngle"),p(this,"setPolarAngle"),p(this,"setAzimuthalAngle"),p(this,"getDistance"),p(this,"getZoomScale"),p(this,"listenToKeyEvents"),p(this,"stopListenToKeyEvents"),p(this,"saveState"),p(this,"reset"),p(this,"update"),p(this,"connect"),p(this,"dispose"),p(this,"dollyIn"),p(this,"dollyOut"),p(this,"getScale"),p(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=e=>{let t=v(e,2*Math.PI),r=u.phi;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),d.phi=t-r,n.update()},this.setAzimuthalAngle=e=>{let t=v(e,2*Math.PI),r=u.theta;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),d.theta=t-r,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(r),n.update(),s=l.NONE},this.update=(()=>{let t=new a.Vector3,i=new a.Vector3(0,1,0),o=new a.Quaternion().setFromUnitVectors(e.up,i),p=o.clone().invert(),v=new a.Vector3,x=new a.Quaternion,b=2*Math.PI;return function(){let _=n.object.position;o.setFromUnitVectors(e.up,i),p.copy(o).invert(),t.copy(_).sub(n.target),t.applyQuaternion(o),u.setFromVector3(t),n.autoRotate&&s===l.NONE&&R(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(u.theta+=d.theta*n.dampingFactor,u.phi+=d.phi*n.dampingFactor):(u.theta+=d.theta,u.phi+=d.phi);let w=n.minAzimuthAngle,E=n.maxAzimuthAngle;isFinite(w)&&isFinite(E)&&(w<-Math.PI?w+=b:w>Math.PI&&(w-=b),E<-Math.PI?E+=b:E>Math.PI&&(E-=b),w<=E?u.theta=Math.max(w,Math.min(E,u.theta)):u.theta=u.theta>(w+E)/2?Math.max(w,u.theta):Math.min(E,u.theta)),u.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,u.phi)),u.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(y,n.dampingFactor):n.target.add(y),n.zoomToCursor&&A||n.object.isOrthographicCamera?u.radius=B(u.radius):u.radius=B(u.radius*f),t.setFromSpherical(u),t.applyQuaternion(p),_.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(d.theta*=1-n.dampingFactor,d.phi*=1-n.dampingFactor,y.multiplyScalar(1-n.dampingFactor)):(d.set(0,0,0),y.set(0,0,0));let S=!1;if(n.zoomToCursor&&A){let r=null;if(n.object instanceof a.PerspectiveCamera&&n.object.isPerspectiveCamera){let e=t.length();r=B(e*f);let i=e-r;n.object.position.addScaledVector(T,i),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new a.Vector3(z.x,z.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),S=!0;let i=new a.Vector3(z.x,z.y,0);i.unproject(n.object),n.object.position.sub(i).add(e),n.object.updateMatrixWorld(),r=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==r&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position):(h.origin.copy(n.object.position),h.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(h.direction))<g?e.lookAt(n.target):(m.setFromNormalAndCoplanarPoint(n.object.up,n.target),h.intersectPlane(m,n.target))))}else n.object instanceof a.OrthographicCamera&&n.object.isOrthographicCamera&&(S=1!==f)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix());return f=1,A=!1,!!(S||v.distanceToSquared(n.object.position)>c||8*(1-x.dot(n.object.quaternion))>c)&&(n.dispatchEvent(r),v.copy(n.object.position),x.copy(n.object.quaternion),S=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",Z),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",Q)},this.dispose=()=>{var e,t,r,i,o,a;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",Z),null==(r=n.domElement)||r.removeEventListener("pointercancel",J),null==(i=n.domElement)||i.removeEventListener("wheel",Q),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointermove",X),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointerup",J),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};let n=this,r={type:"change"},i={type:"start"},o={type:"end"},l={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=l.NONE,c=1e-6,u=new a.Spherical,d=new a.Spherical,f=1,y=new a.Vector3,x=new a.Vector2,b=new a.Vector2,_=new a.Vector2,w=new a.Vector2,E=new a.Vector2,S=new a.Vector2,P=new a.Vector2,M=new a.Vector2,C=new a.Vector2,T=new a.Vector3,z=new a.Vector2,A=!1,O=[],$={};function k(){return Math.pow(.95,n.zoomSpeed)}function R(e){n.reverseOrbit||n.reverseHorizontalOrbit?d.theta+=e:d.theta-=e}function I(e){n.reverseOrbit||n.reverseVerticalOrbit?d.phi+=e:d.phi-=e}let L=(()=>{let e=new a.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),y.add(e)}})(),D=(()=>{let e=new a.Vector3;return function(t,r){!0===n.screenSpacePanning?e.setFromMatrixColumn(r,1):(e.setFromMatrixColumn(r,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),y.add(e)}})(),j=(()=>{let e=new a.Vector3;return function(t,r){let i=n.domElement;if(i&&n.object instanceof a.PerspectiveCamera&&n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let a=e.length();L(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/i.clientHeight,n.object.matrix),D(2*r*a/i.clientHeight,n.object.matrix)}else i&&n.object instanceof a.OrthographicCamera&&n.object.isOrthographicCamera?(L(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),D(r*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function N(e){n.object instanceof a.PerspectiveCamera&&n.object.isPerspectiveCamera||n.object instanceof a.OrthographicCamera&&n.object.isOrthographicCamera?f=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function U(e){if(!n.zoomToCursor||!n.domElement)return;A=!0;let t=n.domElement.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top,o=t.width,a=t.height;z.x=r/o*2-1,z.y=-(i/a*2)+1,T.set(z.x,z.y,1).unproject(n.object).sub(n.object.position).normalize()}function B(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function V(e){x.set(e.clientX,e.clientY)}function F(e){w.set(e.clientX,e.clientY)}function H(){if(1==O.length)x.set(O[0].pageX,O[0].pageY);else{let e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);x.set(e,t)}}function W(){if(1==O.length)w.set(O[0].pageX,O[0].pageY);else{let e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);w.set(e,t)}}function K(){let e=O[0].pageX-O[1].pageX,t=O[0].pageY-O[1].pageY;P.set(0,Math.sqrt(e*e+t*t))}function G(e){if(1==O.length)b.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);b.set(n,r)}_.subVectors(b,x).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(R(2*Math.PI*_.x/t.clientHeight),I(2*Math.PI*_.y/t.clientHeight)),x.copy(b)}function Y(e){if(1==O.length)E.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);E.set(n,r)}S.subVectors(E,w).multiplyScalar(n.panSpeed),j(S.x,S.y),w.copy(E)}function q(e){var t;let r=er(e),i=e.pageX-r.x,o=e.pageY-r.y;M.set(0,Math.sqrt(i*i+o*o)),C.set(0,Math.pow(M.y/P.y,n.zoomSpeed)),t=C.y,N(f/t),P.copy(M)}function Z(e){var t,r;!1!==n.enabled&&(0===O.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",X),null==(r=n.domElement)||r.ownerDocument.addEventListener("pointerup",J)),O.push(e),"touch"===e.pointerType?function(e){switch(en(e),O.length){case 1:switch(n.touches.ONE){case a.TOUCH.ROTATE:if(!1===n.enableRotate)return;H(),s=l.TOUCH_ROTATE;break;case a.TOUCH.PAN:if(!1===n.enablePan)return;W(),s=l.TOUCH_PAN;break;default:s=l.NONE}break;case 2:switch(n.touches.TWO){case a.TOUCH.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&K(),n.enablePan&&W(),s=l.TOUCH_DOLLY_PAN;break;case a.TOUCH.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&K(),n.enableRotate&&H(),s=l.TOUCH_DOLLY_ROTATE;break;default:s=l.NONE}break;default:s=l.NONE}s!==l.NONE&&n.dispatchEvent(i)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case a.MOUSE.DOLLY:if(!1===n.enableZoom)return;U(e),P.set(e.clientX,e.clientY),s=l.DOLLY;break;case a.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;F(e),s=l.PAN}else{if(!1===n.enableRotate)return;V(e),s=l.ROTATE}break;case a.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;V(e),s=l.ROTATE}else{if(!1===n.enablePan)return;F(e),s=l.PAN}break;default:s=l.NONE}s!==l.NONE&&n.dispatchEvent(i)}(e))}function X(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),s){case l.TOUCH_ROTATE:if(!1===n.enableRotate)return;G(e),n.update();break;case l.TOUCH_PAN:if(!1===n.enablePan)return;Y(e),n.update();break;case l.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&q(e),n.enablePan&&Y(e),n.update();break;case l.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&q(e),n.enableRotate&&G(e),n.update();break;default:s=l.NONE}}(e):function(e){if(!1!==n.enabled)switch(s){case l.ROTATE:if(!1===n.enableRotate)return;!function(e){b.set(e.clientX,e.clientY),_.subVectors(b,x).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(R(2*Math.PI*_.x/t.clientHeight),I(2*Math.PI*_.y/t.clientHeight)),x.copy(b),n.update()}(e);break;case l.DOLLY:var t,r;if(!1===n.enableZoom)return;(M.set(e.clientX,e.clientY),C.subVectors(M,P),C.y>0)?(t=k(),N(f/t)):C.y<0&&(r=k(),N(f*r)),P.copy(M),n.update();break;case l.PAN:if(!1===n.enablePan)return;E.set(e.clientX,e.clientY),S.subVectors(E,w).multiplyScalar(n.panSpeed),j(S.x,S.y),w.copy(E),n.update()}}(e))}function J(e){var t,r,i;(function(e){delete $[e.pointerId];for(let t=0;t<O.length;t++)if(O[t].pointerId==e.pointerId){O.splice(t,1);return}})(e),0===O.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointermove",X),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointerup",J)),n.dispatchEvent(o),s=l.NONE}function Q(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(s===l.NONE||s===l.ROTATE)){var t,r;e.preventDefault(),n.dispatchEvent(i),(U(e),e.deltaY<0)?(t=k(),N(f*t)):e.deltaY>0&&(r=k(),N(f/r)),n.update(),n.dispatchEvent(o)}}function ee(e){!1!==n.enabled&&!1!==n.enablePan&&function(e){let t=!1;switch(e.code){case n.keys.UP:j(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:j(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:j(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:j(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}(e)}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=$[e.pointerId];void 0===t&&(t=new a.Vector2,$[e.pointerId]=t),t.set(e.pageX,e.pageY)}function er(e){return $[(e.pointerId===O[0].pointerId?O[1]:O[0]).pointerId]}this.dollyIn=(e=k())=>{N(f*e),n.update()},this.dollyOut=(e=k())=>{N(f/e),n.update()},this.getScale=()=>f,this.setScale=e=>{N(e),n.update()},this.getZoomScale=()=>k(),void 0!==t&&this.connect(t),this.update()}}let x=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:a,enableDamping:l=!0,keyEvents:s=!1,onChange:c,onStart:u,onEnd:d,...f},p)=>{let h=(0,i.D)(e=>e.invalidate),m=(0,i.D)(e=>e.camera),g=(0,i.D)(e=>e.gl),v=(0,i.D)(e=>e.events),x=(0,i.D)(e=>e.setEvents),b=(0,i.D)(e=>e.set),_=(0,i.D)(e=>e.get),w=(0,i.D)(e=>e.performance),E=t||m,S=a||v.connected||g.domElement,P=o.useMemo(()=>new y(E),[E]);return(0,i.F)(()=>{P.enabled&&P.update()},-1),o.useEffect(()=>(s&&P.connect(!0===s?S:s),P.connect(S),()=>void P.dispose()),[s,S,n,P,h]),o.useEffect(()=>{let e=e=>{h(),n&&w.regress(),c&&c(e)},t=e=>{u&&u(e)},r=e=>{d&&d(e)};return P.addEventListener("change",e),P.addEventListener("start",t),P.addEventListener("end",r),()=>{P.removeEventListener("start",t),P.removeEventListener("end",r),P.removeEventListener("change",e)}},[c,u,d,P,h,x]),o.useEffect(()=>{if(e){let e=_().controls;return b({controls:P}),()=>b({controls:e})}},[e,P]),o.createElement("primitive",(0,r.Z)({ref:p,object:P,enableDamping:l},f))})},28248:function(e,t,n){"use strict";n.d(t,{b:function(){return d}});var r=n(13233),i=n(38699),o=n(75271),a=n(28167),l=n(89202),s=n(40830),c=n(12350);let u=(0,a.g)({screenspace:!1,color:new i.Color("black"),opacity:1,thickness:.05,size:new i.Vector2},`#include <common>
   #include <morphtarget_pars_vertex>
   #include <skinning_pars_vertex>
   #include <clipping_planes_pars_vertex>
   uniform float thickness;
   uniform bool screenspace;
   uniform vec2 size;
   void main() {
     #if defined (USE_SKINNING)
	     #include <beginnormal_vertex>
       #include <morphnormal_vertex>
       #include <skinbase_vertex>
       #include <skinnormal_vertex>
       #include <defaultnormal_vertex>
     #endif
     #include <begin_vertex>
	   #include <morphtarget_vertex>
	   #include <skinning_vertex>
     #include <project_vertex>
     #include <clipping_planes_vertex>
     vec4 tNormal = vec4(normal, 0.0);
     vec4 tPosition = vec4(transformed, 1.0);
     #ifdef USE_INSTANCING
       tNormal = instanceMatrix * tNormal;
       tPosition = instanceMatrix * tPosition;
     #endif
     if (screenspace) {
       vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); 
     } else {
       vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
       vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
       vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
       clipPosition.xy += offset;
       gl_Position = clipPosition;
     }
   }`,`uniform vec3 color;
   uniform float opacity;
   #include <clipping_planes_pars_fragment>
   void main(){
     #include <clipping_planes_fragment>
     gl_FragColor = vec4(color, opacity);
     #include <tonemapping_fragment>
     #include <${c.i>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);function d({color:e="black",opacity:t=1,transparent:n=!1,screenspace:a=!1,toneMapped:c=!0,polygonOffset:d=!1,polygonOffsetFactor:f=0,renderOrder:p=0,thickness:h=.05,angle:m=Math.PI,clippingPlanes:g,...v}){let y=o.useRef(),[x]=o.useState(()=>new u({side:i.BackSide})),{gl:b}=(0,l.D)(),_=b.getDrawingBufferSize(new i.Vector2);o.useMemo(()=>(0,l.e)({OutlinesMaterial:u}),[]);let w=o.useRef(0),E=o.useRef();return o.useLayoutEffect(()=>{let e=y.current;if(!e)return;let t=e.parent;if(t&&t.geometry&&(w.current!==m||E.current!==t.geometry)){var n;w.current=m,E.current=t.geometry;let r=null==(n=e.children)?void 0:n[0];r&&(m&&r.geometry.dispose(),e.remove(r)),t.skeleton?((r=new i.SkinnedMesh).material=x,r.bind(t.skeleton,t.bindMatrix)):t.isInstancedMesh?(r=new i.InstancedMesh(t.geometry,x,t.count)).instanceMatrix=t.instanceMatrix:(r=new i.Mesh).material=x,e.add(r),r.geometry=m?(0,s.LZ)(t.geometry,m):t.geometry,r.morphTargetInfluences=t.morphTargetInfluences,r.morphTargetDictionary=t.morphTargetDictionary}}),o.useLayoutEffect(()=>{let r=y.current;if(!r)return;let i=r.children[0];if(i){i.renderOrder=p;let o=r.parent;(0,l.k)(i,{morphTargetInfluences:o.morphTargetInfluences,morphTargetDictionary:o.morphTargetDictionary}),(0,l.k)(i.material,{transparent:n,thickness:h,color:e,opacity:t,size:_,screenspace:a,toneMapped:c,polygonOffset:d,polygonOffsetFactor:f,clippingPlanes:g,clipping:g&&g.length>0})}}),o.useEffect(()=>()=>{let e=y.current;if(!e)return;let t=e.children[0];t&&(m&&t.geometry.dispose(),e.remove(t))},[]),o.createElement("group",(0,r.Z)({ref:y},v))}},51083:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(13233),i=n(75271),o=n(38699),a=n(40830);let l=i.forwardRef(function({args:[e=1,t=1,n=1]=[],radius:l=.05,steps:s=1,smoothness:c=4,bevelSegments:u=4,creaseAngle:d=.4,children:f,...p},h){let m=i.useMemo(()=>(function(e,t,n){let r=new o.Shape,i=n-1e-5;return r.absarc(1e-5,1e-5,1e-5,-Math.PI/2,-Math.PI,!0),r.absarc(1e-5,t-2*i,1e-5,Math.PI,Math.PI/2,!0),r.absarc(e-2*i,t-2*i,1e-5,Math.PI/2,0,!0),r.absarc(e-2*i,1e-5,1e-5,0,-Math.PI/2,!0),r})(e,t,l),[e,t,l]),g=i.useMemo(()=>({depth:n-2*l,bevelEnabled:!0,bevelSegments:2*u,steps:s,bevelSize:l-1e-5,bevelThickness:l,curveSegments:c}),[n,l,c]),v=i.useRef(null);return i.useLayoutEffect(()=>{v.current&&(v.current.center(),(0,a.LZ)(v.current,d))},[m,g]),i.createElement("mesh",(0,r.Z)({ref:h},p),i.createElement("extrudeGeometry",{ref:v,args:[m,g]}),f)})},28167:function(e,t,n){"use strict";n.d(t,{g:function(){return i}});var r=n(38699);function i(e,t,n,i){let o=class extends r.ShaderMaterial{constructor(o={}){let a=Object.entries(e);super({uniforms:a.reduce((e,[t,n])=>{let i=r.UniformsUtils.clone({[t]:{value:n}});return{...e,...i}},{}),vertexShader:t,fragmentShader:n}),this.key="",a.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t})),Object.assign(this,o),i&&i(this)}};return o.key=r.MathUtils.generateUUID(),o}},51147:function(e,t,n){"use strict";n.d(t,{WL:function(){return l},yI:function(){return a}});var r=n(13233),i=n(75271);function o(e,t){let n=e+"Geometry";return i.forwardRef(({args:e,children:o,...a},l)=>{let s=i.useRef(null);return i.useImperativeHandle(l,()=>s.current),i.useLayoutEffect(()=>void(null==t||t(s.current))),i.createElement("mesh",(0,r.Z)({ref:s},a),i.createElement(n,{attach:"geometry",args:e}),o)})}let a=o("octahedron"),l=o("extrude")},12350:function(e,t,n){"use strict";n.d(t,{i:function(){return r}});let r=parseInt(n(38699).REVISION.replace(/\D+/g,""))},46534:function(e,t,n){"use strict";let r,i;n.d(t,{V:function(){return x}});var o=n(13233),a=n(75271),l=n(38751),s=n(38699),c=n(89202);let u=new s.Vector3,d=new s.Vector3,f=new s.Vector3,p=new s.Vector2;function h(e,t,n){let r=u.setFromMatrixPosition(e.matrixWorld);r.project(t);let i=n.width/2,o=n.height/2;return[r.x*i+i,-(r.y*o)+o]}let m=e=>1e-10>Math.abs(e)?0:e;function g(e,t,n=""){let r="matrix3d(";for(let n=0;16!==n;n++)r+=m(t[n]*e.elements[n])+(15!==n?",":")");return n+r}let v=(r=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>g(e,r)),y=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>g(e,i(t),"translate(-50%,-50%)")),x=a.forwardRef(({children:e,eps:t=.001,style:n,className:r,prepend:i,center:g,fullscreen:x,portal:b,distanceFactor:_,sprite:w=!1,transform:E=!1,occlude:S,onOcclude:P,castShadow:M,receiveShadow:C,material:T,geometry:z,zIndexRange:A=[16777271,0],calculatePosition:O=h,as:$="div",wrapperClass:k,pointerEvents:R="auto",...I},L)=>{let{gl:D,camera:j,scene:N,size:U,raycaster:B,events:V,viewport:F}=(0,c.D)(),[H]=a.useState(()=>document.createElement($)),W=a.useRef(),K=a.useRef(null),G=a.useRef(0),Y=a.useRef([0,0]),q=a.useRef(null),Z=a.useRef(null),X=(null==b?void 0:b.current)||V.connected||D.domElement.parentNode,J=a.useRef(null),Q=a.useRef(!1),ee=a.useMemo(()=>{var e;return S&&"blending"!==S||Array.isArray(S)&&S.length&&(e=S[0])&&"object"==typeof e&&"current"in e},[S]);a.useLayoutEffect(()=>{let e=D.domElement;S&&"blending"===S?(e.style.zIndex=`${Math.floor(A[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[S]),a.useLayoutEffect(()=>{if(K.current){let e=W.current=l.createRoot(H);if(N.updateMatrixWorld(),E)H.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=O(K.current,j,U);H.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(i?X.prepend(H):X.appendChild(H)),()=>{X&&X.removeChild(H),e.unmount()}}},[X,E]),a.useLayoutEffect(()=>{k&&(H.className=k)},[k]);let et=a.useMemo(()=>E?{position:"absolute",top:0,left:0,width:U.width,height:U.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:g?"translate3d(-50%,-50%,0)":"none",...x&&{top:-U.height/2,left:-U.width/2,width:U.width,height:U.height},...n},[n,g,x,U,E]),en=a.useMemo(()=>({position:"absolute",pointerEvents:R}),[R]);a.useLayoutEffect(()=>{var t,i;Q.current=!1,E?null==(t=W.current)||t.render(a.createElement("div",{ref:q,style:et},a.createElement("div",{ref:Z,style:en},a.createElement("div",{ref:L,className:r,style:n,children:e})))):null==(i=W.current)||i.render(a.createElement("div",{ref:L,style:et,className:r,children:e}))});let er=a.useRef(!0);(0,c.F)(e=>{if(K.current){j.updateMatrixWorld(),K.current.updateWorldMatrix(!0,!1);let e=E?Y.current:O(K.current,j,U);if(E||Math.abs(G.current-j.zoom)>t||Math.abs(Y.current[0]-e[0])>t||Math.abs(Y.current[1]-e[1])>t){let t=function(e,t){let n=u.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld),i=n.sub(r),o=t.getWorldDirection(f);return i.angleTo(o)>Math.PI/2}(K.current,j),n=!1;ee&&(Array.isArray(S)?n=S.map(e=>e.current):"blending"!==S&&(n=[N]));let r=er.current;if(n){let e=function(e,t,n,r){let i=u.setFromMatrixPosition(e.matrixWorld),o=i.clone();o.project(t),p.set(o.x,o.y),n.setFromCamera(p,t);let a=n.intersectObjects(r,!0);if(a.length){let e=a[0].distance;return i.distanceTo(n.ray.origin)<e}return!0}(K.current,j,B,n);er.current=e&&!t}else er.current=!t;r!==er.current&&(P?P(!er.current):H.style.display=er.current?"block":"none");let i=Math.floor(A[0]/2),o=S?ee?[A[0],i]:[i-1,0]:A;if(H.style.zIndex=`${function(e,t,n){if(t instanceof s.PerspectiveCamera||t instanceof s.OrthographicCamera){let r=u.setFromMatrixPosition(e.matrixWorld),i=d.setFromMatrixPosition(t.matrixWorld),o=r.distanceTo(i),a=(n[1]-n[0])/(t.far-t.near),l=n[1]-a*t.far;return Math.round(a*o+l)}}(K.current,j,o)}`,E){let[e,t]=[U.width/2,U.height/2],n=j.projectionMatrix.elements[5]*t,{isOrthographicCamera:r,top:i,left:o,bottom:a,right:l}=j,s=v(j.matrixWorldInverse),c=r?`scale(${n})translate(${m(-(l+o)/2)}px,${m((i+a)/2)}px)`:`translateZ(${n}px)`,u=K.current.matrixWorld;w&&((u=j.matrixWorldInverse.clone().transpose().copyPosition(u).scale(K.current.scale)).elements[3]=u.elements[7]=u.elements[11]=0,u.elements[15]=1),H.style.width=U.width+"px",H.style.height=U.height+"px",H.style.perspective=r?"":`${n}px`,q.current&&Z.current&&(q.current.style.transform=`${c}${s}translate(${e}px,${t}px)`,Z.current.style.transform=y(u,1/((_||10)/400)))}else{let t=void 0===_?1:function(e,t){if(t instanceof s.OrthographicCamera)return t.zoom;if(!(t instanceof s.PerspectiveCamera))return 1;{let n=u.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*n.distanceTo(r))}}(K.current,j)*_;H.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}Y.current=e,G.current=j.zoom}}if(!ee&&J.current&&!Q.current){if(E){if(q.current){let e=q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=j;if(t||z)I.scale&&(Array.isArray(I.scale)?I.scale instanceof s.Vector3?J.current.scale.copy(I.scale.clone().divideScalar(1)):J.current.scale.set(1/I.scale[0],1/I.scale[1],1/I.scale[2]):J.current.scale.setScalar(1/I.scale));else{let t=(_||10)/400,n=e.clientWidth*t,r=e.clientHeight*t;J.current.scale.set(n,r,1)}Q.current=!0}}}else{let t=H.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/F.factor,n=t.clientWidth*e,r=t.clientHeight*e;J.current.scale.set(n,r,1),Q.current=!0}J.current.lookAt(e.camera.position)}}});let ei=a.useMemo(()=>({vertexShader:E?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[E]);return a.createElement("group",(0,o.Z)({},I,{ref:K}),S&&!ee&&a.createElement("mesh",{castShadow:M,receiveShadow:C,ref:J},z||a.createElement("planeGeometry",null),T||a.createElement("shaderMaterial",{side:s.DoubleSide,vertexShader:ei.vertexShader,fragmentShader:ei.fragmentShader})))})},19674:function(e){e.exports={"<<=":!0,">>=":!0,"++":!0,"--":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"%=":!0,"&=":!0,"^=":!0,"|=":!0,"=":!0}},46552:function(e){e.exports={precision:!0,highp:!0,mediump:!0,lowp:!0,attribute:!0,const:!0,uniform:!0,varying:!0,break:!0,continue:!0,do:!0,for:!0,while:!0,if:!0,else:!0,in:!0,out:!0,inout:!0,true:!0,false:!0,return:!0}},65214:function(e,t,n){var r=n(19674),i=n(46552);e.exports=function(e){for(var t=0,n=0;n<e.length;n++){var o=e[n],a=o.type;o.assignment=!1,o.declaration=!1,("ident"===a||"builtin"===a)&&(t=n+1,c(1),"operator"===e[t].type&&r[e[t].data]&&(o.assignment=!0))}for(var n=0;n<e.length;n++){var l=e[n],a=l.type,s=l.data;if(l.declaration=!1,"keyword"===a){if(i[s])continue}else if("ident"!==a)continue;if(t=n+1,u(),"ident"===e[t].type){if(e[t++].declaration=!0,u(),"("===e[t].data){for(t++,c(1);e[t]&&")"!==e[t].data&&("keyword"===e[t].type||"ident"===e[t].type);)t++,c(1),"ident"===e[t].type&&(e[t++].declaration=!0,c(1),u(),c(1),","===e[t].data&&(t++,c(1)));n=t;continue}for(;e[t]&&";"!==e[t].data;)","===e[t].data?(t++,c(1),(e[t].declaration="ident"===e[t].type)&&t++):(c(1),function(){if(e[t]&&"("===e[t].data){var n=0;do{if(";"===e[t].data)break;"("===e[t].data&&n++,")"===e[t].data&&n--}while(n&&e[++t])}}(),c(1),t++);n=t}}for(var n=0;n<e.length;n++){var o=e[n];if("keyword"===o.type&&"struct"===o.data&&(t=n+1,c(1),"ident"===e[t].type)&&(t++,c(1),"{"===e[t++].data)){for(c(1);"ident"===e[t].type||"keyword"===e[t].type;){do t++,c(1),e[t].structMember=!0,e[t].declaration=!1,t++,u();while(","===e[t].data);";"===e[t].data&&t++,c()}if(t++,c(1),"ident"===e[t].type)for(e[t].declaration=!0,c(1);","===e[++t].data;)c(1),t++,c(1),"ident"===e[t].type&&(e[t].declaration=!0),c(1)}}return e;function c(n){for(;e[t]&&"whitespace"===e[t].type;)t++}function u(){for(;e[t]&&("integer"===e[t].type||"["===e[t].data||"]"===e[t].data||"whitespace"===e[t].type);)t++}}},70893:function(e){e.exports=function(e){for(var t=!1,n=0,r=0;r<e.length;r++)switch(t=t||"keyword"===e[r].type&&"for"===e[r].data,e[r].data){case"(":e[r].depth=t?n++:n;break;case"{":e[r].depth=t?n:n++,t=!1;break;case"}":e[r].depth=--n;break;default:e[r].depth=n}for(var r=0;r<e.length;r++){var i=e[r],o=r+1;if(("ident"===i.type||"keyword"===i.type)&&(a(),"ident"===e[o].type&&(a(),"("===e[++o].data))){for(;e[o]&&";"!==e[o].data&&"{"!==e[o].data;)e[o++].depth++;e[o]&&"{"===e[o].data&&e[o].depth++}}return e;function a(){for(;e[o]&&("whitespace"===e[o].type||"["===e[o].data||"]"===e[o].data||"integer"===e[o].data);)o++}}},78117:function(e,t,n){e.exports=function(e,t){var r;n(70893)(e),n(78847)(e),n(62391)(e),n(65214)(e);for(var i=function(e){for(var t={},n=0;n<e.length;n++){var r=e[n];r.declaration&&(t[r.scope]=t[r.scope]||{},t[r.scope][r.data]=r)}return t}(e),o=t||(r=0,function(e){return e+"_"+(r++).toString(36)}),a={},l=0;l<e.length;l++){var s=e[l],c=s.stack,u=s.data;if(s.descoped=!1,"ident"===s.type&&!s.property&&!s.structMember){for(var d=!1,f=c.length-1;f>=0;f--){var p=i[c[f]];if(p&&p[u]){if(d=!0,f)break;s.descoped=s.data,s.data=a[u]=a[u]||o(u,s)||s.data}}d||(s.descoped=s.data,s.data=a[u]=a[u]||o(u,s)||s.data)}}return e}},41884:function(e){function t(e){return function(t){return"operator"===t.type&&(!e||t.data===e)}}function n(e){return"whitespace"!==e.type}e.exports=function(e){var r,i,o,a=null,l=null,s=0,c=0,u=0,d=0,f=0,p=[];for(r=0;r<e.length;r++)if("{"===(o=e[r]).data){if(s&&s++||(i=m(r,t(")"),t()))<0||(d=i,(i=m(i,t("("),t(")")))<0)||(f=i,(i=m(i,n))<0||"ident"!==e[i].type)||(l=e[i].data,(i=m(i,n))<0))continue;s=1,c=r,a=e[i].data,u=i;var h=m(i,n);switch(e[h]&&e[h].data){case"lowp":case"highp":case"mediump":u=h}}else if(s&&"}"===o.data){if(--s)continue;p.push({name:l,type:a,body:[c+1,r],args:[f,d+1],outer:[u,r+1]})}for(r=0;r<e.length;r++)if(";"===(o=e[r]).data){if((i=m(r,t(")"),t()))<0||(d=i,(i=m(i,t("("),t(")")))<0)||(f=i,(i=m(i,n))<0||"ident"!==e[i].type)||(l=e[i].data,(i=m(i,n))<0||"operator"===e[i].type||"return"===e[i].data))continue;a=e[i].data,p.push({name:l,type:a,body:!1,args:[f,d+1],outer:[i,r+1]})}return p.sort(function(e,t){return e.outer[0]-t.outer[0]});function m(t,n,r){for(var i=t-1;i>=0;i--){if(n(e[i]))return i;if(r&&r(e[i]))break}return -1}}},62391:function(e){e.exports=function(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.property=!1,"ident"===n.type){for(var r=t;e[--r]&&"whitespace"===e[r].type;);e[r]&&"operator"===e[r].type&&"."===e[r].data&&(n.property=!0)}}return e}},78847:function(e){e.exports=function(e){var t=[0],n=t[0],r=0;if(!e||!e.length)return e;if(!("depth"in e[0]))throw Error("glsl-token-scope: No scope depth defined on tokens! Use glsl-token-depth on these tokens first");for(var i=0;i<e.length;i++){var o=e[i],a=o.depth;a>r?t.push(++n):a<r&&t.splice(-1,1),o.scope=t[t.length-1],o.stack=t.slice(),r=o.depth}return e}},79821:function(e){e.exports=function(e){for(var t=[],n=0;n<e.length;n++)"eof"!==e[n].type&&t.push(e[n].data);return t.join("")}},19267:function(e,t,n){e.exports=function(e){var t,n,c,u=0,d=0,f=999,p=[],h=[],m=1,g=0,v=0,y=!1,x=!1,b="",_=o,w=r;"300 es"===(e=e||{}).version&&(_=l,w=a);for(var E={},S={},u=0;u<_.length;u++)E[_[u]]=!0;for(var u=0;u<w.length;u++)S[w[u]]=!0;return function(e){return(h=[],null!==e)?function(e){var r;for(u=0,e.toString&&(e=e.toString()),b+=e.replace(/\r\n/g,"\n"),c=b.length;t=b[u],u<c;){switch(r=u,f){case 0:"/"===t&&"*"===n?(p.push(t),P(p.join("")),f=999):(p.push(t),n=t),u+=1;break;case 1:case 2:u=function(){return("\r"===t||"\n"===t)&&"\\"!==n?(P(p.join("")),f=999,u):(p.push(t),n=t,u+1)}();break;case 3:u=function(){if("."===n&&/\d/.test(t))return f=5,u;if("/"===n&&"*"===t)return f=0,u;if("/"===n&&"/"===t)return f=1,u;if("."===t&&p.length){for(;M(p););return f=5,u}if(";"===t||")"===t||"("===t){if(p.length)for(;M(p););return P(t),f=999,u+1}var e=2===p.length&&"="!==t;if(/[\w_\d\s]/.test(t)||e){for(;M(p););return f=999,u}return p.push(t),n=t,u+1}();break;case 4:u="."===t||/[eE]/.test(t)?(p.push(t),f=5,n=t,u+1):"x"===t&&1===p.length&&"0"===p[0]?(f=11,p.push(t),n=t,u+1):/[^\d]/.test(t)?(P(p.join("")),f=999,u):(p.push(t),n=t,u+1);break;case 11:u=/[^a-fA-F0-9]/.test(t)?(P(p.join("")),f=999,u):(p.push(t),n=t,u+1);break;case 5:"f"===t&&(p.push(t),n=t,u+=1),u=/[eE]/.test(t)||("-"===t||"+"===t)&&/[eE]/.test(n)?(p.push(t),n=t,u+1):/[^\d]/.test(t)?(P(p.join("")),f=999,u):(p.push(t),n=t,u+1);break;case 9999:u=function(){if(/[^\d\w_]/.test(t)){var e=p.join("");return f=S[e]?8:E[e]?7:6,P(p.join("")),f=999,u}return p.push(t),n=t,u+1}();break;case 9:u=/[^\s]/g.test(t)?(P(p.join("")),f=999,u):(p.push(t),n=t,u+1);break;case 999:p=p.length?[]:p,u="/"===n&&"*"===t?(v=d+u-1,f=0,n=t,u+1):"/"===n&&"/"===t?(v=d+u-1,f=1,n=t,u+1):("#"===t?(f=2,v=d+u):/\s/.test(t)?(f=9,v=d+u):(y=/\d/.test(t),x=/[^\w_]/.test(t),v=d+u,f=y?4:x?3:9999),u)}r!==u&&("\n"===b[r]?(g=0,++m):++g)}return d+=u,b=b.slice(u),h}(e):(p.length&&P(p.join("")),f=10,P("(eof)"),h)};function P(e){e.length&&h.push({type:s[f],data:e,position:v,line:m,column:g})}function M(e){for(var t,n,r=0;;){if(t=i.indexOf(e.slice(0,e.length+r).join("")),n=i[t],-1===t){if(r--+e.length>0)continue;n=e.slice(0,1).join("")}return P(n),v+=n.length,(p=p.slice(n.length)).length}}};var r=n(90537),i=n(60533),o=n(82260),a=n(52366),l=n(34250),s=["block-comment","line-comment","preprocessor","operator","integer","float","ident","builtin","keyword","whitespace","eof","integer"]},34250:function(e,t,n){var r=n(82260);r=r.slice().filter(function(e){return!/^(gl\_|texture)/.test(e)}),e.exports=r.concat(["gl_VertexID","gl_InstanceID","gl_Position","gl_PointSize","gl_FragCoord","gl_FrontFacing","gl_FragDepth","gl_PointCoord","gl_MaxVertexAttribs","gl_MaxVertexUniformVectors","gl_MaxVertexOutputVectors","gl_MaxFragmentInputVectors","gl_MaxVertexTextureImageUnits","gl_MaxCombinedTextureImageUnits","gl_MaxTextureImageUnits","gl_MaxFragmentUniformVectors","gl_MaxDrawBuffers","gl_MinProgramTexelOffset","gl_MaxProgramTexelOffset","gl_DepthRangeParameters","gl_DepthRange","trunc","round","roundEven","isnan","isinf","floatBitsToInt","floatBitsToUint","intBitsToFloat","uintBitsToFloat","packSnorm2x16","unpackSnorm2x16","packUnorm2x16","unpackUnorm2x16","packHalf2x16","unpackHalf2x16","outerProduct","transpose","determinant","inverse","texture","textureSize","textureProj","textureLod","textureOffset","texelFetch","texelFetchOffset","textureProjOffset","textureLodOffset","textureProjLod","textureProjLodOffset","textureGrad","textureGradOffset","textureProjGrad","textureProjGradOffset"])},82260:function(e){e.exports=["abs","acos","all","any","asin","atan","ceil","clamp","cos","cross","dFdx","dFdy","degrees","distance","dot","equal","exp","exp2","faceforward","floor","fract","gl_BackColor","gl_BackLightModelProduct","gl_BackLightProduct","gl_BackMaterial","gl_BackSecondaryColor","gl_ClipPlane","gl_ClipVertex","gl_Color","gl_DepthRange","gl_DepthRangeParameters","gl_EyePlaneQ","gl_EyePlaneR","gl_EyePlaneS","gl_EyePlaneT","gl_Fog","gl_FogCoord","gl_FogFragCoord","gl_FogParameters","gl_FragColor","gl_FragCoord","gl_FragData","gl_FragDepth","gl_FragDepthEXT","gl_FrontColor","gl_FrontFacing","gl_FrontLightModelProduct","gl_FrontLightProduct","gl_FrontMaterial","gl_FrontSecondaryColor","gl_LightModel","gl_LightModelParameters","gl_LightModelProducts","gl_LightProducts","gl_LightSource","gl_LightSourceParameters","gl_MaterialParameters","gl_MaxClipPlanes","gl_MaxCombinedTextureImageUnits","gl_MaxDrawBuffers","gl_MaxFragmentUniformComponents","gl_MaxLights","gl_MaxTextureCoords","gl_MaxTextureImageUnits","gl_MaxTextureUnits","gl_MaxVaryingFloats","gl_MaxVertexAttribs","gl_MaxVertexTextureImageUnits","gl_MaxVertexUniformComponents","gl_ModelViewMatrix","gl_ModelViewMatrixInverse","gl_ModelViewMatrixInverseTranspose","gl_ModelViewMatrixTranspose","gl_ModelViewProjectionMatrix","gl_ModelViewProjectionMatrixInverse","gl_ModelViewProjectionMatrixInverseTranspose","gl_ModelViewProjectionMatrixTranspose","gl_MultiTexCoord0","gl_MultiTexCoord1","gl_MultiTexCoord2","gl_MultiTexCoord3","gl_MultiTexCoord4","gl_MultiTexCoord5","gl_MultiTexCoord6","gl_MultiTexCoord7","gl_Normal","gl_NormalMatrix","gl_NormalScale","gl_ObjectPlaneQ","gl_ObjectPlaneR","gl_ObjectPlaneS","gl_ObjectPlaneT","gl_Point","gl_PointCoord","gl_PointParameters","gl_PointSize","gl_Position","gl_ProjectionMatrix","gl_ProjectionMatrixInverse","gl_ProjectionMatrixInverseTranspose","gl_ProjectionMatrixTranspose","gl_SecondaryColor","gl_TexCoord","gl_TextureEnvColor","gl_TextureMatrix","gl_TextureMatrixInverse","gl_TextureMatrixInverseTranspose","gl_TextureMatrixTranspose","gl_Vertex","greaterThan","greaterThanEqual","inversesqrt","length","lessThan","lessThanEqual","log","log2","matrixCompMult","max","min","mix","mod","normalize","not","notEqual","pow","radians","reflect","refract","sign","sin","smoothstep","sqrt","step","tan","texture2D","texture2DLod","texture2DProj","texture2DProjLod","textureCube","textureCubeLod","texture2DLodEXT","texture2DProjLodEXT","textureCubeLodEXT","texture2DGradEXT","texture2DProjGradEXT","textureCubeGradEXT"]},52366:function(e,t,n){var r=n(90537);e.exports=r.slice().concat(["layout","centroid","smooth","case","mat2x2","mat2x3","mat2x4","mat3x2","mat3x3","mat3x4","mat4x2","mat4x3","mat4x4","uvec2","uvec3","uvec4","samplerCubeShadow","sampler2DArray","sampler2DArrayShadow","isampler2D","isampler3D","isamplerCube","isampler2DArray","usampler2D","usampler3D","usamplerCube","usampler2DArray","coherent","restrict","readonly","writeonly","resource","atomic_uint","noperspective","patch","sample","subroutine","common","partition","active","filter","image1D","image2D","image3D","imageCube","iimage1D","iimage2D","iimage3D","iimageCube","uimage1D","uimage2D","uimage3D","uimageCube","image1DArray","image2DArray","iimage1DArray","iimage2DArray","uimage1DArray","uimage2DArray","image1DShadow","image2DShadow","image1DArrayShadow","image2DArrayShadow","imageBuffer","iimageBuffer","uimageBuffer","sampler1DArray","sampler1DArrayShadow","isampler1D","isampler1DArray","usampler1D","usampler1DArray","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray"])},90537:function(e){e.exports=["precision","highp","mediump","lowp","attribute","const","uniform","varying","break","continue","do","for","while","if","else","in","out","inout","float","int","uint","void","bool","true","false","discard","return","mat2","mat3","mat4","vec2","vec3","vec4","ivec2","ivec3","ivec4","bvec2","bvec3","bvec4","sampler1D","sampler2D","sampler3D","samplerCube","sampler1DShadow","sampler2DShadow","struct","asm","class","union","enum","typedef","template","this","packed","goto","switch","default","inline","noinline","volatile","public","static","extern","external","interface","long","short","double","half","fixed","unsigned","input","output","hvec2","hvec3","hvec4","dvec2","dvec3","dvec4","fvec2","fvec3","fvec4","sampler2DRect","sampler3DRect","sampler2DRectShadow","sizeof","cast","namespace","using"]},60533:function(e){e.exports=["<<=",">>=","++","--","<<",">>","<=",">=","==","!=","&&","||","+=","-=","*=","/=","%=","&=","^^","^=","|=","(",")","[","]",".","!","~","*","/","%","+","-","<",">","&","^","|","?",":","=",",",";","{","}"]},13187:function(e,t,n){var r=n(19267);e.exports=function(e,t){var n=r(t),i=[];return(i=i.concat(n(e))).concat(n(null))}},3367:function(e,t,n){"use strict";let r,i,o;n.d(t,{HE:function(){return oB},ud:function(){return oU}});var a,l,s,c,u=n(13233),d=n(89202),f=n(75271),p=n.t(f,2),h=n(38699),m=n(13187),g=n.n(m),v=n(78117),y=n.n(v),x=n(79821),b=n.n(x),_=n(41884),w=n.n(_),E=n(58564),S=n.n(E),P="csm_Position",M="csm_PositionRaw",C="csm_PointSize",T="csm_FragColor",z="csm_DiffuseColor",A="csm_Normal",O="csm_Roughness",$="csm_Metalness",k="csm_Emissive";let R={[`${A}`]:{"#include <beginnormal_vertex>":`
    vec3 objectNormal = ${A};
    #ifdef USE_TANGENT
	    vec3 objectTangent = vec3( tangent.xyz );
    #endif
    `},[`${P}`]:{"#include <begin_vertex>":`
    vec3 transformed = ${P};
  `},[`${M}`]:{"#include <begin_vertex>":`
    vec4 csm_positionUnprojected = ${M};
    mat4x4 csm_unprojectMatrix = projectionMatrix * modelViewMatrix;
    #ifdef USE_INSTANCING
      csm_unprojectMatrix = csm_unprojectMatrix * instanceMatrix;
    #endif
    csm_positionUnprojected = inverse(csm_unprojectMatrix) * csm_positionUnprojected;
    vec3 transformed = csm_positionUnprojected.xyz;
  `},[`${C}`]:{"gl_PointSize = size;":`
    gl_PointSize = ${C};
    `},[`${z}`]:{"#include <color_fragment>":`
    #include <color_fragment>
    diffuseColor = ${z};
  `},[`${T}`]:{"#include <dithering_fragment>":`
    #include <dithering_fragment>
    gl_FragColor  = ${T};
  `},[`${k}`]:{"vec3 totalEmissiveRadiance = emissive;":`
    vec3 totalEmissiveRadiance = ${k};
    `},[`${O}`]:{"#include <roughnessmap_fragment>":`
    #include <roughnessmap_fragment>
    roughnessFactor = ${O};
    `},[`${$}`]:{"#include <metalnessmap_fragment>":`
    #include <metalnessmap_fragment>
    metalnessFactor = ${$};
    `}},I={[`${P}`]:{"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );":`
    gl_Position = projectionMatrix * modelViewMatrix * vec4( ${P}, 1.0 );
  `},[`${M}`]:{"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );":`
    gl_Position = ${P};
  `},[`${z}`]:{"gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );":`
    gl_FragColor = ${z};
  `},[`${T}`]:{"gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );":`
    gl_FragColor = ${T};
  `}},L=`

#ifdef IS_VERTEX
    vec3 csm_Position = position;
    vec4 csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    vec3 csm_Normal = normal;
#else
    #if defined IS_SHADERMATERIAL || defined IS_MESHDEPTHMATERIAL || defined IS_MESHNORMALMATERIAL
        vec4 csm_DiffuseColor = vec4(1., 0., 1., 1.);
        vec4 csm_FragColor = vec4(1., 0., 1., 1.);
    #else
        #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL
            vec3 csm_Emissive = emissive;
            float csm_Roughness = roughness;
            float csm_Metalness = metalness;
        #endif
        
        #ifdef USE_MAP
            vec4 _csm_sampledDiffuseColor = texture2D(map, vUv);

            #ifdef DECODE_VIDEO_TEXTURE
            // inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)
            _csm_sampledDiffuseColor = vec4(mix(pow(_csm_sampledDiffuseColor.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), _csm_sampledDiffuseColor.rgb * 0.0773993808, vec3(lessThanEqual(_csm_sampledDiffuseColor.rgb, vec3(0.04045)))), _csm_sampledDiffuseColor.w);
            #endif

            vec4 csm_DiffuseColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
            vec4 csm_FragColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
        #else
            vec4 csm_DiffuseColor = vec4(diffuse, opacity);
            vec4 csm_FragColor = vec4(diffuse, opacity);
        #endif
    #endif
#endif
`,D=(e,t,n)=>e.split(t).join(n),j=(e,t)=>RegExp(`\\b${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}\\b`).test(e);class N extends h.Material{constructor({baseMaterial:e,fragmentShader:t,vertexShader:n,uniforms:r,patchMap:i,cacheKey:o,...a}){let l;if(function(e){try{new e}catch(e){if(e.message.indexOf("is not a constructor")>=0)return!1}return!0}(e)?l=new e(a):Object.assign(l=e,a),"RawShaderMaterial"===l.type)throw Error("CustomShaderMaterial does not support RawShaderMaterial");for(let a in super(),this.uniforms=r||{},this._customPatchMap=i||{},this._fs=t||"",this._vs=n||"",this._cacheKey=o,this._base=e,this._type=l.type,this._instanceID=h.MathUtils.generateUUID(),l){let e=a;a.startsWith("_")&&(e=a.split("_")[1]),void 0===this[e]&&(this[e]=0),this[e]=l[e]}this.update({fragmentShader:t,vertexShader:n,uniforms:r,cacheKey:o})}update(e){let t=(null==e?void 0:e.uniforms)||{},n=(null==e?void 0:e.fragmentShader)||this._fs,r=(null==e?void 0:e.vertexShader)||this._vs,i=Object.values(t).reduce((e,{value:t})=>e+JSON.stringify(t),"");this.uuid=(null==e?void 0:null==e.cacheKey?void 0:e.cacheKey())||S()([n,r,i,this._instanceID]),this.generateMaterial({fragmentShader:n,vertexShader:r,uniforms:t})}clone(){let e=new this.constructor({baseMaterial:this._base,fragmentShader:this._fs,vertexShader:this._vs,patchMap:this._customPatchMap,uniforms:this.uniforms,cacheKey:this._cacheKey});for(let t in this)"uuid"!==t&&(e[t]=this[t]);return e}generateMaterial({fragmentShader:e,vertexShader:t,uniforms:n}){let r=this.parseShader(e),i=this.parseShader(t);this.uniforms=n||{},this.customProgramCacheKey=()=>this.uuid,this.onBeforeCompile=e=>{if(r){let t=this.patchShader(r,e.fragmentShader);e.fragmentShader=this.getMaterialDefine()+t}if(i){let t=this.patchShader(i,e.vertexShader);e.vertexShader="#define IS_VERTEX;\n"+t,e.vertexShader=this.getMaterialDefine()+e.vertexShader}e.uniforms={...e.uniforms,...this.uniforms},this.uniforms=e.uniforms},this.needsUpdate=!0}getMaterialDefine(){return`#define IS_${this._type.toUpperCase()};
`}getPatchMapForMaterial(){return"ShaderMaterial"===this._type?I:R}patchShader(e,t){let n=t,r={...this.getPatchMapForMaterial(),...this._customPatchMap};return Object.keys(r).forEach(t=>{Object.keys(r[t]).forEach(i=>{j(e.main,t)&&(n=D(n,i,r[t][i]))})}),n=n.replace("void main() {",`
          ${e.header}
          void main() {
            ${L}
            ${e.main}
          `),n=e.defines+n}parseShader(e){if(!e)return;let t=e.replace(/\/\*\*(.*?)\*\/|\/\/(.*?)\n/gm,""),n=g()(t),r=w()(n),i=r.map(e=>e.name).indexOf("main");return{defines:"",header:b()(n.slice(0,i>=0?r[i].outer[0]:void 0)),main:i>=0?this.getShaderFromIndex(n,r[i].body):""}}getShaderFromIndex(e,t){return b()(e.slice(t[0],t[1]))}}n(38751);var U=n(30967),B=n(22174),V=n(46191),F=n(94790),H=n(42669),W=n(41028),K=n(4129);function G(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}function Y(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function q(...e){return f.useCallback(Y(...e),e)}var Z=n(52676),X=f.forwardRef((e,t)=>{let{children:n,...r}=e,i=f.Children.toArray(n),o=i.find(ee);if(o){let e=o.props.children,n=i.map(t=>t!==o?t:f.Children.count(e)>1?f.Children.only(null):f.isValidElement(e)?e.props.children:null);return(0,Z.jsx)(J,{...r,ref:t,children:f.isValidElement(e)?f.cloneElement(e,void 0,n):null})}return(0,Z.jsx)(J,{...r,ref:t,children:n})});X.displayName="Slot";var J=f.forwardRef((e,t)=>{let{children:n,...r}=e;if(f.isValidElement(n)){let e,i;let o=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref;return f.cloneElement(n,{...function(e,t){let n={...t};for(let r in t){let i=e[r],o=t[r];/^on[A-Z]/.test(r)?i&&o?n[r]=(...e)=>{o(...e),i(...e)}:i&&(n[r]=i):"style"===r?n[r]={...i,...o}:"className"===r&&(n[r]=[i,o].filter(Boolean).join(" "))}return{...e,...n}}(r,n.props),ref:t?Y(t,o):o})}return f.Children.count(n)>1?f.Children.only(null):null});J.displayName="SlotClone";var Q=({children:e})=>(0,Z.jsx)(Z.Fragment,{children:e});function ee(e){return f.isValidElement(e)&&e.type===Q}var et=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=f.forwardRef((e,n)=>{let{asChild:r,...i}=e,o=r?X:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,Z.jsx)(o,{...i,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function en(e){let t=f.useRef(e);return f.useEffect(()=>{t.current=e}),f.useMemo(()=>(...e)=>t.current?.(...e),[])}var er="dismissableLayer.update",ei=f.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),eo=f.forwardRef((e,t)=>{let{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:i,onFocusOutside:o,onInteractOutside:a,onDismiss:l,...s}=e,u=f.useContext(ei),[d,p]=f.useState(null),h=d?.ownerDocument??globalThis?.document,[,m]=f.useState({}),g=q(t,e=>p(e)),v=Array.from(u.layers),[y]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),x=v.indexOf(y),b=d?v.indexOf(d):-1,_=u.layersWithOutsidePointerEventsDisabled.size>0,w=b>=x,E=function(e,t=globalThis?.document){let n=en(e),r=f.useRef(!1),i=f.useRef(()=>{});return f.useEffect(()=>{let e=e=>{if(e.target&&!r.current){let r=function(){el("dismissableLayer.pointerDownOutside",n,o,{discrete:!0})},o={originalEvent:e};"touch"===e.pointerType?(t.removeEventListener("click",i.current),i.current=r,t.addEventListener("click",i.current,{once:!0})):r()}else t.removeEventListener("click",i.current);r.current=!1},o=window.setTimeout(()=>{t.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(o),t.removeEventListener("pointerdown",e),t.removeEventListener("click",i.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}(e=>{let t=e.target,n=[...u.branches].some(e=>e.contains(t));!w||n||(i?.(e),a?.(e),e.defaultPrevented||l?.())},h),S=function(e,t=globalThis?.document){let n=en(e),r=f.useRef(!1);return f.useEffect(()=>{let e=e=>{e.target&&!r.current&&el("dismissableLayer.focusOutside",n,{originalEvent:e},{discrete:!1})};return t.addEventListener("focusin",e),()=>t.removeEventListener("focusin",e)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}(e=>{let t=e.target;[...u.branches].some(e=>e.contains(t))||(o?.(e),a?.(e),e.defaultPrevented||l?.())},h);return function(e,t=globalThis?.document){let n=en(e);f.useEffect(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e,{capture:!0}),()=>t.removeEventListener("keydown",e,{capture:!0})},[n,t])}(e=>{b!==u.layers.size-1||(r?.(e),!e.defaultPrevented&&l&&(e.preventDefault(),l()))},h),f.useEffect(()=>{if(d)return n&&(0===u.layersWithOutsidePointerEventsDisabled.size&&(c=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(d)),u.layers.add(d),ea(),()=>{n&&1===u.layersWithOutsidePointerEventsDisabled.size&&(h.body.style.pointerEvents=c)}},[d,h,n,u]),f.useEffect(()=>()=>{d&&(u.layers.delete(d),u.layersWithOutsidePointerEventsDisabled.delete(d),ea())},[d,u]),f.useEffect(()=>{let e=()=>m({});return document.addEventListener(er,e),()=>document.removeEventListener(er,e)},[]),(0,Z.jsx)(et.div,{...s,ref:g,style:{pointerEvents:_?w?"auto":"none":void 0,...e.style},onFocusCapture:G(e.onFocusCapture,S.onFocusCapture),onBlurCapture:G(e.onBlurCapture,S.onBlurCapture),onPointerDownCapture:G(e.onPointerDownCapture,E.onPointerDownCapture)})});function ea(){let e=new CustomEvent(er);document.dispatchEvent(e)}function el(e,t,n,{discrete:r}){let i=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});(t&&i.addEventListener(e,t,{once:!0}),r)?i&&U.flushSync(()=>i.dispatchEvent(o)):i.dispatchEvent(o)}eo.displayName="DismissableLayer",f.forwardRef((e,t)=>{let n=f.useContext(ei),r=f.useRef(null),i=q(t,r);return f.useEffect(()=>{let e=r.current;if(e)return n.branches.add(e),()=>{n.branches.delete(e)}},[n.branches]),(0,Z.jsx)(et.div,{...e,ref:i})}).displayName="DismissableLayerBranch";var es=globalThis?.document?f.useLayoutEffect:()=>{},ec=p["useId".toString()]||(()=>void 0),eu=0;let ed=["top","right","bottom","left"],ef=Math.min,ep=Math.max,eh=Math.round,em=Math.floor,eg=e=>({x:e,y:e}),ev={left:"right",right:"left",bottom:"top",top:"bottom"},ey={start:"end",end:"start"};function ex(e,t){return"function"==typeof e?e(t):e}function eb(e){return e.split("-")[0]}function e_(e){return e.split("-")[1]}function ew(e){return"x"===e?"y":"x"}function eE(e){return"y"===e?"height":"width"}function eS(e){return["top","bottom"].includes(eb(e))?"y":"x"}function eP(e){return e.replace(/start|end/g,e=>ey[e])}function eM(e){return e.replace(/left|right|bottom|top/g,e=>ev[e])}function eC(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function eT(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function ez(e,t,n){let r,{reference:i,floating:o}=e,a=eS(t),l=ew(eS(t)),s=eE(l),c=eb(t),u="y"===a,d=i.x+i.width/2-o.width/2,f=i.y+i.height/2-o.height/2,p=i[s]/2-o[s]/2;switch(c){case"top":r={x:d,y:i.y-o.height};break;case"bottom":r={x:d,y:i.y+i.height};break;case"right":r={x:i.x+i.width,y:f};break;case"left":r={x:i.x-o.width,y:f};break;default:r={x:i.x,y:i.y}}switch(e_(t)){case"start":r[l]-=p*(n&&u?-1:1);break;case"end":r[l]+=p*(n&&u?-1:1)}return r}let eA=async(e,t,n)=>{let{placement:r="bottom",strategy:i="absolute",middleware:o=[],platform:a}=n,l=o.filter(Boolean),s=await (null==a.isRTL?void 0:a.isRTL(t)),c=await a.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=ez(c,r,s),f=r,p={},h=0;for(let n=0;n<l.length;n++){let{name:o,fn:m}=l[n],{x:g,y:v,data:y,reset:x}=await m({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:p,rects:c,platform:a,elements:{reference:e,floating:t}});u=null!=g?g:u,d=null!=v?v:d,p={...p,[o]:{...p[o],...y}},x&&h<=50&&(h++,"object"==typeof x&&(x.placement&&(f=x.placement),x.rects&&(c=!0===x.rects?await a.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=ez(c,f,s)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:p}};async function eO(e,t){var n;void 0===t&&(t={});let{x:r,y:i,platform:o,rects:a,elements:l,strategy:s}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:f=!1,padding:p=0}=ex(t,e),h=eC(p),m=l[f?"floating"===d?"reference":"floating":d],g=eT(await o.getClippingRect({element:null==(n=await (null==o.isElement?void 0:o.isElement(m)))||n?m:m.contextElement||await (null==o.getDocumentElement?void 0:o.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:s})),v="floating"===d?{x:r,y:i,width:a.floating.width,height:a.floating.height}:a.reference,y=await (null==o.getOffsetParent?void 0:o.getOffsetParent(l.floating)),x=await (null==o.isElement?void 0:o.isElement(y))&&await (null==o.getScale?void 0:o.getScale(y))||{x:1,y:1},b=eT(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:v,offsetParent:y,strategy:s}):v);return{top:(g.top-b.top+h.top)/x.y,bottom:(b.bottom-g.bottom+h.bottom)/x.y,left:(g.left-b.left+h.left)/x.x,right:(b.right-g.right+h.right)/x.x}}function e$(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function ek(e){return ed.some(t=>e[t]>=0)}async function eR(e,t){let{placement:n,platform:r,elements:i}=e,o=await (null==r.isRTL?void 0:r.isRTL(i.floating)),a=eb(n),l=e_(n),s="y"===eS(n),c=["left","top"].includes(a)?-1:1,u=o&&s?-1:1,d=ex(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:h}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&"number"==typeof h&&(p="end"===l?-1*h:h),s?{x:p*u,y:f*c}:{x:f*c,y:p*u}}function eI(){return"undefined"!=typeof window}function eL(e){return eN(e)?(e.nodeName||"").toLowerCase():"#document"}function eD(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function ej(e){var t;return null==(t=(eN(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function eN(e){return!!eI()&&(e instanceof Node||e instanceof eD(e).Node)}function eU(e){return!!eI()&&(e instanceof Element||e instanceof eD(e).Element)}function eB(e){return!!eI()&&(e instanceof HTMLElement||e instanceof eD(e).HTMLElement)}function eV(e){return!!eI()&&"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof eD(e).ShadowRoot)}function eF(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=eY(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(i)}function eH(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch(e){return!1}})}function eW(e){let t=eK(),n=eU(e)?eY(e):e;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(e=>(n.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(n.contain||"").includes(e))}function eK(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function eG(e){return["html","body","#document"].includes(eL(e))}function eY(e){return eD(e).getComputedStyle(e)}function eq(e){return eU(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function eZ(e){if("html"===eL(e))return e;let t=e.assignedSlot||e.parentNode||eV(e)&&e.host||ej(e);return eV(t)?t.host:t}function eX(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);let i=function e(t){let n=eZ(t);return eG(n)?t.ownerDocument?t.ownerDocument.body:t.body:eB(n)&&eF(n)?n:e(n)}(e),o=i===(null==(r=e.ownerDocument)?void 0:r.body),a=eD(i);if(o){let e=eJ(a);return t.concat(a,a.visualViewport||[],eF(i)?i:[],e&&n?eX(e):[])}return t.concat(i,eX(i,[],n))}function eJ(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function eQ(e){let t=eY(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=eB(e),o=i?e.offsetWidth:n,a=i?e.offsetHeight:r,l=eh(n)!==o||eh(r)!==a;return l&&(n=o,r=a),{width:n,height:r,$:l}}function e0(e){return eU(e)?e:e.contextElement}function e1(e){let t=e0(e);if(!eB(t))return eg(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:o}=eQ(t),a=(o?eh(n.width):n.width)/r,l=(o?eh(n.height):n.height)/i;return a&&Number.isFinite(a)||(a=1),l&&Number.isFinite(l)||(l=1),{x:a,y:l}}let e2=eg(0);function e3(e){let t=eD(e);return eK()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:e2}function e4(e,t,n,r){var i;void 0===t&&(t=!1),void 0===n&&(n=!1);let o=e.getBoundingClientRect(),a=e0(e),l=eg(1);t&&(r?eU(r)&&(l=e1(r)):l=e1(e));let s=(void 0===(i=n)&&(i=!1),r&&(!i||r===eD(a))&&i)?e3(a):eg(0),c=(o.left+s.x)/l.x,u=(o.top+s.y)/l.y,d=o.width/l.x,f=o.height/l.y;if(a){let e=eD(a),t=r&&eU(r)?eD(r):r,n=e,i=eJ(n);for(;i&&r&&t!==n;){let e=e1(i),t=i.getBoundingClientRect(),r=eY(i),o=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,u*=e.y,d*=e.x,f*=e.y,c+=o,u+=a,i=eJ(n=eD(i))}}return eT({width:d,height:f,x:c,y:u})}function e5(e,t){let n=eq(e).scrollLeft;return t?t.left+n:e4(ej(e)).left+n}function e6(e,t,n){void 0===n&&(n=!1);let r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-(n?0:e5(e,r)),y:r.top+t.scrollTop}}function e9(e,t,n){let r;if("viewport"===t)r=function(e,t){let n=eD(e),r=ej(e),i=n.visualViewport,o=r.clientWidth,a=r.clientHeight,l=0,s=0;if(i){o=i.width,a=i.height;let e=eK();(!e||e&&"fixed"===t)&&(l=i.offsetLeft,s=i.offsetTop)}return{width:o,height:a,x:l,y:s}}(e,n);else if("document"===t)r=function(e){let t=ej(e),n=eq(e),r=e.ownerDocument.body,i=ep(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),o=ep(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),a=-n.scrollLeft+e5(e),l=-n.scrollTop;return"rtl"===eY(r).direction&&(a+=ep(t.clientWidth,r.clientWidth)-i),{width:i,height:o,x:a,y:l}}(ej(e));else if(eU(t))r=function(e,t){let n=e4(e,!0,"fixed"===t),r=n.top+e.clientTop,i=n.left+e.clientLeft,o=eB(e)?e1(e):eg(1),a=e.clientWidth*o.x;return{width:a,height:e.clientHeight*o.y,x:i*o.x,y:r*o.y}}(t,n);else{let n=e3(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return eT(r)}function e8(e){return"static"===eY(e).position}function e7(e,t){if(!eB(e)||"fixed"===eY(e).position)return null;if(t)return t(e);let n=e.offsetParent;return ej(e)===n&&(n=n.ownerDocument.body),n}function te(e,t){let n=eD(e);if(eH(e))return n;if(!eB(e)){let t=eZ(e);for(;t&&!eG(t);){if(eU(t)&&!e8(t))return t;t=eZ(t)}return n}let r=e7(e,t);for(;r&&["table","td","th"].includes(eL(r))&&e8(r);)r=e7(r,t);return r&&eG(r)&&e8(r)&&!eW(r)?n:r||function(e){let t=eZ(e);for(;eB(t)&&!eG(t);){if(eW(t))return t;if(eH(t))break;t=eZ(t)}return null}(e)||n}let tt=async function(e){let t=this.getOffsetParent||te,n=this.getDimensions,r=await n(e.floating);return{reference:function(e,t,n){let r=eB(t),i=ej(t),o="fixed"===n,a=e4(e,!0,o,t),l={scrollLeft:0,scrollTop:0},s=eg(0);if(r||!r&&!o){if(("body"!==eL(t)||eF(i))&&(l=eq(t)),r){let e=e4(t,!0,o,t);s.x=e.x+t.clientLeft,s.y=e.y+t.clientTop}else i&&(s.x=e5(i))}let c=!i||r||o?eg(0):e6(i,l);return{x:a.left+l.scrollLeft-s.x-c.x,y:a.top+l.scrollTop-s.y-c.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},tn={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,o="fixed"===i,a=ej(r),l=!!t&&eH(t.floating);if(r===a||l&&o)return n;let s={scrollLeft:0,scrollTop:0},c=eg(1),u=eg(0),d=eB(r);if((d||!d&&!o)&&(("body"!==eL(r)||eF(a))&&(s=eq(r)),eB(r))){let e=e4(r);c=e1(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=!a||d||o?eg(0):e6(a,s,!0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-s.scrollLeft*c.x+u.x+f.x,y:n.y*c.y-s.scrollTop*c.y+u.y+f.y}},getDocumentElement:ej,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,o=[..."clippingAncestors"===n?eH(t)?[]:function(e,t){let n=t.get(e);if(n)return n;let r=eX(e,[],!1).filter(e=>eU(e)&&"body"!==eL(e)),i=null,o="fixed"===eY(e).position,a=o?eZ(e):e;for(;eU(a)&&!eG(a);){let t=eY(a),n=eW(a);n||"fixed"!==t.position||(i=null),(o?!n&&!i:!n&&"static"===t.position&&!!i&&["absolute","fixed"].includes(i.position)||eF(a)&&!n&&function e(t,n){let r=eZ(t);return!(r===n||!eU(r)||eG(r))&&("fixed"===eY(r).position||e(r,n))}(e,a))?r=r.filter(e=>e!==a):i=t,a=eZ(a)}return t.set(e,r),r}(t,this._c):[].concat(n),r],a=o[0],l=o.reduce((e,n)=>{let r=e9(t,n,i);return e.top=ep(r.top,e.top),e.right=ef(r.right,e.right),e.bottom=ef(r.bottom,e.bottom),e.left=ep(r.left,e.left),e},e9(t,a,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:te,getElementRects:tt,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:n}=eQ(e);return{width:t,height:n}},getScale:e1,isElement:eU,isRTL:function(e){return"rtl"===eY(e).direction}},tr=e=>({name:"arrow",options:e,async fn(t){let{x:n,y:r,placement:i,rects:o,platform:a,elements:l,middlewareData:s}=t,{element:c,padding:u=0}=ex(e,t)||{};if(null==c)return{};let d=eC(u),f={x:n,y:r},p=ew(eS(i)),h=eE(p),m=await a.getDimensions(c),g="y"===p,v=g?"clientHeight":"clientWidth",y=o.reference[h]+o.reference[p]-f[p]-o.floating[h],x=f[p]-o.reference[p],b=await (null==a.getOffsetParent?void 0:a.getOffsetParent(c)),_=b?b[v]:0;_&&await (null==a.isElement?void 0:a.isElement(b))||(_=l.floating[v]||o.floating[h]);let w=_/2-m[h]/2-1,E=ef(d[g?"top":"left"],w),S=ef(d[g?"bottom":"right"],w),P=_-m[h]-S,M=_/2-m[h]/2+(y/2-x/2),C=ep(E,ef(M,P)),T=!s.arrow&&null!=e_(i)&&M!==C&&o.reference[h]/2-(M<E?E:S)-m[h]/2<0,z=T?M<E?M-E:M-P:0;return{[p]:f[p]+z,data:{[p]:C,centerOffset:M-C-z,...T&&{alignmentOffset:z}},reset:T}}}),ti=(e,t,n)=>{let r=new Map,i={platform:tn,...n},o={...i.platform,_c:r};return eA(e,t,{...i,platform:o})};var to="undefined"!=typeof document?f.useLayoutEffect:f.useEffect;function ta(e,t){let n,r,i;if(e===t)return!0;if(typeof e!=typeof t)return!1;if("function"==typeof e&&e.toString()===t.toString())return!0;if(e&&t&&"object"==typeof e){if(Array.isArray(e)){if((n=e.length)!==t.length)return!1;for(r=n;0!=r--;)if(!ta(e[r],t[r]))return!1;return!0}if((n=(i=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(r=n;0!=r--;)if(!({}).hasOwnProperty.call(t,i[r]))return!1;for(r=n;0!=r--;){let n=i[r];if(("_owner"!==n||!e.$$typeof)&&!ta(e[n],t[n]))return!1}return!0}return e!=e&&t!=t}function tl(e){return"undefined"==typeof window?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function ts(e,t){let n=tl(e);return Math.round(t*n)/n}function tc(e){let t=f.useRef(e);return to(()=>{t.current=e}),t}let tu=e=>({name:"arrow",options:e,fn(t){let{element:n,padding:r}="function"==typeof e?e(t):e;return n&&({}).hasOwnProperty.call(n,"current")?null!=n.current?tr({element:n.current,padding:r}).fn(t):{}:n?tr({element:n,padding:r}).fn(t):{}}}),td=(e,t)=>{var n;return{...(void 0===(n=e)&&(n=0),{name:"offset",options:n,async fn(e){var t,r;let{x:i,y:o,placement:a,middlewareData:l}=e,s=await eR(e,n);return a===(null==(t=l.offset)?void 0:t.placement)&&null!=(r=l.arrow)&&r.alignmentOffset?{}:{x:i+s.x,y:o+s.y,data:{...s,placement:a}}}}),options:[e,t]}},tf=(e,t)=>{var n;return{...(void 0===(n=e)&&(n={}),{name:"shift",options:n,async fn(e){let{x:t,y:r,placement:i}=e,{mainAxis:o=!0,crossAxis:a=!1,limiter:l={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...s}=ex(n,e),c={x:t,y:r},u=await eO(e,s),d=eS(eb(i)),f=ew(d),p=c[f],h=c[d];if(o){let e="y"===f?"top":"left",t="y"===f?"bottom":"right",n=p+u[e],r=p-u[t];p=ep(n,ef(p,r))}if(a){let e="y"===d?"top":"left",t="y"===d?"bottom":"right",n=h+u[e],r=h-u[t];h=ep(n,ef(h,r))}let m=l.fn({...e,[f]:p,[d]:h});return{...m,data:{x:m.x-t,y:m.y-r,enabled:{[f]:o,[d]:a}}}}}),options:[e,t]}},tp=(e,t)=>{var n;return{...(void 0===(n=e)&&(n={}),{options:n,fn(e){let{x:t,y:r,placement:i,rects:o,middlewareData:a}=e,{offset:l=0,mainAxis:s=!0,crossAxis:c=!0}=ex(n,e),u={x:t,y:r},d=eS(i),f=ew(d),p=u[f],h=u[d],m=ex(l,e),g="number"==typeof m?{mainAxis:m,crossAxis:0}:{mainAxis:0,crossAxis:0,...m};if(s){let e="y"===f?"height":"width",t=o.reference[f]-o.floating[e]+g.mainAxis,n=o.reference[f]+o.reference[e]-g.mainAxis;p<t?p=t:p>n&&(p=n)}if(c){var v,y;let e="y"===f?"width":"height",t=["top","left"].includes(eb(i)),n=o.reference[d]-o.floating[e]+(t&&(null==(v=a.offset)?void 0:v[d])||0)+(t?0:g.crossAxis),r=o.reference[d]+o.reference[e]+(t?0:(null==(y=a.offset)?void 0:y[d])||0)-(t?g.crossAxis:0);h<n?h=n:h>r&&(h=r)}return{[f]:p,[d]:h}}}),options:[e,t]}},th=(e,t)=>{var n;return{...(void 0===(n=e)&&(n={}),{name:"flip",options:n,async fn(e){var t,r,i,o,a;let{placement:l,middlewareData:s,rects:c,initialPlacement:u,platform:d,elements:f}=e,{mainAxis:p=!0,crossAxis:h=!0,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:v="none",flipAlignment:y=!0,...x}=ex(n,e);if(null!=(t=s.arrow)&&t.alignmentOffset)return{};let b=eb(l),_=eS(u),w=eb(u)===u,E=await (null==d.isRTL?void 0:d.isRTL(f.floating)),S=m||(w||!y?[eM(u)]:function(e){let t=eM(e);return[eP(e),t,eP(t)]}(u)),P="none"!==v;!m&&P&&S.push(...function(e,t,n,r){let i=e_(e),o=function(e,t,n){let r=["left","right"],i=["right","left"];switch(e){case"top":case"bottom":if(n)return t?i:r;return t?r:i;case"left":case"right":return t?["top","bottom"]:["bottom","top"];default:return[]}}(eb(e),"start"===n,r);return i&&(o=o.map(e=>e+"-"+i),t&&(o=o.concat(o.map(eP)))),o}(u,y,v,E));let M=[u,...S],C=await eO(e,x),T=[],z=(null==(r=s.flip)?void 0:r.overflows)||[];if(p&&T.push(C[b]),h){let e=function(e,t,n){void 0===n&&(n=!1);let r=e_(e),i=ew(eS(e)),o=eE(i),a="x"===i?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[o]>t.floating[o]&&(a=eM(a)),[a,eM(a)]}(l,c,E);T.push(C[e[0]],C[e[1]])}if(z=[...z,{placement:l,overflows:T}],!T.every(e=>e<=0)){let e=((null==(i=s.flip)?void 0:i.index)||0)+1,t=M[e];if(t)return{data:{index:e,overflows:z},reset:{placement:t}};let n=null==(o=z.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:o.placement;if(!n)switch(g){case"bestFit":{let e=null==(a=z.filter(e=>{if(P){let t=eS(e.placement);return t===_||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(n=e);break}case"initialPlacement":n=u}if(l!==n)return{reset:{placement:n}}}return{}}}),options:[e,t]}},tm=(e,t)=>{var n;return{...(void 0===(n=e)&&(n={}),{name:"size",options:n,async fn(e){var t,r;let i,o;let{placement:a,rects:l,platform:s,elements:c}=e,{apply:u=()=>{},...d}=ex(n,e),f=await eO(e,d),p=eb(a),h=e_(a),m="y"===eS(a),{width:g,height:v}=l.floating;"top"===p||"bottom"===p?(i=p,o=h===(await (null==s.isRTL?void 0:s.isRTL(c.floating))?"start":"end")?"left":"right"):(o=p,i="end"===h?"top":"bottom");let y=v-f.top-f.bottom,x=g-f.left-f.right,b=ef(v-f[i],y),_=ef(g-f[o],x),w=!e.middlewareData.shift,E=b,S=_;if(null!=(t=e.middlewareData.shift)&&t.enabled.x&&(S=x),null!=(r=e.middlewareData.shift)&&r.enabled.y&&(E=y),w&&!h){let e=ep(f.left,0),t=ep(f.right,0),n=ep(f.top,0),r=ep(f.bottom,0);m?S=g-2*(0!==e||0!==t?e+t:ep(f.left,f.right)):E=v-2*(0!==n||0!==r?n+r:ep(f.top,f.bottom))}await u({...e,availableWidth:S,availableHeight:E});let P=await s.getDimensions(c.floating);return g!==P.width||v!==P.height?{reset:{rects:!0}}:{}}}),options:[e,t]}},tg=(e,t)=>{var n;return{...(void 0===(n=e)&&(n={}),{name:"hide",options:n,async fn(e){let{rects:t}=e,{strategy:r="referenceHidden",...i}=ex(n,e);switch(r){case"referenceHidden":{let n=e$(await eO(e,{...i,elementContext:"reference"}),t.reference);return{data:{referenceHiddenOffsets:n,referenceHidden:ek(n)}}}case"escaped":{let n=e$(await eO(e,{...i,altBoundary:!0}),t.floating);return{data:{escapedOffsets:n,escaped:ek(n)}}}default:return{}}}}),options:[e,t]}},tv=(e,t)=>({...tu(e),options:[e,t]});var ty=f.forwardRef((e,t)=>{let{children:n,width:r=10,height:i=5,...o}=e;return(0,Z.jsx)(et.svg,{...o,ref:t,width:r,height:i,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:(0,Z.jsx)("polygon",{points:"0,0 30,0 15,10"})})});ty.displayName="Arrow";var tx="Popper",[tb,t_]=function(e,t=[]){let n=[],r=()=>{let t=n.map(e=>f.createContext(e));return function(n){let r=n?.[e]||t;return f.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return r.scopeName=e,[function(t,r){let i=f.createContext(r),o=n.length;function a(t){let{scope:n,children:r,...a}=t,l=n?.[e][o]||i,s=f.useMemo(()=>a,Object.values(a));return(0,Z.jsx)(l.Provider,{value:s,children:r})}return n=[...n,r],a.displayName=t+"Provider",[a,function(n,a){let l=a?.[e][o]||i,s=f.useContext(l);if(s)return s;if(void 0!==r)return r;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let i=n(e)[`__scope${r}`];return{...t,...i}},{});return f.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(r,...t)]}(tx),[tw,tE]=tb(tx),tS=e=>{let{__scopePopper:t,children:n}=e,[r,i]=f.useState(null);return(0,Z.jsx)(tw,{scope:t,anchor:r,onAnchorChange:i,children:n})};tS.displayName=tx;var tP="PopperAnchor",tM=f.forwardRef((e,t)=>{let{__scopePopper:n,virtualRef:r,...i}=e,o=tE(tP,n),a=f.useRef(null),l=q(t,a);return f.useEffect(()=>{o.onAnchorChange(r?.current||a.current)}),r?null:(0,Z.jsx)(et.div,{...i,ref:l})});tM.displayName=tP;var tC="PopperContent",[tT,tz]=tb(tC),tA=f.forwardRef((e,t)=>{let{__scopePopper:n,side:r="bottom",sideOffset:i=0,align:o="center",alignOffset:a=0,arrowPadding:l=0,avoidCollisions:s=!0,collisionBoundary:c=[],collisionPadding:u=0,sticky:d="partial",hideWhenDetached:p=!1,updatePositionStrategy:h="optimized",onPlaced:m,...g}=e,v=tE(tC,n),[y,x]=f.useState(null),b=q(t,e=>x(e)),[_,w]=f.useState(null),E=function(e){let[t,n]=f.useState(void 0);return es(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let r,i;if(!Array.isArray(t)||!t.length)return;let o=t[0];if("borderBoxSize"in o){let e=o.borderBoxSize,t=Array.isArray(e)?e[0]:e;r=t.inlineSize,i=t.blockSize}else r=e.offsetWidth,i=e.offsetHeight;n({width:r,height:i})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}n(void 0)},[e]),t}(_),S=E?.width??0,P=E?.height??0,M="number"==typeof u?u:{top:0,right:0,bottom:0,left:0,...u},C=Array.isArray(c)?c:[c],T=C.length>0,z={padding:M,boundary:C.filter(tR),altBoundary:T},{refs:A,floatingStyles:O,placement:$,isPositioned:k,middlewareData:R}=function(e){void 0===e&&(e={});let{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:i,elements:{reference:o,floating:a}={},transform:l=!0,whileElementsMounted:s,open:c}=e,[u,d]=f.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[p,h]=f.useState(r);ta(p,r)||h(r);let[m,g]=f.useState(null),[v,y]=f.useState(null),x=f.useCallback(e=>{e!==E.current&&(E.current=e,g(e))},[]),b=f.useCallback(e=>{e!==S.current&&(S.current=e,y(e))},[]),_=o||m,w=a||v,E=f.useRef(null),S=f.useRef(null),P=f.useRef(u),M=null!=s,C=tc(s),T=tc(i),z=tc(c),A=f.useCallback(()=>{if(!E.current||!S.current)return;let e={placement:t,strategy:n,middleware:p};T.current&&(e.platform=T.current),ti(E.current,S.current,e).then(e=>{let t={...e,isPositioned:!1!==z.current};O.current&&!ta(P.current,t)&&(P.current=t,U.flushSync(()=>{d(t)}))})},[p,t,n,T,z]);to(()=>{!1===c&&P.current.isPositioned&&(P.current.isPositioned=!1,d(e=>({...e,isPositioned:!1})))},[c]);let O=f.useRef(!1);to(()=>(O.current=!0,()=>{O.current=!1}),[]),to(()=>{if(_&&(E.current=_),w&&(S.current=w),_&&w){if(C.current)return C.current(_,w,A);A()}},[_,w,A,C,M]);let $=f.useMemo(()=>({reference:E,floating:S,setReference:x,setFloating:b}),[x,b]),k=f.useMemo(()=>({reference:_,floating:w}),[_,w]),R=f.useMemo(()=>{let e={position:n,left:0,top:0};if(!k.floating)return e;let t=ts(k.floating,u.x),r=ts(k.floating,u.y);return l?{...e,transform:"translate("+t+"px, "+r+"px)",...tl(k.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:t,top:r}},[n,l,k.floating,u.x,u.y]);return f.useMemo(()=>({...u,update:A,refs:$,elements:k,floatingStyles:R}),[u,A,$,k,R])}({strategy:"fixed",placement:r+("center"!==o?"-"+o:""),whileElementsMounted:(...e)=>(function(e,t,n,r){let i;void 0===r&&(r={});let{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:l="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:c=!1}=r,u=e0(e),d=o||a?[...u?eX(u):[],...eX(t)]:[];d.forEach(e=>{o&&e.addEventListener("scroll",n,{passive:!0}),a&&e.addEventListener("resize",n)});let f=u&&s?function(e,t){let n,r=null,i=ej(e);function o(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function a(l,s){void 0===l&&(l=!1),void 0===s&&(s=1),o();let{left:c,top:u,width:d,height:f}=e.getBoundingClientRect();if(l||t(),!d||!f)return;let p=em(u),h=em(i.clientWidth-(c+d)),m={rootMargin:-p+"px "+-h+"px "+-em(i.clientHeight-(u+f))+"px "+-em(c)+"px",threshold:ep(0,ef(1,s))||1},g=!0;function v(e){let t=e[0].intersectionRatio;if(t!==s){if(!g)return a();t?a(!1,t):n=setTimeout(()=>{a(!1,1e-7)},1e3)}g=!1}try{r=new IntersectionObserver(v,{...m,root:i.ownerDocument})}catch(e){r=new IntersectionObserver(v,m)}r.observe(e)}(!0),o}(u,n):null,p=-1,h=null;l&&(h=new ResizeObserver(e=>{let[r]=e;r&&r.target===u&&h&&(h.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var e;null==(e=h)||e.observe(t)})),n()}),u&&!c&&h.observe(u),h.observe(t));let m=c?e4(e):null;return c&&function t(){let r=e4(e);m&&(r.x!==m.x||r.y!==m.y||r.width!==m.width||r.height!==m.height)&&n(),m=r,i=requestAnimationFrame(t)}(),n(),()=>{var e;d.forEach(e=>{o&&e.removeEventListener("scroll",n),a&&e.removeEventListener("resize",n)}),null==f||f(),null==(e=h)||e.disconnect(),h=null,c&&cancelAnimationFrame(i)}})(...e,{animationFrame:"always"===h}),elements:{reference:v.anchor},middleware:[td({mainAxis:i+P,alignmentAxis:a}),s&&tf({mainAxis:!0,crossAxis:!1,limiter:"partial"===d?tp():void 0,...z}),s&&th({...z}),tm({...z,apply:({elements:e,rects:t,availableWidth:n,availableHeight:r})=>{let{width:i,height:o}=t.reference,a=e.floating.style;a.setProperty("--radix-popper-available-width",`${n}px`),a.setProperty("--radix-popper-available-height",`${r}px`),a.setProperty("--radix-popper-anchor-width",`${i}px`),a.setProperty("--radix-popper-anchor-height",`${o}px`)}}),_&&tv({element:_,padding:l}),tI({arrowWidth:S,arrowHeight:P}),p&&tg({strategy:"referenceHidden",...z})]}),[I,L]=tL($),D=en(m);es(()=>{k&&D?.()},[k,D]);let j=R.arrow?.x,N=R.arrow?.y,B=R.arrow?.centerOffset!==0,[V,F]=f.useState();return es(()=>{y&&F(window.getComputedStyle(y).zIndex)},[y]),(0,Z.jsx)("div",{ref:A.setFloating,"data-radix-popper-content-wrapper":"",style:{...O,transform:k?O.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:V,"--radix-popper-transform-origin":[R.transformOrigin?.x,R.transformOrigin?.y].join(" "),...R.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:(0,Z.jsx)(tT,{scope:n,placedSide:I,onArrowChange:w,arrowX:j,arrowY:N,shouldHideArrow:B,children:(0,Z.jsx)(et.div,{"data-side":I,"data-align":L,...g,ref:b,style:{...g.style,animation:k?void 0:"none"}})})})});tA.displayName=tC;var tO="PopperArrow",t$={top:"bottom",right:"left",bottom:"top",left:"right"},tk=f.forwardRef(function(e,t){let{__scopePopper:n,...r}=e,i=tz(tO,n),o=t$[i.placedSide];return(0,Z.jsx)("span",{ref:i.onArrowChange,style:{position:"absolute",left:i.arrowX,top:i.arrowY,[o]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[i.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[i.placedSide],visibility:i.shouldHideArrow?"hidden":void 0},children:(0,Z.jsx)(ty,{...r,ref:t,style:{...r.style,display:"block"}})})});function tR(e){return null!==e}tk.displayName=tO;var tI=e=>({name:"transformOrigin",options:e,fn(t){let{placement:n,rects:r,middlewareData:i}=t,o=i.arrow?.centerOffset!==0,a=o?0:e.arrowWidth,l=o?0:e.arrowHeight,[s,c]=tL(n),u={start:"0%",center:"50%",end:"100%"}[c],d=(i.arrow?.x??0)+a/2,f=(i.arrow?.y??0)+l/2,p="",h="";return"bottom"===s?(p=o?u:`${d}px`,h=`${-l}px`):"top"===s?(p=o?u:`${d}px`,h=`${r.floating.height+l}px`):"right"===s?(p=`${-l}px`,h=o?u:`${f}px`):"left"===s&&(p=`${r.floating.width+l}px`,h=o?u:`${f}px`),{data:{x:p,y:h}}}});function tL(e){let[t,n="center"]=e.split("-");return[t,n]}f.forwardRef((e,t)=>{let{container:n,...r}=e,[i,o]=f.useState(!1);es(()=>o(!0),[]);let a=n||i&&globalThis?.document?.body;return a?U.createPortal((0,Z.jsx)(et.div,{...r,ref:t}),a):null}).displayName="Portal";var tD=e=>{let t,n;let{present:r,children:i}=e,o=function(e){var t,n;let[r,i]=f.useState(),o=f.useRef({}),a=f.useRef(e),l=f.useRef("none"),[s,c]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},f.useReducer((e,t)=>n[e][t]??e,t));return f.useEffect(()=>{let e=tj(o.current);l.current="mounted"===s?e:"none"},[s]),es(()=>{let t=o.current,n=a.current;if(n!==e){let r=l.current,i=tj(t);e?c("MOUNT"):"none"===i||t?.display==="none"?c("UNMOUNT"):n&&r!==i?c("ANIMATION_OUT"):c("UNMOUNT"),a.current=e}},[e,c]),es(()=>{if(r){let e;let t=r.ownerDocument.defaultView??window,n=n=>{let i=tj(o.current).includes(n.animationName);if(n.target===r&&i&&(c("ANIMATION_END"),!a.current)){let n=r.style.animationFillMode;r.style.animationFillMode="forwards",e=t.setTimeout(()=>{"forwards"===r.style.animationFillMode&&(r.style.animationFillMode=n)})}},i=e=>{e.target===r&&(l.current=tj(o.current))};return r.addEventListener("animationstart",i),r.addEventListener("animationcancel",n),r.addEventListener("animationend",n),()=>{t.clearTimeout(e),r.removeEventListener("animationstart",i),r.removeEventListener("animationcancel",n),r.removeEventListener("animationend",n)}}c("ANIMATION_END")},[r,c]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:f.useCallback(e=>{e&&(o.current=getComputedStyle(e)),i(e)},[])}}(r),a="function"==typeof i?i({present:o.isPresent}):f.Children.only(i),l=q(o.ref,(t=Object.getOwnPropertyDescriptor(a.props,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning?a.ref:(t=Object.getOwnPropertyDescriptor(a,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning?a.props.ref:a.props.ref||a.ref);return"function"==typeof i||o.isPresent?f.cloneElement(a,{ref:l}):null};function tj(e){return e?.animationName||"none"}tD.displayName="Presence";var tN=f.forwardRef((e,t)=>(0,Z.jsx)(et.span,{...e,ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));tN.displayName="VisuallyHidden";var[tU,tB]=function(e,t=[]){let n=[],r=()=>{let t=n.map(e=>f.createContext(e));return function(n){let r=n?.[e]||t;return f.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return r.scopeName=e,[function(t,r){let i=f.createContext(r),o=n.length;n=[...n,r];let a=t=>{let{scope:n,children:r,...a}=t,l=n?.[e]?.[o]||i,s=f.useMemo(()=>a,Object.values(a));return(0,Z.jsx)(l.Provider,{value:s,children:r})};return a.displayName=t+"Provider",[a,function(n,a){let l=a?.[e]?.[o]||i,s=f.useContext(l);if(s)return s;if(void 0!==r)return r;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let i=n(e)[`__scope${r}`];return{...t,...i}},{});return f.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(r,...t)]}("Tooltip",[t_]),tV=t_(),tF="tooltip.open",[tH,tW]=tU("TooltipProvider"),tK="Tooltip",[tG,tY]=tU(tK),tq=e=>{let{__scopeTooltip:t,children:n,open:r,defaultOpen:i=!1,onOpenChange:o,disableHoverableContent:a,delayDuration:l}=e,s=tW(tK,e.__scopeTooltip),c=tV(t),[u,d]=f.useState(null),p=function(e){let[t,n]=f.useState(ec());return es(()=>{n(e=>e??String(eu++))},[void 0]),t?`radix-${t}`:""}(),h=f.useRef(0),m=a??s.disableHoverableContent,g=l??s.delayDuration,v=f.useRef(!1),[y=!1,x]=function({prop:e,defaultProp:t,onChange:n=()=>{}}){let[r,i]=function({defaultProp:e,onChange:t}){let n=f.useState(e),[r]=n,i=f.useRef(r),o=en(t);return f.useEffect(()=>{i.current!==r&&(o(r),i.current=r)},[r,i,o]),n}({defaultProp:t,onChange:n}),o=void 0!==e,a=o?e:r,l=en(n);return[a,f.useCallback(t=>{if(o){let n="function"==typeof t?t(e):t;n!==e&&l(n)}else i(t)},[o,e,i,l])]}({prop:r,defaultProp:i,onChange:e=>{e?(s.onOpen(),document.dispatchEvent(new CustomEvent(tF))):s.onClose(),o?.(e)}}),b=f.useMemo(()=>y?v.current?"delayed-open":"instant-open":"closed",[y]),_=f.useCallback(()=>{window.clearTimeout(h.current),h.current=0,v.current=!1,x(!0)},[x]),w=f.useCallback(()=>{window.clearTimeout(h.current),h.current=0,x(!1)},[x]),E=f.useCallback(()=>{window.clearTimeout(h.current),h.current=window.setTimeout(()=>{v.current=!0,x(!0),h.current=0},g)},[g,x]);return f.useEffect(()=>()=>{h.current&&(window.clearTimeout(h.current),h.current=0)},[]),(0,Z.jsx)(tS,{...c,children:(0,Z.jsx)(tG,{scope:t,contentId:p,open:y,stateAttribute:b,trigger:u,onTriggerChange:d,onTriggerEnter:f.useCallback(()=>{s.isOpenDelayed?E():_()},[s.isOpenDelayed,E,_]),onTriggerLeave:f.useCallback(()=>{m?w():(window.clearTimeout(h.current),h.current=0)},[w,m]),onOpen:_,onClose:w,disableHoverableContent:m,children:n})})};tq.displayName=tK;var tZ="TooltipTrigger",tX=f.forwardRef((e,t)=>{let{__scopeTooltip:n,...r}=e,i=tY(tZ,n),o=tW(tZ,n),a=tV(n),l=q(t,f.useRef(null),i.onTriggerChange),s=f.useRef(!1),c=f.useRef(!1),u=f.useCallback(()=>s.current=!1,[]);return f.useEffect(()=>()=>document.removeEventListener("pointerup",u),[u]),(0,Z.jsx)(tM,{asChild:!0,...a,children:(0,Z.jsx)(et.button,{"aria-describedby":i.open?i.contentId:void 0,"data-state":i.stateAttribute,...r,ref:l,onPointerMove:G(e.onPointerMove,e=>{"touch"===e.pointerType||c.current||o.isPointerInTransitRef.current||(i.onTriggerEnter(),c.current=!0)}),onPointerLeave:G(e.onPointerLeave,()=>{i.onTriggerLeave(),c.current=!1}),onPointerDown:G(e.onPointerDown,()=>{s.current=!0,document.addEventListener("pointerup",u,{once:!0})}),onFocus:G(e.onFocus,()=>{s.current||i.onOpen()}),onBlur:G(e.onBlur,i.onClose),onClick:G(e.onClick,i.onClose)})})});tX.displayName=tZ;var[tJ,tQ]=tU("TooltipPortal",{forceMount:void 0}),t0="TooltipContent",t1=f.forwardRef((e,t)=>{let n=tQ(t0,e.__scopeTooltip),{forceMount:r=n.forceMount,side:i="top",...o}=e,a=tY(t0,e.__scopeTooltip);return(0,Z.jsx)(tD,{present:r||a.open,children:a.disableHoverableContent?(0,Z.jsx)(t5,{side:i,...o,ref:t}):(0,Z.jsx)(t2,{side:i,...o,ref:t})})}),t2=f.forwardRef((e,t)=>{let n=tY(t0,e.__scopeTooltip),r=tW(t0,e.__scopeTooltip),i=f.useRef(null),o=q(t,i),[a,l]=f.useState(null),{trigger:s,onClose:c}=n,u=i.current,{onPointerInTransitChange:d}=r,p=f.useCallback(()=>{l(null),d(!1)},[d]),h=f.useCallback((e,t)=>{let n=e.currentTarget,r={x:e.clientX,y:e.clientY},i=function(e,t){let n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),i=Math.abs(t.right-e.x),o=Math.abs(t.left-e.x);switch(Math.min(n,r,i,o)){case o:return"left";case i:return"right";case n:return"top";case r:return"bottom";default:throw Error("unreachable")}}(r,n.getBoundingClientRect());l(function(e){let t=e.slice();return t.sort((e,t)=>e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:e.y>t.y?1:0),function(e){if(e.length<=1)return e.slice();let t=[];for(let n=0;n<e.length;n++){let r=e[n];for(;t.length>=2;){let e=t[t.length-1],n=t[t.length-2];if((e.x-n.x)*(r.y-n.y)>=(e.y-n.y)*(r.x-n.x))t.pop();else break}t.push(r)}t.pop();let n=[];for(let t=e.length-1;t>=0;t--){let r=e[t];for(;n.length>=2;){let e=n[n.length-1],t=n[n.length-2];if((e.x-t.x)*(r.y-t.y)>=(e.y-t.y)*(r.x-t.x))n.pop();else break}n.push(r)}return(n.pop(),1===t.length&&1===n.length&&t[0].x===n[0].x&&t[0].y===n[0].y)?t:t.concat(n)}(t)}([...function(e,t,n=5){let r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n})}return r}(r,i),...function(e){let{top:t,right:n,bottom:r,left:i}=e;return[{x:i,y:t},{x:n,y:t},{x:n,y:r},{x:i,y:r}]}(t.getBoundingClientRect())])),d(!0)},[d]);return f.useEffect(()=>()=>p(),[p]),f.useEffect(()=>{if(s&&u){let e=e=>h(e,u),t=e=>h(e,s);return s.addEventListener("pointerleave",e),u.addEventListener("pointerleave",t),()=>{s.removeEventListener("pointerleave",e),u.removeEventListener("pointerleave",t)}}},[s,u,h,p]),f.useEffect(()=>{if(a){let e=e=>{let t=e.target,n={x:e.clientX,y:e.clientY},r=s?.contains(t)||u?.contains(t),i=!function(e,t){let{x:n,y:r}=e,i=!1;for(let e=0,o=t.length-1;e<t.length;o=e++){let a=t[e].x,l=t[e].y,s=t[o].x,c=t[o].y;l>r!=c>r&&n<(s-a)*(r-l)/(c-l)+a&&(i=!i)}return i}(n,a);r?p():i&&(p(),c())};return document.addEventListener("pointermove",e),()=>document.removeEventListener("pointermove",e)}},[s,u,a,c,p]),(0,Z.jsx)(t5,{...e,ref:o})}),[t3,t4]=tU(tK,{isInside:!1}),t5=f.forwardRef((e,t)=>{let{__scopeTooltip:n,children:r,"aria-label":i,onEscapeKeyDown:o,onPointerDownOutside:a,...l}=e,s=tY(t0,n),c=tV(n),{onClose:u}=s;return f.useEffect(()=>(document.addEventListener(tF,u),()=>document.removeEventListener(tF,u)),[u]),f.useEffect(()=>{if(s.trigger){let e=e=>{let t=e.target;t?.contains(s.trigger)&&u()};return window.addEventListener("scroll",e,{capture:!0}),()=>window.removeEventListener("scroll",e,{capture:!0})}},[s.trigger,u]),(0,Z.jsx)(eo,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:o,onPointerDownOutside:a,onFocusOutside:e=>e.preventDefault(),onDismiss:u,children:(0,Z.jsxs)(tA,{"data-state":s.stateAttribute,...c,...l,ref:t,style:{...l.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[(0,Z.jsx)(Q,{children:r}),(0,Z.jsx)(t3,{scope:n,isInside:!0,children:(0,Z.jsx)(tN,{id:s.contentId,role:"tooltip",children:i||r})})]})})});t1.displayName=t0;var t6="TooltipArrow",t9=f.forwardRef((e,t)=>{let{__scopeTooltip:n,...r}=e,i=tV(n);return t4(t6,n).isInside?null:(0,Z.jsx)(tk,{...i,...r,ref:t})});function t8(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}t9.displayName=t6,(a=r||(r={}))[a.UNSUPPORTED_INPUT=0]="UNSUPPORTED_INPUT",a[a.NO_COMPONENT_FOR_TYPE=1]="NO_COMPONENT_FOR_TYPE",a[a.UNKNOWN_INPUT=2]="UNKNOWN_INPUT",a[a.DUPLICATE_KEYS=3]="DUPLICATE_KEYS",a[a.ALREADY_REGISTERED_TYPE=4]="ALREADY_REGISTERED_TYPE",a[a.CLIPBOARD_ERROR=5]="CLIPBOARD_ERROR",a[a.THEME_ERROR=6]="THEME_ERROR",a[a.PATH_DOESNT_EXIST=7]="PATH_DOESNT_EXIST",a[a.INPUT_TYPE_OVERRIDE=8]="INPUT_TYPE_OVERRIDE",a[a.EMPTY_KEY=9]="EMPTY_KEY";let t7={[r.UNSUPPORTED_INPUT]:(e,t)=>[`An input with type \`${e}\` input was found at path \`${t}\` but it's not supported yet.`],[r.NO_COMPONENT_FOR_TYPE]:(e,t)=>[`Type \`${e}\` found at path \`${t}\` can't be displayed in panel because no component supports it yet.`],[r.UNKNOWN_INPUT]:(e,t)=>[`input at path \`${e}\` is not recognized.`,t],[r.DUPLICATE_KEYS]:(e,t,n)=>[`Key \`${e}\` of path \`${t}\` already exists at path \`${n}\`. Even nested keys need to be unique. Rename one of the keys.`],[r.ALREADY_REGISTERED_TYPE]:e=>[`Type ${e} has already been registered. You can't register a component with the same type.`],[r.CLIPBOARD_ERROR]:e=>["Error copying the value",e],[r.THEME_ERROR]:(e,t)=>[`Error accessing the theme \`${e}.${t}\` value.`],[r.PATH_DOESNT_EXIST]:e=>[`Error getting the value at path \`${e}\`. There is probably an error in your \`render\` function.`],[r.PATH_DOESNT_EXIST]:e=>[`Error accessing the value at path \`${e}\``],[r.INPUT_TYPE_OVERRIDE]:(e,t,n)=>[`Input at path \`${e}\` already exists with type: \`${t}\`. Its type cannot be overridden with type \`${n}\`.`],[r.EMPTY_KEY]:()=>["Keys can not be empty, if you want to hide a label use whitespace."]};function ne(e,t,...n){let[r,...i]=t7[t](...n);console[e]("LEVA: "+r,...i)}let nt=ne.bind(null,"warn"),nn=ne.bind(null,"log"),nr=["value"],ni=["schema"],no=["value"],na=[],nl={};function ns(e){let{value:t}=e,n=t8(e,nr);for(let e of na){let r=e(t,n);if(r)return r}}function nc(e,t){let{schema:n}=t,i=t8(t,ni);if(e in nl){nt(r.ALREADY_REGISTERED_TYPE,e);return}na.push((t,r)=>n(t,r)&&e),nl[e]=i}function nu(e,t,n,r){let{normalize:i}=nl[e];if(i)return i(t,n,r);if("object"!=typeof t||!("value"in t))return{value:t};let{value:o}=t;return{value:o,settings:t8(t,no)}}function nd(e,t,n){let{format:r}=nl[e];return r?r(t,n):t}function nf(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function np(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?nf(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):nf(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let nh=(e,t,n)=>e>n?n:e<t?t:e,nm=e=>{if(""===e||"number"==typeof e)return e;try{let t=function e(t){if(isNaN(Number(t))){if(n_.test(t)){let n=t.replace(n_,(t,n)=>String(e(n)));return e(n)}if(nw.test(t))return e(t.replace(nw,(e,t,n)=>String(Math.pow(Number(t),Number(n)))));if(nE.test(t))return e(t.replace(nE,(e,t,n)=>String(Number(t)*Number(n))));if(nS.test(t))return e(t.replace(nS,(e,t,n)=>{if(0!=n)return String(Number(t)/Number(n));throw Error("Division by zero")}));else if(nP.test(t))return e(t.replace(nP,(e,t,n)=>String(Number(t)+Number(n))));else if(nM.test(t))return e(t.replace(nM,(e,t,n)=>String(Number(t)-Number(n))))}return Number(t)}(e);if(!isNaN(t))return t}catch(e){}return parseFloat(e)},ng=Math.log(10);function nv(e){let t=Math.abs(+String(e).replace(".",""));if(0===t)return .01;for(;0!==t&&t%10==0;)t/=10;return Math.max(Math.pow(10,Math.floor(Math.log10(Math.abs(e)))-(Math.floor(Math.log(t)/ng)+1)),.001)}let ny=(e,t,n)=>n===t?0:(nh(e,t,n)-t)/(n-t),nx=(e,t,n)=>e*(n-t)+t,nb=()=>"_"+Math.random().toString(36).substr(2,9),n_=/\(([0-9+\-*/^ .]+)\)/,nw=/(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/,nE=/(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/,nS=/(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/,nP=/(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/,nM=/(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/;function nC(e){return"[object Object]"===Object.prototype.toString.call(e)}let nT=e=>nC(e)&&0===Object.keys(e).length;(l=i||(i={})).BUTTON="BUTTON",l.BUTTON_GROUP="BUTTON_GROUP",l.MONITOR="MONITOR",l.FOLDER="FOLDER",(s=o||(o={})).SELECT="SELECT",s.IMAGE="IMAGE",s.NUMBER="NUMBER",s.COLOR="COLOR",s.STRING="STRING",s.BOOLEAN="BOOLEAN",s.INTERVAL="INTERVAL",s.VECTOR3D="VECTOR3D",s.VECTOR2D="VECTOR2D";let nz=["type","__customInput"],nA=["render","label","optional","order","disabled","hint","onChange","onEditStart","onEditEnd","transient"],nO=["type"];function n$(e,t,n,r,i){let{value:o,type:a,settings:l}=e;e.value=nR({type:a,value:o,settings:l},t,n,r),e.fromPanel=i}let nk=function(e,t,n){this.type="LEVA_ERROR",this.message="LEVA: "+e,this.previousValue=t,this.error=n};function nR({type:e,value:t,settings:n},r,i,o){let a;let l="SELECT"!==e&&"function"==typeof r?r(t):r;try{a=function(e,t,n,r,i,o){let{sanitize:a}=nl[e];return a?a(t,n,r,i,o):t}(e,l,n,t,i,o)}catch(e){throw new nk(`The value \`${r}\` did not result in a correct value.`,t,e)}return(0,V.J)(a,t)?t:a}let nI=(e,t,n=!1)=>{let r=0;return function(){let i=arguments,o=n&&!r,a=()=>e.apply(this,i);window.clearTimeout(r),r=window.setTimeout(a,t),o&&a()}},nL=e=>e.shiftKey?5:e.altKey?.2:1,nD=["value"],nj=["min","max"],nN=(e,{min:t=-1/0,max:n=1/0,suffix:r})=>{let i=parseFloat(e);if(""===e||isNaN(i))throw Error("Invalid number");let o=nh(i,t,n);return r?o+r:o},nU=e=>{let{value:t}=e,n=t8(e,nD),{min:r=-1/0,max:i=1/0}=n,o=t8(n,nj),a=parseFloat(t),l="string"==typeof t?t.substring((""+a).length):void 0;a=nh(a,r,i);let s=n.step;!s&&(Number.isFinite(r)?s=Number.isFinite(i)?+(Math.abs(i-r)/100).toPrecision(1):+(Math.abs(a-r)/100).toPrecision(1):Number.isFinite(i)&&(s=+(Math.abs(i-a)/100).toPrecision(1)));let c=s?10*nv(s):nv(a);return{value:l?a+l:a,settings:np({initialValue:a,step:s=s||c/10,pad:Math.round(nh(Math.log10(1/c),0,2)),min:r,max:i,suffix:l},o)}},nB=(e,{step:t,initialValue:n})=>n+Math.round((e-n)/t)*t;var nV=Object.freeze({__proto__:null,schema:e=>{if("number"==typeof e)return!0;if("string"==typeof e){let t=parseFloat(e);return!isNaN(t)&&e.substring((""+t).length).trim().length<4}return!1},sanitize:nN,format:(e,{pad:t=0,suffix:n})=>{let r=parseFloat(e).toFixed(t);return n?r+n:r},normalize:nU,sanitizeStep:nB});function nF(){return(nF=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}let nH=(0,f.createContext)({});function nW(){return(0,f.useContext)(nH)}let nK=(0,f.createContext)(null),nG=(0,f.createContext)(null),nY=(0,f.createContext)(null);function nq(){return(0,f.useContext)(nG)}function nZ(e,t){let[n,r]=e.split(" "),i={};return"none"!==n&&(i.boxShadow=`${t.inset?"inset ":""}0 0 0 $borderWidths${[t.key]} $colors${"default"!==n&&n||t.borderColor}`),r&&(i.backgroundColor=r),i}let nX={$inputStyle:()=>e=>nZ(e,{key:"$input",borderColor:"$highlight1",inset:!0}),$focusStyle:()=>e=>nZ(e,{key:"$focus",borderColor:"$accent2"}),$hoverStyle:()=>e=>nZ(e,{key:"$hover",borderColor:"$accent1",inset:!0}),$activeStyle:()=>e=>nZ(e,{key:"$active",borderColor:"$accent1",inset:!0})},{styled:nJ,css:nQ,createTheme:n0,globalCss:n1,keyframes:n2}=(0,W.Th)({prefix:"leva",theme:{colors:{elevation1:"#292d39",elevation2:"#181c20",elevation3:"#373c4b",accent1:"#0066dc",accent2:"#007bff",accent3:"#3c93ff",highlight1:"#535760",highlight2:"#8c92a4",highlight3:"#fefefe",vivid1:"#ffcc00",folderWidgetColor:"$highlight2",folderTextColor:"$highlight3",toolTipBackground:"$highlight3",toolTipText:"$elevation2"},radii:{xs:"2px",sm:"3px",lg:"10px"},space:{xs:"3px",sm:"6px",md:"10px",rowGap:"7px",colGap:"7px"},fonts:{mono:"ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace",sans:"system-ui, sans-serif"},fontSizes:{root:"11px",toolTip:"$root"},sizes:{rootWidth:"280px",controlWidth:"160px",numberInputMinWidth:"38px",scrubberWidth:"8px",scrubberHeight:"16px",rowHeight:"24px",folderTitleHeight:"20px",checkboxSize:"16px",joystickWidth:"100px",joystickHeight:"100px",colorPickerWidth:"$controlWidth",colorPickerHeight:"100px",imagePreviewWidth:"$controlWidth",imagePreviewHeight:"100px",monitorHeight:"60px",titleBarHeight:"39px"},shadows:{level1:"0 0 9px 0 #00000088",level2:"0 4px 14px #00000033"},borderWidths:{root:"0px",input:"1px",focus:"1px",hover:"1px",active:"1px",folder:"1px"},fontWeights:{label:"normal",folder:"normal",button:"normal"}},utils:np(np({},nX),{},{$flex:()=>({display:"flex",alignItems:"center"}),$flexCenter:()=>({display:"flex",alignItems:"center",justifyContent:"center"}),$reset:()=>({outline:"none",fontSize:"inherit",fontWeight:"inherit",color:"inherit",fontFamily:"inherit",border:"none",backgroundColor:"transparent",appearance:"none"}),$draggable:()=>({touchAction:"none",WebkitUserDrag:"none",userSelect:"none"}),$focus:e=>({"&:focus":nX.$focusStyle()(e)}),$focusWithin:e=>({"&:focus-within":nX.$focusStyle()(e)}),$hover:e=>({"&:hover":nX.$hoverStyle()(e)}),$active:e=>({"&:active":nX.$activeStyle()(e)})})}),n3=n1({".leva__panel__dragged":{WebkitUserDrag:"none",userSelect:"none",input:{userSelect:"none"},"*":{cursor:"ew-resize !important"}}});function n4(e,t){let{theme:n}=(0,f.useContext)(nK);if(!(e in n)||!(t in n[e]))return nt(r.THEME_ERROR,e,t),"";let i=t;for(;;){let t=n[e][i];if("string"!=typeof t||"$"!==t.charAt(0))return t;i=t.substr(1)}}let n5=nJ("input",{$reset:"",padding:"0 $sm",width:0,minWidth:0,flex:1,height:"100%",variants:{levaType:{number:{textAlign:"right"}},as:{textarea:{padding:"$sm"}}}}),n6=nJ("div",{$draggable:"",height:"100%",$flexCenter:"",position:"relative",padding:"0 $xs",fontSize:"0.8em",opacity:.8,cursor:"default",touchAction:"none",[`& + ${n5}`]:{paddingLeft:0}}),n9=nJ(n6,{cursor:"ew-resize",marginRight:"-$xs",textTransform:"uppercase",opacity:.3,"&:hover":{opacity:1},variants:{dragging:{true:{backgroundColor:"$accent2",opacity:1}}}}),n8=nJ("div",{$flex:"",position:"relative",borderRadius:"$sm",overflow:"hidden",color:"inherit",height:"$rowHeight",backgroundColor:"$elevation3",$inputStyle:"$elevation1",$hover:"",$focusWithin:"",variants:{textArea:{true:{height:"auto"}}}}),n7=["innerLabel","value","onUpdate","onChange","onKeyDown","type","id","inputType","rows"],re=["onUpdate"];function rt(e){let{innerLabel:t,value:n,onUpdate:r,onChange:i,onKeyDown:o,type:a,id:l,inputType:s="text",rows:c=0}=e,u=t8(e,n7),{id:d,emitOnEditStart:p,emitOnEditEnd:h,disabled:m}=nW(),g=(0,f.useRef)(null),v=c>0,y=(0,f.useCallback)(e=>t=>{e(t.currentTarget.value)},[]);f.useEffect(()=>{let e=g.current,t=y(e=>{r(e),h()});return null==e||e.addEventListener("blur",t),()=>null==e?void 0:e.removeEventListener("blur",t)},[y,r,h]);let x=(0,f.useCallback)(e=>{"Enter"===e.key&&y(r)(e)},[y,r]),b=Object.assign({as:v?"textarea":"input"},v?{rows:c}:{},u);return f.createElement(n8,{textArea:v},t&&"string"==typeof t?f.createElement(n6,null,t):t,f.createElement(n5,nF({levaType:a,ref:g,id:l||d,type:s,autoComplete:"off",spellCheck:"false",value:n,onChange:y(i),onFocus:()=>p(),onKeyPress:x,onKeyDown:o,disabled:m},b)))}function rn(e){let{onUpdate:t}=e,n=t8(e,re),r=(0,f.useCallback)(e=>t(nm(e)),[t]),i=(0,f.useCallback)(e=>{let n="ArrowUp"===e.key?1:"ArrowDown"===e.key?-1:0;if(n){e.preventDefault();let r=e.altKey?.1:e.shiftKey?10:1;t(e=>parseFloat(e)+n*r)}},[t]);return f.createElement(rt,nF({},n,{onUpdate:r,onKeyDown:i,type:"number"}))}let rr=nJ("div",{}),ri=nJ("div",{position:"relative",background:"$elevation2",transition:"height 300ms ease",variants:{fill:{true:{},false:{}},flat:{false:{},true:{}},isRoot:{true:{},false:{paddingLeft:"$md","&::after":{content:'""',position:"absolute",left:0,top:0,width:"$borderWidths$folder",height:"100%",backgroundColor:"$folderWidgetColor",opacity:.4,transform:"translateX(-50%)"}}}},compoundVariants:[{isRoot:!0,fill:!1,css:{overflowY:"auto",maxHeight:"calc(100vh - 20px - $$titleBarHeight)"}},{isRoot:!0,flat:!1,css:{borderRadius:"$lg"}}]}),ro=nJ("div",{$flex:"",color:"$folderTextColor",userSelect:"none",cursor:"pointer",height:"$folderTitleHeight",fontWeight:"$folder","> svg":{marginLeft:-4,marginRight:4,cursor:"pointer",fill:"$folderWidgetColor",opacity:.6},"&:hover > svg":{fill:"$folderWidgetColor"},[`&:hover + ${ri}::after`]:{opacity:.6},[`${rr}:hover > & + ${ri}::after`]:{opacity:.6},[`${rr}:hover > & > svg`]:{opacity:1}}),ra=nJ("div",{position:"relative",display:"grid",gridTemplateColumns:"100%",rowGap:"$rowGap",transition:"opacity 250ms ease",variants:{toggled:{true:{opacity:1,transitionDelay:"250ms"},false:{opacity:0,transitionDelay:"0ms",pointerEvents:"none"}},isRoot:{true:{"& > div":{paddingLeft:"$md",paddingRight:"$md"},"& > div:first-of-type":{paddingTop:"$sm"},"& > div:last-of-type":{paddingBottom:"$sm"},[`> ${rr}:not(:first-of-type)`]:{paddingTop:"$sm",marginTop:"$md",borderTop:"$borderWidths$folder solid $colors$elevation1"}}}}}),rl=nJ("div",{position:"relative",zIndex:100,display:"grid",rowGap:"$rowGap",gridTemplateRows:"minmax($sizes$rowHeight, max-content)",alignItems:"center",color:"$highlight2",[`${ra} > &`]:{"&:first-of-type":{marginTop:"$rowGap"},"&:last-of-type":{marginBottom:"$rowGap"}},variants:{disabled:{true:{pointerEvents:"none"},false:{"&:hover,&:focus-within":{color:"$highlight3"}}}}}),rs=nJ(rl,{gridTemplateColumns:"auto $sizes$controlWidth",columnGap:"$colGap"}),rc=nJ("div",{$flex:"",height:"100%",position:"relative",overflow:"hidden","& > div":{marginLeft:"$colGap",padding:"0 $xs",opacity:.4},"& > div:hover":{opacity:.8},"& > div > svg":{display:"none",cursor:"pointer",width:13,minWidth:13,height:13,backgroundColor:"$elevation2"},"&:hover > div > svg":{display:"block"},variants:{align:{top:{height:"100%",alignItems:"flex-start",paddingTop:"$sm"}}}}),ru=nJ("input",{$reset:"",height:0,width:0,opacity:0,margin:0,"& + label":{position:"relative",$flexCenter:"",height:"100%",userSelect:"none",cursor:"pointer",paddingLeft:2,paddingRight:"$sm",pointerEvents:"auto"},"& + label:after":{content:'""',width:6,height:6,backgroundColor:"$elevation3",borderRadius:"50%",$activeStyle:""},"&:focus + label:after":{$focusStyle:""},"& + label:active:after":{backgroundColor:"$accent1",$focusStyle:""},"&:checked + label:after":{backgroundColor:"$accent1"}}),rd=nJ("label",{fontWeight:"$label",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap","& > svg":{display:"block"}}),rf=nJ("div",{opacity:1,variants:{disabled:{true:{opacity:.6,pointerEvents:"none",[`& ${rd}`]:{pointerEvents:"auto"}}}}}),rp=nJ("div",{position:"fixed",top:0,bottom:0,right:0,left:0,zIndex:1e3,userSelect:"none"}),rh=nJ("div",{background:"$toolTipBackground",fontFamily:"$sans",fontSize:"$toolTip",padding:"$xs $sm",color:"$toolTipText",borderRadius:"$xs",boxShadow:"$level2",maxWidth:260}),rm=nJ(t9,{fill:"$toolTipBackground"});function rg({children:e}){let{className:t}=(0,f.useContext)(nK);return f.createElement(B.f,{className:t},e)}let rv=["align"];function ry(){let{id:e,disable:t,disabled:n}=nW();return f.createElement(f.Fragment,null,f.createElement(ru,{id:e+"__disable",type:"checkbox",checked:!n,onChange:()=>t(!n)}),f.createElement("label",{htmlFor:e+"__disable"}))}function rx(e){let{id:t,optional:n,hint:r}=nW(),i=e.htmlFor||(t?{htmlFor:t}:null),o=r||"string"!=typeof e.children?null:{title:e.children};return f.createElement(f.Fragment,null,n&&f.createElement(ry,null),void 0!==r?f.createElement(tq,null,f.createElement(tX,{asChild:!0},f.createElement(rd,nF({},i,e))),f.createElement(t1,{side:"top",sideOffset:2},f.createElement(rh,null,r,f.createElement(rm,null)))):f.createElement(rd,nF({},i,o,e)))}function rb(e){let{align:t}=e,n=t8(e,rv),{value:i,label:o,key:a,disabled:l}=nW(),{hideCopyButton:s}=(0,f.useContext)(nY),c=!s&&void 0!==a,[u,d]=(0,f.useState)(!1),p=async()=>{try{await navigator.clipboard.writeText(JSON.stringify({[a]:null!=i?i:""})),d(!0)}catch(e){nt(r.CLIPBOARD_ERROR,{[a]:i})}};return f.createElement(rc,{align:t,onPointerLeave:()=>d(!1)},f.createElement(rx,n),c&&!l&&f.createElement("div",{title:`Click to copy ${"string"==typeof o?o:a} value`},u?f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"}),f.createElement("path",{fillRule:"evenodd",d:"M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})):f.createElement("svg",{onClick:p,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"}),f.createElement("path",{d:"M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"}))))}let r_=["toggled"],rw=nJ("svg",{fill:"currentColor",transition:"transform 350ms ease, fill 250ms ease"});function rE(e){let{toggled:t}=e,n=t8(e,r_);return f.createElement(rw,nF({width:"9",height:"5",viewBox:"0 0 9 5",xmlns:"http://www.w3.org/2000/svg",style:{transform:`rotate(${t?0:-90}deg)`}},n),f.createElement("path",{d:"M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"}))}let rS=["input"];function rP(e){let{input:t}=e,n=t8(e,rS);return t?f.createElement(rs,n):f.createElement(rl,n)}function rM({value:e,type:t,settings:n,setValue:r}){let[i,o]=(0,f.useState)(nd(t,e,n)),a=(0,f.useRef)(e),l=(0,f.useRef)(n);l.current=n;let s=(0,f.useCallback)(e=>o(nd(t,e,l.current)),[t]),c=(0,f.useCallback)(e=>{try{r(e)}catch(n){let{type:e,previousValue:t}=n;if("LEVA_ERROR"!==e)throw n;s(t)}},[s,r]);return(0,f.useEffect)(()=>{(0,V.J)(e,a.current)||s(e),a.current=e},[e,s]),{displayValue:i,onChange:o,onUpdate:c}}function rC(e,t){let{emitOnEditStart:n,emitOnEditEnd:r}=nW();return(0,K.useDrag)(t=>{t.first&&(document.body.classList.add("leva__panel__dragged"),null==n||n());let i=e(t);return t.last&&(document.body.classList.remove("leva__panel__dragged"),null==r||r()),i},t)}function rT(){let e=(0,f.useRef)(null),t=(0,f.useRef)({x:0,y:0}),n=(0,f.useCallback)(n=>{Object.assign(t.current,n),e.current&&(e.current.style.transform=`translate3d(${t.current.x}px, ${t.current.y}px, 0)`)},[]);return[e,n]}let rz=["__refCount"],rA=(e,t)=>e[t]?t8(e[t],rz):null,rO=nJ("div",{variants:{hasRange:{true:{position:"relative",display:"grid",gridTemplateColumns:"auto $sizes$numberInputMinWidth",columnGap:"$colGap",alignItems:"center"}}}}),r$=nJ("div",{position:"relative",width:"100%",height:2,borderRadius:"$xs",backgroundColor:"$elevation1"}),rk=nJ("div",{position:"absolute",width:"$scrubberWidth",height:"$scrubberHeight",borderRadius:"$xs",boxShadow:"0 0 0 2px $colors$elevation2",backgroundColor:"$accent2",cursor:"pointer",$active:"none $accent1",$hover:"none $accent3",variants:{position:{left:{borderTopRightRadius:0,borderBottomRightRadius:0,transform:"translateX(calc(-0.5 * ($sizes$scrubberWidth + 4px)))"},right:{borderTopLeftRadius:0,borderBottomLeftRadius:0,transform:"translateX(calc(0.5 * ($sizes$scrubberWidth + 4px)))"}}}}),rR=nJ("div",{position:"relative",$flex:"",height:"100%",cursor:"pointer",touchAction:"none"}),rI=nJ("div",{position:"absolute",height:"100%",backgroundColor:"$accent2"});function rL({value:e,min:t,max:n,onDrag:r,step:i,initialValue:o}){let a=(0,f.useRef)(null),l=(0,f.useRef)(null),s=(0,f.useRef)(0),c=n4("sizes","scrubberWidth"),u=rC(({event:u,first:d,xy:[f],movement:[p],memo:h})=>{if(d){let{width:r,left:i}=a.current.getBoundingClientRect();s.current=r-parseFloat(c),h=(null==u?void 0:u.target)===l.current?e:nx((f-i)/r,t,n)}return r(nB(h+nx(p/s.current,0,n-t),{step:i,initialValue:o})),h}),d=ny(e,t,n);return f.createElement(rR,nF({ref:a},u()),f.createElement(r$,null,f.createElement(rI,{style:{left:0,right:`${(1-d)*100}%`}})),f.createElement(rk,{ref:l,style:{left:`calc(${d} * (100% - ${c}))`}}))}let rD=f.memo(({label:e,onUpdate:t,step:n,innerLabelTrim:r})=>{let[i,o]=(0,f.useState)(!1),a=rC(({active:e,delta:[r],event:i,memo:a=0})=>(o(e),Math.abs(a+=r/2)>=1&&(t(e=>parseFloat(e)+Math.floor(a)*n*nL(i)),a=0),a));return f.createElement(n9,nF({dragging:i,title:e.length>1?e:""},a()),e.slice(0,r))});function rj({label:e,id:t,displayValue:n,onUpdate:r,onChange:i,settings:o,innerLabelTrim:a=1}){let l=a>0&&f.createElement(rD,{label:e,step:o.step,onUpdate:r,innerLabelTrim:a});return f.createElement(rn,{id:t,value:String(n),onUpdate:r,onChange:i,innerLabel:l})}let{sanitizeStep:rN}=nV;var rU=np({component:function(){let e=nW(),{label:t,value:n,onUpdate:r,settings:i,id:o}=e,{min:a,max:l}=i,s=l!==1/0&&a!==-1/0;return f.createElement(rP,{input:!0},f.createElement(rb,null,t),f.createElement(rO,{hasRange:s},s&&f.createElement(rL,nF({value:parseFloat(n),onDrag:r},i)),f.createElement(rj,nF({},e,{id:o,label:"value",innerLabelTrim:s?0:1}))))}},t8(nV,["sanitizeStep"])),rB=Object.freeze({__proto__:null,schema:(e,t)=>(0,H.Z)().schema({options:(0,H.Z)().passesAnyOf((0,H.Z)().object(),(0,H.Z)().array())}).test(t),sanitize:(e,{values:t})=>{if(0>t.indexOf(e))throw Error("Selected value doesn't match Select options");return e},format:(e,{values:t})=>t.indexOf(e),normalize:e=>{let t,n,{value:r,options:i}=e;return Array.isArray(i)?(n=i,t=i.map(e=>String(e))):(n=Object.values(i),t=Object.keys(i)),"value"in e?n.includes(r)||(t.unshift(String(r)),n.unshift(r)):r=n[0],Object.values(i).includes(r)||(i[String(r)]=r),{value:r,settings:{keys:t,values:n}}}});let rV=nJ("div",{$flexCenter:"",position:"relative","> svg":{pointerEvents:"none",position:"absolute",right:"$md"}}),rF=nJ("select",{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0}),rH=nJ("div",{display:"flex",alignItems:"center",width:"100%",height:"$rowHeight",backgroundColor:"$elevation3",borderRadius:"$sm",padding:"0 $sm",cursor:"pointer",[`${rF}:focus + &`]:{$focusStyle:""},[`${rF}:hover + &`]:{$hoverStyle:""}});function rW({displayValue:e,value:t,onUpdate:n,id:r,settings:i,disabled:o}){let{keys:a,values:l}=i,s=(0,f.useRef)();return t===l[e]&&(s.current=a[e]),f.createElement(rV,null,f.createElement(rF,{id:r,value:e,onChange:e=>n(l[Number(e.currentTarget.value)]),disabled:o},a.map((e,t)=>f.createElement("option",{key:e,value:t},e))),f.createElement(rH,null,s.current),f.createElement(rE,{toggled:!0}))}var rK=np({component:function(){let{label:e,value:t,displayValue:n,onUpdate:r,id:i,disabled:o,settings:a}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(rW,{id:i,value:t,displayValue:n,onUpdate:r,settings:a,disabled:o}))}},rB),rG=Object.freeze({__proto__:null,schema:e=>(0,H.Z)().string().test(e),sanitize:e=>{if("string"!=typeof e)throw Error("Invalid string");return e},normalize:({value:e,editable:t=!0,rows:n=!1})=>({value:e,settings:{editable:t,rows:"number"==typeof n?n:n?5:0}})});let rY=["displayValue","onUpdate","onChange","editable"],rq=nJ("div",{whiteSpace:"pre-wrap"});function rZ(e){let{displayValue:t,onUpdate:n,onChange:r,editable:i=!0}=e,o=t8(e,rY);return i?f.createElement(rt,nF({value:t,onUpdate:n,onChange:r},o)):f.createElement(rq,null,t)}var rX=np({component:function(){let{label:e,settings:t,displayValue:n,onUpdate:r,onChange:i}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(rZ,nF({displayValue:n,onUpdate:r,onChange:i},t)))}},rG),rJ=Object.freeze({__proto__:null,schema:e=>(0,H.Z)().boolean().test(e),sanitize:e=>{if("boolean"!=typeof e)throw Error("Invalid boolean");return e}});let rQ=nJ("div",{position:"relative",$flex:"",height:"$rowHeight",input:{$reset:"",height:0,width:0,opacity:0,margin:0},label:{position:"relative",$flexCenter:"",userSelect:"none",cursor:"pointer",height:"$checkboxSize",width:"$checkboxSize",backgroundColor:"$elevation3",borderRadius:"$sm",$hover:""},"input:focus + label":{$focusStyle:""},"input:focus:checked + label, input:checked + label:hover":{$hoverStyle:"$accent3"},"input + label:active":{backgroundColor:"$accent1"},"input:checked + label:active":{backgroundColor:"$accent1"},"label > svg":{display:"none",width:"90%",height:"90%",stroke:"$highlight3"},"input:checked + label":{backgroundColor:"$accent2"},"input:checked + label > svg":{display:"block"}});function r0({value:e,onUpdate:t,id:n,disabled:r}){return f.createElement(rQ,null,f.createElement("input",{id:n,type:"checkbox",checked:e,onChange:e=>t(e.currentTarget.checked),disabled:r}),f.createElement("label",{htmlFor:n},f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},f.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"}))))}var r1=np({component:function(){let{label:e,value:t,onUpdate:n,disabled:r,id:i}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(r0,{value:t,onUpdate:n,id:i,disabled:r}))}},rJ);let r2=["locked"];function r3({value:e,id:t,valueKey:n,settings:r,onUpdate:i,innerLabelTrim:o}){let a=(0,f.useRef)(e[n]);a.current=e[n];let l=(0,f.useCallback)(e=>i({[n]:nR({type:"NUMBER",value:a.current,settings:r},e)}),[i,r,n]),s=rM({type:"NUMBER",value:e[n],settings:r,setValue:l});return f.createElement(rj,{id:t,label:n,value:e[n],displayValue:s.displayValue,onUpdate:s.onUpdate,onChange:s.onChange,settings:r,innerLabelTrim:o})}let r4=nJ("div",{display:"grid",columnGap:"$colGap",gridAutoFlow:"column dense",alignItems:"center",variants:{withLock:{true:{gridTemplateColumns:"10px auto","> svg":{cursor:"pointer"}}}}});function r5(e){let{locked:t}=e,n=t8(e,r2);return f.createElement("svg",nF({width:"10",height:"10",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n),t?f.createElement("path",{d:"M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}):f.createElement("path",{d:"M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}function r6({value:e,onUpdate:t,settings:n,innerLabelTrim:r}){let{id:i,setSettings:o}=nW(),{lock:a,locked:l}=n;return f.createElement(r4,{withLock:a},a&&f.createElement(r5,{locked:l,onClick:()=>o({locked:!l})}),Object.keys(e).map((o,a)=>f.createElement(r3,{id:0===a?i:`${i}.${o}`,key:o,valueKey:o,value:e,settings:n[o],onUpdate:t,innerLabelTrim:r})))}let r9=(e,t)=>{let n={},r=0,i=1/0;for(let o in Object.entries(e).forEach(([e,o])=>{n[e]=nU(np({value:o},t[e])).settings,r=Math.max(r,n[e].step),i=Math.min(i,n[e].pad)}),n){let{step:e,min:a,max:l}=t[o]||{};isFinite(e)||isFinite(a)&&isFinite(l)||(n[o].step=r,n[o].pad=i)}return n},r8=["lock"],r7=["value"];function ie(e,t,n){return(Array.isArray(e)?"array":"object")===t?e:"array"===t?Object.values(e):e.reduce((e,t,r)=>Object.assign(e,{[n[r]]:t}),{})}let it=(e,t,n)=>{let r=ie(e,"object",t.keys);for(let e in r)r[e]=nN(r[e],t[e]);let i=Object.keys(r),o={};if(i.length===t.keys.length)o=r;else{let e=ie(n,"object",t.keys);if(1===i.length&&t.locked){let t=i[0],n=r[t],a=e[t],l=0!==a?n/a:1;for(let r in e)r===t?o[t]=n:o[r]=e[r]*l}else o=np(np({},e),r)}return ie(o,t.format,t.keys)},ir=(e,t)=>ie(e,"object",t.keys),ii=e=>!!e&&("step"in e||"min"in e||"max"in e);function io(e){return{schema:function(e){let t=(0,H.Z)().array().length(e).every.number(),n=t=>{if(!t||"object"!=typeof t)return!1;let n=Object.values(t);return n.length===e&&n.every(e=>isFinite(e))};return e=>t.test(e)||n(e)}(e.length),normalize:t=>{let{value:n}=t;return function(e,t,n=[]){let{lock:r=!1}=t,i=t8(t,r8),o=Array.isArray(e)?"array":"object",a="object"===o?Object.keys(e):n,l=ie(e,"object",a),s=r9(l,ii(i)?a.reduce((e,t)=>Object.assign(e,{[t]:i}),{}):i);return{value:"array"===o?e:l,settings:np(np({},s),{},{format:o,keys:a,lock:r,locked:!1})}}(n,t8(t,r7),e)},format:(e,t)=>ir(e,t),sanitize:(e,t,n)=>it(e,t,n)}}var ia=n(32738),il=n(27696),is=n(7642),ic=n(80540),iu=n(96854),id=n(22166),ip=n(31378),ih=n.n(ip);let im=(...e)=>e.filter(Boolean).join("."),ig=e=>{let[t,n]=(0,f.useState)(e.getVisiblePaths());return(0,f.useEffect)(()=>{n(e.getVisiblePaths());let t=e.useStore.subscribe(e.getVisiblePaths,n,{equalityFn:F.Z});return()=>t()},[e]),t};function iv(e=3){let t=(0,f.useRef)(null),n=(0,f.useRef)(null),[r,i]=(0,f.useState)(!1),o=(0,f.useCallback)(()=>i(!0),[]),a=(0,f.useCallback)(()=>i(!1),[]);return(0,f.useLayoutEffect)(()=>{if(r){let{bottom:r,top:i,left:o}=t.current.getBoundingClientRect(),{height:a}=n.current.getBoundingClientRect(),l=r+a>window.innerHeight-40?"up":"down";n.current.style.position="fixed",n.current.style.zIndex="10000",n.current.style.left=o+"px","down"===l?n.current.style.top=r+e+"px":n.current.style.bottom=window.innerHeight-i+e+"px"}},[e,r]),{popinRef:t,wrapperRef:n,shown:r,show:o,hide:a}}(0,ia.l7)([il.Z]);let iy={rgb:"toRgb",hsl:"toHsl",hsv:"toHsv",hex:"toHex"};function ix(e,{format:t,hasAlpha:n,isString:r}){let i=e[iy[t]+(r&&"hex"!==t?"String":"")]();return"object"!=typeof i||n?i:function(e,t){let n=np({},e);return t.forEach(t=>t in e&&delete n[t]),n}(i,["a"])}H.Z.extend({color:()=>e=>(0,ia.Vi)(e).isValid()});let ib=(e,t)=>{let n=(0,ia.Vi)(e);if(!n.isValid())throw Error("Invalid color");return ix(n,t)};var i_=Object.freeze({__proto__:null,schema:e=>(0,H.Z)().color().test(e),sanitize:ib,format:(e,t)=>ix((0,ia.Vi)(e),np(np({},t),{},{isString:!0,format:"hex"})),normalize:({value:e})=>{let t=(0,ia.y6)(e),n="object"==typeof e?"a"in e:"hex"===t&&8===e.length||/^(rgba)|(hsla)|(hsva)/.test(e),r={format:"name"===t?"hex":t,hasAlpha:n,isString:"string"==typeof e};return{value:ib(e,r),settings:r}}});let iw=nJ("div",{position:"relative",boxSizing:"border-box",borderRadius:"$sm",overflow:"hidden",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",backgroundColor:"#fff",backgroundImage:'url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')',$inputStyle:"",$hover:"",zIndex:1,variants:{active:{true:{$inputStyle:"$accent1"}}},"&::before":{content:'""',position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:"currentColor",zIndex:1}}),iE=nJ("div",{position:"relative",display:"grid",gridTemplateColumns:"$sizes$rowHeight auto",columnGap:"$colGap",alignItems:"center"}),iS=nJ("div",{width:"$colorPickerWidth",height:"$colorPickerHeight",".react-colorful":{width:"100%",height:"100%",boxShadow:"$level2",cursor:"crosshair"},".react-colorful__saturation":{borderRadius:"$sm $sm 0 0"},".react-colorful__alpha, .react-colorful__hue":{height:10},".react-colorful__last-control":{borderRadius:"0 0 $sm $sm"},".react-colorful__pointer":{height:12,width:12}});function iP(e,t){return"rgb"!==t?(0,ia.Vi)(e).toRgb():e}function iM({value:e,displayValue:t,settings:n,onUpdate:r}){let{emitOnEditStart:i,emitOnEditEnd:o}=nW(),{format:a,hasAlpha:l}=n,{popinRef:s,wrapperRef:c,shown:u,show:d,hide:p}=iv(),h=(0,f.useRef)(0),[m,g]=(0,f.useState)(()=>iP(e,a)),v=l?is.Jg:is.Ts,y=()=>{g(iP(e,a)),d(),i()},x=()=>{p(),o(),window.clearTimeout(h.current)},b=()=>{h.current=window.setTimeout(x,500)};return(0,f.useEffect)(()=>()=>window.clearTimeout(h.current),[]),f.createElement(f.Fragment,null,f.createElement(iw,{ref:s,active:u,onClick:()=>y(),style:{color:t}}),u&&f.createElement(rg,null,f.createElement(rp,{onPointerUp:x}),f.createElement(iS,{ref:c,onMouseEnter:()=>window.clearTimeout(h.current),onMouseLeave:e=>0===e.buttons&&b()},f.createElement(v,{color:m,onChange:r}))))}var iC=np({component:function(){let{value:e,displayValue:t,label:n,onChange:r,onUpdate:i,settings:o}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,n),f.createElement(iE,null,f.createElement(iM,{value:e,displayValue:t,onChange:r,onUpdate:i,settings:o}),f.createElement(rt,{value:t,onChange:r,onUpdate:i})))}},i_),iT=np({component:function(){let{label:e,displayValue:t,onUpdate:n,settings:r}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(r6,{value:t,settings:r,onUpdate:n}))}},io(["x","y","z"]));let iz=nJ("div",{$flexCenter:"",position:"relative",backgroundColor:"$elevation3",borderRadius:"$sm",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",touchAction:"none",$draggable:"",$hover:"","&:active":{cursor:"none"},"&::after":{content:'""',backgroundColor:"$accent2",height:4,width:4,borderRadius:2}}),iA=nJ("div",{$flexCenter:"",width:"$joystickWidth",height:"$joystickHeight",borderRadius:"$sm",boxShadow:"$level2",position:"fixed",zIndex:1e4,overflow:"hidden",$draggable:"",transform:"translate(-50%, -50%)",variants:{isOutOfBounds:{true:{backgroundColor:"$elevation1"},false:{backgroundColor:"$elevation3"}}},"> div":{position:"absolute",$flexCenter:"",borderStyle:"solid",borderWidth:1,borderColor:"$highlight1",backgroundColor:"$elevation3",width:"80%",height:"80%","&::after,&::before":{content:'""',position:"absolute",zindex:10,backgroundColor:"$highlight1"},"&::before":{width:"100%",height:1},"&::after":{height:"100%",width:1}},"> span":{position:"relative",zindex:100,width:10,height:10,backgroundColor:"$accent2",borderRadius:"50%"}});function iO({value:e,settings:t,onUpdate:n}){let r=(0,f.useRef)(),i=(0,f.useRef)(0),o=(0,f.useRef)(0),a=(0,f.useRef)(1),[l,s]=(0,f.useState)(!1),[c,u]=(0,f.useState)(!1),[d,p]=rT(),h=(0,f.useRef)(null),m=(0,f.useRef)(null);(0,f.useLayoutEffect)(()=>{if(l){let{top:e,left:t,width:n,height:r}=h.current.getBoundingClientRect();m.current.style.left=t+n/2+"px",m.current.style.top=e+r/2+"px"}},[l]);let{keys:[g,v],joystick:y}=t,x="invertY"===y?1:-1,{[g]:{step:b},[v]:{step:_}}=t,w=n4("sizes","joystickWidth"),E=n4("sizes","joystickHeight"),S=.8*parseFloat(w)/2,P=.8*parseFloat(E)/2,M=(0,f.useCallback)(()=>{r.current||(u(!0),i.current&&p({x:i.current*S}),o.current&&p({y:-(o.current*P)}),r.current=window.setInterval(()=>{n(e=>{let t=b*i.current*a.current,n=x*_*o.current*a.current;return Array.isArray(e)?{[g]:e[0]+t,[v]:e[1]+n}:{[g]:e[g]+t,[v]:e[v]+n}})},16))},[S,P,n,p,b,_,g,v,x]),C=(0,f.useCallback)(()=>{window.clearTimeout(r.current),r.current=void 0,u(!1)},[]);(0,f.useEffect)(()=>{function e(e){a.current=nL(e)}return window.addEventListener("keydown",e),window.addEventListener("keyup",e),()=>{window.clearTimeout(r.current),window.removeEventListener("keydown",e),window.removeEventListener("keyup",e)}},[]);let T=rC(({first:t,active:r,delta:[l,c],movement:[u,d]})=>{t&&s(!0);let f=nh(u,-S,S),h=nh(d,-P,P);i.current=Math.abs(u)>Math.abs(f)?Math.sign(u-f):0,o.current=Math.abs(d)>Math.abs(h)?Math.sign(h-d):0;let m=e[g],y=e[v];r?(i.current||(m+=l*b*a.current,p({x:f})),o.current||(y-=x*c*_*a.current,p({y:h})),i.current||o.current?M():C(),n({[g]:m,[v]:y})):(s(!1),i.current=0,o.current=0,p({x:0,y:0}),C())});return f.createElement(iz,nF({ref:h},T()),l&&f.createElement(rg,null,f.createElement(iA,{ref:m,isOutOfBounds:c},f.createElement("div",null),f.createElement("span",{ref:d}))))}let i$=nJ("div",{display:"grid",columnGap:"$colGap",variants:{withJoystick:{true:{gridTemplateColumns:"$sizes$rowHeight auto"},false:{gridTemplateColumns:"auto"}}}}),ik=["joystick"],iR=io(["x","y"]);var iI=np(np({component:function(){let{label:e,displayValue:t,onUpdate:n,settings:r}=nW();return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(i$,{withJoystick:!!r.joystick},r.joystick&&f.createElement(iO,{value:t,settings:r,onUpdate:n}),f.createElement(r6,{value:t,settings:r,onUpdate:n})))}},iR),{},{normalize:e=>{let{joystick:t=!0}=e,n=t8(e,ik),{value:r,settings:i}=iR.normalize(n);return{value:r,settings:np(np({},i),{},{joystick:t})}}}),iL=Object.freeze({__proto__:null,sanitize:e=>{if(void 0!==e){if(e instanceof File)try{return URL.createObjectURL(e)}catch(e){return}if("string"==typeof e&&0===e.indexOf("blob:"))return e;throw Error(`Invalid image format [undefined | blob |\xa0File].`)}},schema:(e,t)=>"object"==typeof t&&"image"in t,normalize:({image:e})=>({value:e})});let iD=nJ("div",{position:"relative",display:"grid",gridTemplateColumns:"$sizes$rowHeight auto 20px",columnGap:"$colGap",alignItems:"center"}),ij=nJ("div",{$flexCenter:"",overflow:"hidden",height:"$rowHeight",background:"$elevation3",textAlign:"center",color:"inherit",borderRadius:"$sm",outline:"none",userSelect:"none",cursor:"pointer",$inputStyle:"",$hover:"",$focusWithin:"",$active:"$accent1 $elevation1",variants:{isDragAccept:{true:{$inputStyle:"$accent1",backgroundColor:"$elevation1"}}}}),iN=nJ("div",{boxSizing:"border-box",borderRadius:"$sm",height:"$rowHeight",width:"$rowHeight",$inputStyle:"",backgroundSize:"cover",backgroundPosition:"center",variants:{hasImage:{true:{cursor:"pointer",$hover:"",$active:""}}}}),iU=nJ("div",{$flexCenter:"",width:"$imagePreviewWidth",height:"$imagePreviewHeight",borderRadius:"$sm",boxShadow:"$level2",pointerEvents:"none",$inputStyle:"",backgroundSize:"cover",backgroundPosition:"center"}),iB=nJ("div",{fontSize:"0.8em",height:"100%",padding:"$rowGap $md"}),iV=nJ("div",{$flexCenter:"",top:"0",right:"0",marginRight:"$sm",height:"100%",cursor:"pointer",variants:{disabled:{true:{color:"$elevation3",cursor:"default"}}},"&::after,&::before":{content:'""',position:"absolute",height:2,width:10,borderRadius:1,backgroundColor:"currentColor"},"&::after":{transform:"rotate(45deg)"},"&::before":{transform:"rotate(-45deg)"}});var iF=np({component:function(){let{label:e,value:t,onUpdate:n,disabled:r}=nW(),{popinRef:i,wrapperRef:o,shown:a,show:l,hide:s}=iv(),c=(0,f.useCallback)(e=>{e.length&&n(e[0])},[n]),u=(0,f.useCallback)(e=>{e.stopPropagation(),n(void 0)},[n]),{getRootProps:d,getInputProps:p,isDragAccept:h}=(0,ic.uI)({maxFiles:1,accept:"image/*",onDrop:c,disabled:r});return f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(iD,null,f.createElement(iN,{ref:i,hasImage:!!t,onPointerDown:()=>!!t&&l(),onPointerUp:s,style:{backgroundImage:t?`url(${t})`:"none"}}),a&&!!t&&f.createElement(rg,null,f.createElement(rp,{onPointerUp:s,style:{cursor:"pointer"}}),f.createElement(iU,{ref:o,style:{backgroundImage:`url(${t})`}})),f.createElement(ij,d({isDragAccept:h}),f.createElement("input",p()),f.createElement(iB,null,h?"drop image":"click or drop")),f.createElement(iV,{onClick:u,disabled:!t})))}},iL);let iH=(0,H.Z)().number(),iW=e=>({min:e[0],max:e[1]}),iK=(e,{bounds:[t,n]},r)=>{let i=Array.isArray(e)?iW(e):e,{min:o,max:a}=np(np({},{min:r[0],max:r[1]}),i);return[nh(Number(o),t,Math.max(t,a)),nh(Number(a),Math.min(n,o),n)]};var iG=Object.freeze({__proto__:null,schema:(e,t)=>(0,H.Z)().array().length(2).every.number().test(e)&&(0,H.Z)().schema({min:iH,max:iH}).test(t),format:iW,sanitize:iK,normalize:({value:e,min:t,max:n})=>{let r={min:t,max:n},i=np(np({},r9(iW(e),{min:r,max:r})),{},{bounds:[t,n]});return{value:iK(iW(e),i,e),settings:i}}});let iY=["value","bounds","onDrag"],iq=["bounds"],iZ=nJ("div",{display:"grid",columnGap:"$colGap",gridTemplateColumns:"auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)"});function iX(e){let{value:t,bounds:[n,r],onDrag:i}=e,o=t8(e,iY),a=(0,f.useRef)(null),l=(0,f.useRef)(null),s=(0,f.useRef)(null),c=(0,f.useRef)(0),u=n4("sizes","scrubberWidth"),d=rC(({event:e,first:d,xy:[f],movement:[p],memo:h={}})=>{if(d){let{width:i,left:o}=a.current.getBoundingClientRect();c.current=i-parseFloat(u);let d=(null==e?void 0:e.target)===l.current||(null==e?void 0:e.target)===s.current;h.pos=nx((f-o)/i,n,r);let p=Math.abs(h.pos-t.min)-Math.abs(h.pos-t.max);h.key=p<0||0===p&&h.pos<=t.min?"min":"max",d&&(h.pos=t[h.key])}let m=h.pos+nx(p/c.current,0,r-n);return i({[h.key]:rN(m,o[h.key])}),h}),p=`calc(${ny(t.min,n,r)} * (100% - ${u} - 8px) + 4px)`,h=`calc(${1-ny(t.max,n,r)} * (100% - ${u} - 8px) + 4px)`;return f.createElement(rR,nF({ref:a},d()),f.createElement(r$,null,f.createElement(rI,{style:{left:p,right:h}})),f.createElement(rk,{position:"left",ref:l,style:{left:p}}),f.createElement(rk,{position:"right",ref:s,style:{right:h}}))}var iJ=np({component:function(){let{label:e,displayValue:t,onUpdate:n,settings:r}=nW(),i=t8(r,iq);return f.createElement(f.Fragment,null,f.createElement(rP,{input:!0},f.createElement(rb,null,e),f.createElement(iZ,null,f.createElement(iX,nF({value:t},r,{onDrag:n})),f.createElement(r6,{value:t,settings:i,onUpdate:n,innerLabelTrim:0}))))}},iG);let iQ=()=>{let e=new Map;return{on:(t,n)=>{let r=e.get(t);void 0===r&&(r=new Set,e.set(t,r)),r.add(n)},off:(t,n)=>{let r=e.get(t);void 0!==r&&(r.delete(n),0===r.size&&e.delete(t))},emit:(t,...n)=>{let r=e.get(t);if(void 0!==r)for(let e of r)e(...n)}}},i0=["type","value"],i1=["onChange","transient","onEditStart","onEditEnd"];new function(){let e=(0,iu.Z)((0,id.XR)(()=>({data:{}}))),t=iQ();this.storeId=nb(),this.useStore=e;let n={},o=new Set;this.getVisiblePaths=()=>{let e=this.getData(),t=Object.keys(e),r=[];Object.entries(n).forEach(([e,n])=>{n.render&&t.some(t=>0===t.indexOf(e))&&!n.render(this.get)&&r.push(e+".")});let i=[];return o.forEach(t=>{t in e&&e[t].__refCount>0&&r.every(e=>-1===t.indexOf(e))&&(!e[t].render||e[t].render(this.get))&&i.push(t)}),i},this.setOrderedPaths=e=>{e.forEach(e=>o.add(e))},this.orderPaths=e=>(this.setOrderedPaths(e),e),this.disposePaths=t=>{e.setState(e=>{let n=e.data;return t.forEach(e=>{if(e in n){let t=n[e];t.__refCount--,0===t.__refCount&&t.type in i&&delete n[e]}}),{data:n}})},this.dispose=()=>{e.setState(()=>({data:{}}))},this.getFolderSettings=e=>n[e]||{},this.getData=()=>e.getState().data,this.addData=(t,n)=>{e.setState(e=>{let i=e.data;return Object.entries(t).forEach(([e,t])=>{let o=i[e];if(o){let{type:e,value:i}=t,a=t8(t,i0);e!==o.type?nt(r.INPUT_TYPE_OVERRIDE,e):((0===o.__refCount||n)&&Object.assign(o,a),o.__refCount++)}else i[e]=np(np({},t),{},{__refCount:1})}),{data:i}})},this.setValueAtPath=(t,n,r)=>{e.setState(e=>{let i=e.data;return n$(i[t],n,t,this,r),{data:i}})},this.setSettingsAtPath=(t,n)=>{e.setState(e=>{let r=e.data;return r[t].settings=np(np({},r[t].settings),n),{data:r}})},this.disableInputAtPath=(t,n)=>{e.setState(e=>{let r=e.data;return r[t].disabled=n,{data:r}})},this.set=(t,n)=>{e.setState(e=>{let r=e.data;return Object.entries(t).forEach(([e,t])=>{try{n$(r[e],t,void 0,void 0,n)}catch(e){}}),{data:r}})},this.getInput=e=>{try{return this.getData()[e]}catch(t){nt(r.PATH_DOESNT_EXIST,e)}},this.get=e=>{var t;return null===(t=this.getInput(e))||void 0===t?void 0:t.value},this.emitOnEditStart=e=>{t.emit(`onEditStart:${e}`,this.get(e),e,np(np({},this.getInput(e)),{},{get:this.get}))},this.emitOnEditEnd=e=>{t.emit(`onEditEnd:${e}`,this.get(e),e,np(np({},this.getInput(e)),{},{get:this.get}))},this.subscribeToEditStart=(e,n)=>{let r=`onEditStart:${e}`;return t.on(r,n),()=>t.off(r,n)},this.subscribeToEditEnd=(e,n)=>{let r=`onEditEnd:${e}`;return t.on(r,n),()=>t.off(r,n)};let a=(e,t,o)=>{let l={};return Object.entries(e).forEach(([e,s])=>{if(""===e)return nt(r.EMPTY_KEY);let c=im(t,e);if(s.type===i.FOLDER)Object.assign(l,a(s.schema,c,o)),c in n||(n[c]=s.settings);else if(e in o)nt(r.DUPLICATE_KEYS,e,c,o[e].path);else{let t=function(e,t,n,r){let o=function e(t,n,r={},o){var a,l;if("object"!=typeof t||Array.isArray(t))return{type:o,input:t,options:np({key:n,label:n,optional:!1,disabled:!1,order:0},r)};if("__customInput"in t){let{type:r,__customInput:i}=t;return e(i,n,t8(t,nz),r)}let{render:s,label:c,optional:u,order:d=0,disabled:f,hint:p,onChange:h,onEditStart:m,onEditEnd:g,transient:v}=t,y=t8(t,nA),x=np({render:s,key:n,label:null!=c?c:n,hint:p,transient:null!=v?v:!!h,onEditStart:m,onEditEnd:g,disabled:f,optional:u,order:d},r),{type:b}=y,_=t8(y,nO);return(b=null!=o?o:b)in i?{type:b,input:_,options:x}:{type:b,input:o&&nC(_)&&"value"in _?_.value:nT(_)?void 0:_,options:np(np({},x),{},{onChange:h,optional:null!==(a=x.optional)&&void 0!==a&&a,disabled:null!==(l=x.disabled)&&void 0!==l&&l})}}(e,t),{type:a,input:l,options:s}=o;if(a)return a in i?o:{type:a,input:nu(a,l,n,r),options:s};let c=ns(l);return c?{type:c,input:nu(c,l,n,r),options:s}:!!(c=ns({value:l}))&&{type:c,input:nu(c,{value:l},n,r),options:s}}(s,e,c,l);if(t){let{type:n,options:r,input:i}=t,{onChange:a,transient:s,onEditStart:u,onEditEnd:d}=r,f=t8(r,i1);l[c]=np(np(np({type:n},f),i),{},{fromPanel:!0}),o[e]={path:c,onChange:a,transient:s,onEditStart:u,onEditEnd:d}}else nt(r.UNKNOWN_INPUT,c,s)}}),l};this.getDataFromSchema=e=>{let t={};return[a(e,"",t),t]}};let i2=e=>"__levaInput"in e,i3=(e,t)=>{let n={},r=t?t.toLowerCase():null;return e.forEach(e=>{let[t,i]=function(e){let t=e.split(".");return[t.pop(),t.join(".")||void 0]}(e);(!r||t.toLowerCase().indexOf(r)>-1)&&ih()(n,i,{[t]:{__levaInput:!0,path:e}})}),n},i4=["type","label","path","valueKey","value","settings","setValue","disabled"];function i5(e){let{type:t,label:n,path:i,valueKey:o,value:a,settings:l,setValue:s,disabled:c}=e,u=t8(e,i4),{displayValue:d,onChange:p,onUpdate:h}=rM({type:t,value:a,settings:l,setValue:s}),m=nl[t].component;return m?f.createElement(nH.Provider,{value:np({key:o,path:i,id:""+i,label:n,displayValue:d,value:a,onChange:p,onUpdate:h,settings:l,setValue:s,disabled:c},u)},f.createElement(rf,{disabled:c},f.createElement(m,null))):(nt(r.NO_COMPONENT_FOR_TYPE,t,i),null)}let i6=nJ("button",{display:"block",$reset:"",fontWeight:"$button",height:"$rowHeight",borderStyle:"none",borderRadius:"$sm",backgroundColor:"$elevation1",color:"$highlight1","&:not(:disabled)":{color:"$highlight3",backgroundColor:"$accent2",cursor:"pointer",$hover:"$accent3",$active:"$accent3 $accent1",$focus:""}}),i9=nJ("div",{$flex:"",justifyContent:"flex-end",gap:"$colGap"}),i8=nJ("button",{$reset:"",cursor:"pointer",borderRadius:"$xs","&:hover":{backgroundColor:"$elevation3"}}),i7=({label:e,opts:t})=>{let n="string"==typeof e&&""===e.trim()?null:e,r=t;return"object"==typeof t.opts&&(void 0!==r.label&&(n=t.label),r=t.opts),{label:n,opts:r}},oe=nJ("canvas",{height:"$monitorHeight",width:"100%",display:"block",borderRadius:"$sm"}),ot=(0,f.forwardRef)(function({initialValue:e},t){let n=n4("colors","highlight3"),r=n4("colors","elevation2"),i=n4("colors","highlight1"),[o,a]=(0,f.useMemo)(()=>[(0,ia.Vi)(i).alpha(.4).toRgbString(),(0,ia.Vi)(i).alpha(.1).toRgbString()],[i]),l=(0,f.useRef)([e]),s=(0,f.useRef)(e),c=(0,f.useRef)(e),u=(0,f.useRef)(),d=(0,f.useCallback)((e,t)=>{if(!e)return;let{width:i,height:u}=e,d=new Path2D,f=i/100,p=.05*u;for(let e=0;e<l.current.length;e++){let t=ny(l.current[e],s.current,c.current),n=f*e,r=u-t*(u-2*p)-p;d.lineTo(n,r)}t.clearRect(0,0,i,u);let h=new Path2D(d);h.lineTo(f*(l.current.length+1),u),h.lineTo(0,u),h.lineTo(0,0);let m=t.createLinearGradient(0,0,0,u);m.addColorStop(0,o),m.addColorStop(1,a),t.fillStyle=m,t.fill(h),t.strokeStyle=r,t.lineJoin="round",t.lineWidth=14,t.stroke(d),t.strokeStyle=n,t.lineWidth=2,t.stroke(d)},[n,r,o,a]),[p,h]=function(e){let t=(0,f.useRef)(null),n=(0,f.useRef)(null),r=(0,f.useRef)(!1);return(0,f.useEffect)(()=>{let i=nI(()=>{t.current.width=t.current.offsetWidth*window.devicePixelRatio,t.current.height=t.current.offsetHeight*window.devicePixelRatio,e(t.current,n.current)},250);return window.addEventListener("resize",i),r.current||(i(),r.current=!0),()=>window.removeEventListener("resize",i)},[e]),(0,f.useEffect)(()=>{n.current=t.current.getContext("2d")},[]),[t,n]}(d);return(0,f.useImperativeHandle)(t,()=>({frame:e=>{var t;(void 0===s.current||e<s.current)&&(s.current=e),(void 0===c.current||e>c.current)&&(c.current=e),(t=l.current).push(e),t.length>100&&t.shift(),u.current=requestAnimationFrame(()=>d(p.current,h.current))}}),[p,h,d]),(0,f.useEffect)(()=>()=>cancelAnimationFrame(u.current),[]),f.createElement(oe,{ref:p})}),on=e=>Number.isFinite(e)?e.toPrecision(2):e.toString(),or=(0,f.forwardRef)(function({initialValue:e},t){let[n,r]=(0,f.useState)(on(e));return(0,f.useImperativeHandle)(t,()=>({frame:e=>r(on(e))}),[]),f.createElement("div",null,n)});function oi(e){return"function"==typeof e?e():e.current}let oo=["type","label","key"],oa={[i.BUTTON]:function({onClick:e,settings:t,label:n}){let r=nq();return f.createElement(rP,null,f.createElement(i6,{disabled:t.disabled,onClick:()=>e(r.get)},n))},[i.BUTTON_GROUP]:function(e){let{label:t,opts:n}=i7(e),r=nq();return f.createElement(rP,{input:!!t},t&&f.createElement(rb,null,t),f.createElement(i9,null,Object.entries(n).map(([e,t])=>f.createElement(i8,{key:e,onClick:()=>t(r.get)},e))))},[i.MONITOR]:function({label:e,objectOrFn:t,settings:n}){let r=(0,f.useRef)(),i=(0,f.useRef)(oi(t));return(0,f.useEffect)(()=>{let e=window.setInterval(()=>{var e;document.hidden||null===(e=r.current)||void 0===e||e.frame(oi(t))},n.interval);return()=>window.clearInterval(e)},[t,n.interval]),f.createElement(rP,{input:!0},f.createElement(rb,{align:"top"},e),n.graph?f.createElement(ot,{ref:r,initialValue:i.current}):f.createElement(or,{ref:r,initialValue:i.current}))}},ol=f.memo(({path:e})=>{let[t,{set:n,setSettings:o,disable:a,storeId:l,emitOnEditStart:s,emitOnEditEnd:c}]=function(e){let t=nq(),[n,r]=(0,f.useState)(rA(t.getData(),e)),i=(0,f.useCallback)(n=>t.setValueAtPath(e,n,!0),[e,t]),o=(0,f.useCallback)(n=>t.setSettingsAtPath(e,n),[e,t]),a=(0,f.useCallback)(n=>t.disableInputAtPath(e,n),[e,t]),l=(0,f.useCallback)(()=>t.emitOnEditStart(e),[e,t]),s=(0,f.useCallback)(()=>t.emitOnEditEnd(e),[e,t]);return(0,f.useEffect)(()=>{r(rA(t.getData(),e));let n=t.useStore.subscribe(t=>rA(t.data,e),r,{equalityFn:F.Z});return()=>n()},[t,e]),[n,{set:i,setSettings:o,disable:a,storeId:t.storeId,emitOnEditStart:l,emitOnEditEnd:s}]}(e);if(!t)return null;let{type:u,label:d,key:p}=t,h=t8(t,oo);if(u in i){let t=oa[u];return f.createElement(t,nF({label:d,path:e},h))}return u in nl?f.createElement(i5,nF({key:l+e,type:u,label:d,storeId:l,path:e,valueKey:p,setValue:n,setSettings:o,disable:a,emitOnEditStart:s,emitOnEditEnd:c},h)):(nn(r.UNSUPPORTED_INPUT,u,e),null)});function os({toggle:e,toggled:t,name:n}){return f.createElement(ro,{onClick:()=>e()},f.createElement(rE,{toggled:t}),f.createElement("div",null,n))}let oc=({name:e,path:t,tree:n})=>{let r=nq(),i=im(t,e),{collapsed:o,color:a}=r.getFolderSettings(i),[l,s]=(0,f.useState)(!o),c=(0,f.useRef)(null),u=n4("colors","folderWidgetColor"),d=n4("colors","folderTextColor");return(0,f.useLayoutEffect)(()=>{c.current.style.setProperty("--leva-colors-folderWidgetColor",a||u),c.current.style.setProperty("--leva-colors-folderTextColor",a||d)},[a,u,d]),f.createElement(rr,{ref:c},f.createElement(os,{name:e,toggled:l,toggle:()=>s(e=>!e)}),f.createElement(ou,{parent:i,tree:n,toggled:l}))},ou=f.memo(({isRoot:e=!1,fill:t=!1,flat:n=!1,parent:r,tree:i,toggled:o})=>{let{wrapperRef:a,contentRef:l}=function(e){let t=(0,f.useRef)(null),n=(0,f.useRef)(null),r=(0,f.useRef)(!0);return(0,f.useLayoutEffect)(()=>{e||(t.current.style.height="0px",t.current.style.overflow="hidden")},[]),(0,f.useEffect)(()=>{let i;if(r.current){r.current=!1;return}let o=t.current,a=()=>{e&&(o.style.removeProperty("height"),o.style.removeProperty("overflow"),n.current.scrollIntoView({behavior:"smooth",block:"nearest"}))};o.addEventListener("transitionend",a,{once:!0});let{height:l}=n.current.getBoundingClientRect();return o.style.height=l+"px",e||(o.style.overflow="hidden",i=window.setTimeout(()=>o.style.height="0px",50)),()=>{o.removeEventListener("transitionend",a),clearTimeout(i)}},[e]),{wrapperRef:t,contentRef:n}}(o),s=nq(),c=([e,t])=>{var n;return(i2(t)?null===(n=s.getInput(t.path))||void 0===n?void 0:n.order:s.getFolderSettings(im(r,e)).order)||0},u=Object.entries(i).sort((e,t)=>c(e)-c(t));return f.createElement(ri,{ref:a,isRoot:e,fill:t,flat:n},f.createElement(ra,{ref:l,isRoot:e,toggled:o},u.map(([e,t])=>i2(t)?f.createElement(ol,{key:t.path,valueKey:t.valueKey,path:t.path}):f.createElement(oc,{key:e,name:e,path:r,tree:t}))))}),od=nJ("div",{position:"relative",fontFamily:"$mono",fontSize:"$root",color:"$rootText",backgroundColor:"$elevation1",variants:{fill:{false:{position:"fixed",top:"10px",right:"10px",zIndex:1e3,width:"$rootWidth"},true:{position:"relative",width:"100%"}},flat:{false:{borderRadius:"$lg",boxShadow:"$level1"}},oneLineLabels:{true:{[`${rs}`]:{gridTemplateColumns:"auto",gridAutoColumns:"minmax(max-content, 1fr)",gridAutoRows:"minmax($sizes$rowHeight), auto)",rowGap:0,columnGap:0,marginTop:"$rowGap"}}},hideTitleBar:{true:{$$titleBarHeight:"0px"},false:{$$titleBarHeight:"$sizes$titleBarHeight"}}},"&,*,*:after,*:before":{boxSizing:"border-box"},"*::selection":{backgroundColor:"$accent2"}}),of=nJ("i",{$flexCenter:"",width:40,userSelect:"none",cursor:"pointer","> svg":{fill:"$highlight1",transition:"transform 350ms ease, fill 250ms ease"},"&:hover > svg":{fill:"$highlight3"},variants:{active:{true:{"> svg":{fill:"$highlight2"}}}}}),op=nJ("div",{display:"flex",alignItems:"stretch",justifyContent:"space-between",height:"$titleBarHeight",variants:{mode:{drag:{cursor:"grab"}}}}),oh=nJ("div",{$flex:"",position:"relative",width:"100%",overflow:"hidden",transition:"height 250ms ease",color:"$highlight3",paddingLeft:"$md",[`> ${of}`]:{height:30},variants:{toggled:{true:{height:30},false:{height:0}}}}),om=nJ("input",{$reset:"",flex:1,position:"relative",height:30,width:"100%",backgroundColor:"transparent",fontSize:"10px",borderRadius:"$root","&:focus":{},"&::placeholder":{color:"$highlight2"}}),og=nJ("div",{touchAction:"none",$flexCenter:"",flex:1,"> svg":{fill:"$highlight1"},color:"$highlight1",variants:{drag:{true:{$draggable:"","> svg":{transition:"fill 250ms ease"},"&:hover":{color:"$highlight3"},"&:hover > svg":{fill:"$highlight3"}}},filterEnabled:{false:{paddingRight:40}}}}),ov=f.forwardRef(({setFilter:e,toggle:t},n)=>{let[r,i]=(0,f.useState)(""),o=(0,f.useMemo)(()=>nI(e,250),[e]),a=()=>{e(""),i("")};return(0,f.useEffect)(()=>{o(r)},[r,o]),f.createElement(f.Fragment,null,f.createElement(om,{ref:n,value:r,placeholder:"[Open filter with CMD+SHIFT+L]",onPointerDown:e=>e.stopPropagation(),onChange:e=>{let n=e.currentTarget.value;t(!0),i(n)}}),f.createElement(of,{onClick:()=>a(),style:{visibility:r?"visible":"hidden"}},f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"14",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"}))))});function oy({setFilter:e,onDrag:t,onDragStart:n,onDragEnd:r,toggle:i,toggled:o,title:a,drag:l,filterEnabled:s,from:c}){let[u,d]=(0,f.useState)(!1),p=(0,f.useRef)(null);(0,f.useEffect)(()=>{var e,t;u?null===(e=p.current)||void 0===e||e.focus():null===(t=p.current)||void 0===t||t.blur()},[u]);let h=rC(({offset:[e,i],first:o,last:a})=>{t({x:e,y:i}),o&&n({x:e,y:i}),a&&r({x:e,y:i})},{filterTaps:!0,from:({offset:[e,t]})=>[(null==c?void 0:c.x)||e,(null==c?void 0:c.y)||t]});return(0,f.useEffect)(()=>{let e=e=>{"L"===e.key&&e.shiftKey&&e.metaKey&&d(e=>!e)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]),f.createElement(f.Fragment,null,f.createElement(op,{mode:l?"drag":void 0},f.createElement(of,{active:!o,onClick:()=>i()},f.createElement(rE,{toggled:o,width:12,height:8})),f.createElement(og,nF({},l?h():{},{drag:l,filterEnabled:s}),void 0===a&&l?f.createElement("svg",{width:"20",height:"10",viewBox:"0 0 28 14",xmlns:"http://www.w3.org/2000/svg"},f.createElement("circle",{cx:"2",cy:"2",r:"2"}),f.createElement("circle",{cx:"14",cy:"2",r:"2"}),f.createElement("circle",{cx:"26",cy:"2",r:"2"}),f.createElement("circle",{cx:"2",cy:"12",r:"2"}),f.createElement("circle",{cx:"14",cy:"12",r:"2"}),f.createElement("circle",{cx:"26",cy:"12",r:"2"})):a),s&&f.createElement(of,{active:u,onClick:()=>d(e=>!e)},f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"20",viewBox:"0 0 20 20"},f.createElement("path",{d:"M9 9a2 2 0 114 0 2 2 0 01-4 0z"}),f.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z",clipRule:"evenodd"})))),f.createElement(oh,{toggled:u},f.createElement(ov,{ref:p,setFilter:e,toggle:i})))}function ox(e){return"string"==typeof e?new h.Color(e).convertLinearToSRGB():e}function ob(e){return e instanceof h.Vector3||e instanceof h.Vector2||e instanceof h.Vector4||e instanceof h.Matrix3||e instanceof h.Matrix4}function o_(e){return ob(e)?e.toArray():e instanceof h.Color?"#"+e.clone().convertLinearToSRGB().getHexString():e instanceof h.Texture?e.image.src:e}f.memo(({store:e,rootClass:t,fill:n=!1,flat:r=!1,neverHide:i=!1,oneLineLabels:o=!1,titleBar:a={title:void 0,drag:!0,filter:!0,position:void 0,onDrag:void 0,onDragStart:void 0,onDragEnd:void 0},hideCopyButton:l=!1,toggled:s,setToggle:c})=>{var u,d;let p=ig(e),[h,m]=(0,f.useState)(""),g=(0,f.useMemo)(()=>i3(p,h),[p,h]),[v,y]=rT(),x=i||p.length>0,b="object"==typeof a&&a.title||void 0,_="object"!=typeof a||null===(u=a.drag)||void 0===u||u,w="object"!=typeof a||null===(d=a.filter)||void 0===d||d,E="object"==typeof a&&a.position||void 0,S="object"==typeof a&&a.onDrag||void 0,P="object"==typeof a&&a.onDragStart||void 0,M="object"==typeof a&&a.onDragEnd||void 0;return f.useEffect(()=>{y({x:null==E?void 0:E.x,y:null==E?void 0:E.y})},[E,y]),n3(),f.createElement(nY.Provider,{value:{hideCopyButton:l}},f.createElement(od,{ref:v,className:t,fill:n,flat:r,oneLineLabels:o,hideTitleBar:!a,style:{display:x?"block":"none"}},a&&f.createElement(oy,{onDrag:e=>{y(e),null==S||S(e)},onDragStart:e=>null==P?void 0:P(e),onDragEnd:e=>null==M?void 0:M(e),setFilter:m,toggle:e=>c(t=>null!=e?e:!t),toggled:s,title:b,drag:_,filterEnabled:w,from:E}),x&&f.createElement(nG.Provider,{value:e},f.createElement(ou,{isRoot:!0,fill:n,flat:r,tree:g,toggled:s}))))}),nc(o.SELECT,rK),nc(o.IMAGE,iF),nc(o.NUMBER,rU),nc(o.COLOR,iC),nc(o.STRING,rX),nc(o.BOOLEAN,r1),nc(o.INTERVAL,iJ),nc(o.VECTOR3D,iT),nc(o.VECTOR2D,iI);let ow={normal:"normal",add:"add",subtract:"subtract",multiply:"multiply",lighten:"lighten",darken:"darken",divide:"divide",overlay:"overlay",screen:"screen",softlight:"softlight",negation:"negation",reflect:"reflect"},oE={perlin:"perlin",simplex:"simplex",cell:"cell",curl:"curl",white:"white"},oS={local:"local",world:"world",uv:"uv"},oP={phong:h.MeshPhongMaterial,physical:h.MeshPhysicalMaterial,toon:h.MeshToonMaterial,basic:h.MeshBasicMaterial,lambert:h.MeshLambertMaterial,standard:h.MeshStandardMaterial};class oM{constructor(e,t,n){this.uuid=h.MathUtils.generateUUID().replace(/-/g,"_"),this.name="LayerMaterial",this.mode="normal",this.visible=!0;let r=Object.getOwnPropertyNames(e).filter(e=>e.startsWith("u_")).reduce((t,n)=>{var r;let i=null==(r=Object.getOwnPropertyDescriptor(e,n))?void 0:r.value;return(ob(i)||i instanceof h.Color)&&(i=i.clone()),{...t,[n.slice(1)]:i}},{});for(let e in r){let n=e.split("_")[1];(null==t?void 0:t[n])!==void 0&&(r[e]=t[n])}t&&Object.keys(t).map(e=>{void 0!==t[e]&&(this[e]=t[e])}),this.uniforms={},this.schema=[];let i={};Object.keys(r).map(e=>{let t=e.split("_")[1];this.uniforms[`u_${this.uuid}_${t}`]={value:ox(r[e])},this.schema.push({value:r[e],label:t}),i[t]={set:e=>{this.uniforms[`u_${this.uuid}_${t}`].value=ox(e)},get:()=>this.uniforms[`u_${this.uuid}_${t}`].value}}),null!=t&&t.name&&(this.name=t.name),null!=t&&t.mode&&(this.mode=t.mode),null!=t&&t.visible&&(this.visible=t.visible),Object.defineProperties(this,i),this.vertexShader="",this.fragmentShader="",this.vertexVariables="",this.fragmentVariables="",this.onParse=n,this.buildShaders(e),this.schema.push({value:this.mode,label:"mode",options:Object.values(ow)}),this.schema.push({value:this.visible,label:"visible"})}buildShaders(e){var t;let n=Object.getOwnPropertyNames(e).filter(e=>"fragmentShader"===e||"vertexShader"===e).reduce((t,n)=>{var r;return{...t,[n]:null==(r=Object.getOwnPropertyDescriptor(e,n))?void 0:r.value}},{}),r={vert:g()(n.vertexShader||""),frag:g()(n.fragmentShader||"")},i={vert:y()(r.vert,this.renameTokens.bind(this)),frag:y()(r.frag,this.renameTokens.bind(this))},o={vert:w()(i.vert),frag:w()(i.frag)},a={vert:o.vert.map(e=>e.name).indexOf("main"),frag:o.frag.map(e=>e.name).indexOf("main")},l={vert:a.vert>=0?b()(i.vert.slice(0,o.vert[a.vert].outer[0])):"",frag:a.frag>=0?b()(i.frag.slice(0,o.frag[a.frag].outer[0])):""},s={vert:a.vert>=0?this.getShaderFromIndex(i.vert,o.vert[a.vert].body):"",frag:a.frag>=0?this.getShaderFromIndex(i.frag,o.frag[a.frag].body):""};this.vertexShader=this.processFinal(s.vert,!0),this.fragmentShader=this.processFinal(s.frag),this.vertexVariables=l.vert,this.fragmentVariables=l.frag,null==(t=this.onParse)||t.call(this,this),this.schema=this.schema.filter((e,t)=>{let n=e.label;return t===this.schema.findIndex(e=>e.label===n)})}renameTokens(e){if(e.startsWith("u_")){let t=e.slice(2);return`u_${this.uuid}_${t}`}if(e.startsWith("v_")){let t=e.slice(2);return`v_${this.uuid}_${t}`}if(!e.startsWith("f_"))return e;{let t=e.slice(2);return`f_${this.uuid}_${t}`}}processFinal(e,t){let n=e.replace(/\sf_/gm,` f_${this.uuid}_`).replace(/\(f_/gm,`(f_${this.uuid}_`),r=n.match(/^.*return.*$/gm),i=n.replace(/^.*return.*$/gm,"");if(null!=r&&r[0]){let e=r[0].replace("return","").trim().replace(";",""),n=this.getBlendMode(e,"lamina_finalColor");i+=t?`lamina_finalPosition = ${e};`:`lamina_finalColor = ${n};`}return i}getShaderFromIndex(e,t){return b()(e.slice(t[0],t[1]))}getBlendMode(e,t){switch(this.mode){default:case"normal":return`lamina_blend_alpha(${t}, ${e}, ${e}.a)`;case"add":return`lamina_blend_add(${t}, ${e}, ${e}.a)`;case"subtract":return`lamina_blend_subtract(${t}, ${e}, ${e}.a)`;case"multiply":return`lamina_blend_multiply(${t}, ${e}, ${e}.a)`;case"lighten":return`lamina_blend_lighten(${t}, ${e}, ${e}.a)`;case"darken":return`lamina_blend_darken(${t}, ${e}, ${e}.a)`;case"divide":return`lamina_blend_divide(${t}, ${e}, ${e}.a)`;case"overlay":return`lamina_blend_overlay(${t}, ${e}, ${e}.a)`;case"screen":return`lamina_blend_screen(${t}, ${e}, ${e}.a)`;case"softlight":return`lamina_blend_softlight(${t}, ${e}, ${e}.a)`;case"reflect":return`lamina_blend_reflect(${t}, ${e}, ${e}.a)`;case"negation":return`lamina_blend_negation(${t}, ${e}, ${e}.a)`}}getSchema(){return this.schema.map(({label:e,options:t,...n})=>({label:e,options:t,...function(e){switch(e){case"alpha":return{min:0,max:1};case"scale":return{min:0};case"map":return{image:void 0};default:return{}}}(e),...n,value:o_(this[e])}))}serialize(){let e=this.constructor.name.split("$")[0],t=Object.keys(this);t=t.filter(e=>!["uuid","uniforms","schema","fragmentShader","vertexShader","fragmentVariables","vertexVariables","attribs","events","__r3f","onParse"].includes(e));let n={};t.forEach(e=>{n[e]=this[e]});let r={};for(let e in this.uniforms)r[e.replace(`u_${this.uuid}_`,"")]=o_(this.uniforms[e].value);return{constructor:e,properties:{...r,...n}}}}class oC extends oM{constructor(e){super(oC,{name:"Depth",...e},e=>{e.schema.push({value:e.mapping,label:"mapping",options:["vector","world","camera"]});let t=oC.getMapping(e.uuid,e.mapping);e.fragmentShader=e.fragmentShader.replace("lamina_mapping_template",t)}),this.mapping="vector"}static getMapping(e,t){switch(t){default:case"vector":return`length(v_${e}_worldPosition - u_${e}_origin)`;case"world":return`length(v_${e}_position - vec3(0.))`;case"camera":return`length(v_${e}_worldPosition - cameraPosition)`}}}oC.u_near=2,oC.u_far=10,oC.u_origin=new h.Vector3(0,0,0),oC.u_colorA="white",oC.u_colorB="black",oC.u_alpha=1,oC.vertexShader=`
  varying vec3 v_worldPosition;
  varying vec3 v_position;

  void main() {
    v_worldPosition = (vec4(position, 1.0) * modelMatrix).xyz;
    v_position = position;
  }
  `,oC.fragmentShader=`   
    uniform float u_alpha;
    uniform float u_near;
    uniform float u_far;
    uniform float u_isVector;
    uniform vec3 u_origin;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;

    varying vec3 v_worldPosition;
    varying vec3 v_position;

    void main() {
      float f_dist = lamina_mapping_template;
      float f_depth = (f_dist - u_near) / (u_far - u_near);
			vec3 f_depthColor =  mix(u_colorB, u_colorA, 1.0 - clamp(f_depth, 0., 1.));
  
  
      return vec4(f_depthColor, u_alpha);
    }
  `;class oT extends oM{constructor(e){super(oT,{name:"Color",...e})}}oT.u_color="red",oT.u_alpha=1,oT.fragmentShader=`   
    uniform vec3 u_color;
    uniform float u_alpha;

    void main() {
      return vec4(u_color, u_alpha);
    }
  `;class oz extends oM{constructor(e){super(oz,{name:"noise",...e},e=>{e.schema.push({value:e.type,label:"type",options:Object.values(oE)}),e.schema.push({value:e.mapping,label:"mapping",options:Object.values(oS)});let t=oz.getNoiseFunction(e.type),n=oz.getMapping(e.mapping);e.vertexShader=e.vertexShader.replace("lamina_mapping_template",n),e.fragmentShader=e.fragmentShader.replace("lamina_noise_template",t)}),this.type="perlin",this.mapping="local"}static getNoiseFunction(e){switch(e){default:case"perlin":return"lamina_noise_perlin";case"simplex":return"lamina_noise_simplex";case"cell":return"lamina_noise_worley";case"white":return"lamina_noise_white";case"curl":return"lamina_noise_swirl"}}static getMapping(e){switch(e){default:case"local":return"position";case"world":return"(modelMatrix * vec4(position,1.0)).xyz";case"uv":return"vec3(uv, 0.)"}}}oz.u_colorA="#666666",oz.u_colorB="#666666",oz.u_colorC="#FFFFFF",oz.u_colorD="#FFFFFF",oz.u_alpha=1,oz.u_scale=1,oz.u_offset=new h.Vector3(0,0,0),oz.vertexShader=`
    varying vec3 v_position;

    void main() {
        v_position = lamina_mapping_template;
    }
  `,oz.fragmentShader=`   
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_colorC;
    uniform vec3 u_colorD;
    uniform vec3 u_offset;

    uniform float u_alpha;
    uniform float u_scale;

    varying vec3 v_position;


    void main() {
        float f_n = lamina_noise_template((v_position + u_offset) * u_scale);

        float f_step1 = 0.;
        float f_step2 = 0.2;
        float f_step3 = 0.6;
        float f_step4 = 1.;

        vec3 f_color = mix(u_colorA, u_colorB, smoothstep(f_step1, f_step2, f_n));
        f_color = mix(f_color, u_colorC, smoothstep(f_step2, f_step3, f_n));
        f_color = mix(f_color, u_colorD, smoothstep(f_step3, f_step4, f_n));

        return vec4(f_color, u_alpha);
    }
  `;class oA extends oM{constructor(e){super(oA,{name:"Fresnel",...e})}}oA.u_color="white",oA.u_alpha=1,oA.u_bias=0,oA.u_intensity=1,oA.u_power=2,oA.u_factor=1,oA.vertexShader=`
    varying vec3 v_worldPosition;
    varying vec3 v_worldNormal;

    void main() {
        v_worldPosition = vec3(-viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2]);
        v_worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
        
    }
  `,oA.fragmentShader=`   
    uniform vec3 u_color;
    uniform float u_alpha;
    uniform float u_bias;
    uniform float u_intensity;
    uniform float u_power;
    uniform float u_factor;

    varying vec3 v_worldPosition;
    varying vec3 v_worldNormal;

    void main() {
        float f_a = (u_factor  + dot(v_worldPosition, v_worldNormal));
        float f_fresnel = u_bias + u_intensity * pow(abs(f_a), u_power);

        f_fresnel = clamp(f_fresnel, 0.0, 1.0);
        return vec4(f_fresnel * u_color, u_alpha);
    }
  `;class oO extends oM{constructor(e){super(oO,{name:"Gradient",...e},e=>{e.schema.push({value:e.axes,label:"axes",options:["x","y","z"]}),e.schema.push({value:e.mapping,label:"mapping",options:Object.values(oS)});let t=oO.getMapping(e.mapping);e.vertexShader=e.vertexShader.replace("lamina_mapping_template",t||"local"),e.fragmentShader=e.fragmentShader.replace("axes_template",e.axes||"x")}),this.axes="x",this.mapping="local"}static getMapping(e){switch(e){default:case"local":return"position";case"world":return"(modelMatrix * vec4(position,1.0)).xyz";case"uv":return"vec3(uv, 0.)"}}}oO.u_colorA="white",oO.u_colorB="black",oO.u_alpha=1,oO.u_start=1,oO.u_end=-1,oO.u_contrast=1,oO.vertexShader=`
		varying vec3 v_position;

		vod main() {
      v_position = lamina_mapping_template;
		}
  `,oO.fragmentShader=`   
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_axis;
    uniform float u_alpha;
    uniform float u_start;
    uniform float u_end;
    uniform float u_contrast;

		varying vec3 v_position;

    void main() {

      float f_step = smoothstep(u_start, u_end, v_position.axes_template * u_contrast);
      vec3 f_color = mix(u_colorA, u_colorB, f_step);

      return vec4(f_color, u_alpha);
    }
  `;class o$ extends oM{constructor(e){super(o$,{name:"Matcap",...e})}}o$.u_alpha=1,o$.u_map=void 0,o$.vertexShader=`
    varying vec3 v_position;
    varying vec3 v_normal;
    
    void main() {
      v_position = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );
      v_normal = normalize( normalMatrix * normal );
    }
    `,o$.fragmentShader=` 
		uniform sampler2D u_map;  
		uniform float u_alpha;  
		varying vec3 v_position;
		varying vec3 v_normal;

		
    void main() {
			vec3 f_r = reflect( v_position, v_normal );
			float f_m = 2. * sqrt( pow( f_r.x, 2. ) + pow( f_r.y, 2. ) + pow( f_r.z + 1., 2. ) );
			vec2 f_vN = f_r.xy / f_m + .5;

			vec3 f_base = texture2D(u_map, f_vN).rgb;

      return vec4(f_base, u_alpha);
    }
  `;class ok extends oM{constructor(e){super(ok,{name:"Texture",...e})}}ok.u_alpha=1,ok.u_map=void 0,ok.vertexShader=`
    varying vec2 v_uv;
    
    void main() {
        v_uv = uv;
    }
    `,ok.fragmentShader=` 
		uniform sampler2D u_map;  
		uniform float u_alpha;  
		varying vec2 v_uv;

    void main() {
			vec4 f_color = texture2D(u_map, v_uv);
      return vec4(f_color.rgb, f_color.a * u_alpha);
    }
  `;class oR extends oM{constructor(e){super(oR,{name:"Displace",...e},e=>{e.schema.push({value:e.type,label:"type",options:Object.values(oE)}),e.schema.push({value:e.mapping,label:"mapping",options:Object.values(oS)});let t=oR.getNoiseFunction(e.type),n=oR.getMapping(e.mapping);e.vertexVariables=e.vertexVariables.replace("lamina_mapping_template",n),e.vertexVariables=e.vertexVariables.replace("lamina_noise_template",t)}),this.type="perlin",this.mapping="local"}static getNoiseFunction(e){switch(e){default:case"perlin":return"lamina_noise_perlin";case"simplex":return"lamina_noise_simplex";case"cell":return"lamina_noise_worley";case"white":return"lamina_noise_white";case"curl":return"lamina_noise_swirl"}}static getMapping(e){switch(e){default:case"local":return"p";case"world":return"(modelMatrix * vec4(p,1.0)).xyz";case"uv":return"vec3(uv, 0.)"}}}oR.u_strength=1,oR.u_scale=1,oR.u_offset=new h.Vector3(0,0,0),oR.vertexShader=`
       
      uniform float u_strength;
      uniform float u_scale;
      uniform vec3 u_offset;

      vec3 displace(vec3 p) {
				vec3 f_position = lamina_mapping_template;
        float f_n = lamina_noise_template((f_position + u_offset) * u_scale) * u_strength;
        vec3 f_newPosition = p + (f_n * normal);

				return f_newPosition;
      }

      
			vec3 orthogonal(vec3 v) {
  		  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  		  : vec3(0.0, -v.z, v.y));
  		}
  		vec3 recalcNormals(vec3 newPos) {
  		  float offset = 0.001;
  		  vec3 tangent = orthogonal(normal);
  		  vec3 bitangent = normalize(cross(normal, tangent));
  		  vec3 neighbour1 = position + tangent * offset;
  		  vec3 neighbour2 = position + bitangent * offset;
  		  vec3 displacedNeighbour1 = displace(neighbour1);
  		  vec3 displacedNeighbour2 = displace(neighbour2);
  		  vec3 displacedTangent = displacedNeighbour1 - newPos;
  		  vec3 displacedBitangent = displacedNeighbour2 - newPos;
  		  return normalize(cross(displacedTangent, displacedBitangent));
  		}
  
  
      void main() {
       
				vec3 f_newPosition = displace(position);
        lamina_finalNormal = recalcNormals(f_newPosition);

        return f_newPosition;
      }
    `;class oI extends oM{constructor(e){super(oI,{name:"Normal",...e})}}oI.u_alpha=1,oI.u_direction=new h.Vector3(1,1,1),oI.vertexShader=`   
  varying vec3 v_normals; 

  void main() {
    v_normals = normal;
  }
`,oI.fragmentShader=`   
  	uniform float u_alpha;
  	uniform vec3 u_color;
  	uniform vec3 u_direction;

		varying vec3 v_normals;

    void main() {
			vec3 f_normalColor = vec3(1.);
      f_normalColor.x = v_normals.x * u_direction.x;
      f_normalColor.y = v_normals.y * u_direction.y;
      f_normalColor.z = v_normals.z * u_direction.z;

      return vec4(f_normalColor, u_alpha);
    }
  `;var oL=`
vec4 lamina_blend_add(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(min(x.xyz + y.xyz, 1.0) * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec3 lamina_blend_alpha(const in vec3 x, const in vec3 y, const in float opacity) {

	return y * opacity + x * (1.0 - opacity);

}

vec4 lamina_blend_alpha(const in vec4 x, const in vec4 y, const in float opacity) {

	float a = min(y.a, opacity);

	return vec4(lamina_blend_alpha(x.rgb, y.rgb, a), x.a);

}
vec4 lamina_blend_average(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4((x.xyz + y.xyz) * 0.5 * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_color_burn(const in float x, const in float y) {

	return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);

}

vec4 lamina_blend_color_burn(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_color_burn(x.r, y.r),
		lamina_blend_color_burn(x.g, y.g),
		lamina_blend_color_burn(x.b, y.b),
		lamina_blend_color_burn(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_color_dodge(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);

}

vec4 lamina_blend_color_dodge(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_color_dodge(x.r, y.r),
		lamina_blend_color_dodge(x.g, y.g),
		lamina_blend_color_dodge(x.b, y.b),
		lamina_blend_color_dodge(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_darken(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(min(x.xyz, y.xyz) * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_difference(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(abs(x.xyz - y.xyz) * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_divide(const in float x, const in float y) {

	return (y > 0.0) ? min(x / y, 1.0) : 1.0;

}

vec4 lamina_blend_divide(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_divide(x.r, y.r),
		lamina_blend_divide(x.g, y.g),
		lamina_blend_divide(x.b, y.b),
		lamina_blend_divide(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_exclusion(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4((x.xyz + y.xyz - 2.0 * x.xyz * y.xyz) * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_lighten(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(max(x.xyz, y.xyz) * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_multiply(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4( x.xyz * y.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_negation(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4((1.0 - abs(1.0 - x.xyz - y.xyz)) * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_normal(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(y.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_overlay(const in float x, const in float y) {

	return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));

}

vec4 lamina_blend_overlay(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_overlay(x.r, y.r),
		lamina_blend_overlay(x.g, y.g),
		lamina_blend_overlay(x.b, y.b),
		lamina_blend_overlay(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_reflect(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);

}

vec4 lamina_blend_reflect(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_reflect(x.r, y.r),
		lamina_blend_reflect(x.g, y.g),
		lamina_blend_reflect(x.b, y.b),
		lamina_blend_reflect(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_screen(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4((1.0 - (1.0 - x.xyz) * (1.0 - y.xyz)) * opacity + x.xyz * (1.0 - opacity), x.a);

}
float lamina_blend_softlight(const in float x, const in float y) {

	return (y < 0.5) ?
		(2.0 * x * y + x * x * (1.0 - 2.0 * y)) :
		(sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));

}

vec4 lamina_blend_softlight(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		lamina_blend_softlight(x.r, y.r),
		lamina_blend_softlight(x.g, y.g),
		lamina_blend_softlight(x.b, y.b),
		lamina_blend_softlight(x.a, y.a)
	);

	return vec4(z.xyz * opacity + x.xyz * (1.0 - opacity), x.a);

}
vec4 lamina_blend_subtract(const in vec4 x, const in vec4 y, const in float opacity) {

	return vec4(max(x.xyz + y.xyz - 1.0, 0.0) * opacity + x.xyz * (1.0 - opacity), x.a);

}

`,oD=`

// From: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
// Huge thanks to the creators of these algorithms

float lamina_noise_mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 lamina_noise_mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 lamina_noise_perm(vec4 x){return lamina_noise_mod289(((x * 34.0) + 1.0) * x);}
vec4 lamina_noise_permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 lamina_noise_taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }


float lamina_noise_white(vec2 p) {
  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) *
               (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

float lamina_noise_white(vec3 p) {
  return lamina_noise_white(p.xy);
}


vec3 lamina_noise_fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float lamina_noise_perlin(vec3 P) {
  vec3 Pi0 = floor(P);        // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);        // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = lamina_noise_permute(lamina_noise_permute(ix) + iy);
  vec4 ixy0 = lamina_noise_permute(ixy + iz0);
  vec4 ixy1 = lamina_noise_permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = lamina_noise_taylorInvSqrt(
      vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = lamina_noise_taylorInvSqrt(
      vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = lamina_noise_fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111),
                 fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return lamina_normalize(2.2 * n_xyz);
}

float lamina_noise_simplex(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  //  x0 = x0 - 0. + 0.0 * C
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  // Permutations
  i = mod(i, 289.0);
  vec4 p = lamina_noise_permute(lamina_noise_permute(lamina_noise_permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y +
                             vec4(0.0, i1.y, i2.y, 1.0)) +
                    i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0 / 7.0; // N=7
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z); //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_); // mod(j,N)

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm =
      lamina_noise_taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m =
      max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return lamina_normalize(42.0 *
         dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))));
}

vec3 lamina_noise_simplex3(vec3 x) {
  float s = lamina_noise_simplex(vec3(x));
  float s1 = lamina_noise_simplex(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
  float s2 = lamina_noise_simplex(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
  vec3 c = vec3(s, s1, s2);
  return c;
}

vec3 lamina_noise_curl(vec3 p) {
  const float e = .1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 p_x0 = lamina_noise_simplex3(p - dx);
  vec3 p_x1 = lamina_noise_simplex3(p + dx);
  vec3 p_y0 = lamina_noise_simplex3(p - dy);
  vec3 p_y1 = lamina_noise_simplex3(p + dy);
  vec3 p_z0 = lamina_noise_simplex3(p - dz);
  vec3 p_z1 = lamina_noise_simplex3(p + dz);

  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

  const float divisor = 1.0 / (2.0 * e);
  return normalize(vec3(x, y, z) * divisor);
}

vec3 lamina_permute(vec3 x) {
  return mod((34.0 * x + 1.0) * x, 289.0);
}

vec3 lamina_dist(vec3 x, vec3 y, vec3 z,  bool manhattanDistance) {
  return manhattanDistance ?  abs(x) + abs(y) + abs(z) :  (x * x + y * y + z * z);
}

// From: https://github.com/Erkaman/glsl-worley
float lamina_noise_worley(vec3 P) {
  float jitter = 1.;
  bool manhattanDistance = false; 

  float K = 0.142857142857; // 1/7
  float Ko = 0.428571428571; // 1/2-K/2
  float  K2 = 0.020408163265306; // 1/(7*7)
  float Kz = 0.166666666667; // 1/6
  float Kzo = 0.416666666667; // 1/2-1/6*2

	vec3 Pi = mod(floor(P), 289.0);
 	vec3 Pf = fract(P) - 0.5;

	vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);
	vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);
	vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);

	vec3 p = lamina_permute(Pi.x + vec3(-1.0, 0.0, 1.0));
	vec3 p1 = lamina_permute(p + Pi.y - 1.0);
	vec3 p2 = lamina_permute(p + Pi.y);
	vec3 p3 = lamina_permute(p + Pi.y + 1.0);

	vec3 p11 = lamina_permute(p1 + Pi.z - 1.0);
	vec3 p12 = lamina_permute(p1 + Pi.z);
	vec3 p13 = lamina_permute(p1 + Pi.z + 1.0);

	vec3 p21 = lamina_permute(p2 + Pi.z - 1.0);
	vec3 p22 = lamina_permute(p2 + Pi.z);
	vec3 p23 = lamina_permute(p2 + Pi.z + 1.0);

	vec3 p31 = lamina_permute(p3 + Pi.z - 1.0);
	vec3 p32 = lamina_permute(p3 + Pi.z);
	vec3 p33 = lamina_permute(p3 + Pi.z + 1.0);

	vec3 ox11 = fract(p11*K) - Ko;
	vec3 oy11 = mod(floor(p11*K), 7.0)*K - Ko;
	vec3 oz11 = floor(p11*K2)*Kz - Kzo; // p11 < 289 guaranteed

	vec3 ox12 = fract(p12*K) - Ko;
	vec3 oy12 = mod(floor(p12*K), 7.0)*K - Ko;
	vec3 oz12 = floor(p12*K2)*Kz - Kzo;

	vec3 ox13 = fract(p13*K) - Ko;
	vec3 oy13 = mod(floor(p13*K), 7.0)*K - Ko;
	vec3 oz13 = floor(p13*K2)*Kz - Kzo;

	vec3 ox21 = fract(p21*K) - Ko;
	vec3 oy21 = mod(floor(p21*K), 7.0)*K - Ko;
	vec3 oz21 = floor(p21*K2)*Kz - Kzo;

	vec3 ox22 = fract(p22*K) - Ko;
	vec3 oy22 = mod(floor(p22*K), 7.0)*K - Ko;
	vec3 oz22 = floor(p22*K2)*Kz - Kzo;

	vec3 ox23 = fract(p23*K) - Ko;
	vec3 oy23 = mod(floor(p23*K), 7.0)*K - Ko;
	vec3 oz23 = floor(p23*K2)*Kz - Kzo;

	vec3 ox31 = fract(p31*K) - Ko;
	vec3 oy31 = mod(floor(p31*K), 7.0)*K - Ko;
	vec3 oz31 = floor(p31*K2)*Kz - Kzo;

	vec3 ox32 = fract(p32*K) - Ko;
	vec3 oy32 = mod(floor(p32*K), 7.0)*K - Ko;
	vec3 oz32 = floor(p32*K2)*Kz - Kzo;

	vec3 ox33 = fract(p33*K) - Ko;
	vec3 oy33 = mod(floor(p33*K), 7.0)*K - Ko;
	vec3 oz33 = floor(p33*K2)*Kz - Kzo;

	vec3 dx11 = Pfx + jitter*ox11;
	vec3 dy11 = Pfy.x + jitter*oy11;
	vec3 dz11 = Pfz.x + jitter*oz11;

	vec3 dx12 = Pfx + jitter*ox12;
	vec3 dy12 = Pfy.x + jitter*oy12;
	vec3 dz12 = Pfz.y + jitter*oz12;

	vec3 dx13 = Pfx + jitter*ox13;
	vec3 dy13 = Pfy.x + jitter*oy13;
	vec3 dz13 = Pfz.z + jitter*oz13;

	vec3 dx21 = Pfx + jitter*ox21;
	vec3 dy21 = Pfy.y + jitter*oy21;
	vec3 dz21 = Pfz.x + jitter*oz21;

	vec3 dx22 = Pfx + jitter*ox22;
	vec3 dy22 = Pfy.y + jitter*oy22;
	vec3 dz22 = Pfz.y + jitter*oz22;

	vec3 dx23 = Pfx + jitter*ox23;
	vec3 dy23 = Pfy.y + jitter*oy23;
	vec3 dz23 = Pfz.z + jitter*oz23;

	vec3 dx31 = Pfx + jitter*ox31;
	vec3 dy31 = Pfy.z + jitter*oy31;
	vec3 dz31 = Pfz.x + jitter*oz31;

	vec3 dx32 = Pfx + jitter*ox32;
	vec3 dy32 = Pfy.z + jitter*oy32;
	vec3 dz32 = Pfz.y + jitter*oz32;

	vec3 dx33 = Pfx + jitter*ox33;
	vec3 dy33 = Pfy.z + jitter*oy33;
	vec3 dz33 = Pfz.z + jitter*oz33;

	vec3 d11 = lamina_dist(dx11, dy11, dz11, manhattanDistance);
	vec3 d12 = lamina_dist(dx12, dy12, dz12, manhattanDistance);
	vec3 d13 = lamina_dist(dx13, dy13, dz13, manhattanDistance);
	vec3 d21 = lamina_dist(dx21, dy21, dz21, manhattanDistance);
	vec3 d22 = lamina_dist(dx22, dy22, dz22, manhattanDistance);
	vec3 d23 = lamina_dist(dx23, dy23, dz23, manhattanDistance);
	vec3 d31 = lamina_dist(dx31, dy31, dz31, manhattanDistance);
	vec3 d32 = lamina_dist(dx32, dy32, dz32, manhattanDistance);
	vec3 d33 = lamina_dist(dx33, dy33, dz33, manhattanDistance);

	vec3 d1a = min(d11, d12);
	d12 = max(d11, d12);
	d11 = min(d1a, d13); // Smallest now not in d12 or d13
	d13 = max(d1a, d13);
	d12 = min(d12, d13); // 2nd smallest now not in d13
	vec3 d2a = min(d21, d22);
	d22 = max(d21, d22);
	d21 = min(d2a, d23); // Smallest now not in d22 or d23
	d23 = max(d2a, d23);
	d22 = min(d22, d23); // 2nd smallest now not in d23
	vec3 d3a = min(d31, d32);
	d32 = max(d31, d32);
	d31 = min(d3a, d33); // Smallest now not in d32 or d33
	d33 = max(d3a, d33);
	d32 = min(d32, d33); // 2nd smallest now not in d33
	vec3 da = min(d11, d21);
	d21 = max(d11, d21);
	d11 = min(da, d31); // Smallest now in d11
	d31 = max(da, d31); // 2nd smallest now not in d31
	d11.xy = (d11.x < d11.y) ? d11.xy : d11.yx;
	d11.xz = (d11.x < d11.z) ? d11.xz : d11.zx; // d11.x now smallest
	d12 = min(d12, d21); // 2nd smallest now not in d21
	d12 = min(d12, d22); // nor in d22
	d12 = min(d12, d31); // nor in d31
	d12 = min(d12, d32); // nor in d32
	d11.yz = min(d11.yz,d12.xy); // nor in d12.yz
	d11.y = min(d11.y,d12.z); // Only two more to go
	d11.y = min(d11.y,d11.z); // Done! (Phew!)

  vec2 F = sqrt(d11.xy);
	return F.x; // F1, F2

}

float lamina_noise_swirl(vec3 position) {
    float scale = 0.1;
    float freq = 4. * scale;
    float t = 1.;

    vec3 pos = (position * scale) + lamina_noise_curl(position * 7. * scale);

    float worley1 = 1. - lamina_noise_worley((pos * (freq * 2.)) +  (t * 2.));
    float worley2 = 1. - lamina_noise_worley((pos * (freq * 4.)) +  (t * 4.));
    float worley3 = 1. - lamina_noise_worley((pos * (freq * 8.)) +  (t * 8.));
    float worley4 = 1. - lamina_noise_worley((pos * (freq * 16.)) +  (t * 16.));
    
    float fbm1 = worley1 * .625 + worley2 * .25 + worley3 * .125;
    float fbm2 = worley2 * .625 + worley3 * .25 + worley4 * .125;
    float fbm3 = worley3 * .75 + worley4 * .25;

    vec3 curlWorleyFbm = vec3(fbm1, fbm2, fbm3);
    float curlWorley = curlWorleyFbm.r * .625 + curlWorleyFbm.g * .25 + 
        curlWorleyFbm.b * .125;

    return curlWorley;
}
  
  
`,oj=`

float lamina_map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float lamina_normalize(float v) { return lamina_map(v, -1.0, 1.0, 0.0, 1.0); }
`;class oN extends N{constructor({color:e,alpha:t,lighting:n,layers:r,name:i,...o}={}){super({baseMaterial:oP[n||"basic"],...o}),this.name="LayerMaterial",this.layers=[],this.lighting="basic";let a=e||"white";this.uniforms={u_lamina_color:{value:"string"==typeof a?new h.Color(a).convertSRGBToLinear():a},u_lamina_alpha:{value:null!=t?t:1}},this.layers=r||this.layers,this.lighting=n||this.lighting,this.name=i||this.name,this.refresh()}genShaders(){let e="",t="",n="",r="",i={};return this.layers.filter(e=>e.visible).forEach(o=>{e+=o.vertexVariables+"\n",t+=o.fragmentVariables+"\n",n+=o.vertexShader+"\n",r+=o.fragmentShader+"\n",i={...i,...o.uniforms}}),{uniforms:i={...i,...this.uniforms},vertexShader:`
        ${oj}
        ${oD}
        ${e}

        void main() {
          vec3 lamina_finalPosition = position;
          vec3 lamina_finalNormal = normal;

          ${n}

          csm_Position = lamina_finalPosition;
          csm_Normal = lamina_finalNormal;
        }
        `,fragmentShader:`
        ${oj}
        ${oD}
        ${oL}
        ${t}

        uniform vec3 u_lamina_color;
        uniform float u_lamina_alpha;

        void main() {
          vec4 lamina_finalColor = vec4(u_lamina_color, u_lamina_alpha);

          ${r}

          csm_DiffuseColor = lamina_finalColor;
         
        }
        `}}refresh(){let{uniforms:e,fragmentShader:t,vertexShader:n}=this.genShaders();super.update({fragmentShader:t,vertexShader:n,uniforms:e})}serialize(){return{constructor:"LayerMaterial",properties:{color:this.color,alpha:this.alpha,name:this.name,lighting:this.lighting}}}set color(e){var t,n;null!=(t=this.uniforms)&&null!=(n=t.u_lamina_color)&&n.value&&(this.uniforms.u_lamina_color.value="string"==typeof e?new h.Color(e).convertSRGBToLinear():e)}get color(){var e,t;return null==(e=this.uniforms)?void 0:null==(t=e.u_lamina_color)?void 0:t.value}set alpha(e){this.uniforms.u_lamina_alpha.value=e}get alpha(){return this.uniforms.u_lamina_alpha.value}}(0,d.e)({LayerMaterial:oN}),(0,d.e)({LayerMaterial:oN,Depth_:oC,Color_:oT,Noise_:oz,Fresnel_:oA,Gradient_:oO,Matcap_:o$,Texture_:ok,Displace_:oR,Normal_:oI});let oU=f.forwardRef(({children:e,...t},n)=>{let r=f.useRef(null);(0,f.useImperativeHandle)(n,()=>r.current),f.useLayoutEffect(()=>{r.current.layers=r.current.__r3f.objects,r.current.refresh()},[e]);let[i,o]=(0,f.useMemo)(()=>(function({color:e,alpha:t,lighting:n,name:r,...i}={}){return[{color:e,alpha:t,lighting:n,name:r},i]})(t),[t]);return f.createElement("layerMaterial",(0,u.Z)({args:[i],ref:r},o),e)}),oB=f.forwardRef((e,t)=>f.createElement("depth_",(0,u.Z)({args:[{mode:null==e?void 0:e.mode,visible:null==e?void 0:e.visible,type:null==e?void 0:e.type,mapping:null==e?void 0:e.mapping,map:null==e?void 0:e.map,axes:null==e?void 0:e.axes}],ref:t},e)))},58564:function(e){var t;t=function(){return(function e(t,n,r){function i(a,l){if(!n[a]){if(!t[a]){if(o)return o(a,!0);throw Error("Cannot find module '"+a+"'")}l=n[a]={exports:{}},t[a][0].call(l.exports,function(e){return i(t[a][1][e]||e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var o=void 0,a=0;a<r.length;a++)i(r[a]);return i})({1:[function(e,t,n){(function(r,i,o,a,l,s,c,u,d){"use strict";var f=e("crypto");function p(e,t){var n;return void 0===(n="passthrough"!==(t=g(e,t)).algorithm?f.createHash(t.algorithm):new x).write&&(n.write=n.update,n.end=n.update),y(t,n).dispatch(e),n.update||n.end(""),n.digest?n.digest("buffer"===t.encoding?void 0:t.encoding):(e=n.read(),"buffer"!==t.encoding?e.toString(t.encoding):e)}(n=t.exports=p).sha1=function(e){return p(e)},n.keys=function(e){return p(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return p(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return p(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var h=f.getHashes?f.getHashes().slice():["sha1","md5"],m=(h.push("passthrough"),["buffer","hex","binary","base64"]);function g(e,t){var n={};if(n.algorithm=(t=t||{}).algorithm||"sha1",n.encoding=t.encoding||"hex",n.excludeValues=!!t.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===t.ignoreUnknown,n.respectType=!1!==t.respectType,n.respectFunctionNames=!1!==t.respectFunctionNames,n.respectFunctionProperties=!1!==t.respectFunctionProperties,n.unorderedArrays=!0===t.unorderedArrays,n.unorderedSets=!1!==t.unorderedSets,n.unorderedObjects=!1!==t.unorderedObjects,n.replacer=t.replacer||void 0,n.excludeKeys=t.excludeKeys||void 0,void 0===e)throw Error("Object argument required.");for(var r=0;r<h.length;++r)h[r].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=h[r]);if(-1===h.indexOf(n.algorithm))throw Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+h.join(", "));if(-1===m.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw Error('Encoding "'+n.encoding+'"  not supported. supported values: '+m.join(", "));return n}function v(e){if("function"==typeof e)return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))}function y(e,t,n){function r(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")}return n=n||[],{dispatch:function(t){return this["_"+(null===(t=e.replacer?e.replacer(t):t)?"null":typeof t)](t)},_object:function(t){var i,a=Object.prototype.toString.call(t),l=/\[object (.*)\]/i.exec(a);if(l=(l=l?l[1]:"unknown:["+a+"]").toLowerCase(),0<=(a=n.indexOf(t)))return this.dispatch("[CIRCULAR:"+a+"]");if(n.push(t),void 0!==o&&o.isBuffer&&o.isBuffer(t))return r("buffer:"),r(t);if("object"===l||"function"===l||"asyncfunction"===l)return a=Object.keys(t),e.unorderedObjects&&(a=a.sort()),!1===e.respectType||v(t)||a.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(a=a.filter(function(t){return!e.excludeKeys(t)})),r("object:"+a.length+":"),i=this,a.forEach(function(n){i.dispatch(n),r(":"),e.excludeValues||i.dispatch(t[n]),r(",")});if(!this["_"+l]){if(e.ignoreUnknown)return r("["+l+"]");throw Error('Unknown object type "'+l+'"')}this["_"+l](t)},_array:function(t,i){i=void 0!==i?i:!1!==e.unorderedArrays;var o=this;if(r("array:"+t.length+":"),!i||t.length<=1)return t.forEach(function(e){return o.dispatch(e)});var a=[],i=t.map(function(t){var r=new x,i=n.slice();return y(e,r,i).dispatch(t),a=a.concat(i.slice(n.length)),r.read().toString()});return n=n.concat(a),i.sort(),this._array(i,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e.toString())},_function:function(t){r("fn:"),v(t)?this.dispatch("[native]"):this.dispatch(t.toString()),!1!==e.respectFunctionNames&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString())},_map:function(t){return r("map:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_set:function(t){return r("set:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_file:function(e){return r("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_bigint:function(e){return r("bigint:"+e.toString())},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function x(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}n.writeToStream=function(e,t,n){return void 0===n&&(n=t,t={}),y(t=g(e,t),n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_9a5aa49d.js","/")},{buffer:3,crypto:5,lYpoI2:11}],2:[function(e,t,n){(function(e,t,r,i,o,a,l,s,c){!function(e){"use strict";var t="undefined"!=typeof Uint8Array?Uint8Array:Array;function n(e){return 43===(e=e.charCodeAt(0))||45===e?62:47===e||95===e?63:e<48?-1:e<58?e-48+26+26:e<91?e-65:e<123?e-97+26:void 0}e.toByteArray=function(e){if(0<e.length%4)throw Error("Invalid string. Length must be a multiple of 4");var r,i,o=e.length,o="="===e.charAt(o-2)?2:"="===e.charAt(o-1)?1:0,a=new t(3*e.length/4-o),l=0<o?e.length-4:e.length,s=0;function c(e){a[s++]=e}for(r=0;r<l;r+=4)c((16711680&(i=n(e.charAt(r))<<18|n(e.charAt(r+1))<<12|n(e.charAt(r+2))<<6|n(e.charAt(r+3))))>>16),c((65280&i)>>8),c(255&i);return 2==o?c(255&(i=n(e.charAt(r))<<2|n(e.charAt(r+1))>>4)):1==o&&(c((i=n(e.charAt(r))<<10|n(e.charAt(r+1))<<4|n(e.charAt(r+2))>>2)>>8&255),c(255&i)),a},e.fromByteArray=function(e){var t,n,r,i,o=e.length%3,a="";function l(e){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)}for(t=0,r=e.length-o;t<r;t+=3)a+=l((i=n=(e[t]<<16)+(e[t+1]<<8)+e[t+2])>>18&63)+l(i>>12&63)+l(i>>6&63)+l(63&i);switch(o){case 1:a=(a+=l((n=e[e.length-1])>>2))+l(n<<4&63)+"==";break;case 2:a=(a=(a+=l((n=(e[e.length-2]<<8)+e[e.length-1])>>10))+l(n>>4&63))+l(n<<2&63)+"="}return a}}(void 0===n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:11}],3:[function(e,t,n){(function(t,r,i,o,a,l,s,c,u){var d=e("base64-js"),f=e("ieee754");function i(e,t,n){if(!(this instanceof i))return new i(e,t,n);var r,o,a,l,s=typeof e;if("base64"===t&&"string"==s)for(e=(l=e).trim?l.trim():l.replace(/^\s+|\s+$/g,"");e.length%4!=0;)e+="=";if("number"==s)r=C(e);else if("string"==s)r=i.byteLength(e,t);else{if("object"!=s)throw Error("First argument needs to be a number, array or string.");r=C(e.length)}if(i._useTypedArrays?o=i._augment(new Uint8Array(r)):((o=this).length=r,o._isBuffer=!0),i._useTypedArrays&&"number"==typeof e.byteLength)o._set(e);else if(T(l=e)||i.isBuffer(l)||l&&"object"==typeof l&&"number"==typeof l.length)for(a=0;a<r;a++)i.isBuffer(e)?o[a]=e.readUInt8(a):o[a]=e[a];else if("string"==s)o.write(e,0,t);else if("number"==s&&!i._useTypedArrays&&!n)for(a=0;a<r;a++)o[a]=0;return o}function p(e,t,n,r){r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+1<e.length,"Trying to read beyond buffer length"));var i,r=e.length;if(!(r<=t))return n?(i=e[t],t+1<r&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<r&&(i|=e[t+1])),i}function h(e,t,n,r){r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+3<e.length,"Trying to read beyond buffer length"));var i,r=e.length;if(!(r<=t))return n?(t+2<r&&(i=e[t+2]<<16),t+1<r&&(i|=e[t+1]<<8),i|=e[t],t+3<r&&(i+=e[t+3]<<24>>>0)):(t+1<r&&(i=e[t+1]<<16),t+2<r&&(i|=e[t+2]<<8),t+3<r&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}function m(e,t,n,r){if(r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+1<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 32768&(r=p(e,t,n,!0))?-1*(65535-r+1):r}function g(e,t,n,r){if(r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+3<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 2147483648&(r=h(e,t,n,!0))?-1*(4294967295-r+1):r}function v(e,t,n,r){return r||(D("boolean"==typeof n,"missing or invalid endian"),D(t+3<e.length,"Trying to read beyond buffer length")),f.read(e,t,n,23,4)}function y(e,t,n,r){return r||(D("boolean"==typeof n,"missing or invalid endian"),D(t+7<e.length,"Trying to read beyond buffer length")),f.read(e,t,n,52,8)}function x(e,t,n,r,i){if(i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+1<e.length,"trying to write beyond buffer length"),R(t,65535)),!((i=e.length)<=n))for(var o=0,a=Math.min(i-n,2);o<a;o++)e[n+o]=(t&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function b(e,t,n,r,i){if(i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"trying to write beyond buffer length"),R(t,4294967295)),!((i=e.length)<=n))for(var o=0,a=Math.min(i-n,4);o<a;o++)e[n+o]=t>>>8*(r?o:3-o)&255}function _(e,t,n,r,i){i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+1<e.length,"Trying to write beyond buffer length"),I(t,32767,-32768)),e.length<=n||x(e,0<=t?t:65535+t+1,n,r,i)}function w(e,t,n,r,i){i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"Trying to write beyond buffer length"),I(t,2147483647,-2147483648)),e.length<=n||b(e,0<=t?t:4294967295+t+1,n,r,i)}function E(e,t,n,r,i){i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"Trying to write beyond buffer length"),L(t,34028234663852886e22,-34028234663852886e22)),e.length<=n||f.write(e,t,n,r,23,4)}function S(e,t,n,r,i){i||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+7<e.length,"Trying to write beyond buffer length"),L(t,17976931348623157e292,-17976931348623157e292)),e.length<=n||f.write(e,t,n,r,52,8)}n.Buffer=i,n.SlowBuffer=i,n.INSPECT_MAX_BYTES=50,i.poolSize=8192,i._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),i.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},i.isBuffer=function(e){return!(null==e||!e._isBuffer)},i.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=A(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=O(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw Error("Unknown encoding")}return n},i.concat=function(e,t){if(D(T(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new i(0);if(1===e.length)return e[0];if("number"!=typeof t)for(o=t=0;o<e.length;o++)t+=e[o].length;for(var n=new i(t),r=0,o=0;o<e.length;o++){var a=e[o];a.copy(n,r),r+=a.length}return n},i.prototype.write=function(e,t,n,r){isFinite(t)?isFinite(n)||(r=n,n=void 0):(p=r,r=t,t=n,n=p),t=Number(t)||0;var o,a,l,s,c,u,d,f,p=this.length-t;switch((!n||p<(n=Number(n)))&&(n=p),r=String(r||"utf8").toLowerCase()){case"hex":c=function(e,t,n,r){n=Number(n)||0;var o=e.length-n;(!r||o<(r=Number(r)))&&(r=o),D((o=t.length)%2==0,"Invalid hex string"),o/2<r&&(r=o/2);for(var a=0;a<r;a++){var l=parseInt(t.substr(2*a,2),16);D(!isNaN(l),"Invalid hex string"),e[n+a]=l}return i._charsWritten=2*a,a}(this,e,t,n);break;case"utf8":case"utf-8":u=this,d=t,f=n,c=i._charsWritten=$(A(e),u,d,f);break;case"ascii":case"binary":o=t,a=n,c=i._charsWritten=$(function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}(e),this,o,a);break;case"base64":u=this,d=t,f=n,c=i._charsWritten=$(O(e),u,d,f);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":l=t,s=n,c=i._charsWritten=$(function(e){for(var t,n,r=[],i=0;i<e.length;i++)t=(n=e.charCodeAt(i))>>8,r.push(n%=256),r.push(t);return r}(e),this,l,s);break;default:throw Error("Unknown encoding")}return c},i.prototype.toString=function(e,t,n){var r,i,o;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,(n=void 0!==n?Number(n):this.length)===t)return"";switch(e){case"hex":r=function(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||r<n)&&(n=r);for(var i="",o=t;o<n;o++)i+=z(e[o]);return i}(this,t,n);break;case"utf8":case"utf-8":r=function(e,t,n){var r="",i="";n=Math.min(e.length,n);for(var o=t;o<n;o++)e[o]<=127?(r+=k(i)+String.fromCharCode(e[o]),i=""):i+="%"+e[o].toString(16);return r+k(i)}(this,t,n);break;case"ascii":case"binary":r=function(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;i++)r+=String.fromCharCode(e[i]);return r}(this,t,n);break;case"base64":o=n,r=0===(i=t)&&o===this.length?d.fromByteArray(this):d.fromByteArray(this.slice(i,o));break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=function(e,t,n){for(var r=e.slice(t,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}(this,t,n);break;default:throw Error("Unknown encoding")}return r},i.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},i.prototype.copy=function(e,t,n,r){if(t=t||0,(r=r||0===r?r:this.length)!==(n=n||0)&&0!==e.length&&0!==this.length){D(n<=r,"sourceEnd < sourceStart"),D(0<=t&&t<e.length,"targetStart out of bounds"),D(0<=n&&n<this.length,"sourceStart out of bounds"),D(0<=r&&r<=this.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length);var o=(r=e.length-t<r-n?e.length-t+n:r)-n;if(o<100||!i._useTypedArrays)for(var a=0;a<o;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+o),t)}},i.prototype.slice=function(e,t){var n=this.length;if(e=M(e,n,0),t=M(t,n,n),i._useTypedArrays)return i._augment(this.subarray(e,t));for(var r=t-e,o=new i(r,void 0,!0),a=0;a<r;a++)o[a]=this[a+e];return o},i.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},i.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},i.prototype.readUInt8=function(e,t){if(t||(D(null!=e,"missing offset"),D(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},i.prototype.readUInt16LE=function(e,t){return p(this,e,!0,t)},i.prototype.readUInt16BE=function(e,t){return p(this,e,!1,t)},i.prototype.readUInt32LE=function(e,t){return h(this,e,!0,t)},i.prototype.readUInt32BE=function(e,t){return h(this,e,!1,t)},i.prototype.readInt8=function(e,t){if(t||(D(null!=e,"missing offset"),D(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return 128&this[e]?-1*(255-this[e]+1):this[e]},i.prototype.readInt16LE=function(e,t){return m(this,e,!0,t)},i.prototype.readInt16BE=function(e,t){return m(this,e,!1,t)},i.prototype.readInt32LE=function(e,t){return g(this,e,!0,t)},i.prototype.readInt32BE=function(e,t){return g(this,e,!1,t)},i.prototype.readFloatLE=function(e,t){return v(this,e,!0,t)},i.prototype.readFloatBE=function(e,t){return v(this,e,!1,t)},i.prototype.readDoubleLE=function(e,t){return y(this,e,!0,t)},i.prototype.readDoubleBE=function(e,t){return y(this,e,!1,t)},i.prototype.writeUInt8=function(e,t,n){n||(D(null!=e,"missing value"),D(null!=t,"missing offset"),D(t<this.length,"trying to write beyond buffer length"),R(e,255)),t>=this.length||(this[t]=e)},i.prototype.writeUInt16LE=function(e,t,n){x(this,e,t,!0,n)},i.prototype.writeUInt16BE=function(e,t,n){x(this,e,t,!1,n)},i.prototype.writeUInt32LE=function(e,t,n){b(this,e,t,!0,n)},i.prototype.writeUInt32BE=function(e,t,n){b(this,e,t,!1,n)},i.prototype.writeInt8=function(e,t,n){n||(D(null!=e,"missing value"),D(null!=t,"missing offset"),D(t<this.length,"Trying to write beyond buffer length"),I(e,127,-128)),t>=this.length||(0<=e?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},i.prototype.writeInt16LE=function(e,t,n){_(this,e,t,!0,n)},i.prototype.writeInt16BE=function(e,t,n){_(this,e,t,!1,n)},i.prototype.writeInt32LE=function(e,t,n){w(this,e,t,!0,n)},i.prototype.writeInt32BE=function(e,t,n){w(this,e,t,!1,n)},i.prototype.writeFloatLE=function(e,t,n){E(this,e,t,!0,n)},i.prototype.writeFloatBE=function(e,t,n){E(this,e,t,!1,n)},i.prototype.writeDoubleLE=function(e,t,n){S(this,e,t,!0,n)},i.prototype.writeDoubleBE=function(e,t,n){S(this,e,t,!1,n)},i.prototype.fill=function(e,t,n){if(t=t||0,n=n||this.length,D("number"==typeof(e="string"==typeof(e=e||0)?e.charCodeAt(0):e)&&!isNaN(e),"value is not a number"),D(t<=n,"end < start"),n!==t&&0!==this.length){D(0<=t&&t<this.length,"start out of bounds"),D(0<=n&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},i.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=z(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},i.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw Error("Buffer.toArrayBuffer not supported in this browser");if(i._useTypedArrays)return new i(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer};var P=i.prototype;function M(e,t,n){return"number"!=typeof e?n:t<=(e=~~e)?t:0<=e||0<=(e+=t)?e:0}function C(e){return(e=~~Math.ceil(+e))<0?0:e}function T(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function z(e){return e<16?"0"+e.toString(16):e.toString(16)}function A(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else for(var i=n,o=(55296<=r&&r<=57343&&n++,encodeURIComponent(e.slice(i,n+1)).substr(1).split("%")),a=0;a<o.length;a++)t.push(parseInt(o[a],16))}return t}function O(e){return d.toByteArray(e)}function $(e,t,n,r){for(var i=0;i<r&&!(i+n>=t.length||i>=e.length);i++)t[i+n]=e[i];return i}function k(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function R(e,t){D("number"==typeof e,"cannot write a non-number as a number"),D(0<=e,"specified a negative value for writing an unsigned value"),D(e<=t,"value is larger than maximum value for type"),D(Math.floor(e)===e,"value has a fractional component")}function I(e,t,n){D("number"==typeof e,"cannot write a non-number as a number"),D(e<=t,"value larger than maximum allowed value"),D(n<=e,"value smaller than minimum allowed value"),D(Math.floor(e)===e,"value has a fractional component")}function L(e,t,n){D("number"==typeof e,"cannot write a non-number as a number"),D(e<=t,"value larger than maximum allowed value"),D(n<=e,"value smaller than minimum allowed value")}function D(e,t){if(!e)throw Error(t||"Failed assertion")}i._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=P.get,e.set=P.set,e.write=P.write,e.toString=P.toString,e.toLocaleString=P.toString,e.toJSON=P.toJSON,e.copy=P.copy,e.slice=P.slice,e.readUInt8=P.readUInt8,e.readUInt16LE=P.readUInt16LE,e.readUInt16BE=P.readUInt16BE,e.readUInt32LE=P.readUInt32LE,e.readUInt32BE=P.readUInt32BE,e.readInt8=P.readInt8,e.readInt16LE=P.readInt16LE,e.readInt16BE=P.readInt16BE,e.readInt32LE=P.readInt32LE,e.readInt32BE=P.readInt32BE,e.readFloatLE=P.readFloatLE,e.readFloatBE=P.readFloatBE,e.readDoubleLE=P.readDoubleLE,e.readDoubleBE=P.readDoubleBE,e.writeUInt8=P.writeUInt8,e.writeUInt16LE=P.writeUInt16LE,e.writeUInt16BE=P.writeUInt16BE,e.writeUInt32LE=P.writeUInt32LE,e.writeUInt32BE=P.writeUInt32BE,e.writeInt8=P.writeInt8,e.writeInt16LE=P.writeInt16LE,e.writeInt16BE=P.writeInt16BE,e.writeInt32LE=P.writeInt32LE,e.writeInt32BE=P.writeInt32BE,e.writeFloatLE=P.writeFloatLE,e.writeFloatBE=P.writeFloatBE,e.writeDoubleLE=P.writeDoubleLE,e.writeDoubleBE=P.writeDoubleBE,e.fill=P.fill,e.inspect=P.inspect,e.toArrayBuffer=P.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:10,lYpoI2:11}],4:[function(e,t,n){(function(n,r,i,o,a,l,s,c,u){var i=e("buffer").Buffer,d=new i(4);d.fill(0),t.exports={hash:function(e,t,n,r){for(var o=t(function(e,t){e.length%4!=0&&(n=e.length+(4-e.length%4),e=i.concat([e,d],n));for(var n,r=[],o=t?e.readInt32BE:e.readInt32LE,a=0;a<e.length;a+=4)r.push(o.call(e,a));return r}(e=i.isBuffer(e)?e:new i(e),r),8*e.length),t=r,a=new i(n),l=t?a.writeInt32BE:a.writeInt32LE,s=0;s<o.length;s++)l.call(a,o[s],4*s,!0);return a}}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],5:[function(e,t,n){(function(t,r,i,o,a,l,s,c,u){var i=e("buffer").Buffer,d=e("./sha"),f=e("./sha256"),p=e("./rng"),h={sha1:d,sha256:f,md5:e("./md5")},m=new i(64);function g(e,t){var n=h[e=e||"sha1"],r=[];return n||v("algorithm:",e,"is not yet supported"),{update:function(e){return i.isBuffer(e)||(e=new i(e)),r.push(e),e.length,this},digest:function(e){var o=i.concat(r),o=t?function(e,t,n){i.isBuffer(t)||(t=new i(t)),i.isBuffer(n)||(n=new i(n)),t.length>64?t=e(t):t.length<64&&(t=i.concat([t,m],64));for(var r=new i(64),o=new i(64),a=0;a<64;a++)r[a]=54^t[a],o[a]=92^t[a];return n=e(i.concat([r,n])),e(i.concat([o,n]))}(n,t,o):n(o);return r=null,e?o.toString(e):o}}}function v(){var e=[].slice.call(arguments).join(" ");throw Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}m.fill(0),n.createHash=function(e){return g(e)},n.createHmac=g,n.randomBytes=function(e,t){if(!t||!t.call)return new i(p(e));try{t.call(this,void 0,new i(p(e)))}catch(e){t(e)}};var y,x=["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],b=function(e){n[e]=function(){v("sorry,",e,"is not implemented yet")}};for(y in x)b(x[y],y)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:11}],6:[function(e,t,n){(function(n,r,i,o,a,l,s,c,u){var d=e("./helpers");function f(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,r=-271733879,i=-1732584194,o=271733878,a=0;a<e.length;a+=16){var l=n,s=r,c=i,u=o,n=h(n,r,i,o,e[a+0],7,-680876936),o=h(o,n,r,i,e[a+1],12,-389564586),i=h(i,o,n,r,e[a+2],17,606105819),r=h(r,i,o,n,e[a+3],22,-1044525330);n=h(n,r,i,o,e[a+4],7,-176418897),o=h(o,n,r,i,e[a+5],12,1200080426),i=h(i,o,n,r,e[a+6],17,-1473231341),r=h(r,i,o,n,e[a+7],22,-45705983),n=h(n,r,i,o,e[a+8],7,1770035416),o=h(o,n,r,i,e[a+9],12,-1958414417),i=h(i,o,n,r,e[a+10],17,-42063),r=h(r,i,o,n,e[a+11],22,-1990404162),n=h(n,r,i,o,e[a+12],7,1804603682),o=h(o,n,r,i,e[a+13],12,-40341101),i=h(i,o,n,r,e[a+14],17,-1502002290),n=m(n,r=h(r,i,o,n,e[a+15],22,1236535329),i,o,e[a+1],5,-165796510),o=m(o,n,r,i,e[a+6],9,-1069501632),i=m(i,o,n,r,e[a+11],14,643717713),r=m(r,i,o,n,e[a+0],20,-373897302),n=m(n,r,i,o,e[a+5],5,-701558691),o=m(o,n,r,i,e[a+10],9,38016083),i=m(i,o,n,r,e[a+15],14,-660478335),r=m(r,i,o,n,e[a+4],20,-405537848),n=m(n,r,i,o,e[a+9],5,568446438),o=m(o,n,r,i,e[a+14],9,-1019803690),i=m(i,o,n,r,e[a+3],14,-187363961),r=m(r,i,o,n,e[a+8],20,1163531501),n=m(n,r,i,o,e[a+13],5,-1444681467),o=m(o,n,r,i,e[a+2],9,-51403784),i=m(i,o,n,r,e[a+7],14,1735328473),n=g(n,r=m(r,i,o,n,e[a+12],20,-1926607734),i,o,e[a+5],4,-378558),o=g(o,n,r,i,e[a+8],11,-2022574463),i=g(i,o,n,r,e[a+11],16,1839030562),r=g(r,i,o,n,e[a+14],23,-35309556),n=g(n,r,i,o,e[a+1],4,-1530992060),o=g(o,n,r,i,e[a+4],11,1272893353),i=g(i,o,n,r,e[a+7],16,-155497632),r=g(r,i,o,n,e[a+10],23,-1094730640),n=g(n,r,i,o,e[a+13],4,681279174),o=g(o,n,r,i,e[a+0],11,-358537222),i=g(i,o,n,r,e[a+3],16,-722521979),r=g(r,i,o,n,e[a+6],23,76029189),n=g(n,r,i,o,e[a+9],4,-640364487),o=g(o,n,r,i,e[a+12],11,-421815835),i=g(i,o,n,r,e[a+15],16,530742520),n=v(n,r=g(r,i,o,n,e[a+2],23,-995338651),i,o,e[a+0],6,-198630844),o=v(o,n,r,i,e[a+7],10,1126891415),i=v(i,o,n,r,e[a+14],15,-1416354905),r=v(r,i,o,n,e[a+5],21,-57434055),n=v(n,r,i,o,e[a+12],6,1700485571),o=v(o,n,r,i,e[a+3],10,-1894986606),i=v(i,o,n,r,e[a+10],15,-1051523),r=v(r,i,o,n,e[a+1],21,-2054922799),n=v(n,r,i,o,e[a+8],6,1873313359),o=v(o,n,r,i,e[a+15],10,-30611744),i=v(i,o,n,r,e[a+6],15,-1560198380),r=v(r,i,o,n,e[a+13],21,1309151649),n=v(n,r,i,o,e[a+4],6,-145523070),o=v(o,n,r,i,e[a+11],10,-1120210379),i=v(i,o,n,r,e[a+2],15,718787259),r=v(r,i,o,n,e[a+9],21,-343485551),n=y(n,l),r=y(r,s),i=y(i,c),o=y(o,u)}return[n,r,i,o]}function p(e,t,n,r,i,o){return y((t=y(y(t,e),y(r,o)))<<i|t>>>32-i,n)}function h(e,t,n,r,i,o,a){return p(t&n|~t&r,e,t,i,o,a)}function m(e,t,n,r,i,o,a){return p(t&r|n&~r,e,t,i,o,a)}function g(e,t,n,r,i,o,a){return p(t^n^r,e,t,i,o,a)}function v(e,t,n,r,i,o,a){return p(n^(t|~r),e,t,i,o,a)}function y(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}t.exports=function(e){return d.hash(e,f,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],7:[function(e,t,n){(function(e,n,r,i,o,a,l,s,c){var u;t.exports=u||function(e){for(var t,n=Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],8:[function(e,t,n){(function(n,r,i,o,a,l,s,c,u){var d=e("./helpers");function f(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var n,r,i,o=Array(80),a=1732584193,l=-271733879,s=-1732584194,c=271733878,u=-1009589776,d=0;d<e.length;d+=16){for(var f=a,m=l,g=s,v=c,y=u,x=0;x<80;x++){o[x]=x<16?e[d+x]:h(o[x-3]^o[x-8]^o[x-14]^o[x-16],1);var b=p(p(h(a,5),(b=l,r=s,i=c,(n=x)<20?b&r|~b&i:!(n<40)&&n<60?b&r|b&i|r&i:b^r^i)),p(p(u,o[x]),(n=x)<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514)),u=c,c=s,s=h(l,30),l=a,a=b}a=p(a,f),l=p(l,m),s=p(s,g),c=p(c,v),u=p(u,y)}return[a,l,s,c,u]}function p(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function h(e,t){return e<<t|e>>>32-t}t.exports=function(e){return d.hash(e,f,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],9:[function(e,t,n){(function(n,r,i,o,a,l,s,c,u){function d(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function f(e,t){var n,r=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],i=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],o=Array(64);e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var a,l,s=0;s<e.length;s+=16){for(var c=i[0],u=i[1],f=i[2],p=i[3],g=i[4],v=i[5],y=i[6],x=i[7],b=0;b<64;b++)o[b]=b<16?e[b+s]:d(d(d(h(l=o[b-2],17)^h(l,19)^m(l,10),o[b-7]),h(l=o[b-15],7)^h(l,18)^m(l,3)),o[b-16]),n=d(d(d(d(x,h(l=g,6)^h(l,11)^h(l,25)),g&v^~g&y),r[b]),o[b]),a=d(h(a=c,2)^h(a,13)^h(a,22),c&u^c&f^u&f),x=y,y=v,v=g,g=d(p,n),p=f,f=u,u=c,c=d(n,a);i[0]=d(c,i[0]),i[1]=d(u,i[1]),i[2]=d(f,i[2]),i[3]=d(p,i[3]),i[4]=d(g,i[4]),i[5]=d(v,i[5]),i[6]=d(y,i[6]),i[7]=d(x,i[7])}return i}var p=e("./helpers"),h=function(e,t){return e>>>t|e<<32-t},m=function(e,t){return e>>>t};t.exports=function(e){return p.hash(e,f,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],10:[function(e,t,n){(function(e,t,r,i,o,a,l,s,c){n.read=function(e,t,n,r,i){var o,a,l=8*i-r-1,s=(1<<l)-1,c=s>>1,u=-7,d=n?i-1:0,f=n?-1:1,i=e[t+d];for(d+=f,o=i&(1<<-u)-1,i>>=-u,u+=l;0<u;o=256*o+e[t+d],d+=f,u-=8);for(a=o&(1<<-u)-1,o>>=-u,u+=r;0<u;a=256*a+e[t+d],d+=f,u-=8);if(0===o)o=1-c;else{if(o===s)return a?NaN:1/0*(i?-1:1);a+=Math.pow(2,r),o-=c}return(i?-1:1)*a*Math.pow(2,o-r)},n.write=function(e,t,n,r,i,o){var a,l,s=8*o-i-1,c=(1<<s)-1,u=c>>1,d=23===i?5960464477539062e-23:0,f=r?0:o-1,p=r?1:-1,o=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(l=isNaN(t)?1:0,a=c):(a=Math.floor(Math.log(t)/Math.LN2),t*(r=Math.pow(2,-a))<1&&(a--,r*=2),2<=(t+=1<=a+u?d/r:d*Math.pow(2,1-u))*r&&(a++,r/=2),c<=a+u?(l=0,a=c):1<=a+u?(l=(t*r-1)*Math.pow(2,i),a+=u):(l=t*Math.pow(2,u-1)*Math.pow(2,i),a=0));8<=i;e[n+f]=255&l,f+=p,l/=256,i-=8);for(a=a<<i|l,s+=i;0<s;e[n+f]=255&a,f+=p,a/=256,s-=8);e[n+f-p]|=128*o}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/ieee754/index.js","/node_modules/gulp-browserify/node_modules/ieee754")},{buffer:3,lYpoI2:11}],11:[function(e,t,n){(function(e,n,r,i,o,a,l,s,c){var u,d,f;function p(){}(e=t.exports={}).nextTick=(d="undefined"!=typeof window&&window.setImmediate,f="undefined"!=typeof window&&window.postMessage&&window.addEventListener,d?function(e){return window.setImmediate(e)}:f?(u=[],window.addEventListener("message",function(e){var t=e.source;t!==window&&null!==t||"process-tick"!==e.data||(e.stopPropagation(),0<u.length&&u.shift()())},!0),function(e){u.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=p,e.addListener=p,e.once=p,e.off=p,e.removeListener=p,e.removeAllListeners=p,e.emit=p,e.binding=function(e){throw Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:11}]},{},[1])(1)},e.exports=t()},16250:function(e,t,n){"use strict";n.d(t,{u:function(){return i}});var r=n(38699);let i=(()=>{class e extends r.Loader{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,n,i){let o=this,a=new r.FileLoader(o.manager);a.setPath(o.path),a.setRequestHeader(o.requestHeader),a.setWithCredentials(o.withCredentials),a.load(e,function(n){try{t(o.parse(n))}catch(t){i?i(t):console.error(t),o.manager.itemError(e)}},n,i)}parse(e){let t=this;function n(e,t,n,r,o,a,l,s){if(0==t||0==n){e.lineTo(s.x,s.y);return}r=r*Math.PI/180,t=Math.abs(t),n=Math.abs(n);let c=(l.x-s.x)/2,u=(l.y-s.y)/2,d=Math.cos(r)*c+Math.sin(r)*u,f=-Math.sin(r)*c+Math.cos(r)*u,p=t*t,h=n*n,m=d*d,g=f*f,v=m/p+g/h;if(v>1){let e=Math.sqrt(v);t*=e,n*=e,p=t*t,h=n*n}let y=p*g+h*m,x=Math.sqrt(Math.max(0,(p*h-y)/y));o===a&&(x=-x);let b=x*t*f/n,_=-x*n*d/t,w=Math.cos(r)*b-Math.sin(r)*_+(l.x+s.x)/2,E=Math.sin(r)*b+Math.cos(r)*_+(l.y+s.y)/2,S=i(1,0,(d-b)/t,(f-_)/n),P=i((d-b)/t,(f-_)/n,(-d-b)/t,(-f-_)/n)%(2*Math.PI);e.currentPath.absellipse(w,E,t,n,S,S+P,0===a,r)}function i(e,t,n,r){let i=Math.acos(Math.max(-1,Math.min(1,(e*n+t*r)/(Math.sqrt(e*e+t*t)*Math.sqrt(n*n+r*r)))));return e*r-t*n<0&&(i=-i),i}function o(e,t){t=Object.assign({},t);let n={};if(e.hasAttribute("class")){let t=e.getAttribute("class").split(/\s/).filter(Boolean).map(e=>e.trim());for(let e=0;e<t.length;e++)n=Object.assign(n,h["."+t[e]])}function r(r,i,o){void 0===o&&(o=function(e){return e.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),e}),e.hasAttribute(r)&&(t[i]=o(e.getAttribute(r))),n[r]&&(t[i]=o(n[r])),e.style&&""!==e.style[r]&&(t[i]=o(e.style[r]))}function i(e){return Math.max(0,Math.min(1,c(e)))}function o(e){return Math.max(0,c(e))}return e.hasAttribute("id")&&(n=Object.assign(n,h["#"+e.getAttribute("id")])),r("fill","fill"),r("fill-opacity","fillOpacity",i),r("fill-rule","fillRule"),r("opacity","opacity",i),r("stroke","stroke"),r("stroke-opacity","strokeOpacity",i),r("stroke-width","strokeWidth",o),r("stroke-linejoin","strokeLineJoin"),r("stroke-linecap","strokeLineCap"),r("stroke-miterlimit","strokeMiterLimit",o),r("visibility","visibility"),t}function a(e,t,n){let r;if("string"!=typeof e)throw TypeError("Invalid input: "+typeof e);let i={WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},o=0,a=!0,l="",s="",c=[];function u(e,t,n){let r=SyntaxError('Unexpected character "'+e+'" at index '+t+".");throw r.partial=n,r}function d(){""!==l&&(""===s?c.push(Number(l)):c.push(Number(l)*Math.pow(10,Number(s)))),l="",s=""}let f=e.length;for(let p=0;p<f;p++){if(r=e[p],Array.isArray(t)&&t.includes(c.length%n)&&i.FLAGS.test(r)){o=1,l=r,d();continue}if(0===o){if(i.WHITESPACE.test(r))continue;if(i.DIGIT.test(r)||i.SIGN.test(r)){o=1,l=r;continue}if(i.POINT.test(r)){o=2,l=r;continue}i.COMMA.test(r)&&(a&&u(r,p,c),a=!0)}if(1===o){if(i.DIGIT.test(r)){l+=r;continue}if(i.POINT.test(r)){l+=r,o=2;continue}if(i.EXP.test(r)){o=3;continue}i.SIGN.test(r)&&1===l.length&&i.SIGN.test(l[0])&&u(r,p,c)}if(2===o){if(i.DIGIT.test(r)){l+=r;continue}if(i.EXP.test(r)){o=3;continue}i.POINT.test(r)&&"."===l[l.length-1]&&u(r,p,c)}if(3===o){if(i.DIGIT.test(r)){s+=r;continue}if(i.SIGN.test(r)){if(""===s){s+=r;continue}1===s.length&&i.SIGN.test(s)&&u(r,p,c)}}i.WHITESPACE.test(r)?(d(),o=0,a=!1):i.COMMA.test(r)?(d(),o=0,a=!0):i.SIGN.test(r)?(d(),o=1,l=r):i.POINT.test(r)?(d(),o=2,l=r):u(r,p,c)}return d(),c}let l=["mm","cm","in","pt","pc","px"],s={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:12,pc:1,px:-1},px:{px:1}};function c(e){let n,r="px";if("string"==typeof e||e instanceof String)for(let t=0,n=l.length;t<n;t++){let n=l[t];if(e.endsWith(n)){r=n,e=e.substring(0,e.length-n.length);break}}return"px"===r&&"px"!==t.defaultUnit?n=s.in[t.defaultUnit]/t.defaultDPI:(n=s[r][t.defaultUnit])<0&&(n=s[r].in*t.defaultDPI),n*parseFloat(e)}function u(e){let t=e.elements;return t[0]*t[4]-t[1]*t[3]<0}function d(e){let t=e.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function f(e){let t=e.elements;return Math.sqrt(t[3]*t[3]+t[4]*t[4])}let p=[],h={},m=[],g=new r.Matrix3,v=new r.Matrix3,y=new r.Matrix3,x=new r.Matrix3,b=new r.Vector2,_=new r.Vector3,w=new r.Matrix3,E=new DOMParser().parseFromString(e,"image/svg+xml");return function e(t,i){if(1!==t.nodeType)return;let l=function(e){if(!(e.hasAttribute("transform")||"use"===e.nodeName&&(e.hasAttribute("x")||e.hasAttribute("y"))))return null;let t=function(e){let t=new r.Matrix3;if("use"===e.nodeName&&(e.hasAttribute("x")||e.hasAttribute("y"))){let n=c(e.getAttribute("x")),r=c(e.getAttribute("y"));t.translate(n,r)}if(e.hasAttribute("transform")){let n=e.getAttribute("transform").split(")");for(let e=n.length-1;e>=0;e--){let r=n[e].trim();if(""===r)continue;let i=r.indexOf("("),o=r.length;if(i>0&&i<o){let e=r.slice(0,i),t=a(r.slice(i+1));switch(g.identity(),e){case"translate":if(t.length>=1){let e=t[0],n=0;t.length>=2&&(n=t[1]),g.translate(e,n)}break;case"rotate":if(t.length>=1){let e=0,n=0,r=0;e=t[0]*Math.PI/180,t.length>=3&&(n=t[1],r=t[2]),v.makeTranslation(-n,-r),y.makeRotation(e),x.multiplyMatrices(y,v),v.makeTranslation(n,r),g.multiplyMatrices(v,x)}break;case"scale":if(t.length>=1){let e=t[0],n=e;t.length>=2&&(n=t[1]),g.scale(e,n)}break;case"skewX":1===t.length&&g.set(1,Math.tan(t[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":1===t.length&&g.set(1,0,0,Math.tan(t[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":6===t.length&&g.set(t[0],t[2],t[4],t[1],t[3],t[5],0,0,1)}}t.premultiply(g)}}return t}(e);return m.length>0&&t.premultiply(m[m.length-1]),w.copy(t),m.push(t),t}(t),s=!1,E=null;switch(t.nodeName){case"svg":case"g":i=o(t,i);break;case"style":(function(e){if(e.sheet&&e.sheet.cssRules&&e.sheet.cssRules.length)for(let t=0;t<e.sheet.cssRules.length;t++){let n=e.sheet.cssRules[t];if(1!==n.type)continue;let r=n.selectorText.split(/,/gm).filter(Boolean).map(e=>e.trim());for(let e=0;e<r.length;e++){let t=Object.fromEntries(Object.entries(n.style).filter(([,e])=>""!==e));h[r[e]]=Object.assign(h[r[e]]||{},t)}}})(t);break;case"path":i=o(t,i),t.hasAttribute("d")&&(E=function(e){let t=new r.ShapePath,i=new r.Vector2,o=new r.Vector2,l=new r.Vector2,s=!0,c=!1,u=e.getAttribute("d");if(""===u||"none"===u)return null;let d=u.match(/[a-df-z][^a-df-z]*/gi);for(let e=0,r=d.length;e<r;e++){var f,p,h,m,g,v,y,x;let r;let u=d[e],b=u.charAt(0),_=u.slice(1).trim();switch(!0===s&&(c=!0,s=!1),b){case"M":r=a(_);for(let e=0,n=r.length;e<n;e+=2)i.x=r[e+0],i.y=r[e+1],o.x=i.x,o.y=i.y,0===e?t.moveTo(i.x,i.y):t.lineTo(i.x,i.y),0===e&&l.copy(i);break;case"H":r=a(_);for(let e=0,n=r.length;e<n;e++)i.x=r[e],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"V":r=a(_);for(let e=0,n=r.length;e<n;e++)i.y=r[e],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"L":r=a(_);for(let e=0,n=r.length;e<n;e+=2)i.x=r[e+0],i.y=r[e+1],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"C":r=a(_);for(let e=0,n=r.length;e<n;e+=6)t.bezierCurveTo(r[e+0],r[e+1],r[e+2],r[e+3],r[e+4],r[e+5]),o.x=r[e+2],o.y=r[e+3],i.x=r[e+4],i.y=r[e+5],0===e&&!0===c&&l.copy(i);break;case"S":r=a(_);for(let e=0,n=r.length;e<n;e+=4)t.bezierCurveTo((f=i.x)-(o.x-f),(p=i.y)-(o.y-p),r[e+0],r[e+1],r[e+2],r[e+3]),o.x=r[e+0],o.y=r[e+1],i.x=r[e+2],i.y=r[e+3],0===e&&!0===c&&l.copy(i);break;case"Q":r=a(_);for(let e=0,n=r.length;e<n;e+=4)t.quadraticCurveTo(r[e+0],r[e+1],r[e+2],r[e+3]),o.x=r[e+0],o.y=r[e+1],i.x=r[e+2],i.y=r[e+3],0===e&&!0===c&&l.copy(i);break;case"T":r=a(_);for(let e=0,n=r.length;e<n;e+=2){let n=(h=i.x)-(o.x-h),a=(m=i.y)-(o.y-m);t.quadraticCurveTo(n,a,r[e+0],r[e+1]),o.x=n,o.y=a,i.x=r[e+0],i.y=r[e+1],0===e&&!0===c&&l.copy(i)}break;case"A":r=a(_,[3,4],7);for(let e=0,a=r.length;e<a;e+=7){if(r[e+5]==i.x&&r[e+6]==i.y)continue;let a=i.clone();i.x=r[e+5],i.y=r[e+6],o.x=i.x,o.y=i.y,n(t,r[e],r[e+1],r[e+2],r[e+3],r[e+4],a,i),0===e&&!0===c&&l.copy(i)}break;case"m":r=a(_);for(let e=0,n=r.length;e<n;e+=2)i.x+=r[e+0],i.y+=r[e+1],o.x=i.x,o.y=i.y,0===e?t.moveTo(i.x,i.y):t.lineTo(i.x,i.y),0===e&&l.copy(i);break;case"h":r=a(_);for(let e=0,n=r.length;e<n;e++)i.x+=r[e],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"v":r=a(_);for(let e=0,n=r.length;e<n;e++)i.y+=r[e],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"l":r=a(_);for(let e=0,n=r.length;e<n;e+=2)i.x+=r[e+0],i.y+=r[e+1],o.x=i.x,o.y=i.y,t.lineTo(i.x,i.y),0===e&&!0===c&&l.copy(i);break;case"c":r=a(_);for(let e=0,n=r.length;e<n;e+=6)t.bezierCurveTo(i.x+r[e+0],i.y+r[e+1],i.x+r[e+2],i.y+r[e+3],i.x+r[e+4],i.y+r[e+5]),o.x=i.x+r[e+2],o.y=i.y+r[e+3],i.x+=r[e+4],i.y+=r[e+5],0===e&&!0===c&&l.copy(i);break;case"s":r=a(_);for(let e=0,n=r.length;e<n;e+=4)t.bezierCurveTo((g=i.x)-(o.x-g),(v=i.y)-(o.y-v),i.x+r[e+0],i.y+r[e+1],i.x+r[e+2],i.y+r[e+3]),o.x=i.x+r[e+0],o.y=i.y+r[e+1],i.x+=r[e+2],i.y+=r[e+3],0===e&&!0===c&&l.copy(i);break;case"q":r=a(_);for(let e=0,n=r.length;e<n;e+=4)t.quadraticCurveTo(i.x+r[e+0],i.y+r[e+1],i.x+r[e+2],i.y+r[e+3]),o.x=i.x+r[e+0],o.y=i.y+r[e+1],i.x+=r[e+2],i.y+=r[e+3],0===e&&!0===c&&l.copy(i);break;case"t":r=a(_);for(let e=0,n=r.length;e<n;e+=2){let n=(y=i.x)-(o.x-y),a=(x=i.y)-(o.y-x);t.quadraticCurveTo(n,a,i.x+r[e+0],i.y+r[e+1]),o.x=n,o.y=a,i.x=i.x+r[e+0],i.y=i.y+r[e+1],0===e&&!0===c&&l.copy(i)}break;case"a":r=a(_,[3,4],7);for(let e=0,a=r.length;e<a;e+=7){if(0==r[e+5]&&0==r[e+6])continue;let a=i.clone();i.x+=r[e+5],i.y+=r[e+6],o.x=i.x,o.y=i.y,n(t,r[e],r[e+1],r[e+2],r[e+3],r[e+4],a,i),0===e&&!0===c&&l.copy(i)}break;case"Z":case"z":t.currentPath.autoClose=!0,t.currentPath.curves.length>0&&(i.copy(l),t.currentPath.currentPoint.copy(i),s=!0);break;default:console.warn(u)}c=!1}return t}(t));break;case"rect":i=o(t,i),E=function(e){let t=c(e.getAttribute("x")||0),n=c(e.getAttribute("y")||0),i=c(e.getAttribute("rx")||e.getAttribute("ry")||0),o=c(e.getAttribute("ry")||e.getAttribute("rx")||0),a=c(e.getAttribute("width")),l=c(e.getAttribute("height")),s=new r.ShapePath;return s.moveTo(t+i,n),s.lineTo(t+a-i,n),(0!==i||0!==o)&&s.bezierCurveTo(t+a-.448084975506*i,n,t+a,n+.448084975506*o,t+a,n+o),s.lineTo(t+a,n+l-o),(0!==i||0!==o)&&s.bezierCurveTo(t+a,n+l-.448084975506*o,t+a-.448084975506*i,n+l,t+a-i,n+l),s.lineTo(t+i,n+l),(0!==i||0!==o)&&s.bezierCurveTo(t+.448084975506*i,n+l,t,n+l-.448084975506*o,t,n+l-o),s.lineTo(t,n+o),(0!==i||0!==o)&&s.bezierCurveTo(t,n+.448084975506*o,t+.448084975506*i,n,t+i,n),s}(t);break;case"polygon":i=o(t,i),E=function(e){let t=new r.ShapePath,n=0;return e.getAttribute("points").replace(/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,function(e,r,i){let o=c(r),a=c(i);0===n?t.moveTo(o,a):t.lineTo(o,a),n++}),t.currentPath.autoClose=!0,t}(t);break;case"polyline":i=o(t,i),E=function(e){let t=new r.ShapePath,n=0;return e.getAttribute("points").replace(/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,function(e,r,i){let o=c(r),a=c(i);0===n?t.moveTo(o,a):t.lineTo(o,a),n++}),t.currentPath.autoClose=!1,t}(t);break;case"circle":i=o(t,i),E=function(e){let t=c(e.getAttribute("cx")||0),n=c(e.getAttribute("cy")||0),i=c(e.getAttribute("r")||0),o=new r.Path;o.absarc(t,n,i,0,2*Math.PI);let a=new r.ShapePath;return a.subPaths.push(o),a}(t);break;case"ellipse":i=o(t,i),E=function(e){let t=c(e.getAttribute("cx")||0),n=c(e.getAttribute("cy")||0),i=c(e.getAttribute("rx")||0),o=c(e.getAttribute("ry")||0),a=new r.Path;a.absellipse(t,n,i,o,0,2*Math.PI);let l=new r.ShapePath;return l.subPaths.push(a),l}(t);break;case"line":i=o(t,i),E=function(e){let t=c(e.getAttribute("x1")||0),n=c(e.getAttribute("y1")||0),i=c(e.getAttribute("x2")||0),o=c(e.getAttribute("y2")||0),a=new r.ShapePath;return a.moveTo(t,n),a.lineTo(i,o),a.currentPath.autoClose=!1,a}(t);break;case"defs":s=!0;break;case"use":i=o(t,i);let S=(t.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),P=t.viewportElement.getElementById(S);P?e(P,i):console.warn("SVGLoader: 'use node' references non-existent node id: "+S)}E&&(void 0!==i.fill&&"none"!==i.fill&&E.color.setStyle(i.fill,"srgb"),function(e,t){function n(e){_.set(e.x,e.y,1).applyMatrix3(t),e.set(_.x,_.y)}let i=e.subPaths;for(let e=0,o=i.length;e<o;e++){let o=i[e].curves;for(let e=0;e<o.length;e++){let i=o[e];i.isLineCurve?(n(i.v1),n(i.v2)):i.isCubicBezierCurve?(n(i.v0),n(i.v1),n(i.v2),n(i.v3)):i.isQuadraticBezierCurve?(n(i.v0),n(i.v1),n(i.v2)):i.isEllipseCurve&&(b.set(i.aX,i.aY),n(b),i.aX=b.x,i.aY=b.y,function(e){let t=e.elements,n=t[0]*t[3]+t[1]*t[4];return 0!==n&&Math.abs(n/(d(e)*f(e)))>Number.EPSILON}(t)?function(e){let n=e.xRadius,i=e.yRadius,o=Math.cos(e.aRotation),a=Math.sin(e.aRotation),l=new r.Vector3(n*o,n*a,0),s=new r.Vector3(-i*a,i*o,0),c=l.applyMatrix3(t),d=s.applyMatrix3(t),f=g.set(c.x,d.x,0,c.y,d.y,0,0,0,1),p=v.copy(f).invert(),h=y.copy(p).transpose().multiply(p).elements,m=function(e,t,n){let r,i,o,a,l;let s=e+n,c=e-n,u=Math.sqrt(c*c+4*t*t);return s>0?i=e*(l=1/(r=.5*(s+u)))*n-t*l*t:s<0?i=.5*(s-u):(r=.5*u,i=-.5*u),Math.abs(o=c>0?c+u:c-u)>2*Math.abs(t)?(a=1/Math.sqrt(1+(l=-2*t/o)*l),o=l*a):0===Math.abs(t)?(o=1,a=0):(o=1/Math.sqrt(1+(l=-.5*o/t)*l),a=l*o),c>0&&(l=o,o=-a,a=l),{rt1:r,rt2:i,cs:o,sn:a}}(h[0],h[1],h[4]),x=Math.sqrt(m.rt1),b=Math.sqrt(m.rt2);if(e.xRadius=1/x,e.yRadius=1/b,e.aRotation=Math.atan2(m.sn,m.cs),!((e.aEndAngle-e.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let n=v.set(x,0,0,0,b,0,0,0,1),i=y.set(m.cs,m.sn,0,-m.sn,m.cs,0,0,0,1),o=n.multiply(i).multiply(f),a=e=>{let{x:t,y:n}=new r.Vector3(Math.cos(e),Math.sin(e),0).applyMatrix3(o);return Math.atan2(n,t)};e.aStartAngle=a(e.aStartAngle),e.aEndAngle=a(e.aEndAngle),u(t)&&(e.aClockwise=!e.aClockwise)}}(i):function(e){let n=d(t),r=f(t);e.xRadius*=n,e.yRadius*=r;let i=n>Number.EPSILON?Math.atan2(t.elements[1],t.elements[0]):Math.atan2(-t.elements[3],t.elements[4]);e.aRotation+=i,u(t)&&(e.aStartAngle*=-1,e.aEndAngle*=-1,e.aClockwise=!e.aClockwise)}(i))}}}(E,w),p.push(E),E.userData={node:t,style:i});let M=t.childNodes;for(let t=0;t<M.length;t++){let n=M[t];s&&"style"!==n.nodeName&&"defs"!==n.nodeName||e(n,i)}l&&(m.pop(),m.length>0?w.copy(m[m.length-1]):w.identity())}(E.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:p,xml:E.documentElement}}static createShapes(e){let t={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},n={loc:t.ORIGIN,t:0};function i(e,r,i){let o;let a=i.x-r.x,l=i.y-r.y,s=e.x-r.x,c=e.y-r.y,u=a*c-s*l;if(e.x===r.x&&e.y===r.y){n.loc=t.ORIGIN,n.t=0;return}if(e.x===i.x&&e.y===i.y){n.loc=t.DESTINATION,n.t=1;return}if(u<-Number.EPSILON){n.loc=t.LEFT;return}if(u>Number.EPSILON){n.loc=t.RIGHT;return}if(a*s<0||l*c<0){n.loc=t.BEHIND;return}if(Math.sqrt(a*a+l*l)<Math.sqrt(s*s+c*c)){n.loc=t.BEYOND;return}o=0!==a?s/a:c/l,n.loc=t.BETWEEN,n.t=o}let o=999999999,a=-999999999,l=e.subPaths.map(e=>{let t=e.getPoints(),n=-999999999,i=999999999,l=-999999999,s=999999999;for(let e=0;e<t.length;e++){let r=t[e];r.y>n&&(n=r.y),r.y<i&&(i=r.y),r.x>l&&(l=r.x),r.x<s&&(s=r.x)}return a<=l&&(a=l+1),o>=s&&(o=s-1),{curves:e.curves,points:t,isCW:r.ShapeUtils.isClockWise(t),identifier:-1,boundingBox:new r.Box2(new r.Vector2(s,i),new r.Vector2(l,n))}});l=l.filter(e=>e.points.length>1);for(let e=0;e<l.length;e++)l[e].identifier=e;let s=l.map(s=>(function(e,o,a,l,s){(null==s||""===s)&&(s="nonzero");let c=new r.Vector2;e.boundingBox.getCenter(c);let u=function(e,o,a){let l=new r.Vector2;o.getCenter(l);let s=[];return a.forEach(o=>{o.boundingBox.containsPoint(l)&&(function(e,o){let a=[],l=[];for(let s=1;s<e.length;s++){let c=e[s-1],u=e[s];for(let e=1;e<o.length;e++){let s=function(e,r,o,a){let l=e.x,s=r.x,c=o.x,u=a.x,d=e.y,f=r.y,p=o.y,h=a.y,m=(u-c)*(d-p)-(h-p)*(l-c),g=(h-p)*(s-l)-(u-c)*(f-d),v=m/g,y=((s-l)*(d-p)-(f-d)*(l-c))/g;if(0===g&&0!==m||v<=0||v>=1||y<0||y>1)return null;if(0===m&&0===g){for(let c=0;c<2;c++){if(i(0===c?o:a,e,r),n.loc==t.ORIGIN){let e=0===c?o:a;return{x:e.x,y:e.y,t:n.t}}if(n.loc==t.BETWEEN)return{x:+(l+n.t*(s-l)).toPrecision(10),y:+(d+n.t*(f-d)).toPrecision(10),t:n.t}}return null}for(let l=0;l<2;l++)if(i(0===l?o:a,e,r),n.loc==t.ORIGIN){let e=0===l?o:a;return{x:e.x,y:e.y,t:n.t}}return{x:+(l+v*(s-l)).toPrecision(10),y:+(d+v*(f-d)).toPrecision(10),t:v}}(c,u,o[e-1],o[e]);null!==s&&void 0===a.find(e=>e.t<=s.t+Number.EPSILON&&e.t>=s.t-Number.EPSILON)&&(a.push(s),l.push(new r.Vector2(s.x,s.y)))}}return l})(e,o.points).forEach(e=>{s.push({identifier:o.identifier,isCW:o.isCW,point:e})})}),s.sort((e,t)=>e.point.x-t.point.x),s}([new r.Vector2(a,c.y),new r.Vector2(l,c.y)],e.boundingBox,o);u.sort((e,t)=>e.point.x-t.point.x);let d=[],f=[];u.forEach(t=>{t.identifier===e.identifier?d.push(t):f.push(t)});let p=d[0].point.x,h=[],m=0;for(;m<f.length&&f[m].point.x<p;)h.length>0&&h[h.length-1]===f[m].identifier?h.pop():h.push(f[m].identifier),m++;if(h.push(e.identifier),"evenodd"===s){let t=h.length%2==0,n=h[h.length-2];return{identifier:e.identifier,isHole:t,for:n}}if("nonzero"===s){let t=!0,n=null,r=null;for(let e=0;e<h.length;e++){let i=h[e];t?(r=o[i].isCW,t=!1,n=i):r!==o[i].isCW&&(r=o[i].isCW,t=!0)}return{identifier:e.identifier,isHole:t,for:n}}console.warn('fill-rule: "'+s+'" is currently not implemented.')})(s,l,o,a,e.userData?e.userData.style.fillRule:void 0)),c=[];return l.forEach(e=>{if(!s[e.identifier].isHole){let t=new r.Shape;t.curves=e.curves,s.filter(t=>t.isHole&&t.for===e.identifier).forEach(e=>{let n=l[e.identifier],i=new r.Path;i.curves=n.curves,t.holes.push(i)}),c.push(t)}}),c}static getStrokeStyle(e,t,n,r,i){return{strokeColor:t=void 0!==t?t:"#000",strokeWidth:e=void 0!==e?e:1,strokeLineJoin:n=void 0!==n?n:"miter",strokeLineCap:r=void 0!==r?r:"butt",strokeMiterLimit:i=void 0!==i?i:4}}static pointsToStroke(t,n,i,o){let a=[],l=[],s=[];if(0===e.pointsToStrokeWithBuffers(t,n,i,o,a,l,s))return null;let c=new r.BufferGeometry;return c.setAttribute("position",new r.Float32BufferAttribute(a,3)),c.setAttribute("normal",new r.Float32BufferAttribute(l,3)),c.setAttribute("uv",new r.Float32BufferAttribute(s,2)),c}static pointsToStrokeWithBuffers(e,t,n,i,o,a,l,s){let c,u,d,f,p;let h=new r.Vector2,m=new r.Vector2,g=new r.Vector2,v=new r.Vector2,y=new r.Vector2,x=new r.Vector2,b=new r.Vector2,_=new r.Vector2,w=new r.Vector2,E=new r.Vector2,S=new r.Vector2,P=new r.Vector2,M=new r.Vector2,C=new r.Vector2,T=new r.Vector2,z=new r.Vector2,A=new r.Vector2;n=void 0!==n?n:12,i=void 0!==i?i:.001,s=void 0!==s?s:0;let O=(e=function(e){let t=!1;for(let n=1,r=e.length-1;n<r;n++)if(e[n].distanceTo(e[n+1])<i){t=!0;break}if(!t)return e;let n=[];n.push(e[0]);for(let t=1,r=e.length-1;t<r;t++)e[t].distanceTo(e[t+1])>=i&&n.push(e[t]);return n.push(e[e.length-1]),n}(e)).length;if(O<2)return 0;let $=e[0].equals(e[O-1]),k=e[0],R=t.strokeWidth/2,I=1/(O-1),L=0,D,j=!1,N=0,U=3*s,B=2*s;V(e[0],e[1],h).multiplyScalar(R),_.copy(e[0]).sub(h),w.copy(e[0]).add(h),E.copy(_),S.copy(w);for(let n=1;n<O;n++){if(c=e[n],u=n===O-1?$?e[1]:void 0:e[n+1],V(k,c,h),g.copy(h).multiplyScalar(R),P.copy(c).sub(g),M.copy(c).add(g),D=L+I,d=!1,void 0!==u){V(c,u,m),g.copy(m).multiplyScalar(R),C.copy(c).sub(g),T.copy(c).add(g),f=!0,g.subVectors(u,k),0>h.dot(g)&&(f=!1),1===n&&(j=f),g.subVectors(u,c),g.normalize();let e=Math.abs(h.dot(g));if(e>Number.EPSILON){let n=R/e;g.multiplyScalar(-n),v.subVectors(c,k),y.copy(v).setLength(n).add(g),z.copy(y).negate();let r=y.length(),i=v.length();v.divideScalar(i),x.subVectors(u,c);let o=x.length();switch(x.divideScalar(o),v.dot(z)<i&&x.dot(z)<o&&(d=!0),A.copy(y).add(c),z.add(c),p=!1,d?f?(T.copy(z),M.copy(z)):(C.copy(z),P.copy(z)):W(),t.strokeLineJoin){case"bevel":K(f,d,D);break;case"round":G(f,d),f?H(c,P,C,D,0):H(c,T,M,D,1);break;default:let a=R*t.strokeMiterLimit/r;a<1?"miter-clip"!==t.strokeLineJoin?K(f,d,D):(G(f,d),f?(x.subVectors(A,P).multiplyScalar(a).add(P),b.subVectors(A,C).multiplyScalar(a).add(C),F(P,D,0),F(x,D,0),F(c,D,.5),F(c,D,.5),F(x,D,0),F(b,D,0),F(c,D,.5),F(b,D,0),F(C,D,0)):(x.subVectors(A,M).multiplyScalar(a).add(M),b.subVectors(A,T).multiplyScalar(a).add(T),F(M,D,1),F(x,D,1),F(c,D,.5),F(c,D,.5),F(x,D,1),F(b,D,1),F(c,D,.5),F(b,D,1),F(T,D,1))):(d?(f?(F(w,L,1),F(_,L,0),F(A,D,0),F(w,L,1),F(A,D,0),F(z,D,1)):(F(w,L,1),F(_,L,0),F(A,D,1),F(_,L,0),F(z,D,0),F(A,D,1)),f?C.copy(A):T.copy(A)):f?(F(P,D,0),F(A,D,0),F(c,D,.5),F(c,D,.5),F(A,D,0),F(C,D,0)):(F(M,D,1),F(A,D,1),F(c,D,.5),F(c,D,.5),F(A,D,1),F(T,D,1)),p=!0)}}else W()}else W();$||n!==O-1||Y(e[0],E,S,f,!0,L),L=D,k=c,_.copy(C),w.copy(T)}if($){if(d&&o){let e=A,t=z;j!==f&&(e=z,t=A),f?(p||j)&&(t.toArray(o,0),t.toArray(o,9),p&&e.toArray(o,3)):(p||!j)&&(t.toArray(o,3),t.toArray(o,9),p&&e.toArray(o,0))}}else Y(c,P,M,f,!1,D);return N;function V(e,t,n){return n.subVectors(t,e),n.set(-n.y,n.x).normalize()}function F(e,t,n){o&&(o[U]=e.x,o[U+1]=e.y,o[U+2]=0,a&&(a[U]=0,a[U+1]=0,a[U+2]=1),U+=3,l&&(l[B]=t,l[B+1]=n,B+=2)),N+=3}function H(e,t,r,i,o){h.copy(t).sub(e).normalize(),m.copy(r).sub(e).normalize();let a=Math.PI,l=h.dot(m);1>Math.abs(l)&&(a=Math.abs(Math.acos(l))),a/=n,g.copy(t);for(let t=0,r=n-1;t<r;t++)v.copy(g).rotateAround(e,a),F(g,i,o),F(v,i,o),F(e,i,.5),g.copy(v);F(v,i,o),F(r,i,o),F(e,i,.5)}function W(){F(w,L,1),F(_,L,0),F(P,D,0),F(w,L,1),F(P,D,0),F(M,D,1)}function K(e,t,n){t?e?(F(w,L,1),F(_,L,0),F(P,D,0),F(w,L,1),F(P,D,0),F(z,D,1),F(P,n,0),F(C,n,0),F(z,n,.5)):(F(w,L,1),F(_,L,0),F(M,D,1),F(_,L,0),F(z,D,0),F(M,D,1),F(M,n,1),F(z,n,0),F(T,n,1)):(e?(F(P,n,0),F(C,n,0)):(F(M,n,1),F(T,n,0)),F(c,n,.5))}function G(e,t){t&&(e?(F(w,L,1),F(_,L,0),F(P,D,0),F(w,L,1),F(P,D,0),F(z,D,1),F(P,L,0),F(c,D,.5),F(z,D,1),F(c,D,.5),F(C,L,0),F(z,D,1)):(F(w,L,1),F(_,L,0),F(M,D,1),F(_,L,0),F(z,D,0),F(M,D,1),F(M,L,1),F(z,D,0),F(c,D,.5),F(c,D,.5),F(z,D,0),F(T,L,1)))}function Y(e,n,r,i,a,s){switch(t.strokeLineCap){case"round":a?H(e,r,n,s,.5):H(e,n,r,s,.5);break;case"square":if(a)h.subVectors(n,e),m.set(h.y,-h.x),g.addVectors(h,m).add(e),v.subVectors(m,h).add(e),i?(g.toArray(o,3),v.toArray(o,0),v.toArray(o,9)):(g.toArray(o,3),1===l[7]?v.toArray(o,9):g.toArray(o,9),v.toArray(o,0));else{h.subVectors(r,e),m.set(h.y,-h.x),g.addVectors(h,m).add(e),v.subVectors(m,h).add(e);let t=o.length;i?(g.toArray(o,t-3),v.toArray(o,t-6)):(v.toArray(o,t-6),g.toArray(o,t-3)),v.toArray(o,t-12)}}}}}return e})()}}]);