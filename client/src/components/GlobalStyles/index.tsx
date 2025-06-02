<<<<<<< HEAD
import type { ReactNode } from 'react';
=======
import type { ReactNode } from 'react'; 
>>>>>>> 81a51f481390d624f7a39b33d2a4653aee501223
import './GlobalStyles.css'

type Props = {
    children : ReactNode
}

function GlobalStyles({ children } : Props) {
    return children
}

export default GlobalStyles;