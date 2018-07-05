<?php
	use application\components\Controller;
	use application\components\View;
	use application\controllers\UserController;
	use application\controllers\PictureController;
	use application\components\Model;
	use application\models\User;
	use application\models\Picture;
?>

<section class="single-photo">
	<div class="single-photo--item">
		<?php 
			$user = new User();
			$author = $user->extractLoginByPic($vars[0]['id_pic']);
		?>
		<div class="feed-item--author" data-author=<?php echo '"'.$author.'"'?>>
			<?php echo "<b>".$author."'s</b> picture"?>
		</div>
		<div class="feed-item--pic">
				<img name="link" src=
				<?php echo '"'.substr($vars[0]['link'], 5).'"'?>
				>
		</div>
		<div class="feed-item--like">
			<button class="like" data-pic-id=<?php echo '"'.$vars[0]['id_pic'].'"'?>>
				<?php
					$userRow = $user->extractUserByLogin($_SESSION['authorizedUser']);
					$pic = new Picture();
					if ($pic->likeCheck($vars[0]['id_pic'], $userRow[0]['id']) == true)
						$like_src = '/templates/img/like4.png';
					else
						$like_src = '/templates/img/like3.png';
				?>
				<img src=<?php echo '"'.$like_src.'"'?>>
			</button>
		</div>
		<div class="feed-item--like-count">
			<?php echo $vars[0]['likes']?>
		</div>
		<div class="comment-btn">
			<img src="/templates/img/com4.png">
		</div>
		<div class="feed-item--comment">
			<?php
				$comments = $pic->extractComments($vars[0]['id_pic']);
				if ($comments != null)
				{
					foreach ($comments as $com) {
						echo "<div class='comment-row'>";
						echo "<div class='comment-who'>".$com['who_comment'].": </div>";
						echo "<div class='comment-txt'>".$com['comment_text']."</div>";
						echo "</div>";
					}
				}
				else
					echo "<div class='comment-init'>Be first who comment this photo</div>"
			?>
		</div>
	</div>
</section>
<!-- Makes likes -->
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
<!-- Makes comments -->
<script type="text/javascript">
	const commentBtn = document.getElementsByClassName('comment-btn')[0];
	commentBtn.addEventListener('click', drowCommField, false);
	function drowCommField(ev)
	{
		const duplicate = document.getElementsByTagName('textarea');
		if(duplicate.length != 0)
			return;
		let lastCom = document.getElementsByClassName('feed-item--comment')[0];
		var commentBox =  document.createElement('textarea');
		commentBox.className = "commentBox";
		commentBox.type = "text";
		commentBox.placeholder = "your comment here";
		commentBox.setAttribute('maxlength', '140');
		lastCom.appendChild(commentBox);
		var submitBtn = document.createElement('button');
		submitBtn.className = "submit-btn";
		submitBtn.type = "submit";
		submitBtn.innerHTML = "Comment";
		lastCom.appendChild(submitBtn);
		let sendComment = document.getElementsByClassName('submit-btn')[0];
		sendComment.addEventListener('click', function(){
			let comment = document.getElementsByTagName('textarea')[0].value;
			if (comment !== "" && comment !== null)
			{
				const picId = document.getElementsByClassName('like')[0].getAttribute('data-pic-id');
				const req = new XMLHttpRequest();
				req.open('POST', 'http://localhost:8100/picture/comment');
				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				let body = "txt=" + comment + "&id_pic=" + picId;
				req.addEventListener("load", function(event) {
					var newRow =  document.createElement('div');
					newRow.className = "comment-row";
					newRow.innerHTML = event.target.responseText;
					let place = document.getElementsByClassName('comment-row');
					if (place.length === 0)
					{
						place = lastCom;
						let rowToDell = document.getElementsByClassName('comment-init')[0];
						place.insertBefore(newRow, rowToDell);
						rowToDell.remove();
					}
					else
					{
						place = place[place.length - 1];
						place.appendChild(newRow);
					}					
					document.getElementsByTagName('textarea')[0].value = '';
				});
				req.send(body);
			}
		});
	};
</script>
<!-- Forses page be full height -->
<script type="text/javascript">
	function resize()
    {
    	const menu = document.getElementsByClassName('top')[0].offsetHeight;
        var heights = window.innerHeight - menu - 100;
        document.getElementsByClassName("single-photo")[0].style.height = heights + "px";
    }
    resize();
    window.onresize = function() {
        resize();
    };
</script>