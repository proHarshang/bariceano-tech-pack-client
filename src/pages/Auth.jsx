import React from 'react'

const Auth = () => {
    return (
        <div className="bg-[#F1F3F8] w-full h-screen pt-0">
            <h1 className="text-center text-3xl font-bold pt-20 pb-5">TechPacks Word</h1>
            <div className="bg-[#D6E0F0] text-white p-8 rounded-lg max-w-md mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-black" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2.5 border border-gray-700 rounded-md bg-[#8D93AB] focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {/* <p className="text-red-500 text-sm mt-1">{errors.email}</p> */}
                    </div>
                    <div className="flex items-center justify-center content-center gap-5">
                        <div className="relative w-full">
                            <label
                                className="block text-sm text-black font-medium mb-2"
                                htmlFor="password"
                            >
                                Password:
                            </label>
                            <input
                                id="password"
                                className="w-full p-2.5  border border-gray-700 rounded-md bg-[#8D93AB] focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {/* <p className="text-red-500 text-sm mt-1">{errors.password}</p> */}
                        </div>
                        {/* <div className="absolute translate-x-[165px]">
              <button type="button" className="mt-[30px]" >
                <svg width="16" height="14" viewBox="0 0 16 14" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1552 13.1643C13.3742 13.3828 13.7432 13.3943 13.9623 13.1643C14.193 12.9343 14.193 12.5893 13.9623 12.3593L2.71941 1.14614C2.50032 0.91613 2.13132 0.91613 1.9007 1.14614C1.6816 1.36465 1.6816 1.73267 1.9007 1.95119L13.1552 13.1643ZM11.0219 8.13852L13.282 10.4041C14.9194 9.23108 15.888 7.805 15.888 7.16097C15.888 5.98791 12.6708 2.1812 7.94305 2.1812C7.05514 2.1812 6.21337 2.31921 5.44078 2.56072L6.97443 4.1018C7.27424 3.9868 7.60864 3.92929 7.94305 3.92929C9.74192 3.92929 11.1948 5.36687 11.1948 7.17247C11.1948 7.50599 11.1372 7.82801 11.0219 8.13852ZM10.4684 11.7727L8.9232 10.2201C8.61186 10.3351 8.28898 10.4041 7.94305 10.4041C6.14418 10.4041 4.69125 8.92057 4.67972 7.17247C4.67972 6.82745 4.7489 6.48243 4.86422 6.18342L2.61563 3.94079C0.978199 5.10236 -0.00195312 6.52844 -0.00195312 7.16097C-0.00195312 8.34553 3.26138 12.1522 7.94305 12.1522C8.84248 12.1522 9.69579 12.0027 10.4684 11.7727ZM8.30051 5.42438L9.68426 6.80445C9.6612 6.07991 9.06157 5.44738 8.30051 5.42438ZM7.59711 8.89756L6.20184 7.50599C6.1903 8.21903 6.81299 8.89756 7.59711 8.89756Z" fill="#1C1C1E" />                                        </svg>}
              </button>
            </div> */}
                    </div>


                    <div className='flex justify-center'>
                        <button type="button" className='w-fit border bg-black text-white px-4 py-2'>Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Auth