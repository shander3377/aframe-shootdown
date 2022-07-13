AFRAME.registerComponent("shoot", {
	shootBullets: function () {
		window.addEventListener("keydown", (e) => {
			if (e.key === "z") {
				var bullet = document.createElement("a-entity");
				bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
				bullet.setAttribute("material", { color: "black" });

				var cam = document.querySelector("#camera-rig");
				var pos = cam.getAttribute("position");
				var camera = document.querySelector("#camera").object3D;
				var direction = new THREE.Vector3();

				camera.getWorldDirection(direction);
				bullet.setAttribute("position", pos);
				bullet.setAttribute("velocity", direction.multiplyScalar(-10));
				bullet.setAttribute("dynamic-body", { shape: "sphere", mass: 0 });
				bullet.addEventListener("collide", this.removeBullet);
				var scene = document.querySelector("#scene");
				var camera3d = document.querySelector("#camera").object3D;
				scene.appendChild(bullet); 
				this.shootSound()
			}
		});
	},

	init: function () {
		this.shootBullets();
	},

	removeBullet: function (e) {

		var element = e.detail.target.el; // bullet
		var elementHit = e.detail.body.el; //boxes going to be hit

		if (elementHit.id.includes("box")) {
			elementHit.setAttribute("material", { opacity: 0.6, transparent: true });

			var impulse = new CANNON.Vec3(-2, 2, 1);
			var worldPoint = new CANNON.Vec3().copy(
				elementHit.getAttribute("position")
			);
			elementHit.body.applyImpulse(impulse, worldPoint);
			
			element.removeEventListener("collide", this.shoot);
			var scene = document.querySelector("#scene");
			scene.removeChild(element);
		}
	},

	shootSound: function () {
		var sound_el = document.querySelector("#sound_shoot")
		sound_el.components.sound.playSound()

	}
});
