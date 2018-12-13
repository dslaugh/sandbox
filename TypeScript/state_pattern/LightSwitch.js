var OnState = /** @class */ (function () {
    function OnState(target) {
        this.target = target;
    }
    OnState.prototype.execute = function () {
        console.log('The light turns on');
    };
    OnState.prototype.turnOff = function () {
        this.target.changeState(this.target.offState);
    };
    OnState.prototype.turnOn = function () {
        console.log('The light is already on');
    };
    return OnState;
}());
var OffState = /** @class */ (function () {
    function OffState(target) {
        this.target = target;
    }
    OffState.prototype.execute = function () {
        console.log('The light turns off');
    };
    OffState.prototype.turnOff = function () {
        console.log('The light is already off');
    };
    OffState.prototype.turnOn = function () {
        this.target.changeState(this.target.onState);
    };
    return OffState;
}());
var LightSwitch = /** @class */ (function () {
    function LightSwitch() {
        this.onState = new OnState(this);
        this.offState = new OffState(this);
        this.state = this.offState;
    }
    LightSwitch.prototype.changeState = function (newState) {
        this.state = newState;
        this.state.execute();
    };
    LightSwitch.prototype.turnOn = function () {
        this.state.turnOn();
    };
    LightSwitch.prototype.turnOff = function () {
        this.state.turnOff();
    };
    return LightSwitch;
}());
var lightswitch = new LightSwitch();
lightswitch.turnOn();
lightswitch.turnOff();
lightswitch.turnOff();
lightswitch.turnOff();
lightswitch.turnOn();
lightswitch.turnOn();
lightswitch.turnOff();
