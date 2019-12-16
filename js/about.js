var about = {
	template:`
<div class="about">
<h1 style="font-size:1.5em;font-weight:bold">About the 100 Hills Challenge</h1>
<p style="margin-bottom:1em">
The bright minds and toned legs of <b>The MidCoast Collective</b> have identified 100 exceptional hills in the Quad Cities River Valley Range.
</p>
<p style="margin-bottom:1em">
Conquer them all on foot or bike and earn your "100 Hills Club" patch.
</p>
<p style="margin-bottom:1em">
Conquer them once.<br/>  Make a workout of it.<br/> Compete against friends.<br/> It doesn't matter how quickly you ascend them. Just get them done.
</p>
<p style="margin-bottom:1em">
<router-link  to="/login" style="color:white;text-decoration:underline">
	<b>Log in</b>
</router-link>
 and get to work!
</p>
Follow us on Instagram <a style="color:white;text-decoration:underline" href="https://www.instagram.com/100hillsclub"><b>@100hillsclub</b></a> to see information about the hills; pics from the top; and other insights and announcements from the team!
</div>
`}

Vue.component("about",about)
