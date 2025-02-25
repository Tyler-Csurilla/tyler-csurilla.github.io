/// <reference types="vite/client" />
declare module "*.module.css" {
  const styles: { [className: string]: string };
  export default styles;
}
