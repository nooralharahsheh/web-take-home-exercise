import React from "react";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";

const DraggableShapes = ({ id, color, size, shapeType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const commonStyle = {
    width: size,
    height: size,
    backgroundColor: isDragging ? 'grey' : color,
    margin: '10px',
  };

  const squareStyle = {
    ...commonStyle,
    borderRadius: '0%', 
  };

  const circleStyle = {
    ...commonStyle,
    borderRadius: '50%', 
  };
  return (
    <Box key={id} ref={drag} style={shapeType === 'square' ? squareStyle : circleStyle}>
    </Box>
  );
};

export default DraggableShapes;
