/*import * as path from "node:path";
import * as fs from "node:fs";

function copyGraphQLFiles() {
    const sourceDir = path.resolve(__dirname, 'src/graphql'); // Path to your library's .graphql files
    const targetDir = path.resolve(process.cwd(), 'src/graphql'); // Target directory in the consuming app

    if (!fs.existsSync(sourceDir)) {
        console.error('Source directory does not exist:', sourceDir);
        process.exit(1);
    }

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.readdirSync(sourceDir).forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);

        if (file.endsWith('.graphql')) {
            fs.copyFileSync(sourceFile, targetFile);
            console.log(`Copied: ${sourceFile} -> ${targetFile}`);
        }
    });
}

copyGraphQLFiles();*/
