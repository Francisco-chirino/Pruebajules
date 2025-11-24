document.addEventListener('DOMContentLoaded', () => {
    const unlockBtn = document.getElementById('unlockBtn');
    const testBtn = document.getElementById('testBtn');
    const consoleOutput = document.getElementById('console-output');
    const statusValue = document.getElementById('status-value');

    const logs = [
        "Analyzing network packets...",
        "ISP Block detected: SPEEDY_NET_WALL_v4",
        "Initiating bypass sequence...",
        "Tunneling through port 80...",
        "Spoofing MAC address...",
        "Injecting DNS headers...",
        "Bypassing firewall rules...",
        "Handshake failed. Retrying...",
        "Attempting alternative route...",
        "Proxy chain established...",
        "Verifying connectivity..."
    ];

    function log(message, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'log-line';
                div.innerHTML = `> ${message}`;
                consoleOutput.appendChild(div);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                resolve();
            }, delay);
        });
    }

    async function startUnlockProcess() {
        unlockBtn.disabled = true;
        unlockBtn.textContent = "RUNNING_SEQUENCE...";

        statusValue.textContent = "BYPASSING...";
        statusValue.style.color = "#ffff00"; // Yellow
        statusValue.style.animation = "pulse 0.2s infinite alternate";

        for (let i = 0; i < logs.length; i++) {
            // Random delay between 500ms and 1500ms
            const delay = Math.floor(Math.random() * 1000) + 500;
            await log(logs[i], delay);
        }

        // Final result simulation
        setTimeout(() => {
            finalizeProcess();
        }, 1000);
    }

    function finalizeProcess() {
        // We can't actually unlock the internet, so we give a realistic "Partial Success" or "Check Settings" message.
        // Or we can simulate a success for the "app experience".
        // Let's go with a "Manual Action Required" ending which is safer and more realistic for a fake tool.

        const div = document.createElement('div');
        div.className = 'log-line';
        div.style.color = '#ff3333';
        div.innerHTML = `> CRITICAL ERROR: ISP Hardware Lock Detected.`;
        consoleOutput.appendChild(div);

        const div2 = document.createElement('div');
        div2.className = 'log-line';
        div2.innerHTML = `> Automatic unlock incomplete. Manual DNS override required.`;
        consoleOutput.appendChild(div2);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        statusValue.textContent = "PARTIAL_LOCK";
        statusValue.className = "blocked"; // Keep it red/flashing
        statusValue.style.color = "#ff3333";

        unlockBtn.textContent = "RETRY SEQUENCE";
        unlockBtn.disabled = false;

        alert("System Message: Automatic bypass blocked by ISP Hardware Level.\n\nPlease follow the 'Manual Override Protocols' below to restore connectivity.");
    }

    unlockBtn.addEventListener('click', startUnlockProcess);

    testBtn.addEventListener('click', () => {
        const win = window.open('https://www.google.com', '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Please allow popups for this test.');
        }
    });
});
