import { AnimalList } from './cmps/animalAppCmps/AnimalList.jsx'
import { SeasonalClock } from './cmps/SeasonalClock.jsx'
import { CountDown } from './cmps/CountDown.jsx'
import { WatcherAppIndex } from './cmps/watcherAppCmps/WatcherAppIndex.jsx'
import { MouseMonitorIndex } from './cmps/mouseMonitorApp/MouseMonitorIndex.jsx'

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