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
  AxesHelper,
  WebGLCubeRenderTarget,
  MathUtils,
  SpriteMaterial,
  Sprite,
  Vector3,
  ArrowHelper,
} from "three";
import { NEWBORN, UNDER, PREGNED } from "../types/";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import * as dat from "dat.gui";

// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

// Scene variables
let mixerCiguena = null;
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
      skybox: null,
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
    this.$store.commit("shopinglist/getWishList");

    try {
      const { data } = await this.$api.event.getEvent360Meny(this.formatDate(new Date()));
      if (data.status.code === "0000") {
        this.eventToShow = data.result.events[data.result.events.length - 1];
        if (this.event3DObject) {
          console.log("this.eventToShow", this.eventToShow);
          this.event3DObject.material.map = new TextureLoader().load(
            this.eventToShow.urlThumbnail
          );
        } else {
          this.event3DObject.material.map = new TextureLoader().load(
            "./logo_universo.png"
          );
        }
      }
    } catch (err) {
      console.log("ERROR EVENT: ", err);
    }
  },
  mounted() {
    this.init();
    this.getBird();
    this.getSky();
    this.getScene();
    this.principalButtons();
    // this.controladores();
    this.animate();
  },
  beforeDestroy: function () {
    document.body.style.cursor = "auto";
  },
  methods: {
    getScene() {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("gltf/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        "scene/scene.gltf",
        (gltf) => {
          gltf.scene.position.set(0, -33, 0);
          gltf.scene.rotation.y = MathUtils.degToRad(-90);
          // gltf.scene.position.y = -3

          mixer = new AnimationMixer(gltf.scene);
          console.log("gltf todo:", gltf);
          const animation = mixer.clipAction(gltf.animations[0]);
          animation.play();

          this.event3DObject = gltf.scene.getObjectByName(
            "PantallaFade_MT_PantallaFade_0",
            true
          );
          this.floor = gltf.scene.getObjectByName("Plano_Piso_Piso_Referencia_0", true);
          this.floor.material.normalScale.set(12, 12);

          console.log("this.event3DObject: ", this.event3DObject);
          if (this.eventToShow) {
            console.log(this.eventToShow);
            this.event3DObject.material.map = new TextureLoader().load(
              this.eventToShow.urlThumbnail
            );
          } else {
            this.event3DObject.material.map = new TextureLoader().load(
              "./logo_universo.png"
            );
          }

          this.scene.add(gltf.scene);
          document
            .getElementById("loading-container-juguetilandia")
            .classList.remove("flex");
          document
            .getElementById("loading-container-juguetilandia")
            .classList.add("hidden");
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log("An error happened", error);
        }
      );
    },
    getBird() {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("gltf/");
      loader.setDRACOLoader(dracoLoader);
      loader.load("ciguena/Ciguena-Anim2.gltf", (gltf) => {
        gltf.scene.position.set(198, 43, 75);
        gltf.scene.rotation.set(0, 4, 0);
        this.ciguena = gltf.scene;
        console.log("gltf", gltf);
        mixerCiguena = new AnimationMixer(gltf.scene);
        const animation = mixerCiguena.clipAction(gltf.animations[0]);
        animation.play();
        this.scene.add(gltf.scene);
      });
    },

    getSky() {
      const loader = new TextureLoader();
      const texture = loader.load("./background.png", () => {
        const rt = new WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(this.renderer, texture);
        this.scene.background = rt;
      });
    },
    createSprite(url) {
      const map = new TextureLoader().load(url);
      const material = new SpriteMaterial({ map: map });
      const sprite = new Sprite(material);
      return sprite;
    },

    init() {
      this.mainContainer = document.getElementById("main-container-juguetilandia");
      this.camera = new PerspectiveCamera(
        35,
        this.mainContainer.clientWidth / this.mainContainer.clientHeight,
        0.1,
        1000
      );
      this.scene = new Scene();

      // const axesHelper = new AxesHelper(50);
      // this.scene.add(axesHelper);
      this.renderer = new WebGLRenderer({ antialias: true });

      this.renderer.setSize(
        this.mainContainer.clientWidth,
        this.mainContainer.clientHeight
      );
      this.renderer.setPixelRatio(
        window.devicePixelRatio >= 2 ? 2 : window.devicePixelRatio
      );
      this.renderer.gammaFactor = 10;
      this.renderer.gammaOutput = true;
      console.log("RENDERER", this.renderer);
      this.renderer.physicallyCorrectLights = true;
      this.mainContainer.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.maxAzimuthAngle = Math.PI;
      this.controls.minAzimuthAngle = Math.PI;
      this.controls.maxAzimuthAngle = 2 * Math.PI;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.rotateSpeed *= -0.2;
      this.controls.enableZoom = true;
      this.controls.maxDistance = 250;
      this.controls.minDistance = 100;

      this.camera.position.set(-180.5, 35, 0);
      this.camera.position.y = 35;

      this.centroControls = new Vector3(-140.5, 53, 0).normalize();
      this.centroControls.y = 40;
      this.controls.target = this.centroControls;

      this.camera.updateProjectionMatrix();
      this.camera.updateProjectionMatrix();
      this.controls.update();

      this.hemislight = new HemisphereLight(0xffffff, 0x080820, 5.5);
      this.scene.add(this.hemislight);
      console.log("this.hemislight:", this.hemislight);

      // Raycast
      this.raycaster = new Raycaster();

      // Composer
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);

      this.mainContainer.addEventListener("mousemove", this.onMouseMove, false);
      this.mainContainer.addEventListener("click", this.onInteractionEvent, false);
      this.mainContainer.addEventListener("touchstart", this.onTouchInteraction, false);
      window.addEventListener("resize", () => {
        this.onResize();
      });
    },

    principalButtons() {
      this.logoButton = this.createSprite("./logo_universo.png");
      console.log("this.logoButton", this.logoButton);
      this.logoButton.position.set(50, 84, 2);
      this.logoButton.scale.set(60, 40, 0);
      this.logoButton.name = "logo";

      this.embarazoButton = this.createSprite("./botones/embarazo.png");
      this.embarazoButton.scale.set(35, 35, 0);
      this.embarazoButton.position.set(40, 27, -86);
      this.embarazoButton.name = "embarazo";

      this.postpartoButton = this.createSprite("./botones/postparto.png");
      this.postpartoButton.scale.set(35, 35, 0);
      this.postpartoButton.position.set(50, 34, 5);
      this.postpartoButton.name = "postparto";
      console.log("this.postpartoButton", this.postpartoButton);

      this.primerosButton = this.createSprite("./botones/primeros.png");
      this.primerosButton.scale.set(35, 35, 0);
      this.primerosButton.position.set(40, 27, 86);
      this.primerosButton.name = "primeros";

      this.scene.add(
        this.logoButton,
        this.embarazoButton,
        this.postpartoButton,
        this.primerosButton
      );
    },

    onResize() {
      this.renderer.setSize(
        this.mainContainer.clientWidth,
        this.mainContainer.clientHeight
      );
      this.camera.aspect =
        this.mainContainer.clientWidth / this.mainContainer.clientHeight;
      this.camera.updateProjectionMatrix();
    },
    animate() {
      requestAnimationFrame(this.animate);
      const delta = clock.getDelta();
      mixerCiguena && mixerCiguena.update(delta);
      mixer && mixer.update(delta);
      this.controls.update();
      this.composer.render();
    },
    onInteractionEvent(event) {
      event.preventDefault();
      this.raycaster.setFromCamera(this.mouseData, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        console.log("CLICK: ", intersects[0].object);
        if (intersects[0].object.name === "postparto") {
          localStorage.setItem("currentSection", NEWBORN);
          this.$store.commit("menu/setCurrentSection", NEWBORN);
          this.$router.push({
            name: "newborn",
            params: {
              typeScreen: NEWBORN,
            },
          });
        } else if (intersects[0].object.name === "primeros") {
          localStorage.setItem("currentSection", UNDER);
          this.$store.commit("menu/setCurrentSection", UNDER);
          this.$router.push({
            name: "newborn",
            params: {
              typeScreen: UNDER,
            },
          });
        } else if (intersects[0].object.name === "embarazo") {
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
            name: "newborn  -events-id",
            params: {
              id: this.eventToShow._id,
            },
          });
        }
      }
    },
    onMouseMove(event) {
      event.preventDefault();
      this.mouseData.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseData.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouseData, this.camera);
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        if (intersects[0].object.name === "postparto") {
          document.body.style.cursor = "pointer";
        } else if (intersects[0].object.name === "primeros") {
          document.body.style.cursor = "pointer";
        } else if (intersects[0].object.name === "embarazo") {
          document.body.style.cursor = "pointer";
        } else if (
          intersects[0].object.name === "Letrero_M_Atlas_0" ||
          intersects[0].object.name === "Evento_Evento_0"
        ) {
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "auto";
        }
      }
    },
    onTouchInteraction(event) {
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
