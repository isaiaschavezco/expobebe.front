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
    // this.helpers();
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
      this.controls.rotateSpeed *= -0.2;
      this.controls.enableZoom = true;
      // this.controls.maxDistance = 20;
      // this.controls.minDistance = 20;

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
      console.log("this.hemislight:", this.hemislight);

      // Raycast
      this.raycaster = new Raycaster();
      this.raycaster.layers.set(1);

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
        "scene/sceneDraco.gltf",
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
      console.log("this.postpartoButton", this.postpartoButton);

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
          }
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
    controladores() {
      const options = {
        camara: {
          fov: 80,
          x: 2,
          y: 0,
          z: 0,
        },
        hemislight: {
          intensity: 5.5,
        },
        pajaro: {
          x: 2,
          y: 0,
          z: 0,
        },
        pajarorotation: {
          x: 0,
          y: -1,
          z: 0,
          scale: 0,
        },
        camararotation: {
          x: 0,
          y: -1,
          z: 0,
        },
        camaraCentro: {
          x: -1,
          y: -1,
          z: 1,
          block: false,
          block360: false,
        },
      };
      const gui = new dat.GUI();

      const materialFolder = gui.addFolder("Intensidad luz y fov cámara");
      const cameraFolder = gui.addFolder("Posición cámara");
      const targetFolder = gui.addFolder("Target centro de cámara");
      const pajaroFolder = gui.addFolder("Posición pájaro");
      const pajaroRFolder = gui.addFolder("Rotación pájaro");

      const botonRojoFolder = gui.addFolder("Posición rojo");
      const botonAzulFolder = gui.addFolder("Posición Azul");
      const botonMoradoFolder = gui.addFolder("Posición Morado");
      const botonLogo = gui.addFolder("Posición botonLogo");

      materialFolder
        .add(options.camara, "fov", 0.1, 400)
        .onChange((value) => changeFov(value));
      materialFolder
        .add(options.hemislight, "intensity", 0.1, 10)
        .onChange((value) => changeIntensity(value));

      cameraFolder
        .add(options.camara, "x", -400, 400)
        .onChange((value) => changeXcamera(value));
      cameraFolder
        .add(options.camara, "y", -400, 400)
        .onChange((value) => changeYcamera(value));
      cameraFolder
        .add(options.camara, "z", -400, 400)
        .onChange((value) => changeZcamera(value));

      targetFolder
        .add(options.camaraCentro, "x", -400, 400)
        .onChange((value) => changeXtarget(value));

      // targetFolder
      //   .add(options.camaraCentro, "block", false)
      //   .onChange((value) => blockCamera(value));
      // targetFolder
      //   .add(options.camaraCentro, "block360", false)
      //   .onChange((value) => blockCamera360(value));

      targetFolder
        .add(options.camaraCentro, "y", -400, 400)
        .onChange((value) => changeYtarget(value));
      targetFolder
        .add(options.camaraCentro, "z", -400, 400)
        .onChange((value) => changeZtarget(value));

      pajaroFolder
        .add(options.pajaro, "x", -500, 400)
        .onChange((value) => changeXpajaro(value));
      pajaroFolder
        .add(options.pajaro, "y", -500, 400)
        .onChange((value) => changeYpajaro(value));
      pajaroFolder
        .add(options.pajaro, "z", -500, 400)
        .onChange((value) => changeZpajaro(value));
      //rotacion pajaron
      pajaroRFolder
        .add(options.pajarorotation, "x", -400, 400)
        .onChange((value) => changeXRpajaro(value));
      pajaroRFolder
        .add(options.pajarorotation, "y", -400, 400)
        .onChange((value) => changeYRpajaro(value));
      pajaroRFolder
        .add(options.pajarorotation, "z", -400, 400)
        .onChange((value) => changeZRpajaro(value));
      pajaroRFolder
        .add(options.pajarorotation, "scale", -300, 300)
        .onChange((value) => changeScalepajaro(value));
      //POSICIÓN Rojo
      botonRojoFolder
        .add(options.pajarorotation, "x", -300, 300)
        .onChange((value) => changeXrojo(value));
      botonRojoFolder
        .add(options.pajarorotation, "y", -300, 300)
        .onChange((value) => changeYrojo(value));
      botonRojoFolder
        .add(options.pajarorotation, "z", -300, 300)
        .onChange((value) => changeZrojo(value));
      botonRojoFolder
        .add(options.pajarorotation, "scale", -30, 30)
        .onChange((value) => changeScalerojo(value));
      //POSICIÓN Morado
      botonMoradoFolder
        .add(options.pajarorotation, "x", -300, 300)
        .onChange((value) => changeXmorado(value));
      botonMoradoFolder
        .add(options.pajarorotation, "y", -300, 300)
        .onChange((value) => changeYmorado(value));
      botonMoradoFolder
        .add(options.pajarorotation, "z", -300, 300)
        .onChange((value) => changeZmorado(value));
      botonMoradoFolder
        .add(options.pajarorotation, "scale", -300, 300)
        .onChange((value) => changeScalemorado(value));
      //POSICIÓN Azul
      botonAzulFolder
        .add(options.pajarorotation, "x", -300, 300)
        .onChange((value) => changeXazul(value));
      botonAzulFolder
        .add(options.pajarorotation, "y", -300, 300)
        .onChange((value) => changeYazul(value));
      botonAzulFolder
        .add(options.pajarorotation, "z", -300, 300)
        .onChange((value) => changeZazul(value));
      botonAzulFolder
        .add(options.pajarorotation, "scale", -300, 300)
        .onChange((value) => changeScaleazul(value));
      //POSICIÓN logo
      // botonLogo
      //   .add(options.pajarorotation, "x", -300, 300)
      //   .onChange((value) => changeXlogo(value));
      // botonLogo
      //   .add(options.pajarorotation, "y", -300, 300)
      //   .onChange((value) => changeYlogo(value));
      // botonLogo
      //   .add(options.pajarorotation, "z", -300, 300)
      //   .onChange((value) => changeZlogo(value));
      // botonLogo
      //   .add(options.pajarorotation, "scale", -300, 300)
      //   .onChange((value) => changeScaleLogo(value));

      const changeFov = (fov) => {
        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();
      };
      const changeIntensity = (intensity) => {
        this.hemislight.intensity = intensity;
      };
      const changeXcamera = (n) => {
        this.camera.position.x = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      //TARGET
      const changeXtarget = (n) => {
        this.centroControls.x = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeYtarget = (n) => {
        this.centroControls.y = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeZtarget = (n) => {
        this.centroControls.z = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };

      const changeXRcamera = (n) => {
        this.camera.rotation.x = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeXpajaro = (n) => {
        this.ciguena.position.x = n;
      };
      const changeXRpajaro = (n) => {
        this.ciguena.rotation.x = n;
      };
      const changeYcamera = (n) => {
        this.camera.position.y = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeYRcamera = (n) => {
        this.camera.rotation.y = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeYpajaro = (n) => {
        this.ciguena.position.y = n;
      };
      const changeScalepajaro = (n) => {
        this.ciguena.scale.setScalar(n);
      };
      const changeYRpajaro = (n) => {
        this.ciguena.rotation.y = n;
      };
      const changeZcamera = (n) => {
        this.camera.position.z = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeZRcamera = (n) => {
        this.camera.rotation.z = n;
        this.camera.updateProjectionMatrix();
        this.controls.update();
      };
      const changeZpajaro = (n) => {
        this.ciguena.position.z = n;
      };
      const changeZRpajaro = (n) => {
        this.ciguena.rotation.z = n;
      };
      //Rojo
      const changeXrojo = (n) => {
        this.postpartoButton.position.x = n;
      };
      const changeYrojo = (n) => {
        this.postpartoButton.position.y = n;
      };
      const changeZrojo = (n) => {
        this.postpartoButton.position.z = n;
      };
      const changeScalerojo = (n) => {
        console.log(this.postpartoButton);
        console.log(this.postpartoButton.scale);
        this.postpartoButton.scale.setScalar(n);
        console.log(this.postpartoButton.scale);
      };
      //Morado
      const changeXmorado = (n) => {
        this.primerosButton.position.x = n;
      };
      const changeYmorado = (n) => {
        this.primerosButton.position.y = n;
      };
      const changeZmorado = (n) => {
        this.primerosButton.position.z = n;
      };
      const changeScalemorado = (n) => {
        this.primerosButton.scale.setScalar(n);
      };
      //Azul
      const changeXazul = (n) => {
        this.embarazoButton.position.x = n;
      };
      const changeYazul = (n) => {
        this.embarazoButton.position.y = n;
      };
      const changeZazul = (n) => {
        this.embarazoButton.position.z = n;
      };
      const changeScaleazul = (n) => {
        this.embarazoButton.scale.setScalar(n);
      };
      //Logo
      const changeXlogo = (n) => {
        this.logoButton.position.x = n;
      };
      const changeYlogo = (n) => {
        this.logoButton.position.y = n;
      };
      const changeZlogo = (n) => {
        this.logoButton.position.z = n;
      };
      const changeScaleLogo = (n) => {
        this.logoButton.scale.setScalar(n);
      };
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
