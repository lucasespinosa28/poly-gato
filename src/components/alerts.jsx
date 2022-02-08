export function Error(props) {
    return (
        <div className="p-2 mx-32 text-base font-medium rounded bg-slate-50 border-2  text-red-600 text-slate-50 border-red-600" role="alert">
            <span>❌</span>
            <span> {props.data.message}</span>
        </div>
    );
}

export function Transaction(props) {
    return (
        <a 
        className="w-full font-bold underline hover:text-lime-400"
        href={`https://mumbai.polygonscan.com/tx/${props.data.hash}`} 
        target="_blank" 
        rel="noopener noreferrer">
          📦 See your the transaction here
      </a>
    );
}
