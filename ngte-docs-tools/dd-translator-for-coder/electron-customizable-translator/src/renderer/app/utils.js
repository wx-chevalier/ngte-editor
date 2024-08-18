import {  voice } from '../google-translate/api'
import store from './store'
import {
    setText,
    getTranslation,
    resetHints,
    setToLang,
    setFromLang,
    setToBar,
    setFromBar,
    setToActive,
    setFromActive,
    speedFrom,
    speedTo } from './actions'

const ipc = require('electron').ipcRenderer
const settings = require('electron-settings')
const { webFrame } = require('electron')

webFrame.setLayoutZoomLevelLimits(0, 0)


window.eval = global.eval = function() {
    throw new Error("Sorry, Transee does not support eval() for security reasons.");
}

window.onkeydown = e => {
    // esc
    if (e.keyCode === 27) {
        e.preventDefault()
        ipc.send('hide-window', 'hide')
    }

    // alt shify
    if (e.altKey && e.keyCode === 16) {
        invertLanguages()
    }

    // ctrl p - voice
    if (e.ctrlKey && !e.altKey && e.keyCode === 80) {
        e.preventDefault()
        let text = store.getState().text
        if (text !== '') {
            let from = store.getState().langs.from
            let speed = store.getState().speed.from
            playAudio(text, from, speed)
            store.dispatch(speedFrom(!speed))
        }
    }

    // ctrl alt p - voice
    if (e.ctrlKey && e.altKey && e.keyCode === 80) {
        e.preventDefault()
        let data = store.getState().translate.data

        if (data) {
            let text = data.translation
            let to = store.getState().langs.to
            let speed = store.getState().speed.to

            playAudio(text, to, speed)
            store.dispatch(speedTo(!speed))
        }
    }

    if (e.shiftKey && e.ctrlKey && e.altKey && e.keyCode === 8) {
        ipc.send('devtools', null)
    }
}

export const searchTranslation = (text) => {
    let langs = store.getState().langs
    store.dispatch(getTranslation(text, langs))
}

export const playAudio = async (text, lang, speed) => {
    try {
        let response = await voice(text, lang, speed)
        let audio = new Audio(response)
        audio.play()
    } catch (error) {
        console.error(error)
    }
}

export const getToPosition = (value) => {
    let toBar = store.getState().toBar
    if (value === toBar.to1) return [true, false, false]
    if (value === toBar.to2) return [false, true, false]
    if (value === toBar.to3) return [false, false, true]
    return null
}

export const getFromPosition = (value) => {
    let fromBar = store.getState().fromBar
    if (value === fromBar.from1) return [true, false, false]
    if (value === fromBar.from2) return [false, true, false]
    if (value === fromBar.from3) return [false, false, true]
    return null
}

export const invertLanguages = () => {

    let data = store.getState().translate.data
    let langs = store.getState().langs
    let from = langs.from
    let to = langs.to
    
    store.dispatch(setToLang(from))
    store.dispatch(setFromLang(to))

    let toPos = getToPosition(from)
    let fromPos = getFromPosition(to)

    if (!toPos) {
        let toActive = store.getState().toActive
        let i = toActive.indexOf(true)
        store.dispatch(setToBar(from, i))
    } else {
        store.dispatch(setToActive(toPos))
    }

    if (!fromPos) {
        let fromActive = store.getState().fromActive
        let i = fromActive.indexOf(true)
        store.dispatch(setFromBar(to, i))
    } else {
        store.dispatch(setFromActive(fromPos))
    }

    if (data) {
        let text = data.translation
        store.dispatch(setText(text))
        store.dispatch(resetHints())
        store.dispatch(getTranslation(text, { from: to, to: from }))
    }
}

export const saveSettings = () => {
    var s = store.getState()
    var obj = {
        langs: s.langs,
        speed: s.speed,
        fromActive: s.fromActive,
        toActive: s.toActive,
        fromBar: s.fromBar,
        toBar: s.toBar
    }
    settings.set('settings', obj)
}

export const setMainWindowSize = () => {
    var height = document.getElementById('root').scrollHeight
    ipc.send('window-height', height)
}
