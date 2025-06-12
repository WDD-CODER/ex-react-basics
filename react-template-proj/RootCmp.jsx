import { AnimalList } from './cmps/animal-app-cmps/AnimalList.jsx'
import { SeasonalClock } from './cmps/seasonal-clock-cmp/SeasonalClock.jsx'
import { CountDown } from './cmps/count-down-cmp/CountDown.jsx'
import { WatcherAppIndex } from './cmps/watcher-app-cmps/WatcherAppIndex.jsx'
import { MouseMonitorIndex } from './cmps/mouse-monitor-app-cmp/MouseMonitorIndex.jsx'

export function RootCmp() {
    const animalInfos = [
        { type: 'Malayan Tiger', count: 787 },
        { type: 'Mountain Gorilla', count: 212 },
        { type: 'Fin Whale', count: 28 },
    ]

    return (
        <div className='main-root-layout'>
            <AnimalList animalInfos={animalInfos} />
            <SeasonalClock />
            <CountDown toTime={Date.now() + 1000 * 20} startFrom={10} onDone={() => {
                console.log('Done!')
            }} />
            <WatcherAppIndex />
            <MouseMonitorIndex />
        </div>
    )
}