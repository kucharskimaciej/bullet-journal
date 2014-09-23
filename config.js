module.exports = {
    manifest: {
        pack: {},
        servers: [
            {
                host: 'localhost',
                port: 3000,
                options: {
                    labels: ["api"]
                }
            }
        ],
        plugins: {
            './posts' : [{ select: 'api' }]
        }
    },
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'dailyjournal',
        username: '',
        password: ''
    }
};