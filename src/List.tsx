import {Box, Color, StdinContext} from "ink";
import * as React from "react";

interface IListItem {
  name: string;
  active: boolean;
}

const shortcutInfos = {
  up: <Color blue>&#x25B2; </Color>,
  down: <Color blue>&#x25BC; </Color>,
  shiftUp: <Color blue>SHIFT + &#x25B2; </Color>,
  shiftDown: <Color blue>SHIFT + &#x25BC; </Color>,
  enter: <Color blue>ENTER </Color>,
  space: <Color blue>SPACE </Color>
};

const description = (
  <Box width='50%'>
    Reorder and select the PDF files that you want to join.
    Use {shortcutInfos.up} and {shortcutInfos.down} to scroll through the
    list, {shortcutInfos.shiftUp} and {shortcutInfos.shiftDown} to move
    items, {shortcutInfos.space} to select or deselect items and {shortcutInfos.enter}
    to finalize.
  </Box>
);

interface IProps {
  paths: string[];
  onComplete: (paths: string[]) => void;
}

export class List extends React.Component<IProps, {
  list: IListItem[];
  position: number;
}> {

  constructor(props: IProps) {
    super(props);

    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }

      if (key.name === 'up' || key.name === 'down'){
        this.handleMovement(
          key.name === 'up' ? -1 : 1,
          key.shift,
          key.ctrl
        );
      }

      if (key.name === 'space' || key.name === 'right' || key.name === 'left') {
        this.toggleItem();
      }

      if (key.name === 'return') {
        this.props.onComplete(this.state.list.filter(i => i.active).map(i => i.name));
      }
    });

    this.state = {
      list: props.paths.map(p => ({name: p, active: true})),
      position: 0
    };
  }

  handleMovement = (direction: number, shift: boolean, ctrl: boolean) => {
    if (shift) {
      this.reorder(this.state.position, direction);
    }

    this.setState({ position: this.state.position + direction });
  };

  toggleItem = () => {
    this.setState({
      list: this.state.list.map((item, index) => index !== this.state.position ? item : {...item, active: !item.active})
    });
  };

  reorder = (position: number, relativeMovement: number) => {
    if (relativeMovement > 0){
      this.setState({
        list: [
          ...this.state.list.filter((item, index) => index < position),
          ...this.state.list.filter((item, index) => index > position && index <= position + relativeMovement),
          this.state.list[position],
          ...this.state.list.filter((item, index) => index > position + relativeMovement)
        ]
      });
    } else {
      this.setState({
        list: [
          ...this.state.list.filter((item, index) => index < position + relativeMovement),
          this.state.list[position],
          ...this.state.list.filter((item, index) => index >= position + relativeMovement && index < position),
          ...this.state.list.filter((item, index) => index > position)
        ]
      });
    }
  };

  render() {
    return (
      <>
        { description }

        {
          this.state.list.map((item, index) => (
            <Box width="100%" key={item.name}>
              <Box>{ index === this.state.position ? ' > ' : '   ' }</Box>
              <Box>{ index + 1 }. </Box>
              <Box>{ item.active ? '[X] ' : '[_] ' }</Box>
              <Box>
                { item.active ? item.name : <Color gray>{ item.name }</Color> }
              </Box>
            </Box>
          ))
        }

        { description }
      </>
    );
  }
}