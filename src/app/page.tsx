
export default function Home() {
  return (
    <div className="px-4 py-8">
      <h3 className="text-3xl text-center">
        Who are you?
      </h3>

      <div className='flex items-center justify-center flex-col gap-4 w-1/2 mt-8 mx-auto'>
        <a href={`/store`} className='bg-black text-white p-4 w-full text-center'>
          Client
        </a>
        <a href={`/admin`} className='bg-black text-white p-4 w-full text-center'>
          Admin
        </a>
      </div>
      <div className='flex items-center justify-center w-full mt-2'>
      </div>
    </div>
  );
}
