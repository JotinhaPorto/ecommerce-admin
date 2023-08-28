export default function formatDate(date: Date) {


    let day = date.getDate()
    let month = (date.getMonth() + 1)
    let year = date.getFullYear()
    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${addZeroToDate(year)}`
    // Dia, Mês e ano

}

const addZeroToDate = (n: number) => n < 10 ? `0${n}` : `${n}` 