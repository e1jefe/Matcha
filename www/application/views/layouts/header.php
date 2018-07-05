<section class="top" name="menu">
	<a href="http://localhost:8001/home" class="logo">
        <?php if (array_key_exists('userId', $_SESSION)): ?>
            <p class="logo-txt">
                Matcha
            </p>
        <?php else: ?>
            <p class="logo-txt">
                Purrfect Matcha
            </p>
        <?php endif; ?>
	</a>
	<nav class="menu-unknown">
		<?php if (array_key_exists('userId', $_SESSION)): ?>
			<a href="http://localhost:8001/user/cabinet" class="login">
				<?php echo $_SESSION['userLogin']?>
			</a>
			<a href="http://localhost:8001/logout">
				Logout
			</a>
		<?php else: ?>
			<a href="http://localhost:8001/user/login">
				Log/Sign in
			</a>
		<?php endif; ?>
	</nav>
</section>