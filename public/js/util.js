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

f_dt_detailed = datetime => {
    let d = Date.parse(datetime)  // "2020-08-02T17:32:00.000Z" => 1596389520000
    d = new Date(d)
    const weekday = d.toLocaleString("default", { weekday: "short" })
    const day = d.getDate()
    const month = d.toLocaleString('default', { month: 'short' })
    const year = d.getFullYear()
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")
    return `${weekday} - ${month} ${day}, ${year} - ${hours}:${minutes} ${zone}`
}