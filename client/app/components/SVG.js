import { useState, useEffect } from 'react';

const SVG = () => {
  const [grow, setText] = useState({ text: 'wizbiz', index: 0 });
  const { text, index } = grow;
  useEffect(() => {
    setTimeout(() => {
      const wiz = 'wizbiz';
      index === 6 ? setText({ text: text, index: 0 }) : setText({text: text + wiz[index], index: index + 1 });
    }, 20);
  }, [grow]);
  const svgns = "http://www.w3.org/2000/svg";

  return (
    <svg height="500" width="500">
      <circle id="circle" cx="250" cy="250" r="200" stroke="none" stroke-width="2" fill="brown" />
    <text x="0" y="0" fill="black" >
      <textPath xlinkHref="#circle"  >
        {grow.text}
        {/* {console.log(document.getElementById("circle").hasAttributeNS(svgns, "r"))} */}
      </textPath>
    </text>
    </svg>
  )
}

export default SVG;