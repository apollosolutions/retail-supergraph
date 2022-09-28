import path from "path";
import fs from "fs";

const files = fs.readdirSync(path.join(path.dirname("."), "./use-cases"));

const readFiles = files.map((fileName) => {
  const contents = fs
    .readFileSync(path.join(path.dirname("."), `./use-cases/${fileName}`))
    .toString();

  return {
    fileName,
    contents,
  };
});

const parsedFiles = readFiles.map(({ fileName, contents }) => {
  const splitContent = contents.split("```");

  const queries = splitContent
    .map((cont, index) => {
      if (
        cont.startsWith("graphql") &&
        cont.toLowerCase().indexOf("type mutation") === -1 &&
        cont.toLowerCase().indexOf("type query") === -1
      ) {
        return { body: cont.replace("graphql\n", ""), index };
      }
    })
    .filter((q) => !!q);

  queries.forEach((query, i) => {
    let variablesFound = false;
    let indexOfVars = query.index + 1;
    if (query.body.split("\\n")[0].indexOf("(") !== -1) {
      variablesFound = true;

      while (splitContent[indexOfVars].indexOf("variable") === -1) {
        indexOfVars += 1;
      }
    }

    let headersFound = false;
    let indexOfHeaders = query.index + 1;

    const endIndex =
      queries.length - 1 > i ? queries[i + 1].index : splitContent.length - 1;

    while (
      splitContent[indexOfHeaders].indexOf("header") === -1 &&
      indexOfHeaders < endIndex
    ) {
      indexOfHeaders += 1;
    }

    if (
      !!splitContent[indexOfHeaders + 1] &&
      splitContent[indexOfHeaders + 1].startsWith("JSON")
    ) {
      headersFound = true;
    }

    queries[i] = {
      ...query,
      headers: headersFound
        ? splitContent[indexOfHeaders + 1].replace("JSON\n", "")
        : undefined,
      variables: variablesFound
        ? splitContent[indexOfVars + 1].replace("JSON\n", "")
        : undefined,
    };
  });

  return {
    fileName,
    queries,
  };
});

console.log(JSON.stringify(parsedFiles, undefined, 2));
