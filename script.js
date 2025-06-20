class Thermostat {
  constructor() {
    this.dial = document.getElementById('rotating-dial');
    this.tempDisplay = document.getElementById('temp-display');
    this.tempUpBtn = document.getElementById('temp-up');
    this.tempDownBtn = document.getElementById('temp-down');
    
    this.iconClasses = [
      'fa-sun',
      'fa-cloud-sun',
      'fa-cloud',
      'fa-cloud-rain',
      'fa-moon',
      'fa-snowflake',
      'fa-wind',
      'fa-smog'
    ];
    
    this.currentRotation = 0;
    this.activeIndex = 0;
    this.currentTemp = 22;
    
    this.init();
  }
  
  init() {
    this.createIcons();
    this.bindEvents();
    this.updateDisplay();
  }
  
  createIcons() {
    const radius = 48;
    const angleStep = 360 / this.iconClasses.length;
    
    this.iconClasses.forEach((iconClass, index) => {
      const iconElement = document.createElement('i');
      iconElement.className = `fas ${iconClass} icon`;
      iconElement.dataset.index = index;
      
      const angle = (angleStep * index) - 90;
      const rad = angle * Math.PI / 180;
      
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      
      iconElement.style.left = `calc(50% + ${x}px)`;
      iconElement.style.top = `calc(50% + ${y}px)`;
      
      this.dial.appendChild(iconElement);
    });
    
    this.updateActiveIcon();
  }
  
  updateActiveIcon() {
    const icons = this.dial.querySelectorAll('.icon');
    const angleStep = 360 / this.iconClasses.length;
    const dialRotation = -(this.activeIndex * angleStep);
    
    icons.forEach((icon, index) => {
      const isActive = index === this.activeIndex;
      icon.classList.toggle('active', isActive);
      
      const iconRotation = -dialRotation;
      icon.style.transform = `translate(-50%, -50%) rotate(${iconRotation}deg)`;
    });
  }
  
  rotateDial() {
    const angleStep = 360 / this.iconClasses.length;
    const targetRotation = -(this.activeIndex * angleStep);
    
    this.dial.style.transform = `rotate(${targetRotation}deg)`;
    this.dial.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    this.updateActiveIcon();
  }
  
  changeTemperature(delta) {
    this.currentTemp = Math.max(10, Math.min(35, this.currentTemp + delta));
    this.updateDisplay();
    
    this.tempDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
      this.tempDisplay.style.transform = 'scale(1)';
    }, 150);
  }
  
  updateDisplay() {
    this.tempDisplay.textContent = `${this.currentTemp}°C`;
  }
  
  bindEvents() {
    this.dial.addEventListener('click', () => {
      this.activeIndex = (this.activeIndex + 1) % this.iconClasses.length;
      this.rotateDial();
    });
    
    this.tempUpBtn.addEventListener('click', () => {
      this.changeTemperature(1);
    });
    
    this.tempDownBtn.addEventListener('click', () => {
      this.changeTemperature(-1);
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Thermostat();
});