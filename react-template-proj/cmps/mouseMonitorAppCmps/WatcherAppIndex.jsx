import { WatcherAppUserModal } from './WatcherAppUserModal.jsx'
import { WatcherAppInputModal } from './WatcherAppInputModal.jsx'
import { WatcherAppList } from './WatcherAppList.jsx'
import { appService } from '../../services/watcherApp.service.js'

const { useState, useEffect, useRef } = React;

export function WatcherAppIndex() {

    const [watchers, setWatchersArray] = useState([]);
    const [changeWatcher, setChangeWatcher] = useState(false);
    const [isSelectedWatcher, setIsSelectedWatcher] = useState(false);
    const elModal = useRef()

    useEffect(() => {
        if (watchers.length <= 0) loadWatchers()
        if (isSelectedWatcher || changeWatcher) elModal.current.showModal()
    }, [isSelectedWatcher, changeWatcher])

    function loadWatchers() {
        appService.query()
            .then(res => setWatchersArray(res))
            .catch(err => console.log('problem fetching watchers from service', err))
    }

    function onRemoveWatcher(watcherId) {
        appService.remove(watcherId)
            .then(setWatchersArray(watchers.filter(watcher => watcher.id !== watcherId)))
            .catch(err => console.log('Problem deleting from watcher local storage', err))
    }

    function onAddWatcher() {
        setChangeWatcher(true)
    }

    function addWatcher(watcher, ev) {
        setChangeWatcher(false)
        onCloseModal()
        if (!watcher.movies.length || !watcher.fullName) return alert('Some information missing on the watcher, please try again')

        appService.save(watcher)
            .then(SavedWatcher => setWatchersArray(prevArray => [...prevArray, SavedWatcher]))
            .catch(err => console.log('Problem saving from watcher local storage', err))
    }


    function onSelectWatcher(watcherId) {
        appService.get(watcherId)
            .then(watcher => {
                setIsSelectedWatcher(watcher)
            })
            .catch(err => console.log('Fail to find selected watcher', err))
    }

    function onCloseModal() {
        setIsSelectedWatcher('')
        setChangeWatcher(false)
        elModal.current.close()
    }

    return (
        <div className="watchers-index">
            <h1>Watcher App</h1>
            <button onClick={() => onAddWatcher()} className="add-watcher btn">Add Watcher</button>
            <WatcherAppList
                watchers={watchers}
                onSelect={onSelectWatcher}
                onRemove={onRemoveWatcher}
            />
            <div>
                <dialog ref={elModal} className="watcher-modal-container">
                    {changeWatcher && (<WatcherAppInputModal
                        onAddUser={addWatcher}
                    />)}

                    {isSelectedWatcher && (<WatcherAppUserModal
                        selectedUser={isSelectedWatcher}
                    />)}

                    <button onClick={onCloseModal}>X</button>
                </dialog>
            </div>

        </div>
    )
}