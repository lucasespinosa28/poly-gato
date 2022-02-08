import { useMoralis } from 'react-moralis'


function Login(){
    const { authenticate } = useMoralis();
        return (
          <div className='flex flex-col'>
            <div className='text-2xl p-2 mx-32   my-4 bg-orange-400 hover:bg-orange-500 border-b-4 border-orange-600 outline outline-offset-2 outline-1 cursor-pointer'>
              <div 
                className='text-slate-800 mx-2 text-center'
                onClick={() => authenticate()}>Connect wallet</div>
            </div>
          </div>
        );
}

export default Login
