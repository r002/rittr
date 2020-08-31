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
        title: "🎹 Edict Stream by Music",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🍿 Edict Stream by Movies",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🖼️ Edict Stream by Image",
        url: "#",
        secure: 0
    },
    {
        id: 4,
        title: "💬 Edict Stream by Commentary",
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
        title: "🐙 About",
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

/////////////////////////////////////////////////////////////////////////

let edicts = [
    {
        id: "1",
        name: "🦕 Bernie Sanders",
        handle: "@BernieSanders",
        url: "#",
        dt: "Sat - Aug 29, 2020",
        category: "politics",
        type: "text",
        content: "We must change our priorities. Add your name to say you support a 10% cut in annual Pentagon spending to allow for investments in jobs, education, health care and poverty reduction in America’s most vulnerable communities."
    },
    {
        id: "2",
        name: "🪕 Taylor Swift",
        handle: "@taylorswift13",
        url: "#",
        dt: "Fri - Jul 24, 2020",
        category: "music",
        type: "text",
        content: "In isolation my imagination has run wild and this album is the result. I’ve told these stories to the best of my ability with all the love, wonder, and whimsy they deserve. Now it’s up to you to pass them down. folklore is out now: https://taylor.lnk.to/folklore"
    },
    {
        id: "3",
        name: "🪕 Taylor Swift",
        handle: "@taylorswift13",
        url: "#",
        dt: "Fri - Jul 24, 2020",
        category: "music",
        type: "media",
        content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/8xg3vE8Ie_E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    },
    {
        id: "4",
        name: "💪🏽 Dwayne Johnson",
        handle: "@TheRock",
        url: "#",
        dt: "Fri - Aug 21, 2020",
        category: "movies",
        type: "text",
        content: "The hierarchy of power in the DC UNIVERSE is about to change. BLACK ADAM arrives TOMORROW at #DCFanDome. He's coming to crush them all."
    },
    {
        id: "5",
        name: "💪🏽 Dwayne Johnson",
        handle: "@TheRock",
        url: "#",
        dt: "Fri - Aug 21, 2020",
        category: "movies",
        type: "media",
        content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/ngtfQSDqin0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    },
    {
        id: "6",
        name: "💪🏽 Dwayne Johnson",
        handle: "@TheRock",
        url: "#",
        dt: "Fri - Aug 21, 2020",
        category: "movies",
        type: "media",
        content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/rvrZJ5C_Nwg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    },
    {
        id: "7",
        name: "🦕 Bernie Sanders",
        handle: "@BernieSanders",
        url: "#",
        dt: "Sat - Aug 29, 2020",
        category: "politics",
        type: "image",
        content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/Egl5oFhXgAEUOaj?format=jpg&name=small');">aaa</div>`
    },
]

category_emoji = category => {
    switch(category) {
        case "politics":
            return "🏛️"
        case "music":
            return "🎹"
        case "movies":
            return "🍿"
        // default:
        //   // code block
      }
}

media_emoji = media => {
    switch(media) {
        case "text":
            return "💬"
        case "media":
            return "📀"
        case "image":
            return "🖼️"
        // default:
        //   // code block
      }
}

let i = 1
let cards = []
edicts.forEach( edict => {
    cards.push(`
        <div class="edict-card order${i++}">
            <div class="edict-title">
                <div class="edict-title-left">
                    ${edict.name} &nbsp; <a href="#">${edict.handle}</a>
                </div>
                <div class="edict-title-right">
                    <span class="edict-datetime">
                        <a href="#">${edict.dt}</a>
                    </span>
                    &nbsp;${category_emoji(edict.category)}${media_emoji(edict.type)}
                </div>
            </div>
            <div class="edict-${edict.type}">
                ${edict.content}
            </div>
        </div>`)
})

let s = `<div class="edicts-wrapper">${cards.join("")}</div>`
document.querySelector('#edicts').innerHTML = s


