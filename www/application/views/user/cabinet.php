<?php
use application\components\Controller;
use application\components\View;
use application\controllers\UserController;
use application\controllers\PictureController;
use application\components\Model;
use application\models\User;
use application\models\Picture;
?>

<div class="container cabinet">
	<h1 class="cabinet-title">
		Information about me
	</h1>
	<div class="cabinet-features">
		<p class="cabinet-login">
			My login: 
			<?php echo $_SESSION['authorizedUser'];?>
		</p>
		<button class="change-data" onclick="show('block', 'change-user-data');">
			Change my data
		</button>
		<div id="grey" onclick="show('none', 'change-user-data')"></div>
		<form class="subscription-preferences" action="changeSubscription" method="get">
			<legend class="subscription-preferences--title">
				Subscription preferences
			</legend>
		    <div class="switch-field">	
		      <div class="switch-title">Do you want to get notifications after changing login?</div>
		      <input type="radio" id="switch_left" name="login" value="yes" checked/>
		      <label for="switch_left">Yes</label>
		      <input type="radio" id="switch_right" name="login" value="no" />
		      <label for="switch_right">No</label>
		    </div>
			
			<div class="switch-field2">
		      <div class="switch-title">Do you want to get notifications after changing password?</div>
		      <input type="radio" id="switch_left2" name="pass" value="yes" checked/>
		      <label for="switch_left2">Yes</label>
		      <input type="radio" id="switch_right2" name="pass" value="no" />
		      <label for="switch_right2">No</label>
		    </div>

		    <div class="switch-field3">
		      <div class="switch-title">Do you want to get notifications after someone comment your picture?</div>
		      <input type="radio" id="switch_left3" name="comment" value="yes" checked/>
		      <label for="switch_left3">Yes</label>
		      <input type="radio" id="switch_right3" name="comment" value="no" />
		      <label for="switch_right3">No</label>
		    </div>

		    <input type="submit" name="submit" id="change-pref" value="submit">
		</form>		
	</div>
	<div class="cabinet-pics">
		<?php 
			$len = count($vars);
			$count = 9; //items per page
			$pageNbr = floor($len/$count);
			$p = isset($_GET["p"]) ? (int)$_GET["p"] : 0;
		?>
		<?php for ($i = $p * $count; $i < ($p + 1) * $count; $i++){
			if (!empty($vars[$i])){ ?>
			<div class="cabinet-photo">
				<?php 
					$user = new User();
					$author = $user->extractLoginByPic($vars[$i]['id_pic']);
				?>
				<div class="feed-item--dell" data-author=<?php echo '"'.$author.'"'?> data-pic-id=<?php echo '"'.$vars[$i]['id_pic'].'"'?>>
					Delete this picture
				</div>
				<div class="feed-item--pic">
					<a href=<?php echo "'"."http://localhost:8100/singlePhoto/".substr($vars[$i]["link"], 6)."'"?>
						>
						<img name="link" src=
						<?php echo '"'.$vars[$i]['link'].'"'?>
						>
					</a>
				</div>
				<div class="feed-item--like">
					<button class="like" data-pic-id=<?php echo '"'.$vars[$i]['id_pic'].'"'?>>
						<?php
							$user = new User();
							$userRow = $user->extractUserByLogin($_SESSION['authorizedUser']);
							$pic = new Picture();
							if ($pic->likeCheck($vars[$i]['id_pic'], $userRow[0]['id']) == true)
								$like_src = '../../templates/img/like4.png';
							else
								$like_src = '../../templates/img/like3.png';
						?>
						<img src=<?php echo '"'.$like_src.'"'?>>
					</button>
				</div>
				<div class="cabinet-photo-like-count">
					<?php echo $vars[$i]['likes']?>
				</div>
			</div>
		<?php }}; ?>		
	</div>
	<?php if($vars != null): ?>
		<div class="pagination-wrapper-cabinet">
			<div class="pagination-cabinet">
				<a class="prev page-numbers" href=
					<?php 
						if($p === 0)
							echo ('"?p=0"');
						else
							echo ('"?p='.((int)$p - 1).'"');
					?>
					>prev
				</a>
				<?php for ($i = 0; $i <= $pageNbr; $i++){
					if ($p == $i)
						echo '<a class="page-numbers current" href="?p='.$i.'">'.($i + 1).'</a>';
					else
						echo '<a class="page-numbers" href="?p='.$i.'">'.($i + 1).'</a>';
				};?>
				<a class="next page-numbers" href=
					<?php
						if((int)$p == ((int)$pageNbr) )
							echo ('"?p='.(int)$p.'"');
						else
							echo ('"?p='.((int)$p + 1).'"');
					?>
					>next
				</a>
			</div>
		</div>
	<?php endif; ?>
	<div id="change-user-data">
		<div class="pop-up">
			<img src="../../../templates/img/close.png" alt="close" class="close" onclick="show('none', 'change-user-data');">
			<h2>
				Change my information
			</h2>
			<form action="changeUserData" name="f1" method="post">
				<div data-tip="Input at least 5 characters">
					<input type="text" name="loginNew" placeholder="My new login" class="input"/>
				</div>
				<div data-tip="Input at least 7 characters">
					<input type="password" name="passwdNew" placeholder="My new password" class="input"/>
				</div>
				<div data-tip="We will send you an activation link, please enter valid email">
					<input type="email" name="emailNew" placeholder="My new email" class="input"/>
				</div>
				<input type="submit" name="Submit" value="Submit" class="input submit"/>
			</form>
		</div>
	</div>
	<div class="addPic">
		<a href="http://localhost:8100/picture/camera">
			<img src="../../templates/img/cam.png">
		</a>
	</div>
	<!-- For pop-up subscription settings -->
	<script type="text/javascript">
		function show(state, str) {
			document.getElementById(str).style.display = state;	
			document.getElementById('grey').style.display = state;
		}
	</script>
	<!-- make likes with ajax -->
	<script type="text/javascript">
		const like_btn = document.getElementsByClassName('like');
		for (var i = 0 ; i < like_btn.length; i++) {
			like_btn[i].addEventListener('click', like, false);
		};
			function like(ev){
				var item = this.getAttribute('data-pic-id');
				var body = "pic_id=" + item;
				const req = new XMLHttpRequest();
				req.open('POST', 'http://localhost:8100/picture/like');
				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				req.addEventListener("load", function(event) {
		            let likesNumber = event.target.responseText;
		            let button = document.querySelectorAll("[data-pic-id='" + item + "']")[1];
		            let tmp = parseInt(button.parentElement.nextElementSibling.innerHTML);
		            if (likesNumber - tmp == -1)
		            	(button.getElementsByTagName('img')[0].setAttribute('src', 'http://localhost:8100/templates/img/like4.png'));
		            else
		            	(button.getElementsByTagName('img')[0].setAttribute('src', 'http://localhost:8100/templates/img/like3.png'));
		            button.parentElement.nextElementSibling.innerHTML = likesNumber;
		        });
				req.send(body);
			};
	</script>
	<!-- delete posted pictures -->
	<script type="text/javascript">
		const dell_btn = document.getElementsByClassName('feed-item--dell');
		for (var i = 0 ; i < like_btn.length; i++) {
			dell_btn[i].addEventListener('click', dell, false);
		};
		function dell(ev) {
			var toDell = this.getAttribute('data-pic-id');
			var author = this.getAttribute('data-author');
			var body = "toDell=" + toDell + "&author=" + author;
			const req = new XMLHttpRequest();
			req.open('POST', 'http://localhost:8100/picture/dell');
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.addEventListener("load", function(event) {
				document.querySelectorAll("[data-pic-id='" + toDell + "']")[0].parentNode.remove();  
	        });
			req.send(body);
		};
	</script>
</div>