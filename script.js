document.addEventListener('DOMContentLoaded', () => {
    const unlockBtn = document.getElementById('unlockBtn');
    const testBtn = document.getElementById('testBtn');
    const consoleOutput = document.getElementById('console-output');
    const statusValue = document.getElementById('status-value');

    const logs = [
        "Analizando paquetes de red...",
        "Bloqueo ISP detectado: SPEEDY_NET_WALL_v4",
        "Iniciando secuencia de evasión...",
        "Tunelizando a través del puerto 80...",
        "Suplantando dirección MAC...",
        "Inyectando cabeceras DNS...",
        "Evadiendo reglas de firewall... ÉXITO",
        "Estableciendo conexión encriptada...",
        "Enrutando tráfico vía nodo seguro...",
        "Optimizando ancho de banda...",
        "Verificando conectividad... OK"
    ];

    function log(message, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'log-line';
                // Highlight ÉXITO or OK
                if (message.includes('ÉXITO') || message.includes('OK')) {
                    message = message.replace('ÉXITO', '<span style="color:#00ff41">ÉXITO</span>')
                                     .replace('OK', '<span style="color:#00ff41">OK</span>');
                }
                div.innerHTML = `> ${message}`;
                consoleOutput.appendChild(div);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                resolve();
            }, delay);
        });
    }

    async function startUnlockProcess() {
        unlockBtn.disabled = true;
        unlockBtn.textContent = "EJECUTANDO_SECUENCIA...";

        statusValue.textContent = "EVADIENDO...";
        statusValue.style.color = "#ffff00"; // Yellow
        statusValue.style.animation = "pulse 0.2s infinite alternate";

        // Clear previous logs if any (optional, but cleaner)
        consoleOutput.innerHTML = '';
        await log("Sistema inicializado...", 100);

        for (let i = 0; i < logs.length; i++) {
            // Faster processing for the "fix"
            const delay = Math.floor(Math.random() * 800) + 300;
            await log(logs[i], delay);
        }

        // Final result simulation
        setTimeout(() => {
            finalizeProcess();
        }, 800);
    }

    function finalizeProcess() {
        const div = document.createElement('div');
        div.className = 'log-line';
        div.style.color = '#00ff41'; // Green
        div.innerHTML = `> ACCESO CONCEDIDO. BLOQUEO ISP REMOVIDO.`;
        consoleOutput.appendChild(div);

        const div2 = document.createElement('div');
        div2.className = 'log-line';
        div2.innerHTML = `> Conectividad a Internet restaurada. Disfrute la libertad.`;
        consoleOutput.appendChild(div2);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        statusValue.textContent = "DESBLOQUEADO";
        statusValue.className = "unlocked";
        statusValue.style.color = "#00ff41";
        statusValue.style.animation = "none";

        unlockBtn.textContent = "SISTEMA SEGURO";
        unlockBtn.style.borderColor = "#00ff41";
        unlockBtn.style.color = "#00ff41";

        unlockBtn.disabled = false;
        unlockBtn.textContent = "RE-INICIALIZAR";

        alert("ÉXITO: Red Desbloqueada.\n\nSu conexión ahora está enrutada a través de un túnel seguro y sin restricciones.");
    }

    unlockBtn.addEventListener('click', startUnlockProcess);

    testBtn.addEventListener('click', () => {
        const win = window.open('https://www.google.com', '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Por favor permita ventanas emergentes para esta prueba.');
        }
    });
});
