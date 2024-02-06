function removeComments(code) {
  // Remove comments
  return code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
}

function extractCode(code) {
  let codestr = removeComments(code);
  let newCode = [];
  let stack = [];
  let t = 5;
  while (true) {
    let stF = codestr.indexOf("function");
    if (stF != -1) {
      let stB = codestr.indexOf("{", stF);
      let enB = stF;
      stack.push("{");
      let i;
      for (i = stB + 1; i < codestr.length; i++) {
        if (codestr[i] == "(" || codestr[i] == "{" || codestr[i] == "[") {
          stack.push(codestr[i]);
        }
        if (codestr[i] == ")" && stack[stack.length - 1] == "(") {
          stack.length = stack.length - 1;
        } else if (codestr[i] == "}" && stack[stack.length - 1] == "{") {
          stack.length = stack.length - 1;
        } else if (codestr[i] == "]" && stack[stack.length - 1] == "[") {
          stack.length = stack.length - 1;
        } else if (
          codestr[i] == ")" ||
          codestr[i] == "}" ||
          codestr[i] == "]"
        ) {
          stack.push(codestr[i]);
        }

        if (stack.length == 0) {
          enB = i;
          break;
        }
        if (codestr.startsWith("function", i)) {
          break;
        }
      }
      console.log(i, stack);
      if (stF == enB || stack.length != 0) {
        codestr = codestr.replace(codestr.slice(stF, i - 1), "");
        continue;
      }
      newCode.push(codestr.slice(stF, enB + 1));
      // console.log(newCode);
      codestr = codestr.replace(codestr.slice(stF, enB + 1), "");

      stack.length = 0;
    } else {
      break;
    }
  }

  newCode = newCode.filter((func) => func.startsWith("function"));
  console.log(newCode);
  return newCode.join("\n\n");
}

document.getElementById("genarate").addEventListener("click", () => {
  const code = document.getElementById("code").value;
  const newCode = extractCode(code);
  document.getElementById("result").innerText = "";
  document.getElementById("result").innerText =
    newCode || "paste your Code again";
});
