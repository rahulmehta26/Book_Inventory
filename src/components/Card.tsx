import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom';


interface CardProps  {
    children: ReactNode; 
    to: string;          
  };

const Card : React.FC<CardProps> = ({children, to}) => {
  return (
    <Link
    to={`/${to}`}
    className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    {children}
  </Link>
  )
}

export default Card