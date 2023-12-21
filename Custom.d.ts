declare module '*.svg' {
    import {ReactElement, SVGProps} from 'react';
    const content: (props: SVGProps<SVGElement>) => ReactElement;
    export default content;
  }
  
  declare module '*.png' {
  
    import React = require('react')
  
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  
    const src: string
  
    export default src
  
  }