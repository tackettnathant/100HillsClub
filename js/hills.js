Vue.component('hill',{

props: ['hill','complete'],
data: function(){
	return {
		expanded: false,
		hillLink: "https://maps.google.com/?q="+this.hill.coordinates.lat+","+this.hill.coordinates.long
	};
},
computed: {
	notDone: function(){
		return !this.$store.state.user.completed||this.$store.state.user.completed.indexOf(this.hill.id)<0;
	}

},
methods: {
	toggleDetails: function() {
		this.expanded = !this.expanded;
	},
	toggleComplete: function(){
		this.$store.commit("toggleComplete",this.hill.id)
	}
},
template: `
		<div class="card is-fullwidth">
			<header class="card-header">
				<p class="card-header-title">{{hill.name}} - {{hill.city}}</p>
				<a v-if="$store.state.loggedIn" :class="{'card-header-icon':true, 'incomplete':notDone}" @click="toggleComplete">
				<i v-if="$store.state.loggedIn" class="fa fa-check-circle"></i>
				</a>
				<a class="card-header-icon card-toggle" style="color:#000000">
					<i class="fa fa-angle-down" aria-hidden="true" @click="toggleDetails"></i>
				</a>
			</header>
			<div class="card-content" v-show="expanded">
				<div class="content is-size-7">

						<span class="has-text-weight-bold ">Location:</span> <a :href="hillLink">{{hill.coordinates.lat}},{{hill.coordinates.long}}</a>
<br/>
					<span class="has-text-weight-bold">Description:</span><br/>
					{{hill.description}}
				</div>
			</div>
		</div>

`
});
