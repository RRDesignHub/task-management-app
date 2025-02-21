import React from 'react'
import useUser from '../Hooks/useUser'
import Loading from '../Components/Shared/Loading'

export default function UserProfile() {
  const [userData, userDataLoading] = useUser()
  if(userDataLoading){
    return <Loading />
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img 
          src={userData?.image} 
          alt="Profile" 
          referrerPolicy='no-refferer'
          className="w-24 h-24 rounded-full border-4 border-primary shadow-md"
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-primary">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>
        <span className="inline-block bg-primary text-white px-3 py-1 rounded mt-2">
          {userData.role}
        </span>
      </div>

      {/* Joined Date */}
      <div className="mt-4 text-center">
        <p className="text-gray-500">
          <strong>Joined:</strong> {new Date(userData.time).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
