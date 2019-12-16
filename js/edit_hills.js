


var editHills = {
	computed:{
		hills: function() {
			return this.$store.state.hills;
		}
	},
	template:`
	<div style="padding-top:52px">
	<editHill v-for="hill in hills" :hill="hill" :key="hill.id"></editHill>
	</div>

	`

}

var editHill = {
	props:["hill"],
	computed:{


	},
	methods: {
		save:function(){
			this.$store.commit("saveHill",this.hill);
		}
	},
	data:function(){
		return {}
	},
	template:`
	<div style="border:2px solid black; padding: 5px">
	Name: <input v-model="hill.name"/>
<br/>	City: <input v-model="hill.city"/>
	<br/>Latitude: <input v-model="hill.coordinates.lat"/>
	<br/>Longitude: <input v-model="hill.coordinates.long"/>
	<br/>Neighborhood ID: <input v-model="hill.neighborhood"/>
	<br/>Elevation: <input v-model="hill.elevation"/>
	<br/>Distance: <input v-model="hill.distance"/>
	<br/>Description:<br/><textarea rows="3" style="width:100%" v-model="hill.description"></textarea>
	<br/><button @click="save">Save</button>
	</div>
	`
}

Vue.component("editHill",editHill);
