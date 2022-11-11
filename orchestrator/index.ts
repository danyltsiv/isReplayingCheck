/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

import * as df from "durable-functions"

const orchestrator = df.orchestrator(function* (context) {
    
    yield context.df.callActivity("F2");
    
    const tasks = [];

    if (!context.df.isReplaying) context.log("Calling fanout for F1.");

    for (var i = 0; i < 5; i++)
    {
        tasks.push(context.df.callActivity("F1"));
    }

    yield context.df.Task.all(tasks);

    if (!context.df.isReplaying) context.log("Fanout finished for F1.");

    return;
});

export default orchestrator;
