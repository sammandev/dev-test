module.exports = {
    apps: [{
        name: 'ot-app-frontend',
        script: 'server.cjs',
        instances: process.env.NODE_ENV === 'production' ? 2 : 1,
        exec_mode: 'cluster',
        autorestart: true,
        watch: process.env.NODE_ENV === 'development',
        max_memory_restart: '1G',
        env_development: {
            NODE_ENV: 'development',
            PORT: process.env.PORT,
            VUE_BASE_URL: process.env.VUE_BASE_URL,
            VUE_API_BASE_URL: process.env.VUE_API_BASE_URL
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: process.env.PORT,
            VUE_BASE_URL: process.env.VUE_BASE_URL,
            VUE_API_BASE_URL: process.env.VUE_API_BASE_URL
        },
        error_file: 'logs/err.log',
        out_file: 'logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        combine_logs: true,
        time: true
    }]
}
