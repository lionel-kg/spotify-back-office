import React, {useEffect, useRef} from 'react';

const Index = ({loop = true}) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    // Vérifie si le code s'exécute dans le navigateur (côté client)
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        const anim = lottie.default.loadAnimation({
          container: animationContainer.current,
          renderer: 'svg',
          loop: loop,
          autoplay: true,
          animationData: require('../../../public/loading.json'), // Utilisation de require pour résoudre le problème de chemin
        });

        return () => {
          anim.destroy();
        };
      });
    }
  }, [loop]);

  return <div ref={animationContainer} />;
};

export default Index;
