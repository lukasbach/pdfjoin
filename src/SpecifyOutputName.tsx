import TextInput from 'ink-text-input';
import * as React from "react";
import {Box} from "ink";
import {useState} from "react";
import * as path from "path";
const cwd = process.cwd();

export const SpecifyOutputName: React.FunctionComponent<{
  onComplete: (outputName: string) => void;
}> = props => {
  const [out, setOut] = useState(path.join(cwd, 'merged'));

  return (
    <>
      <Box width="100%">
        <Box marginRight={1}>
          Output name:
        </Box>

        <TextInput
          value={out}
          onChange={setOut}
          onSubmit={() => props.onComplete(out + '.pdf')}
        />

        <Box>.pdf</Box>
      </Box>

      <Box width="100%">
        Hit enter to merge.
      </Box>
    </>
  )
};
