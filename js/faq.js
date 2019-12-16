var faq = {
  template:`
  <div class="faq">
  <h1 style="font-size:1.5em;font-weight:bold">FAQ</h1>
<p style="margin-bottom:1em">
  <b>-I'm confused! How do I do these?!</b>
  <br/>Go to the GPS point provided on the website.  This should be the base of the hill.  Run that hill.  Some hills have directions on what turns to take.  Those are provided in the hill description.
</p>
<p style="margin-bottom:1em">
  <b>-How do I track what hills I've done?</b>
  <br/>You can record the hills you've done on this site. <a href="#/login">Log in</a> and click the checbox next to the completed hill on the <a href="#/hilllist">hills</a> screen.
</p>
<p style="margin-bottom:1em">
  <b>-Hey! There is a great hill not on there! What gives?!</b>
  <br/>Hey! There are going to be a lot of hills not on this list.  These 100 aren't a comprehensive list, it's just 100 Hills we liked.  Have one you think should be on there? Message the team on Instagram and tell us about it. We will review it and maybe add it to our VIH list that will become available after you complete all 100 Hills.
</p>
<p style="margin-bottom:1em">
  <b>-Where the hell is the Leaderboard?!</b>
  <br/>This is not a race. As such, there is no leaderboard you competitive jerk.  Feel free to challenge your friends using the <a href="#/mygroups">Group</a> creation tool to get the bragging rights you so desire.
</p>
<p style="margin-bottom:1em">
  <b>-How do I get my patch?</b>
  <br/>Message the team on Instagram when you have done them all, or let us know when you're about to complete your 100th Hill and we my even meet you there to hand it off in person.
</p>
<p style="margin-bottom:1em">
  <b>-How do you know if someone actually conquered all 100 Hills?</b>
  <br/>We don't.  If someone wants to lie to get a free patch, then they are only cheating themselves.
  </p>
  </div>
  `
}

Vue.component("faq",faq);
