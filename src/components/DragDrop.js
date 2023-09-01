import React, { useState , useEffect } from 'react';
import DraggableShapes from './DraggableShapes';
import { useDrop } from 'react-dnd';
import '../App.css'
import { Grid} from '@mui/material';

const DragDrop = () => {
const [shapeType, setShapeType] = useState("square");
const RedBoxSize = 500;
const [redBoxVisibleArea, setRedBoxVisibleArea] = useState(RedBoxSize * RedBoxSize);
const blueBoxSize = 100;
const blueBoxArea = blueBoxSize * blueBoxSize;
const blueCircleArea = 3.14 * Math.pow((blueBoxSize/2), 2);
const [redBoard, setRedBoard] = useState([]);
let numberOfBoxes = 5;
let counter = 0;
const shapesList = [];
const numShapes = 5;
const color = 'blue';
const size = `${blueBoxSize}px`;

//   to re render the page each time the shape changes
  useEffect(() => {
    // Update the state
    setShapeType(shapeType);
  }, [shapeType]);

  for (let id = 1; id <= numShapes; id++) {
    shapesList.push({ id, color, size });
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item) => addShapeToRedBoard(item.id , shapeType),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addShapeToRedBoard = (id ,shapeType) => {
    const selectedShape = shapesList.find((shape) => id === shape.id);
    counter = counter + 1;
    let tempArea = redBoxVisibleArea;
    if (shapeType === 'circle'){
        if (counter < numberOfBoxes) {
            tempArea = redBoxVisibleArea - (blueCircleArea * counter);
            setRedBoxVisibleArea(tempArea);
          } else if (counter === numberOfBoxes) {
            //   to get the current area of the red box after the 4 circles 
            let currentVisibleArea = redBoxVisibleArea - (blueCircleArea * (numberOfBoxes - 1));
            const updatedRedBoxVisibleArea = currentVisibleArea - (blueCircleArea / 2);
            setRedBoxVisibleArea(updatedRedBoxVisibleArea);
          }
    }
    else if (shapeType ==='square'){
        if (counter < numberOfBoxes) {
            tempArea = redBoxVisibleArea - (blueBoxArea * counter);
            setRedBoxVisibleArea(tempArea);
          } else if (counter === numberOfBoxes) {
              //to get the current area of the red box after the 4 blue boxes 
            let currentVisibleArea = redBoxVisibleArea - (blueBoxArea * (numberOfBoxes - 1));
            const updatedRedBoxVisibleArea = currentVisibleArea - (blueBoxArea / 2);
            setRedBoxVisibleArea(updatedRedBoxVisibleArea);
          }
    }
    if (selectedShape) {
      setRedBoard((redBoard) => [...redBoard, selectedShape]);
    }
  };



  const toggleShape = () => {
    if (shapeType === "square") {
      setShapeType("circle");
    } else {
      setShapeType("square");
    }
  };

  return (
    <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <div style={{ display: 'flex' }}>
        <div className='Shapes'>
          {shapesList.map((shape) => {
            return (
              <DraggableShapes
                id={shape.id}
                color={shape.color}
                size={shape.size}
                shapeType={shapeType}
              />
            );
          })}
        </div>
      </div>
      <div>
        <button className='toggleButton' onClick={toggleShape}>Toggle Shape</button>
        <p className='shapeArea'>Area: {redBoxVisibleArea} pixels</p>
      </div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div
        style={{
          width: `${RedBoxSize}px`,
          height: `${RedBoxSize}px`,
          backgroundColor: 'red',
        }}
        ref={drop}>
        {redBoard.map((shape) => {
          return (
            <DraggableShapes
              id={shape.id}
              color={shape.color}
              size={shape.size}
              shapeType={shapeType}
            />
          );
        })}
      </div>
    </Grid>
  </Grid>   

  );
};

export default DragDrop;
