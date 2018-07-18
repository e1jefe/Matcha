<?php
use application\components\Controller;
use application\components\View;
use application\controllers\UserController;
use application\controllers\PictureController;

use application\components\Model;
use application\models\User;
use application\models\Picture;
?>

<section class="feed">
	<div class="feed-holder">
		<?php 
			$len = count($vars);
			$count = 6; //items per page
			$pageNbr = floor($len/$count);
			$p = isset($_GET["p"]) ? (int)$_GET["p"] : 0;
		?>
		<?php for ($i = $p * $count; $i < ($p + 1) * $count; $i++){ 
			if (!empty($vars[$i])){ ?>
				<div class="feed-item">
					<?php 
						$user = new User();
						$author = $user->extractLoginByPic($vars[$i]['id_pic']);
					?>
					<div class="feed-item--author" data-author=<?php echo '"'.$author.'"'?>>
						<?php echo "<b>".$author."'s</b> picture"?>
					</div>
					<div class="feed-item--pic">
						<a href=<?php echo "'"."singlePhoto/".substr($vars[$i]["link"], 6)."'"?>
							>>
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
								$like = new Picture();
								if ($like->likeCheck($vars[$i]['id_pic'], $userRow[0]['id']) == true)
									$like_src = '../../templates/img/like4.png';
								else
									$like_src = '../../templates/img/like3.png';
							?>
							<img src=<?php echo '"'.$like_src.'"'?>>
						</button>
					</div>
					<div class="feed-item--like-count">
						<?php echo $vars[$i]['likes']?>
					</div>
				</div>
		<?php }}; ?>
		</div>
		
		<div class="pagination-wrapper">
			<div class="pagination">
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
	
</section>
<div class="addPic">
	<a href="http://localhost:8100/picture/camera">
		<img src="../../templates/img/cam.png">
	</a>
</div>
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
            let button = document.querySelectorAll("[data-pic-id='" + item + "']")[0];
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
<script type="text/javascript">
	function resize()
    {
    	if(window.innerWidth < 1019 || window.innerWidth >= 2100)
    		return;
    	const menu = document.getElementsByClassName('top')[0].offsetHeight;
        var heights = window.innerHeight - menu - 40;
        document.getElementsByClassName("feed")[0].style.height = heights + "px";
    }
    resize();
    window.onresize = function() {
        resize();
    };
</script>