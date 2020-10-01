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