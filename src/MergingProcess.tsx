import * as React from "react";
import {Box} from "ink";
import {useEffect, useState} from "react";
// @ts-ignore
import * as merge from "easy-pdf-merge";

export const MergingProcess: React.FunctionComponent<{
  paths: string[];
  outputPath: string;
  onComplete: () => void;
}> = props => {
  const [progress, setProgress] = useState('Starting merge...');

  useEffect(() => {
    merge(props.paths, props.outputPath, (err: string) => {
      if (err) {
        setProgress(`An error occured during merge: ${err}`);
      } else {
        props.onComplete();
      }
    });
  }, []);

  return (
    <Box>
      { progress }
    </Box>
  );
};