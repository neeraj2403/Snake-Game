import React from 'react';



export default (props) => {
  return (
    <div>
      {props.pattern.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return (
          <div className="obstacle" key={i} style={style}></div>
        )
      })}
    </div>
  )
}