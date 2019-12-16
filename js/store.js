const store = new Vuex.Store({
  state: {
    neighborhoods: [],
    hills: [],
    loggedIn: false,
    user:{},
    myGroupDetails:[],
    allGroups:[],
    pendingRequests:[]
  },


  mutations: {
    toggleComplete: function(state,hillId){
      if (state.user.completed&&state.user.completed.indexOf(hillId)>-1){
        //remove it
        state.user.completed.splice(state.user.completed.indexOf(hillId),1);
      } else {
        //add it
        state.user.completed.push(hillId);

      }
      //persist
      db.collection("users").doc(firebase.auth().currentUser.uid).set(
        {
          completed:state.user.completed
        },{ merge: true }
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
    loadGroups : function(state){
      db.collection("groups").orderBy("name","asc").onSnapshot(function(querySnapshot) {
        var groups=[];
        querySnapshot.forEach(function(doc) {
            groups.push({...doc.data(),id:doc.id,searchName:doc.data().name.toUpperCase()});
        });
        state.allGroups=groups;
      });
    },
    leaveGroup:function(state,gid){
        state.user.groups.splice(state.user.groups.indexOf(gid),1);
        db.collection("users").doc(firebase.auth().currentUser.uid).set(
          {groups:state.user.groups},{ merge: true }
        ).then((ref)=>{

        })
    },

    joinGroup: function(state,group){
      if (group.reqPerm) {
        db.collection("grouprequests").add({
          userId: firebase.auth().currentUser.uid,
          groupId: group.id,
          status: "pending"
        }).then(function(ref){
          state.pendingRequests.push(group.id);
        })
      } else {
        state.user.groups.push(group.id)
        state.myGroupDetails.push(group)
        db.collection("users").doc(firebase.auth().currentUser.uid).set(
          {groups:state.user.groups},{ merge: true }
        )
      }
    },
    login : function(state,uid){
      state.loggedIn=true;
      db.collection("users").doc(uid).onSnapshot(function(doc){
        if (doc && doc.data()) {
          state.user = doc.data();
          state.user.completed = doc.data().completed || [];
          state.user.groups = doc.data().groups || [];
          state.user.id=doc.id;

          db.collection("groups").orderBy("name").onSnapshot(function(querySnapshot){
            var mygroups = [];
            querySnapshot.forEach(function(doc) {
                if (state.user.groups.indexOf(doc.id)>-1){
                  mygroups.push({...doc.data(),id:doc.id});
                }

            });
            state.myGroupDetails=mygroups;
            //Sort out requests
            db.collection("grouprequests").where("userId","==",uid).get().then(function(snapshot){
              snapshot.forEach(function(rd){
                let req = rd.data();

                if (req.status=="approved") {
                  db.collection("groups").doc(req.groupId).get().then(function(g){
                    let gd=g.data();
                    gd.id=g.id;
                    //put in group
                    state.user.groups.push(gd.id)
                    state.myGroupDetails.push(gd)
                    db.collection("users").doc(uid).set(
                      {groups:state.user.groups},{ merge: true }
                    ).then(function(ref){
                      state.pendingRequests.splice(state.pendingRequests.indexOf(gd.id),1);
                    })
                    db.collection("grouprequests").doc(rd.id).delete();

                  })
                } else if (req.status=="denied") {
                  //Remove the request
                  db.collection("grouprequests").doc(rd.id).delete().then(function(ref){
                    state.pendingRequests.splice(state.pendingRequests.indexOf(req.groupId),1);
                  });
                } else {
                  state.pendingRequests.push(req.gropuId);
                }


              })
            })




          })
        } else {
          let u = {
            id: uid,
            name: firebase.auth().currentUser.displayName,
          }
          db.collection("users").doc(uid).set(u);
        }
      })

    },
    logout : function(state){
      state.loggedIn=false;
      state.user={};
      firebase.auth().signOut();
    },
    saveHill: function(state,hill) {
      db.collection("hill").doc(hill.id.toString()).set(hill);
    },
    createGroup: function(state,group) {
      //db.collection('cities').doc('BJ').set({capital: true}, { merge: true });
      db.collection('groups').add(group).then(function(ref){
        state.user.groups.push(ref.id);
        db.collection("users").doc(firebase.auth().currentUser.uid).set(
          {
            groups:state.user.groups
          },{ merge: true }
        )
      });
      //Put the owner in the group
    }
  }


})
