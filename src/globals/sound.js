import { Howl, Howler } from "howler"

const banjo = new Howl({
    src: ["sounds/banjo.ogg"],
    loop: true,
    volume: 0.0,
})
const drums = new Howl({
    src: ["sounds/drums.ogg"],
    loop: true,
    volume: 0.0,
})
const flute = new Howl({
    src: ["sounds/flute.ogg"],
    loop: true,
    volume: 0.0,
})
const harmonica = new Howl({
    src: ["sounds/harmonica.ogg"],
    loop: true,
    volume: 0.0,
})
const whistle = new Howl({
    src: ["sounds/whistle.ogg"],
    loop: true,
    volume: 0.0,
})

export const analyser = Howler.ctx.createAnalyser()
Howler.masterGain.disconnect()
Howler.masterGain.connect(analyser)
analyser.fftSize = 2048
analyser.connect(Howler.ctx.destination)

export const instruments = {
    hour: drums,
    timber: banjo,
    brittle: whistle,
    deep: flute,
    bramble: harmonica
}

