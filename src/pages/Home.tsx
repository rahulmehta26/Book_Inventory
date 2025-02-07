/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IoBookSharp, IoLibrarySharp } from "react-icons/io5"
import { FiPlusCircle } from "react-icons/fi"
import type React from "react" 
import { useRandomThought } from "../hooks/useRandomThought"
import Card from "../components/Card"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  
  const currentThought = useRandomThought()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <IoBookSharp className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to Book Collection Manager
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Manage your personal library with ease. Add, view, and organize your book collection all in one place.
        </p>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Card 
          to="books"
          >
          <div>
              <IoLibrarySharp className="h-8 w-8 text-indigo-600" />
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">View Collection</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Browse through your entire book collection, search, and filter by different categories.
                </p>
              </div>
            </div>
          </Card>

          <Card
          to="add"
          >
          <div>
              <FiPlusCircle className="h-8 w-8 text-indigo-600" />
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Book</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add a new book to your collection with details like title, author, genre, and more.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col mt-12 items-center">
        <div className="bg-white w-fit p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          {currentThought && (
            <div key={currentThought.id}>
              <h3 className="text-lg font-medium text-gray-900">{currentThought.text}</h3>
              {currentThought.author !== "Unknown" && (
                <p className="mt-2 text-sm text-gray-500">" {currentThought.author} "</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

