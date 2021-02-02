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
  CubeTextureLoader,
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
    };
  },
  async created() {
    this.$store.commit("shopinglist/getWishList");

    try {
      const { data } = await this.$api.event.getEvent360Meny(this.formatDate(new Date()));
      console.log("status.code", data.status.code);
      if (data.status.code === "0000") {
        this.eventToShow = data.result.ultimo_evento;
        console.log("this.eventToShow", data.result.events);
        console.log("this.eventToShow", data.result);
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
    this.getSky();
    this.getBird();
    this.getScene();
    this.principalButtons();

    this.animate();
  },
  beforeDestroy: function () {
    document.body.style.cursor = "auto";
  },
  methods: {
    init() {
      this.mainContainer = document.getElementById("main-container-juguetilandia");

      this.scene = new Scene();
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
      this.renderer.physicallyCorrectLights = true;
      this.mainContainer.appendChild(this.renderer.domElement);

      this.camera = new PerspectiveCamera(
        50,
        this.mainContainer.clientWidth / this.mainContainer.clientHeight,
        0.1,
        1000
      );
      //Configuración orbit controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minAzimuthAngle = Math.PI;
      this.controls.maxAzimuthAngle = 2 * Math.PI;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.enableZoom = true;
      this.controls.maxDistance = 20;
      this.controls.minDistance = 20;

      this.camera.position.set(-500.5, 35, 0);
      this.camera.position.y = 35;
      this.camera.position.x = -140;

      this.centroControls = new Vector3(-500.5, 53, 0).normalize();
      this.centroControls.y = 40;
      this.centroControls.x = -90;
      this.controls.target = this.centroControls;

      this.camera.updateProjectionMatrix();
      this.controls.update();

      this.hemislight = new HemisphereLight(0xffffff, 0x080820, 5.5);
      this.scene.add(this.hemislight);

      // Raycast
      this.raycaster = new Raycaster();
      // this.raycaster.layers.set(1);

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

    getScene() {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("gltf/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        "https://cdn.glitch.com/4390c048-0cf2-49a3-ab03-4f452164ad25%2Fscene.gltf?v=1612294498206",
        (gltf) => {
          gltf.scene.position.set(0, -33, 0);
          gltf.scene.rotation.y = MathUtils.degToRad(-90);
          //Animación de la escena
          mixer = new AnimationMixer(gltf.scene);
          const animation = mixer.clipAction(gltf.animations[0]);
          animation.play();

          this.event3DObject = gltf.scene.getObjectByName(
            "PantallaFade_MT_PantallaFade_0",
            true
          );
          this.event3DObject.layers.enable(1);

          this.floor = gltf.scene.getObjectByName("Plano_Piso_Piso_Referencia_0", true);
          this.floor.material.normalScale.set(12, 12);

          if (this.eventToShow) {
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
        gltf.scene.position.set(198, 51, 80);
        gltf.scene.rotation.set(0, 3.7, 0);
        this.ciguena = gltf.scene;
        mixerCiguena = new AnimationMixer(gltf.scene);
        const animation = mixerCiguena.clipAction(gltf.animations[0]);
        animation.play();
        this.scene.add(gltf.scene);
      });
    },

    getSky() {
      const loader = new TextureLoader();
      const texture = loader.load(
        "https://cdn.glitch.com/4390c048-0cf2-49a3-ab03-4f452164ad25%2Fbackground.png?v=1612294895748",
        () => {
          const rt = new WebGLCubeRenderTarget(texture.image.height);
          rt.fromEquirectangularTexture(this.renderer, texture);
          this.scene.background = rt;
        }
      );

      // let urls = [
      //   "skybox/Cielo_NZ.jpg",
      //   "skybox/Cielo_PZ.jpg",
      //   "skybox/Cielo_PY.jpg",
      //   "skybox/Cielo_NY.jpg",
      //   "skybox/Cielo_PX.jpg",
      //   "skybox/Cielo_NX.jpg",
      // ];
      // let loader = new CubeTextureLoader();
      // this.scene.background = loader.load(urls);
    },
    createSprite(url) {
      const map = new TextureLoader().load(url);
      const material = new SpriteMaterial({ map: map });
      const sprite = new Sprite(material);
      sprite.layers.enable(1);
      return sprite;
    },
    helpers() {
      const axesHelper = new AxesHelper(10);
      this.scene.add(axesHelper);
    },
    principalButtons() {
      this.logoButton = this.createSprite("./logo_universo.png");
      this.logoButton.position.set(50, 94, 2);
      this.logoButton.scale.set(50, 50, 0);
      this.logoButton.name = "logo";

      this.embarazoButton = this.createSprite("./botones/embarazo.png");
      this.embarazoButton.scale.set(48, 48, 0);
      this.embarazoButton.position.set(40, 27, -94);
      this.embarazoButton.name = "embarazo";

      this.postpartoButton = this.createSprite("./botones/postparto.png");
      this.postpartoButton.scale.set(48, 48, 0);
      this.postpartoButton.position.set(48, 34, 5);
      this.postpartoButton.name = "postparto";

      this.primerosButton = this.createSprite("./botones/primeros.png");
      this.primerosButton.scale.set(48, 48, 0);
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
      //Se escogen los botones para evitar que el raycaster haga una búsqueda exaustiva
      this.raycaster.setFromCamera(this.mouseData, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length > 0) {
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
        } else if (intersects[0].object.name === "PantallaFade_MT_PantallaFade_0") {
          if (this.eventToShow.route === "under") {
            localStorage.setItem("currentSection", UNDER);
            this.$store.commit("menu/setCurrentSection", UNDER);
            this.$router.push({
              name: "newborn-events-id",
              params: {
                typeScreen: UNDER,
                id: this.eventToShow._id,
              },
            });
          } else if (this.eventToShow.route === "pregned") {
            localStorage.setItem("currentSection", PREGNED);
            this.$store.commit("menu/setCurrentSection", PREGNED);
            this.$router.push({
              name: "newborn-events-id",
              params: {
                typeScreen: PREGNED,
                id: this.eventToShow._id,
              },
            });
          } else {
            localStorage.setItem("currentSection", NEWBORN);
            this.$store.commit("menu/setCurrentSection", NEWBORN);
            this.$router.push({
              name: "newborn-events-id",
              params: {
                typeScreen: NEWBORN,
                id: this.eventToShow._id,
              },
            });
          }
        }
      }
    },
    onMouseMove(event) {
      event.preventDefault();
      this.mouseData.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseData.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouseData, this.camera);
    },

    onTouchInteraction(event) {
      console.log("TOUCHSTART");

      this.mouseData.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mouseData.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      this.onInteractionEvent(event);
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
