var wholeMap = {
	template: `
	<div>
    <div class="loader is-loading is-active" style="position:absolute;top:50%;height:50px;width:50px;left:42%" id="map-loader"></div>
	<iframe src="https://www.google.com/maps/d/embed?mid=1DVhMvmCrw3RhVletpu4xGZRyFvQHOow5" style="overflow:hidden;height:90vh;width:100%" onload="document.getElementById('map-loader').style.display='none';"></iframe>
	</div>
	`
}
