document.getElementById('proxyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('url');
    const targetUrl = urlInput.value.trim();
    
    if (!targetUrl) return;

    try {
        const encodedUrl = Ultraviolet.codec.xor.encode(targetUrl);
        const proxyUrl = `/uv/service/${encodedUrl}`;
        window.location.href = proxyUrl;
    } catch (error) {
        console.error('Error processing URL:', error);
        alert('Error processing URL. Please check the format.');
    }
});
