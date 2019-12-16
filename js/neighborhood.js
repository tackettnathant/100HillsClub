var neighborlist = {
	computed:{
		neighborhoods: function(){
				return this.$store.state.neighborhoods;
		},
		completed: function(){
			return this.$store.state.user.completed?this.$store.state.user.completed.length:0;
		}
	},
	template: `
<div>
<header class="card-header hill-list-header">
<p class="card-header-title">Hill Neighborhoods</p><span  v-if="$store.state.loggedIn" class="card-header-icon" > {{completed}}/100</span>
</header>
<hood v-for="neighborhood in neighborhoods"  :neighborhood="neighborhood" :key="neighborhood.id"></card>
</div>

	`

}

Vue.component('neighborlist',neighborlist);

var hood = {
	props:["neighborhood"],
	computed:{
		badgeCount: function(){
			return this.$store.state.user.completed==null?0:
			this.$store.state.hills.filter((hill)=>{
				return hill.neighborhood==this.neighborhood.id && this.$store.state.user.completed.indexOf(hill.id)>-1;
			}).length + "/" + this.$store.state.hills.filter((hill)=>hill.neighborhood==this.neighborhood.id).length
		},
		hoodHillsOld: function(){
			return hills.filter(
						(hill) => hill.neighborhood==this.neighborhood.id
					);
		},
		hoodHills: function(){
			return this.$store.state.hills.filter((hill)=>hill.neighborhood==this.neighborhood.id)

		},
		doneCount: function(){
			return this.$store.state.user.completed==null?0:
      this.$store.state.hills.filter((hill)=>{
        return hill.neighborhood==this.neighborhood.id && this.$store.state.user.completed.indexOf(hill.id)>-1;
      }).length
		}
	},
	data: function(){
		return {
			expanded: false,
			url: "https://www.google.com/maps/d/embed?mid="+this.neighborhood.mapId,
			closeLoader: "document.getElementById('map-loader-"+this.neighborhood.id+"').style.display='none'",
			loaderId: "map-loader-"+this.neighborhood.id
		};
	},
	methods: {
		toggleDetails: function() {
			this.expanded = !this.expanded;
		}
	},
	template:`
	<div>
		<div class="card is-fullwidth">
			<header class="card-header" style="background-color:#ffffd9">
				<p class="card-header-title">{{neighborhood.name}}</p>
				<div v-if="$store.state.loggedIn" class="card-header-icon"  >{{badgeCount}}</div>

				<a class="card-header-icon card-toggle" style="color:#000000">
					<i class="fas fa-chevron-down" aria-hidden="true" @click="toggleDetails"></i>
				</a>
			</header>
			<div class="card-image" v-show="expanded">
			<div class="loader is-loading is-active" style="position:absolute;top:50%;height:40px;width:40px;left:42%" :id="loaderId"></div>
				<iframe v-if="expanded" :src="url" style="overflow:hidden;height:35vh;width:100%" :onload="closeLoader"></iframe>
			</div>
		</div>
		<hill v-for="hill in hoodHills" :hill="hill" :key="hill.id" v-show="expanded"></hill>
	</div>
`

}

Vue.component('hood',hood);
