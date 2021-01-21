<template>
  <div>
    <div id="main-container-juguetilandia" class="h-screen w-screen">
      <div
        id="loading-container-juguetilandia"
        class="flex items-center m-auto h-full w-screen"
      >
        <Logo class="animate-pulse" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint unicorn/number-literal-case: 0 */
/* eslint-disable no-unused-vars */
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  AnimationMixer,
  Clock,
  AmbientLight,
  PointLight,
  HemisphereLight,
  Raycaster,
  Vector2,
  TextureLoader,
  MeshBasicMaterial,
  PlaneBufferGeometry,
} from "three";
import { NEWBORN, UNDER, PREGNED } from "../types/";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

// Scene variables
let mixer = null;
// const guiControls = new GUI()
const clock = new Clock();

export default {
  layout: "default",
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      controls: null,
      raycaster: null,
      mouseData: new Vector2(),
      composer: null,
      outlinePass: null,
      selectedObject: [],
      eventToShow: null,
      event3DObject: null,
      planeSVG: null,
    };
  },
  async created() {
    try {
      const { data } = await this.$api.event.getEvent360Meny(this.formatDate(new Date()));
      if (data.status.code === "0000") {
        // console.log('EVENT RESPONSE: ', data)
        this.eventToShow = data.result.events[data.result.events.length - 1];
        console.log("eventToShow: ", this.eventToShow);
        if (this.event3DObject) {
          this.event3DObject.material.map = new TextureLoader().load(
            this.eventToShow.urlThumbnail
          );
        }
      }
    } catch (err) {
      console.log("ERROR EVENT: ", err);
    }
  },
  mounted() {
    console.log("INICIO");
    this.init();
    this.animate();
  },
  methods: {
    init() {
      console.log("INIT");
      const mainContainer = document.getElementById("main-container-juguetilandia");

      this.camera = new PerspectiveCamera(
        75,
        mainContainer.clientWidth / mainContainer.clientHeight,
        0.1,
        1000
      );

      this.scene = new Scene();
      this.renderer = new WebGLRenderer({ antialias: true });
      this.renderer.setSize(mainContainer.clientWidth, mainContainer.clientHeight);
      this.renderer.setPixelRatio(
        window.devicePixelRatio >= 2 ? 2 : window.devicePixelRatio
      );
      this.renderer.gammaFactor = 2.2;
      this.renderer.gammaOutput = true;
      this.renderer.physicallyCorrectLights = true;
      mainContainer.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxAzimuthAngle = Math.PI;
      this.controls.minAzimuthAngle = 0;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.rotateSpeed *= -0.2;
      this.controls.enableZoom = true;
      this.controls.maxDistance = 2;
      this.controls.minDistance = 0;

      const loader = new GLTFLoader();

      // Load a glTF resource
      loader.load(
        // resource URL
        "https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/model/scene.gltf",
        // called when the resource is loaded
        (gltf) => {
          gltf.scene.position.set(0, -33, 0);
          mixer = new AnimationMixer(gltf.scene);
          const animation = mixer.clipAction(gltf.animations[0]);
          // animation.setLoop(THREE.LoopRepeat);
          animation.play();

          this.scene.add(gltf.scene);

          // console.log('gltf: ', gltf)
          this.addSelectedObject(
            gltf.scene.getObjectByName("Descubre_Material_#25_0", true)
          );
          this.addSelectedObject(gltf.scene.getObjectByName("Crea_Material_#25_0", true));
          this.addSelectedObject(
            gltf.scene.getObjectByName("Juega_Material_#25_0", true)
          );
          this.addSelectedObject(gltf.scene.getObjectByName("Letrero_M_Atlas_0", true));
          this.outlinePass.selectedObjects = this.selectedObject;
          document
            .getElementById("loading-container-juguetilandia")
            .classList.remove("flex");
          document
            .getElementById("loading-container-juguetilandia")
            .classList.add("hidden");
          gltf.scene.getObjectByName(
            "Notificacion_Notificacion_0",
            true
          ).material.visible = false;
          this.event3DObject = gltf.scene.getObjectByName("Evento_Evento_0", true);
          // console.log('this.event3DObject: ', this.event3DObject)
          if (this.eventToShow) {
            this.event3DObject.material.map = new TextureLoader().load(
              this.eventToShow.urlThumbnail
            );
          }
          // Notificacion_Notificacion_0
          // document.getElementById('main-container-juguetilandia').classList.remove('hidden')
          // document.getElementById('main-container-juguetilandia').classList.add('block')
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log("An error happened", error);
        }
      );

      const geometry = new PlaneBufferGeometry(0.25, 0.25);
      const material = new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: new TextureLoader().load(
          "https://sfo2.digitaloceanspaces.com/juguetilandia.media/assets/app/img/arrastrar_.svg"
        ),
      });
      this.planeSVG = new Mesh(geometry, material);
      this.planeSVG.rotation.set(0, Math.PI / 2, 0);
      this.planeSVG.position.set(0, -1, 0);
      this.scene.add(this.planeSVG);

      this.camera.position.set(2, 0, 0);
      this.controls.update();

      const ambienLight = new AmbientLight(0xe8e8e8, 1.3);
      this.scene.add(ambienLight);

      const hemislight = new HemisphereLight(0xffffff, 0x080820, 5.5);
      this.scene.add(hemislight);

      // Raycast
      this.raycaster = new Raycaster();

      // Composer
      this.composer = new EffectComposer(this.renderer);

      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);

      // Outline
      this.outlinePass = new OutlinePass(
        new Vector2(mainContainer.clientWidth, mainContainer.clientHeight),
        this.scene,
        this.camera
      );
      this.outlinePass.edgeStrength = Number(10);
      this.outlinePass.edgeGlow = Number(0.8);
      this.outlinePass.edgeThickness = Number(1);
      this.outlinePass.pulsePeriod = Number(5);
      this.outlinePass.visibleEdgeColor.set("#ffffff");
      this.outlinePass.hiddenEdgeColor.set("#000000");
      this.composer.addPass(this.outlinePass);

      this.composer.addPass(new ShaderPass(GammaCorrectionShader));

      mainContainer.addEventListener("mousemove", this.onMouseMove, false);
      mainContainer.addEventListener("click", this.onInteractionEvent, false);
      mainContainer.addEventListener("touchstart", this.onTouchInteraction, false);
    },
    animate() {
      // console.log('ANIMATE')
      requestAnimationFrame(this.animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      this.controls.update();
      if (this.planeSVG) {
        this.planeSVG.quaternion.copy(this.camera.quaternion);
      }
      // this.renderer.render(this.scene, this.camera)
      this.composer.render();
    },
    onInteractionEvent(event) {
      event.preventDefault();
      // if (typeof scene !== "undefined") {
      this.raycaster.setFromCamera(this.mouseData, this.camera);
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        // console.log('CLICK: ', intersects[0].object.name)
        if (intersects[0].object.name === "Descubre_Material_#25_0") {
          localStorage.setItem("currentSection", NEWBORN);
          this.$store.commit("menu/setCurrentSection", NEWBORN);
          this.$router.push({
            name: "newborn",
            params: {
              typeScreen: NEWBORN,
            },
          });
        } else if (intersects[0].object.name === "Crea_Material_#25_0") {
          localStorage.setItem("currentSection", UNDER);
          this.$store.commit("menu/setCurrentSection", UNDER);
          this.$router.push({
            name: "newborn",
            params: {
              typeScreen: UNDER,
            },
          });
        } else if (intersects[0].object.name === "Juega_Material_#25_0") {
          localStorage.setItem("currentSection", PREGNED);
          this.$store.commit("menu/setCurrentSection", PREGNED);
          this.$router.push({
            name: "newborn",
            params: {
              typeScreen: PREGNED,
            },
          });
        } else if (
          intersects[0].object.name === "Letrero_M_Atlas_0" ||
          intersects[0].object.name === "Evento_Evento_0"
        ) {
          this.$router.push({
            name: "discover-events-id",
            params: {
              id: this.eventToShow._id,
            },
          });
        }
      }
      // }
    },
    onMouseMove(event) {
      event.preventDefault();
      this.mouseData.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseData.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    onTouchInteraction(event) {
      console.log("TOUCHSTART");
      this.mouseData.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mouseData.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      this.onInteractionEvent(event);
    },
    addSelectedObject(object) {
      this.selectedObject.push(object);
    },
    formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      return [year, month, day].join("-");
    },
  },
};
</script>

<style></style>
