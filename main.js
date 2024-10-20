const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xF0F0F0);

        const container = document.getElementById('scene-container');
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.insertBefore(renderer.domElement, container.firstChild);

        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const material = new THREE.MeshPhongMaterial({ color: 0xffA500 });
        const donut = new THREE.Mesh(geometry, material);
        scene.add(donut);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;
        }

        function animate() {
            requestAnimationFrame(animate);

            donut.position.x += (mouseX - donut.position.x) * 0.05;
            donut.position.y += (-mouseY - donut.position.y) * 0.05;

            donut.rotation.x += 0.01;
            donut.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });