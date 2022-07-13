AFRAME.registerComponent("enemy-bullets", {
	init: function () {
		setInterval(this.shootEnemybullet, 2000);
	},

    shootEnemybullet: function () {
        console.log("workkkkkk")
        
		var enemies = document.querySelector(".enemy"); //use . for class, # for ids
		for (var i = 0; i < enemies.length; i++) {
			var enemyBullet = document.createElement("a-entity");
			enemyBullet.setAttribute("geometry", {
				primitive: "sphere",
				radius: 0.1,
			});
			enemyBullet.setAttribute("material", { color: "#282b29" });
			var pos = enemies[i].getAttribute("position");
			pos.x += 1.5;
			pos.y += 3.5;
			enemyBullet.setAttribute("position", pos);
			var scene = document.querySelector("#scene");
            var countLife = document.querySelector("#countLifes");
            var playerLife = parseInt(countLife.getAttribute("text").value);
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            var player = document.querySelector("#shooter").object3D;
            var enemy = enemies[i].object3D;
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            var direction = new THREE.Vector3();
            direction.subVectors(position1, position2).normalize();
             //basically changing the unit of this vector to sue multiplayScalar
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));
            enemyBullet.setAttribute("dynamic-body", {
                mass: 0,
                shape: "sphere",
            });
			scene.appendChild(enemyBullet);

			enemyBullet.addEventListener("collide", (e) => {
				if (e.detail.body.el.id === "shooter") {
					
                    if (playerLife > 0) {
                        playerLife -= 1
                        
                        countLife.setAttribute("text", { value: playerLife })
                        
                    }
                    if (playerLife <= 0) {
                        var overText = document.querySelector("#over")
                        overText.setAttribute("visible", true)
                        var tankEl = document.querySelectorAll(".enemy")
                        for (var i = 0; i < tankEl.length; i++){
                            scene.removeChild(tankEl[i])
                        }
                    }
                    
					
				}
            });
         
		}
	},
});
