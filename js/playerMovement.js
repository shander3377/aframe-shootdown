AFRAME.registerComponent("player-movement", {
	init: function () {
		this.walk();
	},

	walk: function () {
		window.addEventListener("keydown", (w) => {
			if (
				w.key === "ArrowUp" ||
				w.key === "ArrowDown" ||
				w.key === "ArrowRight" ||
				w.key === "ArrowLeft"
			) {
                console.log("playing sound")
				var el = document.querySelector("#movement_sound");
				el.components.sound.playSound();
			}
		});
	},
});
