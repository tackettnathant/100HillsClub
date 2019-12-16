Vue.component('nav-bar',{
	methods: {
		logout: function() {
			this.$store.commit("logout");
			this.toggleBurger();
		},
		toggleBurger: function(){
		  // Get all "navbar-burger" elements
		  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

		  // Check if there are any navbar burgers
		  if ($navbarBurgers.length > 0) {

			// Add a click event on each of them
			$navbarBurgers.forEach( el => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');


			});
		  }
		}
	},
	template: `
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand"  style="background-image:url(/images/stripe.png);background-repeat:repeat-x;background-size:contain">
    <a class="navbar-item" style="padding-top:0px;padding-bottom:0px;">
      <img src="images/new_web_logo.png" style="max-height:60px" >
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarData" id="navbar-burger">
      <span style="background-color:white" aria-hidden="true"></span>
      <span style="background-color:white" aria-hidden="true"></span>
      <span style="background-color:white" aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarData" class="navbar-menu" style="background-color:#e67540">
    <div class="navbar-start">

      <router-link to="/hilllist" class="navbar-item navlink" @click.native="toggleBurger">
        Hills
      </router-link>

      <router-link to="/map" class="navbar-item navlink" @click.native="toggleBurger">
        Map
      </router-link>

			<router-link v-if="$store.state.loggedIn" to="/mygroups" class="navbar-item navlink" @click.native="toggleBurger">
        My Groups
      </router-link>

	  <router-link to="/about" class="navbar-item navlink" @click.native="toggleBurger">
        About
      </router-link>
			<router-link to="/faq" class="navbar-item navlink" @click.native="toggleBurger">
	        FAQ
	      </router-link>
				<router-link to="/contribute" class="navbar-item navlink" @click.native="toggleBurger">
		        Contribute
		      </router-link>


    </div>
		<!--<a class="navbar-item" href="https://www.instagram.com/100hillsclub/">
		<img src="/images/instagram.png"/>
		</a>-->

    <div class="navbar-end">

      <div class="navbar-item">
        <div class="buttons">
          <router-link  v-if="!$store.state.loggedIn" to="/login" class="button is-primary" @click.native="toggleBurger">
            Log in
          </router-link>
					<a class="button" v-if="$store.state.loggedIn" @click="logout">Log out</a>
        </div>
      </div>

    </div>
  </div>
</nav>
	`
})


document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
