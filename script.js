document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadScriptBtn');
    const statusSpan = document.getElementById('connectionStatus');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Check connectivity (Simple simulation of status check)
    if (navigator.onLine) {
        statusSpan.textContent = "En línea (Conectado)";
        statusSpan.style.color = "#2e7d32";
    } else {
        statusSpan.textContent = "Sin conexión";
        statusSpan.style.color = "#d32f2f";
    }

    window.addEventListener('online', () => {
        statusSpan.textContent = "En línea (Conectado)";
        statusSpan.style.color = "#2e7d32";
    });

    window.addEventListener('offline', () => {
        statusSpan.textContent = "Sin conexión";
        statusSpan.style.color = "#d32f2f";
    });

    // Download Script Logic
    downloadBtn.addEventListener('click', () => {
        const batchContent = `@echo off
echo ==========================================
echo      REPARADOR DE CONEXION NETFIX
echo ==========================================
echo.
echo Este script intentara cambiar tus DNS a Google Public DNS
echo para evadir bloqueos simples de ISP.
echo.
echo Requiere permisos de Administrador.
echo.
pause

echo.
echo [1/3] Configurando DNS para Wi-Fi...
netsh interface ip set dns name="Wi-Fi" static 8.8.8.8
netsh interface ip add dns name="Wi-Fi" 8.8.4.4 index=2

echo.
echo [2/3] Configurando DNS para Ethernet...
netsh interface ip set dns name="Ethernet" static 8.8.8.8
netsh interface ip add dns name="Ethernet" 8.8.4.4 index=2

echo.
echo [3/3] Limpiando cache DNS...
ipconfig /flushdns

echo.
echo ==========================================
echo      PROCESO COMPLETADO
echo ==========================================
echo Intenta navegar ahora. Si no funciona, reinicia tu PC.
echo.
pause
`;
        downloadFile('reparar_internet.bat', batchContent);
    });

    function downloadFile(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Tabs Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});
