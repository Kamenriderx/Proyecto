import React from 'react'

const inicialName = (name) => {
    if (name) {
        return name.charAt(0).toUpperCase();
      }
      return '';
}

export default inicialName