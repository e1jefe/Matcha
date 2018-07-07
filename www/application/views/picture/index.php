<?php 
	use application\components\Model;
	use application\models\Picture;
?>

<section class="camera">
	<div class="container">
		<div class="photo-holder">
			<aside class="left">
				<?php 
					$arrLayers = new Picture();
					$arrLayers = $arrLayers->getSuperposableImages();
				?>
				<div class="layers">
					<?php foreach ($arrLayers as $layer): ?>
						<input type="checkbox" id=<?='"'.$layer['id'].'"'?> name="" value="yes">
		      			<label for=<?='"'.$layer['id'].'"'?>>
		      				<img src=<?= '"'.$layer['src'].'"'?>>
		      			</label>
					<?php endforeach; ?>
				</div>

			</aside>
			<div class="video-holder">
				<video id="video" width="540" height="400" autoplay></video>
				<canvas id="preCanvas" width="540" height="400"></canvas>
			</div>
		</div>
		<div class="camera-featurs">
			<button id="snap">
				Snap Photo
			</button>
			<form method="post" action="/" class="camera-featurs--upload">
				<label for="photo" class="capture-btn">
					Upload file
				</label>
				<input type="file" id="photo" name="image" accept="image/*">
			</form>
			<button id="sendPic">
				post picture
			</button>
		</div>
			<canvas id="canvas" width="540" height="400"></canvas>
	</div>
</section>
<script type="text/javascript">
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
	const video = document.getElementById('video');
	const canvas = document.getElementById('canvas');
	var photo;
	var forDrow = new Map();
	const place = document.getElementById('preCanvas');
	const input = document.querySelector('input[type=file]');
	const sendPic = document.getElementById('sendPic');
	var snap = document.getElementById('snap');
	var inputs = document.getElementsByTagName("input");
	var layers = []; //will contain all checkboxes
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox") {
			layers.push(inputs[i]);
		}
	};
	
	for (var i = 0; i < layers.length; i++) {
		layers[i].addEventListener('click', addCheck, false);
	};

	function addCheck(){
		var key = this.getAttribute('id');
		var tmp = document.querySelector('label[for="' + this.getAttribute('id') + '"]');
		tmp = tmp.childNodes[1];
		var link = tmp.getAttribute('src');
		if(this.hasAttribute('checked'))
		{
			this.removeAttribute('checked');
			forDrow.delete(key);
		}
		else
		{
			this.setAttributeNode(document.createAttribute('checked'));
			forDrow.set(key, link);
		}
		drawLayers(forDrow);
	};
	
	function logMapElements(value, key, map) {
		var x;
		var y;
		var width;
		var height;
		var sticker = new Image();
		sticker.src = value;
		if(key == 1)
		{
			x = 330;
			y = 230;
			width = 200;
			height = 170;
		}
		if(key == 2)
		{
			x = 110;
			y = 70;
			width = 220;
			height = 260;
		}
		if(key == 3)
		{
			x = 0;
			y = 0;
			width = 250;
			height = 200;
		}
		if(key == 4)
		{
			x = 0;
			y = 180;
			width = 220;
			height = 220;
		}
		if(key == 5)
		{
			x = 290;
			y = 180;
			width = 220;
			height = 220;
		}
		if(key == 6)
		{
			x = 10;
			y = 190;
			width = 220;
			height = 220;
		}
		if(key == 7)
		{
			x = 150;
			y = 100;
			width = 160;
			height = 200;
		}
		if(key == 8)
		{
			x = 270;
			y = 80;
			width = 230;
			height = 320;
		}
		if(key == 9)
		{
			x = 0;
			y = 0;
			width = 540;
			height = 400;
		}
		if(key == 15)
		{
			x = 50;
			y = 30;
			width = 380;
			height = 350;
		}
		place.getContext("2d").drawImage(sticker, x, y, width, height);
	};

	function drawLayers(event){
		place.getContext("2d").clearRect(0, 0, place.width, place.height);
		forDrow.forEach(logMapElements);
	};

	if (navigator.getUserMedia)
	{
		navigator.getUserMedia({ audio: false, video: { width: 540, height: 400 } },
		function(stream) {
			video.srcObject = stream;
			video.onloadedmetadata = function(e) {
				video.play();
			};
		},
		function(err) {
			console.log("The following error occurred: " + err.name);
		});
	}
	else
		console.log("getUserMedia not supported");

	
	snap.onclick = function draw(){
		canvas.getContext("2d").drawImage(video, 0, 0, 540, 400, 0, 0, 540, 400);
		var tmp = document.getElementById('preCanvas');
		canvas.getContext("2d").drawImage(tmp, 0, 0, 540, 400, 0, 0, 540, 400);
		photo = canvas.toDataURL();
	};

	input.addEventListener('change', function(ev){
		const files = ev.target.files;
		const file = files[0];
		var FR = new FileReader();
		FR.onload = function(e) {
			var img = new Image();
			img.addEventListener("load", function() {
				canvas.getContext("2d").drawImage(img, 0, 0, 540, 400);
				photo = canvas.toDataURL();
			});
			img.src = e.target.result;
		};
		if (file !== undefined)
			FR.readAsDataURL(file);
	});

	sendPic.onclick = function(){
		if (photo !== undefined)
		{
			const req = new XMLHttpRequest();
			req.open("POST", "PictureController.php", true);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			var body = 'image=' + photo;
			req.addEventListener("load", function(event) {
				alert("Your photo was uploaded");
				canvas.getContext("2d").clearRect( 0,0, 540, 400 );
				photo = undefined;
				place.getContext("2d").clearRect( 0,0, place.width, place.height );
			});
			req.send(body);
		}
	};
</script>
<script type="text/javascript">
	function resize()
    {
    	if(window.innerWidth < 200 || window.innerHeight < 1000 || (window.innerWidth < 590 && window.innerHeight < 1090))
    		return;
    	const menu = document.getElementsByClassName('top')[0].offsetHeight;
    	if(window.innerWidth < 1081)
    		var heights = window.innerHeight - menu -40;
    	else
        	heights = window.innerHeight - menu - 60;
        document.getElementsByClassName("camera")[0].style.height = heights + "px";
    }
    resize();
    window.onresize = function() {
        resize();
    };
</script>