var joinGroup = {
  mounted:function(){
    if (this.$store.state.allGroups&&this.$store.state.allGroups.length<1) {
      this.$store.commit("loadGroups");
    }
  },
  data: function(){
    return {
      search:"",
      filtered:[]
    }
  },
  methods:{
    filterGroups:function(){
      if (this.search && this.search.length>2 && this.$store.state.allGroups){
        this.filtered=this.$store.state.allGroups.filter((g)=>g.searchName.indexOf(this.search.toUpperCase())>-1);
      }
    }
  },
  computed:{
    filteredGroups:function(){
      if (this.search && this.search.length>2 && this.$store.state.allGroups){
        return this.$store.state.allGroups.filter((g)=>g.searchName.indexOf(this.search.toUpperCase())>-1);
      } else {
        return [];
      }
    }
  },
  template: `
  <div>
		<div class="card is-fullwidth">
			<header class="card-header hill-list-header">
				<p class="card-header-title">Join a Group</p>
			</header>
    </div>
    <div class="card is-fullwidth">
			<header class="card-header hill-list-header">
        <input v-model="search" class="input" type="text" placeholder="Search for a group to join">
			</header>
    </div>
    <joinGroupItem v-for="group in filteredGroups" :group="group"></joinGroupItem>
  </div>
  `
}

Vue.component("joinGroup",joinGroup)

var joinGroupItem = {
  props:["group"],
  data: function(){
    return {}
  },
  methods: {
    joinGroup:function(){
      this.$store.commit("joinGroup",this.group);
    }
  },
  computed:{
    inGroup:function(){
      return this.$store.state.user.groups && this.$store.state.user.groups.indexOf(this.group.id)>-1;
    },
    pending:function(){
      return this.$store.state.pendingRequests && this.$store.state.pendingRequests.indexOf(this.group.id)>-1;
    }
  },
  template:`
  <div class="card is-fullwidth">
  <header class="card-header">
    <p class="card-header-title">{{group.name}}<br/>({{group.owner.name}})</p>
    <div v-if="$store.state.loggedIn && !inGroup && !pending" class="card-header-icon"  >
      <a class="navbar-item button is-outlined" @click="joinGroup">
        Join
      </a>
    </div>
    <div v-if="$store.state.loggedIn && inGroup" class="card-header-icon"  >
      <p>In Group</p>
    </div>
    <div v-if="$store.state.loggedIn && pending" class="card-header-icon"  >
      <p>Pending</p>
    </div>
  </header>
</div>
  `
}
Vue.component("joinGroupItem",joinGroupItem);
