const terminal = document.querySelector('.ubuntu-terminal');
const header = document.querySelector('.window-header');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

header.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    isDragging = true;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, terminal);
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}


const resizeHandle = document.querySelector('.resize-handle');
let isResizing = false;

resizeHandle.addEventListener('mousedown', resizeStart);
document.addEventListener('mousemove', resize);
document.addEventListener('mouseup', resizeEnd);

function resizeStart(e) {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', resizeEnd);
}

function resize(e) {
    if (isResizing) {
        terminal.style.width = e.clientX - terminal.offsetLeft + 'px';
        terminal.style.height = e.clientY - terminal.offsetTop + 'px';
    }
}

function resizeEnd() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', resizeEnd);
}


const tabs = document.querySelectorAll('.tab');
const terminalContent = document.getElementById('terminal-content');


document.addEventListener('DOMContentLoaded', init_content)

async function init_content() {
const content = await loadTabContent('/content/home.html');
terminalContent.innerHTML = content

}

async function loadTabContent(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
        tabs.forEach(t => t.classList.remove('active'));
        
        tab.classList.add('active');
        
        const tabName = tab.getAttribute('data-tab');
        const url = `/content/${tabName}.html`;
        
        const content = await loadTabContent(url);
        
        terminalContent.innerHTML = content;
        
        terminalContent.style.opacity = 0;
        setTimeout(() => {
            terminalContent.style.opacity = 1;
        }, 150);
    });
});
