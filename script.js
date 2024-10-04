const colorInputBubble = document.getElementById('color-input-bubble');
const colorInputBackground = document.getElementById('color-input-background');

function updateBubbleColor() {

    const hexColor = colorInputBubble.value;
    console.log(hexColor)
    const bubbles = document.querySelectorAll('.bubbles');
    bubbles.forEach(bubble => {
        bubble.style.backgroundColor = hexColor;
    });
}

function updateBackgroundColor() {
    document.body.style.backgroundColor = colorInputBackground.value;
}

function copyCode() {
    const bubbleColor = colorInputBubble.value;
    const backgroundColor = colorInputBackground.value;

    // templating like this is so cursed 
    // valid

    const cssCode = `<style>
        .bubbles {
            transition: transform 2.0s ease, opacity 1.16s ease, left .16s ease, top .16s ease, right .16s ease, bottom .16s ease;
            position: fixed;
            z-index: -1;
            background-color: ${bubbleColor}; 
            border-radius: 50%;
            width: 120px;
            height: 120px;
            transform: scale(1);
            opacity: 0;
            filter: blur(30px);
            backdrop-filter: blur(200px);
        }

        .bubble-hide {
            transform: scale(0);
            opacity: 0 !important;
        }
        </style>
        `;
  const jsCode = `<script>
        colorInputBubble.addEventListener('input', updateBubbleColor);
        colorInputBackground.addEventListener('input', updateBackgroundColor);

        setInterval(function () {
            const newBubble = document.createElement('div');
            newBubble.classList.add('bubbles');
            const colorInputBubble = document.getElementById('color-input-bubble');

            const hexColor = colorInputBubble.value;
            document.body.appendChild(newBubble);
            newBubble.style.backgroundColor = hexColor;
            newBubble.style.top = Math.floor(Math.random() * window.innerHeight + 1) + 'px';
            newBubble.style.left = Math.floor(Math.random() * window.innerWidth + 1) + 'px';

            const myDirection = Math.floor(Math.random() * 5);
            setTimeout(function () {
                newBubble.style.opacity = '0.5';
            }, 1);

            const speed = ${MIN_MOVEMENT_SPEED + Math.random() * (MAX_MOVEMENT_SPEED - MIN_MOVEMENT_SPEED)};
            let mytime = setInterval(function () {
                if (myDirection === 1) {
                    newBubble.style.top = (parseInt(newBubble.style.top) - speed) + 'px';
                    newBubble.style.left = (parseInt(newBubble.style.left) - speed) + 'px';
                } else if (myDirection === 2) {
                    newBubble.style.top = (parseInt(newBubble.style.top) - speed) + 'px';
                    newBubble.style.right = (parseInt(newBubble.style.right) - speed) + 'px';
                } else if (myDirection === 3) {
                    newBubble.style.top = (parseInt(newBubble.style.top) + speed) + 'px';
                    newBubble.style.left = (parseInt(newBubble.style.left) + speed) + 'px';
                } else {
                    newBubble.style.top = (parseInt(newBubble.style.top) + speed) + 'px';
                    newBubble.style.right = (parseInt(newBubble.style.right) + speed) + 'px';
                }
                if (parseInt(newBubble.style.top) <= 0 || parseInt(newBubble.style.left) <= 0 || parseInt(newBubble.style.right) >= window.innerWidth || parseInt(newBubble.style.bottom) >= window.innerHeight) {
                    return clearInterval(mytime);
                }
            }, 1000 / 60);

            setTimeout(function () {
                newBubble.classList.add('bubble-hide');
                setTimeout(function () {
                    newBubble.remove();
                }, ${BUBBLE_FADE_OUT_TIME});
            }, Math.floor(Math.random() * 1000) + ${BUBBLE_FADE_OUT_TIME});
        }, ${BUBBLE_CREATION_INTERVAL});
    </script>`;

    const codeToCopy = cssCode + jsCode;

    navigator.clipboard.writeText(codeToCopy)
        .catch(err => {
            console.error('Failed to copy code: ', err);
        });
}

colorInputBubble.addEventListener('input', updateBubbleColor);
colorInputBackground.addEventListener('input', updateBackgroundColor);

setInterval(function () {
    const newBubble = document.createElement('div');
    newBubble.classList.add('bubbles');
    const colorInputBubble = document.getElementById('color-input-bubble');

    const hexColor = colorInputBubble.value;
    document.body.appendChild(newBubble);
    newBubble.style.backgroundColor = hexColor;
    newBubble.style.top = Math.floor(Math.random() * window.innerHeight + 1) + 'px';
    newBubble.style.left = Math.floor(Math.random() * window.innerWidth + 1) + 'px';

    const myDirection = Math.floor(Math.random() * 5);
    setTimeout(function () {
        newBubble.style.opacity = '0.5';
    }, 1);

    const speed = 0.16;
    let mytime = setInterval(function () {
        if (myDirection === 1) {
            newBubble.style.top = (parseInt(newBubble.style.top) - speed) + 'px';
            newBubble.style.left = (parseInt(newBubble.style.left) - speed) + 'px';
        } else if (myDirection === 2) {
            newBubble.style.top = (parseInt(newBubble.style.top) - speed) + 'px';
            newBubble.style.right = (parseInt(newBubble.style.right) - speed) + 'px';
        } else if (myDirection === 3) {
            newBubble.style.top = (parseInt(newBubble.style.top) + speed) + 'px';
            newBubble.style.left = (parseInt(newBubble.style.left) + speed) + 'px';
        } else {
            newBubble.style.top = (parseInt(newBubble.style.top) + speed) + 'px';
            newBubble.style.right = (parseInt(newBubble.style.right) + speed) + 'px';
        }
        if (newBubble.style.top <= 0) return clearInterval(mytime);
        if (newBubble.style.left <= 0) return clearInterval(mytime);
        if (newBubble.style.right >= window.innerWidth) return clearInterval(mytime);
        if (newBubble.style.bottom >= window.innerWidth) return clearInterval(mytime);
    }, 1000 / 60);

    setTimeout(function () {
        newBubble.classList.add('bubble-hide');
        setTimeout(function () {
            newBubble.remove();
        }, 2000);
    }, Math.floor(Math.random() * 1000) + 2000);
}, 1000);
