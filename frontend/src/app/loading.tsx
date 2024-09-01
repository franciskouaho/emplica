const Loading = () => {
    return (
        <div
            className="flex justify-center items-center h-screen w-screen dark:bg-darkBg inset-0 min-h-[80dvh] flex-col bg-[#f2f4f7] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="flex flex-col justify-center items-center p-8 rounded-2xl shadow-lg">
                <h4 className="font-extrabold text-2xl mt-5">Chargement...</h4>
            </div>
        </div>
    )
}

export default Loading;
