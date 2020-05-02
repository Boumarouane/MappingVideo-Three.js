var container;

var camera, scene, renderer;

var video, texture,geometry, materia, mesh;



var startButton = document.getElementById( 'startButton' );
			startButton.addEventListener( 'click', function () {

				init();
				animate();

      });
      
function init() {
  var overlay = document.getElementById( 'overlay' );
  overlay.remove();

  container = document.createElement( 'div' );
  document.body.appendChild( container );
  
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 5000;

  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 0.5, 50, 4900 );
  scene.add( light );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  video = document.getElementById( 'video' );
  video.play();

  texture = new THREE.VideoTexture( video );
  texture.mapping = THREE.UVMapping;
  texture.minFilter =  9987;
  texture.magFilter = 9729;
  texture.format = THREE.RGBFormat;
  texture.encoding = THREE.sRGBEncoding;
  // texture.flipY = false;
  texture.wrapS = 10497;
  texture.wrapT = 10497;
  texture.repeat.set(1, 4);
  texture.anisotropy = 1;

  // var parameters = { color: 0xffffff, map: texture };

  // materia = new THREE.MeshLambertMaterial( parameters );


  let loader = new THREE.GLTFLoader();
    loader.load("./building/scene.gltf", function(object) {
        let model = object.scene.children[0];
        // model.scale.set(1,1,1)
        model.position.set(0,0, 4950);
        model.traverse( function ( child ) {
      
          if (child instanceof THREE.Mesh) {
              child.material.map = texture;
              child.material.needsUpdate = true;
              child.material.map.needsUpdate = true;
          }
        });
      //   model.material = new THREE.MeshLambertMaterial({
      //     map: texture,
      //     color: 0xffffff
      // });
        scene.add(model);
        }, undefined, function ( error ) {

          console.error( error );
    
        } );

  let control = new THREE.OrbitControls(camera, renderer.domElement)


}

function animate() {

  camera.lookAt( scene.position );
  
  renderer.render(scene, camera);

  requestAnimationFrame( animate );
}


// video = document.getElementById( 'video' );
// video.play();

// texture = new THREE.VideoTexture( video );
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// texture.format = THREE.RGBFormat;

// var parameters = { color: 0xffffff, map: texture };

// geometry = new THREE.PlaneBufferGeometry( 20, 20);

// material = new THREE.MeshLambertMaterial( parameters );

// mesh = new THREE.Mesh( geometry, material );
// mesh.position.set(0,0,4950)
// scene.add( mesh );
