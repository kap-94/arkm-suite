// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import classnames from "classnames/bind";
// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import useScrollActiveSection from "@/app/_hooks/useScrollActiveSection";
// import { Typography } from "@/app/_components/Typography";
// import { buildLocalizedPath } from "@/app/_utils/path";
// import styles from "./MenuList.module.scss";

// gsap.registerPlugin(ScrollToPlugin);

// interface MenuItem {
//   menu_item_id: number;
//   menu_item_parent: number;
//   title: string;
//   url: string;
//   target?: string;
//   icon?: React.ReactElement;
//   dropdownIcon?: React.ReactElement;
//   showDropdownIcon?: boolean;
//   isSectionLink?: boolean;
// }

// interface MenuListProps {
//   data: MenuItem[];
//   frontPageID: number | string;
//   onClick?: () => void;
//   useActiveStyle?: boolean;
//   orientation?: "horizontal" | "vertical";
//   gap?: number;
//   showBorders?: boolean;
// }

// const cx = classnames.bind(styles);

// export const MenuList: React.FC<MenuListProps> = ({
//   data,
//   frontPageID,
//   onClick,
//   useActiveStyle = true,
//   orientation = "horizontal",
//   gap = 24,
//   showBorders = false,
// }) => {
//   if (!data || !Array.isArray(data)) return null;

//   const router = useRouter();
//   const pathname = usePathname();
//   const currentLocale = "en";
//   // const currentLocale = pathname.split('/')[1] || 'en';

//   const isHomePage =
//     pathname === `/${currentLocale}` ||
//     pathname === `/${currentLocale}/` ||
//     pathname.startsWith(`/${currentLocale}#`);

//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [pendingHash, setPendingHash] = useState<string | null>(null);
//   const menuRef = useRef<HTMLUListElement>(null);
//   const menuItemRefs = useRef<(HTMLLIElement | null)[]>([]);
//   const isProcessingRef = useRef(false);

//   const topMenuItems = data.filter((item) => item.menu_item_parent === 0);
//   const submenuItems = data.filter((item) => item.menu_item_parent !== 0);

//   // Conseguir los IDs de sección de los items del menú que son secciones
//   const sectionIds = data
//     .filter((item) => item.url?.startsWith("#"))
//     .map((item) => item.url.replace("#", ""));

//   // Usar el hook con los IDs de sección para detectar la sección activa
//   const menuType = orientation === "horizontal" ? "primary" : "secondary";
//   const activeSectionId = useScrollActiveSection(sectionIds, 100, menuType);

//   const getLocalizedPath = (url: string) => {
//     return buildLocalizedPath(url, currentLocale);
//   };

//   // Función para hacer scroll a una sección
//   const handleScrollToSection = useCallback((hash: string) => {
//     // Asegurarse de que hash comienza con #
//     const fullHash = hash.startsWith("#") ? hash : `#${hash}`;
//     const targetId = fullHash.substring(1); // quitar el # para el getElementById
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       // Calcular la posición exacta para evitar rebotes
//       const elementTop = targetElement.getBoundingClientRect().top;
//       const offsetPosition = elementTop + window.scrollY - 100; // Offset de 100px

//       // Usar scrollTo directo en vez de GSAP para más precisión
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });

//       // Asegurar que la URL esté actualizada
//       window.history.replaceState(null, "", fullHash);
//     } else {
//       console.warn(`Elemento con id "${targetId}" no encontrado`);
//     }
//   }, []);

//   // Manejar la navegación
//   const handleNavigation = useCallback(
//     (url: string, menuItemId: number) => {
//       if (url.startsWith("#")) {
//         if (isHomePage) {
//           // Si ya estamos en home, hacer scroll directamente
//           handleScrollToSection(url);

//           if (!isProcessingRef.current) {
//             isProcessingRef.current = true;
//             // Usar timeout para evitar bucles de actualización
//             setTimeout(() => {
//               setActiveIndex(menuItemId);
//               isProcessingRef.current = false;
//             }, 0);
//           }
//         } else {
//           // Si estamos en otra página, navegar a home con hash
//           setPendingHash(url);

//           // Para prevenir flashes durante la navegación, usamos un overlay
//           const overlay = document.createElement("div");
//           overlay.style.position = "fixed";
//           overlay.style.top = "0";
//           overlay.style.left = "0";
//           overlay.style.width = "100%";
//           overlay.style.height = "100%";
//           overlay.style.backgroundColor = "#fff";
//           overlay.style.zIndex = "9999";
//           overlay.style.opacity = "1";
//           overlay.style.transition = "opacity 0.3s";
//           document.body.appendChild(overlay);

//           // Navegar después de un breve retraso
//           setTimeout(() => {
//             router.push(`/${currentLocale}${url}`);

//             // Remover el overlay después de la navegación
//             setTimeout(() => {
//               overlay.style.opacity = "0";
//               setTimeout(() => {
//                 if (document.body.contains(overlay)) {
//                   document.body.removeChild(overlay);
//                 }
//               }, 300);
//             }, 100);
//           }, 10);
//         }
//       } else {
//         // Para enlaces normales, crear transición limpia
//         const overlay = document.createElement("div");
//         overlay.style.position = "fixed";
//         overlay.style.top = "0";
//         overlay.style.left = "0";
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.backgroundColor = "#fff";
//         overlay.style.zIndex = "9999";
//         overlay.style.opacity = "0";
//         overlay.style.transition = "opacity 0.2s";
//         document.body.appendChild(overlay);

//         // Hacer visible el overlay
//         setTimeout(() => {
//           overlay.style.opacity = "1";

//           // Navegar después de que el overlay es visible
//           setTimeout(() => {
//             router.push(getLocalizedPath(url), {
//               scroll: false, // Desactivar el comportamiento de scroll automático de Next.js
//             });

//             if (!isProcessingRef.current) {
//               isProcessingRef.current = true;
//               setTimeout(() => {
//                 setActiveIndex(menuItemId);
//                 isProcessingRef.current = false;
//               }, 0);
//             }

//             // Configurar para que aparezca en la parte superior
//             window.scrollTo(0, 0);

//             // Desvanecer el overlay después de la navegación
//             setTimeout(() => {
//               overlay.style.opacity = "0";
//               setTimeout(() => {
//                 if (document.body.contains(overlay)) {
//                   document.body.removeChild(overlay);
//                 }
//               }, 300);
//             }, 100);
//           }, 200);
//         }, 10);
//       }
//     },
//     [currentLocale, handleScrollToSection, isHomePage, router]
//   );

//   // Efectos para manejar el scroll después de navegar a home con hash
//   useEffect(() => {
//     // Solo ejecutar si estamos en la página de inicio
//     if (isHomePage && typeof window !== "undefined") {
//       // Comprobar si hay un hash pendiente de navegación anterior
//       if (pendingHash) {
//         // Primero, establecer activeIndex inmediatamente para evitar parpadeos
//         const matchingItem = data.find((item) => item.url === pendingHash);
//         if (matchingItem && !isProcessingRef.current) {
//           isProcessingRef.current = true;
//           setTimeout(() => {
//             setActiveIndex(matchingItem.menu_item_id);
//             isProcessingRef.current = false;
//           }, 0);
//         }

//         // Pequeño retraso para asegurar que el DOM está listo
//         setTimeout(() => {
//           handleScrollToSection(pendingHash);
//           setPendingHash(null);
//         }, 300);
//       }
//       // Comprobar si hay un hash en la URL al cargar la página
//       else if (window.location.hash) {
//         const hash = window.location.hash;

//         // Establecer activeIndex inmediatamente
//         const matchingItem = data.find((item) => item.url === hash);
//         if (matchingItem && !isProcessingRef.current) {
//           isProcessingRef.current = true;
//           setTimeout(() => {
//             setActiveIndex(matchingItem.menu_item_id);
//             isProcessingRef.current = false;
//           }, 0);
//         }

//         // Pequeño retraso para el scroll
//         setTimeout(() => {
//           handleScrollToSection(hash);
//         }, 300);
//       }
//     }
//   }, [isHomePage, data, handleScrollToSection, pendingHash]);

//   // Manejador de clics en ítems del menú
//   const handleMenuClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     href: string,
//     hasSubmenu: boolean,
//     menuItemId: number
//   ) => {
//     if (isMobile && hasSubmenu) {
//       e.preventDefault();

//       if (!isProcessingRef.current) {
//         isProcessingRef.current = true;
//         setTimeout(() => {
//           setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
//           isProcessingRef.current = false;
//         }, 0);
//       }
//       return;
//     }

//     if (hasSubmenu) {
//       e.preventDefault();

//       if (!isProcessingRef.current) {
//         isProcessingRef.current = true;
//         setTimeout(() => {
//           setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
//           isProcessingRef.current = false;
//         }, 0);
//       }
//       return;
//     }

//     e.preventDefault();
//     if (onClick) onClick();
//     handleNavigation(href, menuItemId);
//   };

//   // Efecto para el responsive
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 1360);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Efecto para clicks fuera del menú
//   useEffect(() => {
//     if (!isMobile) {
//       const handleClickOutside = (e: MouseEvent | TouchEvent) => {
//         if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//           if (!isProcessingRef.current) {
//             isProcessingRef.current = true;
//             setTimeout(() => {
//               setActiveIndex(null);
//               isProcessingRef.current = false;
//             }, 0);
//           }
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("touchstart", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//         document.removeEventListener("touchstart", handleClickOutside);
//       };
//     }
//   }, [isMobile]);

//   // Actualizar ítem activo basado en sección visible
//   useEffect(() => {
//     // Solo procesar si estamos en la página de inicio
//     if (isHomePage) {
//       if (activeSectionId) {
//         const activeItem = data.find(
//           (item) => item.url === `#${activeSectionId}`
//         );
//         if (activeItem && !isProcessingRef.current) {
//           isProcessingRef.current = true;
//           setTimeout(() => {
//             setActiveIndex(activeItem.menu_item_id);
//             isProcessingRef.current = false;
//           }, 0);
//         }
//       } else {
//         // Solo resetear si hay elementos de sección y tenemos un elemento activo
//         const hasSectionItems = data.some((item) => item.url?.startsWith("#"));

//         if (hasSectionItems && activeIndex !== null) {
//           const activeItem = data.find(
//             (item) => item.menu_item_id === activeIndex
//           );

//           // Solo resetear si el elemento activo es una sección
//           if (
//             activeItem &&
//             activeItem.url.startsWith("#") &&
//             !isProcessingRef.current
//           ) {
//             isProcessingRef.current = true;
//             setTimeout(() => {
//               setActiveIndex(null);
//               isProcessingRef.current = false;
//             }, 0);
//           }
//         }
//       }
//     }
//   }, [activeSectionId, data, isHomePage, activeIndex]);

//   // Escuchar eventos de sección
//   useEffect(() => {
//     const handleSectionChange = (e: CustomEvent) => {
//       const { menuType: changedMenuType, active, sectionId } = e.detail;
//       const currentMenuType =
//         orientation === "horizontal" ? "primary" : "secondary";

//       // Si es otro menú el que cambió y nosotros tenemos un elemento activo
//       if (
//         changedMenuType !== currentMenuType &&
//         active &&
//         activeIndex !== null
//       ) {
//         // Verificar si nuestro elemento activo es una sección
//         const activeItem = data.find(
//           (item) => item.menu_item_id === activeIndex
//         );
//         if (
//           activeItem &&
//           activeItem.url.startsWith("#") &&
//           !isProcessingRef.current
//         ) {
//           isProcessingRef.current = true;
//           setTimeout(() => {
//             setActiveIndex(null);
//             isProcessingRef.current = false;
//           }, 0);
//         }
//       }
//     };

//     window.addEventListener(
//       "sectionChange",
//       handleSectionChange as EventListener
//     );

//     return () => {
//       window.removeEventListener(
//         "sectionChange",
//         handleSectionChange as EventListener
//       );
//     };
//   }, [orientation, activeIndex, data]);

//   // Actualizar ítem activo basado en ruta actual
//   useEffect(() => {
//     // No actualizar si estamos en la página de inicio con una sección activa
//     if (isHomePage && activeSectionId) return;

//     // Para rutas normales, buscar la coincidencia de ruta
//     const activeItem = data.find((item) => {
//       if (!item.url || item.url.startsWith("#")) return false;
//       const itemPath = buildLocalizedPath(item.url, currentLocale);
//       return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
//     });

//     if (activeItem && !isProcessingRef.current) {
//       isProcessingRef.current = true;
//       setTimeout(() => {
//         setActiveIndex(activeItem.menu_item_id);
//         isProcessingRef.current = false;
//       }, 0);
//     } else if (
//       !isHomePage &&
//       activeIndex !== null &&
//       !isProcessingRef.current
//     ) {
//       isProcessingRef.current = true;
//       setTimeout(() => {
//         setActiveIndex(null);
//         isProcessingRef.current = false;
//       }, 0);
//     }
//   }, [pathname, data, currentLocale, isHomePage, activeSectionId, activeIndex]);

//   // Actualizar indicador visual del ítem activo
//   useEffect(() => {
//     if (menuRef.current && useActiveStyle) {
//       if (activeIndex !== null) {
//         const activeItemIndex = topMenuItems.findIndex(
//           (item) => item.menu_item_id === activeIndex
//         );
//         if (activeItemIndex !== -1) {
//           const activeItem = menuItemRefs.current[activeItemIndex];
//           if (activeItem) {
//             const { left, width } = activeItem.getBoundingClientRect();
//             const menuRect = menuRef.current.getBoundingClientRect();

//             gsap.to(menuRef.current, {
//               duration: 0.2,
//               "--indicator-left": `${left - menuRect.left}px`,
//               "--indicator-width": `${width}px`,
//               ease: "power2.out",
//             });
//             return;
//           }
//         }
//       }

//       // Ocultar indicador si no hay ítem activo
//       gsap.to(menuRef.current, {
//         duration: 0.15,
//         "--indicator-width": "0px",
//         ease: "power2.in",
//       });
//     }
//   }, [activeIndex, topMenuItems, useActiveStyle]);

//   return (
//     <ul
//       ref={menuRef}
//       className={cx("menu", { "menu--vertical": orientation === "vertical" })}
//       style={{ "--menu-gap": `${gap}px` } as React.CSSProperties}
//     >
//       {topMenuItems.map((menuItem, index) => {
//         const path = getLocalizedPath(menuItem.url);
//         const hasSubmenu = submenuItems.some(
//           (item) => item.menu_item_parent === menuItem.menu_item_id
//         );
//         const isActive = activeIndex === menuItem.menu_item_id;

//         return (
//           <li
//             key={menuItem.menu_item_id}
//             ref={(el) => {
//               if (el) menuItemRefs.current[index] = el;
//             }}
//             className={cx("menu__item", {
//               "menu__item--active": useActiveStyle && isActive,
//               "menu__item--border":
//                 showBorders && index !== topMenuItems.length - 1,
//             })}
//           >
//             <Link
//               href={path}
//               target={menuItem.target}
//               className={cx("menu__link")}
//               onClick={(e) =>
//                 handleMenuClick(
//                   e,
//                   menuItem.url,
//                   hasSubmenu,
//                   menuItem.menu_item_id
//                 )
//               }
//             >
//               {menuItem.icon && (
//                 <span className={cx("menu__icon")}>{menuItem.icon}</span>
//               )}
//               <Typography
//                 variant="p1"
//                 theme="dark"
//                 fontFamily="sofia"
//                 fontWeight={500}
//                 className={cx("menu__link-text")}
//               >
//                 {menuItem.title}
//               </Typography>
//               {hasSubmenu && menuItem.showDropdownIcon !== false && (
//                 <span className={cx("dropdown__icon")}>
//                   {menuItem.dropdownIcon || "▼"}
//                 </span>
//               )}
//             </Link>

//             {hasSubmenu && (
//               <ul className={cx("submenu", { "submenu--open": isActive })}>
//                 {submenuItems
//                   .filter(
//                     (item) => item.menu_item_parent === menuItem.menu_item_id
//                   )
//                   .map((submenuItem) => (
//                     <li
//                       key={submenuItem.menu_item_id}
//                       className={cx("submenu__item")}
//                     >
//                       <Link
//                         href={getLocalizedPath(submenuItem.url)}
//                         className={cx("submenu__link")}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (onClick) onClick();
//                           handleNavigation(
//                             submenuItem.url,
//                             submenuItem.menu_item_id
//                           );
//                         }}
//                         target={submenuItem.target}
//                       >
//                         {submenuItem.icon && (
//                           <span className={cx("submenu__icon")}>
//                             {submenuItem.icon}
//                           </span>
//                         )}
//                         <Typography
//                           variant="p3"
//                           fontFamily="sofia"
//                           theme="dark"
//                           textTransform="uppercase"
//                         >
//                           {submenuItem.title}
//                         </Typography>
//                       </Link>
//                     </li>
//                   ))}
//               </ul>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default MenuList;
