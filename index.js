const job = require("./src/model/job")
module.exports = async function (ctx) {
    await ctx.use(job)

    setInterval(async () => {
        let res = await ctx.run({
            token: true,
            model: "cron_job",
            method: "read",
            query: {
                filter: {
                    in_progress: false,
                    active: true,
                }
            }
        })
        for (let job of res.data) {
            if (job.last_run + job.interval < Date.now()) {
                await ctx.run({
                    token: true,
                    model: "cron_job",
                    method: "update",
                    query: {
                        filter: {
                            name: job.name
                        }
                    },
                    body: {
                        in_progress: true
                    }
                })
                ctx.lodash.defer(async () => {
                    await job.function(ctx)
                    await ctx.run({
                        token: true,
                        model: "cron_job",
                        method: "update",
                        query: {
                            filter: {
                                name: job.name
                            }
                        },
                        body: {
                            in_progress: false,
                            last_run: Date.now()
                        }
                    })
                })

            }
        }
    }, 25);
}