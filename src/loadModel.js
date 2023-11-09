import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

async function loadModel() {
  const loader = new GLTFLoader();
  const object = await loader.loadAsync("/man_walking/scene.gltf");
  const scene = object.scene;
  scene.scale.setScalar(4.5);
  return scene;
}

export default loadModel;
