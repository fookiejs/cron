module.exports = async function (ctx) {
    await ctx.model({
        name: 'cron_job',
        database: "store",
        display: "name",
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true
            },
            description: {
                type: "string",
            },
            start: {
                type: "number",
                required: true,
                default: Date.now()
            },
            last_run: {
                type: "number",
                required: true,
                default: 0
            },
            interval: {
                type: "number",
                required: true,
                default: 1000
            },
            function: {
                type: "function",
                required: true,
                unique: true
            },
            in_progress: {
                type: "boolean",
                required: true,
                default: false
            },
            active: {
                type: "boolean",
                required: true,
                default: true
            },
        }
    })
}