var myGroups = {
  data:function(){
    return {
      createOpen:false,
      newGroupName:"",
      newReqPerm:false
    }
  },
  methods:{
    openGroup:function(){

    },
    toggleCreateGroup: function(){
      this.createOpen=!this.createOpen;
    },
    createGroup: function() {
      let g = {
        name: this.newGroupName,
        active: true,
        reqPerm: this.newReqPerm,
        owner: {
          id:firebase.auth().currentUser.uid,
          name:firebase.auth().currentUser.displayName
        }
      }
      this.$store.commit("createGroup",g);
      this.newGroupName="";
      this.newReqPerm=false;
      this.createOpen=false;
    }
  },
  template:`
  <div>
		<div class="card is-fullwidth">
			<header class="card-header hill-list-header">
				<p class="card-header-title">My Groups</p>
        <div v-if="$store.state.loggedIn" class="card-header-icon"  >
          <router-link to="/joingroup" class="button is-dark" style="background-color:#704830">
            Join
          </router-link>
        </div>
				<div v-if="$store.state.loggedIn" class="card-header-icon"  >
          <a class="navbar-item button is-dark" @click="toggleCreateGroup"  style="background-color:#704830">
            Create
          </a>
        </div>
			</header>
    </div>
<div class="card is-fullwidth">
<groupListItem v-for="group in this.$store.state.myGroupDetails" :group="group"></groupListItem>
</div>



  <div :class="{'modal':true,'is-active':this.createOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div style="width:100%;background-color:white;padding:10px;">
        <div class="field">
          <label class="label">Group Name</label>
          <div class="control">
            <input v-model="newGroupName" class="input" type="text" placeholder="Enter a group name">
          </div>
          <p v-if="!newGroupName" class="help is-danger">Group Name is required</p>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
            <input type="checkbox" v-model="newReqPerm">
            New members require approval
            </label>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button :disabled="!newGroupName" class="button is-link" @click="createGroup">Create</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="toggleCreateGroup">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="toggleCreateGroup"></button>
  </div>


	</div>
  `
}

Vue.component("myGroups",myGroups);

var groupListItem = {
  props:["group"],
  data:function(){return{}},
  methods:{
    openGroup:function(){
      router.push({ path: `/group/${this.group.id}` })
    }
  },
  template:`
  <header class="card-header"  style="background-color:#ffffd9" @click="openGroup">
  <p class="card-header-title">{{group.name}}</p>
  </header>
  `
}

Vue.component("groupListItem",groupListItem);

var groupStats = {
  mounted: function(){
    if (this.$store.state.myGroupDetails.length==0) {
      db.collection("groups").doc(this.$route.params.groupId).get().then((doc)=>{
        this.group=doc.data();
        this.group.id=doc.id;
      })
    } else {
      this.group=this.$store.state.myGroupDetails.find((g)=>g.id==this.$route.params.groupId);
    }

    db.collection("users").where("groups","array-contains",this.$route.params.groupId).onSnapshot((q)=>{
      this.users=[]
      let tmpUsers = [];
      if (q.docs){
        q.docs.forEach((u)=>{
          tmpUsers.push(u.data());
        })
      }
      tmpUsers.sort(function(a,b){
        let ac = a.completed?a.completed.length:0;
        let bc = b.completed?b.completed.length:0;
        return bc - ac;
      })

      this.users=tmpUsers;
    })

    db.collection("grouprequests").where("groupId","==",this.$route.params.groupId).onSnapshot((query)=>{
      var p=[];
      if (query.docs) {
        query.docs.forEach((doc)=>{
          let data = doc.data();
          if (data.status=="denied") return; //denied
          let approvalDone=(this.group.approved && this.group.approved.indexOf(data.userId)>-1); //already approved

          db.collection("users").doc(data.userId).get().then((userDoc)=>{
            p.push({id:data.userId,name:userDoc.data().name,status:data.status,requestId:doc.id});
          })
        })
      }
      this.pending=p;

    })

  },
  data:function(){
    return {
      group:{
        name:" ",
        owner:{}
      },
      users:[],
      pending:[],
      leavingGroup:false
    };
  },
  methods:{
    confirmLeave:function(){
      this.leavingGroup=true;
    },
    leaveGroup:function(){
      this.$store.commit("leaveGroup",this.group.id);
      this.leavingGroup=false;
      this.$router.replace({path:"/mygroups"})
    },
    approveUser:function(reqId){
      db.collection("grouprequests").doc(reqId).set({
        status:"approved"
      },{ merge: true });
    },
    denyUser:function(userId,reqId){
      db.collection("grouprequests").doc(reqId).set({
        status:"denied"
      },{ merge: true }).then((ref)=>{
        this.pending=this.pending.filter((p)=>{
          p.userId!=userId;
        })
      });

    }
  },
  computed:{
    pendingRequests:function(){return this.pending},
    isOwner:function(){
      return this.group.reqPerm&&this.group.owner.id==this.$store.state.user.id;
    }
  },
  template:`
  <div>
		<div class="card is-fullwidth">
			<header class="card-header hill-list-header">
				<p class="card-header-title">{{group.name}}</p>
        <div class="card-header-icon">
        <a class="navbar-item button is-dark" v-if="!isOwner" @click="leavingGroup=true"  style="background-color:#704830">Leave</a>
        </div>
			</header>
    </div>
    <div v-if="isOwner" class="card is-fullwidth" v-for="puser in pending">
    <header class="card-header">
      <p class="card-header-title">{{puser.name}} (pending) <span v-if="puser.status=='approved'"> - waiting for user</span></p>
      <div class="card-header-icon" v-if="puser.status!='approved'">
      <a @click="approveUser(puser.requestId)" style="color:#2FB70A"><i class="fas fa-check"></i>
      </div>
      <div class="card-header-icon" v-if="puser.status!='denied'">
      <a @click="denyUser(puser.id,puser.requestId)" style="color:red"><i class="fas fa-ban"></a>
      </div>

    </header>
    </div>
    <div class="card is-fullwidth" v-for="user in users">
    <header class="card-header">
      <p class="card-header-title">{{user.name}}</p>
      <div class="card-header-icon">{{user.completed?user.completed.length:0}}</div>
    </header>
    </div>

    <div :class="{'modal':true,'is-active':leavingGroup}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Leave Group</p>
          <button class="delete" aria-label="close" @click="leavingGroup=false"></button>
        </header>
        <section class="modal-card-body">
          Are you sure you want to leave {{group.name}}?
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="leaveGroup">Leave</button>
          <button class="button" @click="leavingGroup=false">Cancel</button>
        </footer>
      </div>
    </div>



</div>
  `
}

Vue.component("groupStats",groupStats);
