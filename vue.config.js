module.exports = {
    outputDir: 'dist', // Build output directory
    assetsDir: 'static', // Directory for static assets
    productionSourceMap: false, // Disable source maps in production for smaller builds
    devServer: {
        host: '0.0.0.0', // Allows access from external hosts
        port: 8080, // Ensure it matches the Codespaces port
        client: {
            webSocketURL: {
                protocol: 'wss', // Use 'wss' for secure WebSocket connections
                port: 8080, // Ensure the WebSocket port matches the dev server port
            },
        },
        allowedHosts: 'all', // Allows connections from all hosts (needed in Codespaces)
    },
};
