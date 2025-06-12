import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const APP_KEY = 'appDB'
_createWatchers()

export const appService = {
    query,
    get,
    remove,
    save,
    getEmptyWatcher,
}

function query() {
    return storageService.query(APP_KEY)
        .then(watchers => {
            if (watchers.length) return watchers
            else
                _createWatchers()
            return utilService.loadFromStorage(APP_KEY)
        })
        .catch(err => console.log('Failed loading Watcher', err))
}

function get(watcherId) {
    return storageService.get(APP_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(APP_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(APP_KEY, watcher)
    } else {
        return storageService.post(APP_KEY, watcher)
    }
}

function getEmptyWatcher(fullName = '', movies = []) {
    return {
        id: '',
        fullName,
        movies
    }
}


function _createWatchers() {
    let watchers = utilService.loadFromStorage(APP_KEY)
    if (!watchers || !watchers.length) createDemoWatchers()
}

function createDemoWatchers() {
    var watchers = []
    for (let i = 0; i < 3; i++) {
        watchers.push(_createDemoWatcher(`BOB ${utilService.makeLorem(1)}`))
    }
    utilService.saveToStorage(APP_KEY, watchers)
}

function _createDemoWatcher(name) {
    return {
        id: utilService.makeId(),
        fullName: name,
        movies: ['demo movie', 'demo movie 2']
    }

}