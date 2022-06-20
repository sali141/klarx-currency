import React from 'react'
import loader from '../../assets/img/loading.gif';
import "./Loader.scss"

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  )
}
