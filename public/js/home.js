/*
========
home.js

Backs 'home.ejs'.
========
*/

initialize_pipeline("normal")

/////////////////////////////////////////////////////////////////////////////

promulgate = async _ => {
    let content = document.querySelector('#edict-content').value
    // console.log("#edict-content:", edict-content)

    let req = {
        user_id: user_id,
        otp: otp,
        content: content,
        category_id: 1,         // Temp-- eventually populate from the GUI. 9/16/20
        medium_id: 1,           // Temp-- eventually populate from the GUI. 9/16/20
        ref: "https://bing.com" // Temp-- eventually populate from the GUI. 9/16/20
    }

    let res = await fetch(`/v1/user/${user_id}/edict?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    console.log(">> promulgatation returned: ", rs)

    if(1==rs.status) {
        let dt = f_dt_detailed(rs.created_on)
        document.querySelector('#flash-header')
        .innerHTML = `<strong>Edict #${rs.edict_id} promulgated! ${dt}</strong>`

        get_personal_edicts()  // Refresh personal edicts on RHS sidebar.
    } else {
        document.querySelector('#flash-header')
        .innerHTML = `Error occurred: <strong>${rs.errMsg}</strong>`
    }
}

/////////////////////////////////////////////////////////////////////////////

let links = [
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

let menu = []

links.forEach( link => {
    menu.push(`<li class="menu-item">
               <a href="javascript:${link.command};">
               ${link.title}</a></li>`)
})

document.querySelector('#menu').innerHTML = menu.join("")

category_emoji = category => {
    switch(category.toLowerCase()) {
        case "politics":
            return "🏛️"
        case "music":
            return "🎹"
        case "movies":
            return "🍿"
        case "sports":
            return "🏈"
        // default:
        //   // code block
      }
}

media_emoji = media => {
    switch(media) {
        case "text":
            return "💬"
        case "av":
            return "📀"
        case "image":
            return "🖼️"
        // default:
        //   // code block
      }
}

render_content = (medium, content) => {
    switch(medium) {
        case "text":
            return content
        case "av":
            return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${content}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        case "image":
            return `<div class="image" style="background-image: url('${content}');"></div>`
    }

}

// Initial load the data for this user's EdictStream
initialload_edictstream = async _ => {
    let res = await fetch(`/v1/user/${user_id}/edictstream?otp=${otp}`)
    let rs = await res.json()

    let cards = []
    rs.edictstream.forEach( edict => {
        cards.push(`
            <div class="edict-card">
                <div class="edict-title">
                    <div class="edict-title-left">
                        ${edict.name} &nbsp; <a href="#">@${edict.sovereignty}</a>
                    </div>
                    <div class="edict-title-right">
                        <span class="edict-datetime" title="${f_dt_detailed(edict.created_on)}">
                            <a href="#">${f_dt(edict.created_on)}</a>
                        </span>
                        &nbsp;${category_emoji(edict.category)}${media_emoji(edict.medium)}
                    </div>
                </div>
                <div class="edict-${edict.medium} edict-grid-card">
                    ${render_content(edict.medium, edict.content)}
                </div>
            </div>`)
    })
    
    let s = `<div class="edicts-wrapper">${cards.join("")}</div>`
    document.querySelector('#edicts').innerHTML = s
}

// Gets the most recent ten edicts this user has promulgated.
get_personal_edicts = async _ => {
    let res = await fetch(`/v1/user/${user_id}/edicts?otp=${otp}`)
    let rs = await res.json()
    // console.log("$$$ rs", rs)

    let cards = []
    cards.push(`<div class="title-bar-shadow"><a href="#">🚀 Personal Edict Stream</a></div>`)
    rs.edicts.forEach( edict => {
        cards.push(`
            <div class="edict-card">
                <div class="edict-title">
                    <div class="edict-title-left">
                        ${edict.name} &nbsp; <a href="#">@${edict.sovereignty}</a>
                    </div>
                    <div class="edict-title-right">
                        <span class="edict-datetime" title="${f_dt_detailed(edict.created_on)}">
                            <a href="#">${f_dt(edict.created_on)}</a>
                        </span>
                        &nbsp;${category_emoji(edict.category)}${media_emoji(edict.medium)}
                    </div>
                </div>
                <div class="edict-${edict.medium}">
                    ${render_content(edict.medium, edict.content)}
                </div>
            </div>`)
    })

    // let s = `${cards.join("")}`
    document.querySelector('#personal-edicts-box').innerHTML = cards.join("")
}

///////////////////////////////////////////////////////////

initialload_edictstream()


// execute = (command, window_id) => {
//     command(window_id)
// }

let scenes = {
    promulgation_scene: {
        title: "promulgation_scene",
        windows: ["promulgation-box", "personal-edicts-box"]
    }
}

show_scene = scene => {
    document.querySelector(`#bg-fade`).setAttribute('style', 'display: block')
    document.querySelector(`#${scene.title}`).setAttribute('style', 'display: block')
    
    switch(scene.title) {
        case "promulgation_scene":
            get_personal_edicts()
            break
    }
}

close_scene = scene => {
    document.querySelector(`#bg-fade`).setAttribute('style', 'display: none')
    document.querySelector(`#${scene.title}`).setAttribute('style', 'display: none')
}

// Temp dev
// show_scene(scenes.promulgation_scene)
