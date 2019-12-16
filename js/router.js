var routes = [
	{path: "/hilllist", component:neighborlist},
	{path: "/map", component: wholeMap },
	{path: "/about", component: about},
	{path: "/privacy", component: privacy},
	{path: "/tos", component: tos},
	{path: "/login", component: login},
	{path: "/editHills", component: editHills},
	{path: "/mygroups", component:myGroups},
	{path: "/group/:groupId", component:groupStats},
	{path: "/joingroup",component:joinGroup},
	{path: "/faq",component:faq},
	{path: "/contribute",component:contribute},
	{path: "/",redirect: "/hilllist"}
]
const router = new VueRouter({
  routes
})
