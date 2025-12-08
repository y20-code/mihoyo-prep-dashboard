function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Start sleeping...');
    await sleep(2000);
    console.log('2秒过去了');
}

demo();