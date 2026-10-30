// Solid, open-centered architecture. Repeated masonry shares instanced draw calls.
window.createTempleJourney = function(T, scene, groundHeight) {
  const stone = new T.MeshStandardMaterial({color: '#ae906a', roughness: .88});
  const trim = new T.MeshStandardMaterial({color: '#d1b27c', roughness: .7, metalness: .12});
  const dark = new T.MeshStandardMaterial({color: '#625643', roughness: .95});
  const batches = new Map([[stone, []], [trim, []], [dark, []]]);
  function box(x,y,z,w,h,d,material=stone) { batches.get(material).push([x,y,z,w,h,d]); }
  // Two substantial stone towers frame a clear six-meter passage.
  for(const side of [-1,1]) {
    const x=side*4.7;
    box(x,.05,-.5,3.4,.9,3.8,dark);
    box(x,.65,-.5,3.1,.35,3.5,trim);
    box(x,4,-.5,2.5,6.4,3);
    for(let level=0;level<8;level++) {
      const y=1.1+level*.78;
      box(x,y,-.5,2.76,.14,3.2,trim);
      for(const face of [-1,1]) {
        box(x,y+.34,-.5+face*1.54,1.35,.48,.13,dark);
        box(x,y+.34,-.5+face*1.65,.44,.38,.22,trim);
      }
    }
    box(x,7.3,-.5,3.2,.55,3.5,trim);
  }
  box(0,7.85,-.5,12.5,.8,3.5);
  box(0,8.35,-.5,13.3,.24,3.9,trim);
  // Stepped gopuram silhouette, with recessed niches and projecting cornices.
  for(let tier=0;tier<5;tier++) {
    const width=12.2-tier*1.65, y=8.95+tier*1.05, depth=3.2-tier*.32;
    box(0,y,-.5,width,.9,depth);
    box(0,y+.49,-.5,width+.65,.2,depth+.55,trim);
    const count=Math.floor(width/1.4);
    for(let i=0;i<count;i++) {
      const x=(i-(count-1)/2)*1.4;
      for(const face of [-1,1]) {
        box(x,y,-.5+face*(depth/2+.03),.8,.62,.12,dark);
        box(x,y-.02,-.5+face*(depth/2+.15),.23,.42,.25,trim);
        box(x,y+.3,-.5+face*(depth/2+.14),.95,.12,.25,trim);
      }
    }
  }
  const crownGeo=new T.SphereGeometry(.22,10,8);
  for(let i=-2;i<=2;i++) {
    const finial=new T.Mesh(crownGeo,trim);finial.position.set(i*.8,14,-.5);finial.scale.set(.8,1.7,.8);scene.add(finial);
  }
  // Courtyard colonnades behind the doorway keep the entire reveal spatial.
  for(const side of [-1,1]) for(let i=0;i<7;i++) {
    const x=side*6.8,z=-8-i*5;
    box(x,1.6,z,.65,4,.65);box(x,3.7,z,1.1,.3,1.1,trim);
    box(x,4,z,1.6,.32,5.3,trim);box(x,-.2,z,1.1,.35,1.1,dark);
  }
  const matrix=new T.Object3D(),cube=new T.BoxGeometry(1,1,1);
  for(const [material,items] of batches) {
    const mesh=new T.InstancedMesh(cube,material,items.length);
    items.forEach((a,i)=>{matrix.position.set(a[0],a[1],a[2]);matrix.scale.set(a[3],a[4],a[5]);matrix.updateMatrix();mesh.setMatrixAt(i,matrix.matrix)});
    mesh.instanceMatrix.needsUpdate=true;scene.add(mesh);
  }
  const travelers=[];
  const skin=new T.MeshStandardMaterial({color:'#946345',roughness:1});
  const clothColors=['#b46132','#b9ad86','#566b5a','#874840','#c4a555','#626c83'];
  const headGeo=new T.SphereGeometry(.14,10,8),bodyGeo=new T.CylinderGeometry(.17,.26,.72,10);
  const legGeo=new T.CylinderGeometry(.055,.045,.6,6),armGeo=new T.CylinderGeometry(.045,.04,.5,6);
  for(let i=0;i<10;i++) {
    const person=new T.Group(),cloth=new T.MeshStandardMaterial({color:clothColors[i%6],roughness:1});
    const body=new T.Mesh(bodyGeo,cloth);body.position.y=.96;person.add(body);
    const head=new T.Mesh(headGeo,skin);head.position.y=1.52;person.add(head);
    const turban=new T.Mesh(new T.SphereGeometry(.155,10,8),cloth);turban.position.y=1.61;turban.scale.y=.6;person.add(turban);
    const limbs=[];
    for(const side of [-1,1]) {
      const leg=new T.Group();leg.position.set(side*.095,.64,0);const mesh=new T.Mesh(legGeo,dark);mesh.position.y=-.3;leg.add(mesh);person.add(leg);limbs.push(leg);
      const arm=new T.Group();arm.position.set(side*.21,1.26,0);const hand=new T.Mesh(armGeo,skin);hand.position.y=-.24;arm.add(hand);person.add(arm);limbs.push(arm);
    }
    const bag=new T.Mesh(new T.SphereGeometry(.19,8,6),dark);bag.position.set(.24,.88,.12);person.add(bag);
    const x=(i%2?-1:1)*(1.5+(i%3)*.55),z=-7-Math.floor(i/2)*6;
    person.position.set(x,groundHeight(x,z),z);person.rotation.y=i%3===0?Math.PI:0;
    scene.add(person);travelers.push({person,limbs,x,z,phase:i*1.7});
  }
  return {update(time,reduced){travelers.forEach(t=>{
    const stride=reduced?0:Math.sin(time*2.4+t.phase)*.22;
    t.limbs.forEach((limb,i)=>limb.rotation.x=stride*(i<2?1:-1)*(i%2?-.7:1));
    t.person.position.y=groundHeight(t.x,t.z)+(reduced?0:Math.abs(Math.sin(time*2.4+t.phase))*.018);
  })}};
};
