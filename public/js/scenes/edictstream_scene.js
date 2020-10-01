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
    document.querySelector('#edictstream_scene').innerHTML = s
}