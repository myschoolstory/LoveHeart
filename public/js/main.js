class LoveHeartProxy {
    constructor() {
        this.connection = new BareMux.BareMuxConnection("/baremux/worker.js");
        this.wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
        this.bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/";
        
        this.setupServiceWorker();
        this.initializeUI();
    }

    setupServiceWorker() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/uv/sw.js")
                    .then(registration => console.log('Service worker registered'))
                    .catch(error => console.error('Service worker registration failed:', error));
            });
        }
    }

    initializeUI() {
        const urlInput = document.getElementById('urlInput');
        const contentFrame = document.getElementById('contentFrame');
        const switcher = document.getElementById('switcher');

        urlInput.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                await this.navigate(urlInput.value);
            }
        });

        switcher.addEventListener('change', async (event) => {
            await this.switchTransport(event.target.value);
        });
    }

    async navigate(url) {
        let finalUrl = url;

        // Handle search queries
        if (!url.includes('.')) {
            finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
            finalUrl = `https://${url}`;
        }

        const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(finalUrl);
        document.getElementById('contentFrame').src = encodedUrl;
    }

    async switchTransport(type) {
        try {
            switch (type) {
                case 'epoxy':
                    await this.connection.setTransport("/epoxy/index.mjs", [{ wisp: this.wispUrl }]);
                    break;
                case 'bare':
                    await this.connection.setTransport("/baremod/index.mjs", [this.bareUrl]);
                    break;
            }
        } catch (error) {
            console.error('Transport switch failed:', error);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loveheart = new LoveHeartProxy();
});