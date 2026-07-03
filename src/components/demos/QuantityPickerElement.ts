export class QuantityPicker extends HTMLElement {
  private _elements: any = {};
  private _config: any = null;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['min', 'max', 'step', 'value', 'disabled', 'readonly', 'name', 'id'];
  }

  getAttr(name: string, defaultValue = '') {
    return this.getAttribute(name) || defaultValue;
  }

  getNumAttr(name: string, defaultValue = 0) {
    return parseFloat(this.getAttr(name, defaultValue.toString()));
  }

  get config() {
    if (!this._config) {
      this._config = {
        min: this.getNumAttr('min', 0),
        max: this.getNumAttr('max', 100),
        step: this.getNumAttr('step', 1),
        disabled: this.hasAttribute('disabled'),
        readonly: this.hasAttribute('readonly')
      };
      this._config.value = this.getNumAttr('value', this._config.min || 0);
    }
    return this._config;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue || !this._elements.input) return;
    const oldMin = this.getNumAttr('min', 0);
    this._config = null;
    
    switch(name) {
      case 'value':
        if (this._elements.input && this._elements.input.value !== newValue) {
          this._elements.input.value = newValue;
          this._elements.input.setAttribute('value', newValue);
          this._elements.track.style.setProperty('--translate-x', (oldMin - parseFloat(newValue)).toString());
        }
        this.updateButtonStates();
        break;
      case 'min':
      case 'max':
      case 'step':
        this.updateInput();
        this.updateTrack();
        this.updateButtonStates();
        break;
      case 'disabled':
      case 'readonly':
        this.updateInput();
        break;
      default:
        this.updateInput();
    }
  }

  render() {
    const { min, max, step, value, disabled, readonly } = this.config;
    const id = this.getAttr('id', 'quantity');
    const name = this.getAttr('name', 'quantity');

    this.innerHTML = `
      <button class="decrement" aria-label="Decrease quantity">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </button>
      <div class="track-container">
        <input
          type="number" 
          id="${id}"
          name="${name}"
          min="${min}" 
          max="${max}" 
          step="${step}" 
          value="${value}"
          required
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
        />
        <div aria-hidden="true" class="track"></div>
      </div>
      <button class="increment" aria-label="Increase quantity">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    `;

    this._elements = {
      input: this.querySelector('input'),
      increment: this.querySelector('.increment'),
      decrement: this.querySelector('.decrement'),
      track: this.querySelector('.track')
    };

    this.updateTrack();
    this.updateButtonStates();
  }

  setupEventListeners() {
    const { input, increment, decrement } = this._elements;

    const handleStep = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const direction = target.classList.contains('increment') ? 1 : -1;
      const { min, max, step } = this.config;
      const currentValue = parseFloat(input.value) || 0;
      const newValue = currentValue + (step * direction);
      
      if ((direction > 0 && newValue > max) || (direction < 0 && newValue < min)) return;
      
      input.value = newValue;
      this._elements.track.style.setProperty('--translate-x', (min - newValue).toString());
      this.updateButtonStates();
      this.dispatchChange(newValue);
    };

    increment.addEventListener('click', handleStep);
    decrement.addEventListener('click', handleStep);

    input.addEventListener('input', (e: Event) => {
      this.updateButtonStates();
      const target = e.target as HTMLInputElement;
      const value = target.value;
      if (value !== '' && !isNaN(parseFloat(value))) {
        this._elements.track.style.setProperty('--translate-x', (parseFloat(target.min) - parseFloat(value)).toString());
      }
      this.dispatchChange(value);
    });
  }

  dispatchChange(value: string | number) {
    if (this.getAttr('value') !== String(value)) {
      this.dispatchEvent(new CustomEvent('change', { detail: { value }, bubbles: true }));
    }
  }

  updateInput() {
    const { input } = this._elements;
    if (!input) return;
    const { min, max, step, value, disabled, readonly } = this.config;
    Object.assign(input, { min, max, step, value, disabled, readOnly: readonly });
    this.updateButtonStates();
  }
  
  setAriaDisabled(element: any, disabled: boolean) {
    element.disabled = disabled;
    element[disabled ? 'setAttribute' : 'removeAttribute']('aria-disabled', 'true');
  }
  
  updateButtonStates() {
    const { increment, decrement, input } = this._elements;
    if (!increment || !decrement || !input) return;
    
    const { disabled, readonly, min, max, step } = this.config;
    if (disabled || readonly) {
      this.setAriaDisabled(increment, true);
      this.setAriaDisabled(decrement, true);
      return;
    }
    
    const currentValue = parseFloat(input.value) || 0;
    this.setAriaDisabled(decrement, (currentValue - step) < min);
    this.setAriaDisabled(increment, (currentValue + step) > max);
  }

  updateTrack() {
    const { track } = this._elements;
    if (!track) return;

    const { min, max, step } = this.config;
    const range = max - min;
    
    track.dataset.lowRangeOut = (min - step).toString();
    track.dataset.highRangeOut = (max + step).toString();
    track.textContent = Array.from(
      { length: range + 1 }, 
      (_, i) => min + i
    ).join('\n');
  }
}

export function registerQuantityPicker() {
  if (!customElements.get('quantity-picker')) {
    customElements.define('quantity-picker', QuantityPicker);
  }
}
