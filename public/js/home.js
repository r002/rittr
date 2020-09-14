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
        "user_id": user_id,
        "otp": otp,
        "content": content
    }

    let res = await fetch(`/v1/user/${user_id}/edict?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    // console.log("fetch returned: ", rs)

    if(1==rs.status) {
        document.querySelector('#flash-header')
        .innerHTML = `<strong>Edict promulgated! Good job!</strong>`
        // show_edicts()  // Refresh edicts list on 'dash' view.
    } else {
        document.querySelector('#flash-header')
        .innerHTML = `Error occurred: <strong>${rs.errMsg}</strong>`
    }
}

/////////////////////////////////////////////////////////////////////////////

// execute = (command, window_id) => {
//     command(window_id)
// }

show_window = window_id => {
    document.querySelector(`#${window_id}`).setAttribute('style','display: block');
    document.querySelector(`#bg-fade`).setAttribute('style','display: block');
}

close_window = window_id => {
    document.querySelector(`#${window_id}`).setAttribute('style','display: none');
    document.querySelector(`#bg-fade`).setAttribute('style','display: none');
}

let links = [
    {
        id: "promulgation-box",
        title: "📢 Promulgate New Edict",
        command: "show_window",
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
               <a href="javascript:${link.command}('${link.id}');">
               ${link.title}</a></li>`)
})

document.querySelector('#menu').innerHTML = menu.join("")

/////////////////////////////////////////////////////////////////////////

// let edicts = [
//     {
//         id: "1",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Sat - Aug 29, 2020",
//         category: "politics",
//         type: "text",
//         content: "We must change our priorities. Add your name to say you support a 10% cut in annual Pentagon spending to allow for investments in jobs, education, health care and poverty reduction in America’s most vulnerable communities."
//     },
//     {
//         id: "2",
//         name: "🪕 Taylor Swift",
//         handle: "@taylorswift13",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "music",
//         type: "text",
//         content: "In isolation my imagination has run wild and this album is the result. I’ve told these stories to the best of my ability with all the love, wonder, and whimsy they deserve. Now it’s up to you to pass them down. folklore is out now: https://taylor.lnk.to/folklore"
//     },
//     {
//         id: "3",
//         name: "🪕 Taylor Swift",
//         handle: "@taylorswift13",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "music",
//         type: "media",
//         content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/8xg3vE8Ie_E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
//     },
//     {
//         id: "4",
//         name: "💪🏽 Dwayne Johnson",
//         handle: "@TheRock",
//         url: "#",
//         dt: "Fri - Aug 21, 2020",
//         category: "movies",
//         type: "text",
//         content: 
//         `The hierarchy of power in the DC UNIVERSE is about to change. BLACK ADAM arrives TOMORROW at #DCFanDome. He's coming to crush them all.
//         <br /><br />
//         @DCSuperman, watch out!`
//     },
//     {
//         id: "5",
//         name: "💪🏽 Dwayne Johnson",
//         handle: "@TheRock",
//         url: "#",
//         dt: "Fri - Aug 21, 2020",
//         category: "movies",
//         type: "media",
//         content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/ngtfQSDqin0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
//     },
//     {
//         id: "6",
//         name: "💪🏽 Dwayne Johnson",
//         handle: "@TheRock",
//         url: "#",
//         dt: "Fri - Aug 21, 2020",
//         category: "movies",
//         type: "media",
//         content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/rvrZJ5C_Nwg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
//     },
//     {
//         id: "7",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Sat - Aug 29, 2020",
//         category: "politics",
//         type: "image",
//         content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/Egl5oFhXgAEUOaj?format=jpg&name=small');"></div>`
//     },
//     {
//         id: "8",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Sun - Aug 2, 2020",
//         category: "politics",
//         type: "text",
//         content: `And the very rich get much richer. Over half of American households have lost income during the pandemic, while 491 billionaires have increased their wealth by $743 billion. This is obscene. We need an economy that works for all, not a rigged economy for the wealthy and powerful.`
//     },
//     {
//         id: "9",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Thu - Jul 2, 2020",
//         category: "politics",
//         type: "text",
//         content: `The business model of the pharmaceutical industry is unfettered greed.
//         <br /><br />
//         This is not the time for corporate profiteering of off death and suffering.
//         <br /><br />
//         We must guarantee that coronavirus treatments and vaccines are free to all Americans.`
//     },
//     {
//         id: "10",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Wed - Jul 29, 2020",
//         category: "politics",
//         type: "text",
//         content: `The very, very rich are getting much richer during the pandemic:
//         <br /><br />
//         ⬆️$73 billion: Jeff Bezos<br />
//         ⬆️$45 billion: Elon Musk<br />
//         ⬆️$31 billion: Mark Zuckerberg<br />
//         ⬆️$28 billion: Bill Gates<br />
//         ⬆️$19 billion: L Page<br />
//         ⬆️$19 billion: Sergey Brin`
//     },
//     {
//         id: "11",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Wed - Jul 29, 2020",
//         category: "politics",
//         type: "text",
//         content: `Donald Trump has shown that he can’t beat the pandemic or turn the economy around. And he is unsurprisingly stoking the flames of division for political gain.<br /><br />He is the worst possible person to lead our nation through this moment.`
//     },
//     {
//         id: "12",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Tue - Jul 28, 2020",
//         category: "politics",
//         type: "text",
//         content: `Our students and educators deserve better than four more years of Betsy DeVos. It’s time for a Secretary of Education who is actually a public school educator.`
//     },
//     {
//         id: "13",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "politics",
//         type: "text",
//         content: `Home care workers and child care workers — who are more often women, women of color, and immigrants — have been underpaid, unseen, and undervalued for far too long.`
//     },
//     {
//         id: "14",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Sat - Aug 1, 2020",
//         category: "music",
//         type: "media",
//         content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/GI6CfKcMhjY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
//     },
//     {
//         id: "15",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Sat - Aug 1, 2020",
//         category: "politics",
//         type: "text",
//         content: `Enhanced unemployment benefits expired for millions overnight.<br /><br />We don’t have an effective nationwide testing program or a plan to control the virus.<br /><br />Our health care workers still don’t have enough PPE. Enough with the weekend golf trips, Mr. President. Do your job.`
//     },
//     {
//         id: "16",
//         name: "🦖 Joe Biden",
//         handle: "@JoeBiden",
//         url: "#",
//         dt: "Sun - Aug 2, 2020",
//         category: "politics",
//         type: "text",
//         content: `Now more than ever, we need a president who believes in science.`
//     },
//     {
//         id: "17",
//         name: "🪕 Taylor Swift",
//         handle: "@taylorswift13",
//         url: "#",
//         dt: "Thu - Jul 2, 2020",
//         category: "politics",
//         type: "media",
//         content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/fWNaR-rxAic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
//     },
//     {
//         id: "18",
//         name: "🦕 Bernie Sanders",
//         handle: "@BernieSanders",
//         url: "#",
//         dt: "Sat - Aug 29, 2020",
//         category: "politics",
//         type: "image",
//         content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/EgW82PVXsAEVA60?format=jpg&name=small');"></div>`
//     },
//     {
//         id: "19",
//         name: "💪🏽 Dwayne Johnson",
//         handle: "@TheRock",
//         url: "#",
//         dt: "Sat - Aug 29, 2020",
//         category: "sports",
//         type: "image",
//         content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/Ef9Q50AU8AAyxB7?format=jpg&name=small');"></div>`
//     },
//     {
//         id: "20",
//         name: "🪕 Taylor Swift",
//         handle: "@taylorswift13",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "music",
//         type: "image",
//         content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/EeCsCf4WAAEwrL4?format=jpg&name=medium');"></div>`
//     },
//     {
//         id: "21",
//         name: "🪕 Taylor Swift",
//         handle: "@taylorswift13",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "music",
//         type: "image",
//         content: `<div class="image" style="background-image: url('https://pbs.twimg.com/media/Ed_EN4kWoAEIlzm?format=jpg&name=small');"></div>`
//     },
//     {
//         id: "22",
//         name: "👑 Donald Trump",
//         handle: "@realDonaldTrump",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "politics",
//         type: "text",
//         content: `Big China Virus breakouts all over the World, including nations which were thought to have done a great job. The Fake News doesn’t report this. USA will be stronger than ever before, and soon!`
//     },
//     {
//         id: "23",
//         name: "👑 Donald Trump",
//         handle: "@realDonaldTrump",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "politics",
//         type: "text",
//         content: `MAKE AMERICA GREAT AGAIN!`
//     },
//     {
//         id: "24",
//         name: "👑 Donald Trump",
//         handle: "@realDonaldTrump",
//         url: "#",
//         dt: "Aug 30, 2020",
//         category: "politics",
//         type: "text",
//         content: `Just had a wonderful conversation with my friend, Prime Minister @AbeShinzo of Japan, who will be leaving office soon. Shinzo will soon be recognized as the greatest Prime Minister in the history of Japan, whose relationship with the USA is the best it has ever been. Special man!`
//     },
//     {
//         id: "25",
//         name: "👑 Donald Trump",
//         handle: "@realDonaldTrump",
//         url: "#",
//         dt: "Fri - Jul 24, 2020",
//         category: "politics",
//         type: "text",
//         content: `When is Slow Joe Biden going to criticize the Anarchists, Thugs & Agitators in ANTIFA? When is he going to suggest bringing up the National Guard in BADLY RUN & Crime Infested Democrat Cities & States? Remember, he can’t lose the Crazy Bernie Super Liberal vote!`
//     },
// ]

f_dt = datetime => {
    let d = Date.parse(datetime)  // "2020-08-02T17:32:00.000Z" => 1596389520000
    d = new Date(d)
    const weekday = d.toLocaleString("default", { weekday: "short" })
    const day = d.getDate()
    const month = d.toLocaleString('default', { month: 'short' })
    // const year = d.getFullYear()
    // return `${weekday} - ${month} ${day}, ${year}`
    return `${weekday} - ${month} ${day}`
}

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
                        <span class="edict-datetime">
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
    
    let s = `<div class="edicts-wrapper">${cards.join("")}</div>`
    document.querySelector('#edicts').innerHTML = s
}

///////////////////////////////////////////////////////////

initialload_edictstream()


// Temp dev

show_window("promulgation-box")
