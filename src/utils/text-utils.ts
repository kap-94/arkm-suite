export const capitalizeAndFormat = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Agregar espacio entre minúscula y mayúscula
    .replace(/([a-zA-Z])(\d)/g, "$1 $2") // Agregar espacio entre letras y números
    .replace(/_/g, " ") // Reemplazar guiones bajos por espacios
    .split(" ") // Separar por espacios
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar cada palabra
    .join(" "); // Reunir las palabras en un string
};
