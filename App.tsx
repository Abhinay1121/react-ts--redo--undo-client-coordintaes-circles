import React, { useState } from 'react';

type Tpoint = {
  x: number;
  y: number;
};
export const App = () => {
  const [points, setPoints] = useState<Tpoint[]>([]);
  const [popped, setPopped] = useState<Tpoint[]>([]);
  const handlePlaceCircle = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
    console.log(points);
  };
  const handleUndoPoints = () => {
    //clone points
    const newPoints = [...points];

    //pop a value and assign to poppedPoint because we need to keep track of popped points for redoing
    const poppedPoint = newPoints.pop();
    //update popped array with exisitng array by cloning and popppedPoint
    setPopped([...popped, poppedPoint]);
    //update points array after pop
    setPoints(newPoints);
  };

  const handleRedoPoints = () => {
    //clone popped points
    const newPopped = [...popped];
    //pop a value and assign to poppedPoint because for updating back to points for undo
    const poppedPoint = newPopped.pop();
    //update popped array because we mutated the array with pop needs. to updated the exisitn poppped array with new chnages
    setPopped(newPopped);
    //update points array by cloning exisitng and also poppedpoint back to points array for redoing
    setPoints([...points, poppedPoint]);
  };
  return (
    <React.Fragment>
      <div className="buttons">
        <button onClick={handleRedoPoints}>Redo</button>
        <button onClick={handleUndoPoints}>undo</button>
      </div>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point) => (
          <div
            className="point"
            style={{ top: point.y + 'px', left: point.x + 'px' }}
          >
            {/* {`${point.x} ${point.y}`} */}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
