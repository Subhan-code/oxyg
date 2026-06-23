import React, { useEffect, useRef } from 'react';
import { Circle } from './demos/Circle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LEFT_NAMES = [
  "Jean Morel", "Claire Monet", "Lucie Marin", "André Roche", "Hélène Vidal",
  "Pierre Noel", "Marcel Duroc", "Simone Rey", "Lucien Arto", "Colette Fay",
  "Henri Blanc", "Marie Roche", "René Duval", "Juliette Roy", "Alain Giroux",
  "Sylvie Moret", "Jacques Lenoir", "Monique Barel", "Claude Verne", "Odette Perrin",
  "Pauline Arcy", "Victor Lamy", "Bernard Faye", "Aimée Duret"
];

const RIGHT_NAMES = [
  "Émile Ravel", "Camille Dorny", "Sophie Lalot", "Gaston Merle", "Estelle Dupre",
  "Lucien Beart", "Thérèse Loup", "Raymond Vallé", "Odile Garnet", "Maurice Leno",
  "Irène Faure", "Charles Duret", "Elise Corbin", "Roland Marec", "Delphine Noé",
  "François Borel", "Nathalie Cour", "Georges Leval", "Solange Bret", "Étienne Dupré",
  "Renée Marchal", "Antoine Lory", "Michèle Arcy", "Pascal Duret"
];

interface CircleOrbitalContainerProps {
  leftNames: string[];
  rightNames: string[];
}

const CircleOrbitalContainer = React.memo(({
  leftNames,
  rightNames,
}: CircleOrbitalContainerProps) => {
  const circleWrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let circleInstance: Circle | null = null;
    let timeout: any = null;

    // Small delay to allow DOM to render and layouts to calculate widths
    timeout = setTimeout(() => {
      if (circleWrapperRef.current) {
        circleInstance = new Circle(circleWrapperRef.current);
      }

      const handleResize = () => {
        circleInstance?.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, 150);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (circleInstance) {
        circleInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] lg:h-[100vh] bg-transparent">
      <section className="circle__wrapper w-full overflow-hidden select-none bg-transparent" ref={circleWrapperRef}>
        {/* Centered statistics */}
        <div className="circle__center__text">
          <div className="center-line-fixed">A growing library of</div>
          <div className="center-line font-extrabold text-neutral-900">1,428 components</div>
          <div className="center-line font-extrabold text-neutral-900">200+ templates</div>
          <div className="center-line font-extrabold text-neutral-900">50+ integrations</div>
        </div>

        {/* Left orbit items */}
        <ul className="circle__text__wrapper__left">
          {leftNames.map((name, i) => (
            <li key={i} className="circle__text__left__item font-black whitespace-nowrap text-right">
              {name}
            </li>
          ))}
        </ul>

        {/* Right orbit items */}
        <ul className="circle__text__wrapper__right">
          {rightNames.map((name, i) => (
            <li key={i} className="circle__text__right__item font-black whitespace-nowrap text-left">
              {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
});

CircleOrbitalContainer.displayName = 'CircleOrbitalContainer';

export const ThreeDTextScrollSection = React.memo(() => {
  return (
    <div className="w-full overflow-x-clip bg-white text-neutral-900">
      <div className="demo-3">
        <CircleOrbitalContainer
          leftNames={LEFT_NAMES}
          rightNames={RIGHT_NAMES}
        />
      </div>
    </div>
  );
});

ThreeDTextScrollSection.displayName = 'ThreeDTextScrollSection';
