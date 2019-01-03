interface UpdatedPixel {
  x: number,
  y: number,
  color: string,
}

class Picture {
  public width: number;
  public height: number;
  public pixels: string[];

  constructor(width: number, height: number, pixels: string[]) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width: number, height: number, color: string): Picture {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  pixel(x: number, y: number): string {
    return this.pixels[x + y * this.width];
  }

  draw(pixels: UpdatedPixel[]): Picture {
    let copy = this.pixels.slice();
    for (let { x, y, color } of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }
}

function updateState(state: object, action: object): object {
  // return Object.assign({}, state, action);
  return { ...state, ...action };
}

function elt(type: string, props: object | null, ...children) {
  let dom = document.createElement(type);
  if (props) {
    Object.assign(dom, props);
  }
  for (let child of children) {
    if (typeof child !== 'string') {
      dom.appendChild(child);
    } else {
      dom.appendChild(document.createTextNode(child));
    }
  }
  return dom;
}

const scale = 10;

class PictureCanvas {
  public dom;
  public picture: Picture;
  public mouse;
  public touch;

  constructor(picture, pointerDown) {
    this.dom = elt('canvas', {
      onmousedown: event => this.mouse(event, pointerDown),
      ontouchstart: event => this.touch(event, pointerDown),
    });
    this.syncState(picture);
  }

  syncState(picture) {
    if (this.picture === picture) {
      return;
    }

    if (this.picture) {
      const updates = [];
      for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
          if (picture.pixel(x, y) !== this.picture.pixel(x, y)) {
            updates.push({ x, y, color: picture.pixel(x, y) });
          }
        }
      }
      updatePicture(updates, this.dom, scale);
    } else {
      drawPicture(picture, this.dom, scale);
    }

    this.picture = picture;


  }
}
PictureCanvas.prototype.mouse = function(downEvent, onDown) {
  if (downEvent.button !== 0) {
    return;
  }
  let pos = pointerPosition(downEvent, this.dom);
  const onMove = onDown(pos);
  if (!onMove) {
    return;
  }

  let move = moveEvent => {
    if (moveEvent.buttons === 0) {
      this.dom.removeEventListener('mousemove', move);
    } else {
      const newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x === pos.x && newPos.y == pos.y) {
        return;
      }
      pos = newPos;
      onMove(newPos);
    }
  };

  this.dom.addEventListener('mousemove', move);
};

PictureCanvas.prototype.touch = function(startEvent, onDown) {
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  const onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) {
    return;
  }

  let move = moveEvent => {
    const newPos = pointerPosition(moveEvent.touches[0], this.dom);
    if (newPos.x === pos.x && newPos.y === pos.y) {
      return;
    }
    pos = newPos;
    onMove(newPos);
  };

  let end = () => {
    this.dom.removeEventListener('touchmove', move);
    this.dom.removeEventListener('touchend', end);
  };

  this.dom.addEventListener('touchmove', move);
  this.dom.addEventListener('touchend', end);
};

function pointerPosition(pos, domNode) {
  const rect = domNode.getBoundingClientRect();
  return {
    x: Math.floor((pos.clientX - rect.left) / scale),
    y: Math.floor((pos.clientY - rect.top) / scale),
  };
}

function drawPicture(picture: Picture, canvas: HTMLCanvasElement, scale: number): void {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  const cx = canvas.getContext('2d');

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

function updatePicture(updates: UpdatedPixel[], canvas: HTMLCanvasElement, scale: number): void {
  const cx = canvas.getContext('2d');
  updates.forEach((update) => {
    cx.fillStyle = update.color;
    cx.fillRect(update.x * scale, update.y * scale, scale, scale);
  });
}

class PixelEditor {
  public state;
  public canvas;
  public controls;
  public dom;

  constructor(state, config) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, pos => {
      const tool = tools[this.state.tool];
      const onMove = tool(pos, this.state, dispatch);
      if (onMove) {
        return pos => {
          onMove(pos, this.state);
        }
      }
    });

    this.controls = controls.map(Control => new Control(state, config));
    const ctrls = this.controls.reduce((a, c) => {
      return a.concat(' ', c.dom)
    }, []);


    const props = {
      tabIndex: 0,
      onkeydown: e => this.keyDown(e, config)
    };
    this.dom = elt('div', props, this.canvas.dom, elt('br', null), ...ctrls);
  }

  keyDown(event, config) {
    if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
      config.dispatch({ undo: true });
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      for (const tool of Object.keys(config.tools)) {
        if (tool[0] === event.key) {
          config.dispatch({ tool });
        }
      }
    }
  }

  syncState(state) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}

class ToolSelect {
  public select;
  public dom;

  constructor(state, { tools, dispatch }) {
    const props = {
      onchange: () => dispatch({ tool: this.select.value })
    };
    const children = Object.keys(tools).map(name => elt("option", { selected: name === state.tool }, name));

    this.select = elt('select', props, ...children);
    this.dom = elt('label', null, '🖌 Tool: ', this.select);
  }

  syncState(state) {
    this.select.value = state.tool;
  }
}

class ColorSelect {
  public input;
  public dom;

  constructor(state, { dispatch }) {
    this.input = elt('input', {
      type: 'color',
      value: state.color,
      onchange: () => dispatch({ color: this.input.value })
    });

    this.dom = elt('label', null, '🎨 Color: ', this.input);
  }

  syncState(state) {
    this.input.value = state.color;
  }
}

function draw(pos, state, dispatch) {
  function drawPixel({ x, y }, state) {
    let drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn])});
  }
  drawPixel(pos, state);
  return drawPixel;
}

function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn)});
  }
  drawRectangle(start);
  return drawRectangle;
}

function circle(pos, state, dispatch) {
  function pythagoreanTheorem(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }
  function drawCircle(to) {
    let radius = pythagoreanTheorem(to.x - pos.x, to.y - pos.y);
    let radiusC = Math.ceil(radius);

    let drawn = [];
    for (let dy = -radiusC; dy <= radiusC; dy++) {
      for (let dx = -radiusC; dx <= radiusC; dx++) {
        let dist = pythagoreanTheorem(dx, dy);
        if (dist > radius) {
          continue;
        }

        let y = pos.y + dy;
        let x = pos.x + dx;
        if (y < 0 || y >= state.picture.height || x < 0 || x >= state.picture.width) {
          continue;
        }
        drawn.push({ x, y, color: state.color });
      }
    }

    dispatch({ picture: state.picture.draw(drawn)});
  }
  drawCircle(pos);
  return drawCircle;
}

const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

function fill({ x, y }, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{ x, y, color: state.color }];

  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      let x = drawn[done].x + dx;
      let y = drawn[done].y + dy;

      if (
        x >= 0 && x < state.picture.width &&
        y >= 0 && y < state.picture.height &&
        state.picture.pixel(x, y) === targetColor &&
        !drawn.some(p => p.x === x && p.y === y)
      ) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}

function pick(pos, state, dispatch) {
  dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}

class SaveButton {
  public picture;
  public dom;

  constructor(state) {
    this.picture = state.picture;
    this.dom = elt('button', { onclick: () => this.save() }, '💾 Save');
  }

  save() {
    let canvas = <HTMLCanvasElement>elt('canvas', null);
    drawPicture(this.picture, canvas, 1);
    let link = elt('a', {
      href: canvas.toDataURL(),
      download: 'pixelart.png',
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state) {
    this.picture = state.picture;
  }
}

class LoadButton {
  public dom;

  constructor(_, { dispatch }) {
    this.dom = elt('button', { onclick: () => startLoad(dispatch) }, '📁 Load');
  }

  syncState() {}
}

function startLoad(dispatch) {
  let input = <HTMLInputElement>elt('input', {
    type: 'file',
    onchange: () => finishLoad(input.files[0], dispatch),
  });

  document.body.appendChild(input);
  input.click();
  input.remove();
}

function finishLoad(file, dispatch) {
  if (file === null) {
    return;
  }
  let reader = new FileReader();
  reader.addEventListener('load', () => {
    let image = elt('img', {
      onload: () => dispatch({ picture: pictureFromImage(image) }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

function pictureFromImage(image) {
  let width = Math.min(150, image.width);
  let height = Math.min(150, image.height);
  let canvas = <HTMLCanvasElement>elt('canvas', { width, height });
  let cx = canvas.getContext('2d');
  cx.drawImage(image, 0, 0);

  let pixels = [];
  let { data } = cx.getImageData(0, 0, width, height);

  function hex(n) {
    return n.toString(16).padStart(2, '0');
  }

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push('#' + hex(r) + hex(g) + hex(b));
  }

  return new Picture(width, height, pixels);
}

function historyUpdateState(state, action) {
  if (action.undo === true) {
    if (state.done.length === 0) {
      return state;
    }

    return Object.assign({}, state, {
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0,
    });
  } else if (action.picture && state.doneAt < Date.now() - 1000) {
    return Object.assign({}, state, action, {
      done: [state.picture, ...state.done],
      doneAt: Date.now()
    });
  } else {
    return Object.assign({}, state, action);
  }
}

class UndoButton {
  public dom;
  public dispatch;

  constructor(state, { dispatch }) {
    this.dispatch = dispatch;
    this.dom = elt('button', {
      onclick: () => dispatch({ undo: true }),
      disabled: state.done.length === 0
    }, '⮪ Undo');
  }

  syncState(state) {
    this.dom.disabled = state.done.length === 0;
  }
}

const startState = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(60, 30, '#f0f0f0'),
  done: [],
  doneAt: 0,
};

const baseTools = { draw, fill, rectangle, pick, circle };

const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

function startPixelEditor({ state = startState, tools = baseTools, controls = baseControls }) {
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });
  return app.dom;
}