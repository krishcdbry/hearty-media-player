
function twoNumberFormat(number) {
    return String("0" + number).slice(-2);
}

function secondsToVideoTimeConverter (time) {
    if (time.toString() == "NaN") {
        return "00:00";
    }
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

function getRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomId () {
    let random = '';
    let validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i=0; i < 9; i++) {
        random += validCharacters[getRandomNumber(0, 61)];
    }
    return random;
}

export {
    secondsToVideoTimeConverter,
    generateRandomId
}

