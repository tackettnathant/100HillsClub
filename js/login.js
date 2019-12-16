var login = {
	mounted: function(){
		ui.start('#firebaseui-auth-container', uiConfig);
	},
	template: `
<div style="padding-top:60px">
<div id="firebaseui-auth-container"></div>
<div id="login-loader">Loading...</div>
</div>
	`

}
