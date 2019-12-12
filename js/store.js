const store = new Vuex.Store({
  state: {
    neighborhoods: [],
    hills: [],
    completed: [],
    loggedIn: false
  },

  getters: {
    hillsDone: function(state){
      return state.completed||0;
    },
    isDone: (state)=>(hid) => {
      return completed&&completed.indexOf(hid)>-1;
    },
    hoodCount: (state)=>(nid)=> {
      return completed==null?0:
      state.hills.filter(function(hill){
        return hill.neighborhood==nid;
      }).length;
    },
    hoodCompleteCount: (state)=>(nid)=> {
      return completed==null?0:
      state.hills.filter(function(hill){
        return hill.neighborhood==nid && completed.indexOf(hill.id)>-1;
      }).length;
    },
    hoodHills: (state)=>(nid)=>{
      var filtered= state.hills.filter(function(hill){
        return hill.neighborhood==nid;
      })
      return filtered;
    }
  },
  mutations: {
    toggleComplete: function(state,hillId){
      if (state.completed&&state.completed.indexOf(hillId)>-1){
        //remove it
        state.completed.splice(state.completed.indexOf(hillId),1);
      } else {
        //add it
        state.completed.push(hillId);

      }
      //persist
      //
      db.collection("users").doc(firebase.auth().currentUser.uid).set(
        {
          completed:state.completed
        }
      )

    },
    loadNeighborhoods : function(state){


      db.collection("neighborhoods").orderBy("id","asc").onSnapshot(function(querySnapshot) {
        var hoods = [];
        querySnapshot.forEach(function(doc) {
            hoods.push(doc.data());

        });
        state.neighborhoods=hoods;
      });
    },
    loadHills : function(state){
      db.collection("hill").orderBy("id","asc").onSnapshot(function(querySnapshot) {
        var chgHills=[];
        querySnapshot.forEach(function(doc) {
            chgHills.push(doc.data());
        });
        chgHills.sort(
        	function compareCoordinates(a,b){
        		let aLong = parseFloat(a.coordinates.long);
        		let bLong = parseFloat(b.coordinates.long);
        		return aLong - bLong;
        	}
        );
        state.hills=chgHills;
      });
    },
    login : function(state,uid){
      state.loggedIn=true;
      db.collection("users").doc(uid).get().then(function(doc){
        if (doc) {
          state.completed = doc.data().completed || [];
        }
      })
    },
    logout : function(state){
      state.loggedIn=false;
      state.completed=[];
      firebase.auth().signOut();
    },
    saveHill: function(state,hill) {
      db.collection("hill").doc(hill.id.toString()).set(hill);
    }
  }


})
