document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadScriptBtn');
    const statusSpan = document.getElementById('connectionStatus');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const testConnBtn = document.getElementById('testConnectionBtn');

    // Check connectivity
    function updateStatus(isOnline) {
        if (isOnline) {
            statusSpan.textContent = "En línea (Posiblemente)";
            statusSpan.style.color = "#f9a825"; // Yellow/Warning because we don't know if it's real yet
        } else {
            statusSpan.textContent = "Sin conexión";
            statusSpan.style.color = "#d32f2f";
        }
    }

    if (navigator.onLine) updateStatus(true);

    window.addEventListener('online', () => updateStatus(true));
    window.addEventListener('offline', () => updateStatus(false));

    // Test Real Connectivity
    if (testConnBtn) {
        testConnBtn.addEventListener('click', async () => {
            statusSpan.textContent = "Probando...";
            statusSpan.style.color = "#1976d2";

            try {
                // Try to fetch a small image from a reliable source with a random param to bypass cache
                // Using a favicon from a major site usually works and is small.
                // Note: fetch might fail due to CORS if we try to read it, but we just want to know if it fails network-wise.
                // Actually, 'no-cors' mode allows the request to go through.

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

                const response = await fetch('https://www.google.com/favicon.ico?t=' + new Date().getTime(), {
                    mode: 'no-cors',
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                // If we get here, we technically reached the server (or a proxy)
                statusSpan.textContent = "Conexión Real Confirmada";
                statusSpan.style.color = "#2e7d32";
                alert("¡Éxito! Tu conexión parece estar funcionando.");

            } catch (error) {
                console.error(error);
                statusSpan.textContent = "Bloqueado / Sin Internet";
                statusSpan.style.color = "#d32f2f";
                alert("Fallo la prueba de conexión. Sigues bloqueado o sin internet.");
            }
        });
    }

    // Download Script Logic - UNIVERSAL VERSION
    downloadBtn.addEventListener('click', () => {
        const batchContent = `@echo off
setlocal enabledelayedexpansion
echo ==========================================
echo      REPARADOR UNIVERSAL NETFIX v3.0
echo ==========================================
echo.
echo Este script intentara reparar tu conexion aplicando
echo DNS de Google en TODOS los adaptadores de red.
echo.
echo IMPORTANTE: Ejecutar como Administrador.
echo.
pause

echo.
echo [1/4] Detectando adaptadores y aplicando DNS...
echo Esto puede tardar unos segundos...

:: Get all interface names
for /f "skip=3 tokens=3,4 delims= " %%A in ('netsh interface show interface') do (
    set "INT_NAME=%%A %%B"
    :: Clean up trailing spaces if any (simple approach)

    echo Intentando configurar: !INT_NAME!
    netsh interface ip set dns name="!INT_NAME!" static 8.8.8.8 >nul 2>&1
    netsh interface ip add dns name="!INT_NAME!" 8.8.4.4 index=2 >nul 2>&1
)

:: Fallback for common names just in case
netsh interface ip set dns name="Wi-Fi" static 8.8.8.8 >nul 2>&1
netsh interface ip add dns name="Wi-Fi" 8.8.4.4 index=2 >nul 2>&1
netsh interface ip set dns name="Ethernet" static 8.8.8.8 >nul 2>&1
netsh interface ip add dns name="Ethernet" 8.8.4.4 index=2 >nul 2>&1
netsh interface ip set dns name="Conexión de área local" static 8.8.8.8 >nul 2>&1
netsh interface ip add dns name="Conexión de área local" 8.8.4.4 index=2 >nul 2>&1

echo.
echo [2/4] Renovando IP...
ipconfig /release >nul 2>&1
ipconfig /renew >nul 2>&1

echo.
echo [3/4] Limpiando cache DNS...
ipconfig /flushdns

echo.
echo [4/4] Reseteando Winsock...
netsh winsock reset >nul 2>&1

echo.
echo ==========================================
echo      PROCESO COMPLETADO
echo ==========================================
echo Es MUY RECOMENDABLE reiniciar tu PC ahora.
echo Intenta navegar despues de reiniciar.
echo.
pause
`;
        downloadFile('reparar_internet_universal.bat', batchContent);
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
