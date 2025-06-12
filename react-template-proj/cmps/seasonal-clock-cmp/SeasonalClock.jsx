import { utilService } from '../../services/util.service.js'

const { useState, useEffect } = React;

export function SeasonalClock() {

    const [date, setDate] = useState(new Date());
    const [isDark, setIsDark] = useState(false);

    let season = getSeason()
    let day = utilService.getDayName(date)


    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000);

        return () => clearInterval(intervalId)

    }, []
    );

    function getSeason() {
        const month = date.getMonth()
        if (month > 1 && month < 5) return 'spring'
        if (month > 4 && month < 8) return 'summer'
        if (month > 8 && month < 11) return 'autumn'
        else return 'winter'
    }


    function onToggleDarkMode() {
        setIsDark(isDark => !isDark)
    }

    const darkClass = isDark ? '' : 'dark'
    const month = utilService.getMonthName(date)

    return (
        <section onClick={onToggleDarkMode} className={`season-clock-container ${darkClass}`}>
            <h1>{month} ({season})</h1>
            <div className={`season-icon ${season}`}></div>
            <h2>{day}</h2>
            <div>{date.toLocaleTimeString()}</div>
        </section>
    )
}