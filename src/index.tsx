import {render} from "ink";
import * as React from "react";
import * as readline from "readline";
import {App} from "./App";
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const app = render(<App />);