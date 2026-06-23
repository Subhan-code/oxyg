import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CircleConfig {
  wrapper: HTMLElement;
  items: NodeListOf<HTMLElement>;
  radius: number;
  direction: number;
}

export class Circle {
  leftConfig: CircleConfig;
  rightConfig: CircleConfig;
  wrapper: HTMLElement;
  scrollTriggerInstance?: any;
  textAnimationInstance?: any;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.leftConfig = {
      wrapper: wrapper.querySelector(
        ".circle__text__wrapper__left"
      ) as HTMLElement,
      items: wrapper.querySelectorAll(".circle__text__left__item"),
      radius: 0,
      direction: 1,
    };

    this.rightConfig = {
      wrapper: wrapper.querySelector(
        ".circle__text__wrapper__right"
      ) as HTMLElement,
      items: wrapper.querySelectorAll(".circle__text__right__item"),
      radius: 0,
      direction: -1,
    };

    this.updateDimensions();
    this.init();
  }

  init(): void {
    if (!this.leftConfig.wrapper || !this.rightConfig.wrapper) return;
    this.calculateInitialPositions();
    this.createScrollAnimations();
  }

  updateDimensions(): void {
    if (!this.leftConfig.wrapper || !this.rightConfig.wrapper) return;
    this.leftConfig.radius = this.leftConfig.wrapper.offsetWidth / 2;
    this.rightConfig.radius = this.rightConfig.wrapper.offsetWidth / 2;
  }

  calculateInitialPositions(): void {
    this.updateItemsPosition(this.leftConfig, 0);
    this.updateItemsPosition(this.rightConfig, 0);
  }

  updateItemsPosition(config: CircleConfig, scrollY: number): void {
    const { items, radius, direction, wrapper } = config;
    const totalItems = items.length;
    if (totalItems === 0) return;
    const spacing = Math.PI / totalItems;
    const centerX = wrapper.offsetWidth / 2;
    const centerY = wrapper.offsetHeight / 2;

    items.forEach((item, index) => {
      const angle = index * spacing - scrollY * direction * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      const rotationOffset = direction === -1 ? 180 : 0;
      const rotation = (angle * 180) / Math.PI + rotationOffset;

      gsap.set(item, {
        x,
        y,
        rotation,
        transformOrigin: "center center",
      });
    });
  }

  createScrollAnimations(): void {
    const parentTrigger = this.wrapper.parentElement || this.wrapper;

    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: parentTrigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scrollY = self.progress * 0.5; // Fixed looping twice issue
        this.updateItemsPosition(this.leftConfig, scrollY);
        this.updateItemsPosition(this.rightConfig, scrollY);
      },
    });

    this.textAnimationInstance = gsap.to(this.wrapper.querySelectorAll(".center-line"), {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.35,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parentTrigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
  }

  resize(): void {
    this.updateDimensions();
    this.calculateInitialPositions();
  }

  destroy(): void {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    if (this.textAnimationInstance) {
      if (this.textAnimationInstance.scrollTrigger) {
        this.textAnimationInstance.scrollTrigger.kill();
      }
      this.textAnimationInstance.kill();
    }
  }
}
