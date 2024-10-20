const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFFFFFF);

        const container = document.getElementById('scene-container');
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.insertBefore(renderer.domElement, container.firstChild);

        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6b4226, 
            roughness: 0.3, 
            metalness: 0.1
        });
        const donut = new THREE.Mesh(geometry, material);
        scene.add(donut);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        camera.position.z = 5;

        let donuts = [];
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);
        container.addEventListener('click', onDonutClick);

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;
        }

        function onDonutClick(event) {
            // Clone the current state of the main donut
            const newDonut = new THREE.Mesh(geometry.clone(), material.clone());
            newDonut.position.set(donut.position.x, donut.position.y, donut.position.z);
            newDonut.rotation.set(donut.rotation.x, donut.rotation.y, donut.rotation.z);
            donuts.push(newDonut);
            scene.add(newDonut);
        }

        function animate() {
            requestAnimationFrame(animate);

            // Update main donut position based on mouse
            donut.position.x += (mouseX - donut.position.x) * 0.05;
            donut.position.y += (-mouseY - donut.position.y) * 0.05;

            donut.rotation.x += 0.01;
            donut.rotation.y += 0.01;

            // Animate falling donuts
            donuts.forEach((d, index) => {
                d.position.y -= 0.02; // Gravity effect
                if (d.position.y < -5) { 
                    scene.remove(d); 
                    donuts.splice(index, 1); // Remove the donut if it's out of view
                }
            });

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });