import React from 'react'

const ShortenUrlList = ({ data }) => {
  return (
    <div className="space-y-4">
      {data?.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
        >
          <p className="text-sm text-gray-500">Short URL</p>
          <p className="text-blue-600 font-medium">{item.shortUrl || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Original URL</p>
          <p className="text-gray-700 truncate">{item.originalUrl || 'N/A'}</p>
        </div>
      ))}
    </div>
  )
}

export default ShortenUrlList
