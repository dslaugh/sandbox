interface LightSwitchState {
    turnOn(),
    turnOff(),
    execute(),
}

class OnState implements LightSwitchState {
    private target: LightSwitch;

    constructor(target: LightSwitch) {
        this.target = target;
    }

    execute(): void {
        console.log('The light turns on');
    }

    turnOff(): void {
        this.target.changeState(this.target.offState);
    }

    turnOn(): void {
        console.log('The light is already on');
    }
}

class OffState implements LightSwitchState {
    private target: LightSwitch;

    constructor(target: LightSwitch) {
        this.target = target;
    }

    execute(): void {
        console.log('The light turns off');
    }

    turnOff(): void {
        console.log('The light is already off');
    }

    turnOn(): void {
        this.target.changeState(this.target.onState);
    }
}

class LightSwitch {
    public onState: OnState;
    public offState: OffState;
    private state: LightSwitchState;

    constructor() {
        this.onState = new OnState(this);
        this.offState = new OffState(this);

        this.state = this.offState;
    }

    changeState(newState: LightSwitchState): void {
        this.state = newState;
        this.state.execute();
    }

    turnOn(): void {
        this.state.turnOn();
    }

    turnOff(): void {
        this.state.turnOff();
    }
}

const lightswitch = new LightSwitch();
lightswitch.turnOn();
lightswitch.turnOff();
lightswitch.turnOff();
lightswitch.turnOff();
lightswitch.turnOn();
lightswitch.turnOn();
lightswitch.turnOff();