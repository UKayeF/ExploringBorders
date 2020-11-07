import React, { Component, Fragment } from 'react';
import { xbox } from './layouts';

export default class Gamepad extends Component {
  static defaultProps = {
    layout: xbox,

    stickThreshold: 0.5,
    deadZone: 0.08,

    gamepadIndex: 0,

    onConnect: () => {},
    onDisconnect: () => {},

    onButtonDown: () => {},
    onButtonUp: () => {},
    onButtonChange: () => {},
    onAxisChange: () => {},

    onA: () => {},
    onB: () => {},
    onX: () => {},
    onY: () => {},

    onStart: () => {},
    onBack: () => {},

    onLT: () => {},
    onRT: () => {},

    onLB: () => {},
    onRB: () => {},

    onLS: () => {},
    onRS: () => {},

    onUp: () => {},
    onDown: () => {},
    onLeft: () => {},
    onRight: () => {},
  }

  constructor(props, context) {
    super(props, context)

    this.padState = {
      connected: false,

      buttons: {
        A: false,
        B: false,
        X: false,
        Y: false,

        LB: false,
        LT: false,
        LS: false,

        RB: false,
        RT: false,
        RS: false,

        Start: false,
        Back: false,

        DPadUp: false,
        DPadRight: false,
        DPadDown: false,
        DPadLeft: false,
      },

      axes: {
        LeftStickX: 0.0,
        LeftStickY: 0.0,

        RightStickX: 0.0,
        RightStickY: 0.0,

        RightTrigger: 0.0,
        LeftTrigger: 0.0,
      },
    }
  }

  componentDidMount() {
    this.mounted = true;

    if (window?.requestAnimationFrame) {
      window.requestAnimationFrame(this.updateGamepad)
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateGamepad = () => {
    if (!this.mounted) return;

    const { gamepadIndex } = this.props;
    const gamepads = navigator.getGamepads();

    const selectedGamepad = (gamepads ?? [])[gamepadIndex];

    if (selectedGamepad) {

      if (!this.padState.connected) {
        this.padState.connected = true;
        this.props.onConnect(gamepadIndex);
      }

      this.updateAllButtons(selectedGamepad);
      this.updateAllAxes(selectedGamepad);
    }
    else if (this.padState.connected) {
      this.padState.connected = false;
      this.props.onDisconnect(gamepadIndex);
    }

    if (window?.requestAnimationFrame) {
      window.requestAnimationFrame(this.updateGamepad)
    }

  }

  updateAllButtons = (gamepad) => {
    gamepad.buttons
      .map(({ pressed, value }, index) => ({
        pressed,
        value,
        buttonName: this.buttonIndexToButtonName(index),
        axisName: this.buttonIndexToAxisName(index),
      }))
      .forEach(button => {
        this.updateButton(button);
        this.updateAxis(button);
      })
  }

  updateButton = ({ buttonName, pressed }) => {
    const currentButton = this.padState.buttons[buttonName];

    if (currentButton === undefined) return;

    if (currentButton !== pressed) {
      this.padState.buttons[buttonName] = pressed;
      this.props.onButtonChange(buttonName, pressed);
      const buttonState = pressed ? 'Down' : 'Up';
      this.props[`onButton${buttonState}`](buttonName);
      const buttonHandle = buttonName.replace('DPad', '');
      if (pressed) this.props[`on${buttonHandle}`]();
    }

  }

  updateAxis = ({ axisName, value }) => {
    const valueInvalid = value === undefined || value === null || isNaN(value);
    const axisInvalid = !axisName;
    if (valueInvalid || axisInvalid) return;

    const invert = axisName.charAt(0) === '-';
    const pureAxisName = axisName.substr(invert ? 1 : 0);
    const sign = invert ? -1 : 1;
    const signedValue = value * sign;

    const currentValue = (Math.abs(value) < this.props.deadZone)
      ? 0
      : signedValue;

    const previousValue = this.padState.axes[pureAxisName];
    const valueUnchanged = previousValue === currentValue;
    if (valueUnchanged) return;

    this.padState.axes[pureAxisName] = currentValue;
    this.props.onAxisChange(pureAxisName, currentValue, previousValue);

    if (pureAxisName === 'LeftStickX') {
      const directionChangeRight = (
        previousValue <= this.props.stickThreshold
        && currentValue > this.props.stickThreshold
      )
      if (directionChangeRight) this.props.onRight();

      const directionChangeLeft = (
        previousValue >= -this.props.stickThreshold
        && currentValue < -this.props.stickThreshold
      )
      if (directionChangeLeft) this.props.onLeft();
    }

    if (pureAxisName === 'LeftStickY') {
      const directionChangeUp = (
        previousValue <= this.props.stickThreshold
        && currentValue > this.props.stickThreshold
      )
      if (directionChangeUp) this.props.onUp();

      const directionChangeDown = (
        previousValue >= -this.props.stickThreshold
        && currentValue < -this.props.stickThreshold
      )
      if (directionChangeDown) this.props.onDown();
    }

  }

  updateAllAxes = (gamepad) => {
    gamepad.axes
      .map((value, index) => ({
        value,
        axisName: this.axisIndexToAxisName(index),
      }))
      .forEach(this.updateAxis)
  }

  buttonIndexToButtonName = (index) => {
    const { layout } = this.props;
    return layout.buttons[index] ?? null;
  }

  buttonIndexToAxisName = (index) => {
    const { layout } = this.props;
    return layout.buttonAxes[index] ?? null;
  }

  axisIndexToAxisName = (index) => {
    const { layout } = this.props;
    return layout.axes[index] ?? null;
  }

  render() {
    return (<Fragment></Fragment>);
  }

}
