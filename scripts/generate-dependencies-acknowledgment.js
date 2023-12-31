import { exec } from 'child_process';
import fs from "fs";

// Run the command to get a JSON representation of project dependencies
exec("npm list --json --long", function(error, stdout, stderr) {
    if (error || stderr) {
        console.error("Failed to generate dependency information!");
    }

    // Parse the JSON output
    const npmList = JSON.parse(stdout);

    // Create an array to store information about each dependency
    const dependencies = [];

    // Iterate over the dependencies and extract relevant information
    for (const dependency of Object.values(npmList.dependencies)) {
        dependencies.push({
            name: dependency.name,
            author: dependency.author,
            description: dependency.description,
            version: dependency.version,
            license: dependency.license,
            url: `https://www.npmjs.com/package/${dependency.name}` // Generate the URL for the dependency on npmjs.com
        });
    }

    // Write the extracted information to a JSON file
    const outputPath = "./static/dependencies.json";
    fs.writeFileSync(outputPath, JSON.stringify(dependencies));

    // Log a message indicating the successful completion of the script
    console.log(`Dependency information written to ${outputPath}`);
});