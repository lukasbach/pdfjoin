import * as React from "react";
import {Box, Color} from "ink";
import * as fs from "fs";
import * as path from "path";
import {useEffect, useRef, useState} from "react";

const findInDir = (dir: string, foundFile: (file: string) => void) => {
  const contents = fs.readdirSync(dir);
  contents.forEach(file => {
    const filePath = path.join(dir, file);

    if (file.endsWith('.pdf')) {
      foundFile(filePath);
    } else if (fs.lstatSync(filePath).isDirectory()) {
      findInDir(filePath, foundFile);
    }
  })
};

export const PdfFinder: React.FunctionComponent<{
  onComplete: (paths: string[]) => void;
}> = props => {
  const [count, setCount] = useState<number>(0);
  const paths = useRef<string[]>([]);

  const cwd = process.cwd();
  useEffect(() => {
    findInDir(cwd, file => {
      paths.current.push(file);
      setCount(count + 1);
    });
    props.onComplete(paths.current);
  }, []);

  return (
    <>
      <Box width="100%">
        Found <Color blueBright>{paths.current.length}</Color> in <Color blueBright>{cwd}</Color>...
      </Box>
      {
        paths.current
          .reverse()
          .filter((item, index) => index < 4)
          .map(dir => <Box key={dir} width="100%">  {dir}</Box>)
      }
    </>
  );
};
