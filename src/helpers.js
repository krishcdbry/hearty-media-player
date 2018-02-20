// document.addEventListener('onKey')

function twoNumberFormat(number) {
    return String("0" + number).slice(-2);
}
function secondsToVideoTimeConverter (time) {
    let durationTime = '';
    let min = Math.floor(time/60);
    if (min > 0) {
        let hour = Math.floor(min/60);

        if (hour > 0) {
            durationTime += twoNumberFormat(hour)+':'+twoNumberFormat(min%60)+':'+twoNumberFormat(time%60);
        }
        else {
            durationTime += twoNumberFormat(min)+':'+twoNumberFormat(min%60);
        }

    }
    else {
        durationTime += '00:' + twoNumberFormat(Math.floor(time))
    }

    return durationTime
}

document.addEventListener("keydown", (e) => {
    console.log("Helee", e);
});

export {
    secondsToVideoTimeConverter
}