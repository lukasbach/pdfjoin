import * as React from "react";
import {useEffect, useState} from "react";
import {PdfFinder} from "./PdfFinder";
import {List} from "./List";
import {SpecifyOutputName} from "./SpecifyOutputName";
import {MergingProcess} from "./MergingProcess";

const Done: React.FunctionComponent<{}> = props => {
  useEffect(() => process.exit(), []);
  return <>Done.</>;
};

export const App: React.FunctionComponent<{}> = props => {
  const [paths, setPaths] = useState<string[]>([]);
  const [step, setStep] = useState<'findPdfs' | 'reorder' | 'specifyOutputName' | 'merging' | 'done'>('findPdfs');
  const [outName, setOutName] = useState('');

  useEffect(() => {
    if (step === 'findPdfs') {

    }
  }, [step]);

  switch (step) {
    case "findPdfs":
      return (
        <PdfFinder onComplete={paths => {
          setPaths(paths);
          setStep('reorder');
        }}/>
      );
    case "reorder":
      return (
        <List
          paths={paths}
          onComplete={paths => {
          setPaths(paths);
          setStep('specifyOutputName');
        }}/>
      );
    case "specifyOutputName":
      return (
        <SpecifyOutputName
          onComplete={outputName => {
            setOutName(outputName);
            setStep("merging");
          }}
        />
      );
    case "merging":
      return (
        <MergingProcess
          paths={paths}
          outputPath={outName}
          onComplete={() => setStep("done")}
        />
      );
    case "done":
      return <Done />;
  }
};
