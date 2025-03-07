// constants.ts
export const LINE_VARIANTS = {
  slide: {
    closed: (i: number) => ({
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
    open: (i: number) => ({
      x: i === 1 ? 50 : 0,
      y: i === 1 ? 0 : i === 0 ? 8 : -8,
      rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
      opacity: i === 1 ? 0 : 1,
      scale: i === 1 ? 0 : 1.05,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.15,
      },
    }),
  },
  morph: {
    closed: (i: number) => ({
      pathLength: i === 0 ? 0.5 : 1,
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
    open: (i: number) => ({
      pathLength: 1,
      rotate: i === 0 ? 45 : -45,
      y: i === 0 ? 7.25 : -7.25,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
    hover: (i: number) => ({
      pathLength: [1, 0.5, 1],
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.5, 1],
      },
    }),
  },
  slideFade: {
    closed: (i: number) => ({
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
    open: (i: number) => ({
      x: i === 1 ? 50 : 0,
      opacity: i === 1 ? 0 : 1,
      rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
      scale: i === 1 ? 0.5 : 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.1,
      },
    }),
    hover: (i: number) => ({
      x: [-8, 0],
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.1,
      },
    }),
  },
};
