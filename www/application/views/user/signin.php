<!--<section class="login-page">-->
<!--  <div class="form">-->
<!--		<form class="register-form" action="" method="post">-->
<!--		 	<p class="register-form_title">-->
<!--				Create an account-->
<!--			</p>-->
<!--			<div data-tip="Input at least 5 characters">-->
<!--				<input type="text" name="login" placeholder="username" value="" required/>-->
<!--			</div>-->
<!--			<div data-tip="Input at least 7 characters and 1 uppercase letter">-->
<!--				<input type="password" name="passwd" placeholder="password" value="" required/>-->
<!--			</div>-->
<!--			<input type="password" name="cpasswd" placeholder="confirm your password" value="" required/>-->
<!--			<div data-tip="We will send you an activation link">-->
<!--				<input type="email" name="email" placeholder="email" value="" required/>-->
<!--			</div>-->
<!--			<button type="submit" name="submit" value="OK"/>-->
<!--				create-->
<!--			</button>-->
<!--			<p class="message">-->
<!--				Already registered?-->
<!--					<a href="http://localhost:8100/user/login">-->
<!--						Login In-->
<!--					</a>-->
<!--			</p>-->
<!--		</form>-->
<!--	</div>-->
<!--</section>-->
<!-- card ui -->
<div class="con">
    <div class="card">
        <div class="card-about">
            <h1>Sign up</h1>
            <!--       <h2>oDsoky .<span>inc</span></h2> -->
            <p>Join Our Community</p>
        </div>
        <form autocomplete="off" class="sign-in">

            <div class="inputs">
                <!--         <i class="fa fa-envelope-o" aria-hidden="true"></i> -->
                <input type="text" placeholder="First Name" required/>
                <input type="text" placeholder="Last Name"/>

                <input type="text" placeholder="UserName" required/>
                <input type="text" placeholder="Email" required/>

                <input type="password" placeholder="Password" required/>
                <input type="password" placeholder="Confirm Password" required/>
            </div>

            <!--       terms -->
            <div class="terms">
                <input type="checkbox" id="signing" name="signing">
                <label for="signing"><p>i agree with <i>terms and conditions</i></p></label>
            </div>



            <button class="submit">SIGN UP</button>

            <div class="login">
                <!--       Already a member -->
                <label id="login" for="login"><p> Already a member! <a href="http://localhost:8001/user/login"> Login </a></p></label>
            </div>
        </form>



    </div></div>