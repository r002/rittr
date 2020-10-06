/*
========
home.js

Backs 'home.ejs'.
========
*/

initialize_pipeline("normal")

/////////////////////////////////////////////////////////////////////////////

let links_top = [
    {
        id: "promulgation-box",
        title: "📢 Promulgate New Edict",
        command: "show_scene(scenes.promulgation_scene)",
        secure: 0
    },
    {
        id: 0,
        title: "👪 Your Citizens",
        command: "#",
        secure: 0
    },
    {
        id: 0,
        title: "👑 Your Leaders",
        command: "#",
        secure: 0
    },
    {
        id: 0,
        title: "📜 Unified Edict Stream",
        command: "#",
        secure: 0
    },
    {
        id: 1,
        title: "🚀 Personal Edict Stream",
        command: "#",
        secure: 0
    },
    {
        id: 2,
        title: "🏛️ Edicts by Politics",
        command: "#",
        secure: 0
    },
    {
        id: 3,
        title: "🎹 Edicts by Music",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🍿 Edicts by Movies",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🏈 Edicts by Sports",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🖼️ Edicts by Image",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "📀 Edicts by Video",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "💬 Edicts by Commentary",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🌐 The Grid Game",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "👨‍💻 Analyzer",
        command: "show_scene(scenes.analyzer_scene)",
        secure: 0
    },
    {
        id: 4,
        title: "💚 Best of 2020",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🧡 Best of 2019",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "💜 Best of 2018",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "💛 Best of 2017",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "⚙️ Administration",
        command: "#",
        secure: 0
    },
    {
        id: 4,
        title: "🐙 About",
        command: "#",
        secure: 0
    }
]

let links_analyzer = [
    {
        id: "import-data",
        title: "📊 Import Data",
        command: "show_scene(scenes.promulgation_scene)",
        secure: 0
    },
    {
        id: 0,
        title: "👪 Your Citizens",
        command: "#",
        secure: 0
    }
]

render_menu = links => {
    let menu = []
    links.forEach( link => {
        menu.push(`<li class="menu-item">
                   <a href="javascript:${link.command};">
                   ${link.title}</a></li>`)
    })
    document.querySelector('#menu').innerHTML = menu.join("")
}

let scenes = {
    promulgation_scene: {
        title: "promulgation_scene",
        windows: ["promulgation-box", "personal-edicts-box"]
    },
    edictstream_scene: {
        title: "edictstream_scene",
        windows: []
    },
    analyzer_scene: {
        title: "analyzer_scene",
        windows: []
    }
}

show_scene = scene => {
    document.querySelector(`#${scene.title}`).setAttribute('style', 'display: block')
    switch(scene.title) {
        case "promulgation_scene":
            document.querySelector(`#bg-fade`).setAttribute('style', 'display: block')
            get_personal_edicts()
            break
        case "edictstream_scene":
            render_menu(links_top)
            initialload_edictstream()
            break
        case "analyzer_scene":
            close_scene(scenes.edictstream_scene)
            render_menu(links_analyzer)

            // Modify the url... 10/6/20
            history.pushState({}, "", "#analyzer")
            break
    }
}

close_scene = scene => {
    document.querySelector(`#bg-fade`).setAttribute('style', 'display: none')
    document.querySelector(`#${scene.title}`).setAttribute('style', 'display: none')
}

// Auto initial load
show_scene(scenes.edictstream_scene)
