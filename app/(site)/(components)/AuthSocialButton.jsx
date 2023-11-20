

const AuthSocialButton = ({icon: Icon, onClick}) => {
  return (
    <button type="button" onClick={onClick} className="inline-flex justify-center w-full px-4 py-2 bg-white text-gray-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-offset-0">
      <Icon size={22} />
    </button>
  )
}

export default AuthSocialButton