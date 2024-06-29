function CartDetail() {
    return (
        <div className="flex justify-between items-center px-8 py-4 bg-white gap-6 border-y">
                    <div className="flex-1 flex">
                        <input type="checkbox" className="mr-4"/>
                        <div className="flex gap-4">
                            <img src="" alt="" className="w-20 h-20"/>
                            <div className="flex flex-col justify-around">
                                <p className="break-all max-h-8 text-ellipsis text-sm leading-4 overflow-hidden line-clamp-2">Neemj ngu adsasdasdr cai gfasjfsdasdkjghakjhsgdkajhsdgkjhasgdaskdhalkjshdlakjldkfjj sadlfksdj fasdfsadfasdfasdfsdfasdasdasdasdasdasdasdasd</p>
                                <p className="border border-[#EE4D2D] px-1 w-44 text-[#EE4D2D] text-sm">Đổi trả miễn phí 15 ngày</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between items-center text-[#888888]">
                        <div className="flex-1 text-center">đ6000</div>
                        <div className="items-center flex flex-1">
                            <button className="rounded-l-lg border h-8 w-8">-</button>
                            <input value={1} type="text" className="h-8 w-12 text-center border border-l-0 border-r-0 text-black"></input>
                            <button className="rounded-r-lg border h-8 w-8">+</button>
                        </div>
                        <div className="text-primary flex-1 text-center">đ6000</div>
                        <div className="text-[#EE4D2D] flex-1 text-end">Xoa</div>
                    </div>
                </div>
    );
}

export default CartDetail;