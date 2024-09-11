import React from 'react'
import { Link as RouternLink } from 'react-router-dom'

const LinkBehavior = React.forwardRef((props, ref) =>{
    // Destructura los props para excluir 'button' y cualquier otro prop no deseado
    const { button, ...resProps } = props
    
    // Solo pasa los props que deberian ir a RouterLink
    return <RouternLink ref={ref} {...resProps} />
})

export default LinkBehavior