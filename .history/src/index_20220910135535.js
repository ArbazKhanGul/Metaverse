import Movements from "./movement.js";
import polygon from "./Web3.js";
import abi from "./abi/abi.json" assert { type: "json" };

const scene = new THREE.Scene();
// scene.background = new THREE.Color("yellow")
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff);
const directionalLight = new THREE.DirectionalLight(0xffffff,1);
ambientLight.add( directionalLight );
scene.add(ambientLight);

const geometry_area = new THREE.BoxGeometry( 50, 0.1, 40 );
const material_area= new THREE.MeshPhongMaterial( { color: 0xffffff } );
const area = new THREE.Mesh( geometry_area, material_area );
area.position.x=12
scene.add(area)


const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10,5,0);
scene.add( cone );

const geometry_cy = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cy = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry_cy, material_cy );
scene.add( cylinder );
cylinder.position.x=30;



camera.position.x = 10;
camera.position.y = 5;
camera.position.z = 40;
// camera.position.set(10,5,40);
//both are same


function animate() {

    cone.rotation.x += 0.02;
    cone.rotation.y += 0.02;
    cylinder.rotation.x += 0.02;
    cylinder.rotation.y += 0.02;
    camera.position.y-= 0.01;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    if(Movements.isPressed(37)){ //leftkey
        camera.position.x-=0.5;
    }
    if(Movements.isPressed(38)){   //upkey
        camera.position.x+=0.5;
        camera.position.y+=0.5;
    }
    if(Movements.isPressed(39)){   //right
        camera.position.x+=0.5;
    }
    if(Movements.isPressed(40)){   //down
        camera.position.x-=0.5;
        camera.position.y-=0.5;
    }

    camera.lookAt(area.position)
}
animate();

renderer.render(scene,camera)

const button = document.querySelector("#mint");
button.addEventListener("click", mintNFT);

async function mintNFT() {
  let nft_name = document.querySelector("#nft_name").value;
  let nft_width = document.querySelector("#nft_width").value;
  let nft_height = document.querySelector("#nft_height").value;
  let nft_depth = document.querySelector("#nft_depth").value;
  let nft_x =parseInt(document.querySelector("#nft_x").value);
//   console.log("🚀 ~ file: index.js ~ line 90 ~ mintNFT ~ nft_x", nft_x)
  let nft_y = document.querySelector("#nft_y").value;
  let nft_z = document.querySelector("#nft_z").value;

  
  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x923fF65038D36585C770F71A5b0F6553EAAd3c80"
  );

  console.log("woking")
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({
        from: accounts[0],
        value: "10",
      })
      .then((data) => {
        console.log("NFT is minted");
      });
  });
}


polygon.then((result) => {
    result.nft.forEach((object, index) => {
      if (index <= result.supply) {
        const geometry_cube = new THREE.BoxGeometry(object.w, object.h, object.d);
        const material_cube = new THREE.MeshPhongMaterial({ color: 0x8e44ad });
        const nft = new THREE.Mesh(geometry_cube, material_cube);
  
        nft.position.set(object.x, object.y, object.z);
        
        scene.add(nft);

      }
    });
  });