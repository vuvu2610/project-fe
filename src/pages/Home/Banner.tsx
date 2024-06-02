import BannerImg from '../../assets/images/check.png';
import start from '../../assets/images/check.png';

function Banner() {
    return (
        <div className="bg-[#F2F0F1]">
            <div className="wrapper flex lg:flex-row flex-col">
                <div className="lg:my-[100px] my-10 max-w-[577px] mx-auto">
                    <h3 className="lg:text-[64px] text-[32px] font-[VLBangers] leading-[1]">
                        Tìm kiếm cây giống cho bạn
                    </h3>
                    <p className="my-[32px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quos atque numquam ipsa illo quasi minima eius quod aperiam obcaecati. Culpa adipisci nihil consectetur! Nisi corporis totam suscipit dignissimos est.
                    </p>

                    <button className="mb-10 py-4 px-[54px] bg-black text-white rounded-[62px] w-full lg:w-auto">
                        Shop Now
                    </button>

                    <div className="flex items-center flex-wrap text-center">
                        <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
                            <span className="font-[Satoshi] text-3xl">200+</span>
                            <p>Sản phẩm</p>
                        </div>
                        <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
                            <span className="font-[Satoshi] text-3xl">2,000+</span>
                            <p>Chất lượng cao</p>
                        </div>
                        <div className="px-2">
                            <span className="font-[Satoshi] text-3xl">30,000+</span>
                            <p>Khách hàng</p>
                        </div>
                    </div>
                </div>

                <div className="relative -z-0">
                    <img src={BannerImg} alt="" className="w-full h-full object-cover" />
                    <img src={start} alt="" className="absolute top-10 right-0 lg:w-[100px] w-[50px]" />
                </div>
            </div>
        </div>
    );
}

export default Banner;