import React, {Component} from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'

class Slider extends Component {
    static MIN_VALUE = 1;
    static MAX_VALUE = 2300000;
    static BASE = 5;
    static MIN_POS = 0;
    static MAX_POS = 100;
    static MIN_L_VAL = Slider.log(Slider.MIN_VALUE);
    static MAX_L_VAL = Slider.log(Slider.MAX_VALUE);
    static SCALE = (Slider.MAX_L_VAL - Slider.MIN_L_VAL) / (Slider.MAX_POS - Slider.MIN_POS);

    constructor(props) {
        super(props);

        this.state = {
            min: Slider.MIN_VALUE,
            max: Slider.MAX_VALUE,
            minSlider: Slider.MIN_POS,
            maxSlider: Slider.MAX_POS,
        };

        this.onMinChange = this.onMinChange.bind(this);
        this.onMaxChange = this.onMaxChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onSliderMouseUp = this.onSliderMouseUp.bind(this);
    }
    onSliderChange(e) {
        const [min, max] = e;
        this.setState((prev) => ({
            ...prev,
            minSlider: min,
            maxSlider: max,
            min: Slider.calculateValue(min),
            max: Slider.calculateValue(max),
        }));
    }
    onSliderMouseUp() {
        console.log('>>>>>> UP');
        this.setState((prev) => ({
            ...prev,
            minSlider: Slider.calculatePosition(this.state.min),
            maxSlider: Slider.calculatePosition(this.state.max),
        }));
    }
    onMinChange(e) {
        const value = Slider.formatMinInputValue(Number(e.target.value));
        this.setState({
            ...this.state,
            min: e.target.value,
            minSlider: Slider.calculatePosition(value),
        });
    }
    onMaxChange(e) {
        const value = Slider.formatMaxInputValue(Number(e.target.value));
        this.setState({
            ...this.state,
            max: e.target.value,
            maxSlider: Slider.calculatePosition(value),
        });
    }
    render() {
        return (
            <div>
                <div>
                    <input
                        placeholder="Min"
                        type="number"
                        value={this.state.min}
                        onChange={this.onMinChange}
                        min={Slider.MIN_VALUE}
                        max={Slider.MAX_VALUE}
                    />
                    <input
                        placeholder="Max"
                        type="number"
                        value={this.state.max}
                        onChange={this.onMaxChange}
                        min={Slider.MIN_VALUE}
                        max={Slider.MAX_VALUE}
                    />
                </div>
                <div onMouseUp={this.onSliderMouseUp}>
                    <Range
                        onChange={this.onSliderChange}
                        value={[
                            this.state.minSlider,
                            this.state.maxSlider,
                        ]}
                        min={Slider.MIN_POS}
                        max={Slider.MAX_POS}
                    />
                </div>
            </div>

        );
    }
    static formatMinInputValue(value) {
        if (isNaN(value) || value < Slider.MIN_VALUE) {
            return Slider.MIN_VALUE;
        }
        return value;
    }
    static formatMaxInputValue(value) {
        if (isNaN(value) || value > Slider.MAX_VALUE) {
            return Slider.MAX_VALUE;
        }
        return value;
    }
    static log(value) {
        return Math.log(value) / Math.log(Slider.BASE);
    }
    static exp(value) {
        return Slider.BASE ** value;
    }
    static calculateValue(position) {
        if (position < 1) {
            return 0;
        }
        return Math.floor(
            Slider.exp((position - Slider.MIN_POS) * Slider.SCALE + Slider.MIN_L_VAL)
        );
    }
    static calculatePosition(value) {
        if (value < 1) {
            return 0;
        }
        return Slider.MIN_POS + (Slider.log(value) - Slider.MIN_L_VAL) / Slider.SCALE;
    }
}

export default Slider;