let links = [
    {
        id: 0,
        title: "📢 Promulgate New Edict",
        url: "#",
        secure: 0
    },
    {
        id: 0,
        title: "👪 Your Citizens",
        url: "#",
        secure: 0
    },
    {
        id: 0,
        title: "👑 Your Leaders",
        url: "#",
        secure: 0
    },
    {
        id: 0,
        title: "📜 Unified Edict Stream",
        url: "#",
        secure: 0
    },
    {
        id: 1,
        title: "🚀 Personal Edict Stream",
        url: "#",
        secure: 0
    },
    {
        id: 2,
        title: "🏛️ Edict Stream by Politics",
        url: "#",
        secure: 0
    },
    {
        id: 3,
        title: "🎺 Edict Stream by Music",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "📀 Edict Stream by Movies",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🌐 The Grid Game",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "⚙️ Administration",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "👾 About",
        url: "#",
        secure: 0
    }
]

let menu = []

links.forEach( link => {
    menu.push(`<li class="menu-item"><a href="javascript:show('${link.url}', 
    ${link.id}, ${link.secure});">${link.title}</a></li>`)
})

document.querySelector('#menu').innerHTML = menu.join("")
// document.querySelector('#menu').innerHTML = "<a href='https://bing.com'>hello there!</a>"


