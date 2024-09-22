let nowChapter = 1
let monitor = document.querySelector("#monitor")
setInterval(function () {
    rutin(monitor, adventure, nowChapter)
}, 1)
function rutin(/**@type {HTMLElement} */monitor, adventure, nowChapter) {
    updateUi(monitor, adventure, nowChapter);
    checkUiEvent(monitor);
}
function updateUi(/**@type {HTMLElement} */monitor, adventure, nowChapter) {
    let headline = monitor.querySelector("#headline")
    let text = monitor.querySelector("#text")
    let targets = monitor.querySelector("#targets")
    let thisChapter = adventure[nowChapter]
    let img = document.querySelector("#background")
    let targetsNow = []
    thisChapter.targets.forEach((TargetNumber) => {
        targetsNow.push(adventure[TargetNumber].headline)
    })
    if (headline.innerText != thisChapter.headline) {
        headline.innerText = thisChapter.headline
    }
    if (text.innerText != thisChapter.text) {
        text.innerText = thisChapter.text
    }
    if (`/Bilder/${thisChapter.image}` != `B${img.src.split("B")[1]}`) {
        img.src = `/Bilder/${thisChapter.image}`
    }

    while (targetsNow.length > targets.children.length) {
        targets.appendChild(createHtmlElement("p", "link"))
    }
    while (targetsNow.length < targets.children.length) {
        targets.removeChild(targets.lastChild)
    }
    Object.keys(targets.children).forEach((TargetNumber) => {
        let el = targets.children[TargetNumber]
        if (el.innerText != targetsNow[TargetNumber]) {
            el.innerText = targetsNow[TargetNumber]
        }
    })
    document.addEventListener("keypress", (event) => {
        if (event.key == "i" || event.key == "I") {
            monitor.style.display = "none"
        }
    }, { once: true })
    document.addEventListener("keyup", (event) => {
        if (event.key == "i" || event.key == "I") {
            monitor.style.display = "flex"
        }
    })
}
function checkUiEvent(/**@type {HTMLElement} */monitor) {
    let backToStart = document.querySelector("#backToStart")
    let targets = monitor.querySelector("#targets")
    let thisChapter = adventure[nowChapter]
    Object.keys(targets.children).forEach((number) => {
        let /**@type {HTMLElement} */el = targets.children[number]
        el.addEventListener("click", (event) => {
            nowChapter = thisChapter.targets[number]
        }, { once: true })
    })
    backToStart.addEventListener("click", (event) => {
        nowChapter = 1
    }, { once: true })
}
function createHtmlElement(type, cla, id) {
    let /**@type {HTMLElement} */el = document.createElement(type)
    if (cla) {
        el.classList.value = cla
    }
    if (id) {
        el.id = id
    }
    return el
}