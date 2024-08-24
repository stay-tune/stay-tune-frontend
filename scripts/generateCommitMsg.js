const { execSync } = require("child_process");
const fs = require("fs");

// 현재 브랜치 이름 가져오기
const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

// 기본 커밋 메시지
let commitMessage = "";

// 브랜치 이름을 기반으로 커밋 메시지 설정
if (branchName.startsWith("feature/")) {
  commitMessage = `feat(${branchName.replace("feature/", "")}): `;
} else if (branchName.startsWith("fix/")) {
  commitMessage = `fix(${branchName.replace("fix/", "")}): `;
} else {
  commitMessage = `chore(${branchName}): `;
}

// 커밋 메시지 파일 경로
const commitMsgFile = process.argv[2];

// 기존 메시지 읽기
const existingMsg = fs.readFileSync(commitMsgFile, "utf8");

// 새 메시지 작성
const newMsg = `${commitMessage}${existingMsg}`.trim();

// 커밋 메시지 파일에 쓰기
fs.writeFileSync(commitMsgFile, newMsg);
