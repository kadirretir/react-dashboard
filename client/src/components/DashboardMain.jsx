import React from 'react'

const DashboardMain = () => {
  return (
   <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>
        <main>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">Card 1</div>
            <div className="bg-white p-6 rounded-lg shadow">Card 2</div>
            <div className="bg-white p-6 rounded-lg shadow">Card 3</div>
          </div>
        </main>
      </div>
  )
}

export default DashboardMain