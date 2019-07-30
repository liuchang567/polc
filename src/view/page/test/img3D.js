/* eslint-disable */
import * as THREE from 'three'
const img3D = {
    camera: null,
    scene: null,
    renderer: null,
    cameraOrtho: null,
    sceneOrtho: null,
    fov: 55,
    pRadius: 1000,
    raycaster: null,
    container: null,
    isUserInteracting: false,
    lon: 0,
    lat: 0,
    onPointerDownLon: 0,
    onPointerDownLat: 0,
    onPointerDownPointerX: 0,
    onPointerDownPointerY: 0,
    mouse: new THREE.Vector2(),
    clickableObjects: [],
    sprites: [],
    lables: [],
    options: {
        widthSegments: 60,
        heightSegments: 40,
        minFocalLength: 6,
        maxFocalLength: 20,
        sprite: 'label',
        onClick: () => { 
            alert('我只是一个标记')
            // img3D.test()
        }
    },
    test() {
        let opt = {
            url: 'http://192.168.200.141:8888/p1.png',
            lables: [{ position: { lon: 114, lat: 8 }, text: '我是' }] 
        };
        this.render(opt)
    },
    render(opt) {
        document.getElementById('imgWrapper').innerHTML = '';
        this.options = Object.assign(this.options, opt);
        this.lables = [];

        this.initContainer();
        this.initCamera();
        this.initRaycaster();

        this.makePanorama(this.pRadius, this.options.widthSegments, this.options.heightSegments, this.options.url);
        this.initRenderer();
        this.initLable(this.options.lables, this.options.sprite);

        this.container.addEventListener('mousedown', (e) => {
            this.onDocumentMouseDown(e)
        }, false);
        this.container.addEventListener('mousemove', (e) => {
            this.onDocumentMouseMove(e)
        }, false);
        this.container.addEventListener('mouseup', () => {
            this.onDocumentMouseUp()
        }, false);
        this.container.addEventListener('mousewheel', (e) => {
            this.onDocumentMouseWheel(e, this.options.minFocalLength, this.options.maxFocalLength);
        }, false);
        this.container.addEventListener('DOMMouseScroll', (e) => {
            this.onDocumentMouseWheel(e, this.options.minFocalLength, this.options.maxFocalLength);
        }, false);
        this.container.addEventListener('click', this.onDocumentMouseClick.bind(this), false);
        window.addEventListener('resize', this.onWindowResize(), false);
        this.animate();
    },

    initContainer() {
        this.container = document.getElementById(this.options.id);
    },

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1100);
        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.cameraOrtho = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 10);
        this.cameraOrtho.position.z = 10;
        this.scene = new THREE.Scene();
        this.sceneOrtho = new THREE.Scene();
    },

    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
    },

    makePanorama(pRadius, widthSegments, heightSegments, u) {
        var mesh = new THREE.Mesh(new THREE.SphereGeometry(pRadius, widthSegments, heightSegments), new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(u) }));
        mesh.scale.x = -1;
        this.scene.add(mesh);
    },

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.autoClear = false;
        this.container.appendChild(this.renderer.domElement);
    },
    initLable(lables, sprite) {
        if (sprite == 'label') {
            for (var i = 0; i < lables.length; i++) {
                this.lables.push(this.createLableSprite(lables[i].text, lables[i].position));
            }
        } else if (sprite == 'icon') {
            for (var i = 0; i < lables.length; i++) {
                this.sprites.push(this.createSprite(lables[i].position, lables[i].logoUrl, lables[i].text));
            }
        }
    },
    createLableSprite(name, position) {
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        var metrics = context1.measureText(name);
        var width = metrics.width * 1.5;
        context1.font = "10px 宋体";
        context1.fillStyle = "rgba(0,0,0,0.95)";
        context1.fillRect(0, 0, width + 8, 20 + 8);
        context1.fillStyle = "rgba(0,0,0,0.2)";
        context1.fillRect(2, 2, width + 4, 20 + 4);
        context1.fillStyle = "rgba(255,255,255,0.95)";
        context1.fillText(name, 4, 20);
        var texture1 = new THREE.Texture(canvas1);
        texture1.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial({ map: texture1 });
        var sprite1 = new THREE.Sprite(spriteMaterial);
        sprite1.scale.set(1.0, 1.0, 1.0);
        sprite1.position.set(0, 0, 0);
        sprite1.name = name;
        var lable = {
            name: name,
            pos: position,
            canvas: canvas1,
            context: context1,
            texture: texture1,
            sprite: sprite1
        };
        this.sceneOrtho.add(lable.sprite);
        this.clickableObjects.push(lable.sprite);
        return lable;
    },

    createSprite(position, url, name) {
        var textureLoader = new THREE.TextureLoader();
        var ballMaterial = new THREE.SpriteMaterial({
            map: textureLoader.load(url)
        });
        var sp1 = {
            pos: position,
            name: name,
            sprite: new THREE.Sprite(ballMaterial)
        };
        sp1.sprite.scale.set(32, 32, 1.0);
        sp1.sprite.position.set(0, 0, 0);
        sp1.sprite.name = name;
        this.sceneOrtho.add(sp1.sprite);
        this.clickableObjects.push(sp1.sprite);
        return sp1;
    },

    onDocumentMouseDown(event) {
        event.preventDefault();
        this.isUserInteracting = true;
        this.onPointerDownPointerX = event.clientX;
        this.onPointerDownPointerY = event.clientY;
        this.onPointerDownLon = this.lon;
        this.onPointerDownLat = this.lat;
    },

    onDocumentMouseMove(event) {
        if (this.isUserInteracting) {
            this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon;
            this.lat = (event.clientY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;
        }
    },

    onDocumentMouseUp() {
        this.isUserInteracting = false;
    },

    onDocumentMouseClick(event) {
        this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.cameraOrtho);
        var intersects = this.raycaster.intersectObjects(this.clickableObjects);
        intersects.forEach(this.options.onClick);
    },

    onDocumentMouseWheel(ev, minFocalLength, maxFocalLength) {
        var ev = ev || window.event;
        var down = true;
        var m = this.camera.getFocalLength();
        down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
        if (down) {
            if (m > minFocalLength) {
                m -= m * 0.05;
                this.camera.setFocalLength(m);
            }
        } else {
            if (m < maxFocalLength) {
                m += m * 0.05;
                this.camera.setFocalLength(m);
            }
        }
        if (ev.preventDefault) {
            ev.preventDefault();
        }
        return false;
    },

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.projectionMatrix.makePerspective(this.fov, this.camera.aspect, 1, 1100);
        this.camera.updateProjectionMatrix();
        this.cameraOrtho.left = -window.innerWidth / 2;
        this.cameraOrtho.right = window.innerWidth / 2;
        this.cameraOrtho.top = window.innerHeight / 2;
        this.cameraOrtho.bottom = -window.innerHeight / 2;
        this.cameraOrtho.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renders();
    },
    renders() {
        this.calPosition();
        this.addSprites();
        this.runRender();
    },
    calPosition() {
        this.lat = Math.max(-85, Math.min(85, this.lat));
        var phi = THREE.Math.degToRad(90 - this.lat);
        var theta = THREE.Math.degToRad(this.lon);
        this.camera.target.x = this.pRadius * Math.sin(phi) * Math.cos(theta);
        this.camera.target.y = this.pRadius * Math.cos(phi);
        this.camera.target.z = this.pRadius * Math.sin(phi) * Math.sin(theta);
        this.camera.lookAt(this.camera.target);
    },

    addSprites() {
        if (typeof this.sprites != "undefined") {
            for (var i = 0; i < this.sprites.length; i++) {
                var wp = this.geoPosition2World(this.sprites[i].pos.lon, this.sprites[i].pos.lat);
                var sp = this.worldPostion2Screen(wp, this.camera);
                var test = wp.clone();
                test.project(this.camera);
                if (test.x > -1 && test.x < 1 && test.y > -1 && test.y < 1 && test.z > -1 && test.z < 1) {
                    this.sprites[i].sprite.scale.set(32, 32, 32);
                    this.sprites[i].sprite.position.set(sp.x, sp.y, 1);
                } else {
                    this.sprites[i].sprite.scale.set(1.0, 1.0, 1.0);
                    this.sprites[i].sprite.position.set(0, 0, 0);
                }
            }
        }
        if (typeof this.lables != "undefined") {
            for (var i = 0; i < this.lables.length; i++) {
                var wp = this.geoPosition2World(this.lables[i].pos.lon, this.lables[i].pos.lat);
                var sp = this.worldPostion2Screen(wp, this.camera);
                var test = wp.clone();
                test.project(this.camera);
                if (test.x > -1 && test.x < 1 && test.y > -1 && test.y < 1 && test.z > -1 && test.z < 1) {
                    var metrics = this.lables[i].context.measureText(this.lables[i].name);
                    var width = metrics.width * 3.5;
                    this.lables[i].sprite.scale.set(400, 150, 1.0);
                    this.lables[i].sprite.position.set(sp.x + width, sp.y - 40, 1);
                } else {
                    this.lables[i].sprite.scale.set(1.0, 1.0, 1.0);
                    this.lables[i].sprite.position.set(0, 0, 0);
                }
            }
        }
    },

    geoPosition2World(lon, lat) {
        lat = Math.max(-85, Math.min(85, lat));
        var phi = THREE.Math.degToRad(90 - lat);
        var theta = THREE.Math.degToRad(lon);

        var result = {
            x: this.pRadius * Math.sin(phi) * Math.cos(theta),
            y: this.pRadius * Math.cos(phi),
            z: this.pRadius * Math.sin(phi) * Math.sin(theta)
        };
        return new THREE.Vector3(result.x, result.y, result.z);
    },

    worldPostion2Screen(world_vector, camera) {
        var vector = world_vector.clone();
        vector.project(camera);
        var result = {
            x: Math.round((vector.x + 1) * window.innerWidth / 2 - window.innerWidth / 2),
            y: Math.round(window.innerHeight / 2 - (-vector.y + 1) * window.innerHeight / 2),
            z: 0
        };
        return new THREE.Vector3(result.x, result.y, result.z);
    },

    runRender() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        this.renderer.clearDepth();
        this.renderer.render(this.sceneOrtho, this.cameraOrtho);
    }
}

export default img3D;
