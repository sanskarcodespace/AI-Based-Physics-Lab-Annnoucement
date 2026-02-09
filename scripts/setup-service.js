const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const WORKING_DIR = process.cwd();
const CURRENT_USER = os.userInfo().username;
const PLATFORM = os.platform();

const TEMPLATES = {
    win: path.join(__dirname, 'templates/win-service.xml'),
    linux: path.join(__dirname, 'templates/linux-service.service'),
    mac: path.join(__dirname, 'templates/mac-service.plist')
};

const OUTPUT_DIR = path.join(__dirname, '../generated');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function setup() {
    console.log(`🔍 Detected Platform: ${PLATFORM}`);

    let content = '';
    let targetPath = '';

    if (PLATFORM === 'win32') {
        content = fs.readFileSync(TEMPLATES.win, 'utf8')
            .replace(/{{WORKING_DIR}}/g, WORKING_DIR);
        targetPath = path.join(OUTPUT_DIR, 'win-service.xml');
        console.log(`✅ Generated Windows Task Scheduler XML in ${targetPath}`);
        console.log(`👉 To install: schtasks /create /xml "${targetPath}" /tn "AI-Physics-Lab"`);
    }
    else if (PLATFORM === 'linux') {
        content = fs.readFileSync(TEMPLATES.linux, 'utf8')
            .replace(/{{WORKING_DIR}}/g, WORKING_DIR)
            .replace(/{{USER}}/g, CURRENT_USER);
        targetPath = path.join(OUTPUT_DIR, 'lab-system.service');
        console.log(`✅ Generated systemd service in ${targetPath}`);
        console.log(`👉 To install: sudo cp "${targetPath}" /etc/systemd/system/ && sudo systemctl enable lab-system && sudo systemctl start lab-system`);
    }
    else if (PLATFORM === 'darwin') {
        content = fs.readFileSync(TEMPLATES.mac, 'utf8')
            .replace(/{{WORKING_DIR}}/g, WORKING_DIR);
        targetPath = path.join(OUTPUT_DIR, 'com.ai.physicslab.plist');
        console.log(`✅ Generated launchd plist in ${targetPath}`);
        console.log(`👉 To install: cp "${targetPath}" ~/Library/LaunchAgents/ && launchctl load ~/Library/LaunchAgents/com.ai.physicslab.plist`);
    }

    fs.writeFileSync(targetPath, content);
}

const action = process.argv[2];
if (action === 'install') {
    setup();
} else {
    console.log("Usage: node scripts/setup-service.js install");
}
