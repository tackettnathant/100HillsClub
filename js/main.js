  //Replace with firebase config
  var firebaseConfig = {
   
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
	var db = firebase.firestore();


	store.commit("loadHills");
	store.commit("loadNeighborhoods");
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		store.commit("login",user.uid);
  }
});
var ui = new firebaseui.auth.AuthUI(firebase.auth());


var app = new Vue({
	router,
	store,
	el: "#app",
	data: {

	},
	computed: {},
	methods: {}

});
